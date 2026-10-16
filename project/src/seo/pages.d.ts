export interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
}

export interface LocalBlogMeta {
  title: string;
  seoTitle: string;
  description: string;
  date: string;
}

export const SITE_URL: string;
export const SITE_NAME: string;
export const DEFAULT_IMAGE: string;
export const BLOG_API_URL: string;
export function withBrand(title: string): string;
export function fitDescription(...parts: (string | undefined)[]): string;
export const PAGE_SEO: Record<string, PageMeta>;
export const SERVICE_SEO: Record<string, PageMeta>;
export const PRODUCT_SEO: Record<string, PageMeta>;
export const LOCAL_BLOG_SEO: Record<string, LocalBlogMeta>;
