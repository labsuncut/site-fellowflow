# FellowFlow brand site (trial: we are client zero)

Our own brand website, built and run the same way we build for clients. Plain HTML, CSS and JavaScript, no build step.

- Words: English in `index.html`, Arabic in `assets/js/site.js` (the `AR` list, same keys as `data-i18n`).
- Arabic page: `ar/index.html` is built from those two files so Google can read the Arabic (`https://fellowflow.ai/ar/`). After changing any words, run `node tools/build-ar.mjs` and commit both pages. Never edit `ar/index.html` by hand. The language button is a link between `/` and `/ar/`, and both pages carry `hreflang` links to each other.
- Privacy policy: `privacy/index.html` (linked in every footer). If the site ever adds a form service, cookie, tracker or other outside service, or the team starts keeping client details in a new tool, update that page and its date in the same change (and the Arabic page once it exists).
- Visit counts: Cloudflare Web Analytics (turned on by the founders on 25 Oct 2026). Cloudflare adds its script to every page by itself; our security rule allows it with `https://static.cloudflareinsights.com` in `script-src`, in `_headers` and in each page's CSP `<meta>`. If it is ever switched off, remove that address from both and the "Visit counts" lines from the privacy page.
- Checks: every push to `main` runs `.github/workflows/site-checks.yml` on GitHub. It checks that the Arabic page is up to date, then waits for Cloudflare to publish and checks the live site (pages, links, console errors, and that the live HTML matches this repository). See the Actions tab.
- Colours: top of `assets/css/site.css` (navy and cream from the logo, gold highlights).
- Logo: `assets/img/logo/` (cut from the 640px JPEG; replace with the vector when we have it).
- Our work images: `assets/img/work/`. Team photos: `assets/img/team/`.
- Facts: `business.json`.

Live at https://fellowflow.ai and www, served by the Cloudflare Worker `site-fellowflow` (static assets, settings in `wrangler.jsonc`, security headers in `_headers`). DNS is on Cloudflare; the domain is still registered at GoDaddy. GitHub Pages is switched off. Open to search engines since launch; `sitemap.xml` and `robots.txt` point Google at it.

To edit: change the files on `main` (or ask Claude in the "FellowFlow website" thread); Cloudflare rebuilds from `main` and republishes in about a minute. Every change is a commit, so any edit can be undone.

Our work: only show a business's site with its written permission. Fuel is hidden until Fuel approves (its card is in commit 9d1bdfe).

## Backups, rollback and restore

There is no database. Everything the site needs is in this repository, and every version since the first commit is kept by Git on GitHub. Cloudflare also keeps a list of past deployments.

**Roll back a bad change (about 2 minutes), pick one:**
1. Cloudflare dashboard > Workers & Pages > `site-fellowflow` > Deployments. Find the last good deployment, open its `...` menu and choose Rollback. The live site switches back at once. The next push to `main` deploys again on top of it, so also do option 2 if the bad change is still in `main`.
2. Undo the commit in Git: `git revert <commit>` and push to `main` (or ask Claude in the "FellowFlow website" thread to revert it). Cloudflare republishes in about a minute.

**Restore from scratch** (tested 2026-10-20): `git clone https://github.com/labsuncut/site-fellowflow.git`, `git checkout <commit>` for an older version, then serve the folder (e.g. `python3 -m http.server`). The site runs as it did at that commit.

## Accounts the site depends on

No passwords here, only where each login lives. All sit on the shared team Google account (labsuncut@gmail.com) today.

| Service | What it does | Account |
|---|---|---|
| GoDaddy | Domain registration for fellowflow.ai | team account |
| Cloudflare | DNS, the `site-fellowflow` Worker, custom domains | labsuncut@gmail.com |
| GitHub | This repository (`labsuncut/site-fellowflow`) | labsuncut |
| Google Search Console | fellowflow.ai Domain property (never delete the `google-site-verification` TXT record) | labsuncut@gmail.com |
| Google Business Profile | FellowFlow listing | labsuncut@gmail.com |
| Microsoft 365 / Mailgun | Email records on the domain (MX, SPF, DMARC) | not confirmed in this repo |
