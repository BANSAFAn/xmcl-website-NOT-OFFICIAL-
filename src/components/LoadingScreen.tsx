
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time (minimum 1.5 seconds for the animation to be visible)
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-minecraft-darker-blue z-50 flex flex-col items-center justify-center"
        >
          <div className="relative">
            {/* Retro X animation */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative flex items-center justify-center mb-8"
            >
              <div className="absolute w-20 h-20 bg-accent opacity-30 rounded-full filter blur-xl animate-pulse-slow"></div>
              <div className="relative">
                <motion.div
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    textShadow: [
                      "0 0 5px rgba(30, 174, 219, 0.5)",
                      "0 0 20px rgba(30, 174, 219, 0.8)",
                      "0 0 5px rgba(30, 174, 219, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-6xl font-bold text-accent"
                  style={{ textShadow: "0 0 10px rgba(30, 174, 219, 0.7)" }}
                >
                  X
                </motion.div>
              </div>
            </motion.div>
            
            {/* Launcher text */}
            <motion.div 
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold mb-2">X Minecraft Launcher</h2>
              <p className="text-white/60 text-sm">Loading...</p>
            </motion.div>
            
            {/* Retro loading bar */}
            <motion.div 
              className="mt-8 w-64 h-2 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-blue-500 via-accent to-blue-500 rounded-full"
              />
            </motion.div>
            
            {/* Retro pixels */}
            <div className="absolute inset-0 pointer-events-none select-none opacity-10">
              <div className="absolute inset-0 grid grid-cols-[repeat(40,1fr)] grid-rows-[repeat(40,1fr)]">
                {Array.from({ length: 80 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: Math.random() }}
                    transition={{ 
                      duration: Math.random() * 2 + 0.5, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
