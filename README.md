# Bengaluru Auto Expo 2026 — Official Event Website

A 100% responsive, multi-page marketing website for **Bengaluru Auto Expo 2026**
(8–11 October 2026 · Bangalore International Exhibition Centre, Bengaluru, India).

Built with **React 19 + Vite + Tailwind CSS v4 + React Router**, with smooth
scroll animations (Framer Motion) and a premium brand palette
(`#270585` deep indigo · `#850527` maroon).

## Pages
- **Home** — hero, live countdown, event brief, 10 highlights, quick contact,
  who-should-participate, industry stats, gallery, venue + Google Map, partners,
  sponsors and testimonials.
- **About Us** — story, mission/vision, by-the-numbers, 4-day timeline,
  why Bengaluru.
- **Exhibitors** — benefits, booth & pricing plans, featured exhibitors,
  how-to-exhibit steps, registration form.
- **Opportunities** — value props, sponsorship tiers, audience types, ROI.
- **Contact Us** — contact methods, enquiry form, map, FAQ accordion.

## Local development
```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build locally
```

## Editing the site — Master Config (single source of truth)
Everything on the site is controlled from **one file**:
```
src/config/site.config.ts
```
It is organized into 6 clearly-numbered blocks:

| Block | Controls |
|-------|----------|
| **01 · Site & Event** | Event name, dates, venue, contacts, shared UI labels |
| **02 · Navigation & Footer** | Nav links, footer copy, newsletter, form dropdown options |
| **03 · Shared Content Lists** | Highlights, sectors, stats, sponsors, FAQs, partners… |
| **04 · Shared Types** | `HeadingConfig`, `PageHeaderConfig`, `CtaConfig`… |
| **05 · Section Settings** | Every section's **content, headings, alignment, and `enabled` on/off switch** |
| **06 · Pages** | Each page's hero header **plus the ordered section list** |

### Reorder a section
Move the id inside the page's `sections` array — e.g. swap the Home order:
```ts
PAGES.home.sections = ["hero", "highlights", "countdown", ...]
```

### Disable / enable a section
Flip one flag in `SECTIONS`:
```ts
SECTIONS.gallery.enabled = false   // gallery is skipped everywhere
```

### Edit a heading
Each section carries a config-driven heading (`title` = normal text,
`accent` = gradient text, `align` = "left" | "center", `light` = white variant):
```ts
SECTIONS.highlights.heading = {
  eyebrow: "Event Highlights",
  title: "Ten unforgettable experiences, ",
  accent: "all under one roof",
  align: "center",
}
```

Pages are thin shells (`src/pages/*.tsx`) that map section ids to components via
`PageSections`; section components read their own slice of the config
(`SECTIONS.hero`, `SECTIONS.venue`, …). Brand colours and fonts are defined in
`src/index.css` (Tailwind v4 `@theme`).

## Google Sheets as a CMS (optional, no code, no API key)
Dynamic per-event lists — **Highlights, Sectors, Industry Stats, Facts,
Sponsors, Testimonials, Timeline, Booth Plans, Opportunity Points, Sponsorship
Plans, Partners, Clients, FAQs** — can be managed from a Google Sheet instead of
code.

- **Off by default** → the site uses the config data and looks exactly as-is.
- Turn it on in `src/config/sheets.config.ts` (`enabled: true` + your Sheet ID).
- Each tab supports a **Status** checkbox (show/hide rows) and an **Order**
  number (sort). **Empty cells hide** that element; **extra columns you add show
  automatically** in the same card style.
- Human-readable headers (`Title`, `Description`, …) are mapped to code fields in
  `SHEET_TABS` — rename freely and update the mapping.
- Ready-to-import starter CSVs (with all current content) live in
  **`/sheet-content`**; full step-by-step setup is in
  [`sheet-content/README.md`](sheet-content/README.md).

Reliability: content is fetched from Google's public `gviz` CSV endpoint
(no key, no OAuth), cached in the browser, and **any failure silently falls back
to the built-in config** — the design never breaks.

## Media library
Drop logos, photos and icons into **`/public/media/`** (subfolders: `event`,
`exhibitors`, `partners`, `sponsors`, `testimonials`, `icons`) and reference them
as `/media/<folder>/<file>` in the sheet's image columns — see
[`public/media/README.md`](public/media/README.md).

## Deploy to GitHub
1. Create a new repository on GitHub.
2. Initialise and push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Bengaluru Auto Expo 2026 website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

## Deploy to Vercel (free)
1. Go to <https://vercel.com> and sign in with GitHub.
2. **Add New → Project** and import your repository.
3. Vercel auto-detects Vite. Confirm the settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your site is live in under a minute on a free `*.vercel.app`
   domain, with automatic re-deploys on every push to `main`.

> Routing uses `HashRouter`, so deep links and refreshes work on **any** static
> host (Vercel, GitHub Pages, Netlify) with **zero extra configuration**.

## Tech stack
| Tool | Purpose |
|------|---------|
| React 19 + TypeScript | UI framework |
| Vite 7 | Build tool / dev server |
| Tailwind CSS v4 | Styling |
| React Router | Multi-page navigation |
| Framer Motion | Scroll reveal & motion |
| lucide-react | Icons |

---

© Bengaluru Auto Expo 2026. Crafted for the future of mobility.
