
import { motion } from "framer-motion";

interface ChangelogHeaderProps {
  title: string;
  subtitle: string;
}

export const ChangelogHeader = ({ title, subtitle }: ChangelogHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 inline-block relative">
          <span className="text-gradient-cyan">{title}</span>
          <motion.span 
            className="absolute -bottom-1 left-0 w-full h-1 bg-accent/30"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </h1>
      </motion.div>
      <motion.p 
        className="text-white/70 max-w-2xl mx-auto text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};
