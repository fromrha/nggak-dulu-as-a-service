## Changelog

All notable changes to this project will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning follows [Semantic Versioning](https://semver.org/)

## [Unreleased]

## [v0.3.0] - 2026-05-21
### Added
- Duplicate prevention mechanism in `/api/no` endpoint to avoid serving the same rejection sentence twice within the same rate limit session.

### Changed
- Increased rate limit window from 10 minutes to 30 minutes (30 requests per 30 minutes).

## [v0.2.1] - 2026-05-21
### Fixed
- UI now displays the correct rate limit error message when API returns HTTP 429.

## [v0.2.0] - 2026-05-21
### Added
- Local request rejection counter (`nggakDuluLocalCount`) using `localStorage`.
- Basic IP-based rate limiting for `/api/no` with in-memory fallback.
- `GET /api/stats` endpoint with graceful fallback support for global rejections.
- Interactive stats cards in the Generator UI (Your Requests Rejected, Total Global Rejections, Approval Rate).
- Privacy footnote in the Footer.
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
