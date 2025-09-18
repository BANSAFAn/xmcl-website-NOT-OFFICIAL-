import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search,
  Filter,
  PenTool,
  Tag,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  FileText,
  X,
  Menu
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Blog = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilterWidget, setShowFilterWidget] = useState(false);

  const { posts, categories, featured, isLoading, error, fetchPostContent } = useBlogPosts();

  const { data: selectedPostContent } = useQuery({
    queryKey: ['blog-post-content', id],
    queryFn: () => fetchPostContent(id!),
    enabled: !!id
  });

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-slate-950 dark:via-rose-950/20 dark:to-purple-950/20 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="relative mb-8">
              <motion.div 
                className="w-20 h-20 border-4 border-muted rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-rose-500 border-r-rose-400 rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="w-3 h-3 bg-rose-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>
            <motion.p 
              className="text-slate-600 dark:text-slate-400 text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t('blog.loading')}
            </motion.p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-slate-950 dark:via-rose-950/20 dark:to-purple-950/20">
          <div className="container mx-auto px-4 pt-8 pb-16">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 text-lg">{t('common.error')}</p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // If viewing a specific blog post
  if (id && selectedPostContent) {
    const post = posts.find(p => p.slug === id);
    
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-slate-950 dark:via-rose-950/20 dark:to-purple-950/20">
          <div className="container mx-auto px-4 pt-8 pb-16">
            <div className="max-w-4xl mx-auto">
              {post && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Button
                      onClick={() => window.history.back()}
                      variant="ghost"
                      className="text-rose-600 dark:text-rose-400"
                    >
                      ← {t('blog.backToBlog')}
                    </Button>
                  </div>
                  
                  <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-2xl">
                    <div className="mb-6">
                      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                        {post.title}
                      </h1>
                      <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-rose-600 dark:text-rose-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <MarkdownRenderer content={selectedPostContent} />
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Main blog listing page
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-slate-950 dark:via-rose-950/20 dark:to-purple-950/20">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: -360,
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        
        
        {/* Filter Widget Button */}
        <motion.div 
          className="fixed top-24 left-4 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={() => setShowFilterWidget(!showFilterWidget)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            {showFilterWidget ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </motion.div>

        {/* Filter Widget */}
        <AnimatePresence>
          {showFilterWidget && (
            <motion.div
              initial={{ opacity: 0, x: -300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              className="fixed top-24 left-20 z-40 w-80"
            >
              <Card className="p-6 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-2xl">
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Search className="w-5 h-5 text-rose-500" />
                       <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{t('blog.searchPosts')}</h3>
                     </div>
                     <Input
                       placeholder={t('blog.searchPlaceholder')}
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="bg-white/80 dark:bg-slate-700/80"
                     />
                  </div>

                  {/* Tags */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <Tag className="w-5 h-5 text-rose-500" />
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Filter by Tags</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {categories.map(tag => (
                        <Button
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTag(tag)}
                          className={`${
                            selectedTags.includes(tag) 
                              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white' 
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                    {selectedTags.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedTags([])}
                        className="w-full text-slate-600 dark:text-slate-400"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 rounded-xl p-4 border border-rose-200 dark:border-rose-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                       <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{t('blog.blogStats')}</h3>
                     </div>
                     <div className="space-y-2">
                       <div className="flex justify-between">
                         <span className="text-slate-600 dark:text-slate-400">{t('blog.totalPosts')}</span>
                         <span className="font-semibold text-slate-800 dark:text-slate-200">{posts.length}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-slate-600 dark:text-slate-400">{t('blog.categories')}</span>
                         <span className="font-semibold text-slate-800 dark:text-slate-200">{categories.length}</span>
                       </div>
                       <div className="flex justify-between">
                         <span className="text-slate-600 dark:text-slate-400">{t('blog.showing')}</span>
                         <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredPosts.length}</span>
                       </div>
                     </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center py-12 sm:py-16 lg:py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <div className="relative">
                  <PenTool className="w-12 h-12 sm:w-14 sm:h-14 text-rose-600 dark:text-rose-400" />
                  <motion.div 
                    className="absolute -inset-2 bg-rose-500/20 rounded-full blur-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {t('blog.title')}
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
                {t('blog.subtitle')}
              </p>
            </div>
          </motion.div>

          <div className="container mx-auto px-4 pb-16">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 group h-full flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {featured.includes(post.id) && (
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-yellow-500" />
                               <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                 {t('blog.featured')}
                               </Badge>
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                            {post.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map(tag => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="text-xs text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-700"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => window.location.href = `/blog/${post.slug}`}
                      className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white group"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Read Post
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredPosts.length === 0 && (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                 <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
                   {t('blog.noPostsFound')}
                 </h3>
                 <p className="text-slate-500 dark:text-slate-500">
                   {t('blog.noPostsDescription')}
                 </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog;
