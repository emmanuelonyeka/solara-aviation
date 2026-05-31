# Solara Jets — Homepage (HTML / CSS / JavaScript)

This is a faithful, framework-free replica of the Kimi-built React homepage.
It reproduces the exact scroll behavior: pinned sections with 3-phase
(entrance → settle → exit) scrub animations, Lenis smooth scroll, the
snap-to-pinned-center system, the auto-play hero, and all section layouts.

## How to run
Because browsers restrict some features on file:// URLs, serve it with any
static server from this folder:

    python3 -m http.server 8000      # then open http://localhost:8000

or use any host (Netlify, Vercel, GitHub Pages, your own server) — just
upload the whole folder.

## Structure
- index.html        the homepage markup (all 9 sections)
- css/styles.css     all styling (plain CSS, no Tailwind)
- js/main.js         all GSAP/ScrollTrigger/Lenis animations + snap + navbar
- js/lib/            GSAP, ScrollTrigger, Lenis (bundled locally so it works offline)
- images/            the 10 homepage images

## Notes
- Nav links point to fleet.html, membership.html, etc. Those inner pages are
  the next deliverable (converted from the v3 build).
- The libraries are bundled locally in js/lib/ rather than loaded from a CDN,
  so the site works even without internet access.
