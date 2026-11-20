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
      "title": "Seeing the invisible",
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
      "codeTitle": "Background subtraction — illustrative Python excerpt",
      "code": "import cv2\nimport numpy as np\n\nreference = cv2.imread('reference.png', cv2.IMREAD_GRAYSCALE)\ncurrent = cv2.imread('frame.png', cv2.IMREAD_GRAYSCALE)\n\nmotion = cv2.absdiff(current, reference)\nmotion = cv2.GaussianBlur(motion, (5, 5), 0)\n_, mask = cv2.threshold(motion, 26, 255, cv2.THRESH_BINARY)\n# Compare mask against annotated tracings with Dice / IoU.",
      "github": "https://github.com/denoskume/Background-Subtraction-Fluoroscopy",
      "notebook": "https://github.com/denoskume/Background-Subtraction-Fluoroscopy/blob/main/Fluoroscopy_Instrument_Segmentation.ipynb",
      "demo": "https://raw.githack.com/denoskume/Background-Subtraction-Fluoroscopy/main/review/index.html"
    },
    {
      "slug": "camera-calibration",
      "title": "Geometry before intelligence",
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
      "codeTitle": "Reprojection error — illustrative Python excerpt",
      "code": "import numpy as np\n\n# observed_xy and projected_xy are N x 2 image coordinates.\nresidual = observed_xy - projected_xy\nper_corner_error = np.linalg.norm(residual, axis=1)\nmean_reprojection_error = np.mean(per_corner_error)\nprint(f'Mean reprojection error: {mean_reprojection_error:.3f} px')",
      "github": "https://github.com/denoskume/camera-calibration",
      "notebook": "https://github.com/denoskume/camera-calibration/blob/main/Camera_Calibration.ipynb",
      "demo": "https://raw.githack.com/denoskume/camera-calibration/main/review/index.html"
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
