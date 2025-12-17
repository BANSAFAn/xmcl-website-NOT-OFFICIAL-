import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BQmXhRda.mjs';
import 'piccolore';
import { a as useTranslation, B as Button, A as AppShell, I as Input, $ as $$Layout } from '../chunks/AppShell_BklFfeZH.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useEffect, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../chunks/card_q__1msBw.mjs';
import { B as Badge } from '../chunks/badge_zWW6J42E.mjs';
import { P as PageTransition } from '../chunks/PageTransition_FR7ZFP18.mjs';
import { Virtuoso } from 'react-virtuoso';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { AlertTriangle, CheckCircle2, Bug, Lightbulb, Zap, GitBranch, LayoutGrid, ExternalLink, Eye, MessageCircle, ArrowUpRight, Github, Plus, Search, Calendar, SortDesc } from 'lucide-react';
export { renderers } from '../renderers.mjs';

const FALLBACK_DATA = {
  issues: [
    {
      id: 1,
      number: 1,
      title: "Sample Issue - API Unavailable",
      body: "This is a fallback issue displayed when GitHub API is not available.",
      state: "open",
      user: {
        login: "xmcl-user",
        avatar_url: "https://github.com/github.png"
      },
      labels: [
        { name: "bug", color: "ff0000" },
        { name: "help wanted", color: "00ff00" }
      ],
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      updated_at: (/* @__PURE__ */ new Date()).toISOString(),
      comments: 5,
      assignees: [],
      milestone: null
    }
  ],
  stats: {
    stars: 8500,
    forks: 450,
    openIssues: 25,
    closedIssues: 180
  }
};
function useGitHubApi() {
  const [issues, setIssues] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [issuesResponse, repoResponse] = await Promise.allSettled([
          fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher/issues?state=all&per_page=50"),
          fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher")
        ]);
        let issuesData = FALLBACK_DATA.issues;
        let statsData = FALLBACK_DATA.stats;
        if (issuesResponse.status === "fulfilled" && issuesResponse.value.ok) {
          const issues2 = await issuesResponse.value.json();
          issuesData = issues2;
        } else {
          console.warn("GitHub Issues API unavailable, using fallback data");
        }
        if (repoResponse.status === "fulfilled" && repoResponse.value.ok) {
          const repo = await repoResponse.value.json();
          statsData = {
            stars: repo.stargazers_count || FALLBACK_DATA.stats.stars,
            forks: repo.forks_count || FALLBACK_DATA.stats.forks,
            openIssues: repo.open_issues_count || FALLBACK_DATA.stats.openIssues,
            closedIssues: FALLBACK_DATA.stats.closedIssues
          };
        } else {
          console.warn("GitHub Repo API unavailable, using fallback data");
        }
        setIssues(issuesData);
        setStats(statsData);
      } catch (err) {
        console.error("GitHub API error:", err);
        setError("Failed to load GitHub data");
        setIssues(FALLBACK_DATA.issues);
        setStats(FALLBACK_DATA.stats);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return {
    issues,
    stats,
    loading,
    error
  };
}

