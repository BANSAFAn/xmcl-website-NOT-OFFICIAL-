
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Guide from "./pages/Guide";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import Changelogs from "./pages/Changelogs";
import Blogs from "./pages/Blogs";
import { LoadingScreen } from "./components/LoadingScreen";
import { LanguageProvider } from "./components/navbar/LanguageContext";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  
  // Handle loading sequence
  useEffect(() => {
    if (!isLoading) {
      // Add a slight delay before showing content to ensure smooth transition
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <AnimatePresence mode="wait">
            {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
          </AnimatePresence>
          
          {/* Only render the router and content when loading is complete */}
          {contentReady && (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/changelogs" element={<Changelogs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
