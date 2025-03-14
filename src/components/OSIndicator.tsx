
import { motion } from "framer-motion";
import { useOS } from "@/context/OSContext";
import { Monitor, Apple, Terminal } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function OSIndicator() {
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
      default:
        return <span className="text-xs">?</span>;
    }
  };
  
  // Background color based on OS
  const getBgColor = () => {
    switch (osInfo.category) {
      case "windows":
        return "bg-blue-500";
      case "macos":
        return "bg-gray-800";
      case "linux":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  // Enhanced tooltip text with more OS details
  const getTooltipText = () => {
    let details = `Detected: ${osInfo.displayName}`;
    
    if (osInfo.category === "windows") {
      details += ` (${navigator.userAgent.match(/Windows NT (\d+\.\d+)/)?.[1] || ""})`;
    } else if (osInfo.category === "macos") {
      const macVersion = navigator.userAgent.match(/Mac OS X (\d+[._]\d+)/)?.[1]?.replace('_', '.');
      details += macVersion ? ` (${macVersion})` : "";
    } else if (osInfo.category === "linux") {
      if (osInfo.distribution) {
        details += ` (${osInfo.distribution})`;
      }
      
      // Try to detect more Linux details from user agent
      const kernelVersion = navigator.userAgent.match(/Linux ([a-z0-9.-]+)/i)?.[1];
      if (kernelVersion) {
        details += ` - Kernel: ${kernelVersion}`;
      }
    }
    
    // Add architecture information if available
    const cpuArch = navigator.userAgent.match(/(x86_64|amd64|arm64|aarch64|x86|i686)/i)?.[1];
    if (cpuArch) {
      details += ` - Architecture: ${cpuArch}`;
    }
    
    return details;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div 
            className={`fixed bottom-4 left-4 z-50 ${getBgColor()} text-white rounded-full p-3 shadow-lg`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 1
            }}
            whileHover={{ 
              scale: 1.2,
              rotate: 15
            }}
          >
            {getOSIcon()}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <p>{getTooltipText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
