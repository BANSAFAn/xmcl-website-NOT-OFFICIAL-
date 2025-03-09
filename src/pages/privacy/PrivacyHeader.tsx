
import { motion } from "framer-motion";

interface PrivacyHeaderProps {
  title: string;
}

export const PrivacyHeader = ({ title }: PrivacyHeaderProps) => {
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
    </motion.div>
  );
};
