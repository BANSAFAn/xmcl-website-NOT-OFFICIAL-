import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "@/hooks/useRouting";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  Tag,
  Clock,
  User,
  ArrowRight,
  FileText,
  Star,
  Rss,
  ArrowLeft,
  TrendingUp,
  Filter,
  X,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/contexts/TranslationContext";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

import { AppShell } from "@/components/AppShell";

interface GuidePost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  slug: string;
  readTime?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  views?: number;
  lastUpdated?: string;
}

interface GuideConfig {
  posts: GuidePost[];
  categories: string[];
  featured: string[];
}

// Оптимизированный Loading Component
const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
    <div className="relative">
      <div className="h-16 w-16 rounded-full border-4 border-emerald-200 dark:border-emerald-800"></div>
      <div className="absolute top-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-emerald-500"></div>
      <BookOpen className="absolute top-4 left-4 h-8 w-8 text-emerald-500 animate-pulse" />
    </div>
  </div>
);

// Оптимизированная Guide Card
const GuideCard = React.memo(
  ({
    post,
    featured,
    onClick,
    searchQuery,
  }: {
    post: GuidePost;
    featured: boolean;
    onClick: () => void;
    searchQuery: string;
  }) => {
const { t } = useTranslation();

    const difficultyColors = {
      beginner: "bg-green-500",
      intermediate: "bg-yellow-500",
      advanced: "bg-red-500",
    };

    // Функция для подсветки текста поиска
    const highlightText = (text: string) => {
      if (!searchQuery) return text;

      const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));
      return (
        <>
          {parts.map((part, i) =>
            part.toLowerCase() === searchQuery.toLowerCase() ?
              <span key={i} className="bg-emerald-100 dark:bg-emerald-900 font-semibold">{part}</span> :
              part
          )}
        </>
      );
    };

    return (
      <Card
        onClick={onClick}
        className="group relative overflow-hidden rounded-xl border-0 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/20 dark:bg-slate-800/90 cursor-pointer"
      >
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-0 right-0 z-10">
            <div className="h-12 w-12 overflow-hidden">
              <div className="absolute -right-4 -top-4 h-16 w-16 rotate-45 bg-gradient-to-r from-yellow-400 to-orange-400"></div>
              <Star className="absolute right-1 top-1 h-4 w-4 text-white fill-current z-10" />
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Badges Row */}
          <div className="mb-3 flex items-center justify-between">
            {post.difficulty && (
              <Badge
                className={`${difficultyColors[post.difficulty]} text-white text-xs px-2 py-0.5 capitalize`}
              >
                {post.difficulty}
              </Badge>
            )}
            {post.views && (
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {post.views} {t("guide.views")}
              </span>
            )}
          </div>

          {/* Content */}
          <h3 className="mb-2 text-xl font-bold text-slate-900 line-clamp-2 transition-colors group-hover:text-emerald-600 dark:text-slate-100 dark:group-hover:text-emerald-400">
            {highlightText(post.title)}
          </h3>

          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
            {highlightText(post.excerpt)}
          </p>

          {/* Meta */}
          <div className="mb-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime || "5 min"}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400 text-xs px-1.5 py-0"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Read Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              <FileText className="h-4 w-4" />
              {t("guide.readMore")}
            </div>
            <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    );
  },
);

GuideCard.displayName = "GuideCard";

