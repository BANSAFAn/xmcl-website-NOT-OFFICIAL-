import React, { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Share2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/useTranslation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

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
}

interface GuideConfig {
  posts: GuidePost[];
  categories: string[];
  featured: string[];
}

// Оптимизированный Loading Component
const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 rounded-full border-4 border-emerald-200 dark:border-emerald-800" />
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-emerald-500" />
      <BookOpen className="absolute inset-0 m-auto h-8 w-8 animate-pulse text-emerald-500" />
    </div>
  </div>
);

// Оптимизированная Guide Card
const GuideCard = React.memo(
  ({
    post,
    featured,
    onClick,
  }: {
    post: GuidePost;
    featured: boolean;
    onClick: () => void;
  }) => {
    const { t } = useTranslation();

    const difficultyColors = {
      beginner: "bg-green-500",
      intermediate: "bg-yellow-500",
      advanced: "bg-red-500",
    };

    return (
      <Card
        onClick={onClick}
        className="group relative overflow-hidden rounded-xl border border-emerald-200/60 bg-white/95 p-5 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/10 dark:border-emerald-800/60 dark:bg-slate-800/95 cursor-pointer"
      >
        {/* Badges Row */}
        <div className="mb-3 flex items-center justify-between">
          {post.difficulty && (
            <Badge
              className={`${difficultyColors[post.difficulty]} text-white text-xs px-2 py-0.5 capitalize`}
            >
              {post.difficulty}
            </Badge>
          )}
          {featured && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-0.5">
              <Star className="h-3 w-3 fill-current mr-1 inline" />
              {t("guide.featured")}
            </Badge>
          )}
        </div>

        {/* Content */}
        <h3 className="mb-2 text-xl font-bold text-slate-900 line-clamp-2 transition-colors group-hover:text-emerald-600 dark:text-slate-100 dark:group-hover:text-emerald-400">
          {post.title}
        </h3>

        <p className="mb-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
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
        <div className="flex flex-wrap gap-1.5 mb-3">
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

        {/* Read Button */}
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
          <FileText className="h-4 w-4" />
          {t("guide.readMore")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </Card>
    );
  },
);

GuideCard.displayName = "GuideCard";

// Main Component
const Guide = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  // Оптимизированная фильтрация
  const filteredPosts = useMemo(() => {
    if (!posts.length) return [];

    const lowerSearch = searchQuery.toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(lowerSearch) ||
        post.excerpt.toLowerCase().includes(lowerSearch);

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedTags([]);
    setSearchQuery("");
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert(t("guide.linkCopied") || "Link copied!");
    }
  }, [t]);

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
              <Button onClick={() => navigate("/guide")} className="mt-4">
                {t("guide.back")}
              </Button>
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
            <div className="mb-6 flex items-center justify-between">
              <Button
                onClick={() => navigate("/guide")}
                variant="ghost"
                className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("guide.backToGuides")}
              </Button>
              <Button onClick={handleShare} variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                {t("guide.share")}
              </Button>
            </div>

            {/* Article */}
            <Card className="overflow-hidden rounded-2xl border border-emerald-200/60 bg-white/95 shadow-xl backdrop-blur-sm dark:border-emerald-800/60 dark:bg-slate-800/95">
              {/* Header */}
              <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 p-8 dark:border-emerald-900 dark:from-emerald-950/50 dark:to-teal-950/50">
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
        {/* Simplified Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-40">
          <div className="absolute left-1/4 top-20 h-96 w-96 animate-pulse rounded-full bg-emerald-400/20 blur-3xl" />
          <div
            className="absolute bottom-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-teal-400/20 blur-3xl"
            style={{ animationDelay: "2s" }}
          />
        </div>

        {/* Header - компактнее */}
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
            <Button
              onClick={() => window.open("/guide-rss.xml", "_blank")}
              variant="outline"
              size="sm"
              className="border-orange-400 text-orange-600 hover:bg-orange-50 dark:border-orange-500 dark:text-orange-400"
            >
              <Rss className="mr-2 h-4 w-4" />
              {t("guide.rss")}
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Sidebar - компактнее */}
            <div className="lg:w-72">
              <div className="sticky top-20 space-y-4">
                {/* Search */}
                <Card className="rounded-xl border border-emerald-200/60 bg-white/95 p-4 backdrop-blur-sm dark:border-emerald-800/60 dark:bg-slate-800/95">
                  <div className="mb-3 flex items-center gap-2">
                    <Search className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("guide.search")}
                    </h3>
                  </div>
                  <Input
                    placeholder={
                      t("guide.searchPlaceholder") || "Search guides..."
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-emerald-200 dark:border-emerald-700 h-9"
                  />
                </Card>

                {/* Tags */}
                <Card className="rounded-xl border border-emerald-200/60 bg-white/95 p-4 backdrop-blur-sm dark:border-emerald-800/60 dark:bg-slate-800/95">
                  <div className="mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("guide.categories")}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((tag) => (
                      <Button
                        key={tag}
                        variant={
                          selectedTags.includes(tag) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => toggleTag(tag)}
                        className={
                          selectedTags.includes(tag)
                            ? "bg-emerald-600 hover:bg-emerald-700 h-7 text-xs"
                            : "h-7 text-xs"
                        }
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  {(selectedTags.length > 0 || searchQuery) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="mt-3 w-full h-8 text-xs"
                    >
                      {t("guide.clearFilters")}
                    </Button>
                  )}
                </Card>

                {/* Stats */}
                <Card className="rounded-xl border border-emerald-300/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 p-4 dark:border-emerald-800/60 dark:from-emerald-950/50 dark:to-teal-950/50">
                  <div className="mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                      {t("guide.stats")}
                    </h3>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        {t("guide.totalGuides")}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {posts.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        {t("guide.categories")}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {categories.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        {t("guide.showing")}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {filteredPosts.length}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <GuideCard
                      key={post.id}
                      post={post}
                      featured={featured.includes(post.id)}
                      onClick={() => navigate(`/guide/${post.slug}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <FileText className="mx-auto mb-4 h-16 w-16 text-slate-300 dark:text-slate-600" />
                  <h3 className="mb-2 text-xl font-bold text-slate-600 dark:text-slate-400">
                    {t("guide.noGuidesFound")}
                  </h3>
                  <p className="mb-4 text-sm text-slate-500 dark:text-slate-500">
                    {t("guide.tryDifferentFilters")}
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    {t("guide.clearFilters")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Guide;
