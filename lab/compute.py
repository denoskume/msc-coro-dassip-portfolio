import base64
import json
import cv2
import numpy as np

settings = json.loads(settings_json)
images = []
for filename in json.loads(names_json):
    image = cv2.imread(filename, cv2.IMREAD_GRAYSCALE)
    if image is None:
        raise ValueError("One input could not be decoded as an image.")
    if images and image.shape != images[0].shape:
        raise ValueError("Use images with the same width and height.")
    images.append(image)


def encode_png(image):
    success, encoded = cv2.imencode(".png", image)
    if not success:
        raise ValueError("Could not encode the result.")
    return base64.b64encode(encoded).decode("ascii")


def calibrate_camera():
    columns, rows = settings["columns"], settings["rows"]
    board = np.zeros((rows * columns, 3), np.float32)
    board[:, :2] = np.mgrid[:columns, :rows].T.reshape(-1, 2) * settings["pitch"]
    image_points, accepted = [], []
    for index, image in enumerate(images):
        found, corners = cv2.findChessboardCorners(image, (columns, rows))
        if found:
            refined = cv2.cornerSubPix(image, corners, (11, 11), (-1, -1),
                                       (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_MAX_ITER, 30, .001))
            image_points.append(refined)
            accepted.append(index)
    if len(accepted) < 3:
        raise ValueError(f"Board detected in {len(accepted)} views. Supply at least three distinct tilted views and check the inner-corner counts.")
    rms, matrix, distortion, rotations, translations = cv2.calibrateCamera(
        [board] * len(accepted), image_points, images[0].shape[::-1], None, None)
    if not np.isfinite(rms) or not np.isfinite(matrix).all() or not np.isfinite(distortion).all():
        raise ValueError("Unstable calibration. Use a wider range of board orientations.")
    views = []
    for fold, index in enumerate(accepted):
        projected, _ = cv2.projectPoints(board, rotations[fold], translations[fold], matrix, distortion)
        residuals = projected.reshape(-1, 2) - image_points[fold].reshape(-1, 2)
        error = float(np.sqrt(np.mean(np.sum(residuals**2, axis=1))))
        overlay = cv2.cvtColor(images[index], cv2.COLOR_GRAY2BGR)
        for measured, predicted in zip(image_points[fold].reshape(-1, 2), projected.reshape(-1, 2)):
            cv2.circle(overlay, tuple(np.rint(measured).astype(int)), 4, (255,255,0), 1)
            cv2.drawMarker(overlay, tuple(np.rint(predicted).astype(int)), (32,120,255), cv2.MARKER_CROSS, 5, 1)
        views.append({"index":index, "rms_px":error, "rotation_vector":rotations[fold].ravel().tolist(),
                      "translation_mm":translations[fold].ravel().tolist(), "png":encode_png(overlay)})
    return {"method":"OpenCV calibration with lens distortion","rms_px":rms,"matrix":matrix.tolist(),
            "distortion":distortion.ravel().tolist(),"skipped_indices":[i for i in range(len(images)) if i not in accepted],"views":views}


def segment_sequence():
    # Keep the first view as the fixed background for the entire sequence.
    reference = cv2.GaussianBlur(images[0], (3, 3), 0)
    views = []
    for index, image in enumerate(images):
        difference = cv2.absdiff(reference, cv2.GaussianBlur(image, (3, 3), 0))
        mask = (difference > settings["threshold"]).astype(np.uint8) * 255
        count, labels, stats, _ = cv2.connectedComponentsWithStats(mask)
        keep = stats[:, cv2.CC_STAT_AREA] >= settings["minimum"]
        keep[0] = False
        mask = (keep[labels] * 255).astype(np.uint8)
        views.append({"index":index,"foreground_pixels":int(np.count_nonzero(mask)),"png":encode_png(mask)})
    return {"method":"Fixed-reference motion segmentation","foreground_value":255,"reference_index":0,"views":views}


result = calibrate_camera() if settings["mode"] == "calibration" else segment_sequence()
json.dumps(result, allow_nan=False)
