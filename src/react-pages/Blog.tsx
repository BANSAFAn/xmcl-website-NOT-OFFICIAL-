import React, { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "@/hooks/useRouting";
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Tag,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  FileText,
  X,
  Menu,
  Rss,
  Clock,
  TrendingUp,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/contexts/TranslationContext";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";

// Safe translation hook that works in SSR
const useSafeTranslation = () => {
  try {
    return useTranslation();
  } catch (e) {
    // Return dummy t function for SSR
    return { t: (key: string) => key };
  }
};

const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
    <div className="relative">
      <div className="h-24 w-24 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
      <div className="absolute left-0 top-0 h-24 w-24 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500"></div>
    </div>
  </div>
);

const PostCard = React.memo(
  ({
    post,
    index,
    featured,
    onClick,
  }: {
    post: any;
    index: number;
    featured: boolean;
    onClick: () => void;
  }) => {
const { t } = useSafeTranslation();
    const readTime = Math.ceil((post.content?.length || 0) / 1000);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ y: -5 }}
      >
        <Card
          className="group relative h-full overflow-hidden rounded-2xl border-0 bg-white/90 p-6 shadow-lg backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl dark:bg-slate-800/90"
        >
          {featured && (
            <div className="absolute right-4 top-4 z-10">
              <Badge className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                <Sparkles className="h-3 w-3" />
                {t("blog.featured")}
              </Badge>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 group-hover:opacity-100" />

          <div className="relative z-10 flex h-full flex-col">
            <h3 className="mb-3 text-2xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-100 dark:group-hover:text-blue-400">
              {post.title}
            </h3>

            <p className="mb-4 flex-1 text-slate-600 dark:text-slate-400 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  {readTime} {t("blog.minutes")}
                </span>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag: string) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-blue-200 text-blue-600 dark:border-blue-700 dark:text-blue-400"
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

            <Button
              onClick={onClick}
              className="group/btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
            >
              <FileText className="mr-2 h-4 w-4" />
              {t("blog.readMore")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  },
);

PostCard.displayName = "PostCard";

const FilterSidebar = React.memo(
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
const { t } = useSafeTranslation();

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 z-50 h-screen w-80 overflow-y-auto bg-white/95 p-6 shadow-2xl backdrop-blur-xl dark:bg-slate-900/95"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {t("blog.filterByCategory")}
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
                  <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {t("common.search")}
                  </h3>
                </div>
                <Input
                  placeholder={t("blog.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {t("blog.tags")}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((tag: string) => (
                    <Button
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleTag(tag)}
                      className={
                        selectedTags.includes(tag)
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-slate-600 dark:text-slate-400"
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
                    {t("common.clearFilters")}
                  </Button>
                )}
              </div>

              <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-4 dark:border-blue-700 dark:from-blue-900/30 dark:to-purple-900/30">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {t("blog.blogStats")}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="">{t("blog.totalPosts")}</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {stats.total}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      {t("blog.categories")}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {stats.categories}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">
                      {t("blog.showing")}
                    </span>
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

FilterSidebar.displayName = "FilterSidebar";

const BlogContent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { posts, categories, featured, isLoading, error, fetchPostContent } =
    useBlogPosts();

  const { data: selectedPostContent } = useQuery({
    queryKey: ["blog-post-content", id],
    queryFn: () => fetchPostContent(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });

  const filteredPosts = useMemo(() => {
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
    }
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <PageTransition>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
          <Card className="max-w-md p-8 text-center">
            <div className="mb-4 text-6xl">😕</div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-slate-100">
              {t("ui.error")}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {t("blog.errorLoading")}
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
              <h2 className="text-2xl font-bold">{t("blog.noPostsFound")}</h2>
              <Button onClick={() => navigate("/blog")} className="mt-4">
                {t("blog.backToBlog")}
              </Button>
            </Card>
          </div>
        </PageTransition>
      );
    }

    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="container mx-auto px-4 py-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-8 flex items-center justify-between">
                <Button
                  onClick={() => navigate("/blog")}
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("blog.backToBlog")}
                </Button>
                <Button onClick={handleShare} variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  {t("common.share")}
                </Button>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden rounded-3xl border-0 bg-white/90 shadow-2xl backdrop-blur-xl dark:bg-slate-800/90">
                  <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:border-slate-700 dark:from-blue-900/30 dark:to-purple-900/30">
                    <h1 className="mb-4 text-5xl font-black text-slate-900 dark:text-slate-100">
                      {post.title}
                    </h1>
                    <div className="mb-4 flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        <span className="font-semibold">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        <span>
                          {Math.ceil((selectedPostContent?.length || 0) / 1000)}{" "}
                          {t("blog.minutes")}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag: string) => (
                        <Badge key={tag} className="bg-blue-600 text-white">
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-20 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-2xl" />
          <div
            className="absolute bottom-20 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-2xl"
            style={{ animationDelay: "1s" }}
          />
        </div>

        <div className="fixed left-4 top-24 z-40">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              {showFilters ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </motion.div>
        </div>

        <FilterSidebar
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              {t("blog.title")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-8 max-w-3xl text-xl text-slate-600 dark:text-slate-400"
            >
              {t("blog.subtitle")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => window.open("/rss.xml", "_blank")}
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400"
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
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                  index={filteredPosts.indexOf(post)}
                  featured={featured.includes(post.id)}
                  onClick={() => navigate(`/blog/${post.slug}`)}
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
                {t("blog.noPostsFound")}
              </h3>
              <p className="text-slate-500">{t("blog.tryAdjustingSearch")}</p>
              <Button onClick={clearFilters} className="mt-4">
                {t("common.clearFilters")}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default function Blog() {
  return (
    <AppShell>
      <BlogContent />
    </AppShell>
  );
}
