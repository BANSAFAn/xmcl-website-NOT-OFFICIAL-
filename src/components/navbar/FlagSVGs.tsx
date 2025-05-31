
import React from 'react';
import { motion } from 'framer-motion';

interface FlagProps {
  className?: string;
}

export const GBFlag = ({ className }: FlagProps) => (
  <motion.svg 
    className={className} 
    viewBox="0 0 24 16" 
    fill="none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ duration: 0.2 }}
  >
    <rect width="24" height="16" fill="#012169"/>
    <path d="M0 0L24 16M24 0L0 16" stroke="#fff" strokeWidth="2"/>
    <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="1"/>
    <path d="M12 0V16M0 8H24" stroke="#fff" strokeWidth="3"/>
    <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2"/>
  </motion.svg>
);

export const RUFlag = ({ className }: FlagProps) => (
  <motion.svg 
    className={className} 
    viewBox="0 0 24 16" 
    fill="none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ duration: 0.2 }}
  >
    <rect width="24" height="5.33" fill="#fff"/>
    <rect y="5.33" width="24" height="5.34" fill="#0052B4"/>
    <rect y="10.67" width="24" height="5.33" fill="#D52B1E"/>
  </motion.svg>
);

export const UAFlag = ({ className }: FlagProps) => (
  <motion.svg 
    className={className} 
    viewBox="0 0 24 16" 
    fill="none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ duration: 0.2 }}
  >
    <rect width="24" height="8" fill="#005BBB"/>
    <rect y="8" width="24" height="8" fill="#FFD500"/>
  </motion.svg>
);

export const CNFlag = ({ className }: FlagProps) => (
  <motion.svg 
    className={className} 
    viewBox="0 0 24 16" 
    fill="none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ duration: 0.2 }}
  >
    <rect width="24" height="16" fill="#DE2910"/>
    <g fill="#FFDE00">
      <polygon points="3,2 4,4 2,4"/>
      <polygon points="6,1 6.5,2 5.5,2"/>
      <polygon points="8,2 8.5,3 7.5,3"/>
      <polygon points="8,4 8.5,5 7.5,5"/>
      <polygon points="6,6 6.5,7 5.5,7"/>
    </g>
  </motion.svg>
);

export const DEFlag = ({ className }: FlagProps) => (
  <motion.svg 
    className={className} 
    viewBox="0 0 24 16" 
    fill="none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ duration: 0.2 }}
  >
    <rect width="24" height="5.33" fill="#000"/>
    <rect y="5.33" width="24" height="5.34" fill="#DD0000"/>
    <rect y="10.67" width="24" height="5.33" fill="#FFCE00"/>
  </motion.svg>
);

export const JPFlag = ({ className }: FlagProps) => (
  <motion.svg 
    className={className} 
    viewBox="0 0 24 16" 
    fill="none"
    whileHover={{ scale: 1.1, rotate: 5 }}
    transition={{ duration: 0.2 }}
  >
    <rect width="24" height="16" fill="#fff"/>
    <circle cx="12" cy="8" r="4.8" fill="#BC002D"/>
  </motion.svg>
);

export const flagComponents = {
  en: GBFlag,
  ru: RUFlag,
  uk: UAFlag,
  zh: CNFlag,
  de: DEFlag,
  ja: JPFlag
};
