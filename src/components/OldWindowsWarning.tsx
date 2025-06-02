
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useI18n } from "@/i18n/context";

export function OldWindowsWarning() {
  const [isOldWindows, setIsOldWindows] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useI18n();

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
                <h3 className="text-sm font-medium text-yellow-300">{t.warnings?.unsupportedWindows?.title}</h3>
                <div className="mt-2 text-sm text-yellow-200/80">
                  <p>{t.warnings?.unsupportedWindows?.message}</p>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    className="inline-flex text-xs px-3 py-1.5 rounded-md bg-yellow-800 text-yellow-200 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    {t.warnings?.unsupportedWindows?.button}
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
