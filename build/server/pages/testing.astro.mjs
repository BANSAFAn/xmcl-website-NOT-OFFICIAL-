import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BQmXhRda.mjs';
import 'piccolore';
import { a as useTranslation, B as Button, A as AppShell, $ as $$Layout } from '../chunks/AppShell_BklFfeZH.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { B as Badge } from '../chunks/badge_zWW6J42E.mjs';
import { Loader2, Monitor, Zap, Download, AlertTriangle, GitBranch, XCircle, Clock, ShieldAlert, Terminal, ExternalLink, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { C as Card } from '../chunks/card_q__1msBw.mjs';
export { renderers } from '../renderers.mjs';

const DownloadArtifacts = ({
  platform,
  runId
}) => {
  const { t } = useTranslation();
  const { data: artifactsData, isLoading, error } = useQuery({
    queryKey: ["artifacts", runId],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/actions/runs/${runId}/artifacts`);
      if (!response.ok) throw new Error("Failed to fetch artifacts");
      return response.json();
    },
    staleTime: 5 * 60 * 1e3,
    refetchOnWindowFocus: false
  });
  const getPlatformArtifacts = () => {
    if (!artifactsData?.artifacts) return [];
    switch (platform) {
      case "windows":
        return artifactsData.artifacts.filter(
          (a) => a.name.toLowerCase().includes("windows") || a.name.toLowerCase().includes("win") || a.name.toLowerCase().includes("exe")
        );
      case "linux":
        return artifactsData.artifacts.filter(
          (a) => a.name.toLowerCase().includes("linux") || a.name.toLowerCase().includes("appimage") || a.name.toLowerCase().includes("deb") || a.name.toLowerCase().includes("rpm")
        );
      case "macos":
        return artifactsData.artifacts.filter(
          (a) => a.name.toLowerCase().includes("mac") || a.name.toLowerCase().includes("darwin") || a.name.toLowerCase().includes("dmg")
        );
      default:
        return [];
    }
  };
  const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };
  const handleDownload = (artifact) => {
    window.open(`https://github.com/Voxelum/x-minecraft-launcher/actions/runs/${runId}`, "_blank");
    toast.success(t("testing.downloadStarted"));
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "flex justify-center py-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-8 h-8 animate-spin text-indigo-500" }) });
  }
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "text-center py-8 text-red-400", children: "Failed to load artifacts" });
  }
  const platformArtifacts = getPlatformArtifacts();
  if (platformArtifacts.length === 0) {
    return /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "text-center py-12",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsx(Monitor, { className: "w-8 h-8 text-slate-400" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: t("testing.noArtifacts") }),
          /* @__PURE__ */ jsxs("p", { className: "text-slate-400", children: [
            "No artifacts available for ",
            platform
          ] })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: platformArtifacts.map((artifact, index) => /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, delay: 0.1 * index },
      children: /* @__PURE__ */ jsx(Card, { className: "p-6 bg-white/10 backdrop-blur-xl border-white/10 shadow-xl hover:bg-white/15 transition-all duration-300 group", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300", children: /* @__PURE__ */ jsx(Zap, { className: "w-7 h-7 text-white" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-white mb-2 truncate px-2", title: artifact.name, children: artifact.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2 mb-4", children: [
          /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs bg-black/20 text-slate-300", children: formatFileSize(artifact.size_in_bytes) }),
          /* @__PURE__ */ jsx(
            Badge,
            {
              className: `text-xs ${artifact.expired ? "bg-red-500 text-white" : "bg-green-500 text-white"}`,
              children: artifact.expired ? "Expired" : "Available"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: () => handleDownload(),
            disabled: artifact.expired,
            size: "sm",
            className: "w-full bg-white/10 hover:bg-white/20 text-white border border-white/10",
            children: [
              /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
              t("testing.downloadArtifact")
            ]
          }
        )
      ] }) })
    },
    artifact.id
  )) });
};

