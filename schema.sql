-- The Scene Co — CMS Database Schema
-- Drop existing tables if re-running
DROP TABLE IF EXISTS rate_limits;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS portfolio_items;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS pricing_plans;
DROP TABLE IF EXISTS pricing_features;
DROP TABLE IF EXISTS leads;
DROP TABLE IF EXISTS site_settings;
DROP TABLE IF EXISTS faqs;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS admin_config;

-- ─── Admin Config ──────────────────────────────────────────────────────────────
CREATE TABLE admin_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Default admin password hash (SHA-256 of "sceneco_admin")
-- Change after first login!
INSERT INTO admin_config (key, value) VALUES (
  'admin_password_hash',
  'dcb6ba1b0db77ed6389c29f5438886cbb5d3cee92a180eb4a91572846568c'
);

-- ─── Site Settings ─────────────────────────────────────────────────────────────
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'The Scene Co.'),
  ('site_tagline', 'We Build Premium Websites, POS Systems & SaaS Products'),
  ('hero_title', 'Your Vision. Our Code. Zero Templates.'),
  ('hero_subtitle', 'Custom websites, e-commerce stores, and POS systems — built from scratch with a CMS you control. 1 year free hosting included.'),
  ('hero_cta_text', 'Get a Free Quote'),
  ('hero_cta_link', '/contact'),
  ('contact_email', 'hello@thescene.co.in'),
  ('contact_phone', '+91 98765 43210'),
  ('contact_address', 'India'),
  ('whatsapp_number', '+919876543210'),
  ('social_twitter', ''),
  ('social_instagram', ''),
  ('social_linkedin', ''),
  ('social_github', '');

-- ─── Pages (CMS-managed website pages) ─────────────────────────────────────────
CREATE TABLE pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_description TEXT DEFAULT '',
  content TEXT DEFAULT '',
  is_published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ─── Portfolio Items ───────────────────────────────────────────────────────────
CREATE TABLE portfolio_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  gallery_urls TEXT DEFAULT '[]',
  client_name TEXT DEFAULT '',
  technologies TEXT DEFAULT '[]',
  is_featured INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ─── Testimonials ──────────────────────────────────────────────────────────────
CREATE TABLE testimonials (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT DEFAULT '',
  quote TEXT NOT NULL,
  avatar_url TEXT DEFAULT '',
  rating INTEGER DEFAULT 5,
  is_published INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ─── Pricing Plans ─────────────────────────────────────────────────────────────
CREATE TABLE pricing_plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  currency TEXT DEFAULT '₹',
  description TEXT NOT NULL,
  delivery_time TEXT NOT NULL,
  is_popular INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE pricing_features (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  plan_id INTEGER NOT NULL,
  feature TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (plan_id) REFERENCES pricing_plans(id) ON DELETE CASCADE
);

-- ─── Leads (Contact form submissions) ──────────────────────────────────────────
CREATE TABLE leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  message TEXT NOT NULL,
  service_interest TEXT DEFAULT '',
  budget_range TEXT DEFAULT '',
  is_read INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ─── Blog Posts ────────────────────────────────────────────────────────────────
CREATE TABLE blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT DEFAULT '',
  author TEXT DEFAULT 'The Scene Co.',
  tags TEXT DEFAULT '[]',
  is_published INTEGER DEFAULT 0,
  published_at TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ─── FAQs ──────────────────────────────────────────────────────────────────────
CREATE TABLE faqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  order_index INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ─── Team Members ────────────────────────────────────────────────────
CREATE TABLE team_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  order_index INTEGER DEFAULT 0,
  is_published INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

INSERT INTO team_members (name, role, bio, image_url, order_index, is_published) VALUES (
  'Your Name',
  'Founder & Creative Director',
  'Building premium websites, POS systems, and SaaS products for businesses that want more than templates.',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  0,
  1
);

-- ─── Rate Limits (for contact form + login protection) ─────────────────────────
CREATE TABLE rate_limits (
  ip TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  window_start TEXT DEFAULT (datetime('now')),
  PRIMARY KEY (ip, endpoint)
);
