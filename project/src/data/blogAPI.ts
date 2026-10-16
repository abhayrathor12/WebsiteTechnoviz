// blogAPI.ts

// Set VITE_API_BASE_URL in .env.local to test against a backend running on your computer
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://websiteBackend.pythonanywhere.com";
// const API_BASE_URL = "http://192.168.1.60:8257";
const MEDIA_BASE_URL = `${API_BASE_URL}/media`;

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  excerpt: string;
  body: string;
  tags: string[];
  featured_image: string;
  publish_date: string;
  seo_meta_title: string;
  seo_description: string;
}


const resolveImageUrl = (image: string) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;          // already full URL
  if (image.startsWith("/media/")) return `${API_BASE_URL}${image}`;
  return `${MEDIA_BASE_URL}/${image}`;                  // relative path
};

// 🔹 Fetch all blogs
export const fetchBlogs = async (): Promise<BlogPost[]> => {
  const res = await fetch(`${API_BASE_URL}/api/blogs/`);
  const data = await res.json();

  return data.map((blog: any) => ({
    ...blog,
    featured_image: resolveImageUrl(blog.featured_image),
  }));
};

// 🔹 Fetch single blog
export const fetchBlogBySlug = async (slug: string): Promise<BlogPost> => {
  const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}/`);
  if (!res.ok) throw new Error(`Blog "${slug}" not found (${res.status})`);
  const data = await res.json();

  return {
    ...data,
    featured_image: resolveImageUrl(data.featured_image),
  };
};

// 🔹 Combine the older posts kept in the frontend code with the posts from the
// backend, newest first, so new weekly posts always appear at the top.
export const mergeBlogPosts = <T extends { slug: string; publish_date: string }>(
  localPosts: T[],
  apiPosts: T[]
): T[] => {
  const bySlug = new Map<string, T>();
  [...localPosts, ...apiPosts].forEach((post) => bySlug.set(post.slug, post));
  return [...bySlug.values()].sort(
    (a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()
  );
};
