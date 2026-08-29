# Happy Paws · Bakery & Cat Café

A polished single-page marketing site for a fictional bakery & rescue-cat café in
Portland — hand-finished pastries, small-batch coffee, and 22 adoptable cats.

![Stack](https://img.shields.io/badge/React_19-Vite_8-c47c72?style=flat-square)
![Styling](https://img.shields.io/badge/Tailwind_4-custom_design_system-2c1f1a?style=flat-square)

## Highlights

- **Custom design system** — warm cream / terracotta-rose / cocoa palette,
  Fraunces display serif + Inter UI sans, hand-drawn 24px stroke icon set
  (no emoji, no stock icon libraries).
- **Editorial photography** — a cohesive AI-generated image set (hero, story,
  six menu items) that all share one light and one palette.
- **Interactive menu** — category filtering, favourites with
  `localStorage` persistence, and quick-view product modals (Esc to close).
- **Living details** — scroll-reveal animations via `IntersectionObserver`,
  a scrolling marquee, sticky blurred navbar, and a live
  "Open now · closes 20:00" status computed from the real clock.
- **Responsive & accessible** — mobile menu, semantic landmarks, `aria`
  labels/pressed states, keyboard support, `prefers-reduced-motion` support.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # eslint
```

## Project structure

```
src/
  App.jsx     # page sections & state (header, hero, menu, reviews, …)
  App.css     # component styles on top of the design tokens
  index.css   # design tokens + base styles
  data.js     # menu, testimonials, opening hours, helpers
  icons.jsx   # inline SVG icon set
  assets/     # hero, story and menu photography
public/
  favicon.svg # paw mark
```

All imagery is AI-generated for this project.
