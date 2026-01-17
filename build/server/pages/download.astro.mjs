import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BQmXhRda.mjs';
import 'piccolore';
import { a as useTranslation, B as Button, A as AppShell, $ as $$Layout } from '../chunks/AppShell_BklFfeZH.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect, useMemo } from 'react';
import { P as PageTransition } from '../chunks/PageTransition_FR7ZFP18.mjs';
import { Download as Download$1, Monitor, Apple, Laptop, ExternalLink, Loader2, AlertCircle, Github } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { B as Badge } from '../chunks/badge_zWW6J42E.mjs';
import { FaLinux } from 'react-icons/fa';
export { renderers } from '../renderers.mjs';

const DownloadHero = ({ latestRelease, detectedOS, onDownload }) => {
  const { t } = useTranslation();
  const getOSIcon = () => {
    switch (detectedOS) {
      case "windows":
        return /* @__PURE__ */ jsx(Laptop, { className: "w-6 h-6 mr-2" });
      case "macos":
        return /* @__PURE__ */ jsx(Apple, { className: "w-6 h-6 mr-2" });
      case "linux":
        return /* @__PURE__ */ jsx(Monitor, { className: "w-6 h-6 mr-2" });
    }
  };
  const getOSName = () => {
    switch (detectedOS) {
      case "windows":
        return "Windows";
      case "macos":
        return "macOS";
      case "linux":
        return "Linux";
    }
  };
  if (!latestRelease) return null;
  return /* @__PURE__ */ jsxs("section", { className: "relative pt-32 pb-20 px-4 overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px]" }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-40 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "container mx-auto relative z-10 text-center", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsxs(Badge, { className: "mb-6 py-2 px-4 bg-slate-800/50 hover:bg-slate-800/50 backdrop-blur border-slate-700/50 text-blue-300", children: [
            t("downloadMessages.version"),
            " ",
            latestRelease.tag_name
          ] }),
          /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-black mb-8 tracking-tight", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent", children: t("downloadMessages.downloadTitle") }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed", children: t("downloadMessages.downloadDescription") }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-6", children: [
            /* @__PURE__ */ jsxs(
              Button,
              {
                size: "lg",
                onClick: onDownload,
                className: "h-16 px-10 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/20 rounded-2xl transition-all duration-300 transform hover:scale-105",
                children: [
                  getOSIcon(),
                  t("downloadMessages.download"),
                  " ",
                  getOSName(),
                  /* @__PURE__ */ jsx(Download$1, { className: "w-5 h-5 ml-3" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "text-sm text-slate-500", children: [
              t("downloadMessages.releasedOn"),
              " ",
              new Date(latestRelease.published_at).toLocaleDateString()
            ] })
          ] })
        ]
      }
    ) })
  ] });
};

