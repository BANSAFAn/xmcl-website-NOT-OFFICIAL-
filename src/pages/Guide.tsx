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
  Sparkles,
  FileText,
  Star,
  Rss,
  ArrowLeft,
  TrendingUp,
  X,
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

// Loading Component
const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
    <div className="relative">
      <div className="h-24 w-24 rounded-full border-4 border-emerald-200 dark:border-emerald-800"></div>
      <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-emerald-500 border-r-teal-500"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <BookOpen className="h-10 w-10 animate-pulse text-emerald-500" />
      </div>
    </div>
  </div>
);

// Guide Card Component
const GuideCard = React.memo(
  ({
    post,
    index,
    featured,
    onClick,
  }: {
    post: GuidePost;
    index: number;
    featured: boolean;
    onClick: () => void;
  }) => {
    const { t } = useTranslation();

    const getDifficultyColor = (difficulty?: string) => {
      switch (difficulty) {
        case "beginner":
          return "from-green-500 to-emerald-500";
        case "intermediate":
          return "from-yellow-500 to-orange-500";
        case "advanced":
          return "from-red-500 to-rose-500";
        default:
          return "from-emerald-500 to-teal-500";
      }
    };

    return (
      <Card className="group relative h-full overflow-hidden rounded-2xl border-2 border-emerald-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 dark:border-emerald-700/50 dark:bg-slate-800/80 dark:hover:border-emerald-400/50">
        {/* Featured Badge */}
        {featured && (
          <div className="absolute right-4 top-4 z-10">
            <Badge className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
              <Star className="h-3 w-3 fill-current" />
              {t("guide.featured")}
            </Badge>
          </div>
        )}

        {/* Difficulty Badge */}
        {post.difficulty && (
          <div className="absolute left-4 top-4 z-10">
            <Badge
              className={`bg-gradient-to-r ${getDifficultyColor(post.difficulty)} text-white shadow-lg capitalize`}
            >
              {post.difficulty}
            </Badge>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/5 group-hover:via-teal-500/5 group-hover:to-cyan-500/5 group-hover:opacity-100" />

        <div className="relative z-10 flex h-full flex-col pt-8">
          {/* Title */}
          <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-slate-100 dark:group-hover:text-emerald-400">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 flex-1 text-slate-600 dark:text-slate-400 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readTime || "5 min"}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag: string) => (
              <Badge
                key={tag}
                variant="outline"
                className="border-emerald-200 text-emerald-600 dark:border-emerald-700 dark:text-emerald-400"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-slate-600">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Read Button */}
          <Button
            onClick={onClick}
            className="group/btn w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transition-all hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl"
          >
            <FileText className="mr-2 h-4 w-4" />
            {t("guide.readMore")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
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
      } catch (error) {
        return { posts: [], categories: [], featured: [] };
      }
    },
    staleTime: 10 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const { data: selectedPost } = useQuery({
    queryKey: ["guide-post", id],
    queryFn: async (): Promise<string> => {
      if (!id) return "";
      try {
        const response = await fetch(`/guide/${id}.md`);
        if (!response.ok)
          return `# Guide Not Found\n\nThe requested guide could not be found.`;
        return response.text();
      } catch (error) {
        return `# Error\n\nFailed to load guide content.`;
      }
    },
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });

  const posts = config?.posts || [];
  const categories = config?.categories || [];
  const featured = config?.featured || [];

  const filteredPosts = useMemo(() => {
    if (!posts.length) return [];

    return posts.filter((post) => {
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

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
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("{guide.copy");
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <PageTransition>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
          <Card className="max-w-md p-8 text-center">
            <div className="mb-4 text-6xl">😕</div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("guide.error")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {"guide.error"}
            </p>
          </Card>
        </div>
      </PageTransition>
    );
  }

  // Single Guide View
  if (id) {
    const post = posts.find((p) => p.slug === id);

    if (!post) {
      return (
        <PageTransition>
          <div className="flex min-h-screen items-center justify-center">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold">{"guide.notfound"}н</h2>
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
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
          <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-4xl">
              {/* Back Button */}
              <div className="mb-8 flex items-center justify-between">
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
              <Card className="overflow-hidden rounded-3xl border-2 border-emerald-200/50 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-emerald-700/50 dark:bg-slate-800/90">
                {/* Header */}
                <div className="border-b border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 dark:border-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30">
                  <h1 className="mb-4 text-5xl font-black text-slate-900 dark:text-slate-100">
                    {post.title}
                  </h1>
                  <div className="mb-4 flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="font-semibold">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      <span>{post.readTime || "5 min"}</span>
                    </div>
                    {post.difficulty && (
                      <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white capitalize">
                        {post.difficulty}
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} className="bg-emerald-600 text-white">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {selectedPost && <MarkdownRenderer content={selectedPost} />}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Guides List
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        {/* Animated Background */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-20 h-96 w-96 animate-pulse rounded-full bg-emerald-500/10 blur-3xl" />
          <div
            className="absolute bottom-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-teal-500/10 blur-3xl"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Header */}
        <div className="relative z-10 py-20 text-center">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center justify-center gap-4">
              <BookOpen className="h-14 w-14 text-emerald-600 dark:text-emerald-400" />
              <h1 className="text-7xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {t("guide.title")}
              </h1>
            </div>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-slate-600 dark:text-slate-400">
              {t("guide.subtitle")}
            </p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => window.open("/guide-rss.xml", "_blank")}
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400"
              >
                <Rss className="mr-2 h-4 w-4" />
                {t("guide.rss")}
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-20">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-80">
              <div className="sticky top-24 space-y-6">
                {/* Search */}
                <Card className="overflow-hidden rounded-2xl border-2 border-emerald-200/50 bg-white/90 p-6 backdrop-blur-xl dark:border-emerald-700/50 dark:bg-slate-800/90">
                  <div className="mb-4 flex items-center gap-3">
                    <Search className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                      {t("guide.search")}
                    </h3>
                  </div>
                  <Input
                    placeholder="Найти гайд..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-emerald-200 dark:border-emerald-700"
                  />
                </Card>

                {/* Tags */}
                <Card className="overflow-hidden rounded-2xl border-2 border-emerald-200/50 bg-white/90 p-6 backdrop-blur-xl dark:border-emerald-700/50 dark:bg-slate-800/90">
                  <div className="mb-4 flex items-center gap-3">
                    <Tag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                      {t("guide.tag")}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((tag: string) => (
                      <Button
                        key={tag}
                        variant={
                          selectedTags.includes(tag) ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => toggleTag(tag)}
                        className={
                          selectedTags.includes(tag)
                            ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                            : ""
                        }
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="mt-3 w-full"
                    >
                      {t("guide.clear")}
                    </Button>
                  )}
                </Card>

                {/* Stats */}
                <Card className="overflow-hidden rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 dark:border-emerald-700 dark:from-emerald-900/30 dark:to-teal-900/30">
                  <div className="mb-4 flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-bold text-slate-900 dark:text-slate-100">
                      {t("guide.stats")}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">
                        {t("guide.total")}
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
                        {t("guide.seen")}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {filteredPosts.length}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className="flex-1">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {filteredPosts.map((post, index) => (
                    <GuideCard
                      key={post.id}
                      post={post}
                      index={index}
                      featured={featured.includes(post.id)}
                      onClick={() => navigate(`/guide/${post.slug}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <FileText className="mx-auto mb-4 h-16 w-16 text-slate-400" />
                  <h3 className="mb-2 text-2xl font-bold text-slate-600 dark:text-slate-400">
                    {t("guide.noGuidesFound")}
                  </h3>
                  <p className="mb-4 text-slate-500">
                    Попробуйте изменить параметры поиска
                  </p>
                  <Button onClick={clearFilters}>Сбросить фильтры</Button>
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
