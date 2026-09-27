<p>
  <img align="left" src="https://www.ec-nantes.fr/medias/photo/logocn-rvb_1648479844750-png?ID_FICHE=178994&amp;INLINE=FALSE" alt="Centrale Nantes" height="64">
</p>
<p align="right"><strong>MSc. CORO DASSIP</strong></p>
<br clear="both">

<h1 align="center">Deep Learning</h1>

Handwritten-digit classification with a one-hidden-layer MLP in PyTorch, comparing hidden sizes of 128, 256, and 512 neurons on MNIST.

The lab is organized into five complementary notebooks:

- [Problem Statement](notebooks/problem_statement.ipynb) — problem definition, fixed experiment settings, expected outputs, and the 13 required tasks.
- [Requirements](notebooks/requirements.ipynb) — Python environment, required packages, input-data checks, and execution prerequisites.
- [Theory](notebooks/theory.ipynb) — mathematical formulation of the MLP, optimization objective, controlled model-capacity comparison, and confidence analysis.
- [Algorithm](notebooks/algorithm.ipynb) — complete end-to-end procedure aligned stage-by-stage with the Problem Statement and implementation, including outputs, decision points, handoffs, and validation conditions.
- [Implementation](notebooks/main.ipynb) — executable workflow with code, generated outputs, metrics, diagnostics, and validation.

## Outputs

Generated figures are stored in:

```text
outputs/figures/
```

Main outputs:

- `mnist_sample_batch.png`
- `training_loss_comparison.png`
- `mnist_predictions_128.png`
- `mnist_predictions_256.png`
- `mnist_predictions_512.png`
- `pr_accuracy_curve.png`

## Run

From the repository root:

```bash
cd labs/computer-vision/deep-learning

python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
code .
```

Review [algorithm.ipynb](notebooks/algorithm.ipynb) for the complete ordered procedure, then open [main.ipynb](notebooks/main.ipynb), select the project `.venv` kernel, and run all cells from top to bottom.

A successful execution ends with:

```text
All Deep Learning validation checks passed.
```

## Lab Structure

```text
deep-learning/
├── data/
├── notebooks/
│   ├── problem_statement.ipynb
│   ├── theory.ipynb
│   ├── requirements.ipynb
│   ├── algorithm.ipynb
│   └── main.ipynb
├── outputs/
│   └── figures/
├── requirements.txt
└── README.md
```

## Scope

Implemented:

- local MNIST loading and normalization;
- one-hidden-layer MLP;
- Batch Normalization and ReLU;
- Cross-Entropy training with Adam;
- hidden-width comparison;
- prediction/confidence analysis;
- numerical and visual validation.

Not included:

- CNN architectures;
- data augmentation;
- separate validation split;
- hyperparameter search;
- probability calibration;
- uncertainty estimation.

## Participants

- **Denos Kume**
- **Oluwole SHOKUNBI**

**MSc. CORO DASSIP — École Centrale de Nantes**

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
