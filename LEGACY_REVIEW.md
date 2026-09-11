# Legacy review — retained, not loaded by Portfolio V2

The full V2 page uses css/theme.css, css/island.css, css/expeditions.css, css/structure.css and the corresponding current scripts. No assets were deleted.

## Review before cleanup
- `css/style.css`: old spider design, purple tokens, carousel/hexagon styles, preloader and cursor effects. No longer linked from index.html.
- `js/main.js`: old spider generation, particles, carousel, magnetic effects, cursor and legacy reveals. No longer loaded by index.html.
- `Home/home.html`, `Home/home.css`, `About/about.html`, `About/about.css`: old standalone pages. Check inbound URLs before removal or redirects.
- `assets/preview.png`: old spider-themed marketing preview; replace during final sharing/SEO polish.
- `assets/favicon.svg`: old H/purple favicon; update during brand asset polish.
- `assets/icons/`: old skill icons; retained for possible reuse.
- `UI desighn/`: reference design exports; retained as historical/reference material.

## Preserve
- `assets/profile.jpg` and `assets/Hansaka_Bandara_CV.pdf`: actively used.
- Existing GitHub/social/contact records remain in V2. Flight Analyzer and Smart Campus API content remains available in Git history for later project selection.

## Structural follow-up
- Contact endpoint is intentionally unconfigured. Configure `/api/contact` and server-side validation, abuse protection and delivery before enabling real messages.
- HealthHub and Estate Agent SPA have no verified local content yet.
- MUC Digital and NextGreen require final project visuals; research/outcome placeholders must be replaced with actual evidence.
- Both themes are implemented structurally; final image art direction and cinematic motion are deferred.
