// blogAPI.ts

const API_BASE_URL = "https://websiteBackend.pythonanywhere.com";
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
  const data = await res.json();

  return {
    ...data,
    featured_image: resolveImageUrl(data.featured_image),
  };
};
