
import { motion } from "framer-motion";
import { Download, Github } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { useLanguage } from "./useLanguage";

export function ActionButtons() {
  const { text } = useLanguage();

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Enhanced Animated Download Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <HashLink
          smooth
          to="/#download"
          className="relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg overflow-hidden group min-w-[200px]"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Pulsing glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <motion.div
            className="relative z-10 flex items-center gap-3"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Download size={24} />
            </motion.div>
            <span className="text-lg font-bold">Download NOW</span>
          </motion.div>
          
          {/* Sparkle effects */}
          <motion.div
            className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full"
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
          />
        </HashLink>
      </motion.div>

      {/* GitHub Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a
          href="https://github.com/Voxelum/x-minecraft-launcher"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 min-w-[200px]"
        >
          <Github size={24} />
          <span className="text-lg">{text.github}</span>
        </a>
      </motion.div>
    </motion.div>
  );
}
