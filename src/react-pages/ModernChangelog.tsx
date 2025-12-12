import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Github, Download, ChevronDown, ChevronUp, ExternalLink, Search, Filter, Rocket, Clock, TrendingUp } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { useTranslation } from '@/hooks/useTranslation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AppShell } from '@/components/AppShell';
import { motion, AnimatePresence } from 'framer-motion';

const stripDownloadsSection = (md: string) => {
  if (!md) return md;
  const pattern = /(^|\n)#{1,6}\s*Downloads[\s\S]*/i;
  return md.replace(pattern, '');
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
const formatCount = (n: number) => (n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(1)}K` : `${n}`);

type FilterType = 'all' | 'stable' | 'prerelease';
type SortType = 'newest' | 'most-downloads' | 'least-downloads';

const ModernChangelogContent: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['modern-releases'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases?per_page=30');
      if (!res.ok) throw new Error(res.status === 403 ? 'API rate limit exceeded' : 'Failed to fetch releases');
      return res.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  // Helper to calculate downloads for a release
  const getDownloads = (release: any) => 
    release.assets?.reduce((s: number, a: any) => s + (a.download_count || 0), 0) || 0;

  const filteredReleases = useMemo(() => {
    if (!releases) return [];
    
    let result = releases.filter((release: any) => {
      // Filter by type
      if (filter === 'stable' && release.prerelease) return false;
      if (filter === 'prerelease' && !release.prerelease) return false;
      
      // Filter by search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const name = (release.name || release.tag_name).toLowerCase();
        const tag = release.tag_name.toLowerCase();
        return name.includes(query) || tag.includes(query);
      }
      
      return true;
    });

    // Sort
    if (sortBy === 'most-downloads') {
      result = [...result].sort((a, b) => getDownloads(b) - getDownloads(a));
    } else if (sortBy === 'least-downloads') {
      result = [...result].sort((a, b) => getDownloads(a) - getDownloads(b));
    }
    // 'newest' is default from GitHub API
    
    return result;
  }, [releases, filter, searchQuery, sortBy]);

  const totalDownloads = useMemo(() => {
    if (!releases) return 0;
    return releases.reduce((total: number, release: any) => {
      return total + (release.assets?.reduce((s: number, a: any) => s + (a.download_count || 0), 0) || 0);

    }, 0);
  }, [releases]);

  return (
    <PageTransition>
      {/* SEO: JSON-LD for Software Releases */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "X Minecraft Launcher",
          "applicationCategory": "GameApplication",
          "operatingSystem": "Windows, macOS, Linux",
          "downloadUrl": "https://xmcl.app",
          "softwareVersion": releases?.[0]?.tag_name || "latest"
        })
      }} />
      
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <main className="container mx-auto px-4 py-12 relative z-10">
          {/* Hero Header */}
          <header className="mb-16 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-indigo-300 text-sm mb-6">
                <Rocket className="w-4 h-4" />
                <span>{t('changelog.latestUpdates') || 'Latest Updates'}</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-black mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                {t('changelog.title')}
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                {t('changelog.subtitle')}
              </p>

              {/* Stats */}
              {!isLoading && releases && (
                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{releases.length}</div>
                    <div className="text-sm text-slate-400">{t('changelog.releases') || 'Releases'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{formatCount(totalDownloads)}</div>
                    <div className="text-sm text-slate-400">{t('changelog.totalDownloads') || 'Total Downloads'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">{releases[0]?.tag_name}</div>
                    <div className="text-sm text-slate-400">{t('changelog.latestVersion') || 'Latest Version'}</div>
                  </div>
                </div>
              )}

              <Button 
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-2xl shadow-indigo-500/25"
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
              >
                <Github className="w-5 h-5 mr-2" /> {t('issues.viewOnGitHub')}
              </Button>
            </motion.div>
          </header>

          {/* Search & Sort */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-10"
          >
            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('changelog.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm whitespace-nowrap">{t('changelog.sortBy')}:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all appearance-none min-w-[180px]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  <option value="newest" className="bg-slate-800">📅 {t('changelog.sortNewest')}</option>
                  <option value="most-downloads" className="bg-slate-800">📈 {t('changelog.sortMostDownloads')}</option>
                  <option value="least-downloads" className="bg-slate-800">📉 {t('changelog.sortLeastDownloads')}</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400">{t('changelog.loading') || 'Loading releases...'}</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-2xl mx-auto text-center py-12">
              <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8">
                <div className="text-red-400 text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-white mb-2">{t('changelog.errorLoading')}</h3>
                <p className="text-slate-400 mb-6">{t('changelog.retryMessage')}</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                  className="border-red-500/50 text-red-300 hover:bg-red-500/10"
                >
                  <Github className="w-4 h-4 mr-2" /> {t('issues.viewOnGitHub')}
                </Button>
              </div>
            </div>
          )}

          {/* Releases Timeline */}
          {!isLoading && !error && (
            <section className="max-w-4xl mx-auto relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden lg:block" />
              
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredReleases.map((release: any, index: number) => {
                    const downloads = release.assets?.reduce((s: number, a: any) => s + (a.download_count || 0), 0) || 0;
                    const isExpanded = expandedId === release.id;
                    const body = stripDownloadsSection(release.body || '');
                    const preview = body.slice(0, 400) + (body.length > 400 ? '...' : '');

                    return (
                      <motion.article
                        key={release.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="relative lg:pl-20"
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-4 border-slate-950 hidden lg:block" />
                        
                        <Card className="overflow-hidden bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
                          <div className="p-6">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 flex-wrap mb-2">
                                  <h2 className="text-2xl font-bold text-white">
                                    {release.name || release.tag_name}
                                  </h2>
                                  {release.prerelease ? (
                                    <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                                      Pre-release
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                                      Stable
                                    </Badge>
                                  )}
                                </div>
                                
                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                  <time dateTime={release.published_at} className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(release.published_at)}
                                  </time>
                                  <span className="flex items-center gap-2">
                                    <Tag className="w-4 h-4" />
                                    <code className="px-2 py-0.5 bg-white/10 rounded text-xs">{release.tag_name}</code>
                                  </span>
                                  <span className="flex items-center gap-2 text-green-400">
                                    <Download className="w-4 h-4" />
                                    {formatCount(downloads)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open(release.html_url, '_blank')}
                                  className="border-white/20 text-slate-300 hover:bg-white/10"
                                >
                                  <ExternalLink className="w-4 h-4 mr-1" /> GitHub
                                </Button>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="prose prose-invert prose-sm max-w-none">
                              <div className="bg-white/5 rounded-xl p-4 text-slate-300">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {isExpanded ? body : preview}
                                </ReactMarkdown>
                              </div>
                            </div>

                            {/* Expand/Collapse */}
                            {body.length > 400 && (
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : release.id)}
                                className="mt-4 flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-4 h-4" />
                                    {t('changelog.showLess') || 'Show less'}
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-4 h-4" />
                                    {t('changelog.showMore') || 'Show more'}
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </Card>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* No Results */}
              {filteredReleases.length === 0 && !isLoading && (
                <div className="text-center py-16">
                  <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{t('changelog.noResults') || 'No releases found'}</h3>
                  <p className="text-slate-400">{t('changelog.tryDifferentSearch') || 'Try a different search term or filter'}</p>
                </div>
              )}
            </section>
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default function ModernChangelog() {
  return (
    <AppShell>
      <ModernChangelogContent />
    </AppShell>
  );
}