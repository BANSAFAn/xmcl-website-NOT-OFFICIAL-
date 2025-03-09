
import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* Main spinning circle */}
        <motion.div
          className="w-16 h-16 border-4 border-t-accent border-r-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Secondary spinner in opposite direction */}
        <motion.div
          className="absolute inset-0 w-16 h-16 border-4 border-r-purple-500/50 border-t-transparent border-b-transparent border-l-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Spinning particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent rounded-full"
            initial={{ 
              x: 0, 
              y: 0,
              opacity: 0
            }}
            animate={{ 
              x: [0, Math.cos(i * (Math.PI/3)) * 40],
              y: [0, Math.sin(i * (Math.PI/3)) * 40],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.1
            }}
          />
        ))}
        
        {/* Center dot */}
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Text with typing effect */}
      <motion.p 
        className="mt-8 text-white/70 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.span
          animate={{ opacity: [0, 1, 1, 1, 0] }}
          transition={{ 
            repeat: Infinity,
            duration: 2.5,
            times: [0, 0.2, 0.4, 0.8, 1]
          }}
        >
          Fetching latest releases
        </motion.span>
        <motion.span
          animate={{ 
            opacity: [0, 1, 0],
            x: [0, 4, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            delay: 0.5
          }}
          className="inline-block"
        >
          .
        </motion.span>
        <motion.span
          animate={{ 
            opacity: [0, 1, 0],
            x: [0, 4, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            delay: 0.7
          }}
          className="inline-block"
        >
          .
        </motion.span>
        <motion.span
          animate={{ 
            opacity: [0, 1, 0],
            x: [0, 4, 0]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            delay: 0.9
          }}
          className="inline-block"
        >
          .
        </motion.span>
      </motion.p>
    </div>
  );
}
