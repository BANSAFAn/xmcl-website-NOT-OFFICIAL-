<p align="center">
  <img src="public/PhotoXMCL/logo.png" alt="X Minecraft Launcher" width="160" />
</p>

# X Minecraft Launcher Web

[![Vite](https://img.shields.io/badge/Vite-%5E7.1.5-646cff?logo=vite)](https://vitejs.dev/) [![React](https://img.shields.io/badge/React-%5E19.1.1-61dafb?logo=react)](https://reactjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-%5E5.9.2-3178c6?logo=typescript)](https://www.typescriptlang.org/) [![Tailwind](https://img.shields.io/badge/Tailwind-%5E4.1.13-38b2ac?logo=tailwindcss)](https://tailwindcss.com/) [![License](https://img.shields.io/badge/License-check%20LICENSE-lightgrey)]()

A modern, animated, and accessible React + TypeScript frontend for the "X Minecraft Launcher". This repository contains the website used to present the launcher, provide downloads, changelogs, guides, and blog content.

## Quick overview

- 🎯 Purpose: Landing site and distribution UI for the X Minecraft Launcher (downloads, guides, changelogs, blog).
- 🧩 Stack: `React` + `TypeScript`, `Vite`, `Tailwind CSS`, `Radix UI`, `framer-motion`/`gsap` for animations.
- 📂 Structure: component-driven, with pages, feature components, UI primitives, static data, and translations.

## Project structure (high level)

- `src/`
  - `pages/` — page containers and routes (About, Blog, Changelogs, etc.)
  - `components/` — grouped reusable components (UI primitives in `ui/`, feature sections like `hero/`, `download/`, `blog/`)
  - `data/` — static content (e.g. `blogPosts.ts`)
  - `translations/` — i18n JSON files
  - `utils/` — helpers and fetchers
  - `types/` — shared TS types
  - `App.tsx`, `App.css` — app root and global styles

## Notable features

- Accessible primitives built with Radix UI
- Animated hero and download sections using `framer-motion` and `gsap`
- Client routing with `react-router-dom`
- Reactive data fetching with `@tanstack/react-query`
- Markdown rendering and code blocks for guides and blog posts

## i18n / Translations

This repo includes an i18n guide. See `i18n.md` in the repository root (same folder as this `README.md`) for instructions on adding translations and supported locales. Translation JSON files are located under `src/translations/`.

## How to run

Prereqs: Node.js (recommended v18+) and npm or yarn.

1. Install dependencies
   - `npm install`
2. Run development server
   - `npm run dev`
3. Build production
   - `npm run build`
4. Preview production build
   - `npm run preview`
5. Lint
   - `npm run lint`

## Where to start reading

- `src/pages/` — top-level routes and entry pages
- `src/components/ui/` — small reusable primitives
- `src/components/hero/` and `src/components/download/` — good examples of animations and layout
- `package.json` — scripts and dependency list

## Contributing

- Create a branch, open a PR, and run the dev server + lint before submitting.

## Notes

- The logo file `logo.png` is expected to be in the `public/` folder and is used at the top of this README.
- Check for a `LICENSE` file in the repository root to confirm usage terms.

---
i18n - https://github.com/BANSAFAn/xmcl-website-NOT-OFFICIAL-/blob/main/i18n.md
