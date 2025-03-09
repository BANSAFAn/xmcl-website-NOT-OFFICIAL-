import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Download, Home, MessageSquare } from 'lucide-react';
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
  return <LanguageProvider>
      <NavbarContent scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
    </LanguageProvider>;
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
  const {
    translations
  } = useLanguage();
  const location = useLocation();
  const {
    toast
  } = useToast();

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
  return <TooltipProvider>
      <motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/30 backdrop-blur-md py-2 shadow-md border-b border-white/5' : 'bg-transparent py-3'}`} initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.5,
      ease: "easeOut"
    }}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-all duration-300 hover:opacity-90">
            <motion.div whileHover={{
            rotate: 5,
            scale: 1.05
          }} transition={{
            duration: 0.2
          }}>
              <img src="/lovable-uploads/a39086fb-5549-43c0-a69e-217c717d938e.png" alt="X Minecraft Launcher" className="h-7 w-7" />
            </motion.div>
            <span className="font-bold text-base tracking-tight">XMCL</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            <motion.div whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }} className="bg-white/5 backdrop-blur-sm flex items-center py-[3px] px-[11px] mx-[182px] rounded-sm">
              <Link to="/" className={`px-3 py-1.5 rounded-full transition-colors ${location.pathname === '/' ? 'bg-accent/80 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}>
                <div className="flex items-center space-x-1">
                  <Home size={16} />
                  <span className="text-sm">Home</span>
                </div>
              </Link>
              
              <NavItems />
            </motion.div>
            
            <div className="flex items-center gap-1 ml-1">
              <LanguageSwitcher />
              <SocialLinks />
              <DownloadButton />
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/#download" className="flex items-center gap-1 px-2 py-1.5 bg-accent/80 backdrop-blur-sm text-white rounded-md text-sm">
              <Download size={15} />
              <span className="text-xs font-medium">{translations.downloadNow}</span>
            </Link>
            
            <motion.button className="text-white p-1.5 bg-white/5 rounded-full backdrop-blur-sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }} whileTap={{
            scale: 0.95
          }}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} onLanguageChange={() => {}} />}
        </AnimatePresence>
      </motion.header>
    </TooltipProvider>;
};