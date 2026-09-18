/* ── SnipVault · UI Utilities ───────────────────────────────── */

/* ── Theme ───────────────────────────────────────────────────── */
function applyTheme() {
  const s = SV.getSettings();
  document.body.classList.toggle('light', s.theme === 'light');
}

/* ── Toast ───────────────────────────────────────────────────── */
let _toastTimer = null;
function showToast(msg, icon) {
  icon = icon || '✓';
  const el = document.getElementById('toast');
  if (!el) return;
  el.innerHTML = '<span>' + icon + '</span><span>' + msg + '</span>';
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(function() { el.classList.remove('show'); }, 2200);
}

/* ── Copy ────────────────────────────────────────────────────── */
function copyCode(code) {
  navigator.clipboard.writeText(code).then(function() { showToast('Copied to clipboard'); });
}

/* ── Mobile sidebar ──────────────────────────────────────────── */
function openSidebar() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('sidebarOverlay');
  if (sb) sb.classList.add('open');
  if (ov) ov.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  var sb = document.getElementById('sidebar');
  var ov = document.getElementById('sidebarOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('show');
  document.body.style.overflow = '';
}

/* ── Resolve relative path from any page ────────────────────── */
function getDepth() {
  var path = location.pathname;
  var parts = path.split('/').filter(Boolean);
  // If we're inside /pages/, depth is ../
  // Check if current file is inside a pages/ subdirectory
  if (path.indexOf('/pages/') !== -1) return '../';
  return '';
}

/* ── Build sidebar HTML ──────────────────────────────────────── */
function buildSidebar(activePage) {
  activePage = activePage || 'index';
  var snippets = SV.getSnippets();
  var favCount = snippets.filter(function(s) { return s.favorited; }).length;

  var langCounts = {};
  snippets.forEach(function(s) {
    langCounts[s.language] = (langCounts[s.language] || 0) + 1;
  });

  var d = getDepth();

  function navHref(page) {
    if (page === 'index')       return d + 'index.html';
    if (page === 'favorites')   return d + 'pages/favorites.html';
    if (page === 'collections') return d + 'pages/collections.html';
    if (page === 'settings')    return d + 'pages/settings.html';
    return '#';
  }

  var topLangs = SV.LANGUAGES
    .filter(function(l) { return langCounts[l.id]; })
    .sort(function(a, b) { return (langCounts[b.id] || 0) - (langCounts[a.id] || 0); })
    .slice(0, 8);

  var catCounts = {};
  snippets.forEach(function(s) {
    catCounts[s.category] = (catCounts[s.category] || 0) + 1;
  });

  var html = '';

  html += '<div class="sidebar-logo">';
  html += '<div class="logo-icon">⟨/⟩</div>';
  html += '<div class="logo-text">Snip<span>Vault</span></div>';
  html += '</div>';

  html += '<button class="new-snippet-btn" onclick="handleNewSnippet()">';
  html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  html += 'New snippet</button>';

  // Library nav
  html += '<nav class="nav-section"><div class="nav-label">Library</div>';
  html += '<a href="' + navHref('index') + '"><button class="nav-item ' + (activePage === 'index' ? 'active' : '') + '">';
  html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>';
  html += 'All snippets<span class="count">' + snippets.length + '</span></button></a>';

  html += '<a href="' + navHref('favorites') + '"><button class="nav-item ' + (activePage === 'favorites' ? 'active' : '') + '">';
  html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  html += 'Favorites<span class="count">' + favCount + '</span></button></a>';

  html += '<a href="' + navHref('collections') + '"><button class="nav-item ' + (activePage === 'collections' ? 'active' : '') + '">';
  html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
  html += 'Collections</button></a>';
  html += '</nav>';

  // Languages
  if (topLangs.length) {
    html += '<nav class="nav-section"><div class="nav-label">Languages</div>';
    topLangs.forEach(function(l) {
      html += '<a href="' + navHref('index') + '?lang=' + l.id + '"><button class="nav-item">';
      html += '<span class="lang-nav-dot" style="background:' + l.color + '"></span>';
      html += l.label + '<span class="count">' + (langCounts[l.id] || 0) + '</span>';
      html += '</button></a>';
    });
    html += '</nav>';
  }

  // Categories
  var catItems = SV.CATEGORIES.filter(function(c) { return catCounts[c.id]; }).slice(0, 6);
  if (catItems.length) {
    html += '<nav class="nav-section"><div class="nav-label">Categories</div>';
    catItems.forEach(function(c) {
      html += '<a href="' + navHref('index') + '?cat=' + c.id + '"><button class="nav-item">';
      html += '<span style="font-size:13px">' + c.icon + '</span>';
      html += c.label + '<span class="count">' + catCounts[c.id] + '</span>';
      html += '</button></a>';
    });
    html += '</nav>';
  }

  // Footer
  html += '<div class="sidebar-footer">';
  html += '<a href="' + navHref('settings') + '"><button class="nav-item ' + (activePage === 'settings' ? 'active' : '') + '">';
  html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>';
  html += 'Settings</button></a>';
  html += '</div>';

  return html;
}

