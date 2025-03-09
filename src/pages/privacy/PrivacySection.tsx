
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PrivacySectionProps {
  title: string;
  content: string | ReactNode;
  variant?: "regular" | "subsection";
  children?: ReactNode;
}

export const PrivacySection = ({ 
  title, 
  content, 
  variant = "regular",
  children 
}: PrivacySectionProps) => {
  return (
    <motion.div variants={itemVariants}>
      <h2 className={`${variant === "regular" ? "text-2xl font-bold" : "text-xl font-semibold"} mb-4`}>
        {title}
      </h2>
      {typeof content === "string" ? (
        <p className="text-white/70 mb-8">
          {content}
        </p>
      ) : (
        content
      )}
      {children}
    </motion.div>
  );
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};
