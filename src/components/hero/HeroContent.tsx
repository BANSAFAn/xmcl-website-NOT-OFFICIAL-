
import { motion } from "framer-motion";
import { Description } from "./Description";
import { AnimatedTitle } from "./AnimatedTitle";
import { AnimatedSubtitle } from "./AnimatedSubtitle";
import { ActionButtons } from "./ActionButtons";

interface HeroContentProps {
  title: string;
  subtitle: string;
  downloadText: string;
  githubText: string;
  description: string;
  onNumberEffect: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function HeroContent({ 
  title, 
  subtitle, 
  downloadText, 
  githubText, 
  description,
  onNumberEffect 
}: HeroContentProps) {
  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Main text content */}
        <motion.div 
          className="max-w-3xl space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "tween" }}
        >
          <AnimatedTitle title={title} />
          <AnimatedSubtitle subtitle={subtitle} />
          <ActionButtons 
            downloadText={downloadText} 
            githubText={githubText} 
            onNumberEffect={onNumberEffect}
          />
        </motion.div>
        
        {/* Description with colored hover links */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 max-w-2xl text-white/60 text-center"
        >
          <p className="text-lg leading-relaxed">
            X Minecraft Launcher (XMCL) is a modern Minecraft launcher that efficiently manages your modpacks, resource packs, mods, and shader packs. 
            It integrates with{" "}
            <a 
              href="https://modrinth.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-purple-400 transition-colors duration-300 relative inline-block
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 
                after:bg-purple-400 after:origin-bottom-right after:transition-transform after:duration-300 
                hover:after:scale-x-100 hover:after:origin-bottom-left hover:scale-110"
            >
              Modrinth
            </a>, {" "}
            <a 
              href="https://quiltmc.org/en/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-green-400 transition-colors duration-300 relative inline-block
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 
                after:bg-green-400 after:origin-bottom-right after:transition-transform after:duration-300 
                hover:after:scale-x-100 hover:after:origin-bottom-left hover:scale-110"
            >
              Quilt
            </a>, {" "}
            <a 
              href="https://fabricmc.net/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-orange-400 transition-colors duration-300 relative inline-block
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 
                after:bg-orange-400 after:origin-bottom-right after:transition-transform after:duration-300 
                hover:after:scale-x-100 hover:after:origin-bottom-left hover:scale-110"
            >
              Fabric
            </a>, and {" "}
            <a 
              href="https://files.minecraftforge.net/net/minecraftforge/forge/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-blue-400 transition-colors duration-300 relative inline-block
                after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 
                after:bg-blue-400 after:origin-bottom-right after:transition-transform after:duration-300 
                hover:after:scale-x-100 hover:after:origin-bottom-left hover:scale-110"
            >
              Minecraft Forge
            </a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
