
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { useState } from "react";

interface LinuxTerminalProps {
  showLinuxTerminal: boolean;
  setShowLinuxTerminal: (show: boolean) => void;
}

export function LinuxTerminal({ showLinuxTerminal, setShowLinuxTerminal }: LinuxTerminalProps) {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  // Handle terminal input
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the command to terminal history
    setTerminalOutput(prev => [...prev, `iusebtwlinux@xmcl:~$ ${terminalInput}`]);
    
    // Process commands
    if (terminalInput === 'sudo xmcl') {
      setTerminalOutput(prev => [...prev, "This terminal is just for show. Enjoy XMCL! 🚀"]);
    } else if (terminalInput === 'sudo cio10') {
      setTerminalOutput(prev => [
        ...prev, 
        "CIO10 is the creator of X Minecraft Launcher.",
        "GitHub: https://github.com/ci010"
      ]);
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

  if (!showLinuxTerminal) return null;

  return (
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
          <span className="text-green-500 font-mono">iusebtwlinux@xmcl:~</span>
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
          <div className="mb-2">Welcome to XMCL Terminal! Try commands like 'sudo xmcl', 'sudo cio10' or type 'exit' to close.</div>
          {terminalOutput.map((line, i) => (
            <div key={i} className="mb-1">{line}</div>
          ))}
          <form onSubmit={handleTerminalSubmit} className="flex mt-2">
            <span className="mr-2">iusebtwlinux@xmcl:~$</span>
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
  );
}
