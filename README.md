# SUBHRA GAMING — Portfolio Redesign

A gamer-first portfolio direction for Subhra Gaming, built as a **Vite + React** single-page app.

## Brand Positioning

**SUBHRA GAMING**
**Gamer • Streamer • Content Creator**

Design, editing and animation are supporting capabilities used to make the gaming content stronger. They are not the primary professional identity.

## Hero Direction

The hero is inspired by the supplied reference layout:

- Your face/portrait is the central visual anchor.
- Large `SUBHRA` typography sits behind the portrait.
- Short gamer-first introduction.
- Current game / content status modules.
- YouTube, Instagram and community links.
- `WATCH CONTENT` and `COLLABORATE` CTAs.
- Dark, premium gaming aesthetic.
- Subtle parallax and entrance animation.

## Project Structure

```
├── package.json
├── vite.config.js
├── index.html              # Vite entry point
├── src/
│   ├── App.jsx             # Page composition
│   ├── main.jsx            # React entry (mounts App, loads global.css)
│   ├── components/         # Navbar, Hero, Games, Content, Stats, Collaborate, Footer
│   ├── hooks/useReveal.js  # IntersectionObserver scroll-reveal hook
│   ├── data/content.js     # Games, content cards, stats, collab tags, socials
│   └── styles/global.css   # Full visual styling
├── public/
│   ├── images/             # portrait-placeholder.svg, hero reference
│   └── videos/             # motion assets (add later)
└── docs/                   # Brand and design documentation
```

## Setup

```bash
npm install
cp .env.example .env   # then paste your YouTube Data API v3 key + channel ID
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Live YouTube integration

Stats and latest videos are fetched from the YouTube Data API v3 using `VITE_YT_API_KEY` / `VITE_YT_CHANNEL_ID` in `.env` (gitignored — never commit it). If the API is unreachable, stats fall back to the hardcoded numbers in `src/data/content.js`.

For production, restrict the API key to the YouTube Data API v3 and to your deployed domain (Google Cloud Console → Credentials).

## Hero portrait (no cutout needed)

The portrait uses a CSS radial mask, so **any normal photo works** — it fades into the dark background with no editing required:

1. Take a normal chest-up photo (good light, plain-ish background helps).
2. Save it as `public/images/portrait.jpg` (or `.webp`/`.png`).
3. Done — the hero auto-detects it and drops the placeholder.

Optional: for a sharper edge later, try remove.bg or iPhone's lift-a-subject, and save as a transparent PNG.

Replace before going live:

- the hero portrait → drop `public/images/portrait.jpg` (see above)
- Instagram/Discord URLs (`src/data/content.js` → `SOCIALS`)
- game list, fallback stats, gear and collab categories (`src/data/content.js`)
- API key scoping for production (see above)

## Important

This package is a **redesign starter/blueprint**, not a direct modification of the original portfolio source code. The original source repository/files were not supplied with the request.
