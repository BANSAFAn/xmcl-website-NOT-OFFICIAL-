
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
  BookOpen,
  Tag,
  Clock,
  User,
  ArrowRight,
  Sparkles,
  FileText,
  Star,
  Rss
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

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
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

interface GuideConfig {
  posts: GuidePost[];
  categories: string[];
  featured: string[];
}

const Guide = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: config, isLoading, error } = useQuery({
    queryKey: ['guide-config'],
    queryFn: async (): Promise<GuideConfig> => {
                      try {
                        const response = await fetch('/guides.json');
                        if (!response.ok) {
                          return {
                            posts: [
                              {
                                id: '1',
                                title: t('guide.gettingStartedWithXMCL') || 'Getting Started with XMCL',
                                excerpt: t('guide.learnBasics') || 'Learn the basics of using X Minecraft Launcher',
                                content: `# ${t('guide.gettingStarted') || 'Getting Started'}\n\n${t('guide.welcomeToXMCL') || 'Welcome to XMCL! This guide will help you get started.'}`,
                                author: t('guide.xmclTeam') || 'XMCL Team',
                                date: '2024-01-01',
                                tags: ['beginner', 'setup'],
                                slug: 'getting-started',
                                readTime: `5 ${t('guide.minRead') || 'min'}`,
                                difficulty: 'beginner'
                              }
                            ],
                            categories: ['beginner', 'setup', 'advanced'],
                            featured: ['1']
                          };
                        }
        return response.json();
      } catch (error) {
        return {
          posts: [],
          categories: [],
          featured: []
        };
      }
    }
  });

  const { data: selectedPost } = useQuery({
    queryKey: ['guide-post', id],
    queryFn: async (): Promise<string> => {
      if (!id) return '';
      try {
        const response = await fetch(`/guide/${id}.md`);
        if (!response.ok) return `# ${t('guide.guideNotFound')}\n\n${t('guide.guideNotFoundDescription')}`;
        return response.text();
      } catch (error) {
        return `# ${t('guide.errorLoadingGuide')}\n\n${t('guide.errorLoadingGuide')}`;
      }
    },
    enabled: !!id
  });

  const posts = config?.posts || [];
  const categories = config?.categories || [];
  const featured = config?.featured || [];

  const filteredPosts = useMemo(() => {
    if (!posts.length) return [];
    
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

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-red-500 to-rose-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-cyan-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-cyan-950/20 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="relative mb-8">
              <motion.div 
                className="w-20 h-20 border-4 border-muted rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-emerald-500 border-r-emerald-400 rounded-full mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="w-3 h-3 bg-emerald-500 rounded-full"
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
              {t('guide.loading')}
            </motion.p>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-teal-950/20">
          <div className="container mx-auto px-4 pt-8 pb-16">
            <div className="text-center">
              <p className="text-red-600 dark:text-red-400 text-lg">{t('common.error')}</p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // If viewing a specific guide
  if (id && selectedPost) {
    const post = posts.find(p => p.slug === id);
    
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-teal-950/20">
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
                      className="text-emerald-600 dark:text-emerald-400"
                    >
                      ← {t('guide.backToGuides')}
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
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime || `5 ${t('guide.minRead')}`}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-emerald-600 dark:text-emerald-400">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <MarkdownRenderer content={selectedPost} />
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Main guides listing page
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-teal-950/20">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div 
            className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl"
            animate={{ 
              scale: [1.1, 1, 1.1],
              rotate: -360,
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        
        
        <div className="relative z-10">
          {/* Header */}
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="container mx-auto px-4">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="relative">
                  <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-600 dark:text-emerald-400" />
                  <motion.div 
                    className="absolute -inset-2 bg-emerald-500/20 rounded-full blur-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  {t('guide.title')}
                </h1>
                <a href="/guide-rss.xml" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                    <Rss className="w-4 h-4 mr-2" />
                    RSS Feed
                  </Button>
                </a>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                {t('guide.subtitle')}
              </p>
            </div>
          </motion.div>

          <div className="container mx-auto px-4 pb-16">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <motion.div 
                className="lg:w-80"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="sticky top-24 space-y-6">
                  {/* Search */}
                  <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Search className="w-5 h-5 text-emerald-500" />
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{t('guide.searchGuides')}</h3>
                    </div>
                    <Input
                      placeholder={t('guide.searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/80 dark:bg-slate-700/80"
                    />
                  </Card>

                  {/* Tags Filter */}
                  <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Tag className="w-5 h-5 text-emerald-500" />
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{t('guide.filterByTags')}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                      >
                        <Filter className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <AnimatePresence>
                      {(showFilters || selectedTags.length > 0) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3"
                        >
                          <div className="flex flex-wrap gap-2">
                            {categories.map(tag => (
                              <Button
                                key={tag}
                                variant={selectedTags.includes(tag) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleTag(tag)}
                                className={`${
                                  selectedTags.includes(tag) 
                                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
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
                              {t('guide.clearFilters')}
                            </Button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Quick Stats */}
                  <Card className="p-6 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-200 dark:border-emerald-700">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{t('guide.guideStats')}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">{t('guide.totalGuides')}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{posts.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">{t('guide.categories')}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{categories.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600 dark:text-slate-400">{t('guide.showing')}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{filteredPosts.length}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>

              {/* Main Content */}
              <div className="flex-1">
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
                                   <Star className="w-4 h-4 text-yellow-500" />
                                   <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                                     {t('guide.featured')}
                                   </Badge>
                                 </div>
                              )}
                              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                {post.title}
                              </h3>
                            </div>
                            {post.difficulty && (
                              <Badge className={`bg-gradient-to-r ${getDifficultyColor(post.difficulty)} text-white text-xs`}>
                                {post.difficulty}
                              </Badge>
                            )}
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
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime || '5 min'}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="text-xs text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700"
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
                          onClick={() => window.location.href = `/guide/${post.slug}`}
                          className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white group"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                           {t('guide.readMore')}
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
                      {t('guide.noGuides')}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-500">
                      {t('guide.noGuidesDescription')}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Guide;
