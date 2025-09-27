import fs from 'fs';
import path from 'path';
import { getAllBlogPosts } from '../src/utils/blogUtils.ts';
import { getAllGuidePosts } from '../src/utils/guideUtils.ts';
import { generateRSSFeed, generateGuideRSSFeed } from '../src/utils/rssGenerator.ts';

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