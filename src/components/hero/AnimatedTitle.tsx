import { motion } from "framer-motion";
import { useEffect, useState } from "react";
interface AnimatedTitleProps {
  title: string;
}
export function AnimatedTitle({
  title
}: AnimatedTitleProps) {
  const [visible, setVisible] = useState<boolean[]>(Array(title.length).fill(false));
  useEffect(() => {
    // Digital unveiling effect - reveal characters in sequence
    const timer = setTimeout(() => {
      const revealText = () => {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex < title.length) {
            setVisible(prev => {
              const newState = [...prev];
              newState[currentIndex] = true;
              return newState;
            });
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, 80); // Speed of character reveal

        return () => clearInterval(interval);
      };
      return revealText();
    }, 500);
    return () => clearTimeout(timer);
  }, [title]);
  return <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.7
  }}>
      <div className="relative inline-block">
        {/* Background glow effect */}
        <motion.div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-400/20 rounded-xl filter blur-xl" initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: [0.2, 0.5, 0.2],
        scale: [0.9, 1.05, 0.9],
        rotate: [0, 5, 0]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse"
      }} />

        {/* Digital text effect */}
        <div className="relative text-white">
          {title.split('').map((char, index) => <span key={index} className={`inline-block transition-all duration-300 relative ${visible[index] ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`} style={{
          textShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
          animation: visible[index] ? `digitalGlitch 0.5s ease forwards ${index * 0.05}s, shimmer 3s infinite 1s` : 'none'
        }}>
              {/* Digital noise overlay */}
              {visible[index] && <span style={{
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }} className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden opacity-0 animate-digital-noise px-0">
                  {char === " " ? "\u00A0" : char}
                </span>}
              
              {/* Main character */}
              {char === " " ? "\u00A0" : char}
            </span>)}
        </div>
        
        {/* Glitch effect particles */}
        <motion.div className="absolute inset-0 pointer-events-none" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 1.5,
        duration: 0.5
      }}>
          {[...Array(12)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-white/70" initial={{
          x: `${Math.random() * 100}%`,
          y: `${Math.random() * 100}%`,
          opacity: 0.3
        }} animate={{
          y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.5, 1]
        }} transition={{
          duration: 3 + i,
          repeat: Infinity,
          ease: "easeInOut"
        }} />)}
        </motion.div>
      </div>
    </motion.h1>;
}