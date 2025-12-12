import React, { useState, useMemo, useCallback, Suspense, lazy } from "react";
import { useParams, useNavigate } from "@/hooks/useRouting";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  FileText,
  X,
  ArrowLeft,
  Clock,
  Filter,
  Rss,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "@/contexts/TranslationContext";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { motion, AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";

// Lazy load heavy MarkdownRenderer
const MarkdownRenderer = lazy(() => 
  import("@/components/MarkdownRenderer").then(m => ({ default: m.MarkdownRenderer }))
);

// Animated background orbs
const FloatingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-blob" />
    <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
    <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
  </div>
);

// Loading with beautiful animation
const LoadingSpinner = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-blue-200 dark:border-blue-800" />
        <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500" />
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">Loading blog posts...</p>
    </motion.div>
  </div>
);

// Beautiful Post Card with hover effects
const PostCard = React.memo(({ post, featured, onClick, index }: {
  post: any;
  featured: boolean;
  onClick: () => void;
  index: number;
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        onClick={onClick}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border-0 bg-white/80 backdrop-blur-sm p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 dark:bg-slate-800/80"
      >
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 group-hover:opacity-100" />
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ padding: '2px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />

        {featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-12 -top-12 h-24 w-24"
          >
            <div className="absolute bottom-6 right-6">
              <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                <Sparkles className="mr-1 h-3 w-3" />
                {t("blog.featured")}
              </Badge>
            </div>
          </motion.div>
        )}

        <div className="relative z-10">
          <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent dark:text-white">
            {post.title}
          </h3>

          <p className="mb-4 text-sm text-slate-600 line-clamp-2 dark:text-slate-400">
            {post.excerpt}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags?.slice(0, 3).map((tag: string) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleDateString()}
              </span>
            </div>
            <motion.div
              className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium"
              whileHover={{ x: 5 }}
            >
              Read
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});
PostCard.displayName = "PostCard";

// Blog post detail view with beautiful design
const PostDetail = ({ post, content, onBack }: {
  post: any;
  content: string;
  onBack: () => void;
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl"
    >
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 group text-blue-600 hover:text-blue-700 dark:text-blue-400"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        {t("blog.backToBlog")}
      </Button>

      <article className="rounded-3xl bg-white/90 backdrop-blur-xl p-8 md:p-12 shadow-2xl dark:bg-slate-800/90 border border-white/20">
        <header className="mb-10 border-b border-slate-200/50 pb-8 dark:border-slate-700/50">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            {post.title}
          </motion.h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
              <User className="h-4 w-4 text-blue-500" />
              {post.author}
            </span>
            <span className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
              <Calendar className="h-4 w-4 text-purple-500" />
              {new Date(post.date).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
              <Clock className="h-4 w-4 text-pink-500" />
              {Math.ceil((content?.length || 0) / 1000)} min read
            </span>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags?.map((tag: string) => (
              <Badge 
                key={tag} 
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        <Suspense fallback={
          <div className="space-y-4">
            <div className="animate-pulse h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
            <div className="animate-pulse h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
            <div className="animate-pulse h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6" />
          </div>
        }>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <MarkdownRenderer content={content || ""} />
          </div>
        </Suspense>
      </article>
    </motion.div>
  );
};

// Main Blog Content
const BlogContent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { posts, categories, featured, isLoading, fetchPostContent } = useBlogPosts();

  const { data: postContent } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: () => fetchPostContent(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags?.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const selectedPost = useMemo(() => 
    posts.find((p) => p.slug === id), [posts, id]
  );

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  if (isLoading) return <LoadingSpinner />;

  // Post detail view
  if (id && selectedPost) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8">
        <FloatingOrbs />
        <div className="container relative z-10 mx-auto px-4">
          <PostDetail
            post={selectedPost}
            content={postContent || ""}
            onBack={() => { window.location.hash = ''; }}
          />
        </div>
      </div>
    );
  }

  // Blog list view
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <FloatingOrbs />
      
      {/* Hero Header */}
      <header className="relative border-b border-white/20 bg-white/50 backdrop-blur-xl py-16 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium"
          >
            <Rss className="h-4 w-4" />
            Latest Updates
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            {t("blog.title")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            {t("blog.subtitle")}
          </motion.p>
        </div>
      </header>

      <div className="container relative z-10 mx-auto px-4 py-10">
        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-4 rounded-2xl border border-white/20"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder={t("blog.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl border-0 bg-white dark:bg-slate-700 shadow-sm"
            />
          </div>
          
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-xl h-12"
          >
            <Filter className="mr-2 h-4 w-4" />
            {t("blog.filterByCategory")}
          </Button>
        </motion.div>

        {/* Tags filter */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl p-5 border border-white/20">
                {categories.map((tag: string) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full ${selectedTags.includes(tag) ? "bg-gradient-to-r from-blue-500 to-purple-500 border-0" : ""}`}
                  >
                    {tag}
                  </Button>
                ))}
                {selectedTags.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedTags([])}
                    className="text-red-500 hover:text-red-600"
                  >
                    <X className="mr-1 h-3 w-3" />
                    Clear all
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <PostCard
                key={post.slug || post.id}
                post={post}
                featured={featured.includes(post.id)}
                onClick={() => window.location.hash = post.slug}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <FileText className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400 mb-2">
              {t("blog.noPostsFound")}
            </h3>
            <Button
              variant="link"
              onClick={() => { setSearchQuery(""); setSelectedTags([]); }}
              className="text-blue-600"
            >
              {t("common.clearFilters")}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function Blog() {
  return (
    <AppShell>
      <BlogContent />
    </AppShell>
  );
}
