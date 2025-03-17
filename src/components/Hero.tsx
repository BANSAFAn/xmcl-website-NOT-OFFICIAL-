import { motion } from "framer-motion";
import { BackgroundEffects } from "./hero/BackgroundEffects";
import { AnimatedTitle } from "./hero/AnimatedTitle";
import { AnimatedSubtitle } from "./hero/AnimatedSubtitle";
import { ActionButtons } from "./hero/ActionButtons";
import { Description } from "./hero/Description";
import { useLanguage } from "./hero/useLanguage";
import { useNumberParticles } from "./hero/useNumberParticles";
import { useState, useEffect } from "react";

export function Hero() {
  const { text } = useLanguage();
  const generateRandomNumbers = useNumberParticles();
  const [secretCommand, setSecretCommand] = useState("");
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  
  // Listen for keyboard input for the secret command
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setSecretCommand(prev => {
        const newCommand = prev + e.key;
        // Keep only the last 5 characters
        const trimmedCommand = newCommand.slice(-5);
        
        // Check if the command is 'CIO10'
        if (trimmedCommand === 'CIO10') {
          setShowSecretMessage(true);
        }
        
        return trimmedCommand;
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (showSecretMessage) {
    return (
      <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
        <BackgroundEffects />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center p-8 bg-black/50 backdrop-blur-md rounded-xl max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">Secret Message Activated</h1>
          <p className="text-xl text-white mb-8">
            Я создал XMCL, а Baneronetwo простой модератор который забыл спросить разрешение
          </p>
          <button 
            onClick={() => setShowSecretMessage(false)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Close Message
          </button>
        </motion.div>
      </section>
    );
  }

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
    </section>
  );
}
