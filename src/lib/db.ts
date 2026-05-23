import { getBindings } from "@/lib/cf-bindings";

export async function getDb(): Promise<D1Database | null> {
  const { db } = await getBindings();
  return db || null;
}

// ─── Fallback Seed Data for Local Development ──────────────────────────────

const fallbackSettings: Record<string, string> = {
  site_name: 'The Scene Co.',
  site_tagline: 'We Build Premium Websites, POS Systems & SaaS Products',
  hero_title: 'Your Vision. Our Code. Zero Templates.',
  hero_subtitle: 'Custom websites, e-commerce stores, and POS systems — built from scratch with a CMS you control. 1 year free hosting included.',
  hero_cta_text: 'Get a Free Quote',
  hero_cta_link: '/contact',
  contact_email: 'hello@thescene.co.in',
  contact_phone: '+91 98765 43210',
  contact_address: 'India',
  whatsapp_number: '+919876543210',
  social_twitter: '',
  social_instagram: 'https://www.instagram.com/thescene.co.in/',
  social_linkedin: '',
  social_github: ''
};

const fallbackPortfolio = [
  { 
    id: 1, 
    title: 'Restaurant POS + Website', 
    slug: 'restaurant-pos-website', 
    category: 'POS', 
    description: 'Custom web-based POS system with integrated website for a multi-location restaurant chain. Real-time inventory, billing, and analytics dashboard.', 
    image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', 
    client_name: 'Spice Kitchen', 
    technologies: '["Next.js", "D1", "R2", "Razorpay"]', 
    is_featured: 1, 
    is_published: 1 
  },
  { 
    id: 2, 
    title: 'E-Commerce Fashion Store', 
    slug: 'ecommerce-fashion-store', 
    category: 'E-commerce', 
    description: 'Full online store with 500+ products, Razorpay integration, inventory management, and customer accounts. 1 year free hosting included.', 
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', 
    client_name: 'Urban Threads', 
    technologies: '["Next.js", "D1", "Razorpay", "R2"]', 
    is_featured: 1, 
    is_published: 1 
  },
  { 
    id: 3, 
    title: 'SaaS Landing Page', 
    slug: 'saas-landing-page', 
    category: 'Website', 
    description: 'High-converting SaaS landing page with animations, pricing table, and lead capture. Built with Next.js and deployed on Cloudflare Pages.', 
    image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 
    client_name: 'CloudMetrics', 
    technologies: '["Next.js", "Framer Motion", "Cloudflare"]', 
    is_featured: 1, 
    is_published: 1 
  },
  { 
    id: 4, 
    title: 'Corporate Website Redesign', 
    slug: 'corporate-website-redesign', 
    category: 'Website', 
    description: 'Complete redesign of a corporate website with custom CMS, blog, and multi-language support. 40% increase in organic traffic.', 
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', 
    client_name: 'TechNova Solutions', 
    technologies: '["Next.js", "D1", "Tailwind"]', 
    is_featured: 0, 
    is_published: 1 
  },
  { 
    id: 5, 
    title: 'Retail POS Dashboard', 
    slug: 'retail-pos-dashboard', 
    category: 'POS', 
    description: 'Custom POS dashboard for a retail chain with 15 stores. Real-time sales tracking, inventory sync, and staff management.', 
    image_url: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80', 
    client_name: 'StyleMart Retail', 
    technologies: '["Next.js", "D1", "Recharts"]', 
    is_featured: 0, 
    is_published: 1 
  },
  { 
    id: 6, 
    title: 'D2C Brand Website', 
    slug: 'd2c-brand-website', 
    category: 'E-commerce', 
    description: 'Direct-to-consumer brand website with product catalog, subscription management, and integrated blog.', 
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 
    client_name: 'PureGlow Naturals', 
    technologies: '["Next.js", "Stripe", "R2"]', 
    is_featured: 0, 
    is_published: 1 
  }
];

const fallbackTestimonials = [
  { id: 1, name: 'Rahul Mehta', role: 'Founder', company: 'Spice Kitchen', quote: 'The Scene Co. built our entire POS system and website in 3 weeks. Sales tracking is now real-time and our staff loves the interface.', rating: 5, order_index: 0 },
  { id: 2, name: 'Priya Sharma', role: 'CEO', company: 'Urban Threads', quote: 'Our online store went from 0 to 200 orders/month in the first quarter. The CMS makes it easy to manage products without any technical knowledge.', rating: 5, order_index: 1 },
  { id: 3, name: 'Amit Patel', role: 'CTO', company: 'TechNova Solutions', quote: 'Professional, fast, and they actually understood our requirements. The custom CMS they built saves us hours every week.', rating: 5, order_index: 2 },
  { id: 4, name: 'Sneha Reddy', role: 'Marketing Head', company: 'CloudMetrics', quote: 'Our landing page conversion rate doubled after the redesign. The animations are smooth and the site loads instantly.', rating: 4, order_index: 3 }
];