const TestingContent = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState("windows");
  const [expandedRunId, setExpandedRunId] = useState(null);
  const { data: workflowRuns, isLoading, error } = useQuery({
    queryKey: ["workflow-runs"],
    queryFn: async () => {
      const response = await fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher/actions/runs?status=completed&per_page=10&event=push");
      if (!response.ok) throw new Error("Failed to fetch workflow runs");
      return response.json();
    },
    staleTime: 5 * 60 * 1e3,
    refetchOnWindowFocus: false
  });
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(void 0, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  const getStatusColor = (conclusion) => {
    switch (conclusion) {
      case "success":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "failure":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
    }
  };
  const StatusIcon = ({ conclusion }) => {
    switch (conclusion) {
      case "success":
        return /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5 text-green-500" });
      case "failure":
        return /* @__PURE__ */ jsx(XCircle, { className: "w-5 h-5 text-red-500" });
      default:
        return /* @__PURE__ */ jsx(AlertCircle, { className: "w-5 h-5 text-yellow-500" });
    }
  };
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "windows":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", role: "img", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" }) });
      case "macos":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", role: "img", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.78-1.26 2.05-1.11 3.17 1.17.09 2.36-.75 3.07-1.65z" }) });
      case "linux":
        return /* @__PURE__ */ jsx("svg", { className: "w-5 h-5 fill-current", viewBox: "0 0 24 24", role: "img", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M13.13 18c-.26-.18-.59-.33-1-.46a4.3 4.3 0 0 1-1-.44 3.73 3.73 0 0 1-.78-.66 2.3 2.3 0 0 1-.36-.61c-.08-.22-.12-.47-.11-.77v-.21a1.69 1.69 0 0 1 .15-.65 2.5 2.5 0 0 1 .42-.64 3.78 3.78 0 0 1 .63-.56c.14-.1.27-.19.38-.26l.16-.1.17-.07.13-.04h.16l.16.03.11.04.1.06a.8.8 0 0 1 .28.32l.06.14a1.76 1.76 0 0 1 .05.45v.69a1.69 1.69 0 0 1-.16.65 2.42 2.42 0 0 1-.42.63 3.6 3.6 0 0 1-.62.56c-.25.17-.5.31-.76.43zm-2-2.52a.76.76 0 0 0-.25.07.67.67 0 0 0-.21.15.6.6 0 0 0-.13.2.73.73 0 0 0-.05.23v.2a1 1 0 0 0 .09.4 1 1 0 0 0 .23.32 1.6 1.6 0 0 0 .34.25c.13.07.27.13.41.17v-1.7a1.43 1.43 0 0 0-.43-.29zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 21.8c-2.07 0-3.96-.34-5.69-1a10.9 10.9 0 0 1-4.83-3.6 8.35 8.35 0 0 1-1.63-4.84 8.7 8.7 0 0 1 1-4.08 10.43 10.43 0 0 1 3.2-3.6A11.53 11.53 0 0 1 12 2.2a11.53 11.53 0 0 1 7.9 2.51 10.4 10.4 0 0 1 3.22 3.6 8.7 8.7 0 0 1 1.05 4.09 8.38 8.38 0 0 1-1.62 4.83 10.92 10.92 0 0 1-4.84 3.6c-1.74.63-3.63.97-5.71.97z" }) });
      default:
        return /* @__PURE__ */ jsx(Package, { className: "w-5 h-5" });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative overflow-hidden bg-background dark:bg-gradient-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "X Minecraft Launcher (Testing)",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Windows, macOS, Linux",
        "releaseNotes": "Development builds and nightly releases",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      })
    } }),
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse", style: { animationDelay: "2s" } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-24 relative z-10", children: [
      /* @__PURE__ */ jsx("header", { className: "mb-20 text-center max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-sm mb-8 font-medium", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "Experimental Builds" })
            ] }),
            /* @__PURE__ */ jsx("h1", { className: "text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent", children: t("testing.title") }),
            /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto leading-relaxed", children: t("testing.subtitle") })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
            /* @__PURE__ */ jsxs("h2", { className: "text-2xl font-bold text-foreground dark:text-white flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(GitBranch, { className: "w-6 h-6 text-indigo-400" }),
              "Latest Builds"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: ["windows", "macos", "linux"].map((p) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setSelectedPlatform(p),
                className: `p-2 rounded-lg transition-all ${selectedPlatform === p ? "bg-indigo-600 text-white" : "bg-black/5 dark:bg-white/5 text-muted-foreground dark:text-slate-400 hover:bg-black/10 dark:hover:bg-white/10"}`,
                children: getPlatformIcon(p)
              },
              p
            )) })
          ] }),
          isLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-32 bg-white/5 rounded-2xl animate-pulse" }, i)) }) : error ? /* @__PURE__ */ jsxs("div", { className: "p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center", children: [
            /* @__PURE__ */ jsx(XCircle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "text-red-400", children: "Failed to load builds" })
          ] }) : /* @__PURE__ */ jsx("div", { className: "space-y-4", children: workflowRuns?.workflow_runs?.map((run) => /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              className: "group relative bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden hover:bg-white/60 dark:hover:bg-white/[0.07] transition-all",
              children: [
                /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
                      /* @__PURE__ */ jsx(StatusIcon, { conclusion: run.conclusion }),
                      /* @__PURE__ */ jsxs("span", { className: "font-mono text-sm text-slate-400", children: [
                        "#",
                        run.run_number
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: `px-2 py-0.5 rounded text-xs border ${getStatusColor(run.conclusion)}`, children: run.conclusion })
                    ] }),
                    /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-foreground dark:text-white truncate mb-2 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors", children: run.display_title }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground dark:text-slate-400", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx("img", { src: run.actor.avatar_url, alt: "", className: "w-5 h-5 rounded-full" }),
                        /* @__PURE__ */ jsx("span", { children: run.actor.login })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsx("span", { children: formatDate(run.updated_at) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 font-mono", children: [
                        /* @__PURE__ */ jsx(GitBranch, { className: "w-4 h-4" }),
                        /* @__PURE__ */ jsx("span", { children: run.head_branch })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "icon",
                      onClick: () => setExpandedRunId(expandedRunId === run.id ? null : run.id),
                      className: `rounded-xl transition-all ${expandedRunId === run.id ? "bg-indigo-500/20 text-indigo-400" : "text-slate-400 hover:text-white"}`,
                      children: /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" })
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx(AnimatePresence, { children: expandedRunId === run.id && /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { height: 0, opacity: 0 },
                    animate: { height: "auto", opacity: 1 },
                    exit: { height: 0, opacity: 0 },
                    className: "border-t border-white/10 bg-black/20",
                    children: /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx(DownloadArtifacts, { runId: run.id, platform: selectedPlatform }) })
                  }
                ) })
              ]
            },
            run.id
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-6 bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-2xl", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "p-3 bg-amber-500/20 rounded-xl", children: /* @__PURE__ */ jsx(ShieldAlert, { className: "w-6 h-6 text-amber-500" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-amber-600 dark:text-amber-500 text-lg mb-2", children: "Warning" }),
              /* @__PURE__ */ jsx("p", { className: "text-amber-700/80 dark:text-amber-200/80 text-sm leading-relaxed", children: "These are development builds. They may contain bugs, incomplete features, or cause data issues. Always backup your data before using testing builds." })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold text-foreground dark:text-white text-lg mb-4 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Terminal, { className: "w-5 h-5 text-indigo-400" }),
              "How to Install"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-none w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30", children: "1" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-foreground dark:text-white font-medium text-sm", children: "Download Artifact" }),
                  /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-slate-400 text-xs mt-1", children: "Select your platform and download the latest successful build artifact." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-none w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30", children: "2" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-foreground dark:text-white font-medium text-sm", children: "Extract & Run" }),
                  /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-slate-400 text-xs mt-1", children: "Extract the archive. The executable is portable and can be run directly." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsx("div", { className: "flex-none w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-sm border border-pink-500/30", children: "3" }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("h4", { className: "text-foreground dark:text-white font-medium text-sm", children: "Report Bugs" }),
                  /* @__PURE__ */ jsx("p", { className: "text-muted-foreground dark:text-slate-400 text-xs mt-1", children: "If you find issues, please report them on our GitHub Issues page." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                className: "w-full mt-6 border-white/10 hover:bg-white/5 text-slate-300",
                onClick: () => window.open("https://github.com/Voxelum/x-minecraft-launcher/issues", "_blank"),
                children: [
                  "Report Issue ",
                  /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 ml-2" })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] })
  ] });
};
const Testing = () => /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(TestingContent, {}) });

const $$Testing = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Testing - X Minecraft Launcher", "description": "Get early access to the latest features and bug fixes. Download nightly builds of X Minecraft Launcher for Windows, macOS, and Linux." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Testing", Testing, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/react-pages/Testing", "client:component-export": "default" })} ` })}`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/testing.astro", void 0);

const $$file = "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/testing.astro";
const $$url = "/testing";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Testing,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