/* ── Insert sidebar + overlay into page ─────────────────────── */
function initSidebar(activePage) {
  var sb = document.getElementById('sidebar');
  if (sb) sb.innerHTML = buildSidebar(activePage);

  // overlay click closes sidebar
  var ov = document.getElementById('sidebarOverlay');
  if (ov) ov.addEventListener('click', closeSidebar);

  // menu toggle
  var mt = document.getElementById('menuToggle');
  if (mt) mt.addEventListener('click', openSidebar);

  applyTheme();
}

/* ── handleNewSnippet — works from any page ─────────────────── */
function handleNewSnippet() {
  closeSidebar();
  var d = getDepth();
  var indexUrl = d + 'index.html?new=1';
  // If already on index, open the modal directly
  if (typeof openModal === 'function') {
    openModal();
  } else {
    location.href = indexUrl;
  }
}

/* ── Build a snippet card ─────────────────────────────────────── */
function buildCard(snippet) {
  var d = getDepth();
  var lang = SV.getLang(snippet.language);
  var cat  = SV.getCat(snippet.category);
  var preview = snippet.code.split('\n').slice(0, 5).join('\n');

  var html = '<div class="snippet-card ' + (snippet.favorited ? 'favorited' : '') + '"';
  html += ' onclick="location.href=\'' + d + 'pages/view.html?id=' + snippet.id + '\'">';

  html += '<div class="card-header">';
  html += '<div class="card-lang-icon" style="background:' + lang.bg + ';color:' + lang.color + '">' + lang.abbr + '</div>';
  html += '<div class="card-info">';
  html += '<div class="card-title">' + SV.escapeHtml(snippet.title) + '</div>';
  html += '<div class="card-desc">' + SV.escapeHtml(snippet.description || '') + '</div>';
  html += '</div>';
  if (snippet.favorited) html += '<span class="card-fav-indicator">★</span>';
  html += '</div>';

  html += '<div class="code-block">' + SV.escapeHtml(preview) + '</div>';

  html += '<div class="card-footer">';
  html += '<div class="card-tags">';
  html += '<span class="tag-pill" style="background:' + lang.bg + ';color:' + lang.color + ';border-color:' + lang.color + '33">' + lang.label + '</span>';
  html += '<span class="tag-pill">' + cat.icon + ' ' + cat.label + '</span>';
  var tags = snippet.tags || [];
  if (tags[0]) html += '<span class="tag-pill">' + SV.escapeHtml(tags[0]) + '</span>';
  html += '</div>';

  html += '<div class="card-actions" onclick="event.stopPropagation()">';
  // copy btn
  var escaped = snippet.code.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n');
  html += '<button class="card-btn" title="Copy" onclick="copyCode(\'' + escaped + '\')">';
  html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
  html += '</button>';
  // fav btn
  html += '<button class="card-btn ' + (snippet.favorited ? 'fav-active' : '') + '" title="Favorite" onclick="handleFav(\'' + snippet.id + '\',this)">';
  html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="' + (snippet.favorited ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  html += '</button>';
  html += '</div>';
  html += '</div>';
  html += '</div>';
  return html;
}

/* ── Favorite handler ─────────────────────────────────────────── */
function handleFav(id, btn) {
  var isFav = SV.toggleFavorite(id);
  btn.classList.toggle('fav-active', isFav);
  var svg = btn.querySelector('svg');
  svg.setAttribute('fill', isFav ? 'currentColor' : 'none');
  btn.closest('.snippet-card').classList.toggle('favorited', isFav);
  showToast(isFav ? 'Added to favorites' : 'Removed from favorites', isFav ? '★' : '☆');
  // refresh sidebar counts
  initSidebar(window._activePage || 'index');
}

/* ── Select builders ─────────────────────────────────────────── */
function buildLangOptions(selected) {
  selected = selected || '';
  return SV.LANGUAGES.map(function(l) {
    return '<option value="' + l.id + '"' + (l.id === selected ? ' selected' : '') + '>' + l.label + '</option>';
  }).join('');
}
function buildCatOptions(selected) {
  selected = selected || '';
  return SV.CATEGORIES.map(function(c) {
    return '<option value="' + c.id + '"' + (c.id === selected ? ' selected' : '') + '>' + c.icon + ' ' + c.label + '</option>';
  }).join('');
}

window.showToast = showToast;
window.copyCode  = copyCode;
window.openSidebar   = openSidebar;
window.closeSidebar  = closeSidebar;
window.initSidebar   = initSidebar;
window.buildSidebar  = buildSidebar;
window.buildCard     = buildCard;
window.handleFav     = handleFav;
window.handleNewSnippet  = handleNewSnippet;
window.buildLangOptions  = buildLangOptions;
window.buildCatOptions   = buildCatOptions;
window.applyTheme        = applyTheme;