const StateIcon = memo(({ state }) => state === "open" ? /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-emerald-500" }) : /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-violet-500" }));
const IssueTypeIcon = memo(({ labels }) => {
  const hasLabel = (name) => labels.some(
    (label) => label.name.toLowerCase().includes(name)
  );
  if (hasLabel("bug")) return /* @__PURE__ */ jsx(Bug, { className: "w-4 h-4 text-red-500" });
  if (hasLabel("enhancement") || hasLabel("feature")) return /* @__PURE__ */ jsx(Lightbulb, { className: "w-4 h-4 text-amber-500" });
  if (hasLabel("performance")) return /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-blue-500" });
  return /* @__PURE__ */ jsx(GitBranch, { className: "w-4 h-4 text-slate-500" });
});
const MarkdownContent = memo(({ content }) => {
  if (!content) return null;
  return /* @__PURE__ */ jsx("div", { className: "prose prose-invert prose-sm max-w-none text-slate-300", children: /* @__PURE__ */ jsx(
    ReactMarkdown,
    {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeRaw],
      components: {
        a: ({ node, ...props }) => /* @__PURE__ */ jsx("a", { ...props, className: "text-blue-400 hover:underline", target: "_blank", rel: "noopener noreferrer" }),
        img: ({ node, ...props }) => /* @__PURE__ */ jsx("img", { ...props, className: "max-w-full rounded-lg my-2", loading: "lazy" }),
        pre: ({ node, ...props }) => /* @__PURE__ */ jsx("pre", { ...props, className: "bg-slate-900/50 p-3 rounded-lg overflow-x-auto" })
      },
      children: content
    }
  ) });
});
const StatsDashboard = memo(({ stats }) => {
  const { t } = useTranslation();
  if (!stats) return null;
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8", children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.1 },
        className: "bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-emerald-500/20 rounded-lg", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-emerald-500" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: t("issues.openIssues") }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: stats.openIssues })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        className: "bg-violet-500/10 border border-violet-500/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-violet-500/20 rounded-lg", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-5 h-5 text-violet-500" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: t("issues.closedIssues") }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: stats.closedIssues })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        className: "bg-blue-500/10 border border-blue-500/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-500/20 rounded-lg", children: /* @__PURE__ */ jsx(LayoutGrid, { className: "w-5 h-5 text-blue-500" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-slate-400 text-xs font-medium uppercase tracking-wider", children: t("issues.allIssues") }),
            /* @__PURE__ */ jsx("p", { className: "text-2xl font-bold text-white", children: stats.openIssues + stats.closedIssues })
          ] })
        ] })
      }
    )
  ] });
});
const IssueCard = memo(({ issue, expanded, onToggleExpand, t }) => {
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      layout: "position",
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: "mb-4 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 hover:border-violet-500/30 hover:bg-slate-700/40 transition-all duration-300 rounded-xl overflow-hidden group",
      children: /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsx(StateIcon, { state: issue.state }),
                /* @__PURE__ */ jsxs("span", { className: "text-slate-400 text-xs", children: [
                  "#",
                  issue.number
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-500 text-xs", children: "•" }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-xs", children: new Date(issue.created_at).toLocaleDateString() })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-white text-lg leading-tight group-hover:text-violet-300 transition-colors mb-2", children: issue.title }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx(IssueTypeIcon, { labels: issue.labels }),
                issue.labels.slice(0, 4).map((label) => /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "secondary",
                    className: "text-[10px] px-1.5 py-0.5 h-5",
                    style: {
                      backgroundColor: `#${label.color}15`,
                      borderColor: `#${label.color}40`,
                      color: `#${label.color}`,
                      borderWidth: "1px"
                    },
                    children: label.name
                  },
                  label.id
                ))
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 shrink-0", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "h-8 w-8 p-0 border-slate-700 hover:bg-slate-700 text-slate-300",
                  onClick: () => window.open(issue.html_url, "_blank"),
                  title: t("actions.goToIssue"),
                  children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  size: "sm",
                  variant: expanded ? "secondary" : "ghost",
                  className: `h-8 w-8 p-0 ${expanded ? "bg-violet-500/20 text-violet-300" : "text-slate-400 hover:text-white hover:bg-slate-700"}`,
                  onClick: onToggleExpand,
                  title: expanded ? t("actions.hide") : t("actions.preview"),
                  children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 text-xs text-slate-500 border-t border-slate-800/50 pt-3 mt-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx("img", { src: issue.user.avatar_url, alt: "", className: "w-4 h-4 rounded-full" }),
              /* @__PURE__ */ jsx("span", { className: "text-slate-400", children: issue.user.login })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx("span", { children: issue.comments })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxs("div", { className: "pt-4 mt-4 border-t border-slate-700/50", children: [
              /* @__PURE__ */ jsx(MarkdownContent, { content: issue.body }),
              /* @__PURE__ */ jsx("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "sm",
                  className: "bg-violet-600 hover:bg-violet-700 text-white",
                  onClick: () => window.open(issue.html_url, "_blank"),
                  children: [
                    t("issues.viewOnGitHub"),
                    " ",
                    /* @__PURE__ */ jsx(ArrowUpRight, { className: "ml-2 w-3 h-3" })
                  ]
                }
              ) })
            ] })
          }
        ) })
      ] })
    }
  );
});
function ModernIssuesContent() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");
  const [expandedIssueId, setExpandedIssueId] = useState(null);
  const { issues, stats, loading, error } = useGitHubApi();
  const filteredIssues = useMemo(() => {
    let result = issues?.filter((issue) => !issue.pull_request) || [];
    if (stateFilter !== "all") {
      result = result.filter((issue) => issue.state === stateFilter);
    }
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (issue) => issue.title.toLowerCase().includes(lowerSearch) || issue.body?.toLowerCase().includes(lowerSearch) || issue.user.login.toLowerCase().includes(lowerSearch)
      );
    }
    return result.sort((a, b) => {
      if (sortBy === "updated") return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      if (sortBy === "comments") return b.comments - a.comments;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [issues, stateFilter, searchTerm, sortBy]);
  if (error) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center p-8 bg-red-500/10 rounded-2xl border border-red-500/20", children: [
      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-12 h-12 text-red-500 mx-auto mb-4" }),
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold text-white mb-2", children: t("errors.issuesLoad") }),
      /* @__PURE__ */ jsx(Button, { onClick: () => window.location.reload(), variant: "outline", className: "mt-4", children: t("actions.retry") })
    ] }) });
  }
  return /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              className: "flex items-center gap-3 mb-2",
              children: [
                /* @__PURE__ */ jsx("div", { className: "p-2 bg-violet-500/20 rounded-lg border border-violet-500/30", children: /* @__PURE__ */ jsx(Bug, { className: "w-6 h-6 text-violet-400" }) }),
                /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white tracking-tight", children: t("issues.title") })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.p,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.1 },
              className: "text-slate-400 max-w-xl",
              children: t("issues.subtitle")
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            className: "flex items-center gap-3",
            children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  onClick: () => window.open("https://github.com/Voxelum/x-minecraft-launcher/issues", "_blank"),
                  variant: "outline",
                  className: "border-slate-700 hover:bg-slate-800 text-slate-300",
                  children: [
                    /* @__PURE__ */ jsx(Github, { className: "w-4 h-4 mr-2" }),
                    "GitHub"
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  onClick: () => window.open("https://github.com/Voxelum/x-minecraft-launcher/issues/new", "_blank"),
                  className: "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-900/20",
                  children: [
                    /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4 mr-2" }),
                    t("issues.reportNewIssue")
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(StatsDashboard, { stats }),
      /* @__PURE__ */ jsx("div", { className: "sticky top-4 z-30 mb-8", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              placeholder: t("issues.searchPlaceholder"),
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "pl-10 bg-slate-800/50 border-transparent focus:bg-slate-800 transition-all text-white h-10 rounded-xl"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2 p-1 overflow-x-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex bg-slate-800/50 rounded-xl p-1 shrink-0", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setStateFilter("all"),
                className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${stateFilter === "all" ? "bg-slate-700 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"}`,
                children: t("issues.allIssues")
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setStateFilter("open"),
                className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${stateFilter === "open" ? "bg-emerald-500/20 text-emerald-400 shadow-sm" : "text-slate-400 hover:text-emerald-400"}`,
                children: [
                  /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3.5 h-3.5" }),
                  t("issues.openFilter")
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => setStateFilter("closed"),
                className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${stateFilter === "closed" ? "bg-violet-500/20 text-violet-400 shadow-sm" : "text-slate-400 hover:text-violet-400"}`,
                children: [
                  /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
                  t("issues.closedFilter")
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "h-full w-px bg-slate-700/50 mx-1 shrink-0" }),
          /* @__PURE__ */ jsx("div", { className: "flex bg-slate-800/50 rounded-xl p-1 shrink-0", children: /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setSortBy(sortBy === "created" ? "updated" : "created"),
              className: "px-3 py-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors",
              title: t("issues.sortBy"),
              children: sortBy === "created" ? /* @__PURE__ */ jsx(Calendar, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(SortDesc, { className: "w-4 h-4" })
            }
          ) })
        ] })
      ] }) }),
      loading ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 font-medium", children: t("issues.loadingIssues") })
      ] }) : filteredIssues.length > 0 ? /* @__PURE__ */ jsx("div", { className: "h-[800px] w-full", children: /* @__PURE__ */ jsx(
        Virtuoso,
        {
          useWindowScroll: true,
          data: filteredIssues,
          itemContent: (index, issue) => /* @__PURE__ */ jsxs("div", { className: "pb-1", children: [
            " ",
            /* @__PURE__ */ jsx(
              IssueCard,
              {
                issue,
                expanded: expandedIssueId === issue.id,
                onToggleExpand: () => setExpandedIssueId(expandedIssueId === issue.id ? null : issue.id),
                t
              }
            )
          ] }),
          components: {
            Footer: () => /* @__PURE__ */ jsx("div", { className: "h-20" })
            // Bottom spacer
          }
        }
      ) }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 bg-slate-800/50 rounded-full mb-4", children: /* @__PURE__ */ jsx(Search, { className: "w-8 h-8 text-slate-500" }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-2", children: t("issues.noIssuesFound") }),
        /* @__PURE__ */ jsx("p", { className: "text-slate-400 max-w-sm", children: t("issues.tryAdjusting") }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "link",
            onClick: () => {
              setSearchTerm("");
              setStateFilter("all");
            },
            className: "mt-2 text-violet-400",
            children: t("common.clearFilters")
          }
        )
      ] })
    ] })
  ] }) });
}
function ModernIssues() {
  return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(ModernIssuesContent, {}) });
}

const $$Issues = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Issues Tracker - X Minecraft Launcher", "description": "Track bugs, request features, and contribute to the development of X Minecraft Launcher. View active issues and project roadmap." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ModernIssues", ModernIssues, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/react-pages/ModernIssues", "client:component-export": "default" })} ` })}`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/issues.astro", void 0);

const $$file = "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/issues.astro";
const $$url = "/issues";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Issues,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
