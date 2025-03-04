
import { useCallback } from "react";

export function useNumberParticles() {
  // Function to generate random number particles
  const generateRandomNumbers = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    
    // Create 10 number particles
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      
      // Random number content
      particle.innerText = Math.floor(Math.random() * 10).toString();
      
      // Position relative to the button
      const x = buttonRect.left + Math.random() * buttonRect.width;
      const y = buttonRect.top + Math.random() * 10;
      
      // Styling
      particle.style.position = 'fixed';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.color = 'rgba(255, 255, 255, 0.8)';
      particle.style.fontSize = `${Math.random() * 10 + 10}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '100';
      particle.style.fontFamily = 'monospace';
      
      // Add to body
      document.body.appendChild(particle);
      
      // Animation
      const duration = Math.random() * 1000 + 1000;
      const xOffset = (Math.random() - 0.5) * 50;
      
      particle.animate([
        { transform: `translate(${xOffset}px, 0px)`, opacity: 1 },
        { transform: `translate(${xOffset}px, 100px)`, opacity: 0 }
      ], {
        duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      // Remove after animation
      setTimeout(() => {
        document.body.removeChild(particle);
      }, duration);
    }
  }, []);

  return generateRandomNumbers;
}