const fallbackPricingPlans = [
  { id: 1, name: 'Starter', slug: 'starter', price_min: 15000, price_max: 25000, currency: '₹', description: 'Perfect for small businesses and personal brands', delivery_time: '7–10 days', is_popular: 0, order_index: 0 },
  { id: 2, name: 'Business', slug: 'business', price_min: 40000, price_max: 75000, currency: '₹', description: 'For growing businesses that need a professional online presence', delivery_time: '15–20 days', is_popular: 1, order_index: 1 },
  { id: 3, name: 'E-Commerce', slug: 'ecommerce', price_min: 75000, price_max: 150000, currency: '₹', description: 'Full online store with payments, inventory, and order management', delivery_time: '25–35 days', is_popular: 0, order_index: 2 },
  { id: 4, name: 'POS + Website', slug: 'pos-website', price_min: 100000, price_max: 250000, currency: '₹', description: 'Custom POS system with integrated website and analytics', delivery_time: '30–45 days', is_popular: 0, order_index: 3 }
];

const fallbackPricingFeatures = [
  // Starter (1)
  { id: 1, plan_id: 1, feature: '5-page responsive website', order_index: 0 },
  { id: 2, plan_id: 1, feature: 'Custom design (no templates)', order_index: 1 },
  { id: 3, plan_id: 1, feature: 'Contact form + WhatsApp integration', order_index: 2 },
  { id: 4, plan_id: 1, feature: 'Basic SEO setup', order_index: 3 },
  { id: 5, plan_id: 1, feature: 'Mobile optimized', order_index: 4 },
  { id: 6, plan_id: 1, feature: '1 year FREE hosting', order_index: 5 },
  { id: 7, plan_id: 1, feature: '1 year FREE domain', order_index: 6 },
  { id: 8, plan_id: 1, feature: 'CMS: Edit text, images, contact info', order_index: 7 },
  // Business (2)
  { id: 9, plan_id: 2, feature: '10–15 page website', order_index: 0 },
  { id: 10, plan_id: 2, feature: 'Custom design + animations', order_index: 1 },
  { id: 11, plan_id: 2, feature: 'Blog/CMS with full content management', order_index: 2 },
  { id: 12, plan_id: 2, feature: 'Lead capture forms', order_index: 3 },
  { id: 13, plan_id: 2, feature: 'Advanced SEO + Google Analytics', order_index: 4 },
  { id: 14, plan_id: 2, feature: 'Social media integration', order_index: 5 },
  { id: 15, plan_id: 2, feature: '1 year FREE hosting', order_index: 6 },
  { id: 16, plan_id: 2, feature: '1 year FREE domain', order_index: 7 },
  { id: 17, plan_id: 2, feature: 'CMS: Full content management + media library', order_index: 8 },
  // E-Commerce (3)
  { id: 18, plan_id: 3, feature: 'Full online store with product catalog', order_index: 0 },
  { id: 19, plan_id: 3, feature: 'Payment gateway (Razorpay, Stripe, UPI)', order_index: 1 },
  { id: 20, plan_id: 3, feature: 'Inventory management dashboard', order_index: 2 },
  { id: 21, plan_id: 3, feature: 'Order tracking system', order_index: 3 },
  { id: 22, plan_id: 3, feature: 'Customer accounts + wishlists', order_index: 4 },
  { id: 23, plan_id: 3, feature: 'Email notifications', order_index: 5 },
  { id: 24, plan_id: 3, feature: '1 year FREE hosting', order_index: 6 },
  { id: 25, plan_id: 3, feature: '1 year FREE domain', order_index: 7 },
  { id: 26, plan_id: 3, feature: 'CMS: Products, orders, inventory, content', order_index: 8 },
  // POS + Website (4)
  { id: 27, plan_id: 4, feature: 'Custom POS web application', order_index: 0 },
  { id: 28, plan_id: 4, feature: 'Inventory management', order_index: 1 },
  { id: 29, plan_id: 4, feature: 'Billing + invoicing', order_index: 2 },
  { id: 30, plan_id: 4, feature: 'Multi-user access (cashier, manager, admin)', order_index: 3 },
  { id: 31, plan_id: 4, feature: 'Sales analytics dashboard', order_index: 4 },
  { id: 32, plan_id: 4, feature: 'Integrated website + store', order_index: 5 },
  { id: 33, plan_id: 4, feature: 'Payment processing', order_index: 6 },
  { id: 34, plan_id: 4, feature: '1 year FREE hosting', order_index: 7 },
  { id: 35, plan_id: 4, feature: '1 year FREE domain', order_index: 8 },
  { id: 36, plan_id: 4, feature: 'CMS: Full business management dashboard', order_index: 9 }
];

