
import { Link } from 'react-router-dom';
import { FileText, History } from 'lucide-react';
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
      icon: <FileText size={18} />,
      link: "/privacy",
      external: false,
      label: translations.privacy,
      index: 0
    },
    { 
      icon: <History size={18} />,
      link: "/changelogs",
      external: false,
      label: translations.changelogs,
      index: 1
    }
  ];

  // Icon animation variants
  const iconAnimations = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    <nav className="flex items-center gap-3">
      {navItems.map(item => (
        <Tooltip key={item.label}>
          <TooltipTrigger asChild>
            <motion.div
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.2 }}
            >
              {item.external ? (
                <a 
                  href={item.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                  aria-label={item.label}
                >
                  <motion.div variants={iconAnimations}>
                    {item.icon}
                  </motion.div>
                </a>
              ) : (
                <Link 
                  to={item.link}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors ${
                    location.pathname === item.link 
                      ? 'text-accent bg-white/10' 
                      : 'text-white/80 hover:text-white'
                  }`}
                  aria-label={item.label}
                >
                  <motion.div variants={iconAnimations}>
                    {item.icon}
                  </motion.div>
                </Link>
              )}
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
