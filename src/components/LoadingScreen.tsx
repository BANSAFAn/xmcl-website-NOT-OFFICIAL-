
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);
    
    // Complete loading after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-minecraft-darker-blue z-50 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            {/* Animated code matrix rain effect */}
            {Array.from({ length: 20 }).map((_, index) => (
              <motion.div
                key={index}
                className="absolute text-blue-500 text-opacity-70 font-mono text-sm"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: -100,
                  opacity: 0.3 + Math.random() * 0.7
                }}
                animate={{ 
                  y: window.innerHeight + 100,
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 5,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                {Math.random().toString(36).substring(2, 7)}
              </motion.div>
            ))}
          </div>
          
          <div className="relative z-10 flex flex-col items-center max-w-md px-6">
            {/* Main XMCL logo/text with neon effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <motion.h1 
                className="text-7xl font-bold tracking-tighter"
                animate={{ 
                  textShadow: [
                    "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
                    "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)",
                    "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
                  ],
                  scale: [0.98, 1.02, 0.98]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  repeatType: "mirror" 
                }}
              >
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">XMCL</span>
              </motion.h1>
            </motion.div>
            
            {/* Subtitle */}
            <motion.p 
              className="text-xl text-white/70 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              X Minecraft Launcher
            </motion.p>
            
            {/* Loading bar with dynamic progress */}
            <div className="w-full max-w-sm">
              <motion.div 
                className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
              
              <motion.p
                className="text-sm text-white/50 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                Loading resources...
              </motion.p>
            </div>
          </div>
          
          {/* Floating particles */}
          {Array.from({ length: 25 }).map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0.5]
              }}
              transition={{ 
                duration: Math.random() * 4 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
