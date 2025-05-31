
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, TestTube, FileText, Users, Mail, Github, Newspaper } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const MainNavItems = () => {
  const location = useLocation();
  const { translations } = useLanguage();

  const allNavItems = [
    {
      path: '/guide',
      label: translations.guideLocal,
      icon: <BookOpen size={16} />
    },
    {
      path: '/testing',
      label: 'Testing',
      icon: <TestTube size={16} />
    },
    {
      path: '/changelogs',
      label: translations.changelogs,
      icon: <MessageSquare size={16} />
    },
    {
      path: '/blogs',
      label: translations.blogs,
      icon: <Newspaper size={16} />
    },
    {
      path: '/about',
      label: translations.about,
      icon: <Users size={16} />
    },
    {
      path: '/issues',
      label: 'Issues',
      icon: <Github size={16} />
    },
    {
      path: '/contact',
      label: translations.contactUs || 'Contact',
      icon: <Mail size={16} />
    },
    {
      path: '/privacy',
      label: translations.privacy || 'Privacy',
      icon: <FileText size={16} />
    }
  ];

  return (
    <div className="flex items-center gap-1 flex-1 justify-center max-w-3xl">
      {allNavItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Tooltip key={item.path}>
            <TooltipTrigger asChild>
              <Link
                to={item.path}
                className={`group relative px-4 py-3 rounded-2xl transition-all duration-400 flex items-center justify-center overflow-hidden border ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 text-white shadow-xl shadow-blue-500/15 border-blue-400/25'
                    : 'text-white/70 hover:text-white hover:bg-gradient-to-r hover:from-white/8 hover:via-white/12 hover:to-white/8 border-transparent hover:border-white/20'
                }`}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-400"
                />
                
                {/* Icon container with enhanced animation */}
                <div className="relative z-10 flex items-center justify-center">
                  <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.icon}
                  </motion.div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/50"
                    layoutId="main-navbar-indicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Premium shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
                
                {/* Subtle pulse effect for active items */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-2xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-900/95 text-white border-white/20 backdrop-blur-lg">
              <p className="font-medium">{item.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
