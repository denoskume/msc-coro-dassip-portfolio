(() => {
  'use strict';
  const db = window.PORTFOLIO_DATA;
  const root = document.getElementById('main-content');
  if (!db || !root) return;
  const { site, projects, articles, research } = db;
  const filters = ['All', 'Computer Vision', 'Image Processing', 'Machine Learning'];
  const state = { category: 'All', search: '', toastTimer: 0 };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  const safeURL = value => {
    const s = String(value ?? '');
    return (/^https:\/\//i.test(s) || /^[a-z0-9][a-z0-9./_-]*$/i.test(s)) && !s.includes('..') ? s : '';
  };
  const image = (path, alt, cls = '') => `<img class="${esc(cls)}" src="${esc(safeURL(path))}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
  const ext = (url, label, cls = 'text-link') => `<a class="${esc(cls)}" href="${esc(safeURL(url))}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
  const tag = label => `<span class="tag">${esc(label)}</span>`;
  const eyebrow = label => `<span class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>${esc(label)}</span>`;
  const btn = (href, label, cls = 'primary') => `<a href="${esc(href)}" class="btn btn-${cls}">${esc(label)} <span class="arrow" aria-hidden="true">→</span></a>`;
  const extBtn = (href, label, cls = 'outline') => `<a class="btn btn-${cls}" href="${esc(safeURL(href))}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
  const crumbs = items => `<nav class="crumbs" aria-label="Breadcrumb">${items.map((x, i) => (i ? '<span class="sep" aria-hidden="true">/</span>' : '') + (x.href ? `<a href="${esc(x.href)}">${esc(x.label)}</a>` : `<span aria-current="page">${esc(x.label)}</span>`)).join('')}</nav>`;
  const header = (section, heading, summary, link, label = 'View all') => `<div class="section-head"><div>${eyebrow(section)}<h2 style="margin-top:12px">${esc(heading)}</h2><p>${esc(summary)}</p></div>${link ? `<a href="${esc(link)}" class="text-link">${esc(label)} <span class="arrow" aria-hidden="true">→</span></a>` : ''}</div>`;
  const tags = values => `<div class="tag-list">${values.map(tag).join('')}</div>`;
  function projectCard(p) {
    const href = '#/projects/' + p.slug;
    return `<article class="project-card"><a href="${esc(href)}" class="card-image" aria-label="Open ${esc(p.subtitle)}">${image(p.cover, p.subtitle)}<span class="floating-label">${esc(p.category)}</span></a>
    <div class="card-body"><div class="card-meta"><span>${esc(p.kind)}</span><span>${esc(p.year)}</span></div><a href="${esc(href)}"><h3>${esc(p.title)}</h3></a><p>${esc(p.summary)}</p>
    <div class="card-foot"><small>${esc(p.tags.slice(0, 2).join(' · '))}</small><a href="${esc(href)}" class="circle-arrow" aria-label="Read ${esc(p.title)}">↗</a></div></div></article>`;
  }
  function articleCard(a) {
    const href = '#/blog/' + a.slug;
    return `<article class="blog-card"><a href="${esc(href)}" class="card-image" aria-label="Read ${esc(a.title)}">${image(a.cover, a.title)}<span class="floating-label">${esc(a.tag)}</span></a>
    <div class="card-body"><div class="card-meta"><span>${esc(a.date)}</span><span>${esc(a.minutes)}</span></div><a href="${esc(href)}"><h3>${esc(a.title)}</h3></a><p>${esc(a.summary)}</p>
    <div class="card-foot"><small>Technical field note</small><a href="${esc(href)}" class="circle-arrow" aria-label="Open article">↗</a></div></div></article>`;
  }
  function home() {
    const calibration = projects.find(p => p.slug === 'camera-calibration');
    return `<div class="container studio">
      <header class="studio-intro"><div><p class="studio-byline">Denos Kume / Centrale Nantes</p><h1>Computer vision studio</h1><p>Run image analysis in your browser or explore the experiments behind the tools.</p></div>
      <div class="studio-paths"><a class="btn btn-primary" href="#/workspace/calibration">Launch workspace →</a><a class="btn btn-outline" href="#/projects">Explore projects</a></div></header>
      <section class="instrument" aria-labelledby="instrument-title">
        <div class="instrument-copy"><p class="instrument-kicker">Industrial inspection</p><h2 id="instrument-title">Camera <br>calibration</h2>
        <p>Inspect the geometry of a camera across nine chessboard poses. Compare detected corners with their projected locations.</p>
        <a class="instrument-link" href="#/projects/camera-calibration">Open case study ↗</a>
        <dl><div><dt>Board views</dt><dd>9</dd></div><div><dt>Measured corners</dt><dd>432</dd></div><div><dt>Overall RMS</dt><dd>0.534 <small>px</small></dd></div></dl></div>
        <div class="instrument-console"><div class="console-head"><strong>Corner inspector</strong><label><input id="preview-overlay" type="checkbox" checked> Overlay</label></div>
        <div id="preview-board"></div><div class="console-controls"><label>View <select id="preview-view">${calibration.views.map((v,i)=>`<option value="${i}" ${i===7?'selected':''}>${esc(v.label)}</option>`).join('')}</select></label><output id="preview-result" aria-live="polite"></output></div></div>
      </section>
      <section class="studio-work"><div class="studio-heading"><h2>Featured projects</h2><a href="#/projects">All ${projects.length} projects →</a></div>
      <div class="card-grid">${projects.filter(p=>p.featured).map(projectCard).join('')}</div></section>
      <section class="studio-work"><div class="studio-heading"><h2>Engineering notes</h2><a href="#/blog">Read the blog →</a></div>
      <div class="studio-notes">${articles.slice(0,3).map(a=>`<a href="#/blog/${esc(a.slug)}"><small>${esc(a.tag)}</small><strong>${esc(a.title)}</strong><span>${esc(a.minutes)} ↗</span></a>`).join('')}</div></section>
    </div>`;
  }

  function mountHomePreview() {
    const select = document.getElementById('preview-view');
    const overlay = document.getElementById('preview-overlay');
    const views = projects.find(p => p.slug === 'camera-calibration').views;
    function renderBoard() {
      const view = views[select.selectedIndex];
      document.getElementById('preview-board').innerHTML = `<svg viewBox="0 0 640 480" role="img" aria-label="Chessboard pose ${esc(view.label)}"><image href="${esc(view.src)}" width="640" height="480"/>${overlay.checked ? view.marks : ''}</svg>`;
      document.getElementById('preview-result').textContent = view.metrics.split(' · ').pop();
    }
    select.onchange = renderBoard;
    overlay.onchange = renderBoard;
    renderBoard();
  }
  function projectsPage() {
    return `<div class="container page-intro">${crumbs([{label:'Home',href:'#/'},{label:'Projects'}])}${eyebrow('PROJECT LIBRARY')}<h1>Project library</h1>
    <p>Search experiments by method, technology or application.</p></div>
    <section class="container" style="padding-bottom:95px"><div class="filter-panel"><div class="filters" role="group" aria-label="Filter projects by topic">${filters.map(cat => `<button type="button" class="filter ${cat === state.category ? 'active' : ''}" data-filter="${esc(cat)}" aria-pressed="${cat === state.category}">${esc(cat)}</button>`).join('')}</div>
    <label class="search-wrap"><span class="visually-hidden" style="position:absolute;left:-9999px">Search projects</span><input id="project-search" type="search" placeholder="Search projects or technologies…" value="${esc(state.search)}" autocomplete="off"></label></div>
    <p id="project-count" class="count-line">${projects.length} projects</p><div id="project-grid" class="card-grid">${projects.map(projectCard).join('')}</div></section>`;
  }
  function updateGrid() {
    const grid = document.getElementById('project-grid');
    const count = document.getElementById('project-count');
    if (!grid || !count) return;
    const q = state.search.trim().toLowerCase();
    const found = projects.filter(p => (state.category === 'All' || p.category === state.category) && (!q || [p.title,p.subtitle,p.summary,p.category,...p.tags].join(' ').toLowerCase().includes(q)));
    count.textContent = `${found.length} ${found.length === 1 ? 'project' : 'projects'} found`;
    grid.innerHTML = found.length ? found.map(projectCard).join('') : '<div class="empty-state" style="grid-column:1/-1"><h3>No matches yet.</h3><p>Try another keyword or category.</p><button class="btn btn-outline btn-sm" type="button" data-reset>Clear filters</button></div>';
  }
function mountReview(project) {
  const panel = document.querySelector('#review');
  if (!panel || !project?.views) return;
  const views = project.views;
  const select = panel.querySelector('[data-view]');
  const overlay = panel.querySelector('[data-overlay]');
  const status = panel.querySelector('[data-status]');
  const notes = panel.querySelector('textarea');
  const key = 'portfolio-review-v1/' + project.slug;
  let drafts = {};
  try { drafts = JSON.parse(localStorage.getItem(key)) || {}; } catch {}
  function display() {
    const index = Number(select.value);
    const view = views[index];
    const figure = panel.querySelector('figure');
    figure.innerHTML = view.marks
      ? `<svg viewBox="0 0 640 480" role="img" aria-label="Board and corner locations for ${esc(view.label)}"><image width="640" height="480" href="${esc(view.src)}"/>${overlay.checked ? view.marks : ''}</svg>`
      : image(view.src, 'Original, enhanced, manual tracing, predicted mask and error overlay for ' + view.label);
    panel.querySelector('output').textContent = view.metrics;
    status.value = drafts[view.label]?.status || 'Pending';
    notes.value = drafts[view.label]?.notes || '';
    panel.querySelector('[data-prev]').disabled = index === 0;
    panel.querySelector('[data-next]').disabled = index === views.length - 1;
  }
  function save() {
    drafts[views[select.selectedIndex].label] = {status: status.value, notes: notes.value};
    try { localStorage.setItem(key, JSON.stringify(drafts)); }
    catch { panel.querySelector('[data-feedback]').textContent = 'Export your worksheet to keep these notes.'; }
  }
  select.onchange = display;
  if (overlay) overlay.onchange = display;
  for (const [selector, step] of [['[data-prev]',-1],['[data-next]',1]]) {
    panel.querySelector(selector).onclick = () => { select.selectedIndex += step; display(); };
  }
  status.onchange = save;
  notes.oninput = save;
  panel.querySelector('[data-export]').onclick = () => {
    const rows = [['View','Result','Review status','Observations'], ...views.map(v => [v.label,v.metrics,drafts[v.label]?.status || 'Pending',drafts[v.label]?.notes || ''])];
    const csv = rows.map(row => row.map(x => '"' + x.replaceAll('"','""') + '"').join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], {type:'text/csv;charset=utf-8'}));
    const link = document.createElement('a'); link.href = url; link.download = project.slug + '-review.csv'; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  display();
}
  function detailPage(p) {
    const anchors = [['challenge','Challenge'],['approach','Workflow'],['results','Results & limits'],['figures','Visual evidence'],['code','Code snapshot']];
    if (p.views) anchors.push(['review','Integrated lab review']);
    const stats = p.metrics.map(x => `<div class="stat-tile"><div class="value">${esc(x.value)}</div><div class="label">${esc(x.label)}</div><div class="context">${esc(x.context)}</div></div>`).join('');
    const figures = p.gallery.map(g => `<figure class="figure"><button type="button" data-lightbox="${esc(g.src)}" data-caption="${esc(g.caption)}" aria-label="Enlarge ${esc(g.caption)}">${image(g.src,g.caption)}</button><figcaption>${esc(g.caption)}</figcaption></figure>`).join('');
    const related = projects.filter(x => x.slug !== p.slug && x.category === p.category).slice(0,3);
    const recommendations = related.length ? related : projects.filter(x => x.slug !== p.slug).slice(0,3);
    return `<section class="detail-hero"><div class="container">${crumbs([{label:'Home',href:'#/'},{label:'Projects',href:'#/projects'},{label:p.title}])}
    <div class="detail-grid"><div>${eyebrow(p.category+' / '+p.year)}<h1>${esc(p.title)}</h1><p class="subtitle">${esc(p.subtitle)}</p><p class="intro">${esc(p.summary)}</p>${tags(p.tags)}
      <div class="detail-actions">${p.views ? btn("#/workspace/"+(p.slug==="camera-calibration"?"calibration":"motion"),"Launch workspace") : ""}${extBtn(p.github,'View source','outline')}${extBtn(p.notebook,'View notebook')}</div><p class="context">${esc(p.context)}</p></div>
      <div class="detail-hero-media">${image(p.cover,p.subtitle)}<p class="media-caption">Original project output · click the figures below to inspect</p></div></div></div></section>
    <div class="container"><div class="stats-grid">${stats}</div><div class="content-layout"><div class="project-main">
    ${p.views ? `<section class="content-section workbench" id="review"><h2>${p.views[0].marks ? 'Inspect calibration corners' : 'Review instrument traces'}</h2><p>${p.views[0].marks ? 'Cyan circles show measured corners. Orange crosses show projected locations.' : 'Compare the tracing with the prediction. Green marks overlap, orange marks extra detections, and blue marks missed segments.'}</p><div class="view-tools"><button data-prev>Previous</button><label>View <select data-view>${p.views.map((v,i)=>'<option value="'+i+'">'+esc(v.label)+'</option>').join('')}</select></label><button data-next>Next</button>${p.views[0].marks ? '<label><input type="checkbox" checked data-overlay> Show corners</label>' : ''}</div><figure></figure><output aria-live="polite"></output><div class="review-fields"><label>Assessment<select data-status><option>Pending</option><option>Reviewed</option><option>Investigate</option></select></label><label>Observations<textarea rows="2"></textarea></label></div><button data-export>Export worksheet (CSV)</button> <span data-feedback role="status"></span></section>` : ''}
    <section class="content-section" id="challenge"><h2>The challenge</h2><p>${esc(p.challenge)}</p></section>
    <section class="content-section" id="approach"><h2>Method & workflow</h2><ol class="number-list">${p.approach.map(x => `<li>${esc(x)}</li>`).join('')}</ol></section>
    <section class="content-section" id="results"><h2>Results & interpretation</h2><p>${esc(p.result)}</p><div class="notice"><strong>Limitations.</strong> ${esc(p.limitations)}</div></section>
    <section class="content-section" id="figures"><h2>Visual evidence</h2><p>Figures are drawn from the actual project outputs. Select an image to inspect it at full size.</p><div class="figure-grid">${figures}</div></section>
    <section class="content-section" id="code"><h2>Code snapshot</h2><p>${p.excerpt ? 'From the executed project notebook.' : 'Illustrative Python excerpt. See the notebook for the full implementation.'}</p>
      <div class="code-box"><div class="code-top"><span class="code-dots" aria-hidden="true"><i></i><i></i><i></i></span><span>${esc(p.codeTitle)}</span><button type="button" data-copy-code="${esc(p.slug)}">Copy code</button></div><pre><code class="language-python">${esc(p.code)}</code></pre></div></section>
    <section class="content-section"><h2>Reproduce the work</h2><p>The repository contains the complete workflow, assumptions, implementation and generated figures.</p><div class="detail-actions">${extBtn(p.github,'Project repository','primary')}${extBtn(p.notebook,'Notebook')}</div></section>
    </div><aside class="sidebar" aria-label="Project page links"><div class="side-card"><h3>Contents</h3><nav class="side-nav">${anchors.map(([id,label]) => `<a href="#${esc(id)}" data-anchor="${esc(id)}">${esc(label)}</a>`).join('')}</nav></div>
      <div class="side-card"><h3>Explore source</h3>${extBtn(p.github,'GitHub repository')}${extBtn(p.notebook,'Executed notebook')}${p.demo ? extBtn(p.demo,'Original reviewer') : ''}</div>
      <div class="side-card"><h3>Context</h3><p style="font-size:.82rem">${esc(p.context)}</p></div></aside></div></div>
    <section class="related-section"><div class="container">${header('KEEP EXPLORING','Related projects','More experiments in this area.','#/projects','Browse all')}<div class="card-grid">${recommendations.map(projectCard).join('')}</div></div></section>`;
  }
  function researchPage() {
    return `<div class="container page-intro">${crumbs([{label:'Home',href:'#/'},{label:'Research'}])}${eyebrow('METHODS & QUESTIONS')}<h1>Research</h1><p>Completed academic experiments and directions still under exploration. Research interests are not presented as peer-reviewed publications.</p></div>
    <section class="container" style="padding:15px 0 65px"><div class="research-grid">${research.map((r,i) => `<article class="research-card"><div class="research-index">0${i+1}</div><span class="pill">${esc(r.stage)}</span><h3>${esc(r.title)}</h3><p>${esc(r.summary)}</p><p class="method">${esc(r.method)}</p>${r.link ? `<a class="text-link" style="margin-top:18px" href="#/projects/${esc(r.link)}">View case study <span aria-hidden="true">→</span></a>` : '<p style="margin-top:18px;font-size:.77rem">An area of inquiry, not a completed publication.</p>'}</article>`).join('')}</div></section>
    <section class="section section-alt"><div class="container split-feature"><div class="feature-image">${image(projects[2].gallery[0].src,'Audio and text classification pipeline')}</div><div class="feature-copy">${eyebrow('EVALUATION FIRST')}<h2>Measure. Question. Reproduce.</h2><p>The questions change, but the method stays consistent: define assumptions, inspect evidence and report limits.</p><ul class="check-list"><li><span class="check">✓</span>Reproducible scripts and figure outputs</li><li><span class="check">✓</span>Defined evaluation protocols</li><li><span class="check">✓</span>Transparent constraints and next questions</li></ul>${btn('#/projects','Inspect the evidence')}</div></div></section>`;
  }
  function blogPage() {
    return `<div class="container page-intro">${crumbs([{label:'Home',href:'#/'},{label:'Blog'}])}${eyebrow('TECHNICAL WRITING')}<h1>Field notes.</h1><p>Writing about the reasoning behind experiments, metrics, geometry and multimodal models. These are technical notes, not published journal articles.</p></div><section class="container" style="padding-bottom:95px"><div class="card-grid">${articles.map(articleCard).join('')}</div></section>`;
  }
  function articlePage(a) {
    return `<div class="container article-header">${crumbs([{label:'Home',href:'#/'},{label:'Blog',href:'#/blog'},{label:a.title}])}${eyebrow(a.tag)}<h1>${esc(a.title)}</h1><p>${esc(a.summary)}</p><div class="card-meta" style="justify-content:start;gap:23px;margin-top:16px"><span>${esc(a.date)}</span><span>${esc(a.minutes)}</span></div>${image(a.cover,a.title,'article-cover')}</div>
    <article class="article-body container">${a.sections.map(x => `<section><h2>${esc(x.heading)}</h2><p>${esc(x.body)}</p></section>`).join('')}${a.project ? `<div class="notice"><strong>Inspect the evidence.</strong> <a class="text-link" href="#/projects/${esc(a.project)}">Open the project and notebook <span aria-hidden="true">→</span></a></div>` : ''}<div class="detail-actions" style="margin-top:30px">${btn('#/blog','All field notes','outline')}</div></article>
    <section class="related-section"><div class="container">${header('READ NEXT','More field notes','Experimental decisions worth documenting.','#/blog','All articles')}<div class="card-grid">${articles.filter(x => x.slug !== a.slug).slice(0,3).map(articleCard).join('')}</div></div></section>`;
  }
  function contactPage() {
    return `<div class="container page-intro">${crumbs([{label:'Home',href:'#/'},{label:'Contact'}])}${eyebrow('GET IN TOUCH')}<h1>Contact</h1><p>For internship opportunities, engineering questions, project feedback and collaborations.</p></div>
      <div class="container contact-grid"><div class="contact-copy"><h2>Get in touch</h2><p>I explore image processing, computer vision and applied machine learning. Send a short message about the idea or opportunity you have in mind.</p><div class="contact-channel"><strong>Direct email</strong><a href="mailto:${esc(site.email)}">${esc(site.email)}</a></div><div class="contact-channel"><strong>Elsewhere</strong>${ext(site.linkedin,'LinkedIn')}<br>${ext(site.github,'GitHub')}</div></div>
      <form class="contact-form" id="contact-form"><h3 style="font-size:1.45rem;margin-bottom:8px">Send a message</h3><p style="font-size:.84rem;margin-bottom:22px">This form uses a third-party email relay (FormSubmit). The recipient may need to activate it upon first use.</p>
      <div class="form-grid"><div class="field"><label for="sender-name">Your name *</label><input id="sender-name" name="name" maxlength="100" required autocomplete="name" placeholder="Your name"></div><div class="field"><label for="sender-email">Your email *</label><input id="sender-email" name="email" type="email" maxlength="180" required autocomplete="email" placeholder="name@example.com"></div></div>
      <div class="field"><label for="sender-subject">Subject *</label><input id="sender-subject" name="subject" required maxlength="150" placeholder="Project idea or opportunity"></div>
      <div class="field"><label for="sender-message">Message *</label><textarea id="sender-message" name="message" required minlength="15" maxlength="4000" placeholder="Describe what you have in mind..."></textarea></div>
      <div class="honeypot" aria-hidden="true"><label for="website-name">Leave blank</label><input id="website-name" name="_honey" tabindex="-1" autocomplete="off"></div>
      <label class="consent-row"><input type="checkbox" name="consent" required><span>I agree to share this message with FormSubmit for email delivery to the site owner. *</span></label>
      <button class="btn btn-primary" id="contact-submit" type="submit">Send message <span aria-hidden="true">→</span></button><div id="form-feedback" class="form-feedback" aria-live="polite" role="status"></div>
      <p class="form-help">If the relay is unavailable, the form provides a direct email alternative. Delivery is not claimed without confirmation from the service.</p></form></div>`;
  }
  const missing = () => `<div class="container" style="padding:100px 0;text-align:center">${eyebrow('404 / NOT FOUND')}<h1 style="font-size:3.7rem;margin:15px 0">This page took a detour.</h1><p>Return to the project library to continue exploring.</p><div style="margin-top:25px">${btn('#/projects','Explore projects')}</div></div>`;
  function closeLightbox() { const box = document.getElementById('lightbox'); box.classList.remove('active'); box.setAttribute('aria-hidden','true'); document.body.style.overflow = ''; }
  function draw() {
    const raw = (location.hash || '#/').replace(/^#/,'');
    if (raw === 'main-content') { root.focus(); return; }
    let parts;
    try { parts = decodeURIComponent(raw).split('?')[0].split('/').filter(Boolean); } catch { parts = []; }
    let html, title = 'Computer Vision & Applied AI';
    if (!parts.length) html = home();
    else if (parts[0] === "workspace" && parts.length === 2 && VisionWorkspace.has(parts[1])) { html = VisionWorkspace.page(parts[1]); title = "Vision workspace"; }
    else if (parts[0] === 'projects' && parts.length === 1) { html = projectsPage(); title = 'Projects'; }
    else if (parts[0] === 'projects' && parts.length === 2) { const p = projects.find(x => x.slug === parts[1]); html = p ? detailPage(p) : missing(); title = p ? p.subtitle : 'Not found'; }
    else if (parts[0] === 'research' && parts.length === 1) { html = researchPage(); title = 'Research'; }
    else if (parts[0] === 'blog' && parts.length === 1) { html = blogPage(); title = 'Blog'; }
    else if (parts[0] === 'blog' && parts.length === 2) { const a = articles.find(x => x.slug === parts[1]); html = a ? articlePage(a) : missing(); title = a ? a.title : 'Not found'; }
    else if (parts[0] === 'contact' && parts.length === 1) { html = contactPage(); title = 'Contact'; }
    else { html = missing(); title = 'Not found'; }
    VisionWorkspace.leave();
    root.innerHTML = html;
    if (parts[0] === "workspace" && VisionWorkspace.has(parts[1])) VisionWorkspace.mount(parts[1]);
    if (!parts.length) mountHomePreview();
    if (parts.length === 1 && parts[0] === "projects") updateGrid();
    if (parts[0] === "projects" && parts.length === 2) mountReview(projects.find(p => p.slug === parts[1]));
    document.title = `${title} — Denos Kume`;
    document.querySelectorAll('[data-nav]').forEach(link => { const a = link.dataset.nav; const active = (!parts.length && a === 'home') || (parts.length > 0 && a === parts[0]); link.classList.toggle('active', !!active); if (active) link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current'); });
    document.getElementById('primary-nav').classList.remove('open'); document.getElementById('menu-toggle').setAttribute('aria-expanded','false');
    closeLightbox(); window.scrollTo(0,0);
  }
  const finder = document.getElementById('finder');
  const query = document.getElementById('finder-query');
  const matches = document.getElementById('finder-results');
  const catalogue = [
    ...projects.map(p => ({ title: p.title, terms: [p.subtitle, ...p.tags].join(' '), type: 'Project', url: '#/projects/' + p.slug })),
    ...articles.map(a => ({ title: a.title, terms: a.tag, type: 'Article', url: '#/blog/' + a.slug }))
  ];
  function refreshFinder() {
    const term = query.value.trim().toLowerCase();
    const found = catalogue.filter(item => (item.title + ' ' + item.terms).toLowerCase().includes(term));
    matches.innerHTML = found.map(item => `<a href="${esc(item.url)}"><span>${esc(item.title)}</span><small>${item.type}</small></a>`).join('') || '<p>No matching projects or articles.</p>';
  }
  function openFinder() {
    query.value = '';
    refreshFinder();
    finder.showModal();
    query.focus();
  }
  document.getElementById('studio-search').onclick = openFinder;
  document.getElementById('finder-close').onclick = () => finder.close();
  query.oninput = refreshFinder;
  matches.onclick = event => { if (event.target.closest('a')) finder.close(); };
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      if (finder.open) finder.close(); else openFinder();
    }
  });
  function toast(message) { const el = document.getElementById('toast'); el.textContent = message; el.classList.add('show'); clearTimeout(state.toastTimer); state.toastTimer = setTimeout(() => el.classList.remove('show'),2500); }
  function showLightbox(el) { const url = safeURL(el.dataset.lightbox); if (!url) return; const box = document.getElementById('lightbox'); const img = document.getElementById('lightbox-image'); img.src = url; img.alt = el.dataset.caption || 'Project figure'; document.getElementById('lightbox-caption').textContent = img.alt; box.classList.add('active'); box.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden'; document.getElementById('lightbox-close').focus(); }
  function setTheme(value) { document.documentElement.dataset.theme = value; const b = document.getElementById('theme-toggle'); b.setAttribute('aria-label',value === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'); b.innerHTML = value === 'dark' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>'; try { localStorage.setItem('dk-theme',value); } catch (_) {} }
  document.addEventListener('click', async event => {
    const modal = event.target.closest('[data-lightbox]'); if (modal) { showLightbox(modal); return; }
    if (event.target.id === 'lightbox' || event.target.id === 'lightbox-close') { closeLightbox(); return; }
    const filter = event.target.closest('[data-filter]'); if (filter) { state.category = filter.dataset.filter; document.querySelectorAll('[data-filter]').forEach(b => { const active = b === filter; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active)); }); updateGrid(); return; }
    if (event.target.closest('[data-reset]')) { state.category = 'All'; state.search = ''; const inp = document.getElementById('project-search'); if (inp) inp.value = ''; document.querySelectorAll('[data-filter]').forEach(b => { const active = b.dataset.filter === 'All'; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active)); }); updateGrid(); return; }
    const copy = event.target.closest('[data-copy-code]'); if (copy) { const p = projects.find(x => x.slug === copy.dataset.copyCode); if (p) { try { await navigator.clipboard.writeText(p.code); toast('Code snippet copied'); } catch (_) { toast('Clipboard unavailable in this browser'); } } return; }
    const jump = event.target.closest('[data-anchor]'); if (jump) { event.preventDefault(); document.getElementById(jump.dataset.anchor)?.scrollIntoView({behavior:'smooth',block:'start'}); return; }
  });
  document.addEventListener('input', event => { if (event.target.id === 'project-search') { state.search = event.target.value; updateGrid(); } });
  document.addEventListener('submit', async event => {
    if (event.target.id !== 'contact-form') return;
    event.preventDefault(); const form = event.target; if (!form.checkValidity()) { form.reportValidity(); return; }
    const feedback = document.getElementById('form-feedback'); const send = document.getElementById('contact-submit'); feedback.className = 'form-feedback'; feedback.textContent = '';
    if (form.elements['_honey'].value.trim()) { feedback.textContent = 'This request could not be sent.'; feedback.classList.add('error'); return; }
    const sender = form.elements.email.value.trim(), subject = form.elements.subject.value.trim(), message = form.elements.message.value.trim();
    const fallback = 'mailto:' + site.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(`From: ${form.elements.name.value.trim()} (${sender})\n\n${message}`);
    send.disabled = true; send.textContent = 'Sending…';
    try {
      const body = new FormData(); body.append('name',form.elements.name.value.trim()); body.append('email',sender); body.append('subject',subject); body.append('message',message); body.append('_subject','Portfolio contact: '+subject); body.append('_template','table'); body.append('_captcha','false');
      const response = await fetch('https://formsubmit.co/ajax/'+site.email,{method:'POST',body,headers:{'Accept':'application/json'}});
      const value = await response.json(); if (!response.ok || (value.success !== true && value.success !== 'true')) throw new Error(value.message || 'Not accepted');
      form.reset(); feedback.classList.add('success'); feedback.textContent = 'The relay accepted your message. Thank you! First-time activation by the recipient may still be required.';
    } catch (_) { feedback.classList.add('error'); feedback.innerHTML = `The relay could not confirm delivery. <a href="${esc(fallback)}" style="text-decoration:underline">Open your email app to send directly</a>.`; }
    finally { send.disabled = false; send.innerHTML = 'Send message <span aria-hidden="true">→</span>'; }
  });
  document.getElementById('menu-toggle').addEventListener('click', () => { const nav = document.getElementById('primary-nav'); const active = nav.classList.toggle('open'); document.getElementById('menu-toggle').setAttribute('aria-expanded',String(active)); });
  document.getElementById('theme-toggle').addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
  window.addEventListener('scroll', () => { const max = document.documentElement.scrollHeight - innerHeight; document.getElementById('reading-progress').style.width = (max > 0 ? 100*scrollY/max : 0) + '%'; }, {passive:true});
  window.addEventListener('hashchange', draw);
  let theme = 'light'; try { theme = localStorage.getItem('dk-theme') || 'light'; } catch (_) {}
  setTheme(theme === 'dark' ? 'dark' : 'light'); document.getElementById('current-year').textContent = String(new Date().getFullYear()); draw();
})();

