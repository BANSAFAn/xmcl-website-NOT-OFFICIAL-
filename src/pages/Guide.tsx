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
  Share2,
  CheckCircle,
  Circle,
  Play,
  Zap,
  Target,
  Layers,
  Sparkles,
  TrendingUp,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Code,
  Terminal,
  Shield,
  Rocket,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/hooks/useTranslation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { motion, AnimatePresence } from "framer-motion";

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
  steps?: number;
  estimatedTime?: string;
}

interface GuideConfig {
  posts: GuidePost[];
  categories: string[];
  featured: string[];
}

const GuideLoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-900 dark:to-pink-900">
    <div className="relative">
      <div className="flex space-x-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <div className="mt-4 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <BookOpen className="w-12 h-12 text-indigo-500" />
        </motion.div>
      </div>
      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Loading amazing guides...</p>
    </div>
  </div>
);

const GuideCard = React.memo(
  ({
    post,
    featured,
    onClick,
    index,
  }: {
    post: GuidePost;
    featured: boolean;
    onClick: () => void;
    index: number;
  }) => {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    const difficultyConfig = {
      beginner: {
        color: "from-green-500 to-emerald-500",
        bg: "bg-green-500/10",
        text: "Beginner Friendly",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      intermediate: {
        color: "from-yellow-500 to-orange-500",
        bg: "bg-yellow-500/10",
        text: "Intermediate",
        icon: <Zap className="w-4 h-4" />,
      },
      advanced: {
        color: "from-red-500 to-pink-500",
        bg: "bg-red-500/10",
        text: "Advanced",
        icon: <Rocket className="w-4 h-4" />,
      },
    };

    const config = difficultyConfig[post.difficulty || "beginner"];

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card
          onClick={onClick}
          className="group relative overflow-hidden rounded-3xl border-0 bg-gradient-to-br from-white/90 to-purple-50/50 p-0 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:shadow-purple-500/25 dark:from-slate-800/90 dark:to-purple-900/50 dark:shadow-purple-500/25 cursor-pointer"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5" />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(99, 102, 241, 0.03) 10px, rgba(139, 92, 246, 0.03) 20px)`,
              }}
            />
          </div>

          {featured && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-4 top-4 z-20"
            >
              <Badge className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                <Sparkles className="h-3 w-3" />
                Featured
              </Badge>
            </motion.div>
          )}

          <div className="relative z-10 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`w-2 h-2 rounded-full ${
                        step <= (post.steps || 3)
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                          : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {post.steps || 3} steps
              </span>
            </div>
            {post.difficulty && (
              <Badge className={`${config.bg} ${config.color} text-white text-xs px-2 py-1`}>
                {config.icon}
                <span className="ml-1">{config.text}</span>
              </Badge>
            )}
            </div>

            <div className="mb-3 flex items-start gap-3">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className="mt-1"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${config.color} flex items-center justify-center text-white shadow-lg`}>
                  {post.difficulty === 'beginner' && <CheckCircle className="w-5 h-5" />}
                  {post.difficulty === 'intermediate' && <Zap className="w-5 h-5" />}
                  {post.difficulty === 'advanced' && <Rocket className="w-5 h-5" />}
                </div>
              </motion.div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>
            </div>

            <p className="mb-4 text-slate-600 dark:text-slate-400 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="mb-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.estimatedTime || post.readTime || "10 min"}</span>
                </div>
              </div>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400"
              >
                <span className="text-sm font-medium">Start Guide</span>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-indigo-200 text-indigo-600 dark:border-indigo-700 dark:text-indigo-400 text-xs"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <Badge variant="outline" className="text-xs text-slate-600">
                  +{post.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  },
);

GuideCard.displayName = "GuideCard";

const GuideFilterSidebar = React.memo(
  ({
    searchQuery,
    setSearchQuery,
    categories,
    selectedTags,
    toggleTag,
    clearFilters,
    stats,
    isOpen,
    onClose,
  }: any) => {
    const { t } = useTranslation();

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 h-screen w-80 overflow-y-auto bg-gradient-to-b from-white/95 to-purple-50/95 p-6 shadow-2xl backdrop-blur-xl dark:from-slate-900/95 dark:to-purple-900/95"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                Filter Guides
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Search className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Search
                  </h3>
                </div>
                <Input
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-indigo-200 bg-white dark:border-indigo-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Categories
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className={
                        selectedTags.includes(tag)
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "text-slate-600 dark:text-slate-400"
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
                    className="mt-3 w-full"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>

              <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 dark:border-indigo-700 dark:from-indigo-900/30 dark:to-purple-900/30">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Guide Stats
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Guides</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {stats.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Categories</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {stats.categories}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Showing</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {stats.showing}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  },
);

GuideFilterSidebar.displayName = "GuideFilterSidebar";

const Guide = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

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
            posts: [],
            categories: [],
            featured: [],
          };
        }
        return response.json();
      } catch {
        return {
          posts: [],
          categories: [],
          featured: [],
        };
      }
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });

  const { data: selectedPostContent } = useQuery({
    queryKey: ["guide-post", id],
    queryFn: async (): Promise<string> => {
      if (!id) return "";
      try {
        const response = await fetch(`/guide/${id}.md`);
        if (!response.ok) {
          return `# Guide Not Found\n\nThe requested guide could not be found.`;
        }
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
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  }, []);

  if (isLoading) return <GuideLoadingSpinner />;

  if (error) {
    return (
      <PageTransition>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-900 dark:to-pink-900">
          <Card className="max-w-md p-8 text-center">
            <div className="mb-4 text-6xl">😕</div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              Oops! Something went wrong
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Failed to load guides. Please try again later.
            </p>
          </Card>
        </div>
      </PageTransition>
    );
  }

  if (id && selectedPostContent) {
    const post = posts.find((p) => p.slug === id);

    if (!post) {
      return (
        <PageTransition>
          <div className="flex min-h-screen items-center justify-center">
            <Card className="p-8 text-center">
              <h2 className="text-2xl font-bold">Guide not found</h2>
              <Button onClick={() => navigate("/guide")} className="mt-4">
                Back to Guides
              </Button>
            </Card>
          </div>
        </PageTransition>
      );
    }

    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-900 dark:to-pink-900">
          <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex items-center justify-between">
                <Button
                  onClick={() => navigate("/guide")}
                  variant="ghost"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Guides
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden rounded-3xl border-0 bg-white/90 shadow-2xl backdrop-blur-xl dark:bg-slate-800/90">
                  <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 dark:border-indigo-800 dark:from-indigo-900/30 dark:to-purple-900/30">
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
                        <span>{post.estimatedTime || post.readTime || "10 min"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        <span>{post.steps || 5} steps</span>
                      </div>
                      {post.difficulty && (
                        <Badge className="bg-indigo-600 text-white capitalize">
                          {post.difficulty}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="bg-indigo-600 text-white">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-8">
                    <MarkdownRenderer content={selectedPostContent} />
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-900 dark:to-pink-900">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-20 h-96 w-96 animate-pulse rounded-full bg-indigo-500/10 blur-3xl"></div>
          <div
            className="absolute bottom-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl"
            style={{ animationDelay: "1s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 animate-pulse rounded-full bg-pink-500/10 blur-3xl" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="fixed left-4 top-24 z-40">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:from-indigo-700 hover:to-purple-700"
              size="lg"
            >
              {showFilters ? (
                <X className="h-5 w-5" />
              ) : (
                <Filter className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </div>

        <GuideFilterSidebar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
          clearFilters={clearFilters}
          stats={{
            total: posts.length,
            categories: categories.length,
            showing: filteredPosts.length,
          }}
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
        />

        <div className="relative z-10 py-20 text-center">
          <div className="container mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-7xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Interactive Guides
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-8 max-w-3xl text-xl text-slate-600 dark:text-slate-400"
            >
              Step-by-step tutorials to master X Minecraft Launcher
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => window.open("/guide-rss.xml", "_blank")}
                  variant="outline"
                  className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400"
                >
                  <Rss className="mr-2 h-4 w-4" />
                  RSS Feed
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-20">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post, index) => (
                <GuideCard
                  key={post.id}
                  post={post}
                  featured={featured.includes(post.id)}
                  onClick={() => navigate(`/guide/${post.slug}`)}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="py-20 text-center"
            >
              <FileText className="mx-auto mb-4 h-16 w-16 text-slate-400" />
              <h3 className="mb-2 text-2xl font-bold text-slate-600 dark:text-slate-400">
                No guides found
              </h3>
              <p className="text-slate-500">Try adjusting your filters</p>
              <Button onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Guide;
