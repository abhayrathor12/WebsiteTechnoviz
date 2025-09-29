// blogAPI.ts
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

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  const res = await fetch('http://127.0.0.1:8000/api/blogs/');
  const data = await res.json();
  return data.map((blog: any) => ({
    ...blog,
    featured_image: `http://127.0.0.1:8000${blog.featured_image}`
  }));
};
