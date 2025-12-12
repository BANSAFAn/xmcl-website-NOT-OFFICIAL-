import React, { useState, useMemo, memo } from 'react';
import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
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
  Monitor
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from "sonner";
import { PlatformSelector } from '@/components/testing/PlatformSelector';
import { DownloadArtifacts } from '@/components/testing/DownloadArtifacts';
import { AppShell } from '@/components/AppShell';

// Мемоизированные компоненты для предотвращения лишних ререндеров
const StatusIcon = memo(({ status, conclusion }: { status: string, conclusion: string }) => {
  if (status === 'completed' && conclusion === 'success') return <CheckCircle className="w-6 h-6 text-green-500" />;
  if (status === 'completed' && conclusion === 'failure') return <XCircle className="w-6 h-6 text-red-500" />;
  return <AlertCircle className="w-6 h-6 text-yellow-500" />;
});

StatusIcon.displayName = 'StatusIcon';

const LoadingState = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="relative mb-8">
          <motion.div
            className="w-20 h-20 border-4 border-muted rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-indigo-500 border-r-indigo-400 rounded-full mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="w-3 h-3 bg-indigo-500 rounded-full"
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
          {t('testing.loading')}
        </motion.p>
      </div>
    </div>
  );
});

LoadingState.displayName = 'LoadingState';

const ErrorState = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20">
      <div className="container mx-auto px-4 pt-8 pb-16">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 dark:text-red-400 text-lg">{t('common.error')}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

ErrorState.displayName = 'ErrorState';

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
}

const TestingContent = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState('windows');
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);

  // Оптимизированные запросы с кэшированием
  const { data: workflowRuns, isLoading, error } = useQuery({
    queryKey: ['workflow-runs'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/actions/runs?status=completed&per_page=10&event=push');
      if (!response.ok) throw new Error('Failed to fetch workflow runs');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Кэширование на 5 минут
    refetchOnWindowFocus: false,
  });

  const { data: artifactsData } = useQuery({
    queryKey: ['artifacts', workflowRuns?.workflow_runs?.[0]?.id],
    queryFn: async () => {
      if (!workflowRuns?.workflow_runs?.[0]?.id) return null;
      const response = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/actions/runs/${workflowRuns.workflow_runs[0].id}/artifacts`);
      if (!response.ok) throw new Error('Failed to fetch artifacts');
      return response.json();
    },
    enabled: !!workflowRuns?.workflow_runs?.[0]?.id,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Мемоизация последнего запуска для предотвращения лишних вычислений
  const latestRun = useMemo(() => workflowRuns?.workflow_runs?.[0], [workflowRuns]);

  // Определение иконки платформы
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'windows': return <Monitor className="w-5 h-5" />;
      case 'macos': return <Cpu className="w-5 h-5" />;
      case 'linux': return <HardDrive className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20">
        {/* Анимированный фон с оптимизацией производительности */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
            animate={{
              rotate: -360,
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
          {/* Заголовок с улучшенной анимацией */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="relative">
                <Activity className="w-14 h-14 text-indigo-600 dark:text-indigo-400" />
                <motion.div
                  className="absolute -inset-2 bg-indigo-500/20 rounded-full blur-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('testing.title')}
              </h1>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {t('testing.subtitle')}
            </p>
          </motion.div>

          {/* Статус последней сборки с улучшенным дизайном */}
          {latestRun && (
            <motion.div
              className="mb-12 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/20 to-transparent rounded-bl-full"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      >
                        <StatusIcon status={latestRun.status} conclusion={latestRun.conclusion} />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                          {t('testing.buildStatus')} #{latestRun.run_number}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {latestRun.conclusion === 'success' ? t('testing.buildSuccessful') : t('testing.buildFailed')}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`px-4 py-2 text-lg ${
                        latestRun.conclusion === 'success'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                          : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                      }`}
                    >
                      {latestRun.conclusion === 'success' ? t('testing.ready') : t('testing.failed')}
                    </Badge>
                  </div>

                  <AnimatePresence>
                    {isDetailsExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <motion.div
                            className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <GitBranch className="w-6 h-6 text-indigo-500" />
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{t('testing.branch')}</p>
                              <p className="font-semibold text-slate-800 dark:text-slate-200">{latestRun.head_branch}</p>
                            </div>
                          </motion.div>
                          <motion.div
                            className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Code className="w-6 h-6 text-purple-500" />
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{t('testing.commit')}</p>
                              <p className="font-mono font-semibold text-slate-800 dark:text-slate-200">{latestRun.head_sha.substring(0, 8)}</p>
                            </div>
                          </motion.div>
                          <motion.div
                            className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                            whileHover={{ scale: 1.02, x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Clock className="w-6 h-6 text-pink-500" />
                            <div>
                              <p className="text-sm text-slate-600 dark:text-slate-400">{t('testing.lastUpdated')}</p>
                              <p className="font-semibold text-slate-800 dark:text-slate-200">
                                {new Date(latestRun.updated_at).toLocaleDateString()}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
                      variant="outline"
                      className="flex-1 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    >
                      {isDetailsExpanded ? t('testing.hideDetails') : t('testing.showDetails')}
                    </Button>
                    <Button
                      onClick={() => window.open(latestRun.html_url, '_blank')}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      {t('testing.viewOnGitHub')}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Выбор платформы с улучшенным дизайном */}
          <motion.div
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-xl">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 text-center">{t('testing.selectPlatform')}</h2>
              <div className="grid grid-cols-3 gap-4">
                {['windows', 'macos', 'linux'].map((platform) => (
                  <motion.div
                    key={platform}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedPlatform === platform ? "default" : "outline"}
                      className={`w-full h-20 flex flex-col gap-2 ${
                        selectedPlatform === platform
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                          : 'border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                      }`}
                      onClick={() => setSelectedPlatform(platform)}
                    >
                      {getPlatformIcon(platform)}
                      <span className="capitalize">{platform === 'macos' ? 'macOS' : platform}</span>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Карточки загрузки с улучшенным дизайном */}
          {latestRun && latestRun.conclusion === 'success' && artifactsData && (
            <motion.div
              className="mb-12 max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <DownloadArtifacts
                artifacts={artifactsData.artifacts || []}
                selectedPlatform={selectedPlatform}
                runId={latestRun.id}
              />
            </motion.div>
          )}

          {/* Улучшенное предупреждение */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-8 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/30 dark:via-amber-900/30 dark:to-orange-900/30 border-2 border-yellow-300/50 dark:border-yellow-600/50 rounded-2xl shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-full"></div>
              <div className="relative">
                <div className="flex items-start gap-6">
                  <motion.div
                    className="p-3 rounded-xl bg-yellow-500 text-white shadow-lg flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(234, 179, 8, 0.3)",
                        "0 0 40px rgba(234, 179, 8, 0.5)",
                        "0 0 20px rgba(234, 179, 8, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AlertCircle className="w-8 h-8" />
                  </motion.div>
                  <div className="flex-1">
                    <motion.h3
                      className="text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      ⚠️ {t('testing.warningTitle')}
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed text-lg mb-4">
                        {t('testing.warningDescription')}
                      </p>
                      <ul className="text-yellow-700 dark:text-yellow-300 space-y-2 text-lg">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          {t('testing.useAtOwnRisk')}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          {t('testing.notRecommendedProduction')}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                          {t('testing.reportIssuesGitHub')}
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default function Testing() {
  return (
    <AppShell>
      <TestingContent />
    </AppShell>
  );
}
