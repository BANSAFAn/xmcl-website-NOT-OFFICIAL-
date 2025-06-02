
import { motion } from "framer-motion";

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  return (
    <motion.p 
      className="text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {description}
    </motion.p>
  );
}
