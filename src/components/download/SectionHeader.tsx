
import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  versionLabel: string;
  versionTag: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  versionLabel, 
  versionTag 
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-gradient-cyan">{title}</span>
      </motion.h2>
      <motion.p 
        className="text-white/70 max-w-2xl mx-auto text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {subtitle}
      </motion.p>
      <motion.div 
        className="inline-block mt-6 py-1 px-4 bg-white/10 rounded-full text-sm font-medium"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {versionLabel} {versionTag}
      </motion.div>
    </div>
  );
}
