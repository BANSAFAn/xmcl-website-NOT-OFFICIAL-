import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SafeSelect, SafeSelectItem } from '@/components/ui/safe-select';

import { PageTransition } from '@/components/PageTransition';
import { useTranslation } from '@/hooks/useTranslation';
import { useGitHubApi } from '@/hooks/useGitHubApi';
import { 
  Search, 
  Github, 
  ExternalLink, 
  MessageCircle, 
  Calendar, 
  User, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  TrendingUp, 
  Bug, 
  Lightbulb, 
  Zap, 
  GitBranch, 
  X,
  BarChart3,
  Eye,
  ArrowUpRight,
  MessageSquareText,
  MessageSquareTextIcon
} from 'lucide-react';
import { AppShell } from '@/components/AppShell';


const StateIcon = ({ state }: { state: string }) => (
  state === 'open' ? 
    <AlertTriangle className="w-4 h-4 text-emerald-500" /> : 
    <CheckCircle2 className="w-4 h-4 text-violet-500" />
);

const IssueTypeIcon = ({ labels }: { labels: any[] }) => {
  const hasLabel = (name: string) => labels.some(label => 
    label.name.toLowerCase().includes(name)
  );
  
  if (hasLabel('bug')) return <Bug className="w-4 h-4 text-red-500" />;
  if (hasLabel('enhancement') || hasLabel('feature')) return <Lightbulb className="w-4 h-4 text-amber-500" />;
  if (hasLabel('performance')) return <Zap className="w-4 h-4 text-blue-500" />;
  return <GitBranch className="w-4 h-4 text-slate-500" />;
};


const MarkdownRenderer = ({ content }: { content: string }) => {
  const renderMarkdown = (text: string) => {
    if (!text) return '';
    

    let html = text.replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, title) => {
      const level = hashes.length;
      return `<h${level} class="font-bold text-white mb-2">${title}</h${level}>`;
    });


    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">$1</a>');
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-2" />');
    html = html.replace(/^>\s+(.*)$/gm, '<blockquote class="border-l-4 border-slate-600 pl-4 my-2 italic text-slate-300">$1</blockquote>');
    html = html.replace(/^\s*-\s+(.+)$/gm, '<li class="mb-1">$1</li>');
    html = html.replace(/(<li[^>]*>.*<\/li>)+/gs, '<ul class="list-disc pl-5 mb-3">$&</ul>');
    html = html.replace(/\n\n/g, '</p><p class="mb-3">');
    html = `<p class="mb-3">${html}</p>`;

    return html;
  };

  return (
    <div 
      className="prose prose-invert max-w-none text-slate-300"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};


const CommentLoader = ({ issueNumber }: { issueNumber: number }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!issueNumber) return;

    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/issues/${issueNumber}/comments`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (err: any) {
        setError(err.message || 'Error loading comments');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [issueNumber]);

  if (loading) {
    return <p className="text-slate-400 text-sm">Загрузка комментариев...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-sm">{error}</p>;
  }

  if (comments.length === 0) {
    return <p className="text-slate-400 text-sm">Нет комментариев</p>;
  }

  return (
    <div className="space-y-3">
      {comments.map((comment: any, index: number) => (
        <div key={index} className="p-3 bg-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <img 
              src={comment.user.avatar_url} 
              alt={comment.user.login}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-xs text-slate-300">{comment.user.login}</span>
            <span className="text-xs text-slate-500">• {new Date(comment.created_at).toLocaleDateString()}</span>
          </div>
          <MarkdownRenderer content={comment.body} />
        </div>
      ))}
      {}
      <Button 
        size="sm" 
        variant="ghost" 
        className="text-slate-400 text-xs"
        onClick={() => window.open(`https://github.com/Voxelum/x-minecraft-launcher/issues/${issueNumber}`, '_blank')}
      >
        Показать все {comments.length} комментария(ев) на GitHub
      </Button>
    </div>
  );
};

