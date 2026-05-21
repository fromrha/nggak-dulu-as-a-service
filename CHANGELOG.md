## Changelog

All notable changes to this project will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning follows [Semantic Versioning](https://semver.org/)

## [Unreleased]
### Added
- `lucide-react` dependency for modern iconography.
- Favorites/Bookmark system with `localStorage` persistence.
- Interactive request tabs (cURL, Fetch, Python) in API docs.
- Tone-reactive page theme where layout accents match the active tone.

### Changed
- Revamped default landing page theme to premium dark obsidian.
- Replaced Tone and Category `<select>` dropdowns with tactile interactive pill grids.
- Restyled Hero section with SVG grid mesh overlays, text gradients, and hover actions.
- Redesigned Generator UI into a terminal-styled component with copy feedback toasts.
- Modernized API Docs into a dashboard console layout.
- Upgraded Footer with modern typography, grids, and icon references.
- Changed reasons dataset in `reasons.json` from flat array of objects to nested category-tone format.
- Modified `getRandomReason` utility and `/api/no` API endpoint to read from the new nested format.
- Removed `id` field from API responses to match the new nested structure.

### Removed
- Deleted temporary data files `datasementara1.json` and `datasementara2.json` after merging them.
