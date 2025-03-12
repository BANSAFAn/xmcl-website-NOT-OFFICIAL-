
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
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import { LoadingScreen } from "./components/LoadingScreen";
import { LanguageProvider } from "./components/navbar/LanguageContext";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  
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
        <TooltipProvider>
          <Toaster />
          <Sonner />
          
          <AnimatePresence mode="wait">
            {isLoading && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
          </AnimatePresence>
          
          {contentReady && (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<About />} />
                <Route path="/changelogs" element={<Changelogs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug" element={<BlogPost />} />
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
