
import { BlogPost } from '@/types/blog';

export function generateRSSFeed(posts: BlogPost[], siteUrl: string = typeof window !== 'undefined' ? window.location.origin : ''): string {
  // Ensure we have a valid siteUrl
  if (!siteUrl) {
    console.warn('No siteUrl provided for RSS feed generation, using fallback');
    siteUrl = 'https://xmcl-website-not-official.vercel.app';
  }
  
  const now = new Date().toISOString();
  
  const rssItems = posts.map(post => {
    // Ensure we have a valid date
    let pubDate: string;
    try {
      pubDate = new Date(post.date).toUTCString();
    } catch (e) {
      console.warn(`Invalid date format for post ${post.slug}:`, e);
      pubDate = new Date().toUTCString(); // Fallback to current date
    }
    
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.author}]]></author>
      <category><![CDATA[${post.category}]]></category>
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>XMCL Blog</title>
    <link>${siteUrl}/blogs</link>
    <atom:link href="${siteUrl}/api/rss" rel="self" type="application/rss+xml" />
    <description>Latest updates and insights from the XMCL team</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>XMCL Website</generator>
    ${rssItems}
  </channel>
</rss>`;
}

export async function downloadRSSFeed() {
  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      console.error('Cannot download RSS feed in a non-browser environment');
      return;
    }
    
    const { getAllBlogPosts } = await import('./blogUtils');
    const posts = await getAllBlogPosts();
    
    if (posts.length === 0) {
      console.error('No blog posts found. RSS feed cannot be generated.');
      return;
    }
    
    const rssContent = generateRSSFeed(posts, window.location.origin);
    
    const blob = new Blob([rssContent], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'xmcl-blog.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    return true; // Indicate success
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return false; // Indicate failure
  }
}
