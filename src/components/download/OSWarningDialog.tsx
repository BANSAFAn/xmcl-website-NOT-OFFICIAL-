
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check } from "lucide-react";
import { useOS } from "@/context/OSContext";

export function OSWarningDialog() {
  const { osInfo, showOSWarning, setShowOSWarning, acknowledgeWarning } = useOS();
  const [countdown, setCountdown] = useState(10);
  const [canProceed, setCanProceed] = useState(false);
  
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
    switch (osInfo.category) {
      case "linux":
        return `We've detected that you're using Linux${osInfo.distribution ? ` (${osInfo.distribution})` : ''}. The downloads shown are optimized for your system.`;
      case "macos":
        return "We've detected that you're using macOS. The downloads shown are optimized for your system.";
      case "windows":
        return "We've detected that you're using Windows. The downloads shown are optimized for your system.";
      default:
        return "We've automatically selected downloads compatible with your operating system.";
    }
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
            <h3 className="text-xl font-semibold text-white">Operating System Mismatch</h3>
          </div>
          
          <div className="mb-6 text-white/80">
            <p className="mb-3">{getWarningMessage()}</p>
            <p>Viewing downloads for other operating systems may not be suitable for your device. Are you sure you want to proceed?</p>
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
              onClick={() => setShowOSWarning(false)}
            >
              Cancel
            </button>
            
            <motion.div className="relative">
              {!canProceed ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-white">
                    {countdown}
                  </div>
                  <span className="text-white/60">Please wait...</span>
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
                  Proceed Anyway
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
