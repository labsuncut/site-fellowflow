# FellowFlow brand site (trial: we are client zero)

Our own brand website, built and run the same way we build for clients. Plain HTML, CSS and JavaScript, no build step.

- Words: English in `index.html`, Arabic in `assets/js/site.js` (the `AR` list, same keys as `data-i18n`).
- Colours: top of `assets/css/site.css` (navy and cream from the logo, gold highlights).
- Logo: `assets/img/logo/` (cut from the 640px JPEG; replace with the vector when we have it).
- Our work images: `assets/img/work/`. Team photos: `assets/img/team/`.
- Facts: `business.json`.

Before going public:
1. Remove the `noindex` line in `index.html`.
2. Arabic proofread by a native speaker.
3. Connect the domain: add a `CNAME` file with `fellowflow.ai` and point the DNS at GitHub Pages (keep the existing `gym` subdomain record).
