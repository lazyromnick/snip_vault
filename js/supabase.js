/* ── SnipVault · Supabase Client ────────────────────────────── */

const SUPABASE_URL = 'https://dpqnslaycjoundksdmgh.supabase.co';
const SUPABASE_KEY = 'sb_publishable_tbEY-sP4adJJLHLR_70lRg_nXphvRnR';

/* Load the Supabase JS SDK from CDN, then expose the client */
(function () {
  var script   = document.createElement('script');
  script.src   = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
  script.async = false;
  script.onload = function () {
    window._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    document.dispatchEvent(new Event('supabase:ready'));
  };
  document.head.appendChild(script);
})();

/* ── Auth helpers ────────────────────────────────────────────── */

function sbClient() { return window._supabase; }

/* Get current session synchronously (already cached by SDK) */
async function getSession() {
  var res = await sbClient().auth.getSession();
  return res.data.session;
}

/* Get current user */
async function getUser() {
  var session = await getSession();
  return session ? session.user : null;
}

/* Sign in with GitHub OAuth */
async function signInWithGitHub() {
  var redirectTo = location.origin + '/index.html';
  var { error } = await sbClient().auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo: redirectTo }
  });
  if (error) console.error('GitHub sign-in error:', error.message);
}

/* Sign out */
async function signOut() {
  await sbClient().auth.signOut();
  location.href = getDepth() + 'login.html';
}

/* ── Auth guard — call at top of every protected page ─────── */
async function requireAuth() {
  var session = await getSession();
  if (!session) {
    location.href = getDepth() + 'login.html';
    throw new Error('Not authenticated');
  }
  return session.user;
}

/* ── Snippets API ────────────────────────────────────────────── */

async function apiGetSnippets() {
  var { data, error } = await sbClient()
    .from('snippets')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(dbToSnippet);
}

async function apiGetSnippetById(id) {
  var { data, error } = await sbClient()
    .from('snippets')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return dbToSnippet(data);
}

async function apiSaveSnippet(snippet) {
  var user    = await getUser();
  var payload = snippetToDb(snippet, user.id);

  if (snippet.id && !snippet._isNew) {
    // Update existing
    var { data, error } = await sbClient()
      .from('snippets')
      .update(payload)
      .eq('id', snippet.id)
      .select()
      .single();
    if (error) throw error;
    return dbToSnippet(data);
  } else {
    // Insert new
    delete payload.id;
    var { data, error } = await sbClient()
      .from('snippets')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    return dbToSnippet(data);
  }
}

async function apiDeleteSnippet(id) {
  var { error } = await sbClient()
    .from('snippets')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

async function apiToggleFavorite(id, current) {
  var { data, error } = await sbClient()
    .from('snippets')
    .update({ favorited: !current })
    .eq('id', id)
    .select('favorited')
    .single();
  if (error) throw error;
  return data.favorited;
}

/* ── Collections API ─────────────────────────────────────────── */

async function apiGetCollections() {
  var { data, error } = await sbClient()
    .from('collections')
    .select('*, collection_snippets(snippet_id)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(function(c) {
    return {
      id:         c.id,
      name:       c.name,
      icon:       c.icon,
      snippetIds: (c.collection_snippets || []).map(function(r) { return r.snippet_id; }),
      createdAt:  new Date(c.created_at).getTime(),
    };
  });
}

async function apiSaveCollection(coll) {
  var user = await getUser();
  if (coll.id && !coll._isNew) {
    var { data, error } = await sbClient()
      .from('collections')
      .update({ name: coll.name, icon: coll.icon })
      .eq('id', coll.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } else {
    var { data, error } = await sbClient()
      .from('collections')
      .insert({ user_id: user.id, name: coll.name, icon: coll.icon })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

async function apiDeleteCollection(id) {
  var { error } = await sbClient()
    .from('collections')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

async function apiAddSnippetToCollection(collId, snippetId) {
  var { error } = await sbClient()
    .from('collection_snippets')
    .upsert({ collection_id: collId, snippet_id: snippetId });
  if (error) throw error;
}

async function apiRemoveSnippetFromCollection(collId, snippetId) {
  var { error } = await sbClient()
    .from('collection_snippets')
    .delete()
    .eq('collection_id', collId)
    .eq('snippet_id', snippetId);
  if (error) throw error;
}

async function apiGetSnippetCollections(snippetId) {
  var colls = await apiGetCollections();
  return colls.filter(function(c) { return c.snippetIds.indexOf(snippetId) !== -1; });
}

/* ── Shape converters ────────────────────────────────────────── */
function dbToSnippet(row) {
  return {
    id:          row.id,
    title:       row.title,
    description: row.description || '',
    language:    row.language,
    category:    row.category,
    code:        row.code,
    tags:        row.tags || [],
    favorited:   row.favorited || false,
    createdAt:   new Date(row.created_at).getTime(),
    updatedAt:   row.updated_at ? new Date(row.updated_at).getTime() : null,
  };
}

function snippetToDb(s, userId) {
  return {
    id:          s.id,
    user_id:     userId,
    title:       s.title,
    description: s.description || '',
    language:    s.language,
    category:    s.category,
    code:        s.code,
    tags:        s.tags || [],
    favorited:   s.favorited || false,
  };
}

/* ── Expose on window ────────────────────────────────────────── */
window.SB = {
  client:   sbClient,
  getSession, getUser,
  signInWithGitHub, signOut,
  requireAuth,
  /* snippets */
  getSnippets:       apiGetSnippets,
  getSnippetById:    apiGetSnippetById,
  saveSnippet:       apiSaveSnippet,
  deleteSnippet:     apiDeleteSnippet,
  toggleFavorite:    apiToggleFavorite,
  /* collections */
  getCollections:             apiGetCollections,
  saveCollection:             apiSaveCollection,
  deleteCollection:           apiDeleteCollection,
  addSnippetToCollection:     apiAddSnippetToCollection,
  removeSnippetFromCollection: apiRemoveSnippetFromCollection,
  getSnippetCollections:      apiGetSnippetCollections,
};
