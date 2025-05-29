
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check } from "lucide-react";
import { useOS } from "@/context/OSContext";

type Translations = {
  title: string;
  detected: string;
  warning: string;
  proceed: string;
  wait: string;
}

const translations: Record<string, Translations> = {
  en: {
    title: "Operating System Mismatch",
    detected: "We've detected that you're using",
    warning: "Viewing downloads for other operating systems may not be suitable for your device. Are you sure you want to proceed?",
    proceed: "Proceed Anyway",
    wait: "Please wait..."
  },
  ru: {
    title: "Несоответствие операционной системы",
    detected: "Мы обнаружили, что вы используете",
    warning: "Просмотр загрузок для других операционных систем может не подходить для вашего устройства. Вы уверены, что хотите продолжить?",
    proceed: "Все равно продолжить",
    wait: "Пожалуйста, подождите..."
  },
  uk: {
    title: "Невідповідність операційної системи",
    detected: "Ми виявили, що ви використовуєте",
    warning: "Перегляд завантажень для інших операційних систем може не підходити для вашого пристрою. Ви впевнені, що хочете продовжити?",
    proceed: "Все одно продовжити",
    wait: "Будь ласка, зачекайте..."
  },
  zh: {
    title: "操作系统不匹配",
    detected: "我们检测到您正在使用",
    warning: "查看适用于其他操作系统的下载可能不适合您的设备。您确定要继续吗？",
    proceed: "仍然继续",
    wait: "请稍候..."
  },
  de: {
    title: "Betriebssystem-Fehlanpassung",
    detected: "Wir haben festgestellt, dass Sie verwenden",
    warning: "Das Ansehen von Downloads für andere Betriebssysteme ist möglicherweise nicht für Ihr Gerät geeignet. Sind Sie sicher, dass Sie fortfahren möchten?",
    proceed: "Trotzdem fortfahren",
    wait: "Bitte warten..."
  },
  ja: {
    title: "オペレーティングシステムの不一致",
    detected: "あなたが使用しているのは",
    warning: "他のオペレーティングシステム向けのダウンロードを表示することは、お使いのデバイスに適していない可能性があります。続行してもよろしいですか？",
    proceed: "とにかく続行する",
    wait: "お待ちください..."
  }
};

export function OSWarningDialog() {
  const { osInfo, showOSWarning, setShowOSWarning, acknowledgeWarning } = useOS();
  const [countdown, setCountdown] = useState(10);
  const [canProceed, setCanProceed] = useState(false);
  const [language, setLanguage] = useState('en');
  
  // Get language from localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(storedLanguage);
  }, []);
  
  // Translations
  const text = translations[language] || translations.en;
  
  useEffect(() => {
    if (showOSWarning && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
    
    if (countdown === 0) {
      setCanProceed(true);
    }
  }, [showOSWarning, countdown]);
  
  // Reset countdown when dialog is closed
  useEffect(() => {
    if (!showOSWarning) {
      setCountdown(10);
      setCanProceed(false);
    }
  }, [showOSWarning]);
  
  // Get appropriate messages based on detected OS
  const getWarningMessage = () => {
    let osName = "";
    
    switch (osInfo.category) {
      case "linux":
        osName = `Linux${osInfo.distribution ? ` (${osInfo.distribution})` : ''}`;
        break;
      case "macos":
        osName = "macOS";
        break;
      case "windows":
        osName = "Windows";
        break;
      default:
        osName = "your current operating system";
    }
    
    return `${text.detected} ${osName}. The downloads shown are optimized for your system.`;
  };
  
  if (!showOSWarning) return null;
  
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div 
          className="bg-minecraft-dark-blue border border-accent/20 rounded-lg shadow-lg max-w-lg w-full p-6"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-white">{text.title}</h3>
          </div>
          
          <div className="mb-6 text-white/80">
            <p className="mb-3">{getWarningMessage()}</p>
            <p>{text.warning}</p>
          </div>
          
          <div className="flex items-center justify-end">
            <motion.div className="relative">
              {!canProceed ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-white">
                    {countdown}
                  </div>
                  <span className="text-white/60">{text.wait}</span>
                </div>
              ) : (
                <motion.button
                  className="px-4 py-2 bg-accent text-white rounded-md flex items-center gap-2"
                  onClick={acknowledgeWarning}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Check className="h-4 w-4" />
                  {text.proceed}
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
