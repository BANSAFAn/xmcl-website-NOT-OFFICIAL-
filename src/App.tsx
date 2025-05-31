
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner";
import { OSProvider } from '@/context/OSContext';
import { LanguageProvider } from '@/components/navbar/LanguageContext';
import { getRSSFeed } from '@/api/rss';
import { useEffect, lazy, Suspense } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import './App.css';

// Ленивая загрузка компонентов страниц для улучшения производительности
const Index = lazy(() => import('@/pages/Index'));
const Guide = lazy(() => import('@/pages/Guide'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Blogs = lazy(() => import('@/pages/Blogs'));
const Changelogs = lazy(() => import('@/pages/Changelogs'));
const About = lazy(() => import('@/pages/About'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Contact = lazy(() => import('@/pages/Contact'));
const Testing = lazy(() => import('@/pages/Testing'));
const Issues = lazy(() => import('@/pages/Issues'));
const RSSFeed = lazy(() => import('@/pages/RSSFeed'));
const NotFound = lazy(() => import('@/pages/NotFound'));

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

// Компонент для отображения загрузки при ленивой загрузке страниц
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <OSProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-minecraft-dark-blue">
              <Suspense fallback={<PageLoader />}>
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
              </Suspense>
              <Toaster />
            </div>
          </Router>
        </QueryClientProvider>
      </LanguageProvider>
    </OSProvider>
  );
}

export default App;
