from __future__ import annotations

import ast
import io
import json
import re
import sys
import tokenize
from pathlib import Path

EXPECTED_NOTEBOOKS = {
    "theory.ipynb",
    "problem_statement.ipynb",
    "requirements.ipynb",
    "main.ipynb",
}

ABSOLUTE_PATH_RE = re.compile(
    r"(?:[A-Za-z]:\\\\|/home/|/Users/|/mnt/c/)"
)

REQUIREMENT_NAMES = {
    "cv2": "opencv",
    "matplotlib": "matplotlib",
    "numpy": "numpy",
    "PIL": "pillow",
    "scipy": "scipy",
    "torch": "pytorch",
    "mnist": "python-mnist",
    "tqdm": "tqdm",
}

errors: list[str] = []
notebook_count = 0

def cell_source(cell: dict) -> str:
    source = cell.get("source", [])
    return "".join(source) if isinstance(source, list) else str(source)

def markdown_text(notebook: dict) -> str:
    return "\n".join(
        cell_source(cell)
        for cell in notebook.get("cells", [])
        if cell.get("cell_type") == "markdown"
    )

def code_text(notebook: dict) -> str:
    return "\n".join(
        cell_source(cell)
        for cell in notebook.get("cells", [])
        if cell.get("cell_type") == "code"
    )

def problem_tasks(markdown: str) -> list[str]:
    tasks = []
    for line in markdown.splitlines():
        match = re.match(r"^(\d+)\.\s+(.+)$", line.strip())
        if match:
            tasks.append(match.group(2).strip())
    return tasks

def numbered_h2_sections(markdown: str) -> list[str]:
    sections = []
    for line in markdown.splitlines():
        match = re.match(r"^##\s+\d+\.\s+(.+)$", line.strip())
        if match:
            sections.append(match.group(1).strip())
    return sections

def extract_module_title(markdown: str, suffix: str) -> str | None:
    pattern = re.compile(
        rf"<h1[^>]*>\s*<b>(.*?)\s+—\s+{re.escape(suffix)}</b>\s*</h1>",
        re.IGNORECASE,
    )
    match = pattern.search(markdown)
    return match.group(1).strip() if match else None

def extract_required_outputs(main_code: str) -> list[str] | None:
    try:
        tree = ast.parse(main_code)
    except SyntaxError:
        return None

    for node in ast.walk(tree):
        if not isinstance(node, (ast.Assign, ast.AnnAssign)):
            continue

        targets = node.targets if isinstance(node, ast.Assign) else [node.target]
        if not any(
            isinstance(target, ast.Name) and target.id == "REQUIRED_OUTPUTS"
            for target in targets
        ):
            continue

        value = node.value
        if not isinstance(value, (ast.List, ast.Tuple)):
            return None

        outputs: list[str] = []
        for element in value.elts:
            if not (
                isinstance(element, ast.Constant)
                and isinstance(element.value, str)
            ):
                return None
            outputs.append(element.value)
        return outputs

    return None

lab_dirs = sorted(
    path
    for path in Path("labs").glob("*/*")
    if path.is_dir() and (path / "notebooks").is_dir()
)

if not lab_dirs:
    errors.append("No laboratory modules were discovered.")

