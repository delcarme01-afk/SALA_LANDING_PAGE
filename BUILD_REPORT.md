# SALA Landing Page — Build Report

---

## Sprint: Proof & Positioning Upgrade — Second Pass (Real Product Redesign)

---

## Build Result

```
✓ npm run build — SUCCESS (9.96s)   Zero errors. Zero new warnings.

dist/index.html                   1.06 kB  │ gzip:   0.56 kB
dist/assets/index-*.css          24.73 kB  │ gzip:   5.36 kB
dist/assets/HeroCanvas-*.js       3.06 kB  │ gzip:   1.17 kB
dist/assets/index-*.js          288.63 kB  │ gzip:  91.22 kB
dist/assets/three-*.js          805.86 kB  │ gzip: 217.91 kB  ← code-split
```

Three.js is code-split into its own chunk and lazy-loaded with the 3D canvas.
The chunk-size warning is expected and irreducible for Three.js.

---

## How to Run Locally

```bash
cd C:\Users\27718\Desktop\SALA_LANDING_PAGE
npm install        # first time only
npm run dev        # → http://localhost:5173
npm run build      # → dist/
npm run preview    # preview dist/ locally
```

---

## Changes Made — Second Pass

### Repositioning

SALA is now positioned as a **South African Litigation Intelligence Platform**, not a generic legal search tool. The page narrative follows: Upload Matter → Extract Issues → Find Authorities → Extract Reasoning → Verify Sources → Generate Preparation Material.

---

### index.css
- `section-padding` increased: 6rem → **8rem** (top and bottom). More breathing room throughout.
- New `.section-rule` utility: thin horizontal gold gradient separator used between sections.
- New `.section-label` utility: standardised uppercase section kicker (replaces scattered inline spans).
- `glass-card` border: reduced to `0.12` opacity for more subtle premium feel.
- Background base updated: `#0a0a0e` → `#050507` (deeper near-black).

---

### Hero.jsx
- Brand mark line added: `SALA · South African Legal Intelligence` above headline.
- New display headline (3 lines, Playfair Display, large):
  - Line 1: **"Litigation Intelligence"** — gold-text gradient
  - Line 2: **"for South African"** — white
  - Line 3: **"Legal Practice"** — white
- New subheadline: *"Find the best authorities. Extract the exact reasoning. Verify before you rely."*
- New body copy: *"SALA helps legal practitioners move from legal issue to authority, reasoning, verification and preparation output — without losing sight of the original source."*
- Secondary CTA button changed: **"See SALA In Action"** → links to `#in-action`
- Increased heading size: ~55–58px on desktop (up from ~52px).

---

### InAction.jsx — Complete rewrite
**Removed:** All fake mock-UI cards (CSS-simulated UI panels).
**Replaced with:** 3 premium alternating screenshot placeholder panels.

Layout: alternating text-left/screenshot-right and screenshot-left/text-right — Stripe/Linear-style product presentation.

Each panel has:
- A large `aspect-[16/10]` placeholder panel with:
  - Gold corner accents
  - Inner gradient
  - Image placeholder icon + label + file path instruction
- Step number (01/02/03) + horizontal rule
- Panel title (h3)
- Quoted caption in italic gold serif
- Descriptive body text

**Three panels:**

| # | Title | Screenshot file |
|---|---|---|
| 01 | Authority Search | `public/screenshots/authority-search.png` |
| 02 | Supporting Reasoning | `public/screenshots/supporting-reasoning.png` |
| 03 | SALA Verify | `public/screenshots/sala-verify.png` |

Each panel has a detailed inline TODO comment describing:
- What the screenshot should show
- The file path
- The recommended image size
- The exact `<img>` tag to use as replacement

---

### Differentiator.jsx — Full rewrite
**Was:** Glassmorphism cards with numbered bullets.
**Now:** Architectural 2×2 grid — Palantir/Linear style.

- Section heading moved to 2-column layout: heading left, intro text right.
- Cards use a `gap-px bg-gold-700/10` grid trick to create a hairline divider grid — no card borders, no fill backgrounds.
- Each card: `01` mono number + gold horizontal rule + title + 2-line description.
- CTA link at bottom.

---