const fallbackFaqs = [
  { id: 1, question: 'How long does it take to build a website?', answer: 'Depending on the package, delivery ranges from 7 days (Starter) to 45 days (POS + Website). We keep you updated at every milestone.', category: 'general', order_index: 0, is_published: 1 },
  { id: 2, question: 'What does "1 year free hosting" mean?', answer: 'We host your website on Cloudflare\'s edge network for 1 year at no extra cost. After that, hosting continues at ₹500–₹4,000/month depending on your plan.', category: 'general', order_index: 1, is_published: 1 },
  { id: 3, question: 'Do I get a free domain too?', answer: 'Yes! We register your .com or .in domain for free for the first year. Renewal after that is at standard rates (₹800–₹1,500/year).', category: 'general', order_index: 2, is_published: 1 },
  { id: 4, question: 'Can I edit the website content myself?', answer: 'Absolutely. Every website comes with a built-in CMS dashboard where you can edit text, images, blog posts, products, and more — no coding needed.', category: 'general', order_index: 3, is_published: 1 },
  { id: 5, question: 'What payment methods do you accept?', answer: 'We accept bank transfer, UPI, and Razorpay. Payment is split into milestones: 40% upfront, 30% at design approval, 30% on delivery.', category: 'general', order_index: 4, is_published: 1 },
  { id: 6, question: 'Do you build POS systems for restaurants?', answer: 'Yes! Our custom POS systems work on any browser/tablet, include billing, inventory, staff management, and real-time analytics. No expensive hardware needed.', category: 'pos', order_index: 0, is_published: 1 },
  { id: 7, question: 'Can you integrate Razorpay/Stripe/UPI?', answer: 'Yes, we integrate all major Indian and international payment gateways including Razorpay, Stripe, Paytm, and UPI.', category: 'ecommerce', order_index: 0, is_published: 1 },
  { id: 8, question: 'What if I need changes after launch?', answer: 'We offer maintenance packages starting at ₹2,000/month that include bug fixes, content updates, and security patches.', category: 'general', order_index: 5, is_published: 1 }
];

const fallbackTeam = [
  {
    id: 1,
    name: 'Your Name',
    role: 'Founder & Creative Director',
    bio: 'Building premium websites, POS systems, and SaaS products for businesses that want more than templates.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    order_index: 0,
    is_published: 1
  }
];

const fallbackClients = [
  { id: 1, name: 'Company A', logo_url: '', order_index: 1, is_published: 1 },
  { id: 2, name: 'Company B', logo_url: '', order_index: 2, is_published: 1 },
  { id: 3, name: 'Company C', logo_url: '', order_index: 3, is_published: 1 },
  { id: 4, name: 'Company D', logo_url: '', order_index: 4, is_published: 1 }
];

// ─── Database Operations ───────────────────────────────────────────────────

export async function getAllSettings(): Promise<Record<string, string>> {
  const db = await getDb();
  if (!db) return fallbackSettings;

  const { results } = await db.prepare("SELECT key, value FROM site_settings").all<{ key: string; value: string }>();
  if (!results || results.length === 0) return fallbackSettings;

  const settings: Record<string, string> = {};
  for (const row of results) {
    settings[row.key] = row.value;
  }
  return settings;
}

export async function getPublishedPages(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM pages WHERE is_published = 1 ORDER BY updated_at DESC").all();
  return results || [];
}

export async function getPageBySlug(slug: string): Promise<any | null> {
  const db = await getDb();
  if (!db) return null;
  return await db.prepare("SELECT * FROM pages WHERE slug = ? AND is_published = 1").bind(slug).first();
}

