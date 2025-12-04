import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import { X, Menu, Home, FileText, BookOpen, GitBranch, AlertCircle, TestTube, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Выносим массив за пределы компонента, чтобы он не пересоздавался при каждом рендере
const navItems = [
  { label: 'nav.home', href: '/', icon: Home },
  { label: 'nav.blog', href: '/blog', icon: FileText },
  { label: 'nav.guide', href: '/guide', icon: BookOpen },
  { label: 'nav.changelog', href: '/changelog', icon: GitBranch },
  { label: 'nav.issues', href: '/issues', icon: AlertCircle },
  { label: 'nav.testing', href: '/testing', icon: TestTube },
  { label: 'nav.information', href: '/information', icon: Info },
  { label: 'nav.discordnav', href: 'https://discord.gg/W5XVwYY7GQ', icon: ExternalLink, isExternal: true },
];

export const StaggeredMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  // Упрощенные варианты анимации для элементов списка
  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06, // Уменьшил задержку для большей скорости
        delayChildren: 0.1,
      },
    },
  };

  // Анимация для боковой панели
  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    open: {
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // Анимация для оверлея
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <>
      <Button variant="ghost" className="text-foreground hover:bg-accent/50" onClick={toggleMenu}>
        <Menu className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Упрощенный оверлей без `backdrop-blur` для производительности */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed top-0 left-0 bg-background z-50 flex flex-col shadow-2xl h-screen"
              style={{ width: '320px' }} // Фиксированная ширина в px
            >
              <div className="flex justify-end p-4">
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="flex flex-col flex-1 px-6">
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1"
                >
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.li key={index} variants={itemVariants}>
                        <Link
                          to={item.href}
                          onClick={toggleMenu}
                          className="flex items-center gap-3 px-3 py-3 rounded-md text-lg font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200 ease-out"
                          target={item.isExternal ? '_blank' : '_self'}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
                        >
                          <Icon className="w-5 h-5" />
                          {t(item.label)}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <div className="flex gap-2 p-4 mt-auto border-t border-border">
                  <LanguageSelector />
                  <ThemeSelector />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
