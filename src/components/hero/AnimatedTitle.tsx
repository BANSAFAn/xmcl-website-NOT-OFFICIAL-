
import { motion } from "framer-motion";
import { useState } from "react";

interface AnimatedTitleProps {
  title: string;
  onNumberEffect: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function AnimatedTitle({ title, onNumberEffect }: AnimatedTitleProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-slate-700/20 to-slate-800/20 blur-3xl rounded-full"
        animate={{
          scale: isHovered ? 1.05 : 1,
          opacity: isHovered ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      
      <h1 className="relative z-10">
        <motion.a
          onClick={onNumberEffect}
          className="cursor-pointer block text-center"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
        >
          {/* Main title with beautiful gradient */}
          <div className="flex flex-wrap justify-center items-center gap-3 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
            {/* X with gradient */}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <span className="bg-gradient-to-r from-slate-200 via-white to-slate-300 bg-clip-text text-transparent font-bold drop-shadow-lg">
                X
              </span>
            </motion.span>
            
            {/* Minecraft with gradient */}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent font-bold drop-shadow-lg">
                Minecraft
              </span>
            </motion.span>
            
            {/* Launcher with gradient */}
            <motion.span
              className="relative inline-block"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent font-bold drop-shadow-lg">
                Launcher
              </span>
            </motion.span>
          </div>
          
          {/* Elegant underline */}
          <motion.div
            className="mx-auto mt-6 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full shadow-lg"
            initial={{ width: "0%" }}
            animate={{ width: "40%" }}
            whileHover={{ width: "50%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          
          {/* Subtle decorative elements */}
          <motion.div
            className="flex justify-center mt-4 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="w-2 h-2 bg-blue-500/60 rounded-full"></div>
            <div className="w-2 h-2 bg-purple-500/60 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500/60 rounded-full"></div>
          </motion.div>
        </motion.a>
      </h1>
    </motion.div>
  );
}
