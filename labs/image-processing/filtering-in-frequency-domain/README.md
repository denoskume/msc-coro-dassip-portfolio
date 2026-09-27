<p>
  <img align="left" src="https://www.ec-nantes.fr/medias/photo/logocn-rvb_1648479844750-png?ID_FICHE=178994&amp;INLINE=FALSE" alt="Centrale Nantes" height="64">
</p>
<p align="right"><strong>MSc. CORO DASSIP</strong></p>
<br clear="both">

<h1 align="center">Frequency-Domain Filtering</h1>

Fourier-domain image-processing laboratory covering spatial frequency, 2-D FFT analysis, magnitude and phase, classical frequency filters, periodic-noise suppression, moiré removal, illumination correction, and validation.

The lab is organized into four complementary notebooks:

- [Problem Statement](notebooks/problem_statement.ipynb) — problem definition, inputs, expected outputs, and the 26 required tasks.
- [Requirements](notebooks/requirements.ipynb) — Python environment, required packages, input-data checks, and execution prerequisites.
- [Theory](notebooks/theory.ipynb) — Fourier-domain formulation, transfer functions, spectral diagnostics, periodic interference analysis, and limitations.
- [Implementation](notebooks/main.ipynb) — executable workflow with code, generated outputs, metrics, diagnostics, and validation.

## Outputs

Generated figures are stored in:

```text
outputs/figures/
```

Main outputs:

- `01_spatial_frequency.png`
- `02_fft_1d.png`
- `03_house_spectrum.png`
- `04_orientation_spectra.png`
- `05_dataset_spectra.png`
- `06_reconstruction.png`
- `07_frequency_filter_pipeline.png`
- `07_phase_magnitude_swap.png`
- `08_phase_only_magnitude_only.png`
- `09_lpf_comparison.png`
- `10_butterworth_orders.png`
- `11_ringing.png`
- `12_high_pass.png`
- `13_convolution_validation.png`
- `13_high_boost.png`
- `14_band_filters.png`
- `15_periodic_noise_spectra.png`
- `16_notch_filter.png`
- `17_moire_removal.png`
- `18_shading_correction.png`
- `19_cutoff_sensitivity.png`
- `23_integrated_workflow.png`

## Run

From the repository root:

```bash
cd labs/image-processing/filtering-in-frequency-domain

python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
code .
```

Open [main.ipynb](notebooks/main.ipynb), select the project `.venv` kernel, and run all cells from top to bottom.

A successful execution completes the validation checks and integrated workflow without assertion or runtime errors.

## Lab Structure

```text
filtering-in-frequency-domain/
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

- spatial-frequency interpretation;
- 1-D and 2-D Fourier transforms;
- FFT shifting and inverse reconstruction;
- magnitude and phase analysis;
- Ideal, Gaussian, and Butterworth low-pass filtering;
- ringing and Gibbs-phenomenon analysis;
- high-pass and high-boost filtering;
- convolution-theorem interpretation;
- band-pass and band-reject filtering;
- periodic-noise detection and notch filtering;
- moiré suppression;
- slowly varying illumination correction;
- cutoff-sensitivity analysis;
- quantitative and structural validation.

Not included:

- wavelet transforms;
- learned frequency representations;
- advanced inverse-problem restoration;
- segmentation.

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
