import { motion } from "framer-motion";

interface BackgroundEffectsProps {
  isMobile?: boolean;
}

export function BackgroundEffects({ isMobile = false }: BackgroundEffectsProps) {
  return <div className="absolute inset-0 bg-gradient-to-b from-minecraft-darker-blue via-minecraft-dark-blue to-minecraft-dark-blue overflow-hidden">
      {/* Main gradient background */}
      <div className={`absolute ${isMobile ? 'top-1/3 left-1/5' : 'top-1/4 left-1/4'} ${isMobile ? 'w-64 h-64' : 'w-80 h-80'} bg-accent/10 rounded-full filter ${isMobile ? 'blur-[60px]' : 'blur-[80px]'} opacity-20`}></div>
      <div className={`absolute ${isMobile ? 'bottom-1/3 right-1/5' : 'bottom-1/4 right-1/4'} ${isMobile ? 'w-72 h-72' : 'w-96 h-96'} bg-purple-500/10 rounded-full filter ${isMobile ? 'blur-[80px]' : 'blur-[100px]'} opacity-20`}></div>
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'w-56 h-56' : 'w-64 h-64'} bg-blue-500/10 rounded-full filter ${isMobile ? 'blur-[50px]' : 'blur-[70px]'} opacity-10`}></div>
      
      {/* Simple grid overlay for tech feel */}
      <div className="absolute inset-0 bg-grid-pattern opacity-2 py-[13px] my-[61px]"></div>
    </div>;
}