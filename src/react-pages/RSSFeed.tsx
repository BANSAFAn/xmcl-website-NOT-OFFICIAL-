import { useEffect, useState } from 'react';
import { generateRSSFeed, downloadRSSFeed } from '@/utils/rssGenerator';
import { getAllBlogPosts } from '@/utils/blogUtils';
import { BlogPost } from '@/types/blog';
import { Link } from '@/components/Link';
import { Rss, Download, ExternalLink, Calendar, User, Tag, FileJson } from 'lucide-react';
import { useI18n } from '@/i18n/context';

/**
 * Component that generates and serves an RSS feed
 * This component now renders a UI for viewing the RSS feed online
 * and also provides a download option
 */
const RSSFeed = () => {
  const { t } = useI18n();
  const [rssContent, setRssContent] = useState<string>('');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const generateAndServeRSS = async () => {
      try {
        setLoading(true);
        // Get all blog posts
        const posts = await getAllBlogPosts();
        
        if (!posts || posts.length === 0) {
          setError(t.errors.noBlogPosts || 'No blog posts found. RSS feed cannot be generated.');
          setLoading(false);
          return;
        }
        
        setBlogPosts(posts);
        
        // Make sure we're in a browser environment
        let origin = '';
        if (typeof window !== 'undefined') {
          origin = window.location.origin;
          console.log('Using origin:', origin);
        } else {
          console.warn('Not in browser environment, using empty origin');
        }
        
        // Generate RSS XML
        const rssXml = generateRSSFeed(posts, origin);
        if (rssXml) {
          setRssContent(rssXml);
          setLoading(false);
        } else {
          throw new Error('Failed to generate RSS XML');
        }
      } catch (error) {
        console.error('Error generating RSS feed:', error);
        setError(`${t.errors.failedToLoadRSS || 'Failed to load RSS feed'}: ${error instanceof Error ? error.message : t.errors.unknownError || 'Unknown error'}`);
        setLoading(false);
      }
    };
    
    generateAndServeRSS();
  }, []);
  
  const handleDownloadRSS = async (format: 'xml' | 'json' = 'xml') => {
    try {
      const result = await downloadRSSFeed(format);
      if (!result.success) {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error(`Error downloading ${format.toUpperCase()} feed:`, error);
      setError(`${t.errors.failedToDownload || 'Failed to download'} ${format.toUpperCase()} ${t.errors.feedTryAgain || 'feed. Please try again later.'}`);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Display a simple message for users who view the page directly
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col items-center justify-center text-center mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Rss size={24} className="text-orange-400" />
          <h1 className="text-3xl font-bold">{t.blogs.rssFeedTitle || 'XMCL Blog RSS Feed'}</h1>
        </div>
        <p className="text-lg text-white/70 mb-6">{t.blogs.rssFeedDescription || 'Subscribe to our RSS feed to stay updated with the latest blog posts'}</p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <button 
            onClick={() => handleDownloadRSS('xml')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            disabled={loading || !rssContent}
          >
            <Download size={18} />
            {t.blogs.downloadXmlFeed || 'Download XML Feed'}
          </button>
          
          <button 
            onClick={() => handleDownloadRSS('json')}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            disabled={loading || !rssContent}
          >
            <FileJson size={18} />
            {t.blogs.downloadJsonFeed || 'Download JSON Feed'}
          </button>
          
          <a 
            href={`data:application/rss+xml;charset=utf-8,${encodeURIComponent(rssContent)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
            disabled={loading || !rssContent}
          >
            <ExternalLink size={18} />
            {t.blogs.viewRawXml || 'View Raw XML'}
          </a>
        </div>
      </div>
      
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">{t.blogs.howToSubscribe || 'How to Subscribe'}</h2>
        <p className="mb-4">{t.blogs.addRssUrl || 'Add this URL to your RSS reader to subscribe:'}</p>
        <div className="bg-gray-900 p-3 rounded flex items-center justify-between">
          <code className="text-sm text-white/90">{window.location.origin}/api/rss</code>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/api/rss`);
            }}
            className="text-white/70 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            title={t.ui.copyToClipboard || 'Copy to clipboard'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">{t.blogs.recentPosts || 'Recent Posts'}</h2>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-center">
          <p className="text-red-400">{error}</p>
        </div>
      ) : blogPosts.length === 0 ? (
        <div className="bg-gray-800/50 rounded-lg p-8 text-center">
          <p className="text-white/70">{t.blogs.noBlogPostsFound || 'No blog posts found. Check back later!'}</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {blogPosts.map((post, index) => (
            <div key={post.slug} className="bg-gray-800/30 rounded-lg overflow-hidden hover:bg-gray-800/50 transition-colors border border-white/10">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 hover:text-accent transition-colors">
                  <Link to={`/blogs/${post.slug}`}>{post.title}</Link>
                </h3>
                
                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Tag size={14} />
                    <span>{post.category}</span>
                  </div>
                </div>
                
                <p className="text-white/70 mb-4">{post.excerpt}</p>
                
                <Link 
                  to={`/blogs/${post.slug}`}
                  className="inline-flex items-center gap-1 text-accent hover:text-accent/80 transition-colors"
                >
                  {t.ui.readMore || 'Read more'}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RSSFeed;