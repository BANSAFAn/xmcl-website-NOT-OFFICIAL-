import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Tag, Github, Star, GitBranch, Download, Clock, User } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { PageTransition } from '@/components/PageTransition';
import { useTranslation } from '@/hooks/useTranslation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ModernChangelog = () => {
  const { t } = useTranslation();

  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['modern-releases'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases');
      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('API rate limit exceeded');
        }
        throw new Error('Failed to fetch releases');
      }
      return response.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const formatDownloadCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 relative overflow-hidden">
        {/* Advanced Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-indigo-400/15 to-purple-400/15 blur-3xl"
            animate={{
              x: [0, 300, -100, 0],
              y: [0, -200, 150, 0],
              scale: [1, 1.5, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '0%', left: '0%' }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl"
            animate={{
              x: [0, -250, 120, 0],
              y: [0, 180, -90, 0],
              scale: [1, 0.6, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 8
            }}
            style={{ top: '30%', right: '0%' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-400/15 to-cyan-400/15 blur-3xl"
            animate={{
              x: [0, 150, -75, 0],
              y: [0, -120, 60, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 15
            }}
            style={{ bottom: '5%', left: '20%' }}
          />
        </div>
        
        <Navigation />
        
        <main className="container mx-auto px-4 py-12 relative z-10">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-6 mb-12"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="p-5 rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 0 30px rgba(99, 102, 241, 0.3)",
                      "0 0 60px rgba(168, 85, 247, 0.4)",
                      "0 0 30px rgba(99, 102, 241, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Star className="w-10 h-10" />
                </motion.div>
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-full blur-xl opacity-75"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              <motion.h1 
                className="text-8xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Changelog
              </motion.h1>
            </motion.div>
            <motion.p 
              className="text-2xl text-slate-600 dark:text-slate-300 max-w-5xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Explore the evolution of XMCL with detailed release notes, new features, and improvements. 
              Every update brings us closer to the perfect Minecraft launcher experience.
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                variant="outline"
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                className="text-lg px-8 py-3 border-2 border-indigo-300 hover:border-indigo-500 dark:border-indigo-600 dark:hover:border-indigo-400"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </motion.div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-40">
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-24 h-24 border-8 border-indigo-200 dark:border-indigo-800 border-t-indigo-500 rounded-full mx-auto mb-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 w-24 h-24 border-8 border-transparent border-r-purple-500 rounded-full mx-auto"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 w-20 h-20 border-6 border-transparent border-b-pink-500 rounded-full mx-auto"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-slate-600 dark:text-slate-400 text-2xl mt-6 font-medium">Loading release history...</p>
              </motion.div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-40">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:from-red-900/20 dark:via-rose-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-12 max-w-2xl mx-auto shadow-2xl"
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-8"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.3)",
                      "0 0 40px rgba(244, 63, 94, 0.4)",
                      "0 0 20px rgba(239, 68, 68, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ExternalLink className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">
                  {error.message === 'API rate limit exceeded' ? 
                    'GitHub API Rate Limit Exceeded' : 
                    'Failed to Load Releases'
                  }
                </h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  {error.message === 'API rate limit exceeded' ? 
                    'The GitHub API rate limit has been reached. Please try again in a few minutes.' : 
                    'Unable to fetch release information. Please check your connection and try again.'
                  }
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                  className="text-lg px-8 py-4 border-2 border-red-300 hover:border-red-500 dark:border-red-600 dark:hover:border-red-400"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Releases on GitHub
                </Button>
              </motion.div>
            </div>
          )}

          {/* Releases List */}
          {releases && (
            <div className="space-y-12 max-w-7xl mx-auto">
              {releases.map((release: any, index: number) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 50, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <Card className="relative overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 border-2 border-white/30 dark:border-slate-700/30 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 group">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      initial={false}
                    />
                    
                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-3xl"
                      style={{
                        background: "linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.1), transparent)",
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    
                    <CardContent className="relative z-10 p-10">
                      {/* Release Header */}
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10">
                        <div className="flex-1">
                          <div className="flex items-center gap-6 mb-6">
                            <motion.div
                              className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <GitBranch className="w-8 h-8" />
                            </motion.div>
                            <motion.h2 
                              className="text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                              whileHover={{ scale: 1.02 }}
                            >
                              {release.name || release.tag_name}
                            </motion.h2>
                            {release.prerelease && (
                              <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-xl px-4 py-2 text-sm font-bold">
                                🚧 Pre-release
                              </Badge>
                            )}
                            {!release.prerelease && index === 0 && (
                              <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white border-0 shadow-xl px-4 py-2 text-sm font-bold animate-pulse">
                                ✨ Latest Stable
                              </Badge>
                            )}
                          </div>
                          
                          {/* Release Meta Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-slate-50/80 dark:bg-slate-700/50 rounded-2xl backdrop-blur-sm">
                              <div className="p-2 bg-indigo-500 rounded-xl">
                                <Calendar className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Released</p>
                                <p className="font-bold text-slate-800 dark:text-slate-200">
                                  {new Date(release.published_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-slate-50/80 dark:bg-slate-700/50 rounded-2xl backdrop-blur-sm">
                              <div className="p-2 bg-purple-500 rounded-xl">
                                <Tag className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Version</p>
                                <p className="font-bold font-mono text-slate-800 dark:text-slate-200">{release.tag_name}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-slate-50/80 dark:bg-slate-700/50 rounded-2xl backdrop-blur-sm">
                              <div className="p-2 bg-pink-500 rounded-xl">
                                <User className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Author</p>
                                <p className="font-bold text-slate-800 dark:text-slate-200">{release.author?.login || 'XMCL Team'}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 p-4 bg-slate-50/80 dark:bg-slate-700/50 rounded-2xl backdrop-blur-sm">
                              <div className="p-2 bg-cyan-500 rounded-xl">
                                <Download className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Downloads</p>
                                <p className="font-bold text-slate-800 dark:text-slate-200">
                                  {formatDownloadCount(release.assets?.reduce((sum: number, asset: any) => sum + asset.download_count, 0) || 0)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              onClick={() => window.open(release.html_url, '_blank')}
                              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-xl"
                            >
                              <Github className="w-5 h-5 mr-2" />
                              View Release
                            </Button>
                          </motion.div>
                          {release.assets && release.assets.length > 0 && (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                onClick={() => window.open(release.assets[0].browser_download_url, '_blank')}
                                className="px-8 py-3 text-lg font-semibold border-2 border-indigo-300 hover:border-indigo-500 dark:border-indigo-600 dark:hover:border-indigo-400"
                              >
                                <Download className="w-5 h-5 mr-2" />
                                Download
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                      
                      {/* Release Notes */}
                      {release.body && (
                        <motion.div 
                          className="mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <motion.div
                              className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"
                              animate={{ scaleY: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            Release Notes
                          </h3>
                          <div className="bg-gradient-to-br from-slate-50/80 via-white/80 to-slate-100/80 dark:from-slate-800/80 dark:via-slate-700/80 dark:to-slate-800/80 p-8 rounded-2xl border-2 border-slate-200/50 dark:border-slate-600/50 shadow-inner backdrop-blur-sm">
                            <div className="prose prose-slate dark:prose-invert max-w-none prose-lg prose-headings:text-slate-900 dark:prose-headings:text-white prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-code:bg-slate-200 dark:prose-code:bg-slate-700 prose-code:px-2 prose-code:py-1 prose-code:rounded">
                              <ReactMarkdown 
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  h1: ({children}) => <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-600 pb-3">{children}</h1>,
                                  h2: ({children}) => <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">{children}</h2>,
                                  h3: ({children}) => <h3 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100">{children}</h3>,
                                  ul: ({children}) => <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">{children}</ul>,
                                  ol: ({children}) => <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">{children}</ol>,
                                  li: ({children}) => <li className="leading-relaxed">{children}</li>,
                                  p: ({children}) => <p className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">{children}</p>,
                                  code: ({children, className}) => {
                                    const isInline = !className;
                                    return isInline ? (
                                      <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded text-sm font-mono">{children}</code>
                                    ) : (
                                      <code className={className}>{children}</code>
                                    );
                                  },
                                  pre: ({children}) => (
                                    <pre className="bg-slate-900 dark:bg-slate-800 text-slate-100 p-4 rounded-xl overflow-x-auto border border-slate-700">
                                      {children}
                                    </pre>
                                  ),
                                  a: ({href, children}) => (
                                    <a 
                                      href={href} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium underline decoration-2 underline-offset-2"
                                    >
                                      {children}
                                    </a>
                                  ),
                                  blockquote: ({children}) => (
                                    <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-r-lg">
                                      {children}
                                    </blockquote>
                                  )
                                }}
                              >
                                {release.body}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Assets Section */}
                      {release.assets && release.assets.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <motion.div
                              className="w-2 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"
                              animate={{ scaleY: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                            Downloads ({release.assets.length})
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {release.assets.slice(0, 6).map((asset: any, assetIndex: number) => (
                              <motion.div
                                key={asset.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: assetIndex * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                              >
                                <Card className="p-4 bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50 hover:shadow-lg transition-all duration-300">
                                  <CardContent className="p-0">
                                    <div className="flex items-center justify-between mb-3">
                                      <h4 className="font-semibold text-slate-900 dark:text-white truncate mr-2">{asset.name}</h4>
                                      <Badge variant="outline" className="text-xs">
                                        {(asset.size / 1024 / 1024).toFixed(1)} MB
                                      </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-3">
                                      <span>{formatDownloadCount(asset.download_count)} downloads</span>
                                      <span>{new Date(asset.updated_at).toLocaleDateString()}</span>
                                    </div>
                                    <Button
                                      size="sm"
                                      onClick={() => window.open(asset.browser_download_url, '_blank')}
                                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                                    >
                                      <Download className="w-4 h-4 mr-2" />
                                      Download
                                    </Button>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default ModernChangelog;