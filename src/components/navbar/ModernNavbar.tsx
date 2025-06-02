import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavItems } from './NavItems';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinks } from './SocialLinks';
import { MobileMenu } from './MobileMenu';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { useToast } from '@/hooks/use-toast';

export function ModernNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
      if (typedString.length > 5) {
        typedString = typedString.slice(-5);
      }
      if (typedString === 'baner') {
        window.dispatchEvent(new CustomEvent('banerEasterEgg'));
      }
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
      <ModernNavbarContent 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
    </LanguageProvider>
  );
}

interface ModernNavbarContentProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const ModernNavbarContent = ({
  scrolled,
  mobileMenuOpen,
  setMobileMenuOpen
}: ModernNavbarContentProps) => {
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled 
            ? 'bg-slate-900/85 backdrop-blur-2xl py-3 shadow-2xl shadow-black/50 border-b border-white/5' 
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Premium gradient border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 via-purple-400/60 to-transparent"></div>
        
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Premium Logo */}
          <Link to="/" className="flex items-center gap-4 group transition-all duration-500 hover:opacity-95">
            <motion.div 
              className="relative"
              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-2 rounded-2xl border border-white/10 backdrop-blur-sm">
                <img src="/a39086fb-5549-43c0-a69e-217c717d938e.png" alt="X Minecraft Launcher" className="h-10 w-10" />
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  XMCL
                </span>
                <span className="text-xs text-white/50 font-medium">Launcher</span>
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 500 }}
              >
                <Sparkles className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </motion.div>
          </Link>
          
          {/* Premium Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-5xl mx-12">
            <motion.nav 
              className="relative w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Main navigation container */}
              <div className="relative bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 via-cyan-600/10 to-blue-600/10 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Subtle inner glow */}
                <div className="absolute inset-[1px] bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>
                
                <motion.div 
                  className="relative flex items-center justify-center px-4 py-3 gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {/* Home button */}
                  <Link to="/" className={`group relative px-5 py-3 rounded-2xl transition-all duration-400 flex items-center gap-3 overflow-hidden ${
                    location.pathname === '/' 
                      ? 'bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-cyan-500/25 text-white shadow-xl shadow-blue-500/20 border border-blue-400/30' 
                      : 'text-white/75 hover:text-white hover:bg-gradient-to-r hover:from-white/8 hover:via-white/12 hover:to-white/8 border border-transparent hover:border-white/20'
                  }`}>
                    <motion.div 
                      className="flex items-center gap-3 relative z-10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <Home size={18} />
                      </motion.div>
                      <span className="font-semibold text-sm">Home</span>
                    </motion.div>
                    
                    {/* Active indicator */}
                    {location.pathname === '/' && (
                      <motion.div
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-full shadow-lg shadow-blue-400/50"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </Link>
                  
                  {/* Navigation separator */}
                  <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent mx-1"></div>
                  
                  {/* Main navigation items */}
                  <NavItems />
                </motion.div>
              </div>
            </motion.nav>
          </div>
          
          {/* Premium Right Side Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl border border-white/10 p-1">
                <LanguageSwitcher />
              </div>
              <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-2xl border border-white/10 p-1">
                <SocialLinks />
              </div>
            </motion.div>
          </div>
          
          {/* Premium Mobile Controls */}
          <div className="lg:hidden flex items-center gap-4">
            <motion.button 
              className="text-white p-3 bg-gradient-to-r from-slate-800/70 to-slate-900/70 rounded-2xl backdrop-blur-lg border border-white/15 shadow-xl" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            />
          )}
        </AnimatePresence>
      </motion.header>
    </TooltipProvider>
  );
};
