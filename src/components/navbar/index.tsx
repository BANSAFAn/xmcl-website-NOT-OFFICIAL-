
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, Home, MessageSquare, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavItems } from './NavItems';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinks } from './SocialLinks';
import { DownloadButton } from './DownloadButton';
import { MobileMenu } from './MobileMenu';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { useToast } from '@/hooks/use-toast';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Easter egg for when user types "baner"
  useEffect(() => {
    let typedString = '';
    let typingTimer: NodeJS.Timeout;
    const handleKeyDown = (e: KeyboardEvent) => {
      clearTimeout(typingTimer);
      typedString += e.key.toLowerCase();

      // Keep only the last 5 characters
      if (typedString.length > 5) {
        typedString = typedString.slice(-5);
      }

      // Check if the string matches
      if (typedString === 'baner') {
        window.dispatchEvent(new CustomEvent('banerEasterEgg'));
      }

      // Reset the string after a delay
      typingTimer = setTimeout(() => {
        typedString = '';
      }, 2000);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(typingTimer);
    };
  }, []);

  return (
    <LanguageProvider>
      <NavbarContent 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
    </LanguageProvider>
  );
}

interface NavbarContentProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const NavbarContent = ({
  scrolled,
  mobileMenuOpen,
  setMobileMenuOpen
}: NavbarContentProps) => {
  const { translations } = useLanguage();
  const location = useLocation();
  const { toast } = useToast();

  // Handler for Easter egg
  useEffect(() => {
    const handleEasterEgg = () => {
      toast({
        title: "Easter Egg Found!",
        description: "This is an unofficial website created by XMCL moderator Baneronetwo.",
        variant: "default",
        duration: 5000
      });
    };
    window.addEventListener('banerEasterEgg', handleEasterEgg);
    return () => window.removeEventListener('banerEasterEgg', handleEasterEgg);
  }, [toast]);

  return (
    <TooltipProvider>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/30 backdrop-blur-md py-2 shadow-md border-b border-white/5' : 'bg-transparent py-3'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-all duration-300 hover:opacity-90">
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img src="/XMCL/a39086fb-5549-43c0-a69e-217c717d938e.png" alt="X Minecraft Launcher" className="h-7 w-7" />
            </motion.div>
            <span className="font-bold text-base tracking-tight">XMCL</span>
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <motion.nav 
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden flex items-center shadow-sm"
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex items-center mx-1 my-1 gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Link to="/" className={`relative px-4 py-1.5 rounded-md transition-all ${
                  location.pathname === '/' 
                    ? 'bg-accent/90 text-white' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}>
                  <motion.div 
                    className="flex items-center gap-1.5"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Home size={16} />
                    <span className="text-sm">Home</span>
                  </motion.div>
                </Link>
                
                <NavItems />
              </motion.div>
            </motion.nav>
          </div>
          
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <SocialLinks />
            <DownloadButton />
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-2 mt-2 md:mt-0">
            <Link to="/#download" className="flex items-center gap-1 px-2 py-1.5 bg-accent/80 backdrop-blur-sm text-white rounded-md text-sm">
              <Download size={15} />
              <span className="text-xs font-medium">{translations.downloadNow}</span>
            </Link>
            
            <motion.button 
              className="text-white p-1.5 bg-white/5 rounded-full backdrop-blur-sm" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <MobileMenu 
              isOpen={mobileMenuOpen} 
              onClose={() => setMobileMenuOpen(false)} 
              onLanguageChange={() => {}}
            />
          )}
        </AnimatePresence>
      </motion.header>
    </TooltipProvider>
  );
};
