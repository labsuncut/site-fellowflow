# FellowFlow brand site (trial: we are client zero)

Our own brand website, built and run the same way we build for clients. Plain HTML, CSS and JavaScript, no build step.

- Words: English in `index.html`, Arabic in `assets/js/site.js` (the `AR` list, same keys as `data-i18n`).
- Colours: top of `assets/css/site.css` (navy and cream from the logo, gold highlights).
- Logo: `assets/img/logo/` (cut from the 640px JPEG; replace with the vector when we have it).
- Our work images: `assets/img/work/`. Team photos: `assets/img/team/`.
- Facts: `business.json`.

Live at https://fellowflow.ai and www, served by the Cloudflare Worker `site-fellowflow` (static assets, settings in `wrangler.jsonc`, security headers in `_headers`). DNS is on Cloudflare; the domain is still registered at GoDaddy. GitHub Pages is switched off. Open to search engines since launch; `sitemap.xml` and `robots.txt` point Google at it.

To edit: change the files on `main` (or ask Claude in the "FellowFlow website" thread); Cloudflare rebuilds from `main` and republishes in about a minute. Every change is a commit, so any edit can be undone.

Our work: only show a business's site with its written permission. Fuel is hidden until Fuel approves (its card is in commit 9d1bdfe).
