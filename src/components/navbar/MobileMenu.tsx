
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, FileText, Home, Download, Info, BookOpen, Clock, Mail, Globe, MessageSquare } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from './LanguageContext';
import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: () => void;
}

export function MobileMenu({ isOpen, onClose, onLanguageChange }: MobileMenuProps) {
  const { translations } = useLanguage();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Animation variants - оптимизировано для Firefox
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        staggerDirection: -1,
        staggerChildren: 0.03,
        when: "afterChildren",
        type: "tween"
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        staggerChildren: 0.05,
        delayChildren: 0.05,
        type: "tween"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 }
  };

  const languageSelectorVariants = {
    closed: { opacity: 0, height: 0 },
    open: { opacity: 1, height: 'auto' }
  };

  const menuItems = [
    { name: translations.guideLocal || 'Home', icon: <Home size={18} />, path: '/' },
    { name: translations.guide || 'Guide', icon: <BookOpen size={18} />, path: '/guide' },
    { name: translations.download || 'Download', icon: <Download size={18} />, path: '/#download' },
    { name: translations.about || 'About', icon: <Info size={18} />, path: '/about' },
    { name: translations.contact || 'Contact', icon: <Mail size={18} />, path: '/contact' },
    { name: translations.changelogs || 'Changelogs', icon: <Clock size={18} />, path: '/changelogs' },
    { name: translations.blogs || 'Blog', icon: <MessageSquare size={18} />, path: '/blogs' },
    { name: 'GitHub', icon: <Github size={18} />, path: 'https://github.com/Voxelum/x-minecraft-launcher', external: true },
  ];

  return (
    <motion.div 
      className="fixed inset-x-0 top-[56px] bg-black/80 backdrop-blur-md border-b border-white/10 p-4 shadow-lg"
      initial="closed"
      animate="open"
      exit="closed"
      variants={menuVariants}
    >
      {/* Language selector - floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={() => setShowLanguageSelector(!showLanguageSelector)}
          className="flex items-center space-x-2 px-4 py-3 rounded-full bg-accent shadow-lg hover:bg-accent/90 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
              className="absolute bottom-14 right-0 p-3 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-white/10"
            >
              <div className="mb-2 text-sm text-white/70">{translations.selectLanguage}:</div>
              <LanguageSwitcher onChange={() => {
                onLanguageChange();
                setTimeout(() => setShowLanguageSelector(false), 500);
              }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="container mx-auto px-2 pb-14">
        <motion.div className="grid grid-cols-2 gap-3 mb-4" variants={itemVariants}>
          {menuItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              {item.external ? (
                <a 
                  href={item.path} 
                  className="flex items-center space-x-2 py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              ) : (
                <Link 
                  to={item.path} 
                  className="flex items-center space-x-2 py-2 px-3 rounded-md bg-white/5 hover:bg-white/10 transition-colors"
                  onClick={onClose}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )}
            </motion.div>
          ))}
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
  );
}
