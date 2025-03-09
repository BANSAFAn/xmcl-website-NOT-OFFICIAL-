
import { motion } from 'framer-motion';
import { DownloadOption } from './types';
import { DownloadCard } from './DownloadCard';

interface DownloadGridProps {
  options: DownloadOption[];
  showAllOptions: boolean;
  onDownloadClick: (option: DownloadOption) => void;
}

export function DownloadGrid({ options, showAllOptions, onDownloadClick }: DownloadGridProps) {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05 // Reduced for better performance
      }
    }
  };

  // Filter options to only show the first 3 by default, or all if showAllOptions is true
  const displayedOptions = showAllOptions ? options : options.slice(0, 3);

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {displayedOptions.map((option) => (
        <DownloadCard 
          key={option.id} 
          option={option} 
          onDownloadClick={onDownloadClick} 
        />
      ))}
    </motion.div>
  );
}
