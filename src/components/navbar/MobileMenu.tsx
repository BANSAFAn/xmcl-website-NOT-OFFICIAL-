
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Github, FileText, Home, Download, Info, BookOpen, Clock, Mail, Globe, MessageSquare, TestTube, Newspaper, Users } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';
import { useState, useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: () => void;
}

export function MobileMenu({ isOpen, onClose, onLanguageChange }: MobileMenuProps) {
  const { translations } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const location = useLocation();

  // Закрывать меню при изменении маршрута
  useEffect(() => {
    if (isOpen && location.pathname) {
      onClose();
    }
  }, [location.pathname, onClose, isOpen]);

  // Animation variants - оптимизированы для мобильных устройств
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
        staggerDirection: -1,
        staggerChildren: 0.03,
        when: "afterChildren",
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        delayChildren: 0.05,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -5 },
    open: { opacity: 1, y: 0 }
  };

  const languageSelectorVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  const menuItems = [
    { name: 'Home', icon: <Home size={18} />, path: '/' },
    { name: translations.guideLocal || 'Guide', icon: <BookOpen size={18} />, path: '/guide' },
    { name: 'Testing', icon: <TestTube size={18} />, path: '/testing' },
    { name: translations.changelogs || 'Changelogs', icon: <Clock size={18} />, path: '/changelogs' },
    { name: translations.blogs || 'Blogs', icon: <Newspaper size={18} />, path: '/blogs' },
    { name: translations.about || 'About', icon: <Users size={18} />, path: '/about' },
    { name: 'Issues', icon: <Github size={18} />, path: '/issues' },
    { name: translations.contactUs || 'Contact', icon: <Mail size={18} />, path: '/contact' },
    { name: translations.privacy || 'Privacy', icon: <FileText size={18} />, path: '/privacy' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-x-0 top-[56px] bg-black/80 backdrop-blur-md border-b border-white/10 p-4 shadow-lg mobile-nav-fix z-40 max-h-[calc(100vh-56px)] overflow-y-auto"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          style={{
            transform: 'translateZ(0)',
            willChange: 'transform',
            WebkitOverflowScrolling: 'touch',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Language selector - floating button */}
          <motion.div
            className="fixed bottom-6 right-6 z-50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <motion.button
              onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              className="flex items-center space-x-2 px-4 py-3 rounded-full bg-accent shadow-lg hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Globe size={18} />
              <span>{translations.language}</span>
            </motion.button>

            <AnimatePresence>
              {showLanguageSelector && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-14 right-0 p-3 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-white/10"
                >
                  <div className="mb-2 text-sm text-white/70">{translations.selectLanguage}:</div>
                  <LanguageSwitcher onChange={() => {
                    onLanguageChange();
                    setTimeout(() => setShowLanguageSelector(false), 300);
                  }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="container mx-auto px-2 pb-20">
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4" variants={itemVariants}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div key={item.name} variants={itemVariants}>
                    <Link 
                      to={item.path} 
                      className={`flex items-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${isActive 
                        ? 'bg-gradient-to-r from-blue-600/60 via-purple-600/60 to-cyan-600/60 text-white shadow-xl border border-blue-500/50 backdrop-blur-sm'
                        : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/30'}`}
                      onClick={onClose}
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                      >
                        {item.icon}
                      </motion.div>
                      <span>{item.name}</span>
                      
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full"
                          layoutId="navbar-indicator-mobile"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
            
            <motion.div 
              className="mt-4 p-3 bg-white/5 rounded-md"
              variants={itemVariants}
            >
              <p className="text-xs text-white/60 text-center">
                This is an unofficial website created by XMCL moderator Baneronetwo.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
