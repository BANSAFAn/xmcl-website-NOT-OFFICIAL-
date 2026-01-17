import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { useTheme } from "@/hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeSelector = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      className="relative"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative h-10 w-10 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors border border-transparent dark:border-white/5 shadow-sm"
        aria-label={isDark ? t('theme.light') : t('theme.dark')}
      >
        {/* Фоновое свечение (Glow effect) */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: isDark
              ? 'radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%)' // Индиго для ночи
              : 'radial-gradient(circle at center, rgba(251, 191, 36, 0.4) 0%, transparent 70%)', // Янтарь для дня
          }}
          animate={{ opacity: isDark ? 0.6 : 0.4 }}
          transition={{ duration: 0.5 }}
        />

        {/* Контейнер иконки */}
        <div className="relative z-10 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Moon className="w-5 h-5 text-indigo-300 fill-indigo-300/20" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Sun className="w-5 h-5 text-amber-500 fill-amber-500/20" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Button>
    </motion.div>
  );
}
