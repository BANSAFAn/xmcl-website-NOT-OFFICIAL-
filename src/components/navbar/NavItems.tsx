
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Newspaper, Globe, History } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from './LanguageContext';

// Motion variants for staggered animation
const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0,
    transition: { 
      delay: 0.05 * i,
      duration: 0.3,
      ease: "easeOut"
    } 
  })
};

export const NavItems = () => {
  const { translations } = useLanguage();
  
  const navItems = [
    { 
      icon: <BookOpen size={20} className="transition-all duration-300" />,
      link: "https://xmcl.app/en/guide/install",
      external: true,
      color: "text-cyan-400 hover:text-cyan-300",
      tooltip: translations.guide,
      index: 0
    },
    { 
      icon: <FileText size={20} className="transition-all duration-300" />,
      link: "/privacy",
      external: false,
      color: "text-green-400 hover:text-green-300",
      tooltip: translations.privacy,
      index: 1
    },
    { 
      icon: <History size={20} className="transition-all duration-300" />,
      link: "/changelogs",
      external: false,
      color: "text-orange-400 hover:text-orange-300",
      tooltip: translations.changelogs,
      index: 2
    },
    { 
      icon: <Newspaper size={20} className="transition-all duration-300" />,
      link: "https://xmcl.app/en/blog/",
      external: true,
      color: "text-yellow-400 hover:text-yellow-300",
      tooltip: translations.blogs,
      index: 3
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M15 2v2" />
          <path d="M15 20v2" />
          <path d="M2 15h2" />
          <path d="M20 15h2" />
        </svg>
      ),
      link: "https://xmcl.app/en/core/",
      external: true,
      color: "text-purple-400 hover:text-purple-300",
      tooltip: translations.coreDocument,
      index: 4
    }
  ];

  return (
    <nav className="hidden lg:flex items-center gap-5">
      {navItems.map(item => (
        <motion.div
          key={item.tooltip}
          custom={item.index}
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              {item.external ? (
                <a 
                  href={item.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`relative p-2 transition-all duration-300 ${item.color} hover:bg-white/5 rounded-lg hover:scale-110`}
                >
                  {item.icon}
                </a>
              ) : (
                <Link 
                  to={item.link}
                  className={`relative p-2 transition-all duration-300 ${item.color} hover:bg-white/5 rounded-lg hover:scale-110`}
                >
                  {item.icon}
                </Link>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
      ))}
    </nav>
  );
};
