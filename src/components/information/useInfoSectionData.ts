
import { useState, useEffect } from "react";
import { infoSectionTitles, infoSections, InfoSection } from "./translations";

export function useInfoSectionData() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Initialize language based on localStorage
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang);
    };
    
    // Initial language set
    updateLanguage();
    
    // Listen for storage changes (from other components)
    window.addEventListener('storage', updateLanguage);
    
    // Custom event listener for immediate language updates
    window.addEventListener('languageChange', updateLanguage);
    
    return () => {
      window.removeEventListener('storage', updateLanguage);
      window.removeEventListener('languageChange', updateLanguage);
    };
  }, []);

  // Get current translations
  const title = infoSectionTitles[currentLanguage] || infoSectionTitles.en;
  const sections = infoSections[currentLanguage] || infoSections.en;

  return { currentLanguage, title, sections };
}
