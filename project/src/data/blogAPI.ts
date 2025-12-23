// blogAPI.ts

const API_BASE_URL = "https://websiteBackend.pythonanywhere.com";
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

// 🔹 Fetch all blogs
export const fetchBlogs = async (): Promise<BlogPost[]> => {
  const res = await fetch(`${API_BASE_URL}/api/blogs/`);
  const data = await res.json();

  return data.map((blog: any) => ({
    ...blog,
    featured_image: `${MEDIA_BASE_URL}/${blog.featured_image}`,
  }));
};

// 🔹 Fetch single blog by slug
export const fetchBlogBySlug = async (slug: string): Promise<BlogPost> => {
  const res = await fetch(`${API_BASE_URL}/api/blogs/${slug}/`);
  const data = await res.json();

  return {
    ...data,
    featured_image: `${MEDIA_BASE_URL}/${data.featured_image}`,
  };
};
