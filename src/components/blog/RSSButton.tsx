
import { motion } from 'framer-motion';
import { Rss } from 'lucide-react';
import { useLanguage } from '@/components/navbar/LanguageContext';
import { useToast } from '@/hooks/use-toast';

export function RSSButton() {
  const { currentLanguage } = useLanguage();
  const { toast } = useToast();

  const rssTexts = {
    en: {
      subscribe: "Subscribe to RSS",
      copied: "RSS feed URL copied to clipboard!",
      tooltip: "Get RSS feed"
    },
    ru: {
      subscribe: "Подписаться на RSS",
      copied: "Ссылка на RSS-канал скопирована в буфер обмена!",
      tooltip: "Получить RSS-канал"
    },
    uk: {
      subscribe: "Підписатися на RSS",
      copied: "Посилання на RSS-канал скопійовано в буфер обміну!",
      tooltip: "Отримати RSS-канал"
    },
    zh: {
      subscribe: "订阅 RSS",
      copied: "RSS 源链接已复制到剪贴板！",
      tooltip: "获取 RSS 源"
    }
  };

  const text = rssTexts[currentLanguage as keyof typeof rssTexts] || rssTexts.en;

  const handleRSSClick = () => {
    // Redirect to the RSS feed URL
    window.location.href = `${window.location.origin}/api/rss`;
  };

  return (
    <motion.button
      onClick={handleRSSClick}
      className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-xl text-white/80 hover:text-white transition-all duration-300 hover:border-orange-400/50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={text.tooltip}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 rounded-xl"
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Rss size={18} className="text-orange-400" />
        </motion.div>
        <span className="text-sm font-medium hidden sm:block">
          {text.subscribe}
        </span>
      </div>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
    </motion.button>
  );
}
