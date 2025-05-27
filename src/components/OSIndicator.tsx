
import { motion } from "framer-motion";
import { useOS } from "@/context/OSContext";
import { Monitor, Apple, Terminal, Smartphone } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function OSIndicator() {
  const { osInfo } = useOS();
  
  // Icon based on detected OS
  const getOSIcon = () => {
    switch (osInfo.category) {
      case "windows":
        return <Monitor className="h-5 w-5" />;
      case "macos":
        return <Apple className="h-5 w-5" />;
      case "linux":
        return <Terminal className="h-5 w-5" />;
      case "android":
        return <Smartphone className="h-5 w-5" />;
      case "ios":
        return <Apple className="h-5 w-5" />;
      default:
        return <span className="text-sm font-mono">?</span>;
    }
  };
  
  // Colors based on OS
  const getColors = () => {
    switch (osInfo.category) {
      case "windows":
        return {
          bg: "from-blue-500/20 to-blue-600/20",
          border: "border-blue-500/40",
          text: "text-blue-300",
          glow: "shadow-blue-500/20"
        };
      case "macos":
        return {
          bg: "from-gray-500/20 to-gray-600/20",
          border: "border-gray-500/40",
          text: "text-gray-300",
          glow: "shadow-gray-500/20"
        };
      case "linux":
        return {
          bg: "from-green-500/20 to-green-600/20",
          border: "border-green-500/40",
          text: "text-green-300",
          glow: "shadow-green-500/20"
        };
      case "android":
        return {
          bg: "from-green-400/20 to-green-500/20",
          border: "border-green-400/40",
          text: "text-green-300",
          glow: "shadow-green-400/20"
        };
      case "ios":
        return {
          bg: "from-indigo-500/20 to-indigo-600/20",
          border: "border-indigo-500/40",
          text: "text-indigo-300",
          glow: "shadow-indigo-500/20"
        };
      default:
        return {
          bg: "from-gray-500/20 to-gray-600/20",
          border: "border-gray-500/40",
          text: "text-gray-300",
          glow: "shadow-gray-500/20"
        };
    }
  };

  // Enhanced tooltip text with more OS details
  const getTooltipText = () => {
    let details = `${osInfo.displayName}`;
    
    if (osInfo.version) {
      details += ` ${osInfo.version}`;
    }
    
    if (osInfo.distribution) {
      details += ` (${osInfo.distribution})`;
    }
    
    // Add architecture information if available
    const cpuArch = navigator.userAgent.match(/(x86_64|amd64|arm64|aarch64|x86|i686)/i)?.[1];
    if (cpuArch) {
      details += ` • ${cpuArch}`;
    }
    
    return details;
  };

  const colors = getColors();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            className={`fixed bottom-6 left-6 z-50 bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} rounded-2xl p-4 shadow-2xl ${colors.glow}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 1.5
            }}
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
              y: -5
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className={`${colors.text} flex items-center justify-center`}
              whileHover={{ rotate: 15 }}
              transition={{ duration: 0.3 }}
            >
              {getOSIcon()}
            </motion.div>
            
            {/* Pulse effect */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-2xl opacity-50`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </TooltipTrigger>
        <TooltipContent 
          side="right" 
          className="max-w-xs bg-black/90 backdrop-blur-xl border border-white/20 text-white shadow-2xl"
        >
          <div className="space-y-1">
            <p className="font-semibold">{getTooltipText()}</p>
            <p className="text-xs text-white/60">Detected operating system</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
