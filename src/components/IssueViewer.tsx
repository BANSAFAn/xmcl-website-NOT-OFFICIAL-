
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { 
  X, 
  ExternalLink, 
  MessageCircle, 
  Calendar, 
  User,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from '@/hooks/useTranslation';

interface IssueViewerProps {
  issueNumber: number;
  onClose: () => void;
}

export const IssueViewer = ({ issueNumber, onClose }: IssueViewerProps) => {
  const { t } = useTranslation();
  
  const { data: issue, isLoading } = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/issues/${issueNumber}`);
      if (!response.ok) throw new Error('Failed to fetch issue');
      return response.json();
    }
  });

  const { data: comments } = useQuery({
    queryKey: ['issue-comments', issueNumber],
    queryFn: async () => {
      const response = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/issues/${issueNumber}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      return response.json();
    },
    enabled: !!issue
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900">
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>{t('common.loading')}</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!issue) {
    return null;
  }

  const getStateIcon = (state: string) => {
    return state === 'open' ? (
      <AlertCircle className="w-5 h-5 text-green-500" />
    ) : (
      <CheckCircle className="w-5 h-5 text-purple-500" />
    );
  };

  const getLabelColor = (color: string) => {
    return `#${color}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
          <div className="flex items-center gap-3">
            {getStateIcon(issue.state)}
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              #{issue.number} {issue.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => window.open(issue.html_url, '_blank')}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            {/* Issue Metadata */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <img 
                  src={issue.user.avatar_url} 
                  alt={issue.user.login}
                  className="w-6 h-6 rounded-full"
                />
                <span>{issue.user.login}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{t('issues.createdOn')}: {new Date(issue.created_at).toLocaleDateString()}</span>
              </div>
              {issue.comments > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{issue.comments} {t('issues.comments')}</span>
                </div>
              )}
            </div>

            {/* Labels */}
            {issue.labels.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {issue.labels.map((label: any) => (
                  <Badge 
                    key={label.name}
                    style={{ 
                      backgroundColor: getLabelColor(label.color),
                      color: '#ffffff'
                    }}
                    className="text-xs"
                  >
                    {label.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Issue Body */}
            {issue.body && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">{t('issues.description')}</h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <MarkdownRenderer content={issue.body} />
                </div>
              </div>
            )}

            {/* Comments */}
            {comments && comments.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  {t('issues.comments')} ({comments.length})
                </h3>
                <div className="space-y-4">
                  {comments.map((comment: any, index: number) => (
                    <div 
                      key={comment.id}
                      className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700 animate-fade-in"
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={comment.user.avatar_url} 
                          alt={comment.user.login}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            {comment.user.login}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <MarkdownRenderer content={comment.body} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
