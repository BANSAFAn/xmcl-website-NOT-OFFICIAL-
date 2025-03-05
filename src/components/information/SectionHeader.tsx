
import { motion } from "framer-motion";
import { InfoSectionTitles } from "./translations";

interface SectionHeaderProps {
  title: InfoSectionTitles;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 animate-fade-in-up">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.span 
          className="text-gradient-cyan relative inline-block"
          whileHover={{ 
            scale: 1.05,
            transition: { 
              type: "spring", 
              stiffness: 400, 
              damping: 10 
            }
          }}
        >
          {/* Animated underline */}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-bottom-left duration-300"></span>
          
          {/* Title text with subtle shimmer */}
          <span className="relative">
            {title.mainTitle}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100"></span>
          </span>
        </motion.span>
      </motion.h2>
      <motion.p 
        className="text-white/70 max-w-2xl mx-auto text-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {title.subtitle}
      </motion.p>
    </div>
  );
}
