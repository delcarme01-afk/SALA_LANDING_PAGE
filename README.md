# SALA Landing Page

Premium black-and-gold marketing landing page for **SALA — South African Legal Intelligence**.

---

## Prerequisites

- [Node.js 18+](https://nodejs.org/) (LTS recommended)
- npm (bundled with Node.js)

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build locally:

```bash
npm run preview
```

---

## Stack

| Layer | Tool |
|---|---|
| Bundler | Vite 5 |
| UI framework | React 18 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| 3D scene | React Three Fiber + Three.js |

---

## Project Structure

```
SALA_LANDING_PAGE/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Nav.jsx            # Sticky navbar, mobile hamburger
        ├── Hero.jsx           # Hero section with 3D canvas
        ├── HeroCanvas.jsx     # React Three Fiber 3D scene
        ├── TrustNotice.jsx    # Pilot notice / disclaimer strip
        ├── Features.jsx       # What SALA Does — feature cards
        ├── Workflow.jsx       # 6-step workflow visualisation
        ├── WhoFor.jsx         # Who SALA Is For — user cards
        ├── Differentiator.jsx # Not just search. Litigation intelligence.
        ├── PilotForm.jsx      # Request Demo form (frontend only)
        └── Footer.jsx         # Footer with disclaimer
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

Drag-and-drop the `dist/` folder into [netlify.com/drop](https://netlify.com/drop), or connect the repo.

### GitHub Pages

```bash
npm run build
# copy dist/ contents to gh-pages branch
```

Set `base` in `vite.config.js` to your repo path if deploying to a subdirectory:
```js
base: '/sala-landing-page/'
```

---

## Notes

- The form on the Demo section is **frontend-only**. No data is submitted anywhere.
  To wire up submission, integrate a service such as Formspree, EmailJS, or a backend endpoint.
- The 3D scene degrades gracefully: if WebGL is unavailable, the canvas is silently omitted.
- Fonts are loaded from Google Fonts. For a fully offline build, download and self-host.
