import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { useQuery } from '@tanstack/react-query';
import { Star, Download, GitBranch, Activity, ArrowRight, Zap, ExternalLink, TrendingUp, Package, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onDownloadClick: () => void;
}

export const HeroSection = ({ onDownloadClick }: HeroSectionProps) => {
  const { t } = useTranslation();

  // Fetch GitHub repository data
  const { data: repoData, isLoading: repoLoading } = useQuery({
    queryKey: ['github-repo-stats'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher');
      if (!response.ok) throw new Error('Failed to fetch repository data');
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Fetch releases data for download count
  const { data: releasesData, isLoading: releasesLoading } = useQuery({
    queryKey: ['github-releases-stats'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases');
      if (!response.ok) throw new Error('Failed to fetch releases data');
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Calculate total downloads from all releases
  const totalDownloads = releasesData?.reduce((acc: number, release: any) => {
    return acc + (release.assets?.reduce((assetAcc: number, asset: any) => {
      return assetAcc + (asset.download_count || 0);
    }, 0) || 0);
  }, 0) || 0;

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const isLoading = repoLoading || releasesLoading;

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {t('home.openSourceStatus')}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('home.heroTitle')}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-light mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t('home.heroSubtitle')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/download">
                  <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg">
                    <span className="relative z-10 flex items-center gap-2">
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      {t('home.getStarted')}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onDownloadClick}
                  className="border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-6 text-lg"
                >
                  {t('home.learnMore')}
                </Button>
              </motion.div>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Badge variant="outline" className="px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <Package className="w-4 h-4 mr-1 text-blue-500" />
                {t('home.crossPlatform')}
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                {t('home.highPerformance')}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Downloads Card */}
            <motion.div
              className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <Download className="w-8 h-8 text-blue-500" />
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isLoading ? (
                  <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                ) : (
                  formatNumber(totalDownloads)
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{t('home.downloads')}</div>
            </motion.div>

            {/* Stars Card */}
            <motion.div
              className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/20 shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <ExternalLink className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isLoading ? (
                  <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                ) : (
                  formatNumber(repoData?.stargazers_count || 0)
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{t('home.stars')}</div>
            </motion.div>

            {/* Forks Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <GitBranch className="w-8 h-8 text-purple-500" />
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isLoading ? (
                  <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                ) : (
                  formatNumber(repoData?.forks_count || 0)
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{t('home.forks')}</div>
            </motion.div>

            {/* Issues Card */}
            <motion.div
              className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20 shadow-lg"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center justify-between mb-4">
                <Activity className="w-8 h-8 text-red-500" />
                <ExternalLink className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isLoading ? (
                  <div className="w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                ) : (
                  repoData?.open_issues_count || 0
                )}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{t('home.issues')}</div>
            </motion.div>
          </motion.div>
        </div>

        {/* GitHub Link */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <a
            href="https://github.com/Voxelum/x-minecraft-launcher"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            <Github className="w-5 h-5" />
            {t('home.viewOnGitHub')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
