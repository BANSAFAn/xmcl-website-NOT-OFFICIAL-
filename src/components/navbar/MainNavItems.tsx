
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from './LanguageContext';
import { NavItem } from './types';

export const MainNavItems = () => {
  const { translations } = useLanguage();
  const location = useLocation();
  
  // Main navigation items
  const mainNavItems: NavItem[] = [
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
    }
  ];

  return (
    <>
      {mainNavItems.map(item => (
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
    </>
  );
};
