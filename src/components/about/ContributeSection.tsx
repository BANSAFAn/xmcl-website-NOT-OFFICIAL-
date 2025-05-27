
import { motion } from "framer-motion";
import { GitBranch, Globe, Heart } from "lucide-react";

export function ContributeSection() {
  return (
    <motion.section
      className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white mb-6 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <GitBranch className="mr-3 text-blue-400" size={28} />
        Contribute
      </motion.h2>
      
      <div className="space-y-6">
        <motion.div
          className="flex items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <a 
            href="https://deepwiki.com/Voxelum/x-minecraft-launcher" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img 
              src="https://deepwiki.com/badge.svg" 
              alt="Ask DeepWiki" 
              className="h-8"
            />
          </a>
        </motion.div>
        
        <div className="space-y-4 text-white/80">
          <motion.p
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Heart className="text-red-400 mt-1 flex-shrink-0" size={16} />
            For general developer, see{" "}
            <a 
              href="https://github.com/Voxelum/x-minecraft-launcher/blob/main/CONTRIBUTING.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Contributing
            </a>
          </motion.p>
          
          <motion.p
            className="flex items-start gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Globe className="text-green-400 mt-1 flex-shrink-0" size={16} />
            For i18n localization developer, please follow{" "}
            <a 
              href="https://docs.xmcl.app/en/guide/i18n" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Getting Started with Localization
            </a>
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
