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

const fallbackBlogPosts = [
  {
    id: 1,
    title: 'Why SEO is the Lifeblood of Modern Businesses in Bangalore, India',
    slug: 'seo-lifeblood-modern-businesses-bangalore',
    excerpt: 'In Bangalore\'s highly competitive digital landscape, being visible on Google Search is no longer optional. Learn how SEO drives high-intent traffic and sustainable business growth.',
    content: `Bangalore is known as the Silicon Valley of India, and with that title comes intense competition. For startups, local businesses, and enterprises alike, appearing on the first page of Google Search is a major growth driver. While paid ads (PPC) can yield quick wins, they stop producing leads the moment your ad budget runs dry. SEO (Search Engine Optimization), however, builds long-term organic authority that delivers high-intent prospects month after month without ad spend.

#### The Anatomy of High-Intent Traffic
High-intent traffic refers to searchers who are actively looking for solutions to their problems. When someone searches for "best web development company in Bangalore," they are already in the buying phase. Optimizing your website for these exact keyword clusters ensures that your brand appears at the exact moment a prospect is ready to hire an agency.

#### Core Pillars of Modern SEO
1. **Technical SEO**: Ensuring search engine crawlers can index your pages without issues. This includes fast response times, proper robots meta directives, and clean redirect structures.
2. **On-Page SEO**: Writing keyword-first titles and descriptions that match user intent. Headers (H1, H2, H3) must structure content logically.
3. **High-Quality Content**: Google rewards deep, structured, and informative pages. The longer a user stays on your page because they find it helpful, the higher Google will rank you.
4. **Custom JSON-LD Schema**: Adding structured data tells search engine bots exactly what your business does, enabling rich snippets on search results pages.

By investing in a custom Next.js stack instead of slow, plugin-heavy page builders, your site's Core Web Vitals will naturally excel, giving you a massive SEO advantage over competitors.`,
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'The Scene Co.',
    tags: '["SEO", "Bangalore", "Business Growth", "Digital Marketing"]',
    is_published: 1,
    published_at: '2026-06-17',
    created_at: '2026-06-17'
  },
  {
    id: 2,
    title: 'What is an XML Sitemap and Why is It Critical for Your SEO?',
    slug: 'what-is-xml-sitemap-seo-importance',
    excerpt: 'An XML sitemap is a critical file that helps search engine crawlers find and index all the important pages on your website. Learn how to optimize yours for Googlebot.',
    content: `An XML sitemap is essentially a roadmap of your website that leads search engines directly to all your key pages. While Google's crawlers can find pages through standard link navigation, an XML sitemap ensures that no important URL is missed, especially on new or large websites.

#### How Search Engines Use Sitemaps
When Googlebot or Bingbot visits your site, it references the sitemap to discover the sitemap index and all the listed subpages. The sitemap provides valuable metadata:
* **Last Modified Date**: Tells crawlers when a page was last updated, allowing them to re-crawl changed content quickly.
* **Change Frequency**: Indicates how often content is expected to change.
* **Priority**: Suggests the relative importance of pages compared to others on the site.

#### Next.js Dynamic Sitemaps
In modern Next.js frameworks, sitemaps are generated dynamically (using \`sitemap.ts\`). This ensures that the moment you publish a new service page, blog post, or case study, it is automatically appended to the \`/sitemap.xml\` output. This dynamic indexing keeps your site's presence up-to-date with zero manual maintenance.

For optimal SEO, always register your sitemap URL directly in Google Search Console. This tells Google exactly where to look to crawl your site.`,
    cover_image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    author: 'The Scene Co.',
    tags: '["SEO", "Technical SEO", "Sitemaps", "Googlebot"]',
    is_published: 1,
    published_at: '2026-06-17',
    created_at: '2026-06-17'
  },
  {
    id: 3,
    title: 'Why Your Business Needs a Website (Even in the Social Media Age)',
    slug: 'why-business-needs-website-social-media',
    excerpt: 'Discover why relying solely on Instagram, LinkedIn, or Facebook page is a major business risk, and why a custom website is your ultimate digital hub.',
    content: `Many business owners believe that having a strong social media presence on Instagram, LinkedIn, or Facebook is enough. While social media is great for audience engagement and brand building, relying on it as your sole digital presence is a dangerous trap. Here is why a custom website is essential:

#### 1. True Ownership and Control
When you build your business on a social media platform, you do not own the platform. Algorithm updates can wipe out your reach overnight, or your account could be suspended without warning. A website represents digital real estate that you fully own and control. You own the source code, the domain, and the customer data.

#### 2. Professional Credibility
A custom domain (e.g., \`yourcompany.com\`) sends an immediate signal of professionalism and trust. A study shows that over 80% of consumers believe a website makes a business more credible than a social media profile. It shows that you have invested in your business's infrastructure.

#### 3. Google Search Visibility
People search on Google when they have high intent to buy. Social media posts do not rank well on Google for search keywords like "best software developers in Bangalore." Having a structured, search-engine-optimized website is the only way to capture this valuable organic traffic.

#### 4. Integrated Lead Capture and Analytics
A custom website allows you to build custom contact forms, integrate with Customer Relationship Management (CRM) tools, and track conversion rates using analytics. You can optimize the user experience to turn visitors into paying clients.`,
    cover_image_url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80',
    author: 'The Scene Co.',
    tags: '["Web Development", "Business", "Marketing", "Ownership"]',
    is_published: 1,
    published_at: '2026-06-17',
    created_at: '2026-06-17'
  },
  {
    id: 4,
    title: 'Demystifying CRM: What is Customer Relationship Management and How Can it Transform Your Sales?',
    slug: 'demystifying-crm-sales-business-growth',
    excerpt: 'Discover what Customer Relationship Management (CRM) software is, how it links with your website, and how to automate lead generation to close more deals.',
    content: `As your business grows, keeping track of every client interaction, email, follow-up, and contract becomes impossible to manage manually. This is where a CRM (Customer Relationship Management) system comes in. A CRM is a software database that helps businesses manage relationships with prospects and customers.

#### The Core Benefits of a CRM
* **Centralized Database**: Store names, email addresses, phone numbers, and communications in one clean place.
* **Sales Pipeline Visibility**: Track leads from their initial website submission down to negotiations and closed contracts.
* **Follow-Up Automation**: Set automated email triggers or reminders for your sales team, ensuring no prospect falls through the cracks.
* **Data-Driven Reports**: See which marketing channels yield the highest-value clients.

#### Why CRM and Website Integration Matters
Having a CRM is great, but integrating it directly with your website is a game-changer. When a prospect fills out a contact form on your site:
1. The lead data is sent directly to the CRM via API.
2. The lead is assigned to a sales representative.
3. An automated welcome email is sent instantly.

This frictionless process reduces response times, which is a major factor in converting leads into sales.`,
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'The Scene Co.',
    tags: '["CRM", "Sales", "Automation", "Business Systems"]',
    is_published: 1,
    published_at: '2026-06-17',
    created_at: '2026-06-17'
  },
  {
    id: 5,
    title: 'Next.js vs WordPress: Why Custom-Coded React Applications Dominate E-Commerce and SEO',
    slug: 'nextjs-vs-wordpress-ecommerce-seo',
    excerpt: 'WordPress runs a huge percentage of the web, but Next.js is the chosen stack for modern e-commerce brands. Compare speed, security, and SEO.',
    content: `For over a decade, WordPress was the default choice for building business websites. However, as web standards evolved and page speed became a core ranking factor, WordPress's limitations became clear. Modern companies are choosing custom-coded Next.js frameworks.

#### Speed and Core Web Vitals
WordPress relies on heavy plugins (like Elementor or WooCommerce) and database calls on every page load. This slows down your mobile site speed. Next.js, on the other hand, pre-renders pages into static HTML at build time or edges-caches them. This achieves sub-second response times, which dramatically improves conversion rates and Google SEO rankings.

#### Security and Maintenance
WordPress plugins are the #1 source of security vulnerabilities on the web. Keeping them updated requires ongoing maintenance. Custom Next.js sites are serverless and compiled, presenting no database or plugin injection vulnerabilities to hackers.

#### Complete Design Control
With Next.js, you are not constrained by WordPress templates or theme settings. You can build bespoke design systems with smooth CSS animations, ensuring your brand stands out from generic WordPress sites.`,
    cover_image_url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
    author: 'The Scene Co.',
    tags: '["Web Frameworks", "Next.js", "WordPress", "SEO"]',
    is_published: 1,
    published_at: '2026-06-17',
    created_at: '2026-06-17'
  },
  {
    id: 6,
    title: 'The Complete Guide to E-Commerce Payment Gateways in India: Razorpay, Stripe, and UPI',
    slug: 'ecommerce-payment-gateways-india-guide',
    excerpt: 'Selecting the right checkout experience is key to reducing cart abandonment. Compare payment gateways in India, transaction fees, and UPI deep-linking.',
    content: `When launching an online store in India, choosing the right payment gateway is crucial for converting traffic. A slow or confusing checkout experience can cause up to 70% of shoppers to abandon their carts. Here is a comparison of the top choices:

#### 1. Razorpay: The All-in-One Local Giant
Razorpay is the market leader in India. It offers an incredibly smooth checkout interface and supports UPI apps (Google Pay, PhonePe, Paytm), net banking, credit/debit cards, and buy-now-pay-later (BNPL) schemes. Its dashboard is excellent for managing refunds, invoices, and sales reports.

#### 2. Stripe: The Global Standard
If your store sells to international customers, Stripe is the absolute best choice. It has unmatched API documentation, card validation algorithms, and support for multi-currency pricing. However, its local payment support in India (especially UPI) is less mature than Razorpay's.

#### 3. UPI Deep-Linking: Direct and Zero-Fee
UPI has revolutionized payments in India. Direct UPI deep-linking bypasses standard gateway merchant fees (which range from 1.5% to 3%), allowing customers to pay directly from your UPI app to your business account. We build custom checkout flows that leverage direct UPI QR codes alongside standard gateways, maximizing profit margins for merchants.

By integrating a secure, multi-gateway system on your Next.js e-commerce site, you give customers trust and convenience, raising sales numbers.`,
    cover_image_url: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80',
    author: 'The Scene Co.',
    tags: '["E-Commerce", "Payments", "Razorpay", "India"]',
    is_published: 1,
    published_at: '2026-06-17',
    created_at: '2026-06-17'
  }
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

export async function getPublicSettings(): Promise<Record<string, string>> {
  const settings = await getAllSettings();
  const publicKeys = [
    "site_name",
    "site_tagline",
    "hero_title",
    "hero_subtitle",
    "hero_cta_text",
    "hero_cta_link",
    "contact_email",
    "contact_phone",
    "contact_address",
    "whatsapp_number",
    "social_twitter",
    "social_instagram",
    "social_linkedin",
    "social_github"
  ];
  const publicSettings: Record<string, string> = {};
  for (const key of publicKeys) {
    if (settings[key] !== undefined) {
      publicSettings[key] = settings[key];
    }
  }
  return publicSettings;
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
  if (!db) return fallbackBlogPosts;
  const { results } = await db.prepare("SELECT id, title, slug, excerpt, cover_image_url, author, tags, published_at, created_at FROM blog_posts WHERE is_published = 1 ORDER BY published_at DESC").all();
  return results || [];
}

export async function getAllBlogPosts(): Promise<any[]> {
  const db = await getDb();
  if (!db) return fallbackBlogPosts;
  const { results } = await db.prepare("SELECT id, title, slug, excerpt, cover_image_url, author, tags, published_at, created_at, is_published FROM blog_posts ORDER BY created_at DESC").all();
  return results || [];
}

export async function getBlogPostBySlug(slug: string): Promise<any | null> {
  const db = await getDb();
  if (!db) return fallbackBlogPosts.find(p => p.slug === slug) || null;
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