for lab_dir in lab_dirs:
    notebook_dir = lab_dir / "notebooks"
    notebook_paths = sorted(notebook_dir.glob("*.ipynb"))
    notebook_count += len(notebook_paths)
    names = {path.name for path in notebook_paths}

    if names != EXPECTED_NOTEBOOKS:
        missing = sorted(EXPECTED_NOTEBOOKS - names)
        extra = sorted(names - EXPECTED_NOTEBOOKS)
        errors.append(
            f"{lab_dir}: notebook set mismatch; missing={missing}, extra={extra}"
        )
        continue

    notebooks: dict[str, dict] = {}

    for notebook_path in notebook_paths:
        try:
            notebook = json.loads(notebook_path.read_text(encoding="utf-8"))
        except Exception as exc:
            errors.append(f"{notebook_path}: invalid notebook JSON: {exc}")
            continue

        notebooks[notebook_path.name] = notebook

        markdown = markdown_text(notebook)

        if "Centrale Nantes" not in markdown:
            errors.append(f"{notebook_path}: Centrale Nantes header missing.")
        if "MSc. CORO DASSIP" not in markdown:
            errors.append(f"{notebook_path}: MSc. CORO DASSIP header missing.")


        for cell_index, cell in enumerate(notebook.get("cells", []), start=1):
            source = cell_source(cell)

            if "Zero to Mastery" in source:
                errors.append(
                    f"{notebook_path}:cell {cell_index}: forbidden phrase 'Zero to Mastery'."
                )

            if cell.get("cell_type") != "code" or not source.strip():
                continue

            if ABSOLUTE_PATH_RE.search(source):
                errors.append(
                    f"{notebook_path}:cell {cell_index}: machine-specific absolute path detected."
                )

            try:
                tree = ast.parse(
                    source,
                    filename=f"{notebook_path}:cell {cell_index}",
                    mode="exec",
                )
            except SyntaxError as exc:
                errors.append(
                    f"{notebook_path}:cell {cell_index}: "
                    f"{exc.msg} (line {exc.lineno}, offset {exc.offset})"
                )
                continue

            if notebook_path.name == "main.ipynb":
                try:
                    tokens = list(
                        tokenize.generate_tokens(io.StringIO(source).readline)
                    )
                    comment_count = sum(
                        token.type == tokenize.COMMENT
                        for token in tokens
                    )
                    if not 3 <= comment_count <= 8:
                        errors.append(
                            f"{notebook_path}:cell {cell_index}: expected "
                            f"3-8 strategic Python comments; found {comment_count}."
                        )
                except tokenize.TokenError as exc:
                    errors.append(
                        f"{notebook_path}:cell {cell_index}: tokenization error: {exc}"
                    )

                for node in ast.walk(tree):
                    if isinstance(
                        node,
                        (ast.Module, ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef),
                    ):
                        body = getattr(node, "body", [])
                        if (
                            body
                            and isinstance(body[0], ast.Expr)
                            and isinstance(body[0].value, ast.Constant)
                            and isinstance(body[0].value.value, str)
                        ):
                            errors.append(
                                f"{notebook_path}:cell {cell_index}: docstring detected."
                            )
                            break

    if set(notebooks) != EXPECTED_NOTEBOOKS:
        continue

    problem_md = markdown_text(notebooks["problem_statement.ipynb"])
    theory_md = markdown_text(notebooks["theory.ipynb"])
    requirements_md = markdown_text(notebooks["requirements.ipynb"])
    main_md = markdown_text(notebooks["main.ipynb"])
    main_code = code_text(notebooks["main.ipynb"])

    tasks = problem_tasks(problem_md)
    theory_sections = numbered_h2_sections(theory_md)
    main_sections = numbered_h2_sections(main_md)

    if not tasks:
        errors.append(f"{lab_dir}: problem statement contains no numbered tasks.")
    if tasks != theory_sections:
        errors.append(
            f"{lab_dir}: Problem Statement tasks and Theory sections are not aligned."
        )
    if tasks != main_sections:
        errors.append(
            f"{lab_dir}: Problem Statement tasks and Main sections are not aligned."
        )

    if "final interpretation" in problem_md.lower():
        errors.append(
            f"{lab_dir}: Problem Statement still requires a final interpretation."
        )
    if "Final Analysis & Interpretation" in main_md:
        errors.append(
            f"{lab_dir}: Main notebook contains a trailing final-analysis section."
        )

    problem_title = extract_module_title(problem_md, "Problem Statement")
    theory_title = extract_module_title(theory_md, "Theory")
    requirements_title = extract_module_title(requirements_md, "Requirements")

    if not problem_title or not theory_title or not requirements_title:
        errors.append(f"{lab_dir}: one or more notebook module titles could not be parsed.")
    elif not (problem_title == theory_title == requirements_title):
        errors.append(
            f"{lab_dir}: notebook titles disagree: "
            f"{problem_title!r}, {theory_title!r}, {requirements_title!r}."
        )
    elif problem_title not in main_md:
        errors.append(
            f"{lab_dir}: Main notebook header does not match module title {problem_title!r}."
        )

    if "## References" not in theory_md:
        errors.append(f"{lab_dir}: Theory notebook has no References section.")
    if not re.search(r"https?://", theory_md):
        errors.append(f"{lab_dir}: Theory references contain no links.")

    expected_requirement_headings = [
        "## 1. Software Requirements",
        "## 2. Required Data",
        "## 3. Installation",
    ]
    for heading in expected_requirement_headings:
        if heading not in requirements_md:
            errors.append(f"{lab_dir}: Requirements missing heading {heading!r}.")

    try:
        main_tree = ast.parse(main_code)
    except SyntaxError as exc:
        errors.append(f"{lab_dir}: concatenated main code is invalid: {exc}.")
        continue

    imported_roots: set[str] = set()
    for node in ast.walk(main_tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                imported_roots.add(alias.name.split(".")[0])
        elif isinstance(node, ast.ImportFrom) and node.module:
            imported_roots.add(node.module.split(".")[0])

    requirements_lower = requirements_md.lower()
    for root in sorted(imported_roots):
        if root in sys.stdlib_module_names:
            continue
        requirement_name = REQUIREMENT_NAMES.get(root, root).lower()
        if requirement_name not in requirements_lower:
            errors.append(
                f"{lab_dir}: imported package {root!r} is not documented "
                f"in requirements.ipynb."
            )

    required_outputs = extract_required_outputs(main_code)
    if required_outputs is None:
        errors.append(
            f"{lab_dir}: Main notebook must define REQUIRED_OUTPUTS as a literal list."
        )
    else:
        if not required_outputs:
            errors.append(f"{lab_dir}: REQUIRED_OUTPUTS is empty.")
        if len(required_outputs) != len(set(required_outputs)):
            errors.append(f"{lab_dir}: REQUIRED_OUTPUTS contains duplicate filenames.")
        if "FileNotFoundError" not in main_code:
            errors.append(
                f"{lab_dir}: Main notebook defines outputs but does not fail on missing files."
            )

if errors:
    print("Notebook QA FAILED")
    for error in errors:
        print(f" - {error}")
    raise SystemExit(1)

print(
    f"Notebook QA passed: {len(lab_dirs)} labs, {notebook_count} notebooks. "
    "Structure, task alignment, titles, requirements, references, Python syntax, "
    "per-cell strategic comments, main-notebook cleanliness, and output declarations are consistent."
)
