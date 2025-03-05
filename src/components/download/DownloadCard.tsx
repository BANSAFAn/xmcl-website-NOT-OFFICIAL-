
import { motion } from "framer-motion";
import { Download, Clock, ExternalLink } from "lucide-react";

interface DownloadCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  link: string;
  size: string;
  colorClass: string;
  downloadText: string;
  index: number;
  isComingSoon?: boolean;
}

export function DownloadCard({ 
  title, 
  description, 
  icon, 
  link, 
  size, 
  colorClass,
  downloadText,
  index,
  isComingSoon 
}: DownloadCardProps) {
  const cardContent = (
    <>
      <motion.div 
        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4 relative"
        whileHover={{ 
          rotate: 10,
          scale: 1.1
        }}
        transition={{ duration: 0.3 }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`}></div>
        <div className="relative">
          {icon}
        </div>
      </motion.div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/70 text-sm mb-1">{description}</p>
      <p className="text-white/50 text-xs mb-4">{size}</p>
      <motion.div 
        className={`py-2 px-4 ${isComingSoon ? 'bg-gray-500' : 'bg-accent'} text-white rounded-md inline-flex items-center justify-center relative overflow-hidden`}
        whileHover={{ scale: isComingSoon ? 1.05 : 1.05 }}
        whileTap={{ scale: isComingSoon ? 0.95 : 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <span className={`absolute inset-0 bg-gradient-to-r from-accent via-cyan-400 to-accent bg-[length:200%_100%] animate-shimmer opacity-0 ${isComingSoon ? 'group-hover:opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`}></span>
        <span className="relative flex items-center">
          {isComingSoon ? (
            <>
              <ExternalLink size={16} className="mr-2" />
              View on GitHub
            </>
          ) : (
            <>
              <Download size={16} className="mr-2" />
              {downloadText}
            </>
          )}
        </span>
      </motion.div>
    </>
  );

  // Wrap in a different element depending on if it's coming soon (but now it should be clickable)
  if (isComingSoon) {
    return (
      <motion.a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`glass-card p-6 rounded-xl text-center transition-all duration-300 group relative overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ 
          y: -8,
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        {cardContent}
      </motion.a>
    );
  } else {
    return (
      <motion.a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`glass-card p-6 rounded-xl text-center transition-all duration-300 group relative overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ 
          y: -8,
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        {cardContent}
      </motion.a>
    );
  }
}
