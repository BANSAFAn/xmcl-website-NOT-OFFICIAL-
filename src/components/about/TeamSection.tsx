
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export function TeamSection() {
  const teamMember = {
    name: "ci010",
    role: "Lead Developer & Project Founder",
    avatar: "/lovable-uploads/dd52656a-b3bb-4590-80c0-4e3d32bcb862.png",
    description: "Passionate developer creating modern tools for the Minecraft community. Dedicated to building open-source software that enhances the gaming experience.",
    github: "https://github.com/ci010"
  };

  return (
    <motion.section
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-10 mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.h2 
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Project Creator
        </span>
      </motion.h2>
      
      <div className="flex justify-center">
        <motion.div 
          className="max-w-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Avatar */}
          <motion.div 
            className="relative mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
              <img 
                src={teamMember.avatar}
                alt={teamMember.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </motion.div>

          {/* Info */}
          <h3 className="text-2xl font-bold text-white mb-2">{teamMember.name}</h3>
          <p className="text-blue-400 font-semibold mb-4">{teamMember.role}</p>
          <p className="text-white/70 mb-6 leading-relaxed">{teamMember.description}</p>
          
          {/* GitHub Link */}
          <motion.a
            href={teamMember.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl border border-gray-600 hover:border-gray-500 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={20} />
            <span className="font-semibold">GitHub Profile</span>
            <ExternalLink size={16} className="opacity-70" />
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
