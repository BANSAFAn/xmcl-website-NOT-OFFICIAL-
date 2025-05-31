
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { MainNavItems } from './MainNavItems';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinks } from './SocialLinks';
import { useLanguage } from './LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();
  const { translations } = useLanguage();

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  const itemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50 lg:hidden overflow-y-auto"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/90 backdrop-blur-md border-b border-white/10 p-6">
              <div className="flex items-center justify-between">
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img src="/assets/images/a39086fb-5549-43c0-a69e-217c717d938e.png" alt="XMCL" className="h-8 w-8" />
                  <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    XMCL
                  </span>
                </motion.div>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-6 space-y-6">
              {/* Home Link */}
              <motion.div
                custom={0}
                variants={itemVariants}
                initial="closed"
                animate="open"
              >
                <Link
                  to="/"
                  onClick={onClose}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                    location.pathname === '/'
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white border border-blue-500/50'
                      : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <Home size={20} />
                  <span className="font-medium">Главная</span>
                </Link>
              </motion.div>

              {/* Main Navigation Items */}
              <motion.div
                custom={1}
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="space-y-3"
              >
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                  Навигация
                </h3>
                <div className="space-y-2">
                  {[
                    { path: '/guide', label: translations.guideLocal, icon: '📖' },
                    { path: '/testing', label: 'Testing', icon: '🧪' },
                    { path: '/changelogs', label: translations.changelogs, icon: '💬' },
                    { path: '/blogs', label: translations.blogs, icon: '📰' },
                    { path: '/about', label: translations.about, icon: '👥' },
                    { path: '/issues', label: 'Issues', icon: '🐛' },
                    { path: '/contact', label: translations.contactUs || 'Contact', icon: '📧' },
                    { path: '/privacy', label: translations.privacy || 'Privacy', icon: '📄' }
                  ].map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        location.pathname === item.path
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Language & Social */}
              <motion.div
                custom={2}
                variants={itemVariants}
                initial="closed"
                animate="open"
                className="space-y-4 pt-6 border-t border-white/10"
              >
                <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Настройки
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe size={16} className="text-blue-400" />
                      <span className="text-sm font-medium text-white/80">Язык</span>
                    </div>
                    <LanguageSwitcher />
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-medium text-white/80">Социальные сети</span>
                    </div>
                    <SocialLinks />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
