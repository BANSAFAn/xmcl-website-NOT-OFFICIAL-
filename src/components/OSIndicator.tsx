
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useOS } from "@/context/OSContext";
import { Monitor, Apple, Terminal, Smartphone, Info } from "lucide-react";

export function OSIndicator() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { osInfo } = useOS();
  
  // Icon based on detected OS
  const getOSIcon = () => {
    switch (osInfo.category) {
      case "windows":
        return <Monitor className="h-4 w-4" />;
      case "macos":
        return <Apple className="h-4 w-4" />;
      case "linux":
        return <Terminal className="h-4 w-4" />;
      case "android":
        return <Smartphone className="h-4 w-4" />;
      case "ios":
        return <Apple className="h-4 w-4" />;
      default:
        return <span className="text-xs font-mono">?</span>;
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
          accent: "bg-blue-500"
        };
      case "macos":
        return {
          bg: "from-gray-500/20 to-gray-600/20", 
          border: "border-gray-500/40",
          text: "text-gray-300",
          accent: "bg-gray-500"
        };
      case "linux":
        return {
          bg: "from-green-500/20 to-green-600/20",
          border: "border-green-500/40", 
          text: "text-green-300",
          accent: "bg-green-500"
        };
      case "android":
        return {
          bg: "from-green-400/20 to-green-500/20",
          border: "border-green-400/40",
          text: "text-green-300", 
          accent: "bg-green-400"
        };
      case "ios":
        return {
          bg: "from-indigo-500/20 to-indigo-600/20",
          border: "border-indigo-500/40",
          text: "text-indigo-300",
          accent: "bg-indigo-500"
        };
      default:
        return {
          bg: "from-gray-500/20 to-gray-600/20",
          border: "border-gray-500/40", 
          text: "text-gray-300",
          accent: "bg-gray-500"
        };
    }
  };

  const getDetailedInfo = () => {
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
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
      {/* Tab/Handle */}
      <motion.div
        className={`absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r ${colors.bg} backdrop-blur-xl border-y border-r ${colors.border} rounded-r-lg p-2 cursor-pointer shadow-lg`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        whileHover={{ x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className={`${colors.text} flex items-center gap-1`}>
          {getOSIcon()}
          <div className={`w-1 h-1 rounded-full ${colors.accent} animate-pulse`}></div>
        </div>
      </motion.div>

      {/* Expanded Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={`ml-12 bg-gradient-to-br ${colors.bg} backdrop-blur-xl border ${colors.border} rounded-lg p-4 shadow-2xl min-w-[280px]`}
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 bg-gradient-to-br ${colors.bg} rounded-lg`}>
                {getOSIcon()}
              </div>
              <div>
                <h3 className={`font-semibold ${colors.text}`}>System Information</h3>
                <p className="text-xs text-white/60">Detected environment</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${colors.accent}`}></div>
                <span className="text-white/90">{getDetailedInfo()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-cyan-400`}></div>
                <span className="text-white/70">Browser: {navigator.userAgent.includes('Chrome') ? 'Chrome' : navigator.userAgent.includes('Firefox') ? 'Firefox' : navigator.userAgent.includes('Safari') ? 'Safari' : 'Other'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-purple-400`}></div>
                <span className="text-white/70">Resolution: {screen.width}×{screen.height}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
