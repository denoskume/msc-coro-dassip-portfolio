<p>
  <img align="left" src="https://www.ec-nantes.fr/medias/photo/logocn-rvb_1648479844750-png?ID_FICHE=178994&amp;INLINE=FALSE" alt="Centrale Nantes" height="64">
</p>
<p align="right"><strong>MSc. CORO DASSIP</strong></p>
<br clear="both">

<h1 align="center">Image Transformation</h1>

Image transformation laboratory covering pointwise intensity mappings, homogeneous-coordinate geometry, inverse mapping, interpolation, transformation composition, and affine image warping.

The lab is organized into four complementary notebooks:

- [Problem Statement](notebooks/problem_statement.ipynb) — problem definition, inputs, expected outputs, and the 25 required tasks.
- [Requirements](notebooks/requirements.ipynb) — Python environment, required packages, input-data checks, and execution prerequisites.
- [Theory](notebooks/theory.ipynb) — mathematical formulation of intensity mappings, homogeneous coordinates, interpolation, affine geometry, and model limitations.
- [Implementation](notebooks/main.ipynb) — executable workflow with code, generated outputs, metrics, diagnostics, and validation.

## Outputs

Generated figures are stored in:

```text
outputs/figures/
```

Main outputs:

- `01_reference_images.png`
- `02_negative.png`
- `03_brightness_contrast.png`
- `04_contrast_stretching.png`
- `05_log_transform.png`
- `06_gamma_examples.png`
- `07_gamma_curves.png`
- `08_histogram_equalization.png`
- `09_equalization_mapping.png`
- `10_intensity_transform_comparison.png`
- `10_geometric_coordinate_model.png`
- `11_translation.png`
- `12_rotation_origin_center.png`
- `13_scaling.png`
- `14_interpolation_comparison.png`
- `15_reflection.png`
- `16_shear.png`
- `17_transformation_order.png`
- `18_affine_transform.png`

## Run

From the repository root:

```bash
cd labs/image-processing/image-transformation

python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
code .
```

Open [main.ipynb](notebooks/main.ipynb), select the project `.venv` kernel, and run all cells from top to bottom.

A successful execution ends with:

```text
All image-transformation validation checks passed.
```

## Lab Structure

```text
image-transformation/
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

- identity, negative, brightness, contrast, stretching, logarithmic and gamma transformations;
- histogram equalization;
- homogeneous image coordinates;
- translation, rotation, scaling, reflection, and shear;
- centered transformations;
- forward and inverse mapping;
- nearest-neighbor, bilinear, and bicubic interpolation;
- transformation composition and order analysis;
- affine image transformation;
- resizing and aspect-ratio reasoning;
- numerical and visual validation.

Not included:

- spatial convolution and filtering;
- frequency-domain filtering;
- projective homography estimation;
- perspective rectification;
- image segmentation.

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
