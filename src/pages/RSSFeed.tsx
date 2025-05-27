import { useEffect, useState } from 'react';
import { generateRSSFeed } from '@/utils/rssGenerator';
import { getAllBlogPosts } from '@/utils/blogUtils';

/**
 * Component that generates and serves an RSS feed
 * This component doesn't render any UI, it just sets the content type
 * and returns the RSS XML as the response
 */
const RSSFeed = () => {
  const [rssContent, setRssContent] = useState<string>('');
  
  useEffect(() => {
    const generateAndServeRSS = async () => {
      try {
        // Get all blog posts
        const posts = await getAllBlogPosts();
        
        // Generate RSS XML
        const rssXml = generateRSSFeed(posts, window.location.origin);
        setRssContent(rssXml);
        
        // Create a blob with the RSS content
        const blob = new Blob([rssXml], { type: 'application/rss+xml' });
        
        // Create a URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Set the response headers
        document.title = 'XMCL Blog RSS Feed';
        
        // Create a link element to download the RSS feed
        const link = document.createElement('a');
        link.href = url;
        link.download = 'xmcl-blog.xml';
        link.click();
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error generating RSS feed:', error);
      }
    };
    
    generateAndServeRSS();
  }, []);
  
  // Display a simple message for users who view the page directly
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">RSS Feed</h1>
      <p className="mb-4">This is the RSS feed for XMCL Blog.</p>
      <p className="mb-4">Add this URL to your RSS reader to subscribe.</p>
      <pre className="bg-gray-800 p-2 rounded">{window.location.href}</pre>
      {rssContent && (
        <div className="mt-4">
          <a 
            href={`data:application/rss+xml;charset=utf-8,${encodeURIComponent(rssContent)}`}
            download="xmcl-blog.xml"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download RSS Feed
          </a>
        </div>
      )}
    </div>
  );
};

export default RSSFeed;