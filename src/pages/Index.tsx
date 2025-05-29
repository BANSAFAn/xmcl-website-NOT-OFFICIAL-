
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { DownloadSection } from "@/components/download";
import { InformationSection } from "@/components/information";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { OSIndicator } from "@/components/OSIndicator";
import { OSWarningDialog } from "@/components/download/OSWarningDialog";

// Simplified animation variants for better performance
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const sectionVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Index = () => {
  // Setup optimized event listeners
  useEffect(() => {
    const handleLanguageChange = () => {
      // Force re-render on language change
      window.dispatchEvent(new Event('languageUpdated'));
    };
    
    // Apply smooth scrolling to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Listen for custom language change events
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-slate-900 to-black"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Navbar />
      <OSIndicator />
      <OSWarningDialog />
      
      <div className="sections-container">
        <motion.div variants={sectionVariants} key="hero-section">
          <Hero />
        </motion.div>
        
        <motion.div variants={sectionVariants} key="info-section">
          <InformationSection />
        </motion.div>
        
        <motion.div variants={sectionVariants} key="download-section">
          <DownloadSection />
        </motion.div>
        
        <motion.div variants={sectionVariants} key="footer-section">
          <Footer />
        </motion.div>
      </div>
      
      {/* Optimized global styles - removed heavy effects */}
      <style dangerouslySetInnerHTML={{ __html: `
        .info-image {
          transition: transform 0.3s ease;
        }
        
        .info-image:hover {
          transform: scale(1.02);
        }
        
        /* Simplified hover animations */
        .info-section h3 {
          transition: color 0.3s ease;
          display: inline-block;
        }
        
        .info-section h3:hover {
          color: #38bdf8;
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}} />
    </motion.div>
  );
};

export default Index;
