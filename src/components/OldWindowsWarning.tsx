
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useLanguage } from "@/components/navbar/LanguageContext";

export function OldWindowsWarning() {
  const [isOldWindows, setIsOldWindows] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { currentLanguage } = useLanguage();

  // Detect old Windows versions
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('windows nt 5.1') || // Windows XP
        ua.includes('windows nt 6.0') || // Windows Vista
        ua.includes('windows nt 6.1') || // Windows 7
        ua.includes('windows nt 6.2') || // Windows 8
        ua.includes('windows nt 6.3')) { // Windows 8.1
      setIsOldWindows(true);
      setIsVisible(true);
    }
  }, []);

  // Only show if it's an old Windows version
  if (!isOldWindows) return null;

  const translations = {
    en: {
      title: "Unsupported Windows Version",
      message: "You are using Windows XP, Vista, 7, or 8. These Windows versions are no longer supported by XMCL. You can browse the website, but downloading the launcher will not work on your system.",
      button: "I understand"
    },
    ru: {
      title: "Неподдерживаемая версия Windows",
      message: "Вы используете Windows XP, Vista, 7 или 8. Эти версии Windows больше не поддерживаются XMCL. Вы можете просматривать сайт, но скачивание лаунчера не будет работать на вашей системе.",
      button: "Я понимаю"
    },
    uk: {
      title: "Непідтримувана версія Windows",
      message: "Ви використовуєте Windows XP, Vista, 7 або 8. Ці версії Windows більше не підтримуються XMCL. Ви можете переглядати сайт, але завантаження лаунчера не працюватиме на вашій системі.",
      button: "Я розумію"
    },
    zh: {
      title: "不支持的 Windows 版本",
      message: "您正在使用 Windows XP、Vista、7 或 8。XMCL 不再支持这些 Windows 版本。您可以浏览网站，但启动器下载将无法在您的系统上运行。",
      button: "我明白了"
    }
  };

  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-20 left-0 right-0 mx-auto w-full max-w-md z-50 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-yellow-900/90 backdrop-blur-md border border-yellow-600/30 rounded-lg shadow-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-yellow-300">{text.title}</h3>
                <div className="mt-2 text-sm text-yellow-200/80">
                  <p>{text.message}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    className="inline-flex text-xs px-3 py-1.5 rounded-md bg-yellow-800 text-yellow-200 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {text.button}
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="text-yellow-400 hover:text-yellow-300 ml-auto flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
