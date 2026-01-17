import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar, Tag, Github, Download, ChevronDown, ChevronUp,
  ExternalLink, Search, Rocket, Copy, Check, Info
} from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { useTranslation } from '@/hooks/useTranslation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AppShell } from '@/components/AppShell';
import { motion, AnimatePresence } from 'framer-motion';

interface Asset {
  name: string;
  download_count: number;
  browser_download_url: string;
}

interface Release {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  body: string;
  assets: Asset[];
}

type FilterType = 'all' | 'stable' | 'prerelease';
type SortType = 'newest' | 'most-downloads';

const stripDownloadsSection = (md: string) => {
  if (!md) return '';
  let clean = md.replace(/(^|\n)#{1,6}\s*Downloads[\s\S]*/i, '');
  clean = clean.replace(/(\*\*Full Changelog\*\*.*)/g, '');
  return clean.trim();
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
const formatCount = (n: number) => (n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(1)}K` : `${n}`);

const ReleaseSkeleton = () => (
  <div className="relative pl-8 lg:pl-20 py-4">
    <div className="absolute left-2 lg:left-6 top-8 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900" />
    <Card className="p-6 bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm">
      <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-700/50 rounded mb-4 animate-pulse" />
      <div className="flex gap-2 mb-6">
        <div className="h-5 w-20 bg-slate-200 dark:bg-slate-700/30 rounded animate-pulse" />
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700/30 rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-700/20 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-slate-100 dark:bg-slate-700/20 rounded animate-pulse" />
        <div className="h-4 w-4/6 bg-slate-100 dark:bg-slate-700/20 rounded animate-pulse" />
      </div>
    </Card>
  </div>
);

const ModernChangelogContent: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error
  } = useInfiniteQuery({
    queryKey: ['releases', filter, sortBy, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases?per_page=15&page=${pageParam}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json() as Promise<Release[]>;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 15 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 10,
  });

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allReleases = useMemo(() => data?.pages.flatMap(page => page) || [], [data]);

  const processedReleases = useMemo(() => {
    let result = allReleases.filter(release => {
      if (filter === 'stable' && release.prerelease) return false;
      if (filter === 'prerelease' && !release.prerelease) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          release.name?.toLowerCase().includes(q) ||
          release.tag_name.toLowerCase().includes(q) ||
          release.body?.toLowerCase().includes(q)
        );
      }
      return true;
    });

    if (sortBy === 'most-downloads') {
      result.sort((a, b) => {
        const dA = a.assets.reduce((acc, curr) => acc + curr.download_count, 0);
        const dB = b.assets.reduce((acc, curr) => acc + curr.download_count, 0);
        return dB - dA;
      });
    }
    return result;
  }, [allReleases, filter, searchQuery, sortBy]);

  const handleCopyLink = (release: Release) => {
    navigator.clipboard.writeText(release.html_url);
    setCopiedId(release.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const latestVersion = allReleases[0]?.tag_name || "Latest";

  useEffect(() => {
    document.title = `Changelog - X Minecraft Launcher ${latestVersion}`;
  }, [latestVersion]);

  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "X Minecraft Launcher",
          "operatingSystem": "Windows, macOS, Linux",
          "applicationCategory": "GameApplication",
          "releaseNotes": "https://xmcl.app/changelog",
          "softwareVersion": latestVersion,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })
      }} />

      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] text-foreground transition-colors duration-300">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[100px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[100px]" />
        </div>

        <main className="container mx-auto px-4 py-16 relative z-10">

          <div className="max-w-4xl mx-auto mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-4 px-4 py-1 border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Rocket className="w-3 h-3 mr-2" />
                {t('changelog.whatsNew') || "What's New"}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
                {t('changelog.title') || "Changelog"}
              </h1>
              <p className="text-lg text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto">
                {t('changelog.subtitle') || "Stay up to date with the latest features, improvements, and bug fixes."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 p-2 bg-white/80 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl flex flex-col md:flex-row gap-3 shadow-xl shadow-slate-200/50 dark:shadow-black/20"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('changelog.search') || "Search versions..."}
                  className="w-full bg-transparent border-none pl-10 h-10 text-sm focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="h-px md:h-10 w-full md:w-px bg-slate-200 dark:bg-white/10" />

              <div className="flex gap-2 p-1 overflow-x-auto">
                {(['all', 'stable', 'prerelease'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filter === f
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          <section className="max-w-4xl mx-auto relative min-h-[500px]">
            <div className="absolute left-4 lg:left-8 top-4 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500/50 to-transparent opacity-30" />

            {status === 'pending' ? (
               Array.from({ length: 3 }).map((_, i) => <ReleaseSkeleton key={i} />)
            ) : status === 'error' ? (
              <div className="text-center py-20 bg-red-50 dark:bg-red-500/5 rounded-2xl border border-red-100 dark:border-red-500/20">
                <p className="text-red-600 dark:text-red-400 mb-4">Error loading releases.</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
              </div>
            ) : (
              <div className="space-y-12">
                {processedReleases.map((release, index) => {
                  const isExpanded = expandedId === release.id;
                  const rawBody = release.body || '';
                  const cleanBody = stripDownloadsSection(rawBody);
                  const isLong = cleanBody.length > 500;
                  const displayBody = isExpanded ? cleanBody : cleanBody.slice(0, 500) + (isLong ? '...' : '');
                  const downloads = release.assets?.reduce((s, a) => s + (a.download_count || 0), 0) || 0;

                  return (
                    <motion.article
                      key={release.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index < 5 ? index * 0.1 : 0 }}
                      className="relative pl-12 lg:pl-24 group"
                    >
                      <div className="absolute left-[11px] lg:left-[27px] top-8 z-10">
                        <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                          release.prerelease
                            ? 'bg-amber-100 dark:bg-amber-950 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                            : 'bg-indigo-100 dark:bg-indigo-950 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                        }`} />
                      </div>

                      <div className="hidden lg:block absolute left-[-80px] top-6 w-24 text-right pr-6">
                        <div className="text-sm font-bold text-slate-600 dark:text-slate-300">{new Date(release.published_at).getFullYear()}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{new Date(release.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                      </div>

                      <Card className="overflow-hidden bg-white dark:bg-[#121214] border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-all duration-300 shadow-lg dark:shadow-xl hover:shadow-indigo-500/5">

                        <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-3 flex-wrap">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                                  {release.name || release.tag_name}
                                </h2>
                                {release.prerelease ? (
                                  <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20">Pre-release</Badge>
                                ) : (
                                  <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20">Stable</Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-mono">
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-3 h-3" />
                                  <span className="lg:hidden">{formatDate(release.published_at)}</span>
                                  <span className="hidden lg:inline">{formatDate(release.published_at)}</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Tag className="w-3 h-3" />
                                  {release.tag_name}
                                </span>
                                {downloads > 0 && (
                                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400/80">
                                    <Download className="w-3 h-3" />
                                    {formatCount(downloads)}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:hover:text-white" onClick={() => handleCopyLink(release)} title="Copy link">
                                {copiedId === release.id ? <Check className="w-4 h-4 text-green-500 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 dark:hover:text-white" onClick={() => window.open(release.html_url, '_blank')}>
                                <Github className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 relative">
                          <div className={`prose dark:prose-invert prose-sm max-w-none
                            prose-headings:text-indigo-700 dark:prose-headings:text-indigo-200 prose-headings:font-semibold
                            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
                            prose-ul:list-disc prose-ul:pl-4
                            prose-code:bg-slate-100 dark:prose-code:bg-black/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-indigo-600 dark:prose-code:text-indigo-300 prose-code:before:content-none prose-code:after:content-none
                            text-slate-600 dark:text-slate-300
                          `}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {displayBody}
                            </ReactMarkdown>
                          </div>

                          {isLong && (
                            <div className={`mt-4 pt-4 border-t border-slate-100 dark:border-white/5 flex justify-center ${!isExpanded ? 'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-[#121214] via-white/90 dark:via-[#121214]/90 to-transparent pb-4 pt-16' : ''}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandedId(isExpanded ? null : release.id)}
                                className="group text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                              >
                                {isExpanded ? (
                                  <>Show Less <ChevronUp className="ml-2 w-4 h-4" /></>
                                ) : (
                                  <>Read Full Changelog <ChevronDown className="ml-2 w-4 h-4 group-hover:translate-y-0.5 transition-transform" /></>
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </Card>
                    </motion.article>
                  );
                })}

                <div ref={loadMoreRef} className="py-8 flex justify-center">
                  {isFetchingNextPage && <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />}
                  {!hasNextPage && processedReleases.length > 0 && (
                    <div className="text-slate-500 dark:text-slate-600 text-sm flex items-center gap-2">
                      <Check className="w-4 h-4" /> All releases loaded
                    </div>
                  )}
                </div>

                {processedReleases.length === 0 && !isFetchingNextPage && (
                   <div className="text-center py-20 opacity-50">
                     <Info className="w-12 h-12 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
                     <p className="text-slate-600 dark:text-slate-400">No releases match your filters.</p>
                   </div>
                )}
              </div>
            )}
          </section>
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
