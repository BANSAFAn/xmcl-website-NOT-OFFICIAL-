
import { motion } from "framer-motion";

interface PrivacyHeaderProps {
  title: string;
}

export const PrivacyHeader = ({ title }: PrivacyHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="relative inline-block"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
          <span className="text-gradient-cyan">{title}</span>
        </h1>
        
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-accent/5 rounded-xl -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        />
        
        <motion.div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent"
          initial={{ width: 0 }}
          animate={{ width: "120%" }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-4 text-white/60 max-w-lg mx-auto"
      >
        <p>This document outlines how we collect, use, and protect your information</p>
      </motion.div>
    </motion.div>
  );
};
