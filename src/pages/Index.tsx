
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { DownloadSection } from "@/components/download";
import { InformationSection } from "@/components/information";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { OSIndicator } from "@/components/OSIndicator";
import { OSWarningDialog } from "@/components/download/OSWarningDialog";

// Animation variants for page elements
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7 }
  }
};

const Index = () => {
  // Setup card event listeners for scrolling
  useEffect(() => {
    const handleLanguageChange = () => {
      // Force re-render on language change
      window.dispatchEvent(new Event('languageUpdated'));
    };
    
    // Listen for custom language change events
    window.addEventListener('languageChange', handleLanguageChange);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);
  
  return (
    <motion.div 
      className="min-h-screen bg-minecraft-dark-blue"
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
      
      {/* Global style for image hover effects and easter eggs */}
      <style dangerouslySetInnerHTML={{ __html: `
        .info-image {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .info-image:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        /* Enhanced hover animations for section headers */
        .info-section h3 {
          transition: all 0.3s ease;
          display: inline-block;
        }
        
        .info-section h3:hover {
          transform: scale(1.05);
          text-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }
        
        /* Apple mode Easter Egg */
        .apple-mode * {
          font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, sans-serif !important;
        }
        
        .apple-mode p, .apple-mode span, .apple-mode h1, .apple-mode h2, .apple-mode h3, .apple-mode h4, .apple-mode h5, .apple-mode h6, .apple-mode a {
          position: relative;
        }
        
        .apple-mode p::after, .apple-mode span::after, .apple-mode h1::after, .apple-mode h2::after, .apple-mode h3::after, .apple-mode h4::after, .apple-mode h5::after, .apple-mode h6::after, .apple-mode a::after {
          content: "🍎";
          position: relative;
          display: inline-block;
          animation: float 3s ease-in-out infinite;
          margin-left: 4px;
          font-size: 0.8em;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        
        .apple-mode button {
          background: linear-gradient(to bottom, #4f93ce, #1e5799) !important;
          border-radius: 8px !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
        }
        
        .apple-mode .container {
          background-color: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(10px) !important;
          border-radius: 16px !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
      `}} />
    </motion.div>
  );
};

export default Index;
