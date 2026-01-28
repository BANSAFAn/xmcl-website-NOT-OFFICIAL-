import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar, Tag, Github, Download, ChevronDown, ChevronUp,
  ExternalLink, Search, Rocket, Copy, Check, Info, Sparkles, Filter
} from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { useTranslation } from '@/hooks/useTranslation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AppShell } from '@/components/AppShell';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- Types ---
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

// --- Helpers ---
const stripDownloadsSection = (md: string) => {
  if (!md) return '';
  let clean = md.replace(/(^|\n)#{1,6}\s*Downloads[\s\S]*/i, '');
  clean = clean.replace(/(\*\*Full Changelog\*\*.*)/g, '');
  return clean.trim();
};

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
};

const formatCount = (n: number) => (n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(1)}K` : `${n}`);

// --- Components ---

const ReleaseCard = ({ release, index }: { release: Release; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const rawBody = release.body || '';
  const cleanBody = stripDownloadsSection(rawBody);
  const isLong = cleanBody.length > 500;
  const displayBody = isExpanded ? cleanBody : cleanBody.slice(0, 500) + (isLong ? '...' : '');
  const downloads = release.assets?.reduce((s, a) => s + (a.download_count || 0), 0) || 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(release.html_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index < 3 ? index * 0.1 : 0 }}
      className="relative mb-12 last:mb-0 pl-8 md:pl-12 lg:pl-[120px]"
    >
      {/* Timeline Connector */}
      <div className="absolute left-[11px] lg:left-[calc(120px-11px)] top-8 bottom-[-48px] w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent lg:block hidden last:hidden" />
      
      {/* Timeline Dot */}
      <div className="absolute left-0 lg:left-[calc(120px-22px)] top-6 z-20">
        <motion.div 
          className={`w-[22px] h-[22px] rounded-full border-4 transition-all duration-300 flex items-center justify-center ${
            release.prerelease 
              ? 'bg-slate-900 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              : 'bg-slate-900 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
          }`}
          whileHover={{ scale: 1.2 }}
        >
          {release.prerelease ? (
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          )}
        </motion.div>
      </div>

      {/* Date (Desktop Left) */}
      <div className="hidden lg:block absolute left-0 top-6 w-[80px] text-right">
        <div className="text-sm font-bold text-slate-700 dark:text-slate-200">
          {new Date(release.published_at).getFullYear()}
        </div>
        <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {new Date(release.published_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Main Card */}
      <Card className="group relative overflow-hidden bg-white/80 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:border-indigo-500/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 backdrop-blur-xl rounded-2xl">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h2 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                  {release.name || release.tag_name}
                </h2>
                {release.prerelease ? (
                  <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    Pre-release
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    Stable
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 lg:hidden">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(release.published_at)}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Tag className="w-3.5 h-3.5" />
                  {release.tag_name}
                </span>
                {downloads > 0 && (
                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                    <Download className="w-3.5 h-3.5" />
                    {formatCount(downloads)}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="h-9 w-9 rounded-full text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-colors"
                title="Copy link"
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(release.html_url, '_blank')}
                className="h-9 w-9 rounded-full text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-colors"
              >
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className={`prose dark:prose-invert prose-sm sm:prose-base max-w-none
            prose-headings:text-indigo-900 dark:prose-headings:text-indigo-100 prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline
            prose-ul:list-disc prose-ul:pl-4
            prose-img:rounded-xl prose-img:shadow-lg
            prose-code:bg-slate-100 dark:prose-code:bg-black/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-indigo-600 dark:prose-code:text-indigo-300 prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
            text-slate-600 dark:text-slate-300 leading-relaxed
          `}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {displayBody}
            </ReactMarkdown>
          </div>

          {/* Show More / Less */}
          {isLong && (
            <div className="mt-6 flex justify-start">
               <Button
                variant="link"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-0 h-auto font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 group/btn"
              >
                {isExpanded ? 'Show Less' : 'Read Full Log'}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover/btn:translate-y-0.5'}`} />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

