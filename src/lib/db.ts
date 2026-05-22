import { getBindings } from "@/lib/cf-bindings";

export async function getDb(): Promise<D1Database | null> {
  const { db } = await getBindings();
  return db || null;
}

export async function getAllSettings(): Promise<Record<string, string>> {
  const db = await getDb();
  if (!db) return {};

  const { results } = await db.prepare("SELECT key, value FROM site_settings").all<{ key: string; value: string }>();
  const settings: Record<string, string> = {};
  for (const row of results || []) {
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
  if (!db) return [];
  if (category) {
    const { results } = await db.prepare("SELECT * FROM portfolio_items WHERE category = ? AND is_published = 1 ORDER BY is_featured DESC, created_at DESC").bind(category).all();
    return results || [];
  }
  const { results } = await db.prepare("SELECT * FROM portfolio_items WHERE is_published = 1 ORDER BY is_featured DESC, created_at DESC").all();
  return results || [];
}

export async function getAllPortfolioItems(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM portfolio_items ORDER BY is_featured DESC, created_at DESC").all();
  return results || [];
}

export async function getPortfolioBySlug(slug: string): Promise<any | null> {
  const db = await getDb();
  if (!db) return null;
  return await db.prepare("SELECT * FROM portfolio_items WHERE slug = ? AND is_published = 1").bind(slug).first();
}

export async function getPortfolioCategories(): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT DISTINCT category FROM portfolio_items WHERE is_published = 1 ORDER BY category").all<{ category: string }>();
  return (results || []).map(r => r.category);
}

export async function getPublishedTestimonials(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM testimonials WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllTestimonials(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM testimonials ORDER BY order_index ASC").all();
  return results || [];
}

export async function getPublishedPricing(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM pricing_plans WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllPricingPlans(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM pricing_plans ORDER BY order_index ASC").all();
  return results || [];
}

export async function getPricingFeatures(planId: number): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
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
  if (!db) return [];
  if (category) {
    const { results } = await db.prepare("SELECT * FROM faqs WHERE category = ? AND is_published = 1 ORDER BY order_index ASC").bind(category).all();
    return results || [];
  }
  const { results } = await db.prepare("SELECT * FROM faqs WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllFAQs(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
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
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM team_members WHERE is_published = 1 ORDER BY order_index ASC").all();
  return results || [];
}

export async function getAllTeamMembers(): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const { results } = await db.prepare("SELECT * FROM team_members ORDER BY order_index ASC").all();
  return results || [];
}