const PlatformCards = ({ platformAssets, onDownload }) => {
  const { t } = useTranslation();
  const renderAssetGroup = (title, assets) => {
    if (assets.length === 0) return null;
    return /* @__PURE__ */ jsxs("div", { className: "mb-4 last:mb-0", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1", children: title }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: assets.map((asset) => /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          className: "w-full justify-between bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white group/btn h-auto py-2",
          onClick: () => onDownload(asset.browser_download_url),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start truncate mr-2", children: [
              /* @__PURE__ */ jsx("span", { className: "truncate w-full font-medium", children: asset.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-slate-500", children: [
                (asset.size / 1024 / 1024).toFixed(1),
                " MB"
              ] })
            ] }),
            /* @__PURE__ */ jsx(Download$1, { className: "w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity shrink-0" })
          ]
        },
        asset.id
      )) })
    ] });
  };
  const renderExternalLink = (name, url, description) => /* @__PURE__ */ jsxs(
    Button,
    {
      variant: "ghost",
      className: "w-full justify-between bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white group/btn h-auto py-2",
      onClick: () => window.open(url, "_blank"),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start truncate mr-2", children: [
          /* @__PURE__ */ jsx("span", { className: "truncate w-full font-medium", children: name }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-slate-500", children: description })
        ] }),
        /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 opacity-0 group-hover/btn:opacity-100 transition-opacity shrink-0" })
      ]
    }
  );
  return /* @__PURE__ */ jsx("section", { className: "py-20 px-4", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-center mb-16 text-slate-200", children: t("downloadMessages.otherPlatforms") || "Other Platforms" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          className: "group relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 group-hover:border-blue-500/50 transition-colors duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-blue-400", children: /* @__PURE__ */ jsx(Laptop, { className: "w-7 h-7" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "Windows" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-8 h-6", children: t("downloadMessages.windowsDescription") || "Windows 10/11" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                renderAssetGroup(t("downloadMessages.windowsInstallers") || "x64 / Installers", platformAssets.windows.x64),
                renderAssetGroup(t("downloadMessages.otherOption") || "App Store / Other", platformAssets.windows.app)
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.1 },
          className: "group relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 group-hover:border-slate-500/50 transition-colors duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-slate-500/10 to-gray-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-slate-200", children: /* @__PURE__ */ jsx(Apple, { className: "w-7 h-7" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "macOS" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-8 h-6", children: t("downloadMessages.macosDescription") || "macOS 11.0+" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
                renderAssetGroup(t("downloadMessages.appleSilicon") || "Apple Silicon (M1/M2)", platformAssets.macos.arm64),
                renderAssetGroup(t("downloadMessages.intel") || "Intel (x64)", platformAssets.macos.x64)
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.2 },
          className: "group relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 group-hover:border-orange-500/50 transition-colors duration-300",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300" }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-orange-400", children: /* @__PURE__ */ jsx(FaLinux, { className: "w-8 h-8" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: "Linux" }),
              /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-8 h-6", children: t("downloadMessages.linuxDescription") || "Debian, RPM, AppImage" }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar", children: [
                renderAssetGroup("x64", platformAssets.linux.x64),
                renderAssetGroup("ARM64", platformAssets.linux.arm64),
                /* @__PURE__ */ jsxs("div", { className: "mb-4 last:mb-0", children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ml-1", children: t("downloadMessages.packageManagers") || "Package Managers" }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                    renderExternalLink("Flathub", "https://flathub.org/en/apps/app.xmcl.voxelum", "Install via Flathub"),
                    renderExternalLink("AUR", "https://aur.archlinux.org/packages/xmcl-launcher", "Install via AUR")
                  ] })
                ] })
              ] })
            ] })
          ]
        }
      )
    ] })
  ] }) });
};

