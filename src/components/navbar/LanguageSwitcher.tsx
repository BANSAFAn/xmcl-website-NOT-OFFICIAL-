
import { useState } from 'react';
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

const languageFlags = {
  en: "🇬🇧",
  ru: "🇷🇺",
  uk: "🇺🇦",
  zh: "🇨🇳",
  de: "🇩🇪",
  ja: "🇯🇵"
};

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
            className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
            onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, type: "tween" }}
          >
            <span className="text-lg">{languageFlags[currentLanguage as keyof typeof languageFlags]}</span>
            <span className="text-sm font-medium hidden md:block">
              {languages.find(l => l.code === currentLanguage)?.name}
            </span>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{translations.changeLanguage}</p>
        </TooltipContent>
      </Tooltip>
      
      <AnimatePresence>
        {languageMenuOpen && (
          <motion.div 
            className="absolute top-12 right-0 mt-2 bg-minecraft-darker-blue border border-white/10 rounded-lg shadow-lg p-2 w-48 z-30"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, type: "tween" }}
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left p-2 rounded-md flex items-center gap-2 ${
                  currentLanguage === lang.code ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ x: 3 }}
              >
                <span className="text-lg">{languageFlags[lang.code as keyof typeof languageFlags]}</span>
                <span className="text-sm">{lang.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
