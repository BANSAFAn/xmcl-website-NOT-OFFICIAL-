
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  title: string;
  onNumberEffect: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isMobile?: boolean;
}

export function AnimatedTitle({ title, onNumberEffect, isMobile = false }: AnimatedTitleProps) {
  return (
    <motion.h1 
      className={`${isMobile ? 'text-5xl sm:text-6xl' : 'text-6xl md:text-8xl lg:text-9xl'} font-black ${isMobile ? 'mb-6' : 'mb-8'} leading-tight`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.6 : 0.8, delay: isMobile ? 0.1 : 0.2 }}
    >
      <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer inline-block">
        {title}
      </span>
    </motion.h1>
  );
}