### Workflow.jsx — Content update + desktop layout
**New step labels:**
1. Upload Matter
2. Extract Legal Issues
3. Find Relevant Authorities
4. Extract Supporting Reasoning
5. Verify Sources
6. Generate Preparation Output

**Desktop layout improved:**
- Changed from 6-column icon row to 2-column card grid with connecting vertical lines between adjacent steps.
- Hover state: subtle gold background wash on each step.

---

### TrustBuilt.jsx — Full rewrite
**Was:** Icon-card grid.
**Now:** Horizontal rule list — each item is a full-width row with number / title / body across three columns. Extremely minimal and authoritative.

**New titles (5 items):**
1. South African Judgments
2. Bail & Criminal Focus
3. Authority Verification
4. Source Transparency
5. Matter Preparation Workflows

**Section heading:** now uses 2-column layout: heading left, intro text right (matches Differentiator pattern).

---

### Nav.jsx
Links updated to match redesigned sections:
- Removed: 'Features', 'For Whom'
- Added: 'In Action' → `#in-action`, 'Why SALA' → `#differentiator`
- Kept: 'Workflow', 'Demo'

---

### App.jsx — Section order updated
```
Hero → TrustNotice → InAction → Differentiator → Workflow → Features → WhoFor → TrustBuilt → PilotForm
```
InAction now appears immediately after TrustNotice — product proof as close to the hero as possible.

---

### Features.jsx and WhoFor.jsx
- Section heading sizes increased to `text-4xl sm:text-5xl` (up from `text-3xl sm:text-4xl`).
- Section label updated to use `.section-label` utility class.
- Background colours updated to `#050507` / `#0a0a0e` alternating.

### TrustNotice.jsx, PilotForm.jsx, HeroCanvas.jsx
- TrustNotice and PilotForm background updated to `#050507`.
- HeroCanvas: no changes (already refined in previous sprint).

---

## Files Modified

| File | Change |
|---|---|
| `src/index.css` | Increased section-padding, new utilities |
| `src/App.jsx` | Section order updated |
| `src/components/Hero.jsx` | New headline, copy, secondary button |
| `src/components/InAction.jsx` | Full rewrite — 3 screenshot placeholder panels |
| `src/components/Differentiator.jsx` | Full rewrite — 4-card architectural grid |
| `src/components/Workflow.jsx` | New step content + desktop layout |
| `src/components/TrustBuilt.jsx` | Full rewrite — horizontal rule list, 5 new items |
| `src/components/Nav.jsx` | Updated navigation links |
| `src/components/Features.jsx` | Heading size + background colour |
| `src/components/WhoFor.jsx` | Heading size + background colour |
| `src/components/TrustNotice.jsx` | Background colour |
| `src/components/PilotForm.jsx` | Background colour |

---

## Screenshot Placeholder Locations

Placeholders are in `src/components/InAction.jsx`. Each has a detailed TODO comment.

| Panel | File to create | Shows |
|---|---|---|
| Authority Search | `public/screenshots/authority-search.png` | Search results with authority cards, relevance ranking, legal signals, outcome badges, SALA Verify indicators |
| Supporting Reasoning | `public/screenshots/supporting-reasoning.png` | Highlighted reasoning passages, source attribution, relevance indicators |
| SALA Verify | `public/screenshots/sala-verify.png` | Authority verification panel, source checks, Open Original Judgment button |

**Recommended size:** 1440×900px or 1200×750px — PNG or WebP.

**To replace a placeholder**, find the relevant `<ScreenshotPlaceholder>` component in `InAction.jsx`
and replace it with:
```jsx
<img
  src="/screenshots/authority-search.png"
  alt="SALA — Authority Search"
  className="w-full h-auto rounded-xl border border-gold-700/20 shadow-2xl shadow-black/60"
/>
```

---

## Known Limitations

- **Screenshots** — placeholder panels only. 3 real screenshots ready to insert.
- **Demo form** — frontend only. No backend. Integrate Formspree when ready.
- **Google Fonts** — CDN-loaded. Requires internet access.
- **Three.js chunk** — 806KB minified / 218KB gzip. Normal and already code-split.
- **SEO** — Basic meta only. Add Open Graph + Twitter Card tags before public launch.
