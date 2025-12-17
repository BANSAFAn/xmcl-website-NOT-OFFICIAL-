import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import { X, Menu, Home, FileText, BookOpen, GitBranch, AlertCircle, TestTube, Info, ExternalLink } from 'lucide-react';
import { Link } from '@/components/Link';

  const navItems = [
    { label: 'nav.home', href: '/', icon: Home },
    { label: 'nav.blog', href: '/blog', icon: FileText },
    { label: 'nav.guide', href: '/guide', icon: BookOpen },
    { label: 'nav.changelog', href: '/changelog', icon: GitBranch },
    { label: 'nav.issues', href: '/issues', icon: AlertCircle },
    { label: 'nav.testing', href: '/testing', icon: TestTube },
    { label: 'nav.information', href: '/information', icon: Info },
  ];

  export const StaggeredMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
  
    const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  
  const menuVariants = {
    closed: { 
      opacity: 0, 
      scale: 0.9, 
      y: -20,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Trigger Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg flex items-center justify-center group relative z-50 transition-all hover:shadow-indigo-500/20"
        onClick={toggleMenu}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-[2px] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-16 w-80 z-50 overflow-hidden"
          >
            <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-2 flex flex-col gap-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              <nav className="flex flex-col gap-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  // @ts-ignore
                  const isExternal = item.isExternal;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={toggleMenu}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/10 transition-all border border-transparent hover:border-black/5 dark:hover:border-white/5 active:scale-95 duration-200"
                        target={isExternal ? '_blank' : '_self'}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                      >
                        <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                        {t(item.label)}
                        {isExternal && <ExternalLink className="w-3 h-3 ml-auto opacity-50" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mx-2 my-2 border-t border-black/5 dark:border-white/5" />

              {/* Socials & Settings */}
              <div className="p-2 grid grid-cols-2 gap-2">
                 <div className="col-span-2 grid grid-cols-4 gap-2 mb-2">
                    <a href="https://discord.gg/W5XVwYY7GQ" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 hover:scale-105 transition-all shadow-sm border border-indigo-500/10">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/></svg>
                    </a>
                    <a href="https://kook.top/wM7X1f" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-2xl bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:scale-105 transition-all shadow-sm border border-green-500/10">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    <a href="https://afdian.com/@ci010" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-2xl bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 hover:scale-105 transition-all shadow-sm border border-purple-500/10">
                       <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.013 7.15l-3.376 6.345h6.77L12.013 7.15zM24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zm-3.832.748l-4.103-8.89a.537.537 0 0 0-.486-.312h-7.14a.54.54 0 0 0-.5.334l-3.793 8.868a.54.54 0 0 0 .493.766h2.49l.643-1.39h8.336l.724 1.39h2.86a.54.54 0 0 0 .476-.766z"/></svg>
                    </a>
                    <a href="https://ko-fi.com/ci010" target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center rounded-2xl bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 hover:scale-105 transition-all shadow-sm border border-sky-500/10">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 3.722-2.671 3.722-2.671s2.111-2.905 2.927-4.245zM12.896 15.556h-7.39V6.02h7.39v9.536zm8.82-3.41s-1.464 2.47-3.834 1.956c0 0 .61-3.66 1.408-5.398 0 0 1.957.519 2.426 3.442zM7.226 8.524c-.219.006-.412.106-.525.275-.773 1.166.309 3.003 1.488 4.343.344.391.802.407 1.157.102 1.325-1.139 2.536-2.923 1.636-4.254-.109-.161-.295-.259-.507-.266-.466.012-.862.241-1.258.463-.39-.228-.79-.462-1.264-.474l-.727-.189z"/></svg>
                    </a>
                  </div>
                  <div className="flex items-center justify-center p-1">
                    <LanguageSelector />
                  </div>
                  <div className="flex items-center justify-center p-1">
                    <ThemeSelector />
                  </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
