-- The Scene Co — Seed Data for CMS

-- ─── Portfolio Items ───────────────────────────────────────────────────────────
INSERT INTO portfolio_items (title, slug, category, description, image_url, client_name, technologies, is_featured) VALUES
  ('Restaurant POS + Website', 'restaurant-pos-website', 'POS', 'Custom web-based POS system with integrated website for a multi-location restaurant chain. Real-time inventory, billing, and analytics dashboard.', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', 'Spice Kitchen', '["Next.js", "D1", "R2", "Razorpay"]', 1),
  ('E-Commerce Fashion Store', 'ecommerce-fashion-store', 'E-commerce', 'Full online store with 500+ products, Razorpay integration, inventory management, and customer accounts. 1 year free hosting included.', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', 'Urban Threads', '["Next.js", "D1", "Razorpay", "R2"]', 1),
  ('SaaS Landing Page', 'saas-landing-page', 'Website', 'High-converting SaaS landing page with animations, pricing table, and lead capture. Built with Next.js and deployed on Cloudflare Pages.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', 'CloudMetrics', '["Next.js", "Framer Motion", "Cloudflare"]', 1),
  ('Corporate Website Redesign', 'corporate-website-redesign', 'Website', 'Complete redesign of a corporate website with custom CMS, blog, and multi-language support. 40% increase in organic traffic.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', 'TechNova Solutions', '["Next.js", "D1", "Tailwind"]', 0),
  ('Retail POS Dashboard', 'retail-pos-dashboard', 'POS', 'Custom POS dashboard for a retail chain with 15 stores. Real-time sales tracking, inventory sync, and staff management.', 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=800&q=80', 'StyleMart Retail', '["Next.js", "D1", "Recharts"]', 0),
  ('D2C Brand Website', 'd2c-brand-website', 'E-commerce', 'Direct-to-consumer brand website with product catalog, subscription management, and integrated blog.', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 'PureGlow Naturals', '["Next.js", "Stripe", "R2"]', 0);

-- ─── Testimonials ──────────────────────────────────────────────────────────────
INSERT INTO testimonials (name, role, company, quote, rating, order_index) VALUES
  ('Rahul Mehta', 'Founder', 'Spice Kitchen', 'The Scene Co. built our entire POS system and website in 3 weeks. Sales tracking is now real-time and our staff loves the interface.', 5, 0),
  ('Priya Sharma', 'CEO', 'Urban Threads', 'Our online store went from 0 to 200 orders/month in the first quarter. The CMS makes it easy to manage products without any technical knowledge.', 5, 1),
  ('Amit Patel', 'CTO', 'TechNova Solutions', 'Professional, fast, and they actually understood our requirements. The custom CMS they built saves us hours every week.', 5, 2),
  ('Sneha Reddy', 'Marketing Head', 'CloudMetrics', 'Our landing page conversion rate doubled after the redesign. The animations are smooth and the site loads instantly.', 4, 3);

-- ─── Pricing Plans ─────────────────────────────────────────────────────────────
INSERT INTO pricing_plans (name, slug, price_min, price_max, description, delivery_time, is_popular, order_index) VALUES
  ('Starter', 'starter', 15000, 25000, 'Perfect for small businesses and personal brands', '7–10 days', 0, 0),
  ('Business', 'business', 40000, 75000, 'For growing businesses that need a professional online presence', '15–20 days', 1, 1),
  ('E-Commerce', 'ecommerce', 75000, 150000, 'Full online store with payments, inventory, and order management', '25–35 days', 0, 2),
  ('POS + Website', 'pos-website', 100000, 250000, 'Custom POS system with integrated website and analytics', '30–45 days', 0, 3);

-- Starter features
INSERT INTO pricing_features (plan_id, feature, order_index) VALUES
  (1, '5-page responsive website', 0),
  (1, 'Custom design (no templates)', 1),
  (1, 'Contact form + WhatsApp integration', 2),
  (1, 'Basic SEO setup', 3),
  (1, 'Mobile optimized', 4),
  (1, '1 year FREE hosting', 5),
  (1, '1 year FREE domain', 6),
  (1, 'CMS: Edit text, images, contact info', 7);

-- Business features
INSERT INTO pricing_features (plan_id, feature, order_index) VALUES
  (2, '10–15 page website', 0),
  (2, 'Custom design + animations', 1),
  (2, 'Blog/CMS with full content management', 2),
  (2, 'Lead capture forms', 3),
  (2, 'Advanced SEO + Google Analytics', 4),
  (2, 'Social media integration', 5),
  (2, '1 year FREE hosting', 6),
  (2, '1 year FREE domain', 7),
  (2, 'CMS: Full content management + media library', 8);

-- E-Commerce features
INSERT INTO pricing_features (plan_id, feature, order_index) VALUES
  (3, 'Full online store with product catalog', 0),
  (3, 'Payment gateway (Razorpay, Stripe, UPI)', 1),
  (3, 'Inventory management dashboard', 2),
  (3, 'Order tracking system', 3),
  (3, 'Customer accounts + wishlists', 4),
  (3, 'Email notifications', 5),
  (3, '1 year FREE hosting', 6),
  (3, '1 year FREE domain', 7),
  (3, 'CMS: Products, orders, inventory, content', 8);

-- POS + Website features
INSERT INTO pricing_features (plan_id, feature, order_index) VALUES
  (4, 'Custom POS web application', 0),
  (4, 'Inventory management', 1),
  (4, 'Billing + invoicing', 2),
  (4, 'Multi-user access (cashier, manager, admin)', 3),
  (4, 'Sales analytics dashboard', 4),
  (4, 'Integrated website + store', 5),
  (4, 'Payment processing', 6),
  (4, '1 year FREE hosting', 7),
  (4, '1 year FREE domain', 8),
  (4, 'CMS: Full business management dashboard', 9);

-- ─── FAQs ──────────────────────────────────────────────────────────────────────
INSERT INTO faqs (question, answer, category, order_index) VALUES
  ('How long does it take to build a website?', 'Depending on the package, delivery ranges from 7 days (Starter) to 45 days (POS + Website). We keep you updated at every milestone.', 'general', 0),
  ('What does "1 year free hosting" mean?', 'We host your website on Cloudflare''s edge network for 1 year at no extra cost. After that, hosting continues at ₹500–₹4,000/month depending on your plan.', 'general', 1),
  ('Do I get a free domain too?', 'Yes! We register your .com or .in domain for free for the first year. Renewal after that is at standard rates (₹800–₹1,500/year).', 'general', 2),
  ('Can I edit the website content myself?', 'Absolutely. Every website comes with a built-in CMS dashboard where you can edit text, images, blog posts, products, and more — no coding needed.', 'general', 3),
  ('What payment methods do you accept?', 'We accept bank transfer, UPI, and Razorpay. Payment is split into milestones: 40% upfront, 30% at design approval, 30% on delivery.', 'general', 4),
  ('Do you build POS systems for restaurants?', 'Yes! Our custom POS systems work on any browser/tablet, include billing, inventory, staff management, and real-time analytics. No expensive hardware needed.', 'pos', 0),
  ('Can you integrate Razorpay/Stripe/UPI?', 'Yes, we integrate all major Indian and international payment gateways including Razorpay, Stripe, Paytm, and UPI.', 'ecommerce', 0),
  ('What if I need changes after launch?', 'We offer maintenance packages starting at ₹2,000/month that include bug fixes, content updates, and security patches.', 'general', 5);

-- ─── Blog Posts ────────────────────────────────────────────────────────────────
INSERT INTO blog_posts (title, slug, excerpt, content, cover_image_url, tags, is_published, published_at) VALUES
  ('Why Custom Websites Beat Template Builders in 2026', 'why-custom-websites-beat-templates', 'Template builders like Wix and Webflow are great for DIY, but here''s why businesses are switching to custom-built websites.', 'When you''re building a business website, the platform you choose matters more than you think. Template builders like Wix, Squarespace, and Webflow offer quick setup, but they come with hidden costs and limitations that become apparent as your business grows.\n\n## The Template Trap\n\nTemplate builders charge ₹800–₹3,000 per month per site. That''s ₹9,600–₹36,000 per year — forever. And you don''t own your code.\n\n## Why Custom Wins\n\n1. **You own the code** — No vendor lock-in\n2. **Better performance** — Custom code is leaner than template bloat\n3. **SEO advantage** — Clean HTML structure, faster load times\n4. **Scalability** — Add any feature without platform limitations\n5. **One-time cost** — Pay once, not monthly\n\n## The Scene Co. Difference\n\nWe build custom websites with Next.js, deploy on Cloudflare''s edge network, and include 1 year of free hosting. After that, you pay just ₹500–₹4,000/month — a fraction of template builder costs.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', '["websites", "custom development", "comparison"]', 1, '2026-01-15'),
  ('How to Choose the Right POS System for Your Business', 'how-to-choose-pos-system', 'Restaurant, retail, or e-commerce — here''s what to look for in a POS system that actually grows your business.', 'Choosing a POS system is one of the most important decisions for any retail or restaurant business. The right system can increase efficiency by 30% and reduce errors by 90%. Here''s what to look for:\n\n## Cloud-Based vs Traditional\n\nCloud-based POS systems work on any browser, require no expensive hardware, and give you real-time data from anywhere. Traditional systems lock you into specific hardware and software.\n\n## Must-Have Features\n\n- Real-time inventory tracking\n- Multi-user access with role-based permissions\n- Sales analytics and reporting\n- Integration with your website\n- Payment gateway support (UPI, cards, wallets)\n\n## Why Custom POS Beats Off-the-Shelf\n\nOff-the-shelf POS systems charge ₹5,000–₹25,000 per month and force you to use their hardware. A custom POS is a one-time investment that fits your exact workflow.', 'https://images.unsplash.com/photo-1556740758-90de940de450?auto=format&fit=crop&w=800&q=80', '["POS", "business", "guide"]', 1, '2026-02-01');
