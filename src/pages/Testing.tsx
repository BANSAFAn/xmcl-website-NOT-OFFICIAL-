
import React, { useState } from 'react';

import { PageTransition } from "@/components/PageTransition";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
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
  Zap
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';
import { toast } from "sonner";
import { PlatformSelector } from '@/components/testing/PlatformSelector';
import { DownloadArtifacts } from '@/components/testing/DownloadArtifacts';

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

const Testing = () => {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState('windows');

  const { data: workflowRuns, isLoading, error } = useQuery({
    queryKey: ['workflow-runs'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/actions/runs?status=completed&per_page=10&event=push');
      if (!response.ok) throw new Error('Failed to fetch workflow runs');
      return response.json();
    }
  });

  const { data: artifactsData } = useQuery({
    queryKey: ['artifacts', workflowRuns?.workflow_runs?.[0]?.id],
    queryFn: async () => {
      if (!workflowRuns?.workflow_runs?.[0]?.id) return null;
      const response = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/actions/runs/${workflowRuns.workflow_runs[0].id}/artifacts`);
      if (!response.ok) throw new Error('Failed to fetch artifacts');
      return response.json();
    },
    enabled: !!workflowRuns?.workflow_runs?.[0]?.id
  });

  const getStatusIcon = (status: string, conclusion: string) => {
    if (status === 'completed' && conclusion === 'success') return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (status === 'completed' && conclusion === 'failure') return <XCircle className="w-6 h-6 text-red-500" />;
    return <AlertCircle className="w-6 h-6 text-yellow-500" />;
  };

  const latestRun = workflowRuns?.workflow_runs?.[0];

  if (isLoading) {  
    return (
      <PageTransition>
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
      </PageTransition>
    );
  }

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20">
          <div className="container mx-auto px-4 pt-8 pb-16">
            <div className="text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-400 text-lg">{t('common.error')}</p>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/20 dark:to-indigo-950/20">
        {/* Animated Background Elements */}
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
          {/* Header */}
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

          {/* Latest Build Status */}
          {latestRun && (
            <motion.div 
              className="mb-12 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-white/20 dark:border-slate-700/20 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(latestRun.status, latestRun.conclusion)}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                        {t('testing.buildStatus')} #{latestRun.run_number}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {latestRun.conclusion === 'success' ? 'Build Successful' : 'Build Failed'}
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
                    {latestRun.conclusion === 'success' ? 'Ready' : 'Failed'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <GitBranch className="w-6 h-6 text-indigo-500" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Branch</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{latestRun.head_branch}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <Code className="w-6 h-6 text-purple-500" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Commit</p>
                      <p className="font-mono font-semibold text-slate-800 dark:text-slate-200">{latestRun.head_sha.substring(0, 8)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <Clock className="w-6 h-6 text-pink-500" />
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{t('testing.lastUpdated')}</p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {new Date(latestRun.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => window.open(latestRun.html_url, '_blank')}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View on GitHub Actions
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Platform Selection */}
          <motion.div 
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <PlatformSelector 
              selectedPlatform={selectedPlatform}
              onSelectPlatform={setSelectedPlatform}
            />
          </motion.div>

          {/* Download Cards */}
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

          {/* Warning Notice */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-8 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/30 dark:via-amber-900/30 dark:to-orange-900/30 border-2 border-yellow-300/50 dark:border-yellow-600/50 rounded-2xl shadow-xl">
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
            </Card>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Testing;
