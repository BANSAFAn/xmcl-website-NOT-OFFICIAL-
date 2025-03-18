
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
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="text-gradient-cyan">{title}</span>
      </h1>
      <p className="text-white/70 max-w-2xl mx-auto text-lg">
        {subtitle}
      </p>
    </motion.div>
  );
};
