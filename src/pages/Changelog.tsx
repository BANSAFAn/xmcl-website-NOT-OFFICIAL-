import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, ExternalLink, Tag, Github, Star, GitBranch } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import InteractiveDownloadSection from '@/components/InteractiveDownloadSection';
import { PageTransition } from '@/components/PageTransition';

const Changelog = () => {
  const { t } = useTranslation();
  const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);

  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['releases'],
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

  // Function to process release body and convert GitHub links to icons
  const processReleaseBody = (body: string) => {
    if (!body) return '';
    
    // Replace GitHub issue/PR links with icons and short format
    const githubLinkRegex = /https:\/\/github\.com\/[^\/]+\/[^\/]+\/(issues|pull)\/(\d+)/g;
    return body.replace(githubLinkRegex, (match, type, number) => {
      const isIssue = type === 'issues';
      return `[${isIssue ? '🐛' : '🔧'} #${number}](${match})`;
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-purple-900/30 dark:to-blue-900/30 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-400/30 to-blue-400/30 blur-3xl"
            animate={{
              x: [0, 200, -100, 0],
              y: [0, -150, 100, 0],
              scale: [1, 1.3, 0.8, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '5%', left: '5%' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-400/25 to-pink-400/25 blur-3xl"
            animate={{
              x: [0, -200, 150, 0],
              y: [0, 120, -80, 0],
              scale: [1, 0.7, 1.2, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
            style={{ top: '40%', right: '5%' }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-indigo-400/20 to-emerald-400/20 blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -100, 50, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 10
            }}
            style={{ bottom: '10%', left: '30%' }}
          />
        </div>
        
        <Navigation />
        
        <main className="container mx-auto px-4 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-4 mb-8"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Star className="w-8 h-8" />
              </motion.div>
              <motion.h1 
                className="text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Release Notes
              </motion.h1>
            </motion.div>
            <motion.p 
              className="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Discover the latest features, improvements, and bug fixes in XMCL. 
              Each release brings innovative solutions and enhanced user experience.
            </motion.p>
          </motion.div>

          {isLoading && (
            <div className="text-center py-32">
              <motion.div
                className="relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-20 h-20 border-6 border-purple-200 dark:border-purple-800 border-t-purple-500 rounded-full mx-auto mb-8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 w-20 h-20 border-6 border-transparent border-r-blue-500 rounded-full mx-auto"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-slate-600 dark:text-slate-400 text-xl mt-4">Loading releases...</p>
              </motion.div>
            </div>
          )}

          {error && (
            <div className="text-center py-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/30 border-2 border-red-200 dark:border-red-800 rounded-2xl p-10 max-w-lg mx-auto shadow-2xl"
              >
                <motion.div
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <ExternalLink className="w-8 h-8 text-white" />
                </motion.div>
                <p className="text-red-600 dark:text-red-400 mb-6 font-semibold text-lg">
                  {error.message === 'API rate limit exceeded' ? 
                    'GitHub API rate limit exceeded' : 
                    'Error loading releases'
                  }
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {error.message === 'API rate limit exceeded' ? 
                    'Please try again in a few minutes.' : 
                    'Please check your connection and try again.'
                  }
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                  className="text-lg px-6 py-3"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </motion.div>
            </div>
          )}

          {releases && (
            <div className="grid gap-10 max-w-6xl mx-auto">
              {releases.map((release: any, index: number) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 40, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100 
                  }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="p-10 hover:shadow-3xl transition-all duration-700 relative overflow-hidden backdrop-blur-xl bg-white/90 dark:bg-slate-800/90 border-2 border-white/20 dark:border-slate-700/20 rounded-3xl group">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={false}
                    />
                    
                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-4">
                            <motion.div
                              className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                              <GitBranch className="w-6 h-6" />
                            </motion.div>
                            <motion.h2 
                              className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                              whileHover={{ scale: 1.02 }}
                            >
                              {release.name || release.tag_name}
                            </motion.h2>
                            {release.prerelease && (
                              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-600 px-4 py-2 text-sm font-semibold">
                                Pre-release
                              </Badge>
                            )}
                            {!release.prerelease && index === 0 && (
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-xl px-4 py-2 text-sm font-semibold">
                                ✨ Latest
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-8 text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5" />
                              <span className="text-lg">
                                {new Date(release.published_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Tag className="w-5 h-5" />
                              <span className="text-lg font-mono">{release.tag_name}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-6 lg:mt-0">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              onClick={() => window.open(release.html_url, '_blank')}
                              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border-2 border-slate-200/50 dark:border-slate-600/50 hover:bg-white dark:hover:bg-slate-700 px-6 py-3 text-lg font-semibold"
                            >
                              <Github className="w-5 h-5 mr-2" />
                              View on GitHub
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                      
                      {release.body && (
                        <div className="mb-6">
                          <div className="prose prose-slate dark:prose-invert max-w-none">
                            <motion.div 
                              className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50 shadow-inner"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                            >
                              <pre className="whitespace-pre-wrap text-base leading-relaxed text-slate-700 dark:text-slate-300 font-mono overflow-x-auto">
                                {processReleaseBody(release.body)}
                              </pre>
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </main>

        <Footer onDownloadClick={() => setIsDownloadOpen(true)} />
        {isDownloadOpen && <InteractiveDownloadSection />}
      </div>
    </PageTransition>
  );
};

export default Changelog;