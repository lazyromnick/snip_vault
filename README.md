# SnipVault 🗂️

A personal code snippet library for beginners and developers — store, organize, and browse reusable code across 20+ programming languages.

## Pages

| File | Route | Description |
|------|-------|-------------|
| `index.html` | `/` | Main library grid with search, filter, and new snippet modal |
| `pages/view.html` | `/pages/view.html?id=<id>` | Full snippet viewer with line numbers, edit, delete, copy |
| `pages/favorites.html` | `/pages/favorites.html` | Starred snippets |
| `pages/collections.html` | `/pages/collections.html` | Browse by language, category, or custom collections |
| `pages/settings.html` | `/pages/settings.html` | Export/import, preferences, storage stats |

## Languages supported

Python · C++ · C · Java · Visual Basic · C# · JavaScript · TypeScript · HTML · CSS · PHP · SQL · Kotlin · Swift · Go · Rust · R · MATLAB · Scratch · Other

## Categories

Syntax Basics · Data Structures · Algorithms · OOP · Input/Output · Strings · Math & Numbers · Functions · Loops & Control · File I/O · Networking · Database · UI/Frontend · Utilities · General Snippet

## Stack

- **Pure HTML + CSS + JavaScript** — zero dependencies, no build step
- **localStorage** for persistence (upgradeable to backend later)
- No frameworks, no npm

## Deploy to GitHub Pages

1. Push this folder to a GitHub repo
2. Go to **Settings → Pages → Source → main branch / root**
3. Your app is live at `https://<user>.github.io/<repo>/`

## Deploy to Vercel

1. Import the repo in Vercel
2. Framework: **Other** (static)
3. Output directory: `.` (root)
4. Deploy — done.

## Roadmap

- [ ] Syntax highlighting in viewer (highlight.js)
- [ ] CodeMirror editor for new/edit form
- [ ] Tag autocomplete
- [ ] Add snippet to custom collection from view page
- [ ] Backend + database (PostgreSQL)
- [ ] Multi-user / sharing