export async function getPublishedPortfolio(category?: string): Promise<any[]> {
  const db = await getDb();
  if (!db) {
    if (category) {
      return fallbackPortfolio.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
    return fallbackPortfolio;
  }
  if (category) {
    const { results } = await db.prepare("SELECT * FROM portfolio_items WHERE category = ? AND is_published = 1 ORDER BY is_featured DESC, created_at DESC").bind(category).all();
    return results || [];
  }
  const { results } = await db.prepare("SELECT * FROM portfolio_items WHERE is_published = 1 ORDER BY is_featured DESC, created_at DESC").all();
  return results || [];
}

export async function getAllPortfolioItems(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackPortfolio;
  const { results } = await db.prepare("SELECT * FROM portfolio_items ORDER BY is_featured DESC, created_at DESC").all();
  return results || [];
}

export async function getPortfolioBySlug(slug: string): Promise<any | null> {
  const db = await getDb();
  if (!db) return fallbackPortfolio.find(item => item.slug === slug) || null;
  return await db.prepare("SELECT * FROM portfolio_items WHERE slug = ? AND is_published = 1").bind(slug).first();
}

export async function getPortfolioCategories(): Promise<string[]> {
  const db = await getDb();
  if (!db) return ["E-commerce", "POS", "Website"];
  const { results } = await db.prepare("SELECT DISTINCT category FROM portfolio_items WHERE is_published = 1 ORDER BY category").all<{ category: string }>();
  return (results || []).map(r => r.category);
}

export async function getPublishedTestimonials(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackTestimonials;
  const { results } = await db.prepare("SELECT * FROM testimonials WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllTestimonials(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackTestimonials;
  const { results } = await db.prepare("SELECT * FROM testimonials ORDER BY order_index ASC").all();
  return results || [];
}

export async function getPublishedPricing(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackPricingPlans;
  const { results } = await db.prepare("SELECT * FROM pricing_plans WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllPricingPlans(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackPricingPlans;
  const { results } = await db.prepare("SELECT * FROM pricing_plans ORDER BY order_index ASC").all();
  return results || [];
}

export async function getPricingFeatures(planId: number): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackPricingFeatures.filter(f => f.plan_id === planId);
  const { results } = await db.prepare("SELECT * FROM pricing_features WHERE plan_id = ? ORDER BY order_index ASC").bind(planId).all();
  return results || [];
}

export async function getPublishedBlogPosts(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT id, title, slug, excerpt, cover_image_url, author, tags, published_at, created_at FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC").all();
  return results || [];
}

export async function getAllBlogPosts(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT id, title, slug, excerpt, cover_image_url, author, tags, published_at, created_at, is_published FROM blog_posts ORDER BY created_at DESC").all();
  return results || [];
}

export async function getBlogPostBySlug(slug: string): Promise<any | null> {
  const db = await getDb();
  if (!db) return null;
  return await db.prepare("SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1").bind(slug).first();
}

export async function getPublishedFAQs(category?: string): Promise<any[]> {
  const db = await getDb();
  if (!db) {
    if (category) {
      return fallbackFaqs.filter(faq => faq.category.toLowerCase() === category.toLowerCase());
    }
    return fallbackFaqs;
  }
  if (category) {
    const { results } = await db.prepare("SELECT * FROM faqs WHERE category = ? AND is_published = 1 ORDER BY order_index ASC").bind(category).all();
    return results || [];
  }
  const { results } = await db.prepare("SELECT * FROM faqs WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllFAQs(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackFaqs;
  const { results } = await db.prepare("SELECT * FROM faqs ORDER BY order_index ASC").all();
  return results || [];
}

export async function createLead(lead: { name: string; email: string; phone: string; message: string; service_interest: string; budget_range: string }): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  await db.prepare(
    "INSERT INTO leads (name, email, phone, message, service_interest, budget_range) VALUES (?, ?, ?, ?, ?, ?)"
  ).bind(lead.name, lead.email, lead.phone, lead.message, lead.service_interest, lead.budget_range).run();
  return true;
}

export async function getLeads(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
  return results || [];
}

export async function markLeadRead(id: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.prepare("UPDATE leads SET is_read = 1 WHERE id = ?").bind(id).run();
}

export async function checkRateLimit(ip: string, endpoint: string, maxRequests: number, windowMinutes: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return true;

  const { results } = await db.prepare(
    "SELECT count FROM rate_limits WHERE ip = ? AND endpoint = ? AND window_start > datetime('now', ?)"
  ).bind(ip, endpoint, `-${windowMinutes} minutes`).all<{ count: number }>();

  if (results && results.length > 0 && results[0].count >= maxRequests) {
    return false;
  }

  await db.prepare(
    "INSERT INTO rate_limits (ip, endpoint, count, window_start) VALUES (?, ?, 1, datetime('now')) ON CONFLICT(ip, endpoint) DO UPDATE SET count = count + 1"
  ).bind(ip, endpoint).run();

  return true;
}

// ─── Team Members ───────────────────────────────────────────────────────────

export async function getPublishedTeamMembers(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackTeam;
  const { results } = await db.prepare("SELECT * FROM team_members WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllTeamMembers(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackTeam;
  const { results } = await db.prepare("SELECT * FROM team_members ORDER BY order_index ASC").all();
  return results || [];
}

// ─── Clients ──────────────────────────────────────────────────────────────────

export async function getPublishedClients(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackClients;
  const { results } = await db.prepare("SELECT * FROM clients WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllClients(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackClients;
  const { results } = await db.prepare("SELECT * FROM clients ORDER BY order_index ASC").all();
  return results || [];
}
