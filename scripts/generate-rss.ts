import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { getAllBlogPosts } from '../src/utils/blogUtils.ts';
import { getAllGuidePosts } from '../src/utils/guideUtils.ts';


const siteUrl = 'https://xmcl-website-not-official.vercel.app';

async function generate() {
  const blogPosts = await getAllBlogPosts();
  const blogRss = generateRSSFeed(blogPosts, siteUrl);
  fs.writeFileSync(path.join(__dirname, '../public/rss.xml'), blogRss);

  const guidePosts = await getAllGuidePosts();
  const guideRss = generateGuideRSSFeed(guidePosts, siteUrl);
  fs.writeFileSync(path.join(__dirname, '../public/guide-rss.xml'), guideRss);
}

generate();


// Add RSS generation functions

function generateRSSFeed(posts, siteUrl) {
  posts = posts.sort((a, b) =&gt; new Date(b.date) - new Date(a.date));

  let xml = `&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;rss version=&quot;2.0&quot; xmlns:atom=&quot;http://www.w3.org/2005/Atom&quot;&gt;
  &lt;channel&gt;
    &lt;title&gt;XMCL Blog&lt;/title&gt;
    &lt;link&gt;${siteUrl}/blogs&lt;/link&gt;
    &lt;atom:link href=&quot;${siteUrl}/rss.xml&quot; rel=&quot;self&quot; type=&quot;application/rss+xml&quot; /&gt;
    &lt;description&gt;Latest updates and insights from the XMCL team&lt;/description&gt;
    &lt;language&gt;en&lt;/language&gt;
    &lt;lastBuildDate&gt;${new Date().toUTCString()}&lt;/lastBuildDate&gt;
    &lt;generator&gt;XMCL Website&lt;/generator&gt;
`;

  for (let post of posts) {
    xml += `
    &lt;item&gt;
      &lt;title&gt;&lt;![CDATA[${post.title}]]&gt;&lt;/title&gt;
      &lt;link&gt;${siteUrl}/blogs/${post.slug}&lt;/link&gt;
      &lt;guid&gt;${siteUrl}/blogs/${post.slug}&lt;/guid&gt;
      &lt;description&gt;&lt;![CDATA[${post.excerpt || ''}]]&gt;&lt;/description&gt;
      &lt;pubDate&gt;${new Date(post.date).toUTCString()}&lt;/pubDate&gt;
      &lt;author&gt;&lt;![CDATA[${post.author}]]&gt;&lt;/author&gt;
`;

    if (post.tags &amp;&amp; post.tags.length &gt; 0) {
      for (let tag of post.tags) {
        xml += `      &lt;category&gt;&lt;![CDATA[${tag}]]&gt;&lt;/category&gt;\n`;
      }
    } else {
      xml += `      &lt;category&gt;&lt;![CDATA[undefined]]&gt;&lt;/category&gt;\n`;
    }

    xml += `    &lt;/item&gt;
`;
  }

  xml += `  &lt;/channel&gt;
&lt;/rss&gt;`;

  return xml;
}

function generateGuideRSSFeed(posts, siteUrl) {
  posts = posts.sort((a, b) =&gt; new Date(b.date) - new Date(a.date));

  let xml = `&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;rss version=&quot;2.0&quot; xmlns:atom=&quot;http://www.w3.org/2005/Atom&quot;&gt;
  &lt;channel&gt;
    &lt;title&gt;XMCL Guides&lt;/title&gt;
    &lt;link&gt;${siteUrl}/guide&lt;/link&gt;
    &lt;atom:link href=&quot;${siteUrl}/guide-rss.xml&quot; rel=&quot;self&quot; type=&quot;application/rss+xml&quot; /&gt;
    &lt;description&gt;Latest guides and tutorials from XMCL&lt;/description&gt;
    &lt;language&gt;en&lt;/language&gt;
    &lt;lastBuildDate&gt;${new Date().toUTCString()}&lt;/lastBuildDate&gt;
    &lt;generator&gt;XMCL Website&lt;/generator&gt;
`;

  for (let post of posts) {
    xml += `
    &lt;item&gt;
      &lt;title&gt;&lt;![CDATA[${post.title}]]&gt;&lt;/title&gt;
      &lt;link&gt;${siteUrl}/guide/${post.slug}&lt;/link&gt;
      &lt;guid&gt;${siteUrl}/guide/${post.slug}&lt;/guid&gt;
      &lt;description&gt;&lt;![CDATA[${post.excerpt || ''}]]&gt;&lt;/description&gt;
      &lt;pubDate&gt;${new Date(post.date).toUTCString()}&lt;/pubDate&gt;
      &lt;author&gt;&lt;![CDATA[${post.author}]]&gt;&lt;/author&gt;
`;

    if (post.tags &amp;&amp; post.tags.length &gt; 0) {
      for (let tag of post.tags) {
        xml += `      &lt;category&gt;&lt;![CDATA[${tag}]]&gt;&lt;/category&gt;\n`;
      }
    }

    xml += `    &lt;/item&gt;
`;
  }

  xml += `  &lt;/channel&gt;
&lt;/rss&gt;`;

  return xml;
}