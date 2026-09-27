<p>
  <img align="left" src="https://www.ec-nantes.fr/medias/photo/logocn-rvb_1648479844750-png?ID_FICHE=178994&amp;INLINE=FALSE" alt="Centrale Nantes" height="64">
</p>
<p align="right"><strong>MSc. CORO DASSIP</strong></p>
<br clear="both">

<h1 align="center">Image Processing</h1>

Laboratory modules in **digital image processing**.

**Topics:** image representation, intensity and geometric transformations, spatial filtering, frequency-domain filtering, and segmentation.

## Modules

| Module | Technical scope |
| --- | --- |
| [Image Processing Fundamentals](image-processing-fundamentals) | image representation, sampling, quantization, pixels, channels, statistics, histograms, noise, image comparison |
| [Image Transformation](image-transformation) | pointwise intensity mappings, homogeneous coordinates, interpolation, affine geometry, inverse mapping, transformation composition |
| [Spatial-Domain Filtering](filtering-in-spatial-domain) | convolution, border handling, smoothing, denoising, sharpening, Sobel, Prewitt, Scharr, RGB filtering |
| [Frequency-Domain Filtering](filtering-in-frequency-domain) | 2-D FFT, magnitude/phase analysis, Ideal/Gaussian/Butterworth filters, notch filtering, moiré suppression, illumination correction |
| [Image Segmentation](segmentation) | thresholding, morphology, connected components, contours, HSV segmentation, watershed, pixel accuracy, precision, recall, IoU, Dice |

## Notebook Structure

Each module contains:

```text
notebooks/
├── problem_statement.ipynb
├── theory.ipynb
├── requirements.ipynb
└── main.ipynb
```

- **Theory** — mathematical foundations, assumptions, limitations, and references.
- **Problem Statement** — context, tasks, inputs, objectives, and deliverables.
- **Requirements** — environment, dependencies, required data, and installation.
- **Algorithm** — complete end-to-end procedure, decision points, stage outputs, acceptance checks, and handoffs.
- **Implementation** — executable code, outputs, metrics, diagnostics, and validation.

## Module Standard

- repository-relative paths;
- module-specific `requirements.txt`;
- explicit algorithm-to-implementation traceability;
- top-to-bottom implementation workflow;
- generated figures under `outputs/figures/`;
- controlled parameter studies where defined by the experiment;
- quantitative metrics and visual diagnostics;
- explicit numerical and output validation.

## Directory Structure

```text
image-processing/
├── README.md
├── image-processing-fundamentals/
├── image-transformation/
├── filtering-in-spatial-domain/
├── filtering-in-frequency-domain/
└── segmentation/
```

---

<p align="center">
  <a href="../../README.md">
    <img src="../../assets/nav-portfolio-home.svg" height="44" alt="Portfolio home" />
  </a>
</p>
