
import { BlogPost } from '@/types/blog';

/**
 * Fetches all blog posts from the JSON file
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // Use window.location.origin to ensure we're using an absolute URL
    const response = await fetch(`${window.location.origin}/blogs.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Fetches a specific blog post by slug
 */
export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    // First get all posts to find the one with matching slug
    const posts = await fetchBlogPosts();
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
      return null;
    }
    
    // Now fetch the markdown content using absolute path
    // Ensure the path is absolute by prepending the origin if it's a relative path
    const contentPath = post.path.startsWith('http') ? post.path : `${window.location.origin}${post.path}`;
    const contentResponse = await fetch(contentPath);
    if (!contentResponse.ok) {
      throw new Error('Failed to fetch blog content');
    }
    
    const content = await contentResponse.text();
    
    // Return the post with content
    return {
      ...post,
      content
    };
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}
