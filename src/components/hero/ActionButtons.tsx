
import { motion } from "framer-motion";
import { Download, Github, Code } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import { GitHubFileViewer } from "../GitHubFileViewer";

export function ActionButtons() {
  const [showGitHubViewer, setShowGitHubViewer] = useState(false);

  return (
    <>
      <motion.div 
        className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {/* Download Button */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <HashLink
            smooth
            to="/#download"
            className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-cyan-500/50 z-10"
            onMouseEnter={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Download size={24} />
            <span>Download Now</span>
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10"
              initial={false}
            />
          </HashLink>
        </motion.div>

        {/* GitHub Button */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <button
            onClick={() => setShowGitHubViewer(true)}
            className="relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white font-bold text-lg rounded-2xl border border-slate-600 shadow-2xl transition-all duration-300 group-hover:shadow-slate-500/50 group-hover:border-slate-400 z-10"
          >
            <Code size={24} />
            <span>View Code</span>
            
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10"
              initial={false}
            />
          </button>
        </motion.div>

        {/* External GitHub Link */}
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <a
            href="https://github.com/Voxelum/x-minecraft-launcher"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-3 px-6 py-3 bg-transparent text-white font-semibold text-base rounded-xl border-2 border-white/30 transition-all duration-300 group-hover:border-white/60 group-hover:bg-white/10 z-10"
            onMouseEnter={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={20} />
            <span>GitHub</span>
          </a>
        </motion.div>
      </motion.div>

      {/* GitHub File Viewer */}
      <GitHubFileViewer 
        isOpen={showGitHubViewer} 
        onClose={() => setShowGitHubViewer(false)} 
      />
    </>
  );
}
