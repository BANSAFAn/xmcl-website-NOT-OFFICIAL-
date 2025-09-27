
import type { BlogPost } from '../types/blog.ts';
import { BLOG_POSTS } from '../data/blogPosts.ts';
import { parseRussianDate } from './dateUtils.ts';
import { fetchBlogPosts, fetchBlogPost } from './blogFetcher.ts';

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    console.log("Fetching blog posts");
    
    // Try to fetch from JSON file first
    const jsonPosts = await fetchBlogPosts();
    
    if (jsonPosts.length > 0) {
      return jsonPosts.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
    }
    
    // Fallback to hardcoded data if JSON fetch fails
    console.log("Falling back to hardcoded blog posts");
    return [...BLOG_POSTS].sort((a, b) => {
      const dateA = parseRussianDate(a.date);
      const dateB = parseRussianDate(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  console.log(`Fetching blog post with slug: ${slug}`);
  
  // Clean up the slug (remove any path components from URLs if present)
  const cleanSlug = slug.split('/').pop() || slug;
  
  // First try to fetch from the JSON/markdown system
  try {
    const jsonPost = await fetchBlogPost(cleanSlug);
    if (jsonPost) {
      return jsonPost;
    }
  } catch (error) {
    console.error(`Error fetching JSON blog post: ${error}`);
  }
  
  // Fallback to hardcoded data
  const post = BLOG_POSTS.find(post => post.slug === cleanSlug);
  
  if (!post) {
    throw new Error(`Blog post with slug "${cleanSlug}" not found`);
  }
  
  return post;
}

// Re-export the BlogPost type for convenience
export type { BlogPost } from '../types/blog.ts';
