
import { motion } from "framer-motion";

interface ContactSectionProps {
  title: string;
  content: string;
}

export const ContactSection = ({ title, content }: ContactSectionProps) => {
  return (
    <motion.div variants={itemVariants}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-white/70">
        {content.split('cijhn@hotmail.com')[0]}
        <a href="mailto:cijhn@hotmail.com" className="text-accent hover:underline">
          cijhn@hotmail.com
        </a>
        {content.split('cijhn@hotmail.com')[1]}
      </p>
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
