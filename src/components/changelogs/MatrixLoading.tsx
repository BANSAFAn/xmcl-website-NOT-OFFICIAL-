
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export const MatrixLoading = () => {
  const characters = "01";
  const columnCount = 12;
  
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative h-64 w-64 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <div 
              key={colIndex} 
              className="absolute top-0"
              style={{ left: `${(100 / columnCount) * colIndex}%` }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`${colIndex}-${i}`}
                  initial={{ 
                    y: -100 * Math.random(),
                    opacity: 0
                  }}
                  animate={{ 
                    y: [null, 300],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 3, 
                    repeat: Infinity,
                    repeatType: 'loop',
                    delay: colIndex * 0.1 + i * 0.1
                  }}
                  className="text-lg sm:text-2xl font-mono text-accent/80"
                >
                  {characters.charAt(Math.floor(Math.random() * characters.length))}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="relative w-24 h-24"
            animate={{ 
              rotate: 360,
            }}
            transition={{ 
              repeat: Infinity,
              duration: 3,
              ease: "linear"
            }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-t-accent border-l-accent/50 border-b-accent/30 border-r-transparent shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
            
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                initial={{ 
                  rotate: i * 60,
                  translateX: 50
                }}
                animate={{ 
                  rotate: [i * 60, i * 60 + 360],
                  scale: [1, 1.5, 1],
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 6, ease: "linear" },
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                style={{ 
                  transformOrigin: "center center",
                }}
              />
            ))}
            
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-500/20 flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  '0 0 5px rgba(56,189,248,0.3), 0 0 10px rgba(56,189,248,0.2), inset 0 0 5px rgba(56,189,248,0.2)',
                  '0 0 10px rgba(56,189,248,0.5), 0 0 20px rgba(56,189,248,0.3), inset 0 0 10px rgba(56,189,248,0.3)',
                  '0 0 5px rgba(56,189,248,0.3), 0 0 10px rgba(56,189,248,0.2), inset 0 0 5px rgba(56,189,248,0.2)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Download size={32} className="text-accent"/>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <div className="font-mono">
        <motion.span 
          className="inline-block text-lg"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        >
          Loading data...
        </motion.span>
      </div>
    </div>
  );
};
