import React, { useState, useMemo, memo } from 'react';
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  ExternalLink,
  GitBranch,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  Code,
  Zap,
  Package,
  Cpu,
  HardDrive,
  Monitor,
  AlertTriangle,
  Info,
  Terminal,
  ShieldAlert
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from "sonner";
import { PlatformSelector } from '@/components/testing/PlatformSelector';
import { DownloadArtifacts } from '@/components/testing/DownloadArtifacts';
import { AppShell } from '@/components/AppShell';

// Types
interface WorkflowRun {
  id: number;
  status: string;
  conclusion: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  head_branch: string;
  head_sha: string;
  run_number: number;
  display_title: string;
  actor: {
    login: string;
    avatar_url: string;
  };
}

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (conclusion: string) => {
    switch (conclusion) {
      case 'success': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'failure': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    }
  };

  const StatusIcon = ({ conclusion }: { conclusion: string }) => {
    switch (conclusion) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failure': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'windows': return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
      );
      case 'macos': return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.21-1.96 1.07-3.11-1.05.05-2.31.74-3.03 1.59-.67.78-1.26 2.05-1.11 3.17 1.17.09 2.36-.75 3.07-1.65z"/></svg>
      );
      case 'linux': return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M13.13 18c-.26-.18-.59-.33-1-.46a4.3 4.3 0 0 1-1-.44 3.73 3.73 0 0 1-.78-.66 2.3 2.3 0 0 1-.36-.61c-.08-.22-.12-.47-.11-.77v-.21a1.69 1.69 0 0 1 .15-.65 2.5 2.5 0 0 1 .42-.64 3.78 3.78 0 0 1 .63-.56c.14-.1.27-.19.38-.26l.16-.1.17-.07.13-.04h.16l.16.03.11.04.1.06a.8.8 0 0 1 .28.32l.06.14a1.76 1.76 0 0 1 .05.45v.69a1.69 1.69 0 0 1-.16.65 2.42 2.42 0 0 1-.42.63 3.6 3.6 0 0 1-.62.56c-.25.17-.5.31-.76.43zm-2-2.52a.76.76 0 0 0-.25.07.67.67 0 0 0-.21.15.6.6 0 0 0-.13.2.73.73 0 0 0-.05.23v.2a1 1 0 0 0 .09.4 1 1 0 0 0 .23.32 1.6 1.6 0 0 0 .34.25c.13.07.27.13.41.17v-1.7a1.43 1.43 0 0 0-.43-.29zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 21.8c-2.07 0-3.96-.34-5.69-1a10.9 10.9 0 0 1-4.83-3.6 8.35 8.35 0 0 1-1.63-4.84 8.7 8.7 0 0 1 1-4.08 10.43 10.43 0 0 1 3.2-3.6A11.53 11.53 0 0 1 12 2.2a11.53 11.53 0 0 1 7.9 2.51 10.4 10.4 0 0 1 3.22 3.6 8.7 8.7 0 0 1 1.05 4.09 8.38 8.38 0 0 1-1.62 4.83 10.92 10.92 0 0 1-4.84 3.6c-1.74.63-3.63.97-5.71.97z"/></svg>
      );
      default: return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* SEO Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "X Minecraft Launcher (Testing)",
          "applicationCategory": "GameApplication",
          "operatingSystem": "Windows, macOS, Linux",
          "releaseNotes": "Development builds and nightly releases",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })
      }} />

      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        
        {/* Header */}
        <header className="mb-20 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-sm mb-8 font-medium">
              <AlertTriangle className="w-4 h-4" />
              <span>Experimental Builds</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
              {t('testing.title')}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {t('testing.subtitle')}
            </p>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Content - Builds List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-indigo-400" />
                Latest Builds
              </h2>
            <div className="flex gap-2">
                 {['windows', 'macos', 'linux'].map(p => (
                   <button
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`p-2 rounded-lg transition-all ${selectedPlatform === p ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                   >
                     {getPlatformIcon(p)}
                   </button>
                 ))}
            </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : error ? (
               <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl text-center">
                 <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                 <p className="text-red-400">Failed to load builds</p>
               </div>
            ) : (
              <div className="space-y-4">
                {workflowRuns?.workflow_runs?.map((run: WorkflowRun) => (
                  <motion.div
                    key={run.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-all"
                  >
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
                          <h3 className="text-lg font-bold text-white truncate mb-2 group-hover:text-indigo-400 transition-colors">
                            {run.display_title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1.5">
                              <img src={run.actor.avatar_url} alt="" className="w-5 h-5 rounded-full" />
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
                          onClick={() => setExpandedRunId(expandedRunId === run.id ? null : run.id)}
                          className={`rounded-xl transition-all ${expandedRunId === run.id ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-400 hover:text-white'}`}
                        >
                           <Download className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedRunId === run.id && (
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
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Info & Warning */}
          <div className="space-y-6">
            
            {/* Warning Card */}
            <div className="p-6 bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 rounded-xl">
                  <ShieldAlert className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-500 text-lg mb-2">Warning</h3>
                  <p className="text-amber-200/80 text-sm leading-relaxed">
                    These are development builds. They may contain bugs, incomplete features, or cause data issues. Always backup your data before using testing builds.
                  </p>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-indigo-400" />
                How to Install
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">1</div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Download Artifact</h4>
                    <p className="text-slate-400 text-xs mt-1">Select your platform and download the latest successful build artifact.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm border border-purple-500/30">2</div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Extract & Run</h4>
                    <p className="text-slate-400 text-xs mt-1">Extract the archive. The executable is portable and can be run directly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-sm border border-pink-500/30">3</div>
                  <div>
                    <h4 className="text-white font-medium text-sm">Report Bugs</h4>
                    <p className="text-slate-400 text-xs mt-1">If you find issues, please report them on our GitHub Issues page.</p>
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

// Export wrappper
export const Testing = () => (
  <AppShell>
    <TestingContent />
  </AppShell>
);

export default Testing;
