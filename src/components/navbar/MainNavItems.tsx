
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
    <div className="flex items-center gap-1 w-full justify-center">
      {allNavItems.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Tooltip key={item.path}>
            <TooltipTrigger asChild>
              <Link
                to={item.path}
                className={`group relative px-3 py-3 rounded-xl transition-all duration-300 flex items-center justify-center min-w-fit overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/60 via-purple-600/60 to-cyan-600/60 text-white shadow-xl border border-blue-500/50 backdrop-blur-sm'
                    : 'text-white/80 hover:text-white hover:bg-gradient-to-r hover:from-white/10 hover:via-white/15 hover:to-white/10 border border-transparent hover:border-white/30 backdrop-blur-sm'
                }`}
              >
                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 rounded-xl"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon container */}
                <div className="relative z-10 flex items-center justify-center">
                  <motion.div
                    className="flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Hover shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black/90 text-white border-white/20">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
