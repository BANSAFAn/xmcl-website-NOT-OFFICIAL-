
import { BlogPost } from '@/types/blog';
// Удаляем импорт BLOG_POSTS, так как файл был удален
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
    
    // Если JSON не найден, возвращаем пустой массив вместо использования BLOG_POSTS
    console.log("No blog posts found in JSON");
    return [];
  } catch (error) {
    console.error("Error getting all blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  console.log(`Fetching blog post with slug: ${slug}`);
  
  // Clean up the slug (remove any path components from URLs if present)
  const cleanSlug = slug.split('/').pop() || slug;
  
  // Try to fetch from the JSON/markdown system
  try {
    const jsonPost = await fetchBlogPost(cleanSlug);
    if (jsonPost) {
      return jsonPost;
    }
  } catch (error) {
    console.error(`Error fetching JSON blog post: ${error}`);
  }
  
  // Если пост не найден, выбрасываем ошибку
  throw new Error(`Blog post with slug "${cleanSlug}" not found`);
}

// Реэкспортируем тип BlogPost для удобства
export type { BlogPost } from '@/types/blog';
