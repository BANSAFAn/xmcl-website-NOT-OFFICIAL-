
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download, Maximize2, Minimize2, Code2, FileText } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  language: string;
  filename?: string;
}

export function CodePreview({ isOpen, onClose, code, language, filename }: CodePreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `code.${language}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced backdrop with maximum z-index */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm"
            style={{ zIndex: 999999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Code preview modal with absolute maximum z-index */}
          <motion.div
            className={`fixed backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden ${
              isFullscreen 
                ? 'inset-2' 
                : 'top-[5%] left-[5%] right-[5%] bottom-[5%] max-w-7xl mx-auto rounded-2xl'
            }`}
            style={{ 
              zIndex: 9999999,
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 50%, rgba(15, 23, 42, 0.98) 100%)',
              borderRadius: isFullscreen ? '0' : '1rem'
            }}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Premium Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-slate-800/60 to-slate-700/60">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-400/30"
                  whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <Code2 className="w-6 h-6 text-blue-400" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-xl">
                    {filename || 'Предпросмотр кода'}
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-blue-400 text-sm font-medium">
                      {language.toUpperCase()}
                    </span>
                    <span className="text-white/60 text-sm">
                      {code.split('\n').length} строк
                    </span>
                    <span className="text-white/60 text-sm">
                      {new Blob([code]).size} байт
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Copy button */}
                <motion.button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 hover:border-green-500/50 rounded-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Copy className={`w-4 h-4 ${copied ? 'text-green-300' : 'text-green-400 group-hover:text-green-300'}`} />
                  <span className="text-sm font-medium text-green-400 group-hover:text-green-300">
                    {copied ? 'Скопировано!' : 'Копировать'}
                  </span>
                </motion.button>
                
                {/* Download button */}
                <motion.button
                  onClick={downloadCode}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30 border border-purple-500/30 hover:border-purple-500/50 rounded-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4 text-purple-400 group-hover:text-purple-300" />
                  <span className="text-sm font-medium text-purple-400 group-hover:text-purple-300">
                    Скачать
                  </span>
                </motion.button>
                
                {/* Fullscreen toggle */}
                <motion.button
                  onClick={toggleFullscreen}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/30 hover:border-blue-500/50 rounded-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                  )}
                  <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300">
                    {isFullscreen ? 'Выйти' : 'Полный экран'}
                  </span>
                </motion.button>
                
                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30 border border-red-500/30 hover:border-red-500/50 rounded-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                  <span className="text-sm font-medium text-red-400 group-hover:text-red-300">
                    Закрыть
                  </span>
                </motion.button>
              </div>
            </div>
            
            {/* Code content with enhanced styling */}
            <div className="flex-1 overflow-hidden h-full">
              <div className="h-full overflow-auto custom-scrollbar bg-gradient-to-br from-slate-900/50 to-slate-800/50">
                <SyntaxHighlighter
                  language={language}
                  style={tomorrow}
                  className="!bg-transparent !m-0 text-sm h-full"
                  customStyle={{
                    background: 'transparent',
                    padding: '2rem',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    minHeight: '100%',
                  }}
                  showLineNumbers
                  lineNumberStyle={{
                    color: '#64748b',
                    borderRight: '2px solid #334155',
                    paddingRight: '1.5rem',
                    marginRight: '1.5rem',
                    backgroundColor: 'rgba(15, 23, 42, 0.3)',
                    userSelect: 'none',
                  }}
                  wrapLines
                  wrapLongLines
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>
            
            {/* Enhanced success notification */}
            <AnimatePresence>
              {copied && (
                <motion.div
                  className="absolute top-24 right-6 bg-gradient-to-r from-green-500/90 to-emerald-500/90 border border-green-400/50 text-white px-6 py-3 rounded-xl shadow-2xl shadow-green-500/20 backdrop-blur-md"
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 100, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <Copy className="w-4 h-4" />
                    <span className="font-medium">Код скопирован в буфер обмена!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Subtle animated border */}
            <div className="absolute inset-0 rounded-2xl border border-blue-400/20 pointer-events-none">
              <motion.div
                className="absolute inset-0 rounded-2xl border border-blue-400/40"
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
