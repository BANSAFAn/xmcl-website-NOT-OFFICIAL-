
import { Link } from 'react-router-dom';
import { FileText, Newspaper, Globe, History, BookMarked } from 'lucide-react';
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
      icon: <BookMarked size={20} className="transition-all duration-300 group-hover:text-emerald-300" />,
      link: "/guide",
      external: false,
      color: "text-emerald-400",
      hoverBg: "bg-emerald-500/20", 
      tooltip: translations.guideLocal || "Guide",
      index: 0
    },
    { 
      icon: <FileText size={20} className="transition-all duration-300 group-hover:text-green-300" />,
      link: "/privacy",
      external: false,
      color: "text-green-400",
      hoverBg: "bg-green-500/20",
      tooltip: translations.privacy,
      index: 1
    },
    { 
      icon: <History size={20} className="transition-all duration-300 group-hover:text-orange-300" />,
      link: "/changelogs",
      external: false,
      color: "text-orange-400",
      hoverBg: "bg-orange-500/20",
      tooltip: translations.changelogs,
      index: 2
    },
    { 
      icon: <Newspaper size={20} className="transition-all duration-300 group-hover:text-yellow-300" />,
      link: "https://xmcl.app/en/blog/",
      external: true,
      color: "text-yellow-400",
      hoverBg: "bg-yellow-500/20",
      tooltip: translations.blogs,
      index: 3
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:text-purple-300">
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
      color: "text-purple-400",
      hoverBg: "bg-purple-500/20",
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
                <motion.a 
                  href={item.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`relative p-2 transition-all duration-300 ${item.color} group rounded-lg overflow-hidden`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background animation on hover */}
                  <motion.div 
                    className={`absolute inset-0 ${item.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                    layoutId={`bg-${item.tooltip}`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />
                  
                  {/* Icon */}
                  <span className="relative z-10">
                    {item.icon}
                  </span>
                  
                  {/* Floating particles */}
                  <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.span 
                        key={i}
                        className="absolute bg-white w-1 h-1 rounded-full"
                        initial={{ opacity: 0, x: "50%", y: "50%" }}
                        whileHover={{ 
                          opacity: [0, 0.4, 0],
                          x: `${50 + (Math.random() * 25) * (Math.random() > 0.5 ? 1 : -1)}%`,
                          y: `${50 + (Math.random() * 25) * (Math.random() > 0.5 ? 1 : -1)}%`
                        }}
                        transition={{ duration: 0.7, delay: i * 0.1, repeat: Infinity }}
                      />
                    ))}
                  </motion.div>
                </motion.a>
              ) : (
                <motion.div
                  className={`relative p-2 transition-all duration-300 ${item.color} group rounded-lg overflow-hidden`}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Background animation on hover */}
                  <motion.div 
                    className={`absolute inset-0 ${item.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}
                    layoutId={`bg-${item.tooltip}`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />
                  
                  <Link 
                    to={item.link}
                    className="relative z-10 block"
                  >
                    {item.icon}
                  </Link>
                  
                  {/* Floating particles */}
                  <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.span 
                        key={i}
                        className="absolute bg-white w-1 h-1 rounded-full"
                        initial={{ opacity: 0, x: "50%", y: "50%" }}
                        whileHover={{ 
                          opacity: [0, 0.4, 0],
                          x: `${50 + (Math.random() * 25) * (Math.random() > 0.5 ? 1 : -1)}%`,
                          y: `${50 + (Math.random() * 25) * (Math.random() > 0.5 ? 1 : -1)}%`
                        }}
                        transition={{ duration: 0.7, delay: i * 0.1, repeat: Infinity }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
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
}
