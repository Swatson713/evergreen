# Developer Setup Reference

Technical notes for the developer. The client-facing guide is in `Evergreen-Archaeology-Handover-Guide.html`.

---

## First-time setup

```bash
npm install
npm run dev          # http://localhost:4321
                     # Keystatic admin: http://localhost:4321/keystatic
```

## Before deploying — update the site URL

In `astro.config.mjs`:
```js
site: 'https://evergreenarchaeology.com',  // ← real domain here
```

In `public/robots.txt`:
```
Sitemap: https://evergreenarchaeology.com/sitemap-index.xml  # ← same domain
```

If using a GitHub Pages sub-path (no custom domain yet), also add:
```js
base: '/repo-name',
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

Future updates:
```bash
git add .
git commit -m "Description of change"
git push
```

## Enable GitHub Pages

Repo → Settings → Pages → Source → **GitHub Actions**

First deploy triggers automatically on push. Manual trigger: Actions tab → Deploy to GitHub Pages → Run workflow.

## Custom domain DNS records

Add at the client's domain registrar:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 185.199.108.153          |
| A     | @    | 185.199.109.153          |
| A     | @    | 185.199.110.153          |
| A     | @    | 185.199.111.153          |
| CNAME | www  | yourusername.github.io   |

Then: Repo → Settings → Pages → Custom domain → enter domain → Save → tick Enforce HTTPS.

## Content updates (GitHub Pages workflow)

1. `npm run dev`
2. Open http://localhost:4321/keystatic
3. Make changes and save
4. `git add . && git commit -m "Update content" && git push`
5. Site rebuilds and deploys automatically (~60s)

## Want the client to self-manage content?

Switch to **Cloudflare Pages** + Keystatic GitHub storage mode:

1. Install the Cloudflare adapter: `npm install @astrojs/cloudflare`
2. Change `astro.config.mjs` to `output: 'hybrid'` and add `adapter: cloudflare()`
3. Change `keystatic.config.ts` storage to `{ kind: 'github', repo: 'owner/repo' }`
4. Create a GitHub OAuth App and add credentials as Cloudflare Pages environment variables
5. Connect repo to Cloudflare Pages (Build: `npm run build`, Output: `dist`, Node: 20)

Client can then edit content at `evergreenarchaeology.com/keystatic` with no developer involvement.

## Build test

```bash
npm run build    # outputs to /dist
npm run preview  # preview at http://localhost:4321
```