const detectOS = () => {
  if (typeof navigator === "undefined") return "windows";
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("win")) return "windows";
  if (userAgent.includes("mac")) return "macos";
  if (userAgent.includes("linux") || userAgent.includes("x11")) return "linux";
  return "windows";
};
const NewDownloadSection = () => {
  const { t } = useTranslation();
  const [detectedOS, setDetectedOS] = useState("windows");
  useEffect(() => {
    setDetectedOS(detectOS());
  }, []);
  const {
    data: releases,
    isLoading,
    error
  } = useQuery({
    queryKey: ["github-releases"],
    queryFn: async () => {
      const response = await fetch(
        "https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases",
        { headers: { Accept: "application/vnd.github.v3+json" } }
      );
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
    staleTime: 10 * 60 * 1e3,
    gcTime: 30 * 60 * 1e3,
    retry: 2,
    refetchOnWindowFocus: false
  });
  const latestRelease = releases?.[0];
  const platformAssets = useMemo(() => {
    if (!latestRelease?.assets) {
      return {
        windows: { x64: [], app: [] },
        macos: { x64: [], arm64: [] },
        linux: { x64: [], arm64: [] }
      };
    }
    const filtered = latestRelease.assets.filter((asset) => {
      const name = asset.name.toLowerCase();
      return !name.includes("sha256") && !name.includes("blockmap") && !name.includes(".sig") && !name.includes(".txt") && !name.includes(".yml") && asset.size > 1024 * 1024;
    });
    return {
      windows: {
        x64: filtered.filter((a) => {
          const n = a.name.toLowerCase();
          return n.endsWith(".exe") || n.endsWith(".zip") && !n.includes("mac") && !n.includes("linux");
        }),
        app: filtered.filter((a) => {
          const n = a.name.toLowerCase();
          return n.endsWith(".appinstaller") || n.endsWith(".appx");
        })
      },
      macos: {
        x64: filtered.filter((a) => {
          const n = a.name.toLowerCase();
          return (n.includes(".dmg") || n.includes(".pkg")) && !n.includes("arm64");
        }),
        arm64: filtered.filter((a) => {
          const n = a.name.toLowerCase();
          return (n.includes(".dmg") || n.includes(".pkg")) && n.includes("arm64");
        })
      },
      linux: {
        x64: filtered.filter((a) => {
          const n = a.name.toLowerCase();
          return (n.includes(".deb") || n.includes(".rpm") || n.includes(".appimage") || n.includes(".tar.xz")) && !n.includes("arm64");
        }),
        arm64: filtered.filter((a) => {
          const n = a.name.toLowerCase();
          return (n.includes(".deb") || n.includes(".rpm") || n.includes(".appimage") || n.includes(".tar.xz")) && n.includes("arm64");
        })
      }
    };
  }, [latestRelease]);
  const handleDownload = (url) => {
    if (url) {
      window.open(url, "_blank");
      return;
    }
    let downloadUrl = "";
    if (detectedOS === "windows") {
      downloadUrl = platformAssets.windows.x64[0]?.browser_download_url;
    } else if (detectedOS === "macos") {
      downloadUrl = platformAssets.macos.arm64[0]?.browser_download_url || platformAssets.macos.x64[0]?.browser_download_url;
    } else if (detectedOS === "linux") {
      downloadUrl = platformAssets.linux.x64.find((a) => a.name.includes(".appimage"))?.browser_download_url || platformAssets.linux.x64[0]?.browser_download_url;
    }
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    } else {
      const element = document.getElementById("platform-cards");
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxs("section", { className: "min-h-screen flex flex-col items-center justify-center pt-20", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-12 h-12 animate-spin text-blue-500 mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: t("downloadMessages.loadingReleases") || "Loading releases..." })
    ] });
  }
  if (error || !latestRelease) {
    return /* @__PURE__ */ jsx("section", { className: "min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center", children: /* @__PURE__ */ jsxs("div", { className: "p-8 rounded-3xl bg-red-500/10 border border-red-500/20 max-w-md w-full", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "w-12 h-12 text-red-400 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: t("downloadMessages.errorTitle") || "Unable to load releases" }),
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-6", children: t("downloadMessages.errorDescription") || "Please try again later or visit our GitHub." }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: () => window.open("https://github.com/Voxelum/x-minecraft-launcher/releases", "_blank"),
          className: "bg-red-500 hover:bg-red-600 text-white",
          children: [
            /* @__PURE__ */ jsx(Github, { className: "w-4 h-4 mr-2" }),
            t("downloadMessages.openGitHub") || "Open GitHub"
          ]
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-950", children: [
    /* @__PURE__ */ jsx(
      DownloadHero,
      {
        latestRelease,
        detectedOS,
        onDownload: () => handleDownload()
      }
    ),
    /* @__PURE__ */ jsx("div", { id: "platform-cards", children: /* @__PURE__ */ jsx(
      PlatformCards,
      {
        platformAssets,
        onDownload: (url) => handleDownload(url)
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "py-20 text-center border-t border-slate-900", children: [
      /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-6", children: t("downloadMessages.lookingForOlder") || "Looking for older versions?" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4", children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => window.open(latestRelease.html_url, "_blank"),
            className: "border-slate-800 hover:bg-slate-900 text-slate-300",
            children: [
              /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 mr-2" }),
              t("downloadMessages.releaseNotes")
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => window.open("https://github.com/Voxelum/x-minecraft-launcher/releases", "_blank"),
            className: "border-slate-800 hover:bg-slate-900 text-slate-300",
            children: [
              /* @__PURE__ */ jsx(Github, { className: "w-4 h-4 mr-2" }),
              t("downloadMessages.allReleases")
            ]
          }
        )
      ] })
    ] })
  ] });
};

const DownloadContent = () => {
  return /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsx(NewDownloadSection, {}) });
};
function Download() {
  return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(DownloadContent, {}) });
}

const $$Download = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Download - X Minecraft Launcher", "description": "Download the latest version of X Minecraft Launcher for Windows, macOS, and Linux." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Download", Download, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/react-pages/Download", "client:component-export": "default" })} ` })}`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/download.astro", void 0);

const $$file = "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/download.astro";
const $$url = "/download";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Download,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
