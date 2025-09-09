import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SafeSelect, SafeSelectItem } from "@/components/ui/safe-select";
import { Navigation } from '@/components/Navigation';
import { PageTransition } from '@/components/PageTransition';
import { IssueViewer } from '@/components/IssueViewer';
import { useTranslation } from '@/hooks/useTranslation';
import { useGitHubApi } from '@/hooks/useGitHubApi';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  MessageCircle, 
  Calendar, 
  User,
  AlertTriangle,
  CheckCircle2,
  Plus,
  TrendingUp,
  GitBranch,
  Bug,
  Lightbulb,
  Zap,
  Github
} from "lucide-react";

export default function Issues() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null);

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
      <AlertTriangle className="w-5 h-5 text-green-500" />
    ) : (
      <CheckCircle2 className="w-5 h-5 text-purple-500" />
    );
  };

  const getLabelColor = (color: string) => {
    return `#${color}`;
  };

  const getIssueTypeIcon = (labels: any[]) => {
    const hasLabel = (name: string) => labels.some(label => label.name.toLowerCase().includes(name));
    
    if (hasLabel('bug')) return <Bug className="w-4 h-4 text-red-500" />;
    if (hasLabel('enhancement') || hasLabel('feature')) return <Lightbulb className="w-4 h-4 text-yellow-500" />;
    if (hasLabel('performance')) return <Zap className="w-4 h-4 text-blue-500" />;
    return <GitBranch className="w-4 h-4 text-slate-500" />;
  };

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50/30 to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
          <Navigation />
          <div className="flex items-center justify-center min-h-screen px-6">
            <Card className="p-8 max-w-md mx-auto text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50">
              <CardContent className="p-0">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{t('issues.errorLoading')}</h2>
                <Button onClick={() => window.location.reload()} variant="outline">
                  {t('common.tryAgain')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-pink-600/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <Navigation />
        
        <div className="relative z-10 pt-20">
          {/* Header Section */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full border border-slate-200/60 dark:border-slate-700/50 shadow-lg mb-8 animate-fade-in">
                <Bug className="w-4 h-4 mr-2 text-red-500" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub Issues</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in">
                {t('issues.title')}
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 animate-fade-in" style={{animationDelay: '0.2s'}}>
                {t('issues.subtitle')}
              </p>

              {/* Stats Cards */}
              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                  <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 hover:scale-105 transition-all duration-300 animate-fade-in">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between mb-4">
                        <AlertTriangle className="w-8 h-8 text-green-500" />
                        <TrendingUp className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stats.openIssues}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{t('issues.openIssues')}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between mb-4">
                        <CheckCircle2 className="w-8 h-8 text-purple-500" />
                        <TrendingUp className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stats.closedIssues}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{t('issues.closedIssues')}</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 hover:scale-105 transition-all duration-300 animate-fade-in" style={{animationDelay: '0.2s'}}>
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between mb-4">
                        <MessageCircle className="w-8 h-8 text-blue-500" />
                        <TrendingUp className="w-6 h-6 text-slate-400" />
                      </div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stats.openIssues + stats.closedIssues}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{t('issues.allIssues')}</div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <Button 
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/issues/new', '_blank')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('issues.reportNewIssue')}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/issues', '_blank')}
                  className="hover:scale-105 transition-all duration-300 border-slate-300 dark:border-slate-600"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {t('issues.viewOnGitHub')}
                </Button>
              </div>
            </div>
          </section>

          {/* Filters Section */}
          <section className="px-6 mb-12">
            <div className="max-w-7xl mx-auto">
              <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 animate-fade-in">
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
                      <SafeSelectItem value="all">{t('common.all')}</SafeSelectItem>
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
                      <SafeSelectItem value="all-labels">{t('common.all')}</SafeSelectItem>
                      {uniqueLabels.map((label) => (
                        <SafeSelectItem key={label} value={label}>
                          {label}
                        </SafeSelectItem>
                      ))}
                    </SafeSelect>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Issues List */}
          <section className="px-6 pb-20">
            <div className="max-w-7xl mx-auto">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-slate-600 dark:text-slate-400">{t('issues.loadingIssues')}</p>
                </div>
              ) : filteredIssues && filteredIssues.length > 0 ? (
                <div className="space-y-6">
                  {filteredIssues.map((issue: any, index: number) => (
                    <Card 
                      key={issue.id}
                      className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 hover:scale-[1.01] hover:shadow-xl transition-all duration-300 cursor-pointer group animate-fade-in"
                      style={{animationDelay: `${index * 0.05}s`}}
                      onClick={() => setSelectedIssue(issue.number)}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 mt-1">
                            {getStateIcon(issue.state)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
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
                                <span>{t('issues.createdBy')} {issue.user.login}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(issue.created_at).toLocaleDateString()}</span>
                              </div>
                              {issue.comments > 0 && (
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{issue.comments}</span>
                                </div>
                              )}
                            </div>

                            {/* Labels */}
                            {issue.labels.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {issue.labels.slice(0, 5).map((label: any) => (
                                  label.name && label.name.trim() !== "" && (
                                    <Badge 
                                      key={label.name}
                                      style={{ 
                                        backgroundColor: getLabelColor(label.color),
                                        color: '#ffffff'
                                      }}
                                      className="text-xs opacity-90 hover:opacity-100 transition-opacity"
                                    >
                                      {label.name}
                                    </Badge>
                                  )
                                ))}
                                {issue.labels.length > 5 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{issue.labels.length - 5}
                                  </Badge>
                                )}
                              </div>
                            )}

                            {/* Issue Preview */}
                            {issue.body && (
                              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                                {issue.body.substring(0, 200)}...
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-20 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 animate-fade-in">
                  <CardContent className="p-0">
                    <AlertTriangle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{t('issues.noIssuesFound')}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                      {searchTerm ? `${t('issues.noIssuesFound')} "${searchTerm}"` : t('issues.noIssuesFound')}
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm('');
                        setStateFilter('all');
                        setSelectedLabels([]);
                      }}
                    >
                      {t('issues.clearFilters')}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>

        {/* Issue Viewer Modal */}
        {selectedIssue && (
          <IssueViewer 
            issueNumber={selectedIssue} 
            onClose={() => setSelectedIssue(null)} 
          />
        )}
      </div>
    </PageTransition>
  );
}
