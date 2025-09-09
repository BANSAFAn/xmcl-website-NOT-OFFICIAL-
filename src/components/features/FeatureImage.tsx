import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface FeatureImageProps {
  image: string;
  title: string;
  reverse?: boolean;
}

const FeatureImage: React.FC<FeatureImageProps> = ({ image, title, reverse = false }) => {
  const handleImageClick = () => {
    window.open(image, '_blank');
  };

  return (
    <motion.div 
      className="flex-1"
      initial={{ opacity: 0, scale: 0.8, rotateY: reverse ? -15 : 15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div 
        className="relative group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={handleImageClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl transform group-hover:scale-105 transition-transform duration-500 opacity-50"></div>
        <img
          src={image}
          alt={title}
          className="relative w-full rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 group-hover:shadow-3xl transition-shadow duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-white/90 dark:bg-slate-800/90 rounded-full p-3 backdrop-blur-sm">
            <ExternalLink className="w-6 h-6 text-slate-700 dark:text-slate-300" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export { FeatureImage };