const IssuePreview = ({ issue }: { issue: any }) => {
  const { t } = useTranslation();
  const { body, title, number, user, created_at, comments, labels, state } = issue;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <StateIcon state={state} />
        <h4 className="font-semibold text-slate-900 dark:text-white">#{number} {title}</h4>
      </div>
      
      <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-1">
          <User className="w-3.5 h-3.5" />
          <span>{user.login}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>{comments} {t('issues.comments')}</span>
        </div>
      </div>

      {labels && labels.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {labels.slice(0, 3).map((label: any) => (
            <Badge
              key={label.id}
              variant="secondary"
              className="text-xs px-1.5 py-0.5"
              style={{
                backgroundColor: `#${label.color}20`,
                borderColor: `#${label.color}`,
                color: `#${label.color}`
              }}
            >
              {label.name}
            </Badge>
          ))}
        </div>
      )}

      {body && (
        <div className="mt-3">
          <MarkdownRenderer content={body} />
        </div>
      )}
    </div>
  );
};
const StatsWidgetToggle = ({ isVisible, onClick }: { 
  isVisible: boolean; 
  onClick: () => void 
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed z-30 top-24 right-4 w-12 h-12 rounded-lg flex items-center justify-center ${
        isVisible 
          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg' 
          : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
      }`}
      aria-label={isVisible ? "Hide stats" : "Show stats"}
    >
      {isVisible ? (
        <X className="w-5 h-5" />
      ) : (
        <BarChart3 className="w-5 h-5" />
      )}
    </motion.button>
  );
};

const StatsWidget = ({ stats, isVisible, onClose }: { 
  stats: any; 
  isVisible: boolean; 
  onClose: () => void 
}) => {
  const { t } = useTranslation();
  if (!stats) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.95 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed z-20 top-24 right-6 w-72 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-violet-400" /> {t('issues.stats')}
            </h3>
            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">{t('issues.openIssues')}</span>
              </div>
              <span className="text-white font-medium">{stats.openIssues}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400" />
                <span className="text-slate-300">{t('issues.closedIssues')}</span>
              </div>
              <span className="text-white font-medium">{stats.closedIssues}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">{t('issues.allIssues')}</span>
              </div>
              <span className="text-white font-medium">{stats.openIssues + stats.closedIssues}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-slate-700">
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full text-xs text-slate-300 border-slate-600 hover:bg-slate-700"
              onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/issues', '_blank')}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {t('issues.viewOnGitHub')}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function ModernIssuesContent() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [showStatsWidget, setShowStatsWidget] = useState(false);
  const [expandedIssueId, setExpandedIssueId] = useState<number | null>(null);
  const [showComments, setShowComments] = useState<number | null>(null);
  const { issues, stats, loading, error } = useGitHubApi();
  const { issuesOnly, uniqueLabels, filteredAndSortedIssues } = useMemo(() => {
    let issuesOnly = issues?.filter((issue: any) => !issue.pull_request) || [];
    if (stateFilter !== 'all') {
      issuesOnly = issuesOnly.filter((issue: any) => issue.state === stateFilter);
    }
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      issuesOnly = issuesOnly.filter((issue: any) => {
        return (
          issue.title.toLowerCase().includes(lowerSearchTerm) ||
          issue.body?.toLowerCase().includes(lowerSearchTerm) ||
          issue.user.login.toLowerCase().includes(lowerSearchTerm)
        );
      });
    }
    if (selectedLabels.length > 0) {
      issuesOnly = issuesOnly.filter((issue: any) =>
        selectedLabels.every(labelName =>
          issue.labels.some((label: any) => label.name === labelName)
        )
      );
    }
    let sortedIssues = [...issuesOnly];
    switch (sortBy) {
      case 'updated':
        sortedIssues.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
      case 'comments':
        sortedIssues.sort((a, b) => b.comments - a.comments);
        break;
      case 'created':
      default:
        sortedIssues.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }
    const uniqueLabels = Array.from(
      new Set(
        issuesOnly.flatMap((issue: any) =>
          issue.labels?.map((label: any) => label.name).filter((name: string) => name && typeof name === 'string' && name.trim() !== '') || []
        )
      )
    );

    return { issuesOnly, uniqueLabels, filteredAndSortedIssues: sortedIssues };
  }, [issues, stateFilter, searchTerm, selectedLabels, sortBy]);

  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/30 to-orange-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-6">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{t('errors.issuesLoad')}</h2>
            <Button onClick={() => window.location.reload()} variant="outline">
              {t('actions.retry')}
            </Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-950 to-blue-950 dark:from-slate-950 dark:via-violet-950/20 dark:to-blue-950/20 relative overflow-hidden">
        {}
        <StatsWidgetToggle 
          isVisible={showStatsWidget} 
          onClick={() => setShowStatsWidget(!showStatsWidget)} 
        />

        {}
        <StatsWidget 
          stats={stats} 
          isVisible={showStatsWidget} 
          onClose={() => setShowStatsWidget(false)} 
        />

        <div className="relative z-10 pt-16 px-4">
          {}
          <section className="py-10 max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-4">
                <motion.div
                  className="p-2 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                >
                  <Bug className="w-6 h-6" />
                </motion.div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
                  {t('issues.title')}
                </h1>
              </div>
              
              <p className="text-slate-300 max-w-2xl mx-auto mb-6">
                {t('issues.subtitle')}
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <Button 
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/issues/new', '_blank')}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-6 py-2 text-sm font-semibold shadow-lg"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t('issues.reportNewIssue')}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/issues', '_blank')}
                  className="px-6 py-2 text-sm font-semibold border-2 border-slate-300 dark:border-slate-600"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {t('issues.viewOnGitHub')}
                </Button>
              </div>
            </div>

            {}
            <Card className="p-4 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder={t('issues.searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-slate-700/50 border-slate-600 text-white text-sm placeholder:text-slate-400"
                  />
                </div>
                <SafeSelect 
                  value={stateFilter} 
                  onValueChange={setStateFilter} 
                  placeholder={t('issues.stateFilter')}
                  className="bg-slate-700/50 border-slate-600 text-white"
                >
                  <SafeSelectItem value="all">{t('issues.allIssues')}</SafeSelectItem>
                  <SafeSelectItem value="open">{t('issues.openFilter')}</SafeSelectItem>
                  <SafeSelectItem value="closed">{t('issues.closedFilter')}</SafeSelectItem>
                </SafeSelect>
                <SafeSelect 
                  value={sortBy} 
                  onValueChange={setSortBy} 
                  placeholder={t('issues.sortBy')}
                  className="bg-slate-700/50 border-slate-600 text-white"
                >
                  <SafeSelectItem value="created">{t('issues.newest')}</SafeSelectItem>
                  <SafeSelectItem value="updated">{t('issues.recentlyUpdated')}</SafeSelectItem>
                  <SafeSelectItem value="comments">{t('issues.mostCommented')}</SafeSelectItem>
                </SafeSelect>
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
                  className="bg-slate-700/50 border-slate-600 text-white"
                >
                  <SafeSelectItem value="all-labels">{t('issues.allLabels')}</SafeSelectItem>
                  {uniqueLabels.map((label) => (
                    <SafeSelectItem key={label} value={label}>{label}</SafeSelectItem>
                  ))}
                </SafeSelect>
              </div>
            </Card>
          </section>

          {}
          <section className="py-6 px-2 max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-violet-200 dark:border-violet-800 border-t-violet-500 rounded-full mx-auto mb-4 animate-spin"></div>
                <p className="text-slate-400">{t('issues.loadingIssues')}</p>
              </div>
            ) : filteredAndSortedIssues.length > 0 ? (
              <div className="space-y-4">
                {filteredAndSortedIssues.map((issue: any) => (
                  <motion.div
                    key={issue.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-sm overflow-hidden"
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <StateIcon state={issue.state} />
                          <h3 className="font-semibold text-white line-clamp-1">
                            #{issue.number} {issue.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1">
                          <IssueTypeIcon labels={issue.labels} />
                          <ExternalLink 
                            className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" 
                            onClick={() => window.open(issue.html_url, '_blank')}
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {issue.labels.slice(0, 3).map((label: any) => (
                          <Badge
                            key={label.id}
                            variant="secondary"
                            className="text-xs px-1.5 py-0.5"
                            style={{
                              backgroundColor: `#${label.color}20`,
                              borderColor: `#${label.color}`,
                              color: `#${label.color}`
                            }}
                          >
                            {label.name}
                          </Badge>
                        ))}
                        {issue.labels.length > 3 && (
                          <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                            +{issue.labels.length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs text-slate-300 border-slate-600 hover:bg-slate-700"
                          onClick={() => setExpandedIssueId(expandedIssueId === issue.id ? null : issue.id)}
                        >
                          {expandedIssueId === issue.id ? (
                            <Eye className="w-3 h-3 mr-1" /> 
                          ) : (
                            <Eye className="w-3 h-3 mr-1" />
                          )}
                          {expandedIssueId === issue.id ? t('actions.hide') : t('actions.preview')}
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-xs"
                          onClick={() => window.open(issue.html_url, '_blank')}
                        >
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                          {t('actions.goToIssue')}
                        </Button>
                      </div>

                      <AnimatePresence>
                        {expandedIssueId === issue.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="mt-3 pt-3 border-t border-slate-700/50"
                          >
                            <IssuePreview issue={issue} />
                            
                            {}
                            {issue.comments > 0 && (
                              <div className="mt-4">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-slate-400 text-xs flex items-center gap-1"
                                  onClick={() => setShowComments(showComments === issue.id ? null : issue.id)}
                                >
                                  <MessageSquareText className="w-3 h-3" />
                                  {showComments === issue.id ? 'Скрыть комментарии' : `Показать ${issue.comments} комментарий(ев)`}
                                </Button>
                                
                                <AnimatePresence>
                                  {showComments === issue.id && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="mt-2"
                                    >
                                      <CommentLoader issueNumber={issue.number} />
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Search className="w-10 h-10 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">{t('issues.noIssuesFound')}</h3>
                <p className="text-slate-400">{t('issues.tryAdjusting')}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </PageTransition>
  );
}

export default function ModernIssues() {
  return (
    <AppShell>
      <ModernIssuesContent />
    </AppShell>
  );
}