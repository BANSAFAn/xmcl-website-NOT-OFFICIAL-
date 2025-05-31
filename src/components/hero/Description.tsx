
import { motion } from "framer-motion";

interface DescriptionProps {
  description: string;
  isMobile?: boolean;
}

export function Description({ description, isMobile = false }: DescriptionProps) {
  return (
    <motion.p 
      className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} text-white/90 ${isMobile ? 'mb-6' : 'mb-8'} max-w-4xl mx-auto leading-relaxed px-2`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.6 : 0.8, delay: isMobile ? 0.6 : 0.8 }}
    >
      {description}
    </motion.p>
  );
}