const LoadingState = () => (
  <div className="space-y-8 max-w-4xl mx-auto px-4 mt-12">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-8">
        <div className="hidden lg:block w-[120px] pt-6 flex-none">
          <div className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse ml-auto mb-2" />
          <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse ml-auto" />
        </div>
        <Card className="flex-1 p-8 bg-white/50 dark:bg-white/5 border-transparent">
          <div className="h-8 w-2/3 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
          </div>
        </Card>
      </div>
    ))}
  </div>
);

// --- Main Page Component ---

const ModernChangelogContent: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for sticky header effects
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['releases', filter, searchQuery],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases?per_page=10&page=${pageParam}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json() as Promise<Release[]>;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
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
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const releases = useMemo(() => {
    const all = data?.pages.flatMap(p => p) || [];
    return all.filter(r => {
      if (filter === 'stable' && r.prerelease) return false;
      if (filter === 'prerelease' && !r.prerelease) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return r.name?.toLowerCase().includes(q) || r.tag_name.toLowerCase().includes(q) || r.body?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [data, filter, searchQuery]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0b] text-foreground transition-colors duration-500 overflow-x-hidden">
        
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
           <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        </div>

        <main className="container mx-auto px-4 pb-32 relative z-10">
          
          {/* Header Section */}
          <div className="pt-24 pb-12 md:pt-32 md:pb-20 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/10 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-white/10 backdrop-blur-sm shadow-sm">
                <Sparkles className="w-3.5 h-3.5 mr-2 fill-current" />
                <span>What's New</span>
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter bg-gradient-to-b from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
                {t('changelog.title') || "Changelog"}
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                {t('changelog.subtitle') || "Discover the latest updates, improvements, and fixes that make X Minecraft Launcher better every day."}
              </p>
            </motion.div>
          </div>

          {/* Sticky Controls Bar */}
          <div className={`sticky top-24 z-40 transition-all duration-300 -mx-4 px-4 ${isScrolled ? 'py-4 translate-y-[-1rem]' : 'py-0'}`}>
            <motion.div 
              className={`max-w-4xl mx-auto p-2 rounded-2xl transition-all duration-300 ${
                isScrolled 
                  ? 'bg-white/80 dark:bg-[#121214]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl shadow-indigo-500/10' 
                  : 'bg-transparent'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-3">
                <div className={`relative flex-1 group transition-all duration-300 ${isScrolled ? '' : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm'}`}>
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search updates..."
                    className="w-full bg-transparent border-none pl-10 h-11 text-sm focus:ring-0 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-slate-200 rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className={`flex gap-1 p-1 overflow-x-auto ${isScrolled ? '' : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl shadow-sm'}`}>
                  {(['all', 'stable', 'prerelease'] as const).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                        filter === f
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline Content */}
          <div className="max-w-5xl mx-auto mt-12 md:mt-20">
            {status === 'pending' ? (
              <LoadingState />
            ) : status === 'error' ? (
              <div className="text-center py-20">
                <p className="text-red-500">Failed to load releases</p>
                <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">Retry</Button>
              </div>
            ) : (
              <div className="relative">
                {/* Vertical Line for Mobile */}
                <div className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500/20 via-purple-500/20 to-transparent lg:hidden" />

                <AnimatePresence mode="popLayout">
                  {releases.length > 0 ? (
                    releases.map((release, index) => (
                      <ReleaseCard key={release.id} release={release} index={index} />
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-32"
                    >
                      <Info className="w-16 h-16 mx-auto mb-6 text-slate-300 dark:text-slate-700" />
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No updates found</h3>
                      <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search query</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Load More trigger */}
                <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
                  {isFetchingNextPage && (
                    <div className="flex items-center gap-3 text-indigo-500 font-medium">
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Loading more updates...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

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
