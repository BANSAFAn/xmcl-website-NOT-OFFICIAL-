import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BQmXhRda.mjs';
import 'piccolore';
import { A as AppShell, a as useTranslation, B as Button, $ as $$Layout } from '../chunks/AppShell_BklFfeZH.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { C as Card } from '../chunks/card_q__1msBw.mjs';
import { B as Badge } from '../chunks/badge_zWW6J42E.mjs';
import { Rocket, Github, Search, Calendar, Tag, Download, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';
import { P as PageTransition } from '../chunks/PageTransition_FR7ZFP18.mjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
export { renderers } from '../renderers.mjs';

const stripDownloadsSection = (md) => {
  if (!md) return md;
  const pattern = /(^|\n)#{1,6}\s*Downloads[\s\S]*/i;
  return md.replace(pattern, "");
};
const formatDate = (iso) => new Date(iso).toLocaleDateString(void 0, { year: "numeric", month: "short", day: "numeric" });
const formatCount = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : `${n}`;
const ModernChangelogContent = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: releases, isLoading, error } = useQuery({
    queryKey: ["modern-releases"],
    queryFn: async () => {
      const res = await fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases?per_page=30");
      if (!res.ok) throw new Error(res.status === 403 ? "API rate limit exceeded" : "Failed to fetch releases");
      return res.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1e3
  });
  const getDownloads = (release) => release.assets?.reduce((s, a) => s + (a.download_count || 0), 0) || 0;
  const filteredReleases = useMemo(() => {
    if (!releases) return [];
    let result = releases.filter((release) => {
      if (filter === "stable" && release.prerelease) return false;
      if (filter === "prerelease" && !release.prerelease) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const name = (release.name || release.tag_name).toLowerCase();
        const tag = release.tag_name.toLowerCase();
        return name.includes(query) || tag.includes(query);
      }
      return true;
    });
    if (sortBy === "most-downloads") {
      result = [...result].sort((a, b) => getDownloads(b) - getDownloads(a));
    } else if (sortBy === "least-downloads") {
      result = [...result].sort((a, b) => getDownloads(a) - getDownloads(b));
    }
    return result;
  }, [releases, filter, searchQuery, sortBy]);
  const totalDownloads = useMemo(() => {
    if (!releases) return 0;
    return releases.reduce((total, release) => {
      return total + (release.assets?.reduce((s, a) => s + (a.download_count || 0), 0) || 0);
    }, 0);
  }, [releases]);
  return /* @__PURE__ */ jsxs(PageTransition, { children: [
    /* @__PURE__ */ jsx("script", { type: "application/ld+json", dangerouslySetInnerHTML: {
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "X Minecraft Launcher",
        "applicationCategory": "GameApplication",
        "operatingSystem": "Windows, macOS, Linux",
        "downloadUrl": "https://xmcl.app",
        "softwareVersion": releases?.[0]?.tag_name || "latest"
      })
    } }),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen relative overflow-hidden bg-background dark:bg-gradient-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-300", children: [
      /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse", style: { animationDelay: "2s" } }),
        /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse", style: { animationDelay: "4s" } })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "container mx-auto px-4 py-12 relative z-10", children: [
        /* @__PURE__ */ jsx("header", { className: "mb-16 text-center max-w-4xl mx-auto", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-300 text-sm mb-6", children: [
                /* @__PURE__ */ jsx(Rocket, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: t("changelog.latestUpdates") || "Latest Updates" })
              ] }),
              /* @__PURE__ */ jsx("h1", { className: "text-5xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent", children: t("changelog.title") }),
              /* @__PURE__ */ jsx("p", { className: "text-xl text-muted-foreground dark:text-slate-300 mb-8 max-w-2xl mx-auto", children: t("changelog.subtitle") }),
              !isLoading && releases && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-8 mb-8", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-foreground dark:text-white", children: releases.length }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground dark:text-slate-400", children: t("changelog.releases") || "Releases" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-green-400", children: formatCount(totalDownloads) }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-400", children: t("changelog.totalDownloads") || "Total Downloads" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-purple-400", children: releases[0]?.tag_name }),
                  /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-400", children: t("changelog.latestVersion") || "Latest Version" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "lg",
                  className: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-2xl shadow-indigo-500/25",
                  onClick: () => window.open("https://github.com/Voxelum/x-minecraft-launcher/releases", "_blank"),
                  children: [
                    /* @__PURE__ */ jsx(Github, { className: "w-5 h-5 mr-2" }),
                    " ",
                    t("issues.viewOnGitHub")
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "max-w-4xl mx-auto mb-10",
            children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 p-4 bg-white/50 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/10 shadow-sm", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 relative", children: [
                /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: t("changelog.searchPlaceholder"),
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),
                    className: "w-full pl-12 pr-4 py-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-slate-400 text-sm whitespace-nowrap", children: [
                  t("changelog.sortBy"),
                  ":"
                ] }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: sortBy,
                    onChange: (e) => setSortBy(e.target.value),
                    className: "px-4 py-3 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-foreground dark:text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none min-w-[180px]",
                    style: { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" },
                    children: [
                      /* @__PURE__ */ jsxs("option", { value: "newest", className: "bg-slate-800", children: [
                        "📅 ",
                        t("changelog.sortNewest")
                      ] }),
                      /* @__PURE__ */ jsxs("option", { value: "most-downloads", className: "bg-slate-800", children: [
                        "📈 ",
                        t("changelog.sortMostDownloads")
                      ] }),
                      /* @__PURE__ */ jsxs("option", { value: "least-downloads", className: "bg-slate-800", children: [
                        "📉 ",
                        t("changelog.sortLeastDownloads")
                      ] })
                    ]
                  }
                )
              ] })
            ] })
          }
        ),
        isLoading && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-20", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: t("changelog.loading") || "Loading releases..." })
        ] }) }),
        error && /* @__PURE__ */ jsx("div", { className: "max-w-2xl mx-auto text-center py-12", children: /* @__PURE__ */ jsxs("div", { className: "bg-red-500/10 border border-red-500/30 rounded-2xl p-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-red-400 text-4xl mb-4", children: "⚠️" }),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: t("changelog.errorLoading") }),
          /* @__PURE__ */ jsx("p", { className: "text-slate-400 mb-6", children: t("changelog.retryMessage") }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => window.open("https://github.com/Voxelum/x-minecraft-launcher/releases", "_blank"),
              className: "border-red-500/50 text-red-300 hover:bg-red-500/10",
              children: [
                /* @__PURE__ */ jsx(Github, { className: "w-4 h-4 mr-2" }),
                " ",
                t("issues.viewOnGitHub")
              ]
            }
          )
        ] }) }),
        !isLoading && !error && /* @__PURE__ */ jsxs("section", { className: "max-w-4xl mx-auto relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden lg:block" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsx(AnimatePresence, { children: filteredReleases.map((release, index) => {
            const downloads = release.assets?.reduce((s, a) => s + (a.download_count || 0), 0) || 0;
            const isExpanded = expandedId === release.id;
            const body = stripDownloadsSection(release.body || "");
            const preview = body.slice(0, 400) + (body.length > 400 ? "..." : "");
            return /* @__PURE__ */ jsxs(
              motion.article,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 20 },
                transition: { duration: 0.4, delay: index * 0.05 },
                className: "relative lg:pl-20",
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-4 border-slate-950 hidden lg:block" }),
                  /* @__PURE__ */ jsx(Card, { className: "overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-xl border-black/5 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10", children: /* @__PURE__ */ jsxs("div", { className: "p-6", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-wrap mb-2", children: [
                          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground dark:text-white", children: release.name || release.tag_name }),
                          release.prerelease ? /* @__PURE__ */ jsx(Badge, { className: "bg-amber-500/20 text-amber-300 border-amber-500/30", children: "Pre-release" }) : /* @__PURE__ */ jsx(Badge, { className: "bg-green-500/20 text-green-300 border-green-500/30", children: "Stable" })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-slate-400", children: [
                          /* @__PURE__ */ jsxs("time", { dateTime: release.published_at, className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }),
                            formatDate(release.published_at)
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4" }),
                            /* @__PURE__ */ jsx("code", { className: "px-2 py-0.5 bg-white/10 rounded text-xs", children: release.tag_name })
                          ] }),
                          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-green-400", children: [
                            /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
                            formatCount(downloads)
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxs(
                        Button,
                        {
                          variant: "outline",
                          size: "sm",
                          onClick: () => window.open(release.html_url, "_blank"),
                          className: "border-white/20 text-slate-300 hover:bg-white/10",
                          children: [
                            /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4 mr-1" }),
                            " GitHub"
                          ]
                        }
                      ) })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "prose prose-slate dark:prose-invert prose-sm max-w-none", children: /* @__PURE__ */ jsx("div", { className: "bg-black/5 dark:bg-white/5 rounded-xl p-4 text-slate-700 dark:text-slate-300", children: /* @__PURE__ */ jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: isExpanded ? body : preview }) }) }),
                    body.length > 400 && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setExpandedId(isExpanded ? null : release.id),
                        className: "mt-4 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors",
                        children: isExpanded ? /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(ChevronUp, { className: "w-4 h-4" }),
                          t("changelog.showLess") || "Show less"
                        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx(ChevronDown, { className: "w-4 h-4" }),
                          t("changelog.showMore") || "Show more"
                        ] })
                      }
                    )
                  ] }) })
                ]
              },
              release.id
            );
          }) }) }),
          filteredReleases.length === 0 && !isLoading && /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
            /* @__PURE__ */ jsx(Search, { className: "w-16 h-16 text-slate-600 mx-auto mb-4" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-semibold text-white mb-2", children: t("changelog.noResults") || "No releases found" }),
            /* @__PURE__ */ jsx("p", { className: "text-slate-400", children: t("changelog.tryDifferentSearch") || "Try a different search term or filter" })
          ] })
        ] })
      ] })
    ] })
  ] });
};
function ModernChangelog() {
  return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(ModernChangelogContent, {}) });
}

const $$Changelog = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Changelog - X Minecraft Launcher", "description": "View the complete changelog and release history of X Minecraft Launcher." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ModernChangelog", ModernChangelog, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/react-pages/ModernChangelog", "client:component-export": "default" })} ` })}`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/changelog.astro", void 0);

const $$file = "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/changelog.astro";
const $$url = "/changelog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Changelog,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
