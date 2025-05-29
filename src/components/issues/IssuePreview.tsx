
import { motion } from "framer-motion";
import { X, ExternalLink, Calendar, User, MessageCircle } from "lucide-react";
import { MarkdownRender } from "@/components/markdown/MarkdownRender";

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
  comments: number;
}

interface IssuePreviewProps {
  issue: GitHubIssue;
  isOpen: boolean;
  onClose: () => void;
}

export function IssuePreview({ issue, isOpen, onClose }: IssuePreviewProps) {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md border-b border-white/10 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  issue.state === 'open' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {issue.state === 'open' ? 'Открыто' : 'Закрыто'}
                </span>
                <span className="text-white/60 text-sm">#{issue.number}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4 leading-tight">
                {issue.title}
              </h2>
              
              {/* Author and date info */}
              <div className="flex items-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <img
                    src={issue.user.avatar_url}
                    alt={issue.user.login}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{issue.user.login}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(issue.created_at)}</span>
                </div>
                {issue.comments > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    <span>{issue.comments} комментариев</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.a
                href={issue.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} className="text-white/80" />
              </motion.a>
              <motion.button
                onClick={onClose}
                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} className="text-white/80" />
              </motion.button>
            </div>
          </div>
          
          {/* Labels */}
          {issue.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {issue.labels.map((label, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                  style={{ 
                    backgroundColor: `#${label.color}20`,
                    borderColor: `#${label.color}40`,
                    color: `#${label.color}`
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {issue.body ? (
            <div className="prose prose-invert max-w-none">
              <MarkdownRender content={issue.body} />
            </div>
          ) : (
            <div className="text-center py-12 text-white/50">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p>Нет описания для этого issue</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
