<p>
  <img align="left" src="https://www.ec-nantes.fr/medias/photo/logocn-rvb_1648479844750-png?ID_FICHE=178994&amp;INLINE=FALSE" alt="Centrale Nantes" height="64">
</p>
<p align="right"><strong>MSc. CORO DASSIP</strong></p>
<br clear="both">

<h1 align="center">Image Processing Fundamentals</h1>

Digital-image laboratory covering numerical image representation, sampling, quantization, pixels, channels, histograms, noise, image comparison, and reproducible validation.

The lab is organized into four complementary notebooks:

- [Problem Statement](notebooks/problem_statement.ipynb) — problem definition, inputs, expected outputs, and the 23 required tasks.
- [Requirements](notebooks/requirements.ipynb) — Python environment, required packages, input-data checks, and execution prerequisites.
- [Theory](notebooks/theory.ipynb) — mathematical and numerical foundations for image representation, statistics, noise models, metrics, and failure analysis.
- [Implementation](notebooks/main.ipynb) — executable workflow with code, generated outputs, metrics, diagnostics, and validation.

## Outputs

Generated figures are stored in:

```text
outputs/figures/
```

Main outputs include:

- `01_sampling.png`
- `02_quantization.png`
- `03_grayscale_matrix.png`
- `04_image_types.png`
- `05_reference_images.png`
- `06_display_scaling.png`
- `07_pixel_edit.png`
- `08_region_of_interest.png`
- `09_rgb_channels.png`
- `10_rgb_bgr.png`
- `11_rgb_to_grayscale.png`
- `12_intensity_histogram.png`
- `13_dynamic_range_normalization.png`
- `14_noise_models.png`
- `15_saved_example.png`
- `15_saved_example.jpg`

## Run

From the repository root:

```bash
cd labs/image-processing/image-processing-fundamentals

python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
code .
```

Open [main.ipynb](notebooks/main.ipynb), select the project `.venv` kernel, and run all cells from top to bottom.

A successful execution ends with:

```text
All fundamental validation checks passed.
```

## Lab Structure

```text
image-processing-fundamentals/
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

- digital image formation, sampling, and quantization;
- binary, grayscale, and RGB representations;
- image dimensions, dtype, bit depth, dynamic range, and memory;
- pixel access, ROIs, neighborhoods, and channel decomposition;
- RGB/BGR conventions and grayscale conversion;
- image statistics and histograms;
- normalization and safe numerical arithmetic;
- Gaussian, salt-and-pepper, Poisson, and speckle noise;
- MAE, MSE, RMSE, and PSNR;
- PNG/JPEG comparison;
- numerical and visual validation.

Not included:

- geometric image transformations;
- spatial convolution and filtering;
- frequency-domain filtering;
- image segmentation;
- projective geometry and camera calibration.

## Participants

- **Denos Kume**

**MSc. CORO DASSIP — École Centrale de Nantes**

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
