import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Guide from "./pages/Guide";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Changelogs from "./pages/Changelogs";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { LoadingScreen } from "./components/LoadingScreen";
import { LanguageProvider } from "./components/navbar/LanguageContext";
import { OSProvider } from "./context/OSContext";
import { OldWindowsWarning } from "./components/OldWindowsWarning";

const queryClient = new QueryClient();

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  // Handle loading sequence
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <OSProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <AnimatePresence mode="wait">
              {isLoading && (
                <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
              )}
            </AnimatePresence>

            {/* Only render the router and content when loading is complete */}
            {contentReady && (
              <>
                <OldWindowsWarning />
                <BrowserRouter>
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/guide" element={<Guide />} />
                    <Route path="/guide/:sectionId" element={<Guide />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/changelogs" element={<Changelogs />} />
                    <Route path="/blogs" element={<Blogs />} />
                    {/* Multiple blog post routes to support different URL patterns */}
                    <Route path="/blogs/:slug" element={<BlogPost />} />
                    <Route path="/blogs/:year/:month/:slug" element={<BlogPost />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </>
            )}
          </TooltipProvider>
        </OSProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;