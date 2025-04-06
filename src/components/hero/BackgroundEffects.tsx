
import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-minecraft-darker-blue via-minecraft-dark-blue to-minecraft-dark-blue overflow-hidden">
      {/* Main gradient background - оптимизировано для Firefox */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full filter blur-[70px] opacity-20 will-change-transform"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-[80px] opacity-20 will-change-transform"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[60px] opacity-10 will-change-transform"></div>
      
      {/* Simple grid overlay for tech feel */}
      <div className="absolute inset-0 bg-grid-pattern opacity-2"></div>
    </div>
  );
}
