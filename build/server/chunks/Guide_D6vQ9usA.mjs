import { jsx, jsxs } from 'react/jsx-runtime';
import React__default, { lazy, useState, useMemo, useCallback, Suspense } from 'react';
import { u as useParams, a as useNavigate } from './useRouting_6_K5aNJE.mjs';
import { C as Card } from './card_q__1msBw.mjs';
import { B as Badge } from './badge_zWW6J42E.mjs';
import { u as useTranslation, A as AppShell, I as Input, B as Button } from './AppShell_BklFfeZH.mjs';
import { Star, User, Clock, ArrowRight, GraduationCap, Sparkles, Search, Filter, X, BookOpen, ArrowLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

const MarkdownRenderer = lazy(
  () => import('./MarkdownRenderer_DF7Vfc3p.mjs').then((m) => ({ default: m.MarkdownRenderer }))
);
const FloatingOrbs = () => /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-blob" }),
  /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/4 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" }),
  /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 left-1/2 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" })
] });
const LoadingSpinner = () => /* @__PURE__ */ jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxs(
  motion.div,
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    className: "flex flex-col items-center gap-4",
    children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full border-4 border-emerald-200 dark:border-emerald-800" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-emerald-500 border-r-teal-500" }),
        /* @__PURE__ */ jsx(BookOpen, { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-emerald-500" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Loading guides..." })
    ]
  }
) });
const difficultyStyles = {
  beginner: { bg: "from-green-400 to-emerald-500", text: "text-white" },
  intermediate: { bg: "from-yellow-400 to-orange-500", text: "text-white" },
  advanced: { bg: "from-red-400 to-pink-500", text: "text-white" }
};
const GuideCard = React__default.memo(({ post, featured, onClick, index }) => {
  const { t } = useTranslation();
  const diffStyle = difficultyStyles[post.difficulty || ""] || { bg: "from-slate-400 to-slate-500", text: "text-white" };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: index * 0.1 },
      children: /* @__PURE__ */ jsxs(
        Card,
        {
          onClick,
          className: "group relative cursor-pointer overflow-hidden rounded-2xl border-0 bg-white/80 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:bg-slate-800/80",
          children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/5 group-hover:via-teal-500/5 group-hover:to-cyan-500/5 group-hover:opacity-100" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300", style: { padding: "2px", background: "linear-gradient(135deg, #10b981, #14b8a6, #06b6d4)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" } }),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
                featured && /* @__PURE__ */ jsxs(Badge, { className: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg", children: [
                  /* @__PURE__ */ jsx(Star, { className: "mr-1 h-3 w-3 fill-current" }),
                  "Featured"
                ] }),
                post.difficulty && /* @__PURE__ */ jsx(Badge, { className: `bg-gradient-to-r ${diffStyle.bg} ${diffStyle.text}`, children: post.difficulty })
              ] }),
              /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-teal-600 group-hover:bg-clip-text group-hover:text-transparent dark:text-white", children: post.title }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-slate-600 line-clamp-2 dark:text-slate-400", children: post.excerpt }),
              /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: post.tags?.slice(0, 3).map((tag) => /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: "outline",
                  className: "border-emerald-200 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400",
                  children: tag
                },
                tag
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-slate-500 dark:text-slate-400", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(User, { className: "h-3.5 w-3.5" }),
                    post.author
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Clock, { className: "h-3.5 w-3.5" }),
                    post.readTime || "5 min"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium",
                    whileHover: { x: 5 },
                    children: [
                      "Read",
                      /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    }
  );
});
GuideCard.displayName = "GuideCard";
const GuideDetail = ({ post, content, onBack }) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      className: "mx-auto max-w-4xl",
      children: [
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "ghost",
            onClick: onBack,
            className: "mb-6 group text-emerald-600 hover:text-emerald-700 dark:text-emerald-400",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" }),
              t("guide.backToGuides")
            ]
          }
        ),
        /* @__PURE__ */ jsxs("article", { className: "rounded-3xl bg-white/90 backdrop-blur-xl p-8 md:p-12 shadow-2xl dark:bg-slate-800/90 border border-white/20", children: [
          /* @__PURE__ */ jsxs("header", { className: "mb-10 border-b border-slate-200/50 pb-8 dark:border-slate-700/50", children: [
            /* @__PURE__ */ jsx(
              motion.h1,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                className: "mb-6 text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent",
                children: post.title
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full text-emerald-700 dark:text-emerald-300", children: [
                /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }),
                post.author
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-teal-50 dark:bg-teal-900/30 px-3 py-1.5 rounded-full text-teal-700 dark:text-teal-300", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" }),
                post.readTime || "5 min"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: post.tags?.map((tag) => /* @__PURE__ */ jsx(
              Badge,
              {
                className: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
                children: tag
              },
              tag
            )) })
          ] }),
          /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "animate-pulse h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" }),
            /* @__PURE__ */ jsx("div", { className: "animate-pulse h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" }),
            /* @__PURE__ */ jsx("div", { className: "animate-pulse h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" })
          ] }), children: /* @__PURE__ */ jsx("div", { className: "prose prose-lg dark:prose-invert max-w-none prose-headings:text-emerald-900 dark:prose-headings:text-emerald-100", children: /* @__PURE__ */ jsx(MarkdownRenderer, { content }) }) })
        ] })
      ]
    }
  );
};
const GuideContent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { data: config, isLoading } = useQuery({
    queryKey: ["guides-config"],
    queryFn: async () => {
      const response = await fetch("/guides.json");
      if (!response.ok) throw new Error("Failed to fetch guides");
      return response.json();
    },
    staleTime: 30 * 60 * 1e3
  });
  const { data: guideContent } = useQuery({
    queryKey: ["guide-content", id],
    queryFn: async () => {
      const response = await fetch(`/guide/${id}.md`);
      if (!response.ok) return "# Guide not found\n\nThe requested guide could not be found.";
      return response.text();
    },
    enabled: !!id,
    staleTime: 30 * 60 * 1e3
  });
  const posts = config?.posts || [];
  const categories = config?.categories || [];
  const featured = config?.featured || [];
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags?.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);
  const selectedPost = useMemo(
    () => posts.find((p) => p.slug === id),
    [posts, id]
  );
  const toggleTag = useCallback((tag) => {
    setSelectedTags(
      (prev) => prev.includes(tag) ? prev.filter((t2) => t2 !== tag) : [...prev, tag]
    );
  }, []);
  if (isLoading) return /* @__PURE__ */ jsx(LoadingSpinner, {});
  if (id && selectedPost && guideContent) {
    return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8", children: [
      /* @__PURE__ */ jsx(FloatingOrbs, {}),
      /* @__PURE__ */ jsx("div", { className: "container relative z-10 mx-auto px-4", children: /* @__PURE__ */ jsx(
        GuideDetail,
        {
          post: selectedPost,
          content: guideContent,
          onBack: () => {
            window.location.hash = "";
          }
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950", children: [
    /* @__PURE__ */ jsx(FloatingOrbs, {}),
    /* @__PURE__ */ jsx("header", { className: "relative border-b border-white/20 bg-white/50 backdrop-blur-xl py-16 dark:bg-slate-900/50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          className: "mb-6 inline-flex items-center justify-center",
          children: /* @__PURE__ */ jsx("div", { className: "rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 shadow-lg shadow-emerald-500/25", children: /* @__PURE__ */ jsx(GraduationCap, { className: "h-10 w-10 text-white" }) })
        }
      ),
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          className: "mb-4 inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-medium",
          children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }),
            "Learn & Discover"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "mb-4 text-5xl md:text-6xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent",
          children: t("guide.title")
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.2 },
          className: "text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto",
          children: t("guide.subtitle")
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "container relative z-10 mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
          className: "mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-4 rounded-2xl border border-white/20",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
              /* @__PURE__ */ jsx(Search, { className: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: t("guide.searchPlaceholder"),
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "pl-12 h-12 rounded-xl border-0 bg-white dark:bg-slate-700 shadow-sm"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                variant: showFilters ? "default" : "outline",
                onClick: () => setShowFilters(!showFilters),
                className: `rounded-xl h-12 ${showFilters ? "bg-emerald-600 hover:bg-emerald-700" : ""}`,
                children: [
                  /* @__PURE__ */ jsx(Filter, { className: "mr-2 h-4 w-4" }),
                  "Filter by tag"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(AnimatePresence, { children: showFilters && /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          className: "mb-8 overflow-hidden",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-5 border border-white/20", children: [
            categories.map((tag) => /* @__PURE__ */ jsx(
              Button,
              {
                variant: selectedTags.includes(tag) ? "default" : "outline",
                size: "sm",
                onClick: () => toggleTag(tag),
                className: `rounded-full ${selectedTags.includes(tag) ? "bg-gradient-to-r from-emerald-500 to-teal-500 border-0" : ""}`,
                children: tag
              },
              tag
            )),
            selectedTags.length > 0 && /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => setSelectedTags([]),
                className: "text-red-500 hover:text-red-600",
                children: [
                  /* @__PURE__ */ jsx(X, { className: "mr-1 h-3 w-3" }),
                  "Clear all"
                ]
              }
            )
          ] })
        }
      ) }),
      filteredPosts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filteredPosts.map((post, index) => /* @__PURE__ */ jsx(
        GuideCard,
        {
          post,
          featured: featured.includes(post.slug) || featured.includes(post.id),
          onClick: () => window.location.hash = post.slug,
          index
        },
        post.slug || post.id
      )) }) : /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "py-20 text-center",
          children: [
            /* @__PURE__ */ jsx(BookOpen, { className: "mx-auto mb-4 h-16 w-16 text-slate-300" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-600 dark:text-slate-400 mb-2", children: t("guide.noGuidesFound") }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "link",
                onClick: () => {
                  setSearchQuery("");
                  setSelectedTags([]);
                },
                className: "text-emerald-600",
                children: t("common.clearFilters")
              }
            )
          ]
        }
      )
    ] })
  ] });
};
function Guide() {
  return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(GuideContent, {}) });
}

export { Guide as G };
