import { jsx, jsxs } from 'react/jsx-runtime';
import React__default, { lazy, useState, useMemo, useCallback, Suspense } from 'react';
import { u as useParams, a as useNavigate } from './useRouting_6_K5aNJE.mjs';
import { C as Card } from './card_q__1msBw.mjs';
import { u as useTranslation, A as AppShell, I as Input, B as Button } from './AppShell_BklFfeZH.mjs';
import { B as Badge } from './badge_zWW6J42E.mjs';
import { Sparkles, User, Calendar, ArrowRight, Rss, Search, Filter, X, FileText, ArrowLeft, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';

const useBlogPosts = () => {
  const { data: config, isLoading, error } = useQuery({
    queryKey: ["blog-config"],
    queryFn: async () => {
      try {
        const response = await fetch("/blog.json");
        if (!response.ok) {
          return {
            posts: [
              {
                id: "1",
                title: "Welcome to XMCL Blog",
                excerpt: "This is the beginning of our blog system. More posts coming soon!",
                content: "# Welcome to XMCL Blog\n\nThis is the beginning of our blog system. More posts coming soon!",
                author: "XMCL Team",
                date: "2024-01-01",
                tags: ["announcement"],
                slug: "welcome"
              }
            ],
            categories: ["announcement", "updates", "tutorials"],
            featured: ["1"]
          };
        }
        return response.json();
      } catch (error2) {
        return {
          posts: [],
          categories: [],
          featured: []
        };
      }
    }
  });
  const fetchPostContent = async (slug) => {
    try {
      const response = await fetch(`/blog/${slug}.md`);
      if (!response.ok) {
        return "# Post not found\n\nThis post content is not available.";
      }
      return response.text();
    } catch (error2) {
      return "# Error loading post\n\nFailed to load post content.";
    }
  };
  return {
    posts: config?.posts || [],
    categories: config?.categories || [],
    featured: config?.featured || [],
    isLoading,
    error,
    fetchPostContent
  };
};

const MarkdownRenderer = lazy(
  () => import('./MarkdownRenderer_DF7Vfc3p.mjs').then((m) => ({ default: m.MarkdownRenderer }))
);
const FloatingOrbs = () => /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-blob" }),
  /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" }),
  /* @__PURE__ */ jsx("div", { className: "absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" })
] });
const LoadingSpinner = () => /* @__PURE__ */ jsx("div", { className: "flex min-h-[60vh] items-center justify-center", children: /* @__PURE__ */ jsxs(
  motion.div,
  {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    className: "flex flex-col items-center gap-4",
    children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "h-16 w-16 rounded-full border-4 border-blue-200 dark:border-blue-800" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Loading blog posts..." })
    ]
  }
) });
const PostCard = React__default.memo(({ post, featured, onClick, index }) => {
  const { t } = useTranslation();
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
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 group-hover:opacity-100" }),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300", style: { padding: "2px", background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" } }),
            featured && /* @__PURE__ */ jsx(
              motion.div,
              {
                initial: { scale: 0 },
                animate: { scale: 1 },
                className: "absolute -right-12 -top-12 h-24 w-24",
                children: /* @__PURE__ */ jsx("div", { className: "absolute bottom-6 right-6", children: /* @__PURE__ */ jsxs(Badge, { className: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg", children: [
                  /* @__PURE__ */ jsx(Sparkles, { className: "mr-1 h-3 w-3" }),
                  t("blog.featured")
                ] }) })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent dark:text-white", children: post.title }),
              /* @__PURE__ */ jsx("p", { className: "mb-4 text-sm text-slate-600 line-clamp-2 dark:text-slate-400", children: post.excerpt }),
              /* @__PURE__ */ jsx("div", { className: "mb-4 flex flex-wrap gap-2", children: post.tags?.slice(0, 3).map((tag) => /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300",
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
                    /* @__PURE__ */ jsx(Calendar, { className: "h-3.5 w-3.5" }),
                    new Date(post.date).toLocaleDateString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxs(
                  motion.div,
                  {
                    className: "flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium",
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
PostCard.displayName = "PostCard";
const PostDetail = ({ post, content, onBack }) => {
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
            className: "mb-6 group text-blue-600 hover:text-blue-700 dark:text-blue-400",
            children: [
              /* @__PURE__ */ jsx(ArrowLeft, { className: "mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" }),
              t("blog.backToBlog")
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
                className: "mb-6 text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent",
                children: post.title
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsx(User, { className: "h-4 w-4 text-blue-500" }),
                post.author
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "h-4 w-4 text-purple-500" }),
                new Date(post.date).toLocaleDateString()
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full", children: [
                /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4 text-pink-500" }),
                Math.ceil((content?.length || 0) / 1e3),
                " min read"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: post.tags?.map((tag) => /* @__PURE__ */ jsx(
              Badge,
              {
                className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                children: tag
              },
              tag
            )) })
          ] }),
          /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "animate-pulse h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" }),
            /* @__PURE__ */ jsx("div", { className: "animate-pulse h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" }),
            /* @__PURE__ */ jsx("div", { className: "animate-pulse h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" })
          ] }), children: /* @__PURE__ */ jsx("div", { className: "prose prose-lg dark:prose-invert max-w-none", children: /* @__PURE__ */ jsx(MarkdownRenderer, { content: content || "" }) }) })
        ] })
      ]
    }
  );
};
const BlogContent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { posts, categories, featured, isLoading, fetchPostContent } = useBlogPosts();
  const { data: postContent } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: () => fetchPostContent(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1e3
  });
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
  if (id && selectedPost) {
    return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8", children: [
      /* @__PURE__ */ jsx(FloatingOrbs, {}),
      /* @__PURE__ */ jsx("div", { className: "container relative z-10 mx-auto px-4", children: /* @__PURE__ */ jsx(
        PostDetail,
        {
          post: selectedPost,
          content: postContent || "",
          onBack: () => {
            window.location.hash = "";
          }
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950", children: [
    /* @__PURE__ */ jsx(FloatingOrbs, {}),
    /* @__PURE__ */ jsx("header", { className: "relative border-b border-white/20 bg-white/50 backdrop-blur-xl py-16 dark:bg-slate-900/50", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          className: "inline-flex items-center gap-2 mb-4 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium",
          children: [
            /* @__PURE__ */ jsx(Rss, { className: "h-4 w-4" }),
            "Latest Updates"
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "mb-4 text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent",
          children: t("blog.title")
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.2 },
          className: "text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto",
          children: t("blog.subtitle")
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
                  placeholder: t("blog.searchPlaceholder"),
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
                className: "rounded-xl h-12",
                children: [
                  /* @__PURE__ */ jsx(Filter, { className: "mr-2 h-4 w-4" }),
                  t("blog.filterByCategory")
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
                className: `rounded-full ${selectedTags.includes(tag) ? "bg-gradient-to-r from-blue-500 to-purple-500 border-0" : ""}`,
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
        PostCard,
        {
          post,
          featured: featured.includes(post.id),
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
            /* @__PURE__ */ jsx(FileText, { className: "mx-auto mb-4 h-16 w-16 text-slate-300" }),
            /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-slate-600 dark:text-slate-400 mb-2", children: t("blog.noPostsFound") }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "link",
                onClick: () => {
                  setSearchQuery("");
                  setSelectedTags([]);
                },
                className: "text-blue-600",
                children: t("common.clearFilters")
              }
            )
          ]
        }
      )
    ] })
  ] });
};
function Blog() {
  return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(BlogContent, {}) });
}

export { Blog as B };
