import { useState, useEffect } from "react";

export function useKeyboardEasterEggs() {
  const [secretCommand, setSecretCommand] = useState("");
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [showLinuxTerminal, setShowLinuxTerminal] = useState(false);
  const [showAppleMode, setShowAppleMode] = useState(false);

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

  return {
    secretCommand,
    showSecretMessage,
    setShowSecretMessage,
    showLinuxTerminal,
    setShowLinuxTerminal,
    showAppleMode
  };
}
