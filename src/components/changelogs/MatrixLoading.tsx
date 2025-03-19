
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export const MatrixLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div 
        className="relative w-32 h-32 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Outer spinning ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-2 border-accent/80"
          animate={{ 
            rotate: 360,
            boxShadow: [
              "0 0 5px rgba(56,189,248,0.3), 0 0 10px rgba(56,189,248,0.1)",
              "0 0 10px rgba(56,189,248,0.5), 0 0 20px rgba(56,189,248,0.2)",
              "0 0 5px rgba(56,189,248,0.3), 0 0 10px rgba(56,189,248,0.1)"
            ]
          }}
          transition={{ 
            rotate: { duration: 8, ease: "linear", repeat: Infinity },
            boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
          }}
        />
        
        {/* Inner spinning ring */}
        <motion.div 
          className="absolute inset-2 rounded-full border-2 border-accent/60"
          animate={{ 
            rotate: -360,
          }}
          transition={{ 
            duration: 6, 
            ease: "linear", 
            repeat: Infinity 
          }}
        />
        
        {/* Central icon */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [0.9, 1.1, 0.9],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Download className="w-8 h-8 text-accent" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.p 
          className="text-white/70 text-lg"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading changelogs...
        </motion.p>
      </motion.div>
    </div>
  );
};
