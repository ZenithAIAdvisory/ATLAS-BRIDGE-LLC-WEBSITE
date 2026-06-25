# Atlas Bridge LLC — Website

A polished, single-page static website for **Atlas Bridge LLC**, a woman- and minority-owned small business that coordinates qualified vendor teams for essential government facility services nationwide.

Built with clean, dependency-free **HTML, CSS, and JavaScript**. No build step, no framework, no external libraries, no tracking. Open `index.html` in a browser and it runs.

---

## Highlights

- Sticky, accessible navigation with a mobile hamburger menu and scrollspy
- Custom bridge-inspired logo and a hand-built SVG hero illustration
- Six capability cards with custom SVG icons
- A radial "service hub" diagram connecting service categories to Atlas Bridge
- A five-step Operating Model timeline
- Quality pillars + a coordination checklist (no invented certifications)
- A Federal Profile card with commented placeholders for future identifiers
- SEO metadata: Open Graph, Twitter card, canonical URL, and `Organization` JSON-LD
- Fully responsive, keyboard-friendly, with visible focus states and reduced-motion support

---

## File structure

```
atlas-bridge-website/
├── index.html          # All page content and SEO/structured data
├── styles.css          # Design tokens, layout, components, responsive rules
├── script.js           # Nav, scrollspy, reveal animations, auto year
├── favicon.svg         # Brand bridge mark (SVG favicon)
└── README.md           # This file
```

### Optional assets folder

No images are required — all graphics are inline SVG. If you later add downloadable
files (such as a capability statement PDF) or images, a simple convention is:

```
atlas-bridge-website/
└── assets/
    ├── docs/
    │   └── atlas-bridge-capability-statement.pdf
    └── img/
        └── og-image.png        # optional 1200×630 social preview image
```

Then reference them with relative paths, e.g. `assets/docs/atlas-bridge-capability-statement.pdf`.

---

## Preview locally

**Simplest:** double-click `index.html` (or right-click → Open With → your browser).

**With a local server** (recommended so relative paths and the favicon behave exactly like production):

```bash
# Python 3
python3 -m http.server 8000
# then open http://localhost:8000

# or Node (if installed)
npx serve .
```

---

## Deploy to Netlify

**Option A — drag and drop**
1. Go to https://app.netlify.com/drop
2. Drag the entire `atlas-bridge-website` folder onto the page.
3. Netlify gives you a live URL instantly. Add your custom domain (`atlasbridgellc.com`) under **Site settings → Domain management**.

**Option B — from Git**
1. Push this folder to a GitHub/GitLab/Bitbucket repository.
2. In Netlify: **Add new site → Import an existing project** and pick the repo.
3. Build settings: leave **Build command** blank and set **Publish directory** to the project root (or `/` if the files are at the repo root). This is a static site — no build step.
4. Deploy, then connect your domain.

---

## Deploy to GitHub Pages

1. Create a repository (e.g. `atlas-bridge-website`) and push these files to the `main` branch.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source = Deploy from a branch**, **Branch = main**, **Folder = / (root)**, then **Save**.
4. Your site publishes at `https://<username>.github.io/<repo>/`.
5. To use `atlasbridgellc.com`, add a **Custom domain** in the Pages settings and create the matching DNS records with your registrar (a `CNAME` for `www` and/or `A`/`ALIAS` records for the apex domain).

> Tip: when serving from a subpath like `/<repo>/`, the relative links (`styles.css`, `script.js`, `favicon.svg`, and the `#section` anchors) already work as-is. The absolute `canonical`/Open Graph URLs point to `https://atlasbridgellc.com/` — update them if you publish under a different final domain.

---

## Places to update later

These are intentionally left out or commented so nothing unverifiable is published.
Update them only once each item is confirmed.

| Item | Where to edit |
|------|----------------|
| **UEI** | `index.html` → Federal Profile section, `<!-- UEI: Add when available -->` |
| **CAGE Code** | `index.html` → Federal Profile section, `<!-- CAGE Code: Add when available -->` |
| **SAM registration** | `index.html` → Federal Profile section, `<!-- SAM Registration: Add when active -->` |
| **NAICS codes** | `index.html` → Federal Profile section, `<!-- NAICS Codes: Add when selected -->` |
| **Capability statement (PDF)** | `index.html` → Federal Profile section, `<!-- Capability Statement Download: Add file link when available -->`; place the file under `assets/docs/` |
| **Phone number** | Add to the Contact section and, if desired, to the JSON-LD `contactPoint` in `<head>` |
| **Certifications** (WOSB, MBE, 8(a), HUBZone, GSA, etc.) | Add only after the certification is officially verified — Quality section and/or Federal Profile |
| **Canonical / OG / Twitter URLs** | `<head>` of `index.html`, if the final domain differs |
| **Social preview image** | Replace the `og:image` / `twitter:image` paths in `<head>` with `assets/img/og-image.png` |

To add a profile field, copy one `profile-row` block in the Federal Profile section:

```html
<div class="profile-row">
  <dt>UEI</dt>
  <dd>ABCDE12345FG</dd>
</div>
```

---

## Accuracy note

This site is written to present Atlas Bridge LLC as organized, responsive, and capable
**without** making unverifiable claims. It does not state or imply SAM registration,
certifications, federal identifiers, past performance, government clients, testimonials,
insurance, bonding, or endorsement. Keep new copy to the same standard.

---

## Editing the brand colors

All colors live as CSS custom properties at the top of `styles.css` under `:root`:

```css
--navy:   #0B1F3A;
--slate:  #334155;
--light:  #F8FAFC;
--border: #E2E8F0;
--gold:   #C9A227;
--steel:  #2E5E7E;
--white:  #FFFFFF;
```

Change a value once and it updates everywhere.

---

© Atlas Bridge LLC. The copyright year in the footer updates automatically via JavaScript.
