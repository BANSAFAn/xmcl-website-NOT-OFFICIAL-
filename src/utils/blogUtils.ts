
import { BlogPost } from '@/types/blog';
import { BLOG_POSTS } from '@/data/blogPosts';
import { parseRussianDate } from './dateUtils';
import { fetchBlogPosts, fetchBlogPost } from './blogFetcher';

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
  
  // First try to fetch from the JSON/markdown system
  const jsonPost = await fetchBlogPost(slug);
  if (jsonPost) {
    return jsonPost;
  }
  
  // Fallback to hardcoded data
  const post = BLOG_POSTS.find(post => post.slug === slug);
  
  if (!post) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  
  return post;
}

// Re-export the BlogPost type for convenience
export type { BlogPost } from '@/types/blog';
