export interface SiteSettings {
  site_name: string;
  site_tagline: string;
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_cta_link: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  whatsapp_number: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
  social_github: string;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  meta_description: string;
  content: string;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  gallery_urls: string;
  client_name: string;
  technologies: string;
  is_featured: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar_url: string;
  rating: number;
  is_published: number;
  order_index: number;
  created_at: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  slug: string;
  price_min: number;
  price_max: number;
  currency: string;
  description: string;
  delivery_time: string;
  is_popular: number;
  is_published: number;
  order_index: number;
  created_at: string;
}

export interface PricingFeature {
  id: number;
  plan_id: number;
  feature: string;
  order_index: number;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  service_interest: string;
  budget_range: string;
  is_read: number;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  author: string;
  tags: string;
  is_published: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_published: number;
  created_at: string;
}
