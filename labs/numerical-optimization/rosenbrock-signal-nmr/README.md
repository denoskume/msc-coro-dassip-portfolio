# Numerical Optimization — MATLAB Laboratory

**Centrale Nantes · MSc CORO DASSIP · MATSIP Part I · MATLAB only**

This laboratory follows the same four-notebook documentation structure as the Computer Vision and Image Processing labs. **The actual implementation is MATLAB (`.m`), as required by the professor**. No Python solver is supplied.

## Four course notebooks

- [Problem Statement](notebooks/problem_statement.ipynb) — ten clearly ordered objectives.
- [Theory](notebooks/theory.ipynb) — optimization models, proofs, comparisons and key takeaways.
- [Requirements](notebooks/requirements.ipynb) — MATLAB environment, authentic NMR data and local execution.
- [Implementation and visual results](notebooks/main.ipynb) — twelve plotted outputs, interpretation and validation.

## Run in MATLAB

Open `matlab/save_all_figures.m` and run it in MATLAB. It executes `matlab/final_report.m`, renders all 12 figures on larger MATLAB canvases with readable axes and legends, and exports **original 4K+ PNG files (at least 3840 × 2160 pixels, 300 DPI)** directly to `outputs/figures/`. The script checks each exported file's actual pixel dimensions. The main MATLAB report contains **Rosenbrock**, **Signal Enhancement**, and **NMR quadratic exterior penalty**.

```matlab
run('matlab/save_all_figures.m')
```

**Authentic NMR measurements:** `matlab/data/NMRdataMeasures.mat` (sourced from the existing validated MATSIP course lab). Both the code and figures are preserved in this portfolio for reproducibility.

## Experimental results — reviewed local MATLAB run

| Indicator | Result |
|---|---:|
| Rosenbrock minimum | `(1,1)`, objective approx. 0 |
| Gauss–Newton vs Gradient iterations, start `(-2,1)` | 4 vs 495 |
| Closed-form vs Newton denoising difference | `4.088e-15` |
| Simulation best regularization lambda | `0.5554` |
| Synthetic NMR feasibility violation | `1.439e-07`, below `1e-06` |
| Measured NMR feasibility violation | `5.143e-07`, below `1e-06` |
| Synthetic NMR distribution relative error | **300%** |
| Synthetic / measured NMR signal relative error | `5.701%` / `2.360%` |

**Scientific caveat:** NMR feasibility convergence and a close fit do not guarantee correct recovery of the distribution. The observed 300% error on synthetic distribution must not be hidden; adding a different regularizer would change the professor's optimization problem.

### Figure layout validation (14 October 2026)

The final MATLAB export uses **three panels with explicit inter-panel margins** and a **separate figure-wide legend strip** for Figures 2–7. Objective/gradient information is provided in their panel headings instead of redundant vertical labels that previously collided with logarithmic ticks. The two-panel figures use MATLAB `tiledlayout` with loose spacing. All **12 PNGs were re-rendered directly in MATLAB at 4K+**, and the regenerated fixed-step, four-method and six-method charts were visually checked for text collisions. Original numerical algorithms were not changed.

## Figures — 12 original 4K+ MATLAB PNG exports

| Figure | Content |
|---|---|
| 01 | [Rosenbrock surface and level sets](outputs/figures/01_rosenbrock_surface.png) |
| 02 | [Fixed-step oscillation and convergence](outputs/figures/02_fixed_step_comparison.png) |
| 03 | [Armijo convergence](outputs/figures/03_armijo_convergence.png) |
| 04 | [Four descent methods — first initial point](outputs/figures/04_four_methods_start_a.png) |
| 05 | [Six methods — first initial point](outputs/figures/05_six_methods_start_a.png) |
| 06 | [Four methods — second initial point](outputs/figures/06_four_methods_start_b.png) |
| 07 | [Six methods — second initial point](outputs/figures/07_six_methods_start_b.png) |
| 08 | [Original and noisy signal](outputs/figures/08_original_noisy_signal.png) |
| 09 | [Enhanced signal at lambda=0.20](outputs/figures/09_enhanced_signal.png) |
| 10 | [Regularization parameter and trade-off](outputs/figures/10_regularization_selection.png) |
| 11 | [Synthetic NMR distribution and fit](outputs/figures/11_synthetic_nmr.png) |
| 12 | [Experimental NMR distribution and fit](outputs/figures/12_measured_nmr.png) |

## Folder layout

```text
rosenbrock-signal-nmr/
├── README.md
├── notebooks/
│   ├── problem_statement.ipynb
│   ├── theory.ipynb
│   ├── requirements.ipynb
│   └── main.ipynb
├── matlab/
│   ├── final_report.m
│   ├── save_all_figures.m
│   ├── functions/
│   └── data/NMRdataMeasures.mat
└── outputs/figures/  # 12 genuine MATLAB PNG exports
```

**Provenance:** MATLAB source and data migrated from the [validated MATSIP course laboratory](https://github.com/denoskume/m2-sip/tree/main/MATSIP/Numerical_Optimization/Completed_Lab/final_submission). All figures are produced by MATLAB, never recreated artificially.

---
[Back to the Numerical Optimization modules](../README.md) · [Portfolio home](../../../README.md)
