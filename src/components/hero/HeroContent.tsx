
import { motion } from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { AnimatedSubtitle } from "./AnimatedSubtitle";
import { Description } from "./Description";
import { ActionButtons } from "./ActionButtons";

interface HeroContentProps {
  title: string;
  subtitle: string;
  description: string;
  onNumberEffect: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isMobile?: boolean;
}

export function HeroContent({ 
  title, 
  subtitle, 
  description, 
  onNumberEffect,
  isMobile = false
}: HeroContentProps) {
  return (
    <div className={`container mx-auto text-center relative z-10 px-4 ${isMobile ? 'py-16' : 'py-20 md:py-32'}`}>
      <motion.div
        initial={{ opacity: 0, y: isMobile ? 30 : 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isMobile ? 0.7 : 1, ease: "easeOut" }}
        className="max-w-5xl mx-auto"
      >
        <AnimatedTitle title={title} onNumberEffect={onNumberEffect} isMobile={isMobile} />
        <AnimatedSubtitle subtitle={subtitle} isMobile={isMobile} />
        <Description description={description} isMobile={isMobile} />
        <ActionButtons isMobile={isMobile} />
      </motion.div>
    </div>
  );
}
