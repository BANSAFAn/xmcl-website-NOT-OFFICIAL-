
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import Index from '@/pages/Index';
import Guide from '@/pages/Guide';
import BlogPost from '@/pages/BlogPost';
import Blogs from '@/pages/Blogs';
import Changelogs from '@/pages/Changelogs';
import About from '@/pages/About';
import Privacy from '@/pages/Privacy';
import Contact from '@/pages/Contact';
import Testing from '@/pages/Testing';
import Issues from '@/pages/Issues';
import RSSFeed from '@/pages/RSSFeed';
import NotFound from '@/pages/NotFound';
import { OSProvider } from '@/context/OSContext';
import { LanguageProvider } from '@/components/navbar/LanguageContext';
import { getRSSFeed } from '@/api/rss';
import { useEffect } from 'react';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// API Route Handler Component for RSS Feed
function ApiRSSHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleRSSRequest = async () => {
      try {
        // Create a mock request object
        const req = new Request(window.location.href);
        
        // Get the RSS feed response
        const response = await getRSSFeed(req);
        
        // Get the response text
        const rssContent = await response.text();
        
        // Create a blob with the RSS content
        const blob = new Blob([rssContent], { type: 'application/rss+xml' });
        
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a link element to download or display the RSS feed
        const link = document.createElement('a');
        link.href = url;
        
        // If the user wants to download, set the download attribute
        if (location.search.includes('download=true')) {
          link.download = 'xmcl-blog.xml';
        }
        
        // Open the RSS feed in a new tab
        link.target = '_blank';
        link.click();
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
        
        // Navigate back to the blogs page
        navigate('/blogs');
      } catch (error) {
        console.error('Error handling RSS request:', error);
        navigate('/blogs');
      }
    };
    
    handleRSSRequest();
  }, [navigate, location]);
  
  return null; // This component doesn't render anything
}

function App() {
  return (
    <OSProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-minecraft-dark-blue">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/changelogs" element={<Changelogs />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testing" element={<Testing />} />
                <Route path="/issues" element={<Issues />} />
                <Route path="/rss" element={<RSSFeed />} />
                <Route path="/api/rss" element={<ApiRSSHandler />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </QueryClientProvider>
      </LanguageProvider>
    </OSProvider>
  );
}

export default App;
