
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [cubes, setCubes] = useState<{ x: number; y: number; size: number; delay: number; color: string }[]>([]);
  
  useEffect(() => {
    // Generate random cubes for the background
    const newCubes = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 10,
      delay: Math.random() * 2,
      color: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 255}, ${Math.random() * 0.2 + 0.1})`
    }));
    setCubes(newCubes);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = Math.random() * 5 + (prev > 80 ? 1 : 3);
        const newProgress = prev + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 100);
    
    // Complete loading after reaching 100%
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
          {/* 3D Cube Background */}
          <div className="absolute inset-0 perspective-1000 overflow-hidden opacity-20">
            {cubes.map((cube, index) => (
              <motion.div
                key={index}
                className="absolute bg-white rounded-md"
                initial={{ 
                  x: `${cube.x}%`, 
                  y: `${cube.y}%`,
                  width: `${cube.size}px`,
                  height: `${cube.size}px`,
                  backgroundColor: cube.color,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                }}
                animate={{ 
                  rotateX: [0, 180, 360],
                  rotateY: [0, 180, 360],
                  rotateZ: [0, 180, 360],
                }}
                transition={{
                  duration: 10 + cube.delay * 5,
                  ease: "linear",
                  repeat: Infinity,
                  delay: cube.delay
                }}
              />
            ))}
          </div>
          
          {/* Background animated grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="relative z-10 flex flex-col items-center max-w-md px-6">
            {/* Main XMCL logo with 3D rotation effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8 relative"
            >
              <motion.div
                className="perspective-1000"
                animate={{
                  rotateY: [0, 10, 0, -10, 0],
                  rotateX: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.h1 
                  className="text-7xl font-bold tracking-tighter transform-style-3d"
                  animate={{ 
                    textShadow: [
                      "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
                      "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4)",
                      "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.2)",
                    ]
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
              
              {/* Orbiting minecraft blocks */}
              {[...Array(4)].map((_, index) => (
                <motion.div 
                  key={index}
                  className="absolute w-4 h-4 rounded-sm bg-accent/60"
                  initial={{ 
                    scale: 0 
                  }}
                  animate={{ 
                    scale: [0, 1, 1, 0],
                    x: [0, Math.cos(index * Math.PI/2) * 80],
                    y: [0, Math.sin(index * Math.PI/2) * 80],
                    opacity: [0, 0.8, 0.8, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 1,
                    times: [0, 0.3, 0.7, 1]
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "center center"
                  }}
                />
              ))}
            </motion.div>
            
            {/* Animated subtitle */}
            <motion.p 
              className="text-xl text-white/70 mb-8 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="relative">
                X Minecraft Launcher
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-accent/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                />
              </span>
            </motion.p>
            
            {/* Advanced loading bar */}
            <div className="w-full max-w-sm relative">
              <motion.div 
                className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-600 via-accent to-blue-600 rounded-full relative"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="flex justify-between text-sm text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <span>{Math.floor(progress)}%</span>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  Loading game resources...
                </motion.p>
              </motion.div>
            </div>
            
            {/* Loading tips */}
            <motion.div
              className="mt-8 text-white/40 text-sm max-w-xs text-center"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [10, 0, 0, -10]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                times: [0, 0.1, 0.9, 1]
              }}
            >
              <motion.p>
                Tip: XMCL supports Forge, Fabric, and Quilt modloaders
              </motion.p>
            </motion.div>
          </div>
          
          {/* Interactive floating particles */}
          {Array.from({ length: 40 }).map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0,
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                backgroundColor: index % 5 === 0 ? "#38bdf8" : 
                                 index % 3 === 0 ? "#60a5fa" : "#93c5fd",
              }}
              animate={{ 
                y: [null, Math.random() * -100 - 50],
                opacity: [0, Math.random() * 0.5 + 0.1, 0],
                scale: [0, 1, 0.5]
              }}
              transition={{ 
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
