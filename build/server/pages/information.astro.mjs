import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BQmXhRda.mjs';
import 'piccolore';
import { A as AppShell, a as useTranslation, $ as $$Layout } from '../chunks/AppShell_BklFfeZH.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Star, Users, Code, Globe, ChevronRight, Github, ExternalLink, Zap, Cpu, Sparkles, Download, HardDrive, Globe2, Server, ShieldCheck, Database, Heart, Shield, Check, Copy } from 'lucide-react';
import { motion } from 'framer-motion';
export { renderers } from '../renderers.mjs';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: handleCopy,
      className: "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors",
      title: "Copy to clipboard",
      children: copied ? /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-green-400" }) : /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4 text-slate-400" })
    }
  );
};
const InformationContent = () => {
  const { t } = useTranslation();
  const { data: contributors = [] } = useQuery({
    queryKey: ["contributors"],
    queryFn: async () => {
      const res = await fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher/contributors?per_page=20");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 10 * 60 * 1e3
  });
  const { data: repoStats } = useQuery({
    queryKey: ["repo-stats"],
    queryFn: async () => {
      const res = await fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 10 * 60 * 1e3
  });
  const wingetCommand = "winget install CI010.XMinecraftLauncher";
  const brewCommand = "brew install --cask --no-quarantine voxelum/xmcl";
  const features = [
    { icon: Download, title: "Download & Auto Complete", desc: "Support download Minecraft, Forge, Fabric, Quilt, OptiFine, JVM from official or third party mirrors.", gradient: "from-blue-500 to-cyan-500" },
    { icon: HardDrive, title: "Manage All Resources", desc: "Use (hard/symbolic) links to install resources in instances, keep your disk usage optimal. No copies of mods everywhere!", gradient: "from-green-500 to-emerald-500" },
    { icon: Globe2, title: "Cross Platform", desc: "The launcher is based on Electron, and supports Windows 10/11, MacOS, and Linux.", gradient: "from-purple-500 to-pink-500" },
    { icon: Users, title: "Multi-Account System", desc: "Built-in Microsoft login and Mojang Yggdrasil API. It also has builtin support of ely.by and littleskin.cn.", gradient: "from-amber-500 to-orange-500" },
    { icon: Server, title: "Peer to Peer Connection", desc: "You can play multiplayer over LAN even you are not in same physical LAN!", gradient: "from-red-500 to-rose-500" },
    { icon: ShieldCheck, title: "Code Sign & Modern Packaging", desc: "Under Windows, you can use appx and appinstaller to install the app without SmartScreen errors!", gradient: "from-indigo-500 to-violet-500" },
    { icon: Database, title: "Instance Management", desc: "Create unlimited game instances with different mod configurations and game versions.", gradient: "from-pink-500 to-fuchsia-500" },
    { icon: Heart, title: "Community Driven", desc: "Open source project with active community contributions and support.", gradient: "from-rose-500 to-pink-500" }
  ];
  const sponsors = [
    { name: "SignPath", logo: "https://avatars.githubusercontent.com/u/34448643", url: "https://signpath.io/", desc: "Free code signing on Windows" },
    { name: "Deno Deploy", logo: "https://avatars.githubusercontent.com/u/42048915", url: "https://deno.com/deploy", desc: "Serverless JavaScript Hosting" },
    { name: "Tencent EdgeOne", logo: "https://edgeone.ai/logo.png", url: "https://edgeone.ai/", desc: "CDN Acceleration & Security Protection" }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "X Minecraft Launcher",
        "alternateName": "XMCL",
        "description": "A modern, open-source Minecraft launcher with resource management and multiplayer features",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Windows, macOS, Linux",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Person", "name": "CI010", "url": "https://github.com/ci010" },
        "downloadUrl": "https://xmcl.app",
        "softwareVersion": "latest"
      })
    } }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-background dark:bg-gradient-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-300 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none opacity-30 dark:opacity-100", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-3xl" }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12 max-w-7xl relative z-10", children: [
        /* @__PURE__ */ jsxs(
          motion.header,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
            className: "text-center mb-20",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative inline-block mb-8", children: [
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-3xl opacity-50 scale-150" }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "https://github.com/Voxelum/x-minecraft-launcher/raw/master/xmcl-electron-app/icons/dark@256x256.png",
                    alt: "XMCL Logo",
                    className: "w-40 h-40 rounded-3xl shadow-2xl relative z-10 border-4 border-white/20"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent", children: "X Minecraft Launcher" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl md:text-2xl text-muted-foreground dark:text-slate-300 mb-8 max-w-3xl mx-auto", children: [
                t("information.launcher_created_by"),
                " ",
                /* @__PURE__ */ jsx("a", { href: "https://github.com/ci010", target: "_blank", rel: "noopener noreferrer", className: "text-indigo-400 hover:text-indigo-300 font-semibold underline decoration-wavy", children: "CI010" })
              ] }),
              repoStats && /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.3 },
                  className: "flex flex-wrap justify-center gap-6 mb-10",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(Star, { className: "w-6 h-6 text-yellow-400" }),
                        /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold text-foreground dark:text-white", children: [
                          (repoStats.stargazers_count / 1e3).toFixed(1),
                          "K"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground dark:text-slate-400 mt-1", children: "GitHub Stars" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(Users, { className: "w-6 h-6 text-indigo-400" }),
                        /* @__PURE__ */ jsxs("span", { className: "text-3xl font-bold text-foreground dark:text-white", children: [
                          contributors.length,
                          "+"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground dark:text-slate-400 mt-1", children: "Contributors" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                        /* @__PURE__ */ jsx(Code, { className: "w-6 h-6 text-green-400" }),
                        /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold text-foreground dark:text-white", children: repoStats.forks_count })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground dark:text-slate-400 mt-1", children: "Forks" })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "https://xmcl.app",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg hover:from-indigo-500 hover:to-purple-500 transition-all shadow-2xl shadow-indigo-500/25 hover:scale-105",
                    children: [
                      /* @__PURE__ */ jsx(Globe, { className: "w-6 h-6" }),
                      /* @__PURE__ */ jsx("span", { children: t("footer.downloadXMCL") }),
                      /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: "https://github.com/Voxelum/x-minecraft-launcher",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-xl text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20",
                    children: [
                      /* @__PURE__ */ jsx(Github, { className: "w-6 h-6" }),
                      /* @__PURE__ */ jsx("span", { children: "GitHub" }),
                      /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5" })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "mb-20",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold mb-8 flex items-center gap-3 text-foreground dark:text-white", children: [
                /* @__PURE__ */ jsx(Zap, { className: "w-8 h-8 text-yellow-400" }),
                /* @__PURE__ */ jsx("span", { children: t("downloadSection.title") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-all", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500", children: /* @__PURE__ */ jsx(Code, { className: "w-6 h-6 text-white" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground dark:text-white text-xl", children: "Winget" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground dark:text-slate-400", children: t("information.install.winget_desc") })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "bg-slate-900/70 p-4 rounded-xl font-mono text-sm text-green-400 border border-slate-700/50 pr-14 overflow-x-auto", children: /* @__PURE__ */ jsx("code", { children: wingetCommand }) }),
                    /* @__PURE__ */ jsx(CopyButton, { text: wingetCommand })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-all", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
                    /* @__PURE__ */ jsx("div", { className: "p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500", children: /* @__PURE__ */ jsx(Cpu, { className: "w-6 h-6 text-white" }) }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground dark:text-white text-xl", children: "Homebrew" }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground dark:text-slate-400", children: t("information.install.brew_desc") })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsx("div", { className: "bg-slate-900/70 p-4 rounded-xl font-mono text-sm text-green-400 border border-slate-700/50 pr-14 overflow-x-auto", children: /* @__PURE__ */ jsx("code", { children: brewCommand }) }),
                    /* @__PURE__ */ jsx(CopyButton, { text: brewCommand })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "mb-20",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold mb-8 flex items-center gap-3 text-foreground dark:text-white", children: [
                /* @__PURE__ */ jsx(Sparkles, { className: "w-8 h-8 text-purple-400" }),
                /* @__PURE__ */ jsx("span", { children: t("information.features.title") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: features.map((feature, index) => /* @__PURE__ */ jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: index * 0.05 },
                  className: "group p-6 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]",
                  children: [
                    /* @__PURE__ */ jsx("div", { className: `w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`, children: /* @__PURE__ */ jsx(feature.icon, { className: "w-full h-full text-white" }) }),
                    /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground dark:text-white mb-2 text-lg", children: feature.title }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground dark:text-slate-400", children: feature.desc })
                  ]
                },
                index
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "mb-20",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold mb-8 flex items-center gap-3 text-foreground dark:text-white", children: [
                /* @__PURE__ */ jsx(Users, { className: "w-8 h-8 text-indigo-400" }),
                /* @__PURE__ */ jsx("span", { children: t("information.contributors.title") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4", children: contributors.map((contributor) => /* @__PURE__ */ jsxs(
                "a",
                {
                  href: contributor.html_url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "group relative",
                  title: `${contributor.login} - ${contributor.contributions} contributions`,
                  children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: contributor.avatar_url,
                        alt: contributor.login,
                        className: "w-full aspect-square rounded-2xl border-2 border-white/10 group-hover:border-indigo-500 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-500/20"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-white font-medium truncate px-1", children: contributor.login }) })
                  ]
                },
                contributor.login
              )) })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.6 },
            className: "mb-20",
            children: [
              /* @__PURE__ */ jsxs("h2", { className: "text-3xl font-bold mb-8 flex items-center gap-3 text-foreground dark:text-white", children: [
                /* @__PURE__ */ jsx(Shield, { className: "w-8 h-8 text-green-400" }),
                /* @__PURE__ */ jsx("span", { children: t("information.sponsors.title") })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: sponsors.map((sponsor, index) => /* @__PURE__ */ jsxs(
                "a",
                {
                  href: sponsor.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex items-center gap-4 p-6 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-all group",
                  children: [
                    /* @__PURE__ */ jsx("img", { src: sponsor.logo, alt: sponsor.name, className: "w-16 h-16 rounded-xl group-hover:scale-110 transition-transform" }),
                    /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("h3", { className: "font-bold text-foreground dark:text-white text-xl", children: sponsor.name }),
                      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground dark:text-slate-400", children: sponsor.desc })
                    ] }),
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5 text-slate-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" })
                  ]
                },
                index
              )) })
            ]
          }
        )
      ] })
    ] })
  ] });
};
function Information() {
  return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(InformationContent, {}) });
}

const $$Information = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Information - X Minecraft Launcher", "description": "Discover features, sponsors, and contributors of X Minecraft Launcher. Learn more about the modern, open-source Minecraft launcher." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Information", Information, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/react-pages/Information", "client:component-export": "default" })} ` })}`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/information.astro", void 0);

const $$file = "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/information.astro";
const $$url = "/information";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Information,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
