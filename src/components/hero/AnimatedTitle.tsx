
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTitleProps {
  title: string;
}

export function AnimatedTitle({ title }: AnimatedTitleProps) {
  const [visible, setVisible] = useState<boolean[]>(Array(title.length).fill(false));
  const [containerWidth, setContainerWidth] = useState(0);
  
  useEffect(() => {
    // Measure container width
    const measureWidth = () => {
      const viewportWidth = window.innerWidth;
      setContainerWidth(viewportWidth > 768 ? 700 : viewportWidth * 0.85);
    };
    
    measureWidth();
    window.addEventListener('resize', measureWidth);
    
    // Show all characters at once instead of sequentially
    setVisible(Array(title.length).fill(true));
    
    return () => {
      window.removeEventListener('resize', measureWidth);
    };
  }, [title.length]);

  return (
    <motion.h1 
      className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight flex flex-wrap justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="relative inline-block">
        {/* Background glow effect */}
        <motion.div 
          className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-400/20 rounded-xl filter blur-xl" 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.05, 0.9]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Simple text display without particles or complex animations */}
        <div className="relative text-white flex flex-wrap justify-center" style={{ maxWidth: `${containerWidth}px` }}>
          {title.split('').map((char, index) => (
            <span 
              key={index}
              className={`inline-block transition-all duration-300 relative ${visible[index] ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}
              style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.6)' }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </motion.h1>
  );
}
