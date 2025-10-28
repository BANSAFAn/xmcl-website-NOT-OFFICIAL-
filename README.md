# X Minecraft Launcher — Website (Unofficial)

![X Minecraft Launcher Logo](public/PhotoXMCL/logo.png)

[![Vite](https://img.shields.io/badge/Vite-5.4.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.13-38b2ac?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

✨ Live • Animated • Accessible — an unofficial, community-built frontend for the X Minecraft Launcher with a design-forward, developer-friendly approach.

---

🎯 Quick summary
- Purpose: present downloads, release notes, and user guides in a polished, accessible UI.
- Not official: this repo is a community effort. Verify critical downloads with official channels.
- Content storage (important): the site uses markdown content stored under `public/` — see "Content locations" below.

---

Platform download badges
------------------------
Click to jump to the downloads section in the site (or to the relevant UI component in-app):

- ![Windows](https://img.shields.io/badge/Windows-EXE-blue?logo=windows&logoColor=white) Windows (x64)
- ![macOS](https://img.shields.io/badge/macOS-DMG-black?logo=apple&logoColor=white) macOS (DMG / Homebrew)
- ![Linux](https://img.shields.io/badge/Linux-AppImage-2b9348?logo=linux&logoColor=white) Linux (AppImage / DEB / RPM / AUR / Flathub)

(These badges are decorative and point to the downloads UI in the app/site.)

Available packages & architectures (added)
------------------------------------------
This project exposes information about available installer/package types and CPU architectures. Additions below clarify which package formats and architectures are provided by builds referenced on the site.

- Windows
  - Package types: `EXE` (traditional installer) and `Appx`/`MSIX` (store-style package).
  - Architectures: x64 builds are provided for both `EXE` and `Appx`/`MSIX`.
  - Notes: if you distribute an `Appx`/`MSIX` package, treat it as a store-style installer (signed) and document installation steps for end users.

- Linux
  - Package types: `AppImage`, `DEB`, `RPM`, `AUR` helper packages, and Flatpak/Flathub where applicable.
  - Architectures: x64 (amd64 / x86_64) builds are the primary target; 32‑bit (i386 / x86) builds are also available where maintained.
  - Notes: availability of 32‑bit builds depends on the upstream build pipeline and distro packaging — users of older 32‑bit distributions should check the downloads page for the specific artifact.

- macOS
  - Package types: `DMG` and `.app` bundles; Homebrew formula support may be provided for macOS builds distributed via Homebrew.
  - Architectures: x64 builds are provided; 32‑bit builds are available for platforms where they are still supported (older macOS releases).
  - Notes: modern macOS releases dropped 32‑bit support — include a compatibility note on the downloads page indicating which macOS versions support 32‑bit packages.

Security & verification
-----------------------
- Always verify checksums and signatures if provided on the downloads page.
- This repository is unofficial — critical installers should be validated against the official upstream channels before trusting.

Where repository content lives (clarified)
------------------------------------------
- Announcements & release notes (blog posts): `public/blog/`
  - Examples: `public/blog/NewWeb.md`, `public/blog/Beta1.4V.md`
- Guides & user documentation: `public/guide/`
  - Examples: `public/guide/demo-minecraft.md`, `public/guide/instance.md`, `public/guide/i18n-en.md`
- Images and static assets: `public/PhotoXMCL/`, `public/blog/blogphoto/`, `public/guide/guidephoto/`

Important: content is authored as markdown in `public/` so the site can serve and render it directly. If you looked earlier in `src/data/` for posts/guides, prefer `public/` for canonical site content.

---

Design & UX highlights
----------------------
- Motion-first but subtle: Framer Motion + GSAP used to guide attention without being distracting.
- Accessibility-first: Radix UI primitives, semantic HTML and keyboard navigation patterns.
- Content-driven: add or update pages by creating markdown files in `public/blog/` or `public/guide/`.
- Fast iteration: Vite + TypeScript for rapid development and type safety.

---

Changelog (concise, with icons)
-------------------------------
Below is a short table with the most notable recent items. For full details open the linked markdown post under `public/blog/`.

| Version / Tag | Date (see post) | Highlights | Link |
|---:|:---:|:---|:---|
| 🚀 New Web Launch | see post | Redesigned homepage, improved download UX, new Blog & Guides UI, tags & filters for posts | [New Web overview](public/blog/NewWeb.md) |
| 🧪 Beta 1.4 | see post | XMAIHelp page, improved i18n & auto-detect, download package info modal, search fixes for blog & guides | [Beta1.4 release notes](public/blog/Beta1.4V.md) |

Notes:
- "Date (see post)" — each blog markdown has its own frontmatter or header with a date. Open the file to see the precise timestamp.
- Add new changelog entries by dropping a properly front-mattered markdown file into `public/blog/`.

---

Decorative separators & visual grouping (repo / UI suggestions)
---------------------------------------------------------------
Use consistent visual separators in UI and docs to improve scanability:

- Section separators: use soft divider lines and an emoji title, e.g. "— — —" with a small icon heading.
- Group cards: rounded cards with subtle elevation and a 1px inner divider between metadata and actions.
- Icons: Lucide icon set is recommended (used across the project for a modern, cohesive look).

---

How to add a blog post or guide (quick)
---------------------------------------
1. Create a new markdown file:
   - For announcements / releases: add `public/blog/your-post.md`
   - For guides: add `public/guide/your-guide.md`
2. Add a short frontmatter header (title/date/summary/tags) at the top of the file.
3. Write the content in Markdown. Use images from `public/` (path-relative).
4. Commit & open a PR.

Example frontmatter (in-file, top lines — use YAML style):
title: "Short, friendly title"
date: "2025-03-01"
summary: "One-line summary for the changelog table"
tags: ["release","ui"]

(Keep frontmatter consistent across posts so the site can render summaries and the changelog table.)

---

Suggested changelog table generation (dev note)
-----------------------------------------------
If you want an aggregated `CHANGELOG.md`, it can be generated by scanning `public/blog/` and extracting frontmatter (title/date/summary). A small script (Node/Bun) can convert these into a tidy markdown table — I can draft that script if you want.

---

Contributing & PR tips
----------------------
- For content: add or edit markdown under `public/blog/` or `public/guide/` and add images under `public/`.
- For UI changes: include screenshots or short GIFs in PR description.
- Keep PRs focused and include accessibility checks: keyboard navigation and screen-reader basics for changed components.
- Open an issue first for large features or design changes.

---

License & important note
------------------------
This project is licensed under MIT. See `LICENSE` for details.

Important: This repository is unofficial and community-maintained — it is not an official product of the X Minecraft Launcher team. Always validate critical installers and releases from official upstream sources.

---

Resources & quick links
-----------------------
- Logo / images: `public/PhotoXMCL/`
- Blog posts (examples): `public/blog/NewWeb.md`, `public/blog/Beta1.4V.md`
- Guides: `public/guide/`
- i18n guide: `i18n.md`

---

Want help with:
- Generating a pretty `CHANGELOG.md` from `public/blog/`? (I can draft a script)
- Creating platform-specific visual badges/SVG icons for the downloads page?
- Adding a `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md` boilerplate?

Tell me which and I’ll prepare the next file(s).