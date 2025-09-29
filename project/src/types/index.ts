import { LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  long_description: string;
  category: string;
  hero_image: string;
  icon: LucideIcon;
  related_products: string[];
  features:string[];
  detailed_features?: {
  title: string;
  description: string;
}[];
  cta_text: string;
  seo_meta_title: string;
  seo_description: string;
}

export interface Product {
  id: string;
  name: string;
  icon: LucideIcon;
  slug: string;
  tagline: string;
  hero_image: string;
  screenshots: string[];
  features: string[];
  pricing_link: string;
  cta_text: string;
  seo_meta_title: string;
  seo_description: string;
  category: string;
  benefits?: string[];
  applications?: string[];
  long_description?:string;
  key_features?:string[];
  all_images?:string[];
}

export interface CaseStudy {
  id: string | number;
  title: string;
  client_name: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  images: string[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  publish_date: string | number | Date;
  slug: string;
  seo_meta_title: string;
  seo_description: string;
}

export interface BlogPost {
  id: string;
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

export interface Job {
  id: string;
  title: string;
  location: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  apply_link: string;
}