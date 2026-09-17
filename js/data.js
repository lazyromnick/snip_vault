/* ── SnipVault · Data Layer ─────────────────────────────────── */

const STORE_KEY = 'snipvault_snippets';
const SETTINGS_KEY = 'snipvault_settings';

/* ── Language Registry ──────────────────────────────────────── */
const LANGUAGES = [
  { id: 'python',  label: 'Python',       abbr: 'PY',  color: '#3d8fd4', bg: '#0d2540' },
  { id: 'cpp',     label: 'C++',          abbr: 'C++', color: '#00599c', bg: '#001a2e' },
  { id: 'c',       label: 'C',            abbr: 'C',   color: '#5c6bc0', bg: '#12153d' },
  { id: 'java',    label: 'Java',         abbr: 'JV',  color: '#e76f00', bg: '#2e1900' },
  { id: 'vb',      label: 'Visual Basic', abbr: 'VB',  color: '#512bd4', bg: '#1a0d44' },
  { id: 'csharp',  label: 'C#',           abbr: 'C#',  color: '#9b4f96', bg: '#2a0d29' },
  { id: 'js',      label: 'JavaScript',   abbr: 'JS',  color: '#c9a227', bg: '#2e2300' },
  { id: 'ts',      label: 'TypeScript',   abbr: 'TS',  color: '#3178c6', bg: '#0d2040' },
  { id: 'html',    label: 'HTML',         abbr: 'HTM', color: '#e34c26', bg: '#3b1000' },
  { id: 'css',     label: 'CSS',          abbr: 'CSS', color: '#a259f7', bg: '#200d3d' },
  { id: 'php',     label: 'PHP',          abbr: 'PHP', color: '#7a86b8', bg: '#1a1e33' },
  { id: 'sql',     label: 'SQL',          abbr: 'SQL', color: '#2eb886', bg: '#0a2e22' },
  { id: 'kotlin',  label: 'Kotlin',       abbr: 'KT',  color: '#7f52ff', bg: '#1a1040' },
  { id: 'swift',   label: 'Swift',        abbr: 'SW',  color: '#f05138', bg: '#3b1000' },
  { id: 'go',      label: 'Go',           abbr: 'GO',  color: '#00acd7', bg: '#002e3b' },
  { id: 'rust',    label: 'Rust',         abbr: 'RS',  color: '#ce422b', bg: '#350e06' },
  { id: 'r',       label: 'R',            abbr: 'R',   color: '#276dc3', bg: '#0a1f3d' },
  { id: 'matlab',  label: 'MATLAB',       abbr: 'ML',  color: '#e16737', bg: '#351900' },
  { id: 'scratch', label: 'Scratch',      abbr: 'SCR', color: '#ff8c00', bg: '#2e1a00' },
  { id: 'other',   label: 'Other',        abbr: '•••', color: '#8b92a8', bg: '#1e2333' },
];

/* ── Category Registry ──────────────────────────────────────── */
const CATEGORIES = [
  { id: 'syntax',      label: 'Syntax Basics',    icon: '📝' },
  { id: 'datastructs', label: 'Data Structures',  icon: '🌲' },
  { id: 'algorithms',  label: 'Algorithms',       icon: '⚙️' },
  { id: 'oop',         label: 'OOP',              icon: '🧱' },
  { id: 'io',          label: 'Input / Output',   icon: '📤' },
  { id: 'strings',     label: 'Strings',          icon: '🔤' },
  { id: 'math',        label: 'Math & Numbers',   icon: '🔢' },
  { id: 'functions',   label: 'Functions',        icon: '𝑓' },
  { id: 'loops',       label: 'Loops & Control',  icon: '🔁' },
  { id: 'fileio',      label: 'File I/O',         icon: '📁' },
  { id: 'network',     label: 'Networking',       icon: '🌐' },
  { id: 'database',    label: 'Database',         icon: '🗄️' },
  { id: 'ui',          label: 'UI / Frontend',    icon: '🎨' },
  { id: 'utility',     label: 'Utilities',        icon: '🔧' },
  { id: 'snippet',     label: 'General Snippet',  icon: '✂️' },
];

