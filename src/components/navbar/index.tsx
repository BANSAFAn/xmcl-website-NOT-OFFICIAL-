import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavItems } from './NavItems';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinks } from './SocialLinks';
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-black/40 backdrop-blur-xl py-2 shadow-2xl border-b border-white/10' 
            : 'bg-transparent py-4'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Glowing top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-all duration-300 hover:opacity-90">
            <motion.div 
              className="relative"
              whileHover={{ rotate: 5, scale: 1.05 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img src="/public/a39086fb-5549-43c0-a69e-217c717d938e.png" alt="X Minecraft Launcher" className="h-8 w-8 relative z-10" />
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">XMCL</span>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
              >
                <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>
          </Link>
          
          {/* Enhanced Desktop Navigation - Увеличенная ширина */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-8">
            <motion.nav 
              className="relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden flex items-center shadow-2xl border border-white/10 w-full"
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              transition={{ duration: 0.3 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-lg opacity-60"></div>
              
              <motion.div 
                className="relative flex items-center justify-center mx-2 my-2 gap-2 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Link to="/" className={`relative px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-white shadow-lg' 
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}>
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Home size={18} />
                    <span className="font-medium">Home</span>
                  </motion.div>
                  {location.pathname === '/' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
                
                <NavItems />
              </motion.div>
            </motion.nav>
          </div>
          
          {/* Enhanced Right Side Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <LanguageSwitcher />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <SocialLinks />
            </motion.div>
          </div>
          
          {/* Enhanced Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3">
            <motion.button 
              className="text-white p-2.5 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
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
