<p>
  <img align="left" src="https://www.ec-nantes.fr/medias/photo/logocn-rvb_1648479844750-png?ID_FICHE=178994&amp;INLINE=FALSE" alt="Centrale Nantes" height="64">
</p>
<p align="right"><strong>MSc. CORO DASSIP</strong></p>
<br clear="both">

<h1 align="center">MSc CORO DASSIP — Portfolio</h1>

This repository brings together laboratory modules in **Computer Vision, Image Processing, and Deep Learning**.

Each lab begins with a defined experimental objective, develops the relevant theory and assumptions, implements the required methods, and evaluates the results through quantitative measures, visual diagnostics, and validation checks.

All labs follow the same structure:

- **Problem Statement** — defines the experiment
- **Theory** — develops the required concepts and models
- **Requirements** — specifies the environment and data
- **Implementation** — contains the executable workflow, results, and validation

Source data and generated figures are kept separate in `data/` and `outputs/`.

Beyond the code, the notebooks document the experimental reasoning: how methods and parameters are selected, how results are interpreted, which assumptions hold, and where limitations appear.

---

## Laboratory Work

### Computer Vision

<p align="center">
  <a href="labs/computer-vision/camera-calibration">
    <img src="assets/labs/camera-calibration.svg" width="49%" alt="Camera Calibration" />
  </a>
  <a href="labs/computer-vision/feature-tracking">
    <img src="assets/labs/feature-tracking.svg" width="49%" alt="Feature Detection and Tracking" />
  </a>
</p>

<p align="center">
  <a href="labs/computer-vision/deep-learning">
    <img src="assets/labs/deep-learning.svg" width="49%" alt="Deep Learning" />
  </a>
</p>

### Image Processing

<p align="center">
  <a href="labs/image-processing/image-processing-fundamentals">
    <img src="assets/labs/image-processing-fundamentals.svg" width="49%" alt="Image Processing Fundamentals" />
  </a>
  <a href="labs/image-processing/image-transformation">
    <img src="assets/labs/image-transformation.svg" width="49%" alt="Image Transformation" />
  </a>
</p>

<p align="center">
  <a href="labs/image-processing/filtering-in-spatial-domain">
    <img src="assets/labs/filtering-spatial.svg" width="49%" alt="Spatial-Domain Filtering" />
  </a>
  <a href="labs/image-processing/filtering-in-frequency-domain">
    <img src="assets/labs/filtering-frequency.svg" width="49%" alt="Frequency-Domain Filtering" />
  </a>
</p>

<p align="center">
  <a href="labs/image-processing/segmentation">
    <img src="assets/labs/segmentation.svg" width="49%" alt="Image Segmentation" />
  </a>
</p>

---

## Repository Structure

```text
msc-coro-dassip-portfolio/
├── labs/
│   ├── computer-vision/
│   │   ├── README.md
│   │   ├── camera-calibration/
│   │   ├── deep-learning/
│   │   └── feature-tracking/
│   │
│   └── image-processing/
│       ├── README.md
│       ├── filtering-in-frequency-domain/
│       ├── filtering-in-spatial-domain/
│       ├── image-processing-fundamentals/
│       ├── image-transformation/
│       └── segmentation/
├── .github/
│   └── workflows/
│       └── notebook-qa.yml
├── scripts/
│   └── validate_notebooks.py
├── .gitignore
└── README.md
```

---


<p align="center">
  <a href="https://github.com/denoskume">
    <img src="assets/nav-github-profile.svg" height="44" alt="GitHub Profile" />
  </a>
</p>
