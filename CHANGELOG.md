## Changelog

All notable changes to this project will be documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning follows [Semantic Versioning](https://semver.org/)

## [Unreleased]
### Added
- Added Back button in Generator UI to allow restoring up to 3 previous generated reasons.

### Fixed
- Fixed font fallback issue where EB Garamond failed to load by explicitly defining weight and style.
- Fixed italic text clipping on the last character ('n') in the Hero section by adding right padding.
- Fixed React hydration mismatch error caused by browser extensions by adding suppressHydrationWarning to html element.
- Fixed page load scroll position on refresh by forcing manual scroll restoration and scrolling to the top on mount.

### Changed
- Redesigned the entire site interface with a premium retro-futuristic acrylic terminal theme, propagating the style across the Hero badge, Generator stats/casing cards, dynamic quote screen display, and API Documentation parameters cards.
- Changed serif font in the Hero section to EB Garamond (medium italic) for a more premium look.
- Adjusted line height on the Hero heading and added top margin on mobile view to prevent text overlapping.

## [v0.3.2] - 2026-05-22
### Fixed
- Fixed double scrollbars on the page by resolving overflow rules between html, body, and main.
- Fixed layout crop and bottom footer empty gap bug when clicking anchor links by removing overflow-x-hidden on the main element.

### Changed
- Redesigned Hero section to be full viewport height (100% VH).
- Simplified Hero section CTAs to a single primary button ("Generate Nggak Dulu") and a stacked text-only tertiary link ("Panggil API-nya").
- Updated Hero badge copy to "Public API untuk menolak dengan sedikit martabat."
- Updated Hero title copy to "Untuk semua ajakan yang harusnya tidak kamu iyakan".

## [v0.3.1] - 2026-05-21
### Fixed
- Fixed layout crop and empty footer gap bug when clicking Hero CTA button by changing main container overflow-hidden to overflow-x-hidden.

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
