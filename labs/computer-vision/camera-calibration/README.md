<p>
  <img align="left" src="https://www.ec-nantes.fr/medias/photo/logocn-rvb_1648479844750-png?ID_FICHE=178994&amp;INLINE=FALSE" alt="Centrale Nantes" height="64">
</p>
<p align="right"><strong>MSc. CORO DASSIP</strong></p>
<br clear="both">

<h1 align="center">Camera Calibration</h1>

Planar camera calibration from multiple chessboard views using normalized DLT and Zhang's method.

The lab is organized into four complementary notebooks:

- [Problem Statement](notebooks/problem_statement.ipynb) — problem definition, inputs, expected outputs, and the 13 required tasks.
- [Requirements](notebooks/requirements.ipynb) — Python environment, required packages, input-data checks, and execution prerequisites.
- [Theory](notebooks/theory.ipynb) — mathematical formulation, derivations, modeling assumptions, failure modes, and limitations.
- [Implementation](notebooks/main.ipynb) — executable workflow with code, generated outputs, metrics, diagnostics, and validation.

## Outputs

Generated figures are stored in:

```text
outputs/figures/
```

Main outputs:

- `detected_chessboard_corners.png`
- `homography_estimation_pipeline.png`
- `estimated_camera_poses.png`
- `reprojection_results.png`
- `mean_reprojection_error_by_view.png`
- `reprojection_error_distribution.png`

## Run

From the repository root:

```bash
cd labs/computer-vision/camera-calibration

python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
code .
```

Open [main.ipynb](notebooks/main.ipynb), select the project `.venv` kernel, and run all cells from top to bottom.

A successful execution ends with:

```text
All Camera Calibration validation checks passed.
```

## Lab Structure

```text
camera-calibration/
├── data/
│   └── calibration_images/
├── notebooks/
│   ├── problem_statement.ipynb
│   ├── theory.ipynb
│   ├── requirements.ipynb
│   └── main.ipynb
├── outputs/
│   └── figures/
├── requirements.txt
└── README.md
```

## Scope

Implemented:

- planar camera calibration;
- normalized DLT;
- Zhang calibration;
- intrinsic and pose recovery;
- reprojection analysis;
- numerical and visual validation.


---

<p align="center">
  <a href="../README.md">
    <img src="../../../assets/nav-computer-vision.svg" height="44" alt="Computer Vision" />
  </a>
  &nbsp;&nbsp;
  <a href="../../../README.md">
    <img src="../../../assets/nav-portfolio-home.svg" height="44" alt="Portfolio home" />
  </a>
</p>