/* ── Seed Data ──────────────────────────────────────────────── */
const SEED_SNIPPETS = [
  {
    id: 'seed1',
    title: 'Hello World',
    description: 'Print to the console — the classic first program',
    language: 'python',
    category: 'syntax',
    tags: ['beginner', 'output'],
    code: `# Hello World in Python\nprint("Hello, World!")`,
    favorited: false,
    createdAt: Date.now() - 86400000 * 7,
  },
  {
    id: 'seed2',
    title: 'Hello World',
    description: 'The first C++ program every student writes',
    language: 'cpp',
    category: 'syntax',
    tags: ['beginner', 'output'],
    code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
    favorited: false,
    createdAt: Date.now() - 86400000 * 6,
  },
  {
    id: 'seed3',
    title: 'For loop',
    description: 'Iterate from 1 to 10 and print each value',
    language: 'java',
    category: 'loops',
    tags: ['beginner', 'loops'],
    code: `public class ForLoop {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            System.out.println(i);\n        }\n    }\n}`,
    favorited: true,
    createdAt: Date.now() - 86400000 * 5,
  },
  {
    id: 'seed4',
    title: 'Simple calculator',
    description: 'Basic +, −, ×, ÷ with user input',
    language: 'vb',
    category: 'io',
    tags: ['beginner', 'input', 'math'],
    code: `Module Calculator\n    Sub Main()\n        Dim a As Double = CDbl(Console.ReadLine())\n        Dim op As String = Console.ReadLine()\n        Dim b As Double = CDbl(Console.ReadLine())\n        Select Case op\n            Case "+": Console.WriteLine(a + b)\n            Case "-": Console.WriteLine(a - b)\n            Case "*": Console.WriteLine(a * b)\n            Case "/": Console.WriteLine(a / b)\n        End Select\n    End Sub\nEnd Module`,
    favorited: false,
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'seed5',
    title: 'Bubble sort',
    description: 'Classic sorting algorithm — O(n²) time',
    language: 'python',
    category: 'algorithms',
    tags: ['sorting', 'algorithm', 'beginner'],
    code: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]\n    return arr\n\nprint(bubble_sort([64, 34, 25, 12, 22]))`,
    favorited: true,
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'seed6',
    title: 'Linked list node',
    description: 'Define and traverse a singly linked list',
    language: 'cpp',
    category: 'datastructs',
    tags: ['linked-list', 'pointer', 'intermediate'],
    code: `struct Node {\n    int data;\n    Node* next;\n    Node(int val) : data(val), next(nullptr) {}\n};\n\n// Traverse\nvoid print(Node* head) {\n    while (head) {\n        cout << head->data << " -> ";\n        head = head->next;\n    }\n    cout << "NULL" << endl;\n}`,
    favorited: false,
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'seed7',
    title: 'String reverse',
    description: 'Reverse a string using a loop',
    language: 'java',
    category: 'strings',
    tags: ['string', 'beginner'],
    code: `public static String reverse(String s) {\n    StringBuilder sb = new StringBuilder();\n    for (int i = s.length() - 1; i >= 0; i--) {\n        sb.append(s.charAt(i));\n    }\n    return sb.toString();\n}`,
    favorited: false,
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'seed8',
    title: 'Fibonacci sequence',
    description: 'Generate N Fibonacci numbers iteratively',
    language: 'c',
    category: 'math',
    tags: ['math', 'beginner', 'sequence'],
    code: `#include <stdio.h>\n\nvoid fibonacci(int n) {\n    int a = 0, b = 1, temp;\n    for (int i = 0; i < n; i++) {\n        printf("%d ", a);\n        temp = a + b;\n        a = b;\n        b = temp;\n    }\n}\n\nint main() {\n    fibonacci(10);\n    return 0;\n}`,
    favorited: false,
    createdAt: Date.now() - 3600000,
  },
];

/* ── Storage API ────────────────────────────────────────────── */
function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function saveSnippets(snippets) {
  localStorage.setItem(STORE_KEY, JSON.stringify(snippets));
}

function initStore() {
  let snippets = loadSnippets();
  if (!snippets) {
    snippets = SEED_SNIPPETS;
    saveSnippets(snippets);
  }
  return snippets;
}

function getSnippets() { return loadSnippets() || []; }

function getSnippetById(id) {
  return getSnippets().find(s => s.id === id) || null;
}

function saveSnippet(snippet) {
  const snippets = getSnippets();
  const idx = snippets.findIndex(s => s.id === snippet.id);
  if (idx >= 0) snippets[idx] = snippet;
  else snippets.unshift(snippet);
  saveSnippets(snippets);
}

function deleteSnippet(id) {
  const snippets = getSnippets().filter(s => s.id !== id);
  saveSnippets(snippets);
}

function toggleFavorite(id) {
  const snippets = getSnippets();
  const s = snippets.find(s => s.id === id);
  if (s) { s.favorited = !s.favorited; saveSnippets(snippets); }
  return s?.favorited;
}

function generateId() {
  return 'snip_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
}

/* ── Settings ───────────────────────────────────────────────── */
function getSettings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; }
  catch { return {}; }
}
function saveSettings(s) { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }

/* ── Helpers ────────────────────────────────────────────────── */
function getLang(id) { return LANGUAGES.find(l => l.id === id) || LANGUAGES.at(-1); }
function getCat(id)  { return CATEGORIES.find(c => c.id === id) || CATEGORIES.at(-1); }

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(ts).toLocaleDateString();
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Exports ────────────────────────────────────────────────── */
window.SV = {
  LANGUAGES, CATEGORIES,
  initStore, getSnippets, getSnippetById,
  saveSnippet, deleteSnippet, toggleFavorite, generateId,
  getSettings, saveSettings,
  getLang, getCat, timeAgo, escapeHtml,
};

/* ── Collections API (shared) ───────────────────────────────── */
var COLL_KEY = 'snipvault_collections';

function getCollections() {
  try { return JSON.parse(localStorage.getItem(COLL_KEY)) || []; } catch(e) { return []; }
}
function saveCollections(c) { localStorage.setItem(COLL_KEY, JSON.stringify(c)); }

function addSnippetToCollection(collId, snippetId) {
  var colls = getCollections();
  var coll  = colls.find(function(c){ return c.id === collId; });
  if (!coll) return false;
  if (!coll.snippetIds) coll.snippetIds = [];
  if (coll.snippetIds.indexOf(snippetId) === -1) coll.snippetIds.push(snippetId);
  saveCollections(colls);
  return true;
}

function removeSnippetFromCollection(collId, snippetId) {
  var colls = getCollections();
  var coll  = colls.find(function(c){ return c.id === collId; });
  if (!coll) return false;
  coll.snippetIds = (coll.snippetIds || []).filter(function(id){ return id !== snippetId; });
  saveCollections(colls);
  return true;
}

function getSnippetCollections(snippetId) {
  return getCollections().filter(function(c){
    return (c.snippetIds || []).indexOf(snippetId) !== -1;
  });
}

window.SV.getCollections            = getCollections;
window.SV.saveCollections           = saveCollections;
window.SV.addSnippetToCollection    = addSnippetToCollection;
window.SV.removeSnippetFromCollection = removeSnippetFromCollection;
window.SV.getSnippetCollections     = getSnippetCollections;
