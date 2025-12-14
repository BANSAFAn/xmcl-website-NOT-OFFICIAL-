import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme, type Theme } from "@/hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeSelector = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleTheme}
        className="relative h-10 w-10 p-0 overflow-hidden rounded-full bg-muted/80 hover:bg-accent/60 transition-colors"
        aria-label={isDark ? t('theme.light') : t('theme.dark')}
      >
        {/* Subtle background glow effect */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgb(99 102 241 / 0.5) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgb(251 191 36 / 0.5) 0%, transparent 70%)',
          }}
          animate={{ opacity: isDark ? 0.5 : 0.3 }}
          transition={{ duration: 0.4 }}
        />

        {/* Icon container with animation */}
        <div className="relative flex items-center justify-center w-full h-full">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Moon className="w-5 h-5 text-foreground" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <Sun className="w-5 h-5 text-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="sr-only">
          {isDark ? t('theme.light') : t('theme.dark')}
        </span>
      </Button>
    </motion.div>
  );
}
