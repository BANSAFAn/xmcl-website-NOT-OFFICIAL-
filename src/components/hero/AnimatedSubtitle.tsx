
import { motion } from "framer-motion";

interface AnimatedSubtitleProps {
  subtitle: string;
  isMobile?: boolean;
}

export function AnimatedSubtitle({ subtitle, isMobile = false }: AnimatedSubtitleProps) {
  // Animation variants for the subtitle letters
  const subtitleAnimation = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: isMobile ? (0.3 + i * 0.03) : (0.5 + i * 0.05),
        duration: isMobile ? 0.4 : 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <motion.h2 
      className={`${isMobile ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'} font-bold leading-tight`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: isMobile ? 0.4 : 0.5, delay: isMobile ? 0.3 : 0.4 }}
    >
      <span className="text-gradient-green inline-block">
        {subtitle.split('').map((char, index) => (
          <motion.span
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={subtitleAnimation}
            className="inline-block"
            style={{
              display: char === ' ' ? 'inline' : 'inline-block',
              filter: 'drop-shadow(0 0 8px rgba(61, 211, 98, 0.3))'
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </motion.h2>
  );
}
