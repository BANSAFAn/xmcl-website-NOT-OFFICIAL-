
import { motion } from "framer-motion";
import { BackgroundEffects } from "./hero/BackgroundEffects";
import { AnimatedTitle } from "./hero/AnimatedTitle";
import { AnimatedSubtitle } from "./hero/AnimatedSubtitle";
import { ActionButtons } from "./hero/ActionButtons";
import { Description } from "./hero/Description";
import { useLanguage } from "./hero/useLanguage";
import { useNumberParticles } from "./hero/useNumberParticles";
import { useState, useEffect } from "react";
import { Terminal, Apple } from "lucide-react";

export function Hero() {
  const { text } = useLanguage();
  const generateRandomNumbers = useNumberParticles();
  const [secretCommand, setSecretCommand] = useState("");
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [showLinuxTerminal, setShowLinuxTerminal] = useState(false);
  const [showAppleMode, setShowAppleMode] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  
  // Listen for keyboard input for easter eggs
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

      // Check for the linux easter egg
      if (secretCommand.endsWith('linu') && e.key === 'x') {
        setShowLinuxTerminal(true);
      }
      
      // Check for the apple easter egg
      if (secretCommand.endsWith('appl') && e.key === 'e') {
        setShowAppleMode(true);
        // Apply apple mode to the entire page
        document.body.classList.add('apple-mode');
        
        // Reset after 10 seconds
        setTimeout(() => {
          setShowAppleMode(false);
          document.body.classList.remove('apple-mode');
        }, 10000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [secretCommand]);

  // Handle terminal input
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the command to terminal history
    setTerminalOutput(prev => [...prev, `user@xmcl:~$ ${terminalInput}`]);
    
    // Process commands
    if (terminalInput === 'sudo xmcl') {
      setTerminalOutput(prev => [...prev, "This terminal is just for show. Enjoy XMCL! 🚀"]);
    } else if (terminalInput === 'exit' || terminalInput === 'clear') {
      setShowLinuxTerminal(false);
      setTerminalInput("");
      setTerminalOutput([]);
      return;
    } else if (terminalInput.trim() !== '') {
      setTerminalOutput(prev => [...prev, `Command not found: ${terminalInput}`]);
    }
    
    // Clear input
    setTerminalInput("");
  };

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
      
      {/* Linux Terminal Easter Egg */}
      {showLinuxTerminal && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="w-full max-w-2xl bg-black border border-green-500 rounded-lg overflow-hidden shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="flex items-center bg-gray-900 p-2">
              <Terminal className="text-green-500 mr-2" size={18} />
              <span className="text-green-500 font-mono">user@xmcl:~</span>
              <button 
                className="ml-auto text-gray-400 hover:text-white"
                onClick={() => {
                  setShowLinuxTerminal(false);
                  setTerminalInput("");
                  setTerminalOutput([]);
                }}
              >
                ✕
              </button>
            </div>
            <div className="p-4 font-mono text-sm h-80 overflow-y-auto bg-black text-green-500">
              <div className="mb-2">Welcome to XMCL Terminal! Type 'sudo xmcl' to try a command or 'exit' to close.</div>
              {terminalOutput.map((line, i) => (
                <div key={i} className="mb-1">{line}</div>
              ))}
              <form onSubmit={handleTerminalSubmit} className="flex mt-2">
                <span className="mr-2">user@xmcl:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-green-500"
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
      
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
