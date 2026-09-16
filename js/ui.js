/* ── SnipVault · UI Utilities ───────────────────────────────── */

/* ── Toast ───────────────────────────────────────────────────── */
let toastTimer = null;
function showToast(msg, icon = '✓') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ── Copy to clipboard ───────────────────────────────────────── */
function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => showToast('Copied to clipboard'));
}

/* ── Build sidebar nav ───────────────────────────────────────── */
function buildSidebar(activePage = 'index') {
  const snippets = SV.getSnippets();
  const favCount = snippets.filter(s => s.favorited).length;

  const langCounts = {};
  snippets.forEach(s => { langCounts[s.language] = (langCounts[s.language] || 0) + 1; });

  const pages = { index: 'index.html', favorites: 'pages/favorites.html',
    collections: 'pages/collections.html', settings: 'pages/settings.html' };

  function href(page) {
    const depth = activePage === 'index' ? '' : '../';
    return depth + (page === 'index' ? 'index.html' : pages[page].replace('pages/', depth + 'pages/'));
  }

  const topLangs = SV.LANGUAGES
    .filter(l => langCounts[l.id])
    .sort((a, b) => (langCounts[b.id] || 0) - (langCounts[a.id] || 0))
    .slice(0, 8);

  return `
  <div class="sidebar-logo">
    <div class="logo-icon">⟨/⟩</div>
    <div class="logo-text">Snip<span>Vault</span></div>
  </div>

  <a href="${href('index')}" style="text-decoration:none">
    <button class="new-snippet-btn" onclick="location.href='${href('index')}?new=1'">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      New snippet
    </button>
  </a>

  <nav class="nav-section">
    <div class="nav-label">Library</div>
    <a href="${href('index')}" style="text-decoration:none">
      <button class="nav-item ${activePage === 'index' ? 'active' : ''}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        All snippets <span class="count">${snippets.length}</span>
      </button>
    </a>
    <a href="${href('favorites')}" style="text-decoration:none">
      <button class="nav-item ${activePage === 'favorites' ? 'active' : ''}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        Favorites <span class="count">${favCount}</span>
      </button>
    </a>
    <a href="${href('collections')}" style="text-decoration:none">
      <button class="nav-item ${activePage === 'collections' ? 'active' : ''}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        Collections
      </button>
    </a>
  </nav>

  <nav class="nav-section">
    <div class="nav-label">Languages</div>
    ${topLangs.map(l => `
      <a href="${href('index')}?lang=${l.id}" style="text-decoration:none">
        <button class="nav-item">
          <span class="lang-nav-dot" style="background:${l.color}"></span>
          ${l.label} <span class="count">${langCounts[l.id] || 0}</span>
        </button>
      </a>`).join('')}
  </nav>

  <nav class="nav-section">
    <div class="nav-label">Categories</div>
    ${SV.CATEGORIES.slice(0, 6).map(c => {
      const cnt = snippets.filter(s => s.category === c.id).length;
      if (!cnt) return '';
      return `
        <a href="${href('index')}?cat=${c.id}" style="text-decoration:none">
          <button class="nav-item">
            <span style="font-size:13px">${c.icon}</span>
            ${c.label} <span class="count">${cnt}</span>
          </button>
        </a>`;
    }).join('')}
  </nav>

  <div class="sidebar-footer">
    <a href="${href('settings')}" style="text-decoration:none">
      <button class="nav-item ${activePage === 'settings' ? 'active' : ''}">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        Settings
      </button>
    </a>
  </div>`;
}

/* ── Build a snippet card ─────────────────────────────────────── */
function buildCard(snippet, depth = '') {
  const lang = SV.getLang(snippet.language);
  const cat  = SV.getCat(snippet.category);
  const preview = snippet.code.split('\n').slice(0, 5).join('\n');

  return `
  <div class="snippet-card ${snippet.favorited ? 'favorited' : ''}"
       onclick="location.href='${depth}pages/view.html?id=${snippet.id}'">
    <div class="card-header">
      <div class="card-lang-icon" style="background:${lang.bg};color:${lang.color}">${lang.abbr}</div>
      <div class="card-info">
        <div class="card-title">${SV.escapeHtml(snippet.title)}</div>
        <div class="card-desc">${SV.escapeHtml(snippet.description || '')}</div>
      </div>
      ${snippet.favorited ? '<span class="card-fav-indicator">★</span>' : ''}
    </div>
    <div class="code-block">${SV.escapeHtml(preview)}</div>
    <div class="card-footer">
      <div class="card-tags">
        <span class="tag-pill" style="background:${lang.bg};color:${lang.color};border-color:${lang.color}22">${lang.label}</span>
        <span class="tag-pill">${cat.icon} ${cat.label}</span>
        ${(snippet.tags || []).slice(0, 1).map(t => `<span class="tag-pill">${SV.escapeHtml(t)}</span>`).join('')}
      </div>
      <div class="card-actions" onclick="event.stopPropagation()">
        <button class="card-btn" title="Copy code" onclick="copyCode(${JSON.stringify(snippet.code).replace(/'/g,"&#39;")});showToast('Copied!')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
        <button class="card-btn ${snippet.favorited ? 'fav-active' : ''}" title="Favorite"
          onclick="handleFav('${snippet.id}', this)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="${snippet.favorited ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

/* ── Favorite handler (used in cards) ───────────────────────── */
function handleFav(id, btn) {
  const isFav = SV.toggleFavorite(id);
  btn.classList.toggle('fav-active', isFav);
  const svg = btn.querySelector('svg');
  svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
  btn.closest('.snippet-card').classList.toggle('favorited', isFav);
  showToast(isFav ? 'Added to favorites' : 'Removed from favorites', isFav ? '★' : '☆');
}

/* ── Language select builder ─────────────────────────────────── */
function buildLangOptions(selected = '') {
  return SV.LANGUAGES.map(l =>
    `<option value="${l.id}" ${l.id === selected ? 'selected' : ''}>${l.label}</option>`
  ).join('');
}

/* ── Category select builder ─────────────────────────────────── */
function buildCatOptions(selected = '') {
  return SV.CATEGORIES.map(c =>
    `<option value="${c.id}" ${c.id === selected ? 'selected' : ''}>${c.icon} ${c.label}</option>`
  ).join('');
}

window.showToast = showToast;
window.copyCode  = copyCode;
window.buildSidebar = buildSidebar;
window.buildCard    = buildCard;
window.handleFav    = handleFav;
window.buildLangOptions = buildLangOptions;
window.buildCatOptions  = buildCatOptions;
