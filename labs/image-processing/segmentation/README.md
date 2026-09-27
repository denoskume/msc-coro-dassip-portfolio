<p>
  <img align="left" src="https://www.ec-nantes.fr/medias/photo/logocn-rvb_1648479844750-png?ID_FICHE=178994&amp;INLINE=FALSE" alt="Centrale Nantes" height="64">
</p>
<p align="right"><strong>MSc. CORO DASSIP</strong></p>
<br clear="both">

<h1 align="center">Image Segmentation</h1>

Classical image-segmentation laboratory covering thresholding, morphology, connected components, contours, color segmentation, watershed, segmentation metrics, and end-to-end mask generation.

The lab is organized into four complementary notebooks:

- [Problem Statement](notebooks/problem_statement.ipynb) — problem definition, inputs, expected outputs, and the 28 required tasks.
- [Requirements](notebooks/requirements.ipynb) — Python environment, required packages, input-data checks, and execution prerequisites.
- [Theory](notebooks/theory.ipynb) — mathematical formulation of thresholding, morphology, region analysis, watershed, evaluation metrics, and limitations.
- [Implementation](notebooks/main.ipynb) — executable workflow with code, generated outputs, metrics, diagnostics, and validation.

## Outputs

Generated figures are stored in:

```text
outputs/figures/
```

Main outputs:

- `01_input_images.png`
- `02_hand_histogram.png`
- `03_manual_threshold.png`
- `04_threshold_sensitivity.png`
- `05_otsu_threshold.png`
- `06_smoothing_before_otsu.png`
- `07_adaptive_thresholding.png`
- `08_structuring_elements.png`
- `09_erosion_dilation.png`
- `10_opening_closing.png`
- `11_morphological_gradient.png`
- `12_hole_filling.png`
- `13_connected_components.png`
- `14_component_area_filtering.png`
- `15_contours.png`
- `16_hsv_channels.png`
- `17_color_segmentation.png`
- `18_edge_based_segmentation.png`
- `19_distance_transform.png`
- `20_watershed.png`
- `21_complete_pipeline.png`

## Run

From the repository root:

```bash
cd labs/image-processing/segmentation

python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
code .
```

Open [main.ipynb](notebooks/main.ipynb), select the project `.venv` kernel, and run all cells from top to bottom.

A successful execution completes the segmentation metrics, end-to-end pipeline, and final validation stages without assertion or runtime errors.

## Lab Structure

```text
segmentation/
├── data/
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

- manual, Otsu, and adaptive thresholding;
- Gaussian preprocessing;
- erosion, dilation, opening, closing, and morphological gradient;
- structuring-element analysis and hole filling;
- connected components and area filtering;
- contours and region properties;
- HSV color segmentation;
- edge-based segmentation intuition;
- distance transform and watershed segmentation;
- pixel accuracy, precision, recall, IoU, and Dice;
- under-segmentation and over-segmentation analysis;
- end-to-end binary segmentation;
- numerical and visual validation.


---

<p align="center">
  <a href="../README.md">
    <img src="../../../assets/nav-image-processing.svg" height="44" alt="Image Processing" />
  </a>
  &nbsp;&nbsp;
  <a href="../../../README.md">
    <img src="../../../assets/nav-portfolio-home.svg" height="44" alt="Portfolio home" />
  </a>
</p>
