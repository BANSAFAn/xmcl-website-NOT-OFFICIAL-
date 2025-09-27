
import type { BlogPost } from '../types/blog.ts';
import type { GuidePost } from './guideUtils.ts';

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
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Latest updates and insights from the XMCL team</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>XMCL Website</generator>
    ${rssItems}
  </channel>
</rss>`;
}

export async function downloadRSSFeed(format: 'xml' | 'json' = 'xml') {
  try {
    const { getAllBlogPosts } = await import('./blogUtils.ts');
    const posts = await getAllBlogPosts();
    
    let content: string;
    let mimeType: string;
    let fileName: string;
    
    if (format === 'xml') {
      content = generateRSSFeed(posts);
      mimeType = 'application/rss+xml';
      fileName = 'xmcl-blog.xml';
    } else {
      // Generate JSON format
      const jsonContent = {
        title: 'XMCL Blog',
        link: `${window.location.origin}/blogs`,
        description: 'Latest updates and insights from the XMCL team',
        language: 'en',
        lastBuildDate: new Date().toISOString(),
        generator: 'XMCL Website',
        items: posts.map(post => ({
          title: post.title,
          link: `${window.location.origin}/blogs/${post.slug}`,
          guid: `${window.location.origin}/blogs/${post.slug}`,
          description: post.excerpt,
          pubDate: new Date(post.date).toISOString(),
          author: post.author,
          category: post.category
        }))
      };
      content = JSON.stringify(jsonContent, null, 2);
      mimeType = 'application/json';
      fileName = 'xmcl-blog.json';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    return { success: true };
  } catch (error) {
    console.error(`Error generating ${format.toUpperCase()} feed:`, error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function generateGuideRSSFeed(guides: GuidePost[], siteUrl: string = window.location.origin): string {
  const now = new Date().toISOString();
  
  const rssItems = guides.map(post => {
    const postUrl = `${siteUrl}/guide/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();
    
    const categories = post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join('\n      ');
    
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid>${postUrl}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author><![CDATA[${post.author}]]></author>
      ${categories}
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>XMCL Guides</title>
    <link>${siteUrl}/guide</link>
    <atom:link href="${siteUrl}/guide-rss.xml" rel="self" type="application/rss+xml" />
    <description>Latest guides and tutorials from XMCL</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <generator>XMCL Website</generator>
    ${rssItems}
  </channel>
</rss>`;
}