// Main Component
const GuideContent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Оптимизированная загрузка конфига
  const {
    data: config,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guide-config"],
    queryFn: async (): Promise<GuideConfig> => {
      try {
        const response = await fetch("/guides.json");
        if (!response.ok) {
          return {
            posts: [
              {
                id: "1",
                title:
                  t("guide.gettingStartedWithXMCL") ||
                  "Getting Started with XMCL",
                excerpt:
                  t("guide.learnBasics") ||
                  "Learn the basics of using X Minecraft Launcher",
                content: `# Getting Started\n\nWelcome to XMCL!`,
                author: t("guide.xmclTeam") || "XMCL Team",
                date: "2024-01-01",
                tags: ["beginner", "setup"],
                slug: "getting-started",
                readTime: "5 min",
                difficulty: "beginner",
                views: 1234,
              },
            ],
            categories: ["beginner", "setup", "advanced"],
            featured: ["1"],
          };
        }
        return response.json();
      } catch {
        return { posts: [], categories: [], featured: [] };
      }
    },
    staleTime: 30 * 60 * 1000, // 30 минут
    gcTime: 60 * 60 * 1000, // 1 час (вместо cacheTime)
  });

  // Оптимизированная загрузка поста
  const { data: selectedPost } = useQuery({
    queryKey: ["guide-post", id],
    queryFn: async (): Promise<string> => {
      if (!id) return "";
      try {
        const response = await fetch(`/guide/${id}.md`);
        if (!response.ok)
          return `# Guide Not Found\n\nThe requested guide could not be found.`;
        return response.text();
      } catch {
        return `# Error\n\nFailed to load guide content.`;
      }
    },
    enabled: !!id,
    staleTime: 30 * 60 * 1000,
  });

  const posts = config?.posts || [];
  const categories = config?.categories || [];
  const featured = config?.featured || [];

  // Оптимизированная фильтрация и сортировка
  const filteredPosts = useMemo(() => {
    if (!posts.length) return [];

    const lowerSearch = searchQuery.toLowerCase();

    return posts
      .filter((post) => {
        const matchesSearch =
          !searchQuery ||
          post.title.toLowerCase().includes(lowerSearch) ||
          post.excerpt.toLowerCase().includes(lowerSearch) ||
          post.tags.some(tag => tag.toLowerCase().includes(lowerSearch));

        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => post.tags.includes(tag));

        return matchesSearch && matchesTags;
      })
      .sort((a, b) => {
        // Сначала показываем избранные посты
        if (featured.includes(a.id) && !featured.includes(b.id)) return -1;
        if (!featured.includes(a.id) && featured.includes(b.id)) return 1;

        // Затем сортируем по количеству просмотров (если доступно)
        if (a.views && b.views) return b.views - a.views;

        // В конце по дате обновления
        return 0;
      });
  }, [posts, searchQuery, selectedTags, featured]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTags([]);
    setSearchQuery("");
  }, []);

  // Автоматическая прокрутка к верху при изменении фильтров
  useEffect(() => {
    if (searchQuery || selectedTags.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [searchQuery, selectedTags]);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <PageTransition>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
          <Card className="max-w-md p-8 text-center">
            <div className="mb-4 text-6xl">😕</div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("guide.error")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t("guide.errorMessage")}
            </p>
          </Card>
        </div>
      </PageTransition>
    );
  }

  // Single Guide View - улучшенный дизайн
  if (id) {
    const post = posts.find((p) => p.slug === id);

    if (!post) {
      return (
        <PageTransition>
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
            <Card className="p-8 text-center max-w-md">
              <FileText className="mx-auto mb-4 h-16 w-16 text-slate-400" />
              <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                {t("guide.notFound")}
              </h2>
              <div
                onClick={() => navigate("/guide")}
                className="mt-4 inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("guide.backToGuides")}
              </div>
            </Card>
          </div>
        </PageTransition>
      );
    }

    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            {/* Navigation */}
            <div
              onClick={() => navigate("/guide")}
              className="mb-6 inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("guide.backToGuides")}
            </div>

            {/* Article */}
            <Card className="overflow-hidden rounded-2xl border-0 bg-white/95 shadow-xl backdrop-blur-sm dark:bg-slate-800/95">
              {/* Header */}
              <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 p-8 dark:border-emerald-900 dark:from-emerald-950/50 dark:to-teal-950/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="mb-4 text-4xl font-black text-slate-900 dark:text-slate-100">
                      {post.title}
                    </h1>
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {post.readTime || "5 min"}
                      </span>
                      {post.views && (
                        <span className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" />
                          {post.views} {t("guide.views")}
                        </span>
                      )}
                      {post.difficulty && (
                        <Badge className="bg-emerald-600 text-white capitalize">
                          {post.difficulty}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {featured.includes(post.id) && (
                    <div className="ml-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                        <Star className="h-6 w-6 text-white fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-slate dark:prose-invert max-w-none p-8">
                {selectedPost && <MarkdownRenderer content={selectedPost} />}
              </div>
            </Card>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Guides List - улучшенный дизайн
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
        {/* Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30">
          <div className="absolute left-1/4 top-20 h-96 w-96 animate-pulse rounded-full bg-emerald-400/20 blur-3xl" />
          <div
            className="absolute bottom-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-teal-400/20 blur-3xl"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 py-12 text-center">
          <div className="container mx-auto px-4">
            <div className="mb-4 flex items-center justify-center gap-3">
              <BookOpen className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
              <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t("guide.title")}
              </h1>
            </div>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              {t("guide.subtitle")}
            </p>
            <div
              onClick={() => window.open("/guide-rss.xml", "_blank")}
              className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 cursor-pointer hover:text-orange-700 dark:hover:text-orange-300"
            >
              <Rss className="h-4 w-4" />
              {t("guide.rss")}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none transition-colors ${isSearchFocused ? 'text-emerald-600' : 'text-slate-400'}`}>
                  <Search className="h-5 w-5" />
                </div>
                <Input
                  placeholder={t("guide.searchPlaceholder") || "Search guides..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`pl-10 border-0 bg-white/90 shadow-md backdrop-blur-sm focus:bg-white focus:shadow-lg transition-all dark:bg-slate-800/90 dark:focus:bg-slate-800 ${isSearchFocused ? 'ring-2 ring-emerald-500' : ''}`}
                />
                {searchQuery && (
                  <div
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    <X className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm">{t("guide.filterBy")}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm cursor-pointer transition-all ${
                        selectedTags.includes(tag)
                          ? "bg-emerald-600 text-white shadow-md"
                          : "bg-white/90 text-slate-700 shadow-md hover:bg-emerald-100 dark:bg-slate-800/90 dark:text-slate-300 dark:hover:bg-slate-700"
                      }`}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Status */}
            {(selectedTags.length > 0 || searchQuery) && (
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {t("guide.showing")} <span className="font-semibold">{filteredPosts.length}</span> {t("guide.of")} <span className="font-semibold">{posts.length}</span> {t("guide.guides")}
                </div>
                <div
                  onClick={clearFilters}
                  className="text-sm text-emerald-600 dark:text-emerald-400 cursor-pointer hover:text-emerald-700 dark:hover:text-emerald-300"
                >
                  {t("guide.clearFilters")}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post) => (
                <GuideCard
                  key={post.id}
                  post={post}
                  featured={featured.includes(post.id)}
                  onClick={() => navigate(`/guide/${post.slug}`)}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <FileText className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-600 dark:text-slate-400">
                {t("guide.noGuidesFound")}
              </h3>
              <p className="mb-6 text-sm text-slate-500 dark:text-slate-500">
                {t("guide.tryDifferentFilters")}
              </p>
              <div
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700"
              >
                {t("guide.clearFilters")}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default function Guide() {
  return (
    <AppShell>
      <GuideContent />
    </AppShell>
  );
}
