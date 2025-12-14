# Unofficial XMCL Website

![X Minecraft Launcher Logo](public/PhotoXMCL/logo.png)

[![Vite](https://img.shields.io/badge/Vite-5.4.1-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.13-38b2ac?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

**A community-built, polished, and accessible frontend for the X Minecraft Launcher.**

> **Unofficial Project Disclaimer**
> This website is an **unofficial** community project and is **not affiliated with, endorsed by, or connected to the official X Minecraft Launcher** team.
> verify all critical downloads against official sources.

---

## 📖 About

This project aims to provide a modern, accessible, and animated website for the X Minecraft Launcher community. It serves as a hub for downloads, release notes, and user guides, all presented in a design-forward interface.

### ✨ Key Features
- **Live & Animated**: Uses Framer Motion and GSAP for a dynamic user experience.
- **Accessible Design**: Built with Radix UI primitives for keyboard navigation and screen reader support.
- **Content-Driven**: All blog posts and guides are managed via simple Markdown files.
- **Modern Stack**: Powered by Vite and Astro for high performance.

---

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) & [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v18+) or **Bun**

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/BANSAFAn/xmcl-website-NOT-OFFICIAL-.git
cd xmcl-website-NOT-OFFICIAL-
npm install
# or if using bun
bun install
```

### Development

Start the local development server:

```bash
npm run dev
# or
bun run dev
```

Open your browser and navigate to `http://localhost:8080` (or the port shown in your terminal).

### Building for Production

To build the static site:

```bash
npm run build
```

---

## 📂 Project Structure

Content on the site is primarily driven by Markdown files located in the `public` directory.

- **`public/blog/`**: Contains release notes and announcements (e.g., `NewWeb.md`).
- **`public/guide/`**: Contains user guides and documentation.
- **`src/`**: Source code for the application components and layouts.

---

## 🤝 Contributing

Contributions are welcome!

### Adding a Blog Post
1. Create a new `.md` file in `public/blog/`.
2. Add the required frontmatter (title, date, summary, tags).
3. Write your content.

### Adding a Guide
1. Create a new `.md` file in `public/guide/`.
2. Follow the existing format for guides.

For code changes, please ensure you run linting before submitting a PR:
```bash
npm run lint
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

*Note: This repository is a community effort. The official X Minecraft Launcher can be found at its respective official channels.*