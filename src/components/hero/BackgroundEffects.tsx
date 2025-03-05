
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  direction: number;
  speed: number;
}

export function BackgroundEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const colors = [
      'rgba(96, 165, 250, 0.4)', // blue
      'rgba(167, 139, 250, 0.4)', // purple
      'rgba(56, 189, 248, 0.4)', // cyan
      'rgba(249, 115, 22, 0.4)', // orange
      'rgba(139, 92, 246, 0.4)', // violet
    ];

    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        direction: Math.random() * 360,
        speed: Math.random() * 0.3 + 0.1
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-minecraft-darker-blue via-minecraft-dark-blue to-minecraft-dark-blue overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/20 rounded-full filter blur-[80px] opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[70px] opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
            initial={{ 
              x: `${particle.x}%`, 
              y: `${particle.y}%`, 
              opacity: 0 
            }}
            animate={{ 
              x: [
                `${particle.x}%`,
                `${(particle.x + Math.cos(particle.direction) * 10) % 100}%`,
                `${(particle.x + Math.cos(particle.direction) * 20) % 100}%`
              ],
              y: [
                `${particle.y}%`,
                `${(particle.y + Math.sin(particle.direction) * 10) % 100}%`,
                `${(particle.y + Math.sin(particle.direction) * 20) % 100}%`
              ],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 20 / particle.speed,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Grid overlay for tech feel */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
}
