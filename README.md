# LAVÈRE — Above the Ordinary.

A concept website for **LAVÈRE**, a fictional premium rooftop bar & restaurant in Makati, Metro Manila. Built as a frontend portfolio piece with a luxury-editorial art direction: cinematic photography, oversized serif typography, asymmetric layouts and restrained motion.

> LAVÈRE is not a real business. The address, phone number, email, menu and prices are placeholders, and the reservation form is a mock that never sends data.

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Motion for React](https://motion.dev) for scroll-linked parallax, mask reveals and section transitions
- Self-hosted variable fonts via Fontsource — *Cormorant Garamond* (display serif) and *Manrope* (sans)
- Plain CSS with design tokens (`src/styles/tokens.css`) — no UI framework

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Deployment

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the site and publishes `dist/` to GitHub Pages at **https://joaquinluisdavid.github.io/lavere/**. Production builds use the `/lavere/` base path (see `vite.config.ts`); the dev server still runs at `/`.

One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.

## Structure

```
src/
  components/         Page sections (Nav, Hero, Story, Experience, Menu, Gallery, Reservations, Visit, Footer)
    ui/               Shared primitives: Picture, ParallaxImage, LineReveal, Reveal, Arrow + button styles
  data/
    content.ts        All copy, menu, gallery and (fictional) venue details
    imageManifest.ts  Generated image metadata (dimensions, widths, placeholder colour)
  hooks/              useActiveSection (scroll-spy), useModalDialog (native <dialog> driver)
  lib/                Motion easing, smooth section scrolling, reservation validation + mock submit
  styles/             Design tokens and base styles
public/images/        Optimised responsive WebP photography (640 / 1080 / 1600 / 2400w)
```

## Highlights

- **Hero** — full-viewport image with a slow settle-in zoom, scroll parallax and a masked line-by-line headline, preceded by a brief brand curtain (once per session).
- **The Experience** — a pinned image stage that wipes between three "acts" as you scroll; stacks into inline imagery on smaller screens.
- **Signature Menu** — editorial list with a hover-driven feature image, plus a full à la carte drawer.
- **Gallery** — asymmetric editorial grid with differential parallax and a keyboard-navigable lightbox (← → Esc).
- **Reservations** — validated form (PH phone formats, booking window, same-day notice, character limit) with inline errors, focus management, live-region announcements and a mock confirmation.
- **Accessibility** — semantic landmarks, skip link, native modal dialogs (focus trap, Esc, focus restore), visible focus states, and `prefers-reduced-motion` support throughout.

## Design tokens

| Token      | Hex       |
| ---------- | --------- |
| Obsidian   | `#141311` |
| Warm Ivory | `#F2EDE3` |
| Champagne  | `#C5A675` |
| Bronze     | `#80684B` |
| Charcoal   | `#24211D` |

## Photography

All photographs are from [Unsplash](https://unsplash.com) under the Unsplash License, downloaded and re-encoded locally. Original photo IDs are recorded per image in `src/data/imageManifest.ts`.
