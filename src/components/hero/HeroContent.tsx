
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
}

export function HeroContent({ 
  title, 
  subtitle, 
  description, 
  onNumberEffect 
}: HeroContentProps) {
  return (
    <div className="container mx-auto px-4 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto"
      >
        <AnimatedTitle title={title} onNumberEffect={onNumberEffect} />
        <AnimatedSubtitle subtitle={subtitle} />
        <Description description={description} />
        <ActionButtons />
      </motion.div>
    </div>
  );
}
