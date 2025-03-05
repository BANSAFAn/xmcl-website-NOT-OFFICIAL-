
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, FileText, Newspaper, History, BookMarked } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinks } from './SocialLinks';
import { DownloadButton } from './DownloadButton';
import { LanguageCode } from './LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLanguageChange: (lang: LanguageCode) => void;
}

export function MobileMenu({ isOpen, onClose, onLanguageChange }: MobileMenuProps) {
  const menuItems = [
    {
      icon: <BookMarked size={20} />,
      title: 'Guide',
      link: '/guide',
      external: false
    },
    {
      icon: <FileText size={20} />,
      title: 'Privacy Policy',
      link: '/privacy',
      external: false
    },
    {
      icon: <History size={20} />,
      title: 'Changelogs',
      link: '/changelogs',
      external: false
    },
    {
      icon: <Newspaper size={20} />,
      title: 'Blog',
      link: 'https://xmcl.app/en/blog/',
      external: true
    }
  ];

  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      transition: {
        type: 'spring',
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        mass: 0.5,
        stiffness: 100,
        damping: 15
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        type: 'spring',
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }),
    exit: (i: number) => ({
      opacity: 0,
      y: 10,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-minecraft-darker-blue/95 shadow-xl p-6"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close button */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mb-8">
              <ul className="space-y-4">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.title}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {item.external ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                        onClick={onClose}
                      >
                        <span className="mr-3 text-accent">{item.icon}</span>
                        {item.title}
                      </a>
                    ) : (
                      <Link
                        to={item.link}
                        className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                        onClick={onClose}
                      >
                        <span className="mr-3 text-accent">{item.icon}</span>
                        {item.title}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Language Switcher */}
            <motion.div 
              variants={itemVariants}
              custom={menuItems.length + 1}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold mb-3">Language</h3>
              <LanguageSwitcher onChange={onLanguageChange} />
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              custom={menuItems.length + 2}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold mb-3">Connect</h3>
              <SocialLinks />
            </motion.div>

            {/* Download Button */}
            <motion.div
              variants={itemVariants}
              custom={menuItems.length + 3}
              className="pt-4"
            >
              <DownloadButton fullWidth={true} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
