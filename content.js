window.PORTFOLIO_DATA = {
  "site": {
    "name": "Denos Kume",
    "role": "Computer Vision · Image Processing · Applied ML",
    "city": "Nantes, France",
    "email": "kamenan.kume@eleves.ec-nantes.fr",
    "github": "https://github.com/denoskume",
    "linkedin": "https://www.linkedin.com/in/denoskume",
    "repo": "https://github.com/denoskume/msc-coro-dassip-portfolio"
  },
  "projects": [
    {
      "slug": "fluoroscopy-instrument-segmentation",
      "title": "Tracing instruments in fluoroscopy",
      "subtitle": "Guidewire & microcatheter segmentation in fluoroscopy",
      "category": "Computer Vision",
      "kind": "Applied case study",
      "year": "2026",
      "featured": true,
      "summary": "An explainable image-processing pipeline for finding thin instruments amid anatomical structures and noise in fluoroscopic frames.",
      "context": "Academic case study · Centrale Nantes · with Oluwole Shokunbi",
      "tags": [
        "Python",
        "Segmentation",
        "Medical imaging",
        "Evaluation"
      ],
      "cover": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/assets/segmentation-comparison.png",
      "gallery": [
        {
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/assets/grayscale-comparison.png",
          "caption": "Original vs contrast-enhanced fluoroscopy"
        },
        {
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/assets/segmentation-comparison.png",
          "caption": "Predicted instrument masks across the sequence"
        },
        {
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/assets/mask-cleanup.png",
          "caption": "Continuous tracing compared with the manual reference"
        }
      ],
      "metrics": [
        {
          "value": "0.876",
          "label": "Mean Dice",
          "context": "Nine motion frames; within-sequence evaluation"
        },
        {
          "value": "10",
          "label": "Images",
          "context": "512 × 512 pixel fluoroscopy frames"
        },
        {
          "value": "3",
          "label": "Classical baselines",
          "context": "Fixed threshold, Otsu, Gaussian mixture"
        }
      ],
      "challenge": "Thin moving instruments can disappear against noisy anatomy. Simple frame differencing can also recover anatomy and lose stationary shaft sections.",
      "approach": [
        "Build a reproducible preparation pipeline with contrast adjustment, smoothing and background subtraction.",
        "Compare fixed thresholding, Otsu and two-component Gaussian-mixture masks against manual instrument tracings.",
        "Add continuous-trace reconstruction and inspect false positives, missed segments and frame-by-frame overlap."
      ],
      "result": "Mean Dice improved from 0.501 to 0.876 on nine motion frames using the continuous-trace extension. This is a within-acquisition development result, not independent clinical validation.",
      "limitations": "Retrospective laboratory data from one acquisition; clinical evaluation pending. Do not interpret these results as patient-level diagnostic evidence.",
      "codeTitle": "Python · Oriented dark-line response",
      "code": "def dark_line_response(image):\n    \"\"\"Measure how much darker a narrow line is than the tissue on both sides.\"\"\"\n    response = np.zeros_like(image)\n    for angle in np.linspace(0, np.pi, 16, endpoint=False):\n        tangent = np.array([np.sin(angle), np.cos(angle)])\n        offsets = np.rint(np.outer(np.arange(-5, 6), tangent)).astype(int)\n        kernel = np.zeros((13, 13))\n        np.add.at(kernel, tuple((offsets + 6).T), 1 / len(offsets))\n        center = ndimage.convolve(image, kernel, mode=\"nearest\")\n        normal = np.rint(4 * np.array([tangent[1], -tangent[0]])).astype(int)\n        left = ndimage.shift(center, normal, order=0, mode=\"nearest\")\n        right = ndimage.shift(center, -normal, order=0, mode=\"nearest\")\n        response = np.maximum(response, np.minimum(left, right) - center)\n    return response",
      "github": "https://github.com/denoskume/Background-Subtraction-Fluoroscopy",
      "notebook": "https://github.com/denoskume/Background-Subtraction-Fluoroscopy/blob/main/Fluoroscopy_Instrument_Segmentation.ipynb",
      "excerpt": true,
      "views": [
        {
          "label": "Frame 201",
          "metrics": "Dice 0.932 · 86 false-positive pixels · 63 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_201_review.png"
        },
        {
          "label": "Frame 211",
          "metrics": "Dice 0.932 · 94 false-positive pixels · 55 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_211_review.png"
        },
        {
          "label": "Frame 221",
          "metrics": "Dice 0.818 · 444 false-positive pixels · 118 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_221_review.png"
        },
        {
          "label": "Frame 231",
          "metrics": "Dice 0.889 · 221 false-positive pixels · 202 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_231_review.png"
        },
        {
          "label": "Frame 241",
          "metrics": "Dice 0.883 · 271 false-positive pixels · 222 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_241_review.png"
        },
        {
          "label": "Frame 251",
          "metrics": "Dice 0.847 · 435 false-positive pixels · 391 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_251_review.png"
        },
        {
          "label": "Frame 261",
          "metrics": "Dice 0.884 · 384 false-positive pixels · 380 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_261_review.png"
        },
        {
          "label": "Frame 271",
          "metrics": "Dice 0.878 · 480 false-positive pixels · 409 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_271_review.png"
        },
        {
          "label": "Frame 281",
          "metrics": "Dice 0.908 · 413 false-positive pixels · 320 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_281_review.png"
        },
        {
          "label": "Frame 291",
          "metrics": "Dice 0.849 · 811 false-positive pixels · 414 missed pixels",
          "src": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/0e8d344ee5de727738e89a598e1593018ed14901/review/frame_291_review.png"
        }
      ]
    },
    {
      "slug": "camera-calibration",
      "title": "Calibrating an inspection camera",
      "subtitle": "Zhang camera calibration for an industrial inspection station",
      "category": "Computer Vision",
      "kind": "Engineering case study",
      "year": "2026",
      "featured": true,
      "summary": "Recovering camera intrinsics and board poses from nine chessboard views, with a reproducible reprojection-error review.",
      "context": "Academic case study · Centrale Nantes",
      "tags": [
        "Python",
        "Projective geometry",
        "Calibration",
        "OpenCV"
      ],
      "cover": "https://raw.githubusercontent.com/denoskume/camera-calibration/main/outputs/figures/detected_chessboard_corners.png",
      "gallery": [
        {
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/main/outputs/figures/detected_chessboard_corners.png",
          "caption": "Chessboard corners detected in the calibration sequence"
        },
        {
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/main/outputs/figures/mean_reprojection_error_by_view.png",
          "caption": "Mean reprojection error by image"
        },
        {
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/main/outputs/figures/estimated_camera_poses.png",
          "caption": "Recovered camera-to-board geometry"
        }
      ],
      "metrics": [
        {
          "value": "0.434 px",
          "label": "Mean error",
          "context": "Corner reprojection, nine views"
        },
        {
          "value": "9 / 9",
          "label": "Views retained",
          "context": "432 detected corners"
        },
        {
          "value": "0.534 px",
          "label": "Overall RMS",
          "context": "Laboratory dataset"
        }
      ],
      "challenge": "Before a fixed camera measures a part on a planar inspection fixture, image coordinates must be mapped to the same geometric model as the board.",
      "approach": [
        "Detect 8 × 6 inner chessboard corners from nine photographs with known 30 mm spacing.",
        "Estimate normalized DLT homographies, recover intrinsics using Zhang constraints and reconstruct nine extrinsic poses.",
        "Compare projected and observed corners for each view; flag high-residual views for closer inspection."
      ],
      "result": "All nine views were retained. Mean reprojection error was 0.434 pixels, with an overall RMS of 0.534 pixels.",
      "limitations": "The pinhole model omits lens distortion. Production-grade dimensional inspection would need independent tolerance checks.",
      "codeTitle": "Python · Normalizing point coordinates",
      "code": "def compute_point_normalization_transform(points):\n    \"\"\"Compute point normalization transform.\"\"\"\n    points = np.asarray(points, dtype=float)\n\n    centroid = np.mean(points, axis=0)\n    shifted = points - centroid\n\n    distances = np.linalg.norm(shifted, axis=1)\n    mean_distance = np.mean(distances)\n    # Reject degenerate point sets before normalization to avoid unstable scaling.\n    if mean_distance < 1e-12:\n        raise ValueError(\n            \"Point normalization is undefined for coincident points.\"\n        )\n    scale = np.sqrt(2.0) / mean_distance\n\n    return np.array(\n        [\n            [scale, 0.0, -scale * centroid[0]],\n            [0.0, scale, -scale * centroid[1]],\n            [0.0, 0.0, 1.0],\n        ],\n        dtype=float,\n    )",
      "github": "https://github.com/denoskume/camera-calibration",
      "notebook": "https://github.com/denoskume/camera-calibration/blob/main/Camera_Calibration.ipynb",
      "excerpt": true,
      "views": [
        {
          "label": "img0.jpg",
          "metrics": "Mean error 0.256 px · RMS error 0.303 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"113.459\" cy=\"141.387\" r=\"4\"/><circle cx=\"162.610\" cy=\"140.039\" r=\"4\"/><circle cx=\"209.266\" cy=\"139.002\" r=\"4\"/><circle cx=\"252.371\" cy=\"137.720\" r=\"4\"/><circle cx=\"293.203\" cy=\"136.781\" r=\"4\"/><circle cx=\"331.250\" cy=\"135.663\" r=\"4\"/><circle cx=\"367.437\" cy=\"135.287\" r=\"4\"/><circle cx=\"401.093\" cy=\"134.558\" r=\"4\"/><circle cx=\"118.370\" cy=\"189.585\" r=\"4\"/><circle cx=\"167.504\" cy=\"186.722\" r=\"4\"/><circle cx=\"213.552\" cy=\"183.945\" r=\"4\"/><circle cx=\"256.738\" cy=\"181.433\" r=\"4\"/><circle cx=\"296.949\" cy=\"179.024\" r=\"4\"/><circle cx=\"335.461\" cy=\"177.016\" r=\"4\"/><circle cx=\"371.304\" cy=\"174.986\" r=\"4\"/><circle cx=\"405.193\" cy=\"173.360\" r=\"4\"/><circle cx=\"123.373\" cy=\"237.547\" r=\"4\"/><circle cx=\"172.345\" cy=\"233.062\" r=\"4\"/><circle cx=\"217.662\" cy=\"229.218\" r=\"4\"/><circle cx=\"260.792\" cy=\"224.735\" r=\"4\"/><circle cx=\"301.522\" cy=\"221.373\" r=\"4\"/><circle cx=\"339.376\" cy=\"218.087\" r=\"4\"/><circle cx=\"375.574\" cy=\"214.714\" r=\"4\"/><circle cx=\"408.922\" cy=\"211.845\" r=\"4\"/><circle cx=\"128.337\" cy=\"285.523\" r=\"4\"/><circle cx=\"177.130\" cy=\"279.486\" r=\"4\"/><circle cx=\"222.425\" cy=\"273.844\" r=\"4\"/><circle cx=\"265.535\" cy=\"268.361\" r=\"4\"/><circle cx=\"305.959\" cy=\"263.408\" r=\"4\"/><circle cx=\"343.534\" cy=\"258.810\" r=\"4\"/><circle cx=\"380.060\" cy=\"254.446\" r=\"4\"/><circle cx=\"413.220\" cy=\"249.867\" r=\"4\"/><circle cx=\"133.355\" cy=\"333.324\" r=\"4\"/><circle cx=\"181.694\" cy=\"325.523\" r=\"4\"/><circle cx=\"227.416\" cy=\"318.338\" r=\"4\"/><circle cx=\"270.221\" cy=\"311.848\" r=\"4\"/><circle cx=\"309.654\" cy=\"305.429\" r=\"4\"/><circle cx=\"347.706\" cy=\"299.448\" r=\"4\"/><circle cx=\"383.518\" cy=\"293.674\" r=\"4\"/><circle cx=\"416.621\" cy=\"288.544\" r=\"4\"/><circle cx=\"138.298\" cy=\"380.845\" r=\"4\"/><circle cx=\"186.887\" cy=\"372.044\" r=\"4\"/><circle cx=\"232.329\" cy=\"363.306\" r=\"4\"/><circle cx=\"274.072\" cy=\"354.907\" r=\"4\"/><circle cx=\"314.440\" cy=\"347.399\" r=\"4\"/><circle cx=\"351.563\" cy=\"340.229\" r=\"4\"/><circle cx=\"387.553\" cy=\"333.500\" r=\"4\"/><circle cx=\"420.619\" cy=\"326.893\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M110.221,138.435l6,6m-6,0l6,-6\"/><path d=\"M159.700,137.223l6,6m-6,0l6,-6\"/><path d=\"M205.957,136.091l6,6m-6,0l6,-6\"/><path d=\"M249.298,135.030l6,6m-6,0l6,-6\"/><path d=\"M289.990,134.034l6,6m-6,0l6,-6\"/><path d=\"M328.268,133.097l6,6m-6,0l6,-6\"/><path d=\"M364.342,132.214l6,6m-6,0l6,-6\"/><path d=\"M398.396,131.380l6,6m-6,0l6,-6\"/><path d=\"M115.251,186.513l6,6m-6,0l6,-6\"/><path d=\"M164.524,183.686l6,6m-6,0l6,-6\"/><path d=\"M210.592,181.043l6,6m-6,0l6,-6\"/><path d=\"M253.757,178.566l6,6m-6,0l6,-6\"/><path d=\"M294.286,176.241l6,6m-6,0l6,-6\"/><path d=\"M332.412,174.054l6,6m-6,0l6,-6\"/><path d=\"M368.344,171.993l6,6m-6,0l6,-6\"/><path d=\"M402.265,170.046l6,6m-6,0l6,-6\"/><path d=\"M120.274,234.517l6,6m-6,0l6,-6\"/><path d=\"M169.342,230.080l6,6m-6,0l6,-6\"/><path d=\"M215.221,225.931l6,6m-6,0l6,-6\"/><path d=\"M258.210,222.043l6,6m-6,0l6,-6\"/><path d=\"M298.576,218.392l6,6m-6,0l6,-6\"/><path d=\"M336.551,214.958l6,6m-6,0l6,-6\"/><path d=\"M372.341,211.722l6,6m-6,0l6,-6\"/><path d=\"M406.129,208.666l6,6m-6,0l6,-6\"/><path d=\"M125.289,282.449l6,6m-6,0l6,-6\"/><path d=\"M174.153,276.406l6,6m-6,0l6,-6\"/><path d=\"M219.843,270.755l6,6m-6,0l6,-6\"/><path d=\"M262.657,265.460l6,6m-6,0l6,-6\"/><path d=\"M302.860,260.487l6,6m-6,0l6,-6\"/><path d=\"M340.684,255.810l6,6m-6,0l6,-6\"/><path d=\"M376.332,251.401l6,6m-6,0l6,-6\"/><path d=\"M409.989,247.238l6,6m-6,0l6,-6\"/><path d=\"M130.297,330.308l6,6m-6,0l6,-6\"/><path d=\"M178.957,322.664l6,6m-6,0l6,-6\"/><path d=\"M224.458,315.516l6,6m-6,0l6,-6\"/><path d=\"M267.098,308.817l6,6m-6,0l6,-6\"/><path d=\"M307.139,302.526l6,6m-6,0l6,-6\"/><path d=\"M344.811,296.608l6,6m-6,0l6,-6\"/><path d=\"M380.319,291.030l6,6m-6,0l6,-6\"/><path d=\"M413.844,285.763l6,6m-6,0l6,-6\"/><path d=\"M135.297,378.095l6,6m-6,0l6,-6\"/><path d=\"M183.754,368.854l6,6m-6,0l6,-6\"/><path d=\"M229.067,360.213l6,6m-6,0l6,-6\"/><path d=\"M271.533,352.114l6,6m-6,0l6,-6\"/><path d=\"M311.412,344.509l6,6m-6,0l6,-6\"/><path d=\"M348.934,337.354l6,6m-6,0l6,-6\"/><path d=\"M384.301,330.609l6,6m-6,0l6,-6\"/><path d=\"M417.694,324.241l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img0.jpg"
        },
        {
          "label": "img1.jpg",
          "metrics": "Mean error 0.234 px · RMS error 0.277 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"113.607\" cy=\"141.443\" r=\"4\"/><circle cx=\"163.008\" cy=\"140.227\" r=\"4\"/><circle cx=\"209.486\" cy=\"139.186\" r=\"4\"/><circle cx=\"252.591\" cy=\"137.819\" r=\"4\"/><circle cx=\"293.395\" cy=\"137.097\" r=\"4\"/><circle cx=\"331.794\" cy=\"135.984\" r=\"4\"/><circle cx=\"367.557\" cy=\"135.463\" r=\"4\"/><circle cx=\"401.613\" cy=\"134.885\" r=\"4\"/><circle cx=\"118.630\" cy=\"189.628\" r=\"4\"/><circle cx=\"167.673\" cy=\"186.916\" r=\"4\"/><circle cx=\"214.029\" cy=\"184.148\" r=\"4\"/><circle cx=\"257.227\" cy=\"181.495\" r=\"4\"/><circle cx=\"297.444\" cy=\"179.231\" r=\"4\"/><circle cx=\"335.598\" cy=\"177.254\" r=\"4\"/><circle cx=\"371.774\" cy=\"175.216\" r=\"4\"/><circle cx=\"405.402\" cy=\"173.477\" r=\"4\"/><circle cx=\"123.532\" cy=\"237.566\" r=\"4\"/><circle cx=\"172.555\" cy=\"233.197\" r=\"4\"/><circle cx=\"217.919\" cy=\"229.321\" r=\"4\"/><circle cx=\"261.204\" cy=\"224.930\" r=\"4\"/><circle cx=\"301.618\" cy=\"221.463\" r=\"4\"/><circle cx=\"339.741\" cy=\"218.308\" r=\"4\"/><circle cx=\"375.704\" cy=\"215.146\" r=\"4\"/><circle cx=\"409.302\" cy=\"212.208\" r=\"4\"/><circle cx=\"128.511\" cy=\"285.631\" r=\"4\"/><circle cx=\"177.373\" cy=\"279.519\" r=\"4\"/><circle cx=\"222.576\" cy=\"274.146\" r=\"4\"/><circle cx=\"265.608\" cy=\"268.662\" r=\"4\"/><circle cx=\"306.222\" cy=\"263.675\" r=\"4\"/><circle cx=\"343.595\" cy=\"259.221\" r=\"4\"/><circle cx=\"380.228\" cy=\"254.512\" r=\"4\"/><circle cx=\"413.362\" cy=\"250.416\" r=\"4\"/><circle cx=\"133.458\" cy=\"333.387\" r=\"4\"/><circle cx=\"181.891\" cy=\"325.698\" r=\"4\"/><circle cx=\"227.482\" cy=\"318.604\" r=\"4\"/><circle cx=\"270.281\" cy=\"312.149\" r=\"4\"/><circle cx=\"309.753\" cy=\"305.517\" r=\"4\"/><circle cx=\"347.858\" cy=\"299.789\" r=\"4\"/><circle cx=\"383.514\" cy=\"294.045\" r=\"4\"/><circle cx=\"416.694\" cy=\"288.725\" r=\"4\"/><circle cx=\"138.323\" cy=\"381.055\" r=\"4\"/><circle cx=\"186.968\" cy=\"372.162\" r=\"4\"/><circle cx=\"232.326\" cy=\"363.443\" r=\"4\"/><circle cx=\"274.159\" cy=\"355.211\" r=\"4\"/><circle cx=\"314.459\" cy=\"347.666\" r=\"4\"/><circle cx=\"351.582\" cy=\"340.479\" r=\"4\"/><circle cx=\"387.528\" cy=\"333.834\" r=\"4\"/><circle cx=\"420.598\" cy=\"327.339\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M110.519,138.467l6,6m-6,0l6,-6\"/><path d=\"M160.020,137.296l6,6m-6,0l6,-6\"/><path d=\"M206.295,136.200l6,6m-6,0l6,-6\"/><path d=\"M249.649,135.174l6,6m-6,0l6,-6\"/><path d=\"M290.351,134.211l6,6m-6,0l6,-6\"/><path d=\"M328.637,133.305l6,6m-6,0l6,-6\"/><path d=\"M364.716,132.451l6,6m-6,0l6,-6\"/><path d=\"M398.773,131.645l6,6m-6,0l6,-6\"/><path d=\"M115.502,186.589l6,6m-6,0l6,-6\"/><path d=\"M164.792,183.799l6,6m-6,0l6,-6\"/><path d=\"M210.872,181.191l6,6m-6,0l6,-6\"/><path d=\"M254.046,178.747l6,6m-6,0l6,-6\"/><path d=\"M294.581,176.453l6,6m-6,0l6,-6\"/><path d=\"M332.712,174.295l6,6m-6,0l6,-6\"/><path d=\"M368.646,172.261l6,6m-6,0l6,-6\"/><path d=\"M402.568,170.341l6,6m-6,0l6,-6\"/><path d=\"M120.477,234.623l6,6m-6,0l6,-6\"/><path d=\"M169.555,230.220l6,6m-6,0l6,-6\"/><path d=\"M215.441,226.104l6,6m-6,0l6,-6\"/><path d=\"M258.436,222.248l6,6m-6,0l6,-6\"/><path d=\"M298.805,218.627l6,6m-6,0l6,-6\"/><path d=\"M336.781,215.221l6,6m-6,0l6,-6\"/><path d=\"M372.571,212.010l6,6m-6,0l6,-6\"/><path d=\"M406.358,208.980l6,6m-6,0l6,-6\"/><path d=\"M125.442,282.569l6,6m-6,0l6,-6\"/><path d=\"M174.311,276.560l6,6m-6,0l6,-6\"/><path d=\"M220.003,270.942l6,6m-6,0l6,-6\"/><path d=\"M262.819,265.677l6,6m-6,0l6,-6\"/><path d=\"M303.021,260.734l6,6m-6,0l6,-6\"/><path d=\"M340.843,256.083l6,6m-6,0l6,-6\"/><path d=\"M376.489,251.700l6,6m-6,0l6,-6\"/><path d=\"M410.142,247.562l6,6m-6,0l6,-6\"/><path d=\"M130.398,330.428l6,6m-6,0l6,-6\"/><path d=\"M179.057,322.818l6,6m-6,0l6,-6\"/><path d=\"M224.557,315.702l6,6m-6,0l6,-6\"/><path d=\"M267.194,309.034l6,6m-6,0l6,-6\"/><path d=\"M307.231,302.773l6,6m-6,0l6,-6\"/><path d=\"M344.899,296.882l6,6m-6,0l6,-6\"/><path d=\"M380.401,291.330l6,6m-6,0l6,-6\"/><path d=\"M413.920,286.088l6,6m-6,0l6,-6\"/><path d=\"M135.346,378.200l6,6m-6,0l6,-6\"/><path d=\"M183.796,368.995l6,6m-6,0l6,-6\"/><path d=\"M229.103,360.387l6,6m-6,0l6,-6\"/><path d=\"M271.562,352.320l6,6m-6,0l6,-6\"/><path d=\"M311.434,344.745l6,6m-6,0l6,-6\"/><path d=\"M348.948,337.618l6,6m-6,0l6,-6\"/><path d=\"M384.308,330.900l6,6m-6,0l6,-6\"/><path d=\"M417.693,324.557l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img1.jpg"
        },
        {
          "label": "img2.jpg",
          "metrics": "Mean error 0.469 px · RMS error 0.525 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"76.719\" cy=\"113.605\" r=\"4\"/><circle cx=\"134.993\" cy=\"116.594\" r=\"4\"/><circle cx=\"193.331\" cy=\"119.765\" r=\"4\"/><circle cx=\"250.990\" cy=\"123.127\" r=\"4\"/><circle cx=\"308.671\" cy=\"125.735\" r=\"4\"/><circle cx=\"366.223\" cy=\"129.511\" r=\"4\"/><circle cx=\"423.393\" cy=\"132.867\" r=\"4\"/><circle cx=\"479.791\" cy=\"136.265\" r=\"4\"/><circle cx=\"91.179\" cy=\"159.942\" r=\"4\"/><circle cx=\"145.199\" cy=\"163.448\" r=\"4\"/><circle cx=\"199.025\" cy=\"165.838\" r=\"4\"/><circle cx=\"253.014\" cy=\"168.598\" r=\"4\"/><circle cx=\"306.755\" cy=\"171.067\" r=\"4\"/><circle cx=\"360.487\" cy=\"173.795\" r=\"4\"/><circle cx=\"413.389\" cy=\"177.370\" r=\"4\"/><circle cx=\"465.969\" cy=\"179.766\" r=\"4\"/><circle cx=\"103.625\" cy=\"200.619\" r=\"4\"/><circle cx=\"154.158\" cy=\"203.414\" r=\"4\"/><circle cx=\"204.851\" cy=\"205.115\" r=\"4\"/><circle cx=\"254.744\" cy=\"207.627\" r=\"4\"/><circle cx=\"304.883\" cy=\"210.254\" r=\"4\"/><circle cx=\"355.339\" cy=\"212.229\" r=\"4\"/><circle cx=\"404.870\" cy=\"215.912\" r=\"4\"/><circle cx=\"453.762\" cy=\"218.521\" r=\"4\"/><circle cx=\"114.457\" cy=\"235.650\" r=\"4\"/><circle cx=\"162.118\" cy=\"237.567\" r=\"4\"/><circle cx=\"209.257\" cy=\"239.550\" r=\"4\"/><circle cx=\"256.442\" cy=\"242.668\" r=\"4\"/><circle cx=\"303.457\" cy=\"244.361\" r=\"4\"/><circle cx=\"350.536\" cy=\"246.388\" r=\"4\"/><circle cx=\"397.299\" cy=\"249.788\" r=\"4\"/><circle cx=\"443.487\" cy=\"251.632\" r=\"4\"/><circle cx=\"124.351\" cy=\"266.361\" r=\"4\"/><circle cx=\"169.137\" cy=\"267.801\" r=\"4\"/><circle cx=\"213.493\" cy=\"270.918\" r=\"4\"/><circle cx=\"257.812\" cy=\"273.153\" r=\"4\"/><circle cx=\"302.294\" cy=\"274.242\" r=\"4\"/><circle cx=\"346.232\" cy=\"276.506\" r=\"4\"/><circle cx=\"390.441\" cy=\"279.449\" r=\"4\"/><circle cx=\"433.742\" cy=\"281.523\" r=\"4\"/><circle cx=\"133.373\" cy=\"293.435\" r=\"4\"/><circle cx=\"174.851\" cy=\"296.774\" r=\"4\"/><circle cx=\"216.941\" cy=\"298.548\" r=\"4\"/><circle cx=\"259.096\" cy=\"299.205\" r=\"4\"/><circle cx=\"300.778\" cy=\"301.525\" r=\"4\"/><circle cx=\"342.622\" cy=\"303.366\" r=\"4\"/><circle cx=\"384.256\" cy=\"306.215\" r=\"4\"/><circle cx=\"425.597\" cy=\"307.667\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M73.528,110.740l6,6m-6,0l6,-6\"/><path d=\"M132.009,113.983l6,6m-6,0l6,-6\"/><path d=\"M190.207,117.211l6,6m-6,0l6,-6\"/><path d=\"M248.126,120.423l6,6m-6,0l6,-6\"/><path d=\"M305.766,123.620l6,6m-6,0l6,-6\"/><path d=\"M363.130,126.801l6,6m-6,0l6,-6\"/><path d=\"M420.219,129.967l6,6m-6,0l6,-6\"/><path d=\"M477.037,133.118l6,6m-6,0l6,-6\"/><path d=\"M88.072,157.006l6,6m-6,0l6,-6\"/><path d=\"M142.376,159.915l6,6m-6,0l6,-6\"/><path d=\"M196.437,162.812l6,6m-6,0l6,-6\"/><path d=\"M250.256,165.695l6,6m-6,0l6,-6\"/><path d=\"M303.834,168.566l6,6m-6,0l6,-6\"/><path d=\"M357.174,171.423l6,6m-6,0l6,-6\"/><path d=\"M410.276,174.268l6,6m-6,0l6,-6\"/><path d=\"M463.143,177.101l6,6m-6,0l6,-6\"/><path d=\"M100.688,197.135l6,6m-6,0l6,-6\"/><path d=\"M151.372,199.768l6,6m-6,0l6,-6\"/><path d=\"M201.844,202.390l6,6m-6,0l6,-6\"/><path d=\"M252.105,205.000l6,6m-6,0l6,-6\"/><path d=\"M302.156,207.600l6,6m-6,0l6,-6\"/><path d=\"M351.999,210.189l6,6m-6,0l6,-6\"/><path d=\"M401.635,212.768l6,6m-6,0l6,-6\"/><path d=\"M451.065,215.335l6,6m-6,0l6,-6\"/><path d=\"M111.734,232.274l6,6m-6,0l6,-6\"/><path d=\"M159.251,234.674l6,6m-6,0l6,-6\"/><path d=\"M206.581,237.065l6,6m-6,0l6,-6\"/><path d=\"M253.726,239.446l6,6m-6,0l6,-6\"/><path d=\"M300.685,241.818l6,6m-6,0l6,-6\"/><path d=\"M347.462,244.181l6,6m-6,0l6,-6\"/><path d=\"M394.056,246.534l6,6m-6,0l6,-6\"/><path d=\"M440.469,248.879l6,6m-6,0l6,-6\"/><path d=\"M121.487,263.298l6,6m-6,0l6,-6\"/><path d=\"M166.209,265.500l6,6m-6,0l6,-6\"/><path d=\"M210.766,267.695l6,6m-6,0l6,-6\"/><path d=\"M255.157,269.881l6,6m-6,0l6,-6\"/><path d=\"M299.386,272.059l6,6m-6,0l6,-6\"/><path d=\"M343.451,274.229l6,6m-6,0l6,-6\"/><path d=\"M387.355,276.391l6,6m-6,0l6,-6\"/><path d=\"M431.097,278.545l6,6m-6,0l6,-6\"/><path d=\"M130.162,290.890l6,6m-6,0l6,-6\"/><path d=\"M172.399,292.923l6,6m-6,0l6,-6\"/><path d=\"M214.489,294.948l6,6m-6,0l6,-6\"/><path d=\"M256.432,296.966l6,6m-6,0l6,-6\"/><path d=\"M298.229,298.978l6,6m-6,0l6,-6\"/><path d=\"M339.880,300.982l6,6m-6,0l6,-6\"/><path d=\"M381.387,302.979l6,6m-6,0l6,-6\"/><path d=\"M422.750,304.970l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img2.jpg"
        },
        {
          "label": "img3.jpg",
          "metrics": "Mean error 0.547 px · RMS error 0.608 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"76.460\" cy=\"115.037\" r=\"4\"/><circle cx=\"134.611\" cy=\"117.596\" r=\"4\"/><circle cx=\"193.105\" cy=\"121.330\" r=\"4\"/><circle cx=\"250.776\" cy=\"124.257\" r=\"4\"/><circle cx=\"308.603\" cy=\"127.415\" r=\"4\"/><circle cx=\"366.240\" cy=\"131.362\" r=\"4\"/><circle cx=\"423.501\" cy=\"134.582\" r=\"4\"/><circle cx=\"480.239\" cy=\"138.111\" r=\"4\"/><circle cx=\"91.029\" cy=\"161.343\" r=\"4\"/><circle cx=\"144.823\" cy=\"164.428\" r=\"4\"/><circle cx=\"198.804\" cy=\"167.405\" r=\"4\"/><circle cx=\"252.838\" cy=\"169.786\" r=\"4\"/><circle cx=\"306.662\" cy=\"172.238\" r=\"4\"/><circle cx=\"360.478\" cy=\"175.488\" r=\"4\"/><circle cx=\"413.496\" cy=\"179.065\" r=\"4\"/><circle cx=\"466.270\" cy=\"181.654\" r=\"4\"/><circle cx=\"103.503\" cy=\"201.437\" r=\"4\"/><circle cx=\"153.793\" cy=\"204.362\" r=\"4\"/><circle cx=\"204.450\" cy=\"205.939\" r=\"4\"/><circle cx=\"254.635\" cy=\"209.281\" r=\"4\"/><circle cx=\"304.749\" cy=\"211.654\" r=\"4\"/><circle cx=\"355.239\" cy=\"213.602\" r=\"4\"/><circle cx=\"404.797\" cy=\"217.654\" r=\"4\"/><circle cx=\"453.979\" cy=\"220.042\" r=\"4\"/><circle cx=\"114.416\" cy=\"236.726\" r=\"4\"/><circle cx=\"161.868\" cy=\"238.527\" r=\"4\"/><circle cx=\"209.115\" cy=\"240.782\" r=\"4\"/><circle cx=\"256.231\" cy=\"243.749\" r=\"4\"/><circle cx=\"303.319\" cy=\"245.585\" r=\"4\"/><circle cx=\"350.464\" cy=\"247.761\" r=\"4\"/><circle cx=\"397.227\" cy=\"251.514\" r=\"4\"/><circle cx=\"443.503\" cy=\"253.450\" r=\"4\"/><circle cx=\"124.219\" cy=\"267.261\" r=\"4\"/><circle cx=\"168.991\" cy=\"268.870\" r=\"4\"/><circle cx=\"213.349\" cy=\"271.750\" r=\"4\"/><circle cx=\"257.549\" cy=\"273.932\" r=\"4\"/><circle cx=\"302.104\" cy=\"275.386\" r=\"4\"/><circle cx=\"345.999\" cy=\"277.681\" r=\"4\"/><circle cx=\"390.480\" cy=\"280.793\" r=\"4\"/><circle cx=\"433.718\" cy=\"283.343\" r=\"4\"/><circle cx=\"133.256\" cy=\"293.791\" r=\"4\"/><circle cx=\"174.687\" cy=\"297.542\" r=\"4\"/><circle cx=\"216.755\" cy=\"299.358\" r=\"4\"/><circle cx=\"258.956\" cy=\"300.189\" r=\"4\"/><circle cx=\"300.696\" cy=\"302.738\" r=\"4\"/><circle cx=\"342.554\" cy=\"304.684\" r=\"4\"/><circle cx=\"384.214\" cy=\"307.553\" r=\"4\"/><circle cx=\"425.538\" cy=\"309.298\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M73.279,111.906l6,6m-6,0l6,-6\"/><path d=\"M131.720,115.281l6,6m-6,0l6,-6\"/><path d=\"M189.920,118.641l6,6m-6,0l6,-6\"/><path d=\"M247.883,121.988l6,6m-6,0l6,-6\"/><path d=\"M305.608,125.322l6,6m-6,0l6,-6\"/><path d=\"M363.097,128.642l6,6m-6,0l6,-6\"/><path d=\"M420.353,131.948l6,6m-6,0l6,-6\"/><path d=\"M477.375,135.241l6,6m-6,0l6,-6\"/><path d=\"M87.908,158.034l6,6m-6,0l6,-6\"/><path d=\"M142.167,161.080l6,6m-6,0l6,-6\"/><path d=\"M196.220,164.115l6,6m-6,0l6,-6\"/><path d=\"M250.066,167.139l6,6m-6,0l6,-6\"/><path d=\"M303.708,170.151l6,6m-6,0l6,-6\"/><path d=\"M357.147,173.151l6,6m-6,0l6,-6\"/><path d=\"M410.382,176.140l6,6m-6,0l6,-6\"/><path d=\"M463.417,179.118l6,6m-6,0l6,-6\"/><path d=\"M100.592,198.029l6,6m-6,0l6,-6\"/><path d=\"M151.229,200.802l6,6m-6,0l6,-6\"/><path d=\"M201.685,203.565l6,6m-6,0l6,-6\"/><path d=\"M251.961,206.318l6,6m-6,0l6,-6\"/><path d=\"M302.059,209.062l6,6m-6,0l6,-6\"/><path d=\"M351.980,211.796l6,6m-6,0l6,-6\"/><path d=\"M401.724,214.520l6,6m-6,0l6,-6\"/><path d=\"M451.292,217.235l6,6m-6,0l6,-6\"/><path d=\"M111.695,233.038l6,6m-6,0l6,-6\"/><path d=\"M159.162,235.580l6,6m-6,0l6,-6\"/><path d=\"M206.471,238.113l6,6m-6,0l6,-6\"/><path d=\"M253.621,240.638l6,6m-6,0l6,-6\"/><path d=\"M300.615,243.155l6,6m-6,0l6,-6\"/><path d=\"M347.452,245.663l6,6m-6,0l6,-6\"/><path d=\"M394.134,248.163l6,6m-6,0l6,-6\"/><path d=\"M440.661,250.655l6,6m-6,0l6,-6\"/><path d=\"M121.496,263.939l6,6m-6,0l6,-6\"/><path d=\"M166.167,266.284l6,6m-6,0l6,-6\"/><path d=\"M210.697,268.620l6,6m-6,0l6,-6\"/><path d=\"M255.087,270.950l6,6m-6,0l6,-6\"/><path d=\"M299.339,273.272l6,6m-6,0l6,-6\"/><path d=\"M343.451,275.587l6,6m-6,0l6,-6\"/><path d=\"M387.426,277.895l6,6m-6,0l6,-6\"/><path d=\"M431.263,280.196l6,6m-6,0l6,-6\"/><path d=\"M130.209,291.415l6,6m-6,0l6,-6\"/><path d=\"M172.395,293.589l6,6m-6,0l6,-6\"/><path d=\"M214.456,295.756l6,6m-6,0l6,-6\"/><path d=\"M256.392,297.917l6,6m-6,0l6,-6\"/><path d=\"M298.203,300.071l6,6m-6,0l6,-6\"/><path d=\"M339.891,302.219l6,6m-6,0l6,-6\"/><path d=\"M381.455,304.361l6,6m-6,0l6,-6\"/><path d=\"M422.897,306.496l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img3.jpg"
        },
        {
          "label": "img4.jpg",
          "metrics": "Mean error 0.384 px · RMS error 0.444 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"155.591\" cy=\"109.060\" r=\"4\"/><circle cx=\"191.646\" cy=\"109.995\" r=\"4\"/><circle cx=\"229.820\" cy=\"111.264\" r=\"4\"/><circle cx=\"269.606\" cy=\"112.219\" r=\"4\"/><circle cx=\"312.131\" cy=\"113.582\" r=\"4\"/><circle cx=\"356.082\" cy=\"115.194\" r=\"4\"/><circle cx=\"402.696\" cy=\"116.851\" r=\"4\"/><circle cx=\"452.052\" cy=\"118.605\" r=\"4\"/><circle cx=\"149.702\" cy=\"149.853\" r=\"4\"/><circle cx=\"186.218\" cy=\"152.115\" r=\"4\"/><circle cx=\"223.822\" cy=\"154.213\" r=\"4\"/><circle cx=\"264.405\" cy=\"156.482\" r=\"4\"/><circle cx=\"306.555\" cy=\"159.138\" r=\"4\"/><circle cx=\"350.625\" cy=\"161.593\" r=\"4\"/><circle cx=\"397.590\" cy=\"164.659\" r=\"4\"/><circle cx=\"446.721\" cy=\"167.791\" r=\"4\"/><circle cx=\"144.601\" cy=\"191.330\" r=\"4\"/><circle cx=\"180.660\" cy=\"194.431\" r=\"4\"/><circle cx=\"218.683\" cy=\"197.790\" r=\"4\"/><circle cx=\"258.693\" cy=\"201.254\" r=\"4\"/><circle cx=\"300.616\" cy=\"204.484\" r=\"4\"/><circle cx=\"345.553\" cy=\"208.701\" r=\"4\"/><circle cx=\"392.518\" cy=\"212.622\" r=\"4\"/><circle cx=\"441.607\" cy=\"217.487\" r=\"4\"/><circle cx=\"138.971\" cy=\"232.910\" r=\"4\"/><circle cx=\"175.246\" cy=\"236.604\" r=\"4\"/><circle cx=\"213.417\" cy=\"241.387\" r=\"4\"/><circle cx=\"252.751\" cy=\"245.959\" r=\"4\"/><circle cx=\"295.382\" cy=\"250.802\" r=\"4\"/><circle cx=\"340.340\" cy=\"256.118\" r=\"4\"/><circle cx=\"386.947\" cy=\"261.472\" r=\"4\"/><circle cx=\"436.539\" cy=\"266.832\" r=\"4\"/><circle cx=\"133.431\" cy=\"274.369\" r=\"4\"/><circle cx=\"169.634\" cy=\"279.560\" r=\"4\"/><circle cx=\"207.393\" cy=\"284.782\" r=\"4\"/><circle cx=\"247.455\" cy=\"291.005\" r=\"4\"/><circle cx=\"290.145\" cy=\"296.745\" r=\"4\"/><circle cx=\"334.375\" cy=\"303.449\" r=\"4\"/><circle cx=\"381.051\" cy=\"310.325\" r=\"4\"/><circle cx=\"430.670\" cy=\"317.318\" r=\"4\"/><circle cx=\"128.075\" cy=\"316.488\" r=\"4\"/><circle cx=\"163.179\" cy=\"322.602\" r=\"4\"/><circle cx=\"201.481\" cy=\"329.415\" r=\"4\"/><circle cx=\"242.420\" cy=\"336.296\" r=\"4\"/><circle cx=\"283.913\" cy=\"343.536\" r=\"4\"/><circle cx=\"328.616\" cy=\"351.037\" r=\"4\"/><circle cx=\"375.483\" cy=\"359.339\" r=\"4\"/><circle cx=\"424.668\" cy=\"367.663\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M152.347,105.897l6,6m-6,0l6,-6\"/><path d=\"M188.643,107.071l6,6m-6,0l6,-6\"/><path d=\"M226.733,108.302l6,6m-6,0l6,-6\"/><path d=\"M266.753,109.596l6,6m-6,0l6,-6\"/><path d=\"M308.854,110.957l6,6m-6,0l6,-6\"/><path d=\"M353.201,112.390l6,6m-6,0l6,-6\"/><path d=\"M399.979,113.903l6,6m-6,0l6,-6\"/><path d=\"M449.396,115.500l6,6m-6,0l6,-6\"/><path d=\"M146.887,146.946l6,6m-6,0l6,-6\"/><path d=\"M183.173,149.117l6,6m-6,0l6,-6\"/><path d=\"M221.259,151.395l6,6m-6,0l6,-6\"/><path d=\"M261.281,153.788l6,6m-6,0l6,-6\"/><path d=\"M303.390,156.307l6,6m-6,0l6,-6\"/><path d=\"M347.756,158.961l6,6m-6,0l6,-6\"/><path d=\"M394.563,161.760l6,6m-6,0l6,-6\"/><path d=\"M444.020,164.719l6,6m-6,0l6,-6\"/><path d=\"M141.391,188.265l6,6m-6,0l6,-6\"/><path d=\"M177.666,191.446l6,6m-6,0l6,-6\"/><path d=\"M215.746,194.785l6,6m-6,0l6,-6\"/><path d=\"M255.769,198.294l6,6m-6,0l6,-6\"/><path d=\"M297.887,201.987l6,6m-6,0l6,-6\"/><path d=\"M342.271,205.879l6,6m-6,0l6,-6\"/><path d=\"M389.106,209.985l6,6m-6,0l6,-6\"/><path d=\"M438.603,214.325l6,6m-6,0l6,-6\"/><path d=\"M135.859,229.857l6,6m-6,0l6,-6\"/><path d=\"M172.122,234.061l6,6m-6,0l6,-6\"/><path d=\"M210.195,238.476l6,6m-6,0l6,-6\"/><path d=\"M250.218,243.116l6,6m-6,0l6,-6\"/><path d=\"M292.344,248.000l6,6m-6,0l6,-6\"/><path d=\"M336.744,253.148l6,6m-6,0l6,-6\"/><path d=\"M383.606,258.581l6,6m-6,0l6,-6\"/><path d=\"M433.142,264.324l6,6m-6,0l6,-6\"/><path d=\"M130.290,271.724l6,6m-6,0l6,-6\"/><path d=\"M166.540,276.966l6,6m-6,0l6,-6\"/><path d=\"M204.606,282.470l6,6m-6,0l6,-6\"/><path d=\"M244.628,288.257l6,6m-6,0l6,-6\"/><path d=\"M286.761,294.350l6,6m-6,0l6,-6\"/><path d=\"M331.176,300.772l6,6m-6,0l6,-6\"/><path d=\"M378.064,307.552l6,6m-6,0l6,-6\"/><path d=\"M427.638,314.721l6,6m-6,0l6,-6\"/><path d=\"M124.685,313.869l6,6m-6,0l6,-6\"/><path d=\"M160.920,320.162l6,6m-6,0l6,-6\"/><path d=\"M198.978,326.771l6,6m-6,0l6,-6\"/><path d=\"M238.998,333.721l6,6m-6,0l6,-6\"/><path d=\"M281.136,341.040l6,6m-6,0l6,-6\"/><path d=\"M325.566,348.756l6,6m-6,0l6,-6\"/><path d=\"M372.479,356.903l6,6m-6,0l6,-6\"/><path d=\"M422.090,365.519l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img4.jpg"
        },
        {
          "label": "img5.jpg",
          "metrics": "Mean error 0.251 px · RMS error 0.279 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"255.949\" cy=\"128.558\" r=\"4\"/><circle cx=\"262.950\" cy=\"156.804\" r=\"4\"/><circle cx=\"269.997\" cy=\"185.106\" r=\"4\"/><circle cx=\"277.215\" cy=\"213.298\" r=\"4\"/><circle cx=\"284.202\" cy=\"241.562\" r=\"4\"/><circle cx=\"291.375\" cy=\"269.663\" r=\"4\"/><circle cx=\"298.391\" cy=\"297.983\" r=\"4\"/><circle cx=\"305.478\" cy=\"325.794\" r=\"4\"/><circle cx=\"228.276\" cy=\"133.075\" r=\"4\"/><circle cx=\"235.599\" cy=\"161.802\" r=\"4\"/><circle cx=\"242.764\" cy=\"190.650\" r=\"4\"/><circle cx=\"250.119\" cy=\"219.629\" r=\"4\"/><circle cx=\"257.325\" cy=\"248.493\" r=\"4\"/><circle cx=\"264.601\" cy=\"277.404\" r=\"4\"/><circle cx=\"271.930\" cy=\"306.111\" r=\"4\"/><circle cx=\"279.104\" cy=\"334.682\" r=\"4\"/><circle cx=\"199.273\" cy=\"137.426\" r=\"4\"/><circle cx=\"206.817\" cy=\"166.950\" r=\"4\"/><circle cx=\"214.175\" cy=\"196.648\" r=\"4\"/><circle cx=\"221.749\" cy=\"226.220\" r=\"4\"/><circle cx=\"229.375\" cy=\"255.798\" r=\"4\"/><circle cx=\"236.699\" cy=\"285.343\" r=\"4\"/><circle cx=\"244.382\" cy=\"314.668\" r=\"4\"/><circle cx=\"251.722\" cy=\"344.175\" r=\"4\"/><circle cx=\"169.116\" cy=\"141.963\" r=\"4\"/><circle cx=\"176.760\" cy=\"172.445\" r=\"4\"/><circle cx=\"184.460\" cy=\"202.757\" r=\"4\"/><circle cx=\"192.419\" cy=\"232.966\" r=\"4\"/><circle cx=\"199.952\" cy=\"263.365\" r=\"4\"/><circle cx=\"207.591\" cy=\"293.634\" r=\"4\"/><circle cx=\"215.588\" cy=\"323.697\" r=\"4\"/><circle cx=\"223.233\" cy=\"353.767\" r=\"4\"/><circle cx=\"137.188\" cy=\"146.780\" r=\"4\"/><circle cx=\"145.242\" cy=\"178.154\" r=\"4\"/><circle cx=\"153.361\" cy=\"209.139\" r=\"4\"/><circle cx=\"161.377\" cy=\"240.323\" r=\"4\"/><circle cx=\"169.229\" cy=\"271.361\" r=\"4\"/><circle cx=\"177.132\" cy=\"302.282\" r=\"4\"/><circle cx=\"185.206\" cy=\"333.187\" r=\"4\"/><circle cx=\"193.218\" cy=\"363.917\" r=\"4\"/><circle cx=\"103.533\" cy=\"152.151\" r=\"4\"/><circle cx=\"112.120\" cy=\"183.945\" r=\"4\"/><circle cx=\"120.303\" cy=\"215.907\" r=\"4\"/><circle cx=\"128.384\" cy=\"248.002\" r=\"4\"/><circle cx=\"136.718\" cy=\"279.700\" r=\"4\"/><circle cx=\"144.832\" cy=\"311.529\" r=\"4\"/><circle cx=\"153.289\" cy=\"343.254\" r=\"4\"/><circle cx=\"161.296\" cy=\"374.692\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M252.668,125.484l6,6m-6,0l6,-6\"/><path d=\"M259.845,153.858l6,6m-6,0l6,-6\"/><path d=\"M267.006,182.171l6,6m-6,0l6,-6\"/><path d=\"M274.151,210.422l6,6m-6,0l6,-6\"/><path d=\"M281.281,238.612l6,6m-6,0l6,-6\"/><path d=\"M288.396,266.741l6,6m-6,0l6,-6\"/><path d=\"M295.495,294.809l6,6m-6,0l6,-6\"/><path d=\"M302.579,322.816l6,6m-6,0l6,-6\"/><path d=\"M225.177,129.723l6,6m-6,0l6,-6\"/><path d=\"M232.553,158.760l6,6m-6,0l6,-6\"/><path d=\"M239.913,187.732l6,6m-6,0l6,-6\"/><path d=\"M247.256,216.640l6,6m-6,0l6,-6\"/><path d=\"M254.583,245.483l6,6m-6,0l6,-6\"/><path d=\"M261.893,274.263l6,6m-6,0l6,-6\"/><path d=\"M269.188,302.979l6,6m-6,0l6,-6\"/><path d=\"M276.466,331.632l6,6m-6,0l6,-6\"/><path d=\"M196.361,134.167l6,6m-6,0l6,-6\"/><path d=\"M203.947,163.897l6,6m-6,0l6,-6\"/><path d=\"M211.516,193.560l6,6m-6,0l6,-6\"/><path d=\"M219.068,223.156l6,6m-6,0l6,-6\"/><path d=\"M226.603,252.684l6,6m-6,0l6,-6\"/><path d=\"M234.120,282.146l6,6m-6,0l6,-6\"/><path d=\"M241.621,311.540l6,6m-6,0l6,-6\"/><path d=\"M249.104,340.869l6,6m-6,0l6,-6\"/><path d=\"M166.121,138.830l6,6m-6,0l6,-6\"/><path d=\"M173.930,169.288l6,6m-6,0l6,-6\"/><path d=\"M181.720,199.676l6,6m-6,0l6,-6\"/><path d=\"M189.493,229.993l6,6m-6,0l6,-6\"/><path d=\"M197.247,260.239l6,6m-6,0l6,-6\"/><path d=\"M204.983,290.416l6,6m-6,0l6,-6\"/><path d=\"M212.702,320.522l6,6m-6,0l6,-6\"/><path d=\"M220.402,350.558l6,6m-6,0l6,-6\"/><path d=\"M134.349,143.729l6,6m-6,0l6,-6\"/><path d=\"M142.394,174.952l6,6m-6,0l6,-6\"/><path d=\"M150.419,206.101l6,6m-6,0l6,-6\"/><path d=\"M158.425,237.175l6,6m-6,0l6,-6\"/><path d=\"M166.411,268.175l6,6m-6,0l6,-6\"/><path d=\"M174.379,299.102l6,6m-6,0l6,-6\"/><path d=\"M182.328,329.955l6,6m-6,0l6,-6\"/><path d=\"M190.258,360.734l6,6m-6,0l6,-6\"/><path d=\"M100.926,148.882l6,6m-6,0l6,-6\"/><path d=\"M109.220,180.910l6,6m-6,0l6,-6\"/><path d=\"M117.494,212.859l6,6m-6,0l6,-6\"/><path d=\"M125.748,244.729l6,6m-6,0l6,-6\"/><path d=\"M133.981,276.522l6,6m-6,0l6,-6\"/><path d=\"M142.194,308.237l6,6m-6,0l6,-6\"/><path d=\"M150.387,339.875l6,6m-6,0l6,-6\"/><path d=\"M158.560,371.435l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img5.jpg"
        },
        {
          "label": "img6.jpg",
          "metrics": "Mean error 0.603 px · RMS error 0.728 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"225.395\" cy=\"137.666\" r=\"4\"/><circle cx=\"231.314\" cy=\"167.357\" r=\"4\"/><circle cx=\"237.373\" cy=\"196.620\" r=\"4\"/><circle cx=\"243.354\" cy=\"226.140\" r=\"4\"/><circle cx=\"249.275\" cy=\"255.761\" r=\"4\"/><circle cx=\"255.553\" cy=\"285.319\" r=\"4\"/><circle cx=\"261.628\" cy=\"314.809\" r=\"4\"/><circle cx=\"267.716\" cy=\"344.352\" r=\"4\"/><circle cx=\"205.930\" cy=\"135.994\" r=\"4\"/><circle cx=\"212.518\" cy=\"166.653\" r=\"4\"/><circle cx=\"218.722\" cy=\"197.584\" r=\"4\"/><circle cx=\"224.923\" cy=\"228.555\" r=\"4\"/><circle cx=\"231.152\" cy=\"259.834\" r=\"4\"/><circle cx=\"237.349\" cy=\"290.921\" r=\"4\"/><circle cx=\"243.999\" cy=\"321.872\" r=\"4\"/><circle cx=\"250.165\" cy=\"352.850\" r=\"4\"/><circle cx=\"184.499\" cy=\"133.465\" r=\"4\"/><circle cx=\"191.355\" cy=\"165.992\" r=\"4\"/><circle cx=\"197.382\" cy=\"199.062\" r=\"4\"/><circle cx=\"204.429\" cy=\"231.517\" r=\"4\"/><circle cx=\"211.062\" cy=\"264.377\" r=\"4\"/><circle cx=\"217.355\" cy=\"297.205\" r=\"4\"/><circle cx=\"224.763\" cy=\"329.815\" r=\"4\"/><circle cx=\"231.281\" cy=\"362.475\" r=\"4\"/><circle cx=\"160.629\" cy=\"131.065\" r=\"4\"/><circle cx=\"167.378\" cy=\"165.615\" r=\"4\"/><circle cx=\"174.285\" cy=\"200.249\" r=\"4\"/><circle cx=\"181.783\" cy=\"234.604\" r=\"4\"/><circle cx=\"188.669\" cy=\"269.436\" r=\"4\"/><circle cx=\"195.309\" cy=\"304.232\" r=\"4\"/><circle cx=\"203.464\" cy=\"338.463\" r=\"4\"/><circle cx=\"210.027\" cy=\"373.071\" r=\"4\"/><circle cx=\"133.452\" cy=\"128.583\" r=\"4\"/><circle cx=\"140.708\" cy=\"165.282\" r=\"4\"/><circle cx=\"148.849\" cy=\"201.539\" r=\"4\"/><circle cx=\"156.421\" cy=\"238.291\" r=\"4\"/><circle cx=\"163.359\" cy=\"275.148\" r=\"4\"/><circle cx=\"170.760\" cy=\"311.685\" r=\"4\"/><circle cx=\"178.891\" cy=\"348.362\" r=\"4\"/><circle cx=\"186.311\" cy=\"384.946\" r=\"4\"/><circle cx=\"102.643\" cy=\"125.558\" r=\"4\"/><circle cx=\"111.928\" cy=\"163.763\" r=\"4\"/><circle cx=\"119.666\" cy=\"203.257\" r=\"4\"/><circle cx=\"126.747\" cy=\"242.461\" r=\"4\"/><circle cx=\"135.081\" cy=\"281.403\" r=\"4\"/><circle cx=\"142.845\" cy=\"320.477\" r=\"4\"/><circle cx=\"151.649\" cy=\"359.375\" r=\"4\"/><circle cx=\"159.414\" cy=\"398.411\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M222.262,134.671l6,6m-6,0l6,-6\"/><path d=\"M228.357,164.190l6,6m-6,0l6,-6\"/><path d=\"M234.450,193.702l6,6m-6,0l6,-6\"/><path d=\"M240.543,223.208l6,6m-6,0l6,-6\"/><path d=\"M246.634,252.707l6,6m-6,0l6,-6\"/><path d=\"M252.723,282.199l6,6m-6,0l6,-6\"/><path d=\"M258.812,311.684l6,6m-6,0l6,-6\"/><path d=\"M264.898,341.163l6,6m-6,0l6,-6\"/><path d=\"M202.922,132.627l6,6m-6,0l6,-6\"/><path d=\"M209.330,163.651l6,6m-6,0l6,-6\"/><path d=\"M215.736,194.667l6,6m-6,0l6,-6\"/><path d=\"M222.141,225.676l6,6m-6,0l6,-6\"/><path d=\"M228.545,256.678l6,6m-6,0l6,-6\"/><path d=\"M234.947,287.673l6,6m-6,0l6,-6\"/><path d=\"M241.347,318.660l6,6m-6,0l6,-6\"/><path d=\"M247.746,349.640l6,6m-6,0l6,-6\"/><path d=\"M181.504,130.363l6,6m-6,0l6,-6\"/><path d=\"M188.259,163.054l6,6m-6,0l6,-6\"/><path d=\"M195.012,195.736l6,6m-6,0l6,-6\"/><path d=\"M201.764,228.410l6,6m-6,0l6,-6\"/><path d=\"M208.513,261.077l6,6m-6,0l6,-6\"/><path d=\"M215.262,293.735l6,6m-6,0l6,-6\"/><path d=\"M222.008,326.385l6,6m-6,0l6,-6\"/><path d=\"M228.753,359.026l6,6m-6,0l6,-6\"/><path d=\"M157.654,127.842l6,6m-6,0l6,-6\"/><path d=\"M164.795,162.389l6,6m-6,0l6,-6\"/><path d=\"M171.935,196.926l6,6m-6,0l6,-6\"/><path d=\"M179.073,231.455l6,6m-6,0l6,-6\"/><path d=\"M186.209,265.974l6,6m-6,0l6,-6\"/><path d=\"M193.343,300.485l6,6m-6,0l6,-6\"/><path d=\"M200.475,334.986l6,6m-6,0l6,-6\"/><path d=\"M207.605,369.478l6,6m-6,0l6,-6\"/><path d=\"M130.932,125.017l6,6m-6,0l6,-6\"/><path d=\"M138.508,161.644l6,6m-6,0l6,-6\"/><path d=\"M146.081,198.260l6,6m-6,0l6,-6\"/><path d=\"M153.651,234.865l6,6m-6,0l6,-6\"/><path d=\"M161.220,271.461l6,6m-6,0l6,-6\"/><path d=\"M168.787,308.046l6,6m-6,0l6,-6\"/><path d=\"M176.351,344.621l6,6m-6,0l6,-6\"/><path d=\"M183.914,381.186l6,6m-6,0l6,-6\"/><path d=\"M100.788,121.831l6,6m-6,0l6,-6\"/><path d=\"M108.853,160.803l6,6m-6,0l6,-6\"/><path d=\"M116.915,199.764l6,6m-6,0l6,-6\"/><path d=\"M124.975,238.713l6,6m-6,0l6,-6\"/><path d=\"M133.033,277.650l6,6m-6,0l6,-6\"/><path d=\"M141.088,316.576l6,6m-6,0l6,-6\"/><path d=\"M149.141,355.490l6,6m-6,0l6,-6\"/><path d=\"M157.191,394.393l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img6.jpg"
        },
        {
          "label": "img7.jpg",
          "metrics": "Mean error 0.786 px · RMS error 0.859 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"534.614\" cy=\"106.314\" r=\"4\"/><circle cx=\"538.020\" cy=\"147.675\" r=\"4\"/><circle cx=\"541.143\" cy=\"188.857\" r=\"4\"/><circle cx=\"544.600\" cy=\"227.844\" r=\"4\"/><circle cx=\"547.781\" cy=\"265.829\" r=\"4\"/><circle cx=\"550.531\" cy=\"302.964\" r=\"4\"/><circle cx=\"552.967\" cy=\"338.659\" r=\"4\"/><circle cx=\"555.687\" cy=\"373.257\" r=\"4\"/><circle cx=\"493.746\" cy=\"111.454\" r=\"4\"/><circle cx=\"497.095\" cy=\"151.556\" r=\"4\"/><circle cx=\"501.372\" cy=\"189.999\" r=\"4\"/><circle cx=\"504.782\" cy=\"227.592\" r=\"4\"/><circle cx=\"508.814\" cy=\"263.724\" r=\"4\"/><circle cx=\"512.365\" cy=\"299.464\" r=\"4\"/><circle cx=\"515.267\" cy=\"333.553\" r=\"4\"/><circle cx=\"518.539\" cy=\"366.582\" r=\"4\"/><circle cx=\"456.545\" cy=\"116.454\" r=\"4\"/><circle cx=\"460.739\" cy=\"154.519\" r=\"4\"/><circle cx=\"465.369\" cy=\"191.344\" r=\"4\"/><circle cx=\"469.413\" cy=\"227.376\" r=\"4\"/><circle cx=\"473.048\" cy=\"261.993\" r=\"4\"/><circle cx=\"477.184\" cy=\"295.742\" r=\"4\"/><circle cx=\"480.397\" cy=\"329.294\" r=\"4\"/><circle cx=\"483.707\" cy=\"360.671\" r=\"4\"/><circle cx=\"422.822\" cy=\"120.870\" r=\"4\"/><circle cx=\"427.733\" cy=\"157.111\" r=\"4\"/><circle cx=\"432.366\" cy=\"192.316\" r=\"4\"/><circle cx=\"436.506\" cy=\"227.205\" r=\"4\"/><circle cx=\"441.097\" cy=\"260.386\" r=\"4\"/><circle cx=\"444.704\" cy=\"293.052\" r=\"4\"/><circle cx=\"448.257\" cy=\"324.669\" r=\"4\"/><circle cx=\"452.338\" cy=\"355.447\" r=\"4\"/><circle cx=\"392.228\" cy=\"124.569\" r=\"4\"/><circle cx=\"397.430\" cy=\"159.439\" r=\"4\"/><circle cx=\"401.742\" cy=\"193.603\" r=\"4\"/><circle cx=\"406.205\" cy=\"226.873\" r=\"4\"/><circle cx=\"410.923\" cy=\"258.793\" r=\"4\"/><circle cx=\"415.468\" cy=\"290.136\" r=\"4\"/><circle cx=\"418.670\" cy=\"321.008\" r=\"4\"/><circle cx=\"423.243\" cy=\"350.434\" r=\"4\"/><circle cx=\"363.632\" cy=\"128.466\" r=\"4\"/><circle cx=\"368.267\" cy=\"162.089\" r=\"4\"/><circle cx=\"373.357\" cy=\"194.714\" r=\"4\"/><circle cx=\"378.558\" cy=\"226.118\" r=\"4\"/><circle cx=\"383.244\" cy=\"257.385\" r=\"4\"/><circle cx=\"387.529\" cy=\"287.520\" r=\"4\"/><circle cx=\"391.469\" cy=\"317.150\" r=\"4\"/><circle cx=\"395.722\" cy=\"345.720\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M531.444,103.080l6,6m-6,0l6,-6\"/><path d=\"M534.677,145.052l6,6m-6,0l6,-6\"/><path d=\"M537.803,185.647l6,6m-6,0l6,-6\"/><path d=\"M540.829,224.931l6,6m-6,0l6,-6\"/><path d=\"M543.758,262.967l6,6m-6,0l6,-6\"/><path d=\"M546.596,299.814l6,6m-6,0l6,-6\"/><path d=\"M549.347,335.525l6,6m-6,0l6,-6\"/><path d=\"M552.014,370.154l6,6m-6,0l6,-6\"/><path d=\"M490.727,108.564l6,6m-6,0l6,-6\"/><path d=\"M494.458,148.506l6,6m-6,0l6,-6\"/><path d=\"M498.071,187.197l6,6m-6,0l6,-6\"/><path d=\"M501.574,224.695l6,6m-6,0l6,-6\"/><path d=\"M504.970,261.054l6,6m-6,0l6,-6\"/><path d=\"M508.264,296.325l6,6m-6,0l6,-6\"/><path d=\"M511.462,330.557l6,6m-6,0l6,-6\"/><path d=\"M514.566,363.795l6,6m-6,0l6,-6\"/><path d=\"M453.668,113.556l6,6m-6,0l6,-6\"/><path d=\"M457.797,151.654l6,6m-6,0l6,-6\"/><path d=\"M461.802,188.612l6,6m-6,0l6,-6\"/><path d=\"M465.690,224.479l6,6m-6,0l6,-6\"/><path d=\"M469.464,259.302l6,6m-6,0l6,-6\"/><path d=\"M473.130,293.128l6,6m-6,0l6,-6\"/><path d=\"M476.692,325.997l6,6m-6,0l6,-6\"/><path d=\"M480.155,357.951l6,6m-6,0l6,-6\"/><path d=\"M419.796,118.118l6,6m-6,0l6,-6\"/><path d=\"M424.243,154.536l6,6m-6,0l6,-6\"/><path d=\"M428.563,189.909l6,6m-6,0l6,-6\"/><path d=\"M432.760,224.280l6,6m-6,0l6,-6\"/><path d=\"M436.841,257.693l6,6m-6,0l6,-6\"/><path d=\"M440.809,290.186l6,6m-6,0l6,-6\"/><path d=\"M444.669,321.798l6,6m-6,0l6,-6\"/><path d=\"M448.426,352.562l6,6m-6,0l6,-6\"/><path d=\"M388.717,122.304l6,6m-6,0l6,-6\"/><path d=\"M393.417,157.183l6,6m-6,0l6,-6\"/><path d=\"M397.989,191.102l6,6m-6,0l6,-6\"/><path d=\"M402.435,224.098l6,6m-6,0l6,-6\"/><path d=\"M406.763,256.210l6,6m-6,0l6,-6\"/><path d=\"M410.976,287.472l6,6m-6,0l6,-6\"/><path d=\"M415.080,317.917l6,6m-6,0l6,-6\"/><path d=\"M419.077,347.578l6,6m-6,0l6,-6\"/><path d=\"M360.098,126.159l6,6m-6,0l6,-6\"/><path d=\"M365.000,159.624l6,6m-6,0l6,-6\"/><path d=\"M369.771,192.203l6,6m-6,0l6,-6\"/><path d=\"M374.418,223.929l6,6m-6,0l6,-6\"/><path d=\"M378.944,254.837l6,6m-6,0l6,-6\"/><path d=\"M383.356,284.958l6,6m-6,0l6,-6\"/><path d=\"M387.656,314.321l6,6m-6,0l6,-6\"/><path d=\"M391.850,342.954l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img7.jpg"
        },
        {
          "label": "img8.jpg",
          "metrics": "Mean error 0.376 px · RMS error 0.456 px",
          "marks": "<g class=\"marks\" fill=\"none\" stroke-width=\"1.8\"><g stroke=\"#00ffff\"><circle cx=\"317.690\" cy=\"108.106\" r=\"4\"/><circle cx=\"353.431\" cy=\"133.991\" r=\"4\"/><circle cx=\"387.781\" cy=\"158.948\" r=\"4\"/><circle cx=\"420.712\" cy=\"182.814\" r=\"4\"/><circle cx=\"451.848\" cy=\"205.857\" r=\"4\"/><circle cx=\"481.992\" cy=\"228.101\" r=\"4\"/><circle cx=\"510.935\" cy=\"249.278\" r=\"4\"/><circle cx=\"538.895\" cy=\"269.769\" r=\"4\"/><circle cx=\"291.706\" cy=\"144.384\" r=\"4\"/><circle cx=\"327.252\" cy=\"169.092\" r=\"4\"/><circle cx=\"361.472\" cy=\"192.670\" r=\"4\"/><circle cx=\"394.104\" cy=\"215.525\" r=\"4\"/><circle cx=\"425.339\" cy=\"237.132\" r=\"4\"/><circle cx=\"455.283\" cy=\"258.121\" r=\"4\"/><circle cx=\"483.838\" cy=\"278.511\" r=\"4\"/><circle cx=\"511.545\" cy=\"297.598\" r=\"4\"/><circle cx=\"267.051\" cy=\"178.877\" r=\"4\"/><circle cx=\"302.051\" cy=\"202.574\" r=\"4\"/><circle cx=\"335.936\" cy=\"224.550\" r=\"4\"/><circle cx=\"368.567\" cy=\"246.377\" r=\"4\"/><circle cx=\"399.617\" cy=\"267.103\" r=\"4\"/><circle cx=\"429.421\" cy=\"286.672\" r=\"4\"/><circle cx=\"458.225\" cy=\"306.516\" r=\"4\"/><circle cx=\"485.807\" cy=\"324.859\" r=\"4\"/><circle cx=\"243.461\" cy=\"212.010\" r=\"4\"/><circle cx=\"278.184\" cy=\"234.009\" r=\"4\"/><circle cx=\"311.762\" cy=\"255.258\" r=\"4\"/><circle cx=\"344.132\" cy=\"276.213\" r=\"4\"/><circle cx=\"375.249\" cy=\"295.543\" r=\"4\"/><circle cx=\"404.867\" cy=\"314.328\" r=\"4\"/><circle cx=\"433.578\" cy=\"333.361\" r=\"4\"/><circle cx=\"461.164\" cy=\"350.571\" r=\"4\"/><circle cx=\"221.254\" cy=\"243.150\" r=\"4\"/><circle cx=\"255.565\" cy=\"264.087\" r=\"4\"/><circle cx=\"288.807\" cy=\"284.813\" r=\"4\"/><circle cx=\"320.974\" cy=\"304.283\" r=\"4\"/><circle cx=\"351.566\" cy=\"322.518\" r=\"4\"/><circle cx=\"381.237\" cy=\"340.681\" r=\"4\"/><circle cx=\"409.675\" cy=\"358.724\" r=\"4\"/><circle cx=\"437.318\" cy=\"375.482\" r=\"4\"/><circle cx=\"200.090\" cy=\"272.790\" r=\"4\"/><circle cx=\"233.666\" cy=\"293.817\" r=\"4\"/><circle cx=\"266.705\" cy=\"312.934\" r=\"4\"/><circle cx=\"298.421\" cy=\"330.828\" r=\"4\"/><circle cx=\"328.956\" cy=\"349.184\" r=\"4\"/><circle cx=\"358.387\" cy=\"366.294\" r=\"4\"/><circle cx=\"386.867\" cy=\"383.518\" r=\"4\"/><circle cx=\"414.228\" cy=\"399.372\" r=\"4\"/></g>\n    <g stroke=\"#ff782d\"><path d=\"M314.645,105.017l6,6m-6,0l6,-6\"/><path d=\"M350.383,131.152l6,6m-6,0l6,-6\"/><path d=\"M384.595,156.171l6,6m-6,0l6,-6\"/><path d=\"M417.375,180.144l6,6m-6,0l6,-6\"/><path d=\"M448.812,203.134l6,6m-6,0l6,-6\"/><path d=\"M478.988,225.202l6,6m-6,0l6,-6\"/><path d=\"M507.975,246.400l6,6m-6,0l6,-6\"/><path d=\"M535.844,266.781l6,6m-6,0l6,-6\"/><path d=\"M288.737,141.340l6,6m-6,0l6,-6\"/><path d=\"M324.189,166.088l6,6m-6,0l6,-6\"/><path d=\"M358.161,189.803l6,6m-6,0l6,-6\"/><path d=\"M390.744,212.549l6,6m-6,0l6,-6\"/><path d=\"M422.022,234.383l6,6m-6,0l6,-6\"/><path d=\"M452.071,255.360l6,6m-6,0l6,-6\"/><path d=\"M480.963,275.529l6,6m-6,0l6,-6\"/><path d=\"M508.763,294.935l6,6m-6,0l6,-6\"/><path d=\"M264.041,175.963l6,6m-6,0l6,-6\"/><path d=\"M299.195,199.423l6,6m-6,0l6,-6\"/><path d=\"M332.914,221.925l6,6m-6,0l6,-6\"/><path d=\"M365.285,243.528l6,6m-6,0l6,-6\"/><path d=\"M396.388,264.284l6,6m-6,0l6,-6\"/><path d=\"M426.294,284.242l6,6m-6,0l6,-6\"/><path d=\"M455.072,303.448l6,6m-6,0l6,-6\"/><path d=\"M482.785,321.942l6,6m-6,0l6,-6\"/><path d=\"M240.475,209.002l6,6m-6,0l6,-6\"/><path d=\"M275.321,231.263l6,6m-6,0l6,-6\"/><path d=\"M308.776,252.637l6,6m-6,0l6,-6\"/><path d=\"M340.923,273.174l6,6m-6,0l6,-6\"/><path d=\"M371.836,292.923l6,6m-6,0l6,-6\"/><path d=\"M401.585,311.928l6,6m-6,0l6,-6\"/><path d=\"M430.234,330.231l6,6m-6,0l6,-6\"/><path d=\"M457.844,347.870l6,6m-6,0l6,-6\"/><path d=\"M217.962,240.563l6,6m-6,0l6,-6\"/><path d=\"M252.493,261.708l6,6m-6,0l6,-6\"/><path d=\"M285.675,282.028l6,6m-6,0l6,-6\"/><path d=\"M317.587,301.570l6,6m-6,0l6,-6\"/><path d=\"M348.299,320.377l6,6m-6,0l6,-6\"/><path d=\"M377.878,338.490l6,6m-6,0l6,-6\"/><path d=\"M406.386,355.947l6,6m-6,0l6,-6\"/><path d=\"M433.880,372.783l6,6m-6,0l6,-6\"/><path d=\"M196.435,270.744l6,6m-6,0l6,-6\"/><path d=\"M230.645,290.848l6,6m-6,0l6,-6\"/><path d=\"M263.546,310.183l6,6m-6,0l6,-6\"/><path d=\"M295.214,328.793l6,6m-6,0l6,-6\"/><path d=\"M325.716,346.718l6,6m-6,0l6,-6\"/><path d=\"M355.115,363.995l6,6m-6,0l6,-6\"/><path d=\"M383.470,380.658l6,6m-6,0l6,-6\"/><path d=\"M410.836,396.740l6,6m-6,0l6,-6\"/></g></g>",
          "src": "https://raw.githubusercontent.com/denoskume/camera-calibration/f2cff3f4dba8ffba4a38cee4fec2726fd81caad7/data/calibration_images/img8.jpg"
        }
      ]
    },
    {
      "slug": "clap-zero-shot",
      "title": "When sound meets language",
      "subtitle": "CLAP zero-shot classification on ESC-50",
      "category": "Machine Learning",
      "kind": "Research experiment",
      "year": "2026",
      "featured": true,
      "summary": "Evaluating how text prompt design changes the accuracy of a pretrained audio-text model without task-specific fine-tuning.",
      "context": "Academic collaboration · Centrale Nantes · with Venkatesh Muthukrishnan",
      "tags": [
        "PyTorch",
        "Multimodal AI",
        "Zero-shot",
        "ESC-50"
      ],
      "cover": "https://raw.githubusercontent.com/denoskume/CLAP-Zero-Shot-Audio-Classification/main/outputs/figures/clap_complete_zero_shot_pipeline.png",
      "gallery": [
        {
          "src": "https://raw.githubusercontent.com/denoskume/CLAP-Zero-Shot-Audio-Classification/main/outputs/figures/clap_complete_zero_shot_pipeline.png",
          "caption": "Audio-text zero-shot classification pipeline"
        },
        {
          "src": "https://raw.githubusercontent.com/denoskume/CLAP-Zero-Shot-Audio-Classification/main/outputs/figures/topk_accuracy_line.png",
          "caption": "Top-k accuracy under the best prompt"
        },
        {
          "src": "https://raw.githubusercontent.com/denoskume/CLAP-Zero-Shot-Audio-Classification/main/outputs/figures/prompt_strategy_comparison_table.png",
          "caption": "Prompt strategy comparison"
        }
      ],
      "metrics": [
        {
          "value": "91.15%",
          "label": "Top-1 accuracy",
          "context": "Best prompt; ESC-50"
        },
        {
          "value": "+8.10 pt",
          "label": "Prompt impact",
          "context": "Versus class-only baseline"
        },
        {
          "value": "2,000",
          "label": "Audio samples",
          "context": "50 environmental categories"
        }
      ],
      "challenge": "A zero-shot model classifies audio by similarity to text labels, yet its performance may change substantially with prompt wording.",
      "approach": [
        "Load pretrained LAION-CLAP and prepare the full ESC-50 dataset.",
        "Evaluate ten prompt templates using normalized audio-text embeddings and cosine similarity.",
        "Measure Top-1 and Top-k classification and inspect class-level differences."
      ],
      "result": "Best Top-1 accuracy reached 91.15% versus 83.05% for the class-name baseline, with Top-5 accuracy of 99.00%.",
      "limitations": "One pretrained checkpoint and one benchmark dataset. Published supervised models in the notebook were contextual references, not rerun under the same protocol.",
      "codeTitle": "Cosine similarity classifier — illustrative excerpt",
      "code": "import torch\nimport torch.nn.functional as F\n\n# Audio and text embeddings produced by the pretrained model.\naudio_vec = F.normalize(audio_embeddings, dim=-1)\ntext_vec = F.normalize(text_embeddings, dim=-1)\nscores = audio_vec @ text_vec.T\npredicted_class_ids = scores.argmax(dim=-1)",
      "github": "https://github.com/denoskume/CLAP-Zero-Shot-Audio-Classification",
      "notebook": "https://github.com/denoskume/CLAP-Zero-Shot-Audio-Classification/blob/main/notebooks/main.ipynb"
    },
    {
      "slug": "feature-detection-tracking",
      "title": "Find. Match. Track.",
      "subtitle": "ORB feature matching and homography-based video tracking",
      "category": "Computer Vision",
      "kind": "Reproducible laboratory",
      "year": "2026",
      "summary": "Tracking a reference object through video using local descriptors, geometric verification and motion diagnostics.",
      "context": "MSc Computer Vision laboratory · Centrale Nantes",
      "tags": [
        "ORB",
        "RANSAC",
        "Homography",
        "Python"
      ],
      "cover": "computer-vision/feature-tracking/outputs/figures/representative_tracking_frames.png",
      "gallery": [
        {
          "src": "computer-vision/feature-tracking/outputs/figures/reference_orb_keypoints.png",
          "caption": "Reference features extracted with ORB"
        },
        {
          "src": "computer-vision/feature-tracking/outputs/figures/ransac_inlier_matches.png",
          "caption": "RANSAC-validated feature correspondences"
        },
        {
          "src": "computer-vision/feature-tracking/outputs/figures/matches_and_inliers_by_frame.png",
          "caption": "Feature matches and geometric inliers across video"
        }
      ],
      "metrics": [
        {
          "value": "ORB",
          "label": "Feature detector",
          "context": "Binary descriptors"
        },
        {
          "value": "RANSAC",
          "label": "Robust fitting",
          "context": "Homography verification"
        }
      ],
      "challenge": "Raw descriptor matches can be incorrect, particularly across perspective changes, occlusions and repetitive textures.",
      "approach": [
        "Detect ORB keypoints and compute binary descriptors.",
        "Match descriptors with Hamming distance and cross-check.",
        "Estimate a RANSAC homography and project a reference bounding box across frames."
      ],
      "result": "The laboratory produces tracked-frame overlays and per-frame match/inlier diagnostics for qualitative and numerical inspection.",
      "limitations": "Performance depends on scene texture, camera motion and the adequacy of the planar homography assumption.",
      "codeTitle": "ORB matching — illustrative Python excerpt",
      "code": "import cv2\n\norb = cv2.ORB_create(nfeatures=1200)\nkp_a, desc_a = orb.detectAndCompute(image_a, None)\nkp_b, desc_b = orb.detectAndCompute(image_b, None)\nmatcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)\nmatches = sorted(matcher.match(desc_a, desc_b), key=lambda m: m.distance)",
      "github": "https://github.com/denoskume/msc-coro-dassip-portfolio/tree/main/computer-vision/feature-tracking",
      "notebook": "https://github.com/denoskume/msc-coro-dassip-portfolio/blob/main/computer-vision/feature-tracking/notebooks/main.ipynb"
    },
    {
      "slug": "segmentation-lab",
      "title": "From pixels to objects",
      "subtitle": "Classical segmentation and morphology",
      "category": "Image Processing",
      "kind": "Reproducible laboratory",
      "year": "2026",
      "summary": "Thresholding, morphological cleanup, contour analysis and watershed: building and evaluating binary masks step by step.",
      "context": "MSc Image Processing laboratory · Centrale Nantes",
      "tags": [
        "Thresholding",
        "Morphology",
        "Watershed",
        "OpenCV"
      ],
      "cover": "image-processing/segmentation/outputs/figures/21_complete_pipeline.png",
      "gallery": [
        {
          "src": "image-processing/segmentation/outputs/figures/05_otsu_threshold.png",
          "caption": "Otsu thresholding on a test image"
        },
        {
          "src": "image-processing/segmentation/outputs/figures/10_opening_closing.png",
          "caption": "Morphological opening and closing"
        },
        {
          "src": "image-processing/segmentation/outputs/figures/20_watershed.png",
          "caption": "Marker-based watershed segmentation"
        }
      ],
      "metrics": [
        {
          "value": "28",
          "label": "Tasks",
          "context": "Problem statement sequence"
        },
        {
          "value": "Dice / IoU",
          "label": "Validation",
          "context": "Pixel overlap measures"
        }
      ],
      "challenge": "Binary masks require more than a single threshold: illumination, noise and touching regions affect object recovery.",
      "approach": [
        "Compare manual, Otsu and adaptive thresholding.",
        "Apply connected components, contours and morphological operations.",
        "Test distance transforms, watershed and overlap metrics."
      ],
      "result": "A repeatable end-to-end mask-generation workflow with numerical validation and explanatory figures.",
      "limitations": "Classical methods remain sensitive to illumination, chosen thresholds and object shapes.",
      "codeTitle": "Morphology — illustrative Python excerpt",
      "code": "import cv2\n\n_, mask = cv2.threshold(gray, 0, 255,\n                        cv2.THRESH_BINARY + cv2.THRESH_OTSU)\nkernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))\nclean = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)",
      "github": "https://github.com/denoskume/msc-coro-dassip-portfolio/tree/main/image-processing/segmentation",
      "notebook": "https://github.com/denoskume/msc-coro-dassip-portfolio/blob/main/image-processing/segmentation/notebooks/main.ipynb"
    },
    {
      "slug": "frequency-domain-filtering",
      "title": "Working in the frequency domain",
      "subtitle": "Fourier transforms, filtering and periodic noise",
      "category": "Image Processing",
      "kind": "Reproducible laboratory",
      "year": "2026",
      "summary": "Studying how Fourier magnitude and phase explain image structure and support frequency-selective filtering.",
      "context": "MSc Image Processing laboratory · Centrale Nantes",
      "tags": [
        "FFT",
        "Notch filters",
        "Fourier",
        "NumPy"
      ],
      "cover": "image-processing/filtering-in-frequency-domain/outputs/figures/16_notch_filter.png",
      "gallery": [
        {
          "src": "image-processing/filtering-in-frequency-domain/outputs/figures/03_house_spectrum.png",
          "caption": "Fourier spectrum of a real image"
        },
        {
          "src": "image-processing/filtering-in-frequency-domain/outputs/figures/11_ringing.png",
          "caption": "Ringing introduced by sharp frequency cutoffs"
        },
        {
          "src": "image-processing/filtering-in-frequency-domain/outputs/figures/17_moire_removal.png",
          "caption": "Suppression of moiré interference"
        }
      ],
      "metrics": [
        {
          "value": "2D FFT",
          "label": "Transform",
          "context": "Frequency analysis"
        },
        {
          "value": "26",
          "label": "Tasks",
          "context": "Problem statement sequence"
        }
      ],
      "challenge": "Periodic interference may be easier to isolate in a spectrum than by spatial filtering, but filtering can introduce artifacts.",
      "approach": [
        "Visualize centered 2D Fourier magnitude and phase.",
        "Compare ideal, Gaussian and Butterworth frequency filters.",
        "Design frequency rejection masks and assess artifacts and reconstructions."
      ],
      "result": "Explanatory outputs cover notch filtering, moiré removal, ringing and illumination correction.",
      "limitations": "Spectral filtering requires careful choice of passbands; aggressive rejection can erase useful image detail.",
      "codeTitle": "Fourier transform — illustrative Python excerpt",
      "code": "import numpy as np\n\nspectrum = np.fft.fftshift(np.fft.fft2(gray))\nmagnitude = np.log1p(np.abs(spectrum))\n# Build a frequency-domain mask, then invert after filtering.\nfiltered = spectrum * frequency_mask\nreconstructed = np.fft.ifft2(np.fft.ifftshift(filtered)).real",
      "github": "https://github.com/denoskume/msc-coro-dassip-portfolio/tree/main/image-processing/filtering-in-frequency-domain",
      "notebook": "https://github.com/denoskume/msc-coro-dassip-portfolio/blob/main/image-processing/filtering-in-frequency-domain/notebooks/main.ipynb"
    },
    {
      "slug": "spatial-domain-filtering",
      "title": "Remove noise. Keep the detail.",
      "subtitle": "Spatial-domain filtering and edge analysis",
      "category": "Image Processing",
      "kind": "Reproducible laboratory",
      "year": "2026",
      "summary": "A comparative study of smoothing, denoising, sharpening and image-gradient operators, with visual diagnostics.",
      "context": "MSc Image Processing laboratory · Centrale Nantes",
      "tags": [
        "Gaussian",
        "Bilateral",
        "Sobel",
        "PSNR"
      ],
      "cover": "image-processing/filtering-in-spatial-domain/outputs/figures/10_bilateral_filter.png",
      "gallery": [
        {
          "src": "image-processing/filtering-in-spatial-domain/outputs/figures/07_noise_types.png",
          "caption": "Different noise models"
        },
        {
          "src": "image-processing/filtering-in-spatial-domain/outputs/figures/06_mean_vs_gaussian.png",
          "caption": "Smoothing kernel comparisons"
        },
        {
          "src": "image-processing/filtering-in-spatial-domain/outputs/figures/14_sobel_gradients.png",
          "caption": "Sobel edge gradients"
        }
      ],
      "metrics": [
        {
          "value": "23",
          "label": "Tasks",
          "context": "Problem statement sequence"
        },
        {
          "value": "PSNR",
          "label": "Validation",
          "context": "Error-based image comparison"
        }
      ],
      "challenge": "Noise reduction and detail preservation compete; a smooth image may have erased useful fine structures.",
      "approach": [
        "Implement convolution, padding and neighborhood operations.",
        "Contrast mean, Gaussian, median and bilateral filtering under different noise models.",
        "Study Laplacian sharpening and Sobel/Scharr gradient responses."
      ],
      "result": "The experiments visualize filter effects and compare behavior under multiple image-noise conditions.",
      "limitations": "Quality metrics and visual usefulness are not interchangeable; parameter selection depends on the application.",
      "codeTitle": "Edge-preserving filter — illustrative Python excerpt",
      "code": "import cv2\n\nfiltered = cv2.bilateralFilter(gray, d=7,\n                               sigmaColor=45, sigmaSpace=45)\nedge_x = cv2.Sobel(filtered, cv2.CV_32F, 1, 0, ksize=3)\nedge_y = cv2.Sobel(filtered, cv2.CV_32F, 0, 1, ksize=3)\nedge_strength = cv2.magnitude(edge_x, edge_y)",
      "github": "https://github.com/denoskume/msc-coro-dassip-portfolio/tree/main/image-processing/filtering-in-spatial-domain",
      "notebook": "https://github.com/denoskume/msc-coro-dassip-portfolio/blob/main/image-processing/filtering-in-spatial-domain/notebooks/main.ipynb"
    },
    {
      "slug": "image-transformations",
      "title": "Change the view, preserve the meaning",
      "subtitle": "Intensity and geometric image transformations",
      "category": "Image Processing",
      "kind": "Reproducible laboratory",
      "year": "2026",
      "summary": "Exploring point transforms, geometric mappings and interpolation to understand their impact on pixels and image information.",
      "context": "MSc Image Processing laboratory · Centrale Nantes",
      "tags": [
        "Geometric transforms",
        "Interpolation",
        "Gamma",
        "NumPy"
      ],
      "cover": "image-processing/image-transformation/outputs/figures/14_interpolation_comparison.png",
      "gallery": [
        {
          "src": "image-processing/image-transformation/outputs/figures/06_gamma_examples.png",
          "caption": "Gamma transformations and intensity mapping"
        },
        {
          "src": "image-processing/image-transformation/outputs/figures/12_rotation_origin_center.png",
          "caption": "Image rotation about different centers"
        },
        {
          "src": "image-processing/image-transformation/outputs/figures/14_interpolation_comparison.png",
          "caption": "Interpolation method comparison"
        }
      ],
      "metrics": [
        {
          "value": "25",
          "label": "Tasks",
          "context": "Problem statement sequence"
        },
        {
          "value": "Affine",
          "label": "Geometry",
          "context": "Coordinate transforms"
        }
      ],
      "challenge": "Warping images requires explicit choices about mapping directions, interpolation and border behavior.",
      "approach": [
        "Compare negative, logarithmic, gamma and contrast transforms.",
        "Work with homogeneous coordinates and affine transformation matrices.",
        "Check inverse mapping and nearest-neighbor, bilinear and bicubic interpolation."
      ],
      "result": "A catalog of worked transformations with controlled visual examples and validation.",
      "limitations": "Multiple transformations can introduce interpolation blur and cropping; output geometry matters.",
      "codeTitle": "Affine transform — illustrative Python excerpt",
      "code": "import cv2\nimport numpy as np\n\nheight, width = image.shape[:2]\ncenter = (width / 2, height / 2)\nrotation = cv2.getRotationMatrix2D(center, angle=20, scale=1.0)\nrotated = cv2.warpAffine(image, rotation, (width, height))",
      "github": "https://github.com/denoskume/msc-coro-dassip-portfolio/tree/main/image-processing/image-transformation",
      "notebook": "https://github.com/denoskume/msc-coro-dassip-portfolio/blob/main/image-processing/image-transformation/notebooks/main.ipynb"
    },
    {
      "slug": "image-processing-fundamentals",
      "title": "Understand every pixel",
      "subtitle": "Numerical foundations of digital image processing",
      "category": "Image Processing",
      "kind": "Reproducible laboratory",
      "year": "2026",
      "summary": "A practical foundation in image representation, color channels, histograms, noise and quantitative comparison.",
      "context": "MSc Image Processing laboratory · Centrale Nantes",
      "tags": [
        "NumPy",
        "Histograms",
        "Color spaces",
        "Sampling"
      ],
      "cover": "image-processing/image-processing-fundamentals/outputs/figures/09_rgb_channels.png",
      "gallery": [
        {
          "src": "image-processing/image-processing-fundamentals/outputs/figures/02_quantization.png",
          "caption": "Quantization and digital intensity levels"
        },
        {
          "src": "image-processing/image-processing-fundamentals/outputs/figures/09_rgb_channels.png",
          "caption": "Decomposition into RGB color channels"
        },
        {
          "src": "image-processing/image-processing-fundamentals/outputs/figures/14_noise_models.png",
          "caption": "Gaussian, impulse, Poisson and speckle noise"
        }
      ],
      "metrics": [
        {
          "value": "23",
          "label": "Tasks",
          "context": "Problem statement sequence"
        },
        {
          "value": "RGB / Gray",
          "label": "Representation",
          "context": "Channel analysis"
        }
      ],
      "challenge": "Many image-processing bugs start with a misunderstanding of data types, channel order or numerical range.",
      "approach": [
        "Read and inspect grayscale/RGB images and their numerical representation.",
        "Compare sampling, quantization, dynamic range and intensity histograms.",
        "Generate noise models and calculate numerical comparison metrics."
      ],
      "result": "A documented, validated foundation for later computer-vision pipelines.",
      "limitations": "The exercises are educational demonstrations, not a benchmark of deployed systems.",
      "codeTitle": "Grayscale histogram — illustrative Python excerpt",
      "code": "import cv2\nimport numpy as np\n\nrgb = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2RGB)\ngray = cv2.cvtColor(bgr_image, cv2.COLOR_BGR2GRAY)\nhist, edges = np.histogram(gray.ravel(), bins=256, range=(0, 256))",
      "github": "https://github.com/denoskume/msc-coro-dassip-portfolio/tree/main/image-processing/image-processing-fundamentals",
      "notebook": "https://github.com/denoskume/msc-coro-dassip-portfolio/blob/main/image-processing/image-processing-fundamentals/notebooks/main.ipynb"
    },
    {
      "slug": "mnist-mlp",
      "title": "Learning representation from digits",
      "subtitle": "PyTorch MLP model-capacity comparison on MNIST",
      "category": "Machine Learning",
      "kind": "Reproducible laboratory",
      "year": "2026",
      "summary": "A controlled experiment comparing three one-hidden-layer MLP configurations on handwritten digit classification.",
      "context": "MSc Deep Learning laboratory · Centrale Nantes",
      "tags": [
        "PyTorch",
        "MLP",
        "MNIST",
        "Evaluation"
      ],
      "cover": "computer-vision/deep-learning/outputs/figures/mnist_predictions_256.png",
      "gallery": [
        {
          "src": "computer-vision/deep-learning/outputs/figures/mnist_sample_batch.png",
          "caption": "Sample digit images from MNIST"
        },
        {
          "src": "computer-vision/deep-learning/outputs/figures/training_loss_comparison.png",
          "caption": "Training behavior across hidden widths"
        },
        {
          "src": "computer-vision/deep-learning/outputs/figures/pr_accuracy_curve.png",
          "caption": "Model prediction confidence and performance"
        }
      ],
      "metrics": [
        {
          "value": "3",
          "label": "Model sizes",
          "context": "128, 256 and 512 neurons"
        },
        {
          "value": "MNIST",
          "label": "Dataset",
          "context": "Handwritten digits"
        }
      ],
      "challenge": "Increasing model capacity can improve representation but may change optimization behavior and generalization.",
      "approach": [
        "Normalize MNIST data and build a one-hidden-layer MLP in PyTorch.",
        "Train controlled 128/256/512 hidden-unit variants with BatchNorm, ReLU and Adam.",
        "Inspect training curves, prediction confidence and test outputs."
      ],
      "result": "The laboratory records a controlled comparison with training curves, predictions and evaluation checks.",
      "limitations": "A compact educational MLP experiment; the scope does not include production deployment or a CNN benchmark.",
      "codeTitle": "Small MLP — illustrative Python excerpt",
      "code": "import torch.nn as nn\n\nmodel = nn.Sequential(\n    nn.Flatten(),\n    nn.Linear(28 * 28, 256),\n    nn.BatchNorm1d(256),\n    nn.ReLU(),\n    nn.Linear(256, 10),\n)",
      "github": "https://github.com/denoskume/msc-coro-dassip-portfolio/tree/main/computer-vision/deep-learning",
      "notebook": "https://github.com/denoskume/msc-coro-dassip-portfolio/blob/main/computer-vision/deep-learning/notebooks/main.ipynb"
    }
  ],
  "articles": [
    {
      "slug": "fluoroscopy-dice-metric",
      "title": "Why a good-looking mask can still be wrong",
      "tag": "Image processing",
      "date": "2026 · Laboratory note",
      "minutes": "5 min read",
      "summary": "A practical reminder that image-level error and foreground overlap tell very different stories.",
      "cover": "https://raw.githubusercontent.com/denoskume/Background-Subtraction-Fluoroscopy/main/assets/mask-cleanup.png",
      "sections": [
        {
          "heading": "The problem with background accuracy",
          "body": "When the foreground is a thin microcatheter, almost all image pixels belong to the background. A trivial background prediction can look strong under a whole-image error metric while missing the object that matters."
        },
        {
          "heading": "Evaluate the actual target",
          "body": "For the fluoroscopy project, I compared predicted instruments against manually traced references using Dice and IoU, alongside pixel-error metrics. The aim was to make missed segments and false detections visible rather than reduce the task to one score."
        },
        {
          "heading": "A result with boundaries",
          "body": "The continuous-trace experiment increased mean Dice from 0.501 to 0.876 on nine motion frames. This is within-sequence development evidence on a single acquisition, not independent clinical validation."
        },
        {
          "heading": "What I would test next",
          "body": "Independent acquisitions, different imaging conditions and a prospective reader review would be necessary before making broader claims."
        }
      ],
      "project": "fluoroscopy-instrument-segmentation"
    },
    {
      "slug": "camera-calibration-reprojection",
      "title": "What 0.434 pixels says about a camera model",
      "tag": "Computer vision",
      "date": "2026 · Engineering note",
      "minutes": "4 min read",
      "summary": "Reading reprojection errors as diagnostics rather than treating calibration as a single matrix.",
      "cover": "https://raw.githubusercontent.com/denoskume/camera-calibration/main/outputs/figures/mean_reprojection_error_by_view.png",
      "sections": [
        {
          "heading": "From corners to geometry",
          "body": "Camera calibration starts with known points on a chessboard. A model projects those points onto the image plane; the disagreement with detected corners becomes a measurable reprojection residual."
        },
        {
          "heading": "Look beyond the average",
          "body": "In this laboratory nine views produced a mean error of 0.434 pixels, but the largest view-level RMS error was 0.859 pixels. Per-view plots reveal where a calibration deserves closer inspection."
        },
        {
          "heading": "Not the same as metrology readiness",
          "body": "A low image reprojection error is not a guarantee of measurement accuracy on real parts. Optical distortion, fixture geometry and real-world tolerances require independent validation."
        }
      ],
      "project": "camera-calibration"
    },
    {
      "slug": "prompting-zero-shot-clap",
      "title": "One prompt. Eight more accuracy points.",
      "tag": "Multimodal AI",
      "date": "2026 · Research note",
      "minutes": "5 min read",
      "summary": "Ten prompt templates, one frozen model and a surprisingly consequential design choice.",
      "cover": "https://raw.githubusercontent.com/denoskume/CLAP-Zero-Shot-Audio-Classification/main/outputs/figures/topk_accuracy_line.png",
      "sections": [
        {
          "heading": "A zero-shot baseline",
          "body": "LAION-CLAP maps environmental audio and natural-language descriptions into a shared embedding space. It does not need a task-specific classification head to rank ESC-50 classes."
        },
        {
          "heading": "A controlled prompt comparison",
          "body": "We evaluated ten manually designed prompt templates over 2,000 ESC-50 clips. The class-name-only baseline reached 83.05% Top-1 accuracy."
        },
        {
          "heading": "The best formulation",
          "body": "The template 'an audio recording of {}' produced 91.15% Top-1 accuracy and 99.00% Top-5. The +8.10 percentage-point change came from text representation, without fine-tuning the model."
        },
        {
          "heading": "Limits",
          "body": "This does not establish a universal best prompt: results depend on the model checkpoint, task vocabulary and dataset."
        }
      ],
      "project": "clap-zero-shot"
    },
    {
      "slug": "why-reproducible-notebooks",
      "title": "From notebook to evidence",
      "tag": "Workflow",
      "date": "2026 · Process note",
      "minutes": "3 min read",
      "summary": "A repeatable structure for experiments that someone else should be able to inspect.",
      "cover": "computer-vision/feature-tracking/outputs/figures/ransac_inlier_matches.png",
      "sections": [
        {
          "heading": "Separate the question from the code",
          "body": "The laboratory repositories organize their material into Problem Statement, Requirements, Theory and Implementation notebooks. That separation helps make assumptions visible."
        },
        {
          "heading": "Save the visual trail",
          "body": "Keeping generated figures under outputs/figures makes it possible to compare methods without scrolling through thousands of notebook cells."
        },
        {
          "heading": "State limitations clearly",
          "body": "A project page should explain the conditions of an experiment, not just present the best number. Reproducibility and transparent limitations are part of the result."
        }
      ],
      "project": "feature-detection-tracking"
    }
  ],
  "research": [
    {
      "title": "Multimodal representations without fine-tuning",
      "stage": "Completed academic experiment",
      "summary": "How prompt wording affects audio-text embedding alignment and classification on ESC-50.",
      "method": "LAION-CLAP · cosine similarity · benchmark of ten prompt templates",
      "link": "clap-zero-shot"
    },
    {
      "title": "Geometric calibration and visual inspection",
      "stage": "Completed academic case study",
      "summary": "Studying calibration residuals, corner detection and geometry for a hypothetical industrial inspection station.",
      "method": "Zhang calibration · nine planar views · reprojection diagnostics",
      "link": "camera-calibration"
    },
    {
      "title": "Predictive maintenance for transport systems",
      "stage": "Research interest / exploration",
      "summary": "Exploring how data quality, anomaly detection and predictive methods can support reliable railway maintenance workflows.",
      "method": "Literature exploration · statistical learning · industrial analytics",
      "link": null
    }
  ]
};
