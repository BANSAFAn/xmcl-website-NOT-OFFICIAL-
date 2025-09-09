
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Terminal, X } from 'lucide-react';

export const EasterEggs = () => {
  const [showBSOD, setShowBSOD] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [keySequence, setKeySequence] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add to sequence
      const newSequence = (keySequence + e.key.toLowerCase()).slice(-20);
      setKeySequence(newSequence);

      // Check for BSOD trigger
      if (newSequence.includes('cio10virus')) {
        setShowBSOD(true);
        setKeySequence('');
        return;
      }

      // Check for terminal trigger (Ctrl + `)
      if (e.key === '`' && e.ctrlKey) {
        e.preventDefault();
        setShowTerminal(true);
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keySequence]);

  const handleTerminalCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let response = '';

    switch (cmd) {
      case 'xmcl':
        response = 'XMCL Version: 0.39.0\nX Minecraft Launcher - The Future of Minecraft Launching';
        break;
      case 'baneronetwo':
        response = '🚀 BanerOneTwo was here! Keep coding, warrior!';
        break;
      case 'cio10':
        response = '🎉 CI010 - The mastermind behind XMCL! Legend among developers!';
        break;
      case 'v1mkss':
        response = '⭐ V1MKSS - Contributing to the future of Minecraft!';
        break;
      case 'virus':
        window.location.reload();
        return;
      case 'help':
        response = 'Available commands: xmcl, baneronetwo, cio10, v1mkss, virus, clear, exit';
        break;
      case 'clear':
        setTerminalOutput([]);
        return;
      case 'exit':
        setShowTerminal(false);
        return;
      default:
        response = `Command not found: ${command}`;
    }

    setTerminalOutput(prev => [...prev, `$ ${command}`, response]);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleTerminalCommand(currentInput);
      setCurrentInput('');
    }
  };

  // BSOD Component
  if (showBSOD) {
    return (
      <div className="fixed inset-0 z-[9999] bg-blue-600 flex items-center justify-center text-white">
        <div className="text-center p-8">
          <div className="text-8xl mb-8">:(</div>
          <h1 className="text-4xl font-bold mb-4">Ваш ПК взломан CIO10!</h1>
          <p className="text-xl mb-8">
            Не волнуйтесь, это всего лишь пасхалка! 
            <br />
            Перезагрузите страницу, чтобы продолжить.
          </p>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Перезагрузить
          </Button>
        </div>
      </div>
    );
  }

  // Terminal Component
  if (showTerminal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl h-96 bg-black border-green-500 text-green-400 font-mono overflow-hidden">
          <div className="p-4 border-b border-green-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>XMCL Terminal</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTerminal(false)}
              className="text-green-400 hover:text-green-300"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="p-4 h-full overflow-y-auto">
            <div className="text-green-400 mb-2">
              Welcome to XMCL Terminal! Type 'help' for available commands.
            </div>
            
            {terminalOutput.map((line, index) => (
              <div key={index} className="mb-1 whitespace-pre-wrap">
                {line}
              </div>
            ))}
            
            <form onSubmit={handleTerminalSubmit} className="flex">
              <span className="text-green-400">$ </span>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-green-400 ml-1"
                autoFocus
                spellCheck={false}
              />
            </form>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};
