
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export function LicenseSection() {
  return (
    <motion.section
      className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white mb-6 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FileText className="mr-3 text-purple-400" size={28} />
        LICENSE
      </motion.h2>
      
      <motion.p
        className="text-white/80 text-lg"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <a 
          href="https://github.com/Voxelum/x-minecraft-launcher/blob/main/LICENSE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 transition-colors underline font-semibold"
        >
          MIT
        </a>
      </motion.p>
    </motion.section>
  );
}
