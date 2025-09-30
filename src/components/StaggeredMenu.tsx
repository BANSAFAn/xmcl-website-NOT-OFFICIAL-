import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useTranslation } from '@/contexts/TranslationContext';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSelector } from '@/components/ThemeSelector';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Оптимизированный ShuffleText — используем memo
const ShuffleText = ({ children }: { children: React.ReactNode }) => {
  const text = String(children);
  const [isShuffled, setIsShuffled] = useState(false);

  return (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: index * 0.015,
              duration: 0.4,
              ease: 'easeOut' as const
            }
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'center',
            transform: isShuffled ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
          onAnimationStart={() => setIsShuffled(true)}
          onAnimationComplete={() => setIsShuffled(false)}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const navItems = [
  { label: 'nav.home', href: '/' },
  { label: 'nav.blog', href: '/blog' },
  { label: 'nav.guide', href: '/guide' },
  { label: 'nav.changelog', href: '/changelog' },
  { label: 'nav.issues', href: '/issues' },
  { label: 'nav.testing', href: '/testing' },
  { label: 'nav.discordnav', href: 'https://discord.gg/W5XVwYY7GQ' },
];

export const StaggeredMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  // useCallback для обработчиков
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      filter: 'blur(4px)',
      textShadow: '0 0 8px rgba(255, 0, 255, 0.6)'
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      textShadow: 'none',
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15
      }
    }
  };

  const sidebarVariants = {
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 20
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 20
      }
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        className="text-foreground hover:bg-accent/50" 
        onClick={toggleMenu}
      >
        Menu
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-0 left-0 bg-background/95 dark:bg-background/95 z-50 flex flex-col items-start justify-start px-4 py-8 shadow-xl border-r border-accent/20 rounded-r-xl h-screen overflow-y-auto"
            style={{ width: '24rem' }}
          >
            <div className="absolute top-4 right-4 z-10">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleMenu} // Закрытие по нажатию
                className="hover:bg-accent/30"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex flex-col w-full h-full justify-center pt-12">
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full space-y-0"
              >
                {navItems.map((item, index) => (
                  <motion.li 
                    key={index} 
                    variants={itemVariants}
                    className="text-2xl font-bold uppercase tracking-wider hover:text-primary transition-colors relative group"
                  >
                    <Link 
                      to={item.href} 
                      onClick={toggleMenu}
                      className="inline-flex items-center gap-3 group-hover:text-primary"
                    >
                      <span className="text-xl opacity-50 whitespace-nowrap">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <ShuffleText>{t(item.label)}</ShuffleText>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="mt-auto flex gap-6 p-4 border-t border-accent/20 w-full pb-6">
                <LanguageSelector />
                <ThemeSelector />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};