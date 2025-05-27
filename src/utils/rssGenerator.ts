
import { BlogPost } from '@/types/blog';

export function generateRSSFeed(posts: BlogPost[], siteUrl: string = window.location.origin): string {
  const now = new Date().toISOString();
  
  const rssItems = posts.map(post => {
    const postUrl = `${siteUrl}/blogs/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    
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
    const { getAllBlogPosts } = await import('./blogUtils');
    const posts = await getAllBlogPosts();
    const rssContent = generateRSSFeed(posts);
    
    const blob = new Blob([rssContent], { type: 'application/rss+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'xmcl-blog.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating RSS feed:', error);
  }
}
