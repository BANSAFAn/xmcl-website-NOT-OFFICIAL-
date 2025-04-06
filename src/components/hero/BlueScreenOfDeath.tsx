
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface BlueScreenOfDeathProps {
  onClose: () => void;
}

export const BlueScreenOfDeath: React.FC<BlueScreenOfDeathProps> = ({ onClose }) => {
  const [progress, setProgress] = useState(0);
  const [showingMessage, setShowingMessage] = useState(true);
  
  // Handle the progress bar and auto-closing
  useEffect(() => {
    // Increment the progress bar
    const interval = setInterval(() => {
      setProgress(prev => {
        const newValue = prev + 1;
        // When we reach 100%, we'll start the reload process
        if (newValue >= 100) {
          clearInterval(interval);
          setShowingMessage(false);
          setTimeout(() => onClose(), 1000); // Give a small delay before closing
        }
        return newValue;
      });
    }, 200); // 20 seconds total (100 steps * 200ms)
    
    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <motion.div 
      className="fixed inset-0 bg-blue-600 z-50 flex flex-col items-center justify-center text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {showingMessage ? (
        <div className="max-w-2xl">
          <h1 className="text-4xl font-mono mb-6">:(</h1>
          <h2 className="text-2xl font-mono mb-4">Your PC ran into a problem</h2>
          <p className="font-mono mb-6">
            A virus from CIO10 has been detected on your system. Windows has been shut down to prevent damage to your computer.
          </p>
          <p className="font-mono mb-6 text-yellow-300">
            CIO10 will now remove the virus. After that, download the launcher for clean installation.
          </p>
          <p className="font-mono mb-6">
            Technical information:
          </p>
          <p className="font-mono mb-8">
            *** STOP: 0x000000ED (0xCIO10, 0x00000000, 0xVIRUS, 0x00000000)
          </p>
          <div className="mb-2 font-mono text-sm">Removing virus...</div>
          <div className="mb-6">
            <Progress value={progress} className="h-2 bg-blue-500" />
          </div>
          <p className="font-mono text-sm">
            CIO10 is cleaning your system. Please do not turn off your computer.
          </p>
          <p className="font-mono text-sm mt-4">
            System will restart automatically in {Math.ceil((100 - progress) / 5)} seconds...
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="text-6xl"
        >
          ⟳
        </motion.div>
      )}
    </motion.div>
  );
};
