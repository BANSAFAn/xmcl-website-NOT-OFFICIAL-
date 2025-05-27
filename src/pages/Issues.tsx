
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, MessageCircle, Clock, User, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useQuery } from "@tanstack/react-query";

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
}

const fetchIssues = async (): Promise<GitHubIssue[]> => {
  const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/issues?state=all&per_page=50');
  if (!response.ok) {
    throw new Error('Failed to fetch issues');
  }
  return response.json();
};

const Issues = () => {
  const { data: issues, isLoading, error } = useQuery({
    queryKey: ['github-issues'],
    queryFn: fetchIssues,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
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
              GitHub Issues
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Browse and contribute to X Minecraft Launcher development
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
            Create New Issue
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
              <p className="text-white/60 mt-4">Loading issues...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-red-400 text-lg">Failed to load issues. Please try again later.</p>
            </div>
          )}

          {issues && (
            <div className="space-y-4">
              {issues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-blue-500/40 transition-all duration-300"
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
                          {issue.state}
                        </span>
                        <span className="text-white/60 text-sm">#{issue.number}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                        <a 
                          href={issue.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {issue.title}
                        </a>
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
                      </div>
                    </div>
                    
                    <a
                      href={issue.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink size={16} className="text-white/80" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Issues;
