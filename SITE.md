# Portfolio Website — Product Guide

This repository hosts a **static, responsive portfolio application** for Denos Kume. It is a central website rather than a set of disconnected HTML reports.

## Pages and navigation

- **Home:** introduction, selected work, results and writing.
- **Projects:** searchable cards with category filters.
- **Project detail (`#/projects/<slug>`):** challenge, methods, metrics, limitations, image gallery with zoom, illustrative code snippets with copy control, links to the real notebook and an optional embedded technical viewer.
- **Research:** completed academic case studies clearly separated from exploratory research interests.
- **Blog:** technical articles grounded in the available experiments.
- **Contact:** validated contact form, spam honeypot, relay-service feedback and an email fallback.

The site uses **HTML, CSS and vanilla JavaScript**. There is no app server or build dependency. Hash routes keep deep links working on GitHub Pages, including the `/owner/repo` project path.

## Local preview

From the repository root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/` and explore the navigation. Use a local server instead of opening `index.html` as a `file://` URL.

## Publish to GitHub Pages

An included GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) builds a small static release from the root HTML/CSS/JS and the project figures actually used on the website, then deploys it on every push to `main`. The workflow attempts to enable Pages during configuration. **If the Pages site is not active**, use the repository's **Settings → Pages → Build and deployment** to select **GitHub Actions** as the source (repository owner action may be required). The public site URL is only ready once the deployment succeeds. Until then, all source code is available in the repository.

## Content and project references

- `content.js` contains project metadata, metrics, gallery images, links, research notes and blog articles.
- `app.js` handles navigation, search, category filtering, lightbox, dark mode, clipboard controls and the contact form.
- `styles.css` contains the responsive design and accessibility styles.
- `index.html` provides the semantic shell, metadata and non-JavaScript fallback.

External case-study images are loaded from their public original GitHub repositories. Laboratory figures use relative paths in this repository. Existing notebook files, output figures and standalone technical reviews **remain untouched**. The integrated project interface is the primary presentation; original reviews are embedded where available and remain linked as source materials.

Technical code blocks are **illustrative** unless explicitly documented otherwise. They are not presented as verbatim excerpts from notebooks. Performance results cite the evaluation context and limitations supplied by their original README files.

## Contact form — activation required

The form posts through **FormSubmit** (`https://formsubmit.co/ajax/... `) and requires the portfolio owner's email to be confirmed by the relay on first use. Before recipient activation, **do not assume messages are delivered**. If the service cannot confirm acceptance, visitors get an actionable `mailto:` fallback. Visitors are informed of the third-party processor and must consent before submission.

For a production deployment with stronger email reliability and abuse controls, replace the FormSubmit endpoint in `app.js` with a provider account (such as Formspree) or an authenticated serverless function. Never put secret API keys in client-side JavaScript.

## Editing, testing and accessibility

- Add a project object to the `projects` array in `content.js` (slug, title, summary, tags, images, evaluation context, source URLs, code illustration).
- Add articles to `articles` and topics to `research` without duplicating static pages.
- Test the Home / Projects / Research / Blog / Contact navigation, hash deep links, project search and filters, image zoom, code copy and mobile menu.
- Keyboard navigation, visible focus states, alt text, reduced-motion styles and accessible form labels are included; use Lighthouse/WAVE for a full accessibility audit.
- GitHub Pages is static: no database, private messaging inbox or protected server-side actions are included.

## Existing laboratory work

The original README, notebooks, source datasets and figures remain in their existing directories. The website is an additional presentation layer on top of that reproducible material.
