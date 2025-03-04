
import { motion } from "framer-motion";

interface DescriptionProps {
  text: string;
}

export function Description({ text }: DescriptionProps) {
  return (
    <motion.div 
      className="mt-20 max-w-3xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.8 }}
    >
      <p className="text-lg text-white/80">
        {text}
      </p>
    </motion.div>
  );
}
