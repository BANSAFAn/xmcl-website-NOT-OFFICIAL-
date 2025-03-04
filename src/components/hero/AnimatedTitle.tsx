
import { motion } from "framer-motion";

interface AnimatedTitleProps {
  title: string;
}

export function AnimatedTitle({ title }: AnimatedTitleProps) {
  return (
    <motion.h1 
      className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <span className="relative">
        {/* Toned down rainbow gradient background for text */}
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500/40 via-cyan-400/40 to-blue-500/40 bg-[length:200%_100%] animate-shimmer opacity-40 blur-lg rounded-lg"></span>
        
        {/* Text with color shift animation but not too bright */}
        <span className="relative animate-color-shift">
          {title}
        </span>
      </span>
    </motion.h1>
  );
}
