
import { Link } from 'react-router-dom';
import { FileText, History, BookOpen, MessageSquare, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from './LanguageContext';
import { useLocation } from 'react-router-dom';

export const NavItems = () => {
  const { translations } = useLanguage();
  const location = useLocation();
  
  const navItems = [
    {
      icon: <BookOpen size={18} />,
      link: "/guide",
      external: false,
      label: translations.guide || "Guide",
      index: 0
    },
    { 
      icon: <Users size={18} />,
      link: "/about",
      external: false,
      label: translations.about || "About",
      index: 1
    },
    { 
      icon: <FileText size={18} />,
      link: "/privacy",
      external: false,
      label: translations.privacy,
      index: 2
    },
    { 
      icon: <History size={18} />,
      link: "/changelogs",
      external: false,
      label: translations.changelogs,
      index: 3
    },
    { 
      icon: <MessageSquare size={18} />,
      link: "/blogs",
      external: false,
      label: translations.blogs || "Blog",
      index: 4
    }
  ];

  return (
    <nav className="flex items-center gap-3 justify-center">
      {navItems.map(item => (
        <Tooltip key={item.label}>
          <TooltipTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link 
                to={item.link}
                className={`flex items-center justify-center p-2.5 rounded-lg transition-all duration-300 ${
                  location.pathname === item.link 
                    ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                aria-label={item.label}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
              </Link>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
}
