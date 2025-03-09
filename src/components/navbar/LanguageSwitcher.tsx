import { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { languages, useLanguage } from './LanguageContext';

interface LanguageSwitcherProps {
  onChange?: (code: string) => void;
}

export const LanguageSwitcher = ({ onChange }: LanguageSwitcherProps) => {
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { currentLanguage, setCurrentLanguage, translations } = useLanguage();

  const handleLanguageChange = (code: string) => {
    setCurrentLanguage(code as any);
    setLanguageMenuOpen(false);
    if (onChange) {
      onChange(code);
    }
  };

  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button 
            className="p-2 text-white/80 hover:text-white transition-colors hover:bg-white/5 rounded-lg hover:scale-110"
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            aria-label="Change language"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe size={20} />
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{translations.changeLanguage}</p>
        </TooltipContent>
      </Tooltip>
      
      <AnimatePresence>
        {languageMenuOpen && (
          <motion.div 
            className="absolute top-12 mt-2 bg-minecraft-darker-blue border border-white/10 rounded-lg shadow-lg p-2 w-32 z-30"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left p-2 rounded-md ${currentLanguage === lang.code ? 'bg-white/10' : 'hover:bg-white/5'}`}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ x: 3 }}
              >
                {lang.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
