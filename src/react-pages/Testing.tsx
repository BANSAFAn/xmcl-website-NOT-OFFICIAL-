import React, { useState, memo } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  ExternalLink,
  GitBranch,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  AlertTriangle,
  Terminal,
  ShieldAlert
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';
import { DownloadArtifacts } from '@/components/testing/DownloadArtifacts';
import { AppShell } from '@/components/AppShell';



const StatusIcon = memo(({ conclusion }: { conclusion: string }) => {
  switch (conclusion) {
    case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
    case 'failure': return <XCircle className="w-5 h-5 text-red-500" />;
    default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
  }
});

const PlatformIcon = memo(({ platform }: { platform: string }) => {
  switch (platform) {
    case 'windows': return (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
    );
    case 'macos': return (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.78-1.26 2.05-1.11 3.17 1.17.09 2.36-.75 3.07-1.65z"/></svg>
    );
    case 'linux': return (
      // ИСПРАВЛЕНО: Нормальный логотип Tux (Пингвин)
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1-10c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm-3 4c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm6 0c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z" opacity="0"/>
        <path d="M12.03 0C5.396 0 .024 5.362.024 11.988S5.384 24 12.03 24c6.634 0 11.964-5.362 11.964-11.988S18.664 0 12.03 0zm4.512 20.328c-1.2 1.392-3.528 1.152-4.488.984-1.008.168-3.36.36-4.512-.984-.96-1.152.024-3.84 1.392-4.968-1.08-2.352-.336-4.92 1.776-6.504.624-.48 2.112-.624 2.808-.024.696-.6 2.184-.456 2.808.024 2.112 1.584 2.856 4.152 1.776 6.504 1.32 1.128 2.424 3.816 1.344 4.968h-2.904z"/>
      </svg>
    );
    default: return <Package className="w-5 h-5" />;
  }
});

// Memoized Background to prevent re-renders
const Background = memo(() => (
  <div className="absolute inset-0 pointer-events-none transform-gpu">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl will-change-transform" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl will-change-transform" style={{ top: '50%' }} />
  </div>
));

// Extracted Item Component to optimize list rendering
const WorkflowItem = memo(({ run, expanded, onToggle, selectedPlatform }: any) => {
  const getStatusColor = (conclusion: string) => {
    switch (conclusion) {
      case 'success': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'failure': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="group relative bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden hover:bg-white/60 dark:hover:bg-white/[0.07] transition-all content-visibility-auto">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <StatusIcon conclusion={run.conclusion} />
              <span className="font-mono text-sm text-slate-400">#{run.run_number}</span>
              <span className={`px-2 py-0.5 rounded text-xs border ${getStatusColor(run.conclusion)}`}>
                {run.conclusion}
              </span>
            </div>
            <h3 className="text-lg font-bold text-foreground dark:text-white truncate mb-2 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
              {run.display_title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <img src={run.actor.avatar_url} alt="" className="w-5 h-5 rounded-full" loading="lazy" />
                <span>{run.actor.login}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{formatDate(run.updated_at)}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <GitBranch className="w-4 h-4" />
                <span>{run.head_branch}</span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(run.id)}
            className={`rounded-xl transition-all ${expanded ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-black/20"
          >
            <div className="p-6">
              <DownloadArtifacts runId={run.id} platform={selectedPlatform} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// --- Main Content ---

const TestingContent = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState('windows');
  const [expandedRunId, setExpandedRunId] = useState<number | null>(null);

  const { data: workflowRuns, isLoading, error } = useQuery({
    queryKey: ['workflow-runs'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/actions/runs?status=completed&per_page=10&event=push');
      if (!response.ok) throw new Error('Failed to fetch workflow runs');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen relative overflow-hidden bg-background dark:bg-gradient-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950 transition-colors duration-300">
      <Background />

      <div className="container mx-auto px-4 py-24 relative z-10">

        {/* Header - Optimized for LCP (Removed framer-motion initial animations) */}
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-sm mb-8 font-medium">
              <AlertTriangle className="w-4 h-4" />
              <span>Experimental Builds</span>
            </div>

            {/* Standard HTML for immediate paint */}
            <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-white dark:via-indigo-200 dark:to-purple-200 bg-clip-text text-transparent">
              {t('testing.title')}
            </h1>
            <p className="text-xl text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t('testing.subtitle')}
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content - Builds List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground dark:text-white flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-indigo-400" />
                Latest Builds
              </h2>
              <div className="flex gap-2">
                {['windows', 'macos', 'linux'].map(p => (
                  <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`p-2 rounded-lg transition-all ${selectedPlatform === p ? 'bg-indigo-600 text-white' : 'bg-black/5 dark:bg-white/5 text-muted-foreground dark:text-slate-400 hover:bg-black/10 dark:hover:bg-white/10'}`}
                    aria-label={`Select ${p} platform`}
                  >
                    <PlatformIcon platform={p} />
                  </button>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {/* Skeleton optimized for CLS matching actual card height */}
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-[140px] bg-white/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : error ? (
                <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-400">Failed to load builds</p>
                </div>
            ) : (
              <div className="space-y-4">
                {workflowRuns?.workflow_runs?.map((run: any) => (
                  <WorkflowItem
                    key={run.id}
                    run={run}
                    expanded={expandedRunId === run.id}
                    onToggle={(id: number) => setExpandedRunId(expandedRunId === id ? null : id)}
                    selectedPlatform={selectedPlatform}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Info & Warning */}
          <div className="space-y-6 content-visibility-auto">

            {/* Warning Card */}
            <div className="p-6 bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <ShieldAlert className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-600 dark:text-amber-500 text-lg mb-2">Warning</h3>
                  <p className="text-amber-700/80 dark:text-amber-200/80 text-sm leading-relaxed">
                    These are development builds. They may contain bugs, incomplete features, or cause data issues. Always backup your data before using testing builds.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div className="p-6 bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl">
              <h3 className="font-bold text-foreground dark:text-white text-lg mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                How to Install
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">1</div>
                  <div>
                    <h4 className="text-foreground dark:text-white font-medium text-sm">Download Artifact</h4>
                    <p className="text-muted-foreground dark:text-slate-400 text-xs mt-1">Select your platform and download the latest successful build artifact.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30">2</div>
                  <div>
                    <h4 className="text-foreground dark:text-white font-medium text-sm">Extract & Run</h4>
                    <p className="text-muted-foreground dark:text-slate-400 text-xs mt-1">Extract the archive. The executable is portable and can be run directly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-sm border border-pink-500/30">3</div>
                  <div>
                    <h4 className="text-foreground dark:text-white font-medium text-sm">Report Bugs</h4>
                    <p className="text-muted-foreground dark:text-slate-400 text-xs mt-1">If you find issues, please report them on our GitHub Issues page.</p>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full mt-6 border-white/10 hover:bg-white/5 text-slate-300"
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/issues', '_blank')}
              >
                Report Issue <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export const Testing = () => (
  <AppShell>
    <TestingContent />
  </AppShell>
);

export default Testing;
