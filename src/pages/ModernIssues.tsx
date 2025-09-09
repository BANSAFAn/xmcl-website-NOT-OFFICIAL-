import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SafeSelect, SafeSelectItem } from '@/components/ui/safe-select';
import { Navigation } from '@/components/Navigation';
import { PageTransition } from '@/components/PageTransition';
import { useTranslation } from '@/hooks/useTranslation';
import { useGitHubApi } from '@/hooks/useGitHubApi';
import { 
  Search, Github, ExternalLink, MessageCircle, Calendar, User, 
  AlertTriangle, CheckCircle2, Plus, TrendingUp, Bug, Lightbulb, 
  Zap, GitBranch, Clock, Tag
} from 'lucide-react';

export default function ModernIssues() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const { issues, stats, loading, error } = useGitHubApi();

  // Filter only issues (exclude pull requests)
  const issuesOnly = issues?.filter((issue: any) => !issue.pull_request) || [];

  const filteredIssues = issuesOnly.filter((issue: any) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.body?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.user.login.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLabels = selectedLabels.length === 0 || 
                         selectedLabels.some(label => 
                           issue.labels.some((issueLabel: any) => issueLabel.name === label)
                         );
    
    return matchesSearch && matchesLabels;
  });

  const uniqueLabels = issuesOnly.reduce((acc: string[], issue: any) => {
    if (Array.isArray(issue.labels)) {
      issue.labels.forEach((label: any) => {
        if (label && 
            label.name && 
            typeof label.name === 'string' && 
            label.name.trim() !== "" && 
            !acc.includes(label.name)) {
          acc.push(label.name);
        }
      });
    }
    return acc;
  }, []);

  const getStateIcon = (state: string) => {
    return state === 'open' ? (
      <AlertTriangle className="w-5 h-5 text-emerald-500" />
    ) : (
      <CheckCircle2 className="w-5 h-5 text-violet-500" />
    );
  };

  const getIssueTypeIcon = (labels: any[]) => {
    const hasLabel = (name: string) => labels.some(label => label.name.toLowerCase().includes(name));
    
    if (hasLabel('bug')) return <Bug className="w-4 h-4 text-red-500" />;
    if (hasLabel('enhancement') || hasLabel('feature')) return <Lightbulb className="w-4 h-4 text-amber-500" />;
    if (hasLabel('performance')) return <Zap className="w-4 h-4 text-blue-500" />;
    return <GitBranch className="w-4 h-4 text-slate-500" />;
  };

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
          <Navigation />
          <div className="flex items-center justify-center min-h-screen px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <motion.div
                className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Error Loading Issues</h2>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-slate-950 dark:via-violet-950/20 dark:to-blue-950/20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-violet-400/20 to-purple-400/20 blur-3xl"
            animate={{
              x: [0, 100, -50, 0],
              y: [0, -80, 40, 0],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            style={{ top: '10%', left: '10%' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-400/15 to-cyan-400/15 blur-3xl"
            animate={{
              x: [0, -120, 60, 0],
              y: [0, 100, -50, 0],
              scale: [1, 0.8, 1.3, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 5 }}
            style={{ bottom: '10%', right: '10%' }}
          />
        </div>

        <Navigation />
        
        <div className="relative z-10 pt-20">
          {/* Hero Section */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-12"
              >
                <motion.div
                  className="inline-flex items-center gap-4 mb-8"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Bug className="w-8 h-8" />
                  </motion.div>
                   <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                     {t('issues.title')}
                   </h1>
                </motion.div>
                
                 <motion.p 
                   className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.4 }}
                 >
                   {t('issues.subtitle')}
                 </motion.p>

                {/* Stats Cards */}
                {stats && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 hover:scale-105 transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between mb-4">
                            <AlertTriangle className="w-8 h-8 text-emerald-500" />
                            <TrendingUp className="w-6 h-6 text-slate-400" />
                          </div>
                           <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stats.openIssues}</div>
                           <div className="text-sm text-slate-600 dark:text-slate-400">{t('issues.openIssues')}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 hover:scale-105 transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between mb-4">
                            <CheckCircle2 className="w-8 h-8 text-violet-500" />
                            <TrendingUp className="w-6 h-6 text-slate-400" />
                          </div>
                           <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stats.closedIssues}</div>
                           <div className="text-sm text-slate-600 dark:text-slate-400">{t('issues.closedIssues')}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 hover:scale-105 transition-all duration-300">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between mb-4">
                            <MessageCircle className="w-8 h-8 text-blue-500" />
                            <TrendingUp className="w-6 h-6 text-slate-400" />
                          </div>
                           <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stats.openIssues + stats.closedIssues}</div>
                           <div className="text-sm text-slate-600 dark:text-slate-400">{t('issues.allIssues')}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                )}

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-wrap items-center justify-center gap-4 mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/issues/new', '_blank')}
                      className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 text-lg font-semibold shadow-xl"
                    >
                       <Plus className="w-5 h-5 mr-2" />
                       {t('issues.reportNewIssue')}
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline"
                      onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/issues', '_blank')}
                      className="px-8 py-3 text-lg font-semibold border-2 border-slate-300 dark:border-slate-600"
                    >
                       <Github className="w-5 h-5 mr-2" />
                       {t('issues.viewOnGitHub')}
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Filters Section */}
          <section className="px-6 mb-12">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                         <Input
                           placeholder={t('issues.searchPlaceholder')}
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-10 bg-slate-50/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700"
                         />
                      </div>

                       {/* State Filter */}
                       <SafeSelect value={stateFilter} onValueChange={setStateFilter}>
                         <SafeSelectItem value="all">{t('issues.allIssues')}</SafeSelectItem>
                         <SafeSelectItem value="open">{t('issues.openFilter')}</SafeSelectItem>
                         <SafeSelectItem value="closed">{t('issues.closedFilter')}</SafeSelectItem>
                       </SafeSelect>

                       {/* Sort By */}
                       <SafeSelect value={sortBy} onValueChange={setSortBy}>
                         <SafeSelectItem value="created">{t('issues.newest')}</SafeSelectItem>
                         <SafeSelectItem value="updated">{t('issues.recentlyUpdated')}</SafeSelectItem>
                         <SafeSelectItem value="comments">{t('issues.mostCommented')}</SafeSelectItem>
                       </SafeSelect>

                      {/* Labels Filter */}
                      <SafeSelect 
                        value={selectedLabels.length > 0 ? selectedLabels[0] : "all-labels"} 
                        onValueChange={(value) => {
                          if (value === "all-labels") {
                            setSelectedLabels([]);
                          } else {
                            setSelectedLabels([value]);
                          }
                        }} 
                        placeholder={t('issues.filterByLabels')}
                      >
                        <SafeSelectItem value="all-labels">{t('issues.filterByLabels')}</SafeSelectItem>
                        {uniqueLabels.slice(0, 10).map((label) => (
                          <SafeSelectItem key={label} value={label}>{label}</SafeSelectItem>
                        ))}
                      </SafeSelect>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>

          {/* Issues List */}
          <section className="px-6 pb-20">
            <div className="max-w-7xl mx-auto">
              {loading ? (
                <div className="text-center py-32">
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-20 h-20 border-6 border-violet-200 dark:border-violet-800 border-t-violet-500 rounded-full mx-auto mb-8"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="text-slate-600 dark:text-slate-400 text-xl">{t('issues.loadingIssues')}</p>
                  </motion.div>
                </div>
              ) : filteredIssues && filteredIssues.length > 0 ? (
                <div className="space-y-6">
                  {filteredIssues.map((issue: any, index: number) => (
                    <motion.div
                      key={issue.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                    >
                      <Card 
                        className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                        onClick={() => window.open(issue.html_url, '_blank')}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              {getStateIcon(issue.state)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                                  #{issue.number} {issue.title}
                                </h3>
                                <div className="flex items-center gap-2 ml-4">
                                  {getIssueTypeIcon(issue.labels)}
                                  <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                                <div className="flex items-center gap-2">
                                  <img 
                                    src={issue.user.avatar_url} 
                                    alt={issue.user.login}
                                    className="w-5 h-5 rounded-full"
                                  />
                                  <span>Created by {issue.user.login}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{issue.comments} {t('issues.comments')}</span>
                                </div>
                              </div>
                              
                              {issue.labels && issue.labels.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {issue.labels.slice(0, 5).map((label: any) => (
                                    <Badge
                                      key={label.id}
                                      variant="secondary"
                                      className="text-xs"
                                      style={{
                                        backgroundColor: `#${label.color}20`,
                                        borderColor: `#${label.color}`,
                                        color: `#${label.color}`
                                      }}
                                    >
                                      {label.name}
                                    </Badge>
                                  ))}
                                  {issue.labels.length > 5 && (
                                     <Badge variant="outline" className="text-xs">
                                       +{issue.labels.length - 5} {t('issues.moreLabels')}
                                     </Badge>
                                  )}
                                </div>
                              )}

                              {issue.body && (
                                <p className="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm">
                                  {issue.body.replace(/[#*`]/g, '').substring(0, 200)}...
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-32"
                >
                  <motion.div
                    className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Search className="w-8 h-8 text-slate-500" />
                  </motion.div>
                   <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{t('issues.noIssuesFound')}</h3>
                   <p className="text-slate-600 dark:text-slate-400">{t('issues.tryAdjusting')}</p>
                </motion.div>
              )}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
