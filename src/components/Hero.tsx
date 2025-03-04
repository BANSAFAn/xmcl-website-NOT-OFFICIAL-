
import { motion } from "framer-motion";
import { BackgroundEffects } from "./hero/BackgroundEffects";
import { AnimatedTitle } from "./hero/AnimatedTitle";
import { AnimatedSubtitle } from "./hero/AnimatedSubtitle";
import { ActionButtons } from "./hero/ActionButtons";
import { Description } from "./hero/Description";
import { useLanguage } from "./hero/useLanguage";
import { useNumberParticles } from "./hero/useNumberParticles";

export function Hero() {
  const { text } = useLanguage();
  const generateRandomNumbers = useNumberParticles();

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Blurred background light effects */}
      <BackgroundEffects />
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main text content */}
          <motion.div 
            className="max-w-3xl space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedTitle title={text.title} />
            <AnimatedSubtitle subtitle={text.subtitle} />
            <ActionButtons 
              downloadText={text.download} 
              githubText={text.github} 
              onNumberEffect={generateRandomNumbers}
            />
          </motion.div>
          
          {/* Description */}
          <Description text={text.description} />
        </div>
      </div>
    </section>
  );
}
