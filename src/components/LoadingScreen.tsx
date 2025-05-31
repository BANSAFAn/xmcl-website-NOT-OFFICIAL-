
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
    // Генерируем меньше кубов для фона (10 вместо 30)
    const newCubes = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10, // Уменьшаем разброс размеров
      delay: Math.random() * 1, // Уменьшаем задержку
      color: `rgba(100, 150, 255, ${Math.random() * 0.15 + 0.05})` // Упрощаем цвета
    }));
    setCubes(newCubes);
    
    // Более стабильный прогресс загрузки
    const interval = setInterval(() => {
      setProgress(prev => {
        // Более предсказуемые инкременты для плавности
        const increment = 2 + (prev > 80 ? 1 : 2);
        const newProgress = prev + increment;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 150); // Увеличиваем интервал для снижения нагрузки
    
    // Сокращаем время загрузки с 3000мс до 2000мс
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 2000);
    
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
          {/* Оптимизированный фон с кубами */}
          <div className="absolute inset-0 perspective-500 overflow-hidden opacity-10">
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
                }}
                animate={{ 
                  rotateY: [0, 360], // Упрощаем анимацию до одной оси
                }}
                transition={{
                  duration: 8, // Фиксированная длительность
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
            {/* Максимально упрощенный логотип XMCL */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6 relative"
            >
              <h1 className="text-7xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">XMCL</span>
              </h1>
              
              {/* Один орбитальный блок с простой анимацией */}
              <motion.div 
                className="absolute w-4 h-4 rounded-sm bg-accent/40"
                animate={{ 
                  x: [0, 40, 0, -40, 0],
                  y: [0, -40, 0, 40, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)"
                }}
              />
            </motion.div>
            
            {/* Статический подзаголовок без анимации */}
            <p className="text-xl text-white/70 mb-8">
              X Minecraft Launcher
            </p>
            
            {/* Упрощенный индикатор загрузки */}
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${progress}%` }}
                // Убираем transition для более быстрого обновления
              />
            </div>
            
            {/* Простой текст загрузки без анимации */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Loading XMCL... {Math.round(progress)}%
              </p>
            </div>
            
            {/* Статическая подсказка */}
            <div className="mt-6 max-w-xs text-center opacity-50">
              <p className="text-gray-500 text-xs">
                Tip: XMCL supports multiple Minecraft versions and mod loaders.
              </p>
            </div>
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
