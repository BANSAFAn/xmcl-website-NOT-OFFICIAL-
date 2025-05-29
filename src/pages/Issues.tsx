
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, MessageCircle, Clock, User, Tag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";
import { IssuePreview } from "@/components/issues/IssuePreview";
import { useLanguage } from "@/components/navbar/LanguageContext";

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

const fetchIssues = async (): Promise<GitHubIssue[]> => {
  const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/issues?state=all&per_page=50');
  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }
  return response.json();
};

// Translations for the Issues page
const issueTranslations = {
  en: {
    title: "GitHub Issues",
    subtitle: "Browse and participate in X Minecraft Launcher development",
    createIssue: "Create New Issue",
    loading: "Loading issues...",
    error: "Failed to load issues. Please try again later.",
    open: "open",
    closed: "closed",
    preview: "Preview",
    comments: "comments",
    by: "by"
  },
  ru: {
    title: "GitHub Issues",
    subtitle: "Просматривайте и участвуйте в разработке X Minecraft Launcher",
    createIssue: "Создать новый Issue",
    loading: "Загрузка issues...",
    error: "Не удалось загрузить issues. Попробуйте позже.",
    open: "открыто",
    closed: "закрыто",
    preview: "Предпросмотр",
    comments: "комментариев",
    by: "от"
  },
  uk: {
    title: "GitHub Issues",
    subtitle: "Переглядайте та беріть участь у розробці X Minecraft Launcher",
    createIssue: "Створити новий Issue",
    loading: "Завантаження issues...",
    error: "Не вдалося завантажити issues. Спробуйте пізніше.",
    open: "відкрито",
    closed: "закрито",
    preview: "Попередній перегляд",
    comments: "коментарів",
    by: "від"
  }
};

const Issues = () => {
  const [selectedIssue, setSelectedIssue] = useState<GitHubIssue | null>(null);
  const { currentLanguage } = useLanguage();
  
  const text = issueTranslations[currentLanguage as keyof typeof issueTranslations] || issueTranslations.en;
  
  const { data: issues, isLoading, error } = useQuery({
    queryKey: ['github-issues'],
    queryFn: fetchIssues,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const formatDate = (dateString: string) => {
    const locale = currentLanguage === 'ru' ? 'ru-RU' : currentLanguage === 'uk' ? 'uk-UA' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-minecraft-dark-blue to-slate-900">
      <Navbar />
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-full filter blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full filter blur-[150px] opacity-40 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {text.subtitle}
          </motion.p>

          <motion.a
            href="https://github.com/Voxelum/x-minecraft-launcher/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} />
            {text.createIssue}
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>

        {/* Issues List */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isLoading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400"></div>
              <p className="text-white/60 mt-4">{text.loading}</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg">{text.error}</p>
            </div>
          )}

          {issues && (
            <div className="space-y-4">
              {issues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-blue-500/40 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={issue.user.avatar_url}
                      alt={issue.user.login}
                      className="w-12 h-12 rounded-full border-2 border-blue-500/30"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          issue.state === 'open' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {issue.state === 'open' ? text.open : text.closed}
                        </span>
                        <span className="text-white/60 text-sm">#{issue.number}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                        <button 
                          onClick={() => setSelectedIssue(issue)}
                          className="hover:underline text-left w-full"
                        >
                          {issue.title}
                        </button>
                      </h3>
                      
                      {issue.body && (
                        <p className="text-white/70 text-sm mb-3 line-clamp-2">
                          {issue.body.substring(0, 200)}...
                        </p>
                      )}
                      
                      {issue.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {issue.labels.map((label, labelIndex) => (
                            <span
                              key={labelIndex}
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border"
                              style={{ 
                                backgroundColor: `#${label.color}20`,
                                borderColor: `#${label.color}40`,
                                color: `#${label.color}`
                              }}
                            >
                              <Tag size={12} />
                              {label.name}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{text.by}</span>
                          <a 
                            href={issue.user.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                          >
                            {issue.user.login}
                          </a>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatDate(issue.created_at)}
                        </div>
                        {issue.comments > 0 && (
                          <div className="flex items-center gap-1">
                            <MessageCircle size={14} />
                            <span>{issue.comments} {text.comments}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <motion.button
                        onClick={() => setSelectedIssue(issue)}
                        className="p-2 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors border border-blue-500/30 opacity-0 group-hover:opacity-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title={text.preview}
                      >
                        <Eye size={16} className="text-blue-400" />
                      </motion.button>
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <ExternalLink size={16} className="text-white/80" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Issue Preview Modal */}
      <AnimatePresence>
        {selectedIssue && (
          <IssuePreview
            issue={selectedIssue}
            isOpen={!!selectedIssue}
            onClose={() => setSelectedIssue(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Issues;
