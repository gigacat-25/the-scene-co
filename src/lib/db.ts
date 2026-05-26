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
    title: 'Why Custom Website Development Beats Template Builders in 2026',
    slug: 'why-custom-websites-beat-templates',
    excerpt: 'Wix, Webflow, and WordPress templates are easy starting points, but they come with heavy performance penalties, platform lock-in, and recurring fees. Here is why high-growth businesses are switching to custom code.',
    content: `When building a business website, the technology stack you choose dictates your growth limit. DIY template builders like Wix, Squarespace, and Webflow offer an easy starting point, but they come with heavy performance penalties, platform lock-in, and monthly fees. 

As a premium **custom website development agency in Bangalore**, we build digital solutions designed to rank, convert, and scale. Here is why high-growth businesses are switching to custom code.

## 1. The Real Cost: Subscriptions vs. True Ownership
Template builders charge recurring fees (often ₹800–₹4,000 per month). If you stop paying, your website disappears. 
*   **The Template Trap**: You are renting a website. You do not own the source code, making migration to another host nearly impossible.
*   **Custom Advantage**: You own your database and code. With a one-time build cost, you can host your site anywhere—including Cloudflare's fast edge networks which we include free for the first year.

## 2. Speed and Core Web Vitals (The SEO Weapon)
Google ranks fast websites higher. Template builders load massive, bloated libraries to make drag-and-drop interfaces work. This slows your mobile performance.
*   **Bloat-Free Code**: Custom Next.js sites load only the code they need.
*   **Core Web Vitals**: Faster page loads mean lower bounce rates and higher conversion rates.

## 3. SEO Flexibility Without Plugins
Off-the-shelf platforms restrict metadata control, sitemap indexing, and structured schemas.
*   By hiring a dedicated **custom website development agency**, you get tailored JSON-LD schema (Organization, LocalBusiness, Service, and FAQs) coded directly into every layout. This lets search engines crawl and categorize your services correctly.`,
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'The Scene Co.',
    tags: '["websites", "custom development", "SEO", "Bangalore"]',
    is_published: 1,
    published_at: '2026-01-15',
    created_at: '2026-01-15'
  },
  {
    id: 2,
    title: 'How to Choose the Right POS System for Your Business',
    slug: 'how-to-choose-pos-system',
    excerpt: 'Restaurant, retail, or e-commerce — here\'s what to look for in a POS system that actually grows your business.',
    content: `Choosing a POS system is one of the most important decisions for any retail or restaurant business. The right system can increase efficiency by 30% and reduce errors by 90%. Here's what to look for:

## Cloud-Based vs Traditional

Cloud-based POS systems work on any browser, require no expensive hardware, and give you real-time data from anywhere. Traditional systems lock you into specific hardware and software.

## Must-Have Features

- Real-time inventory tracking
- Multi-user access with role-based permissions
- Sales analytics and reporting
- Integration with your website
- Payment gateway support (UPI, cards, wallets)

## Why Custom POS Beats Off-the-Shelf

Off-the-shelf POS systems charge ₹5,000–₹25,000 per month and force you to use their hardware. A custom POS is a one-time investment that fits your exact workflow.`,
    cover_image_url: 'https://images.unsplash.com/photo-1556740758-90de940de450?auto=format&fit=crop&w=800&q=80',
    author: 'The Scene Co.',
    tags: '["POS", "business", "guide"]',
    is_published: 1,
    published_at: '2026-02-01',
    created_at: '2026-02-01'
  },
  {
    id: 3,
    title: 'Search Engine Optimization (SEO) Starter Guide',
    slug: 'seo-starter-guide',
    excerpt: 'An introduction to search engine optimization (SEO) from Google Search Central. Learn how to help search engines crawl, index, and understand your website.',
    content: `When you built your website, you likely created it with your users in mind, trying to make it easy for them to find and explore your content. One of those users is a search engine, which helps people discover your content. SEO—short for search engine optimization—is about helping search engines understand your content, and helping users find your site and make a decision about whether they should visit your site through a search engine.

The [Search Essentials](https://developers.google.com/search/docs/essentials) outline the most important elements of what makes your website eligible to appear on Google Search. While there's no guarantee that any particular site will be added to Google's index, sites that follow the **Search Essentials are more likely to show up in Google's search results**. SEO is about taking the next step and **working on improving your site's presence in Search**. This guide will walk you through some of the most common and effective improvements you can do on your site.

There are no secrets here that'll automatically rank your site first in Google (sorry!). In fact some of the suggestions might not even apply to your business, but following the best practices will hopefully make it easier for search engines (not just Google) to crawl, index, and understand your content.

## How does Google Search work?

Google is a fully automated search engine that uses programs called crawlers to explore the web constantly, looking for pages to add to our index. You usually don't need to do anything except publish your site on the web. In fact, the vast majority of sites listed in our results are found and added automatically as we crawl the web. If you're hungry for more, we have documentation about how [Google discovers, crawls, and serves web pages](https://developers.google.com/search/docs/fundamentals/how-search-works).

> [!IMPORTANT]
> **Short on time or not feeling adventurous?** You might consider hiring a professional. [Here's what to consider](https://developers.google.com/search/docs/fundamentals/do-i-need-seo).

## How long until I see impact in search results?

Every change you make will take some time to be reflected on Google's end. Some changes might take effect in a few hours, others could take several months. In general, you likely want to wait a few weeks to assess whether your work had beneficial effects in Google Search results. Keep in mind that not all changes you make to your website will result in noticeable impact in search results; if you're not satisfied with your results and your business strategies allow it, try iterating with the changes and see if they make a difference.

## Help Google find your content

Before you actually do anything mentioned in this section, check if Google has already found your content (maybe you don't need to do anything!). Try searching on Google for your site with the \`site:\` operator. If you see results pointing to your site, you're in the index. For example, a search for \`site:wikipedia.org\` returns [these results](https://www.google.com/search?q=site:wikipedia.org). If you don't see your site, check out the [technical requirements](https://developers.google.com/search/docs/essentials/technical) to make sure there's nothing technically preventing your site from showing in Google Search, and then come back here.

Google primarily finds pages through links from other pages it already crawled. In many cases, these are other websites that are linking to your pages. Other sites linking to you is something that happens naturally over time, and you can also encourage people to discover your content by [promoting your site](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#promoting).

If you're open to a little technical challenge, you could also [submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)—which is a file that contains all the URLs on your site that you care about. Some content management systems (CMS) may even do this automatically for you. However this isn't required, and you should first focus on making sure [people know about your site](https://developers.google.com/search/docs/fundamentals/seo-starter-guide#promoting).

### Check if Google can see your page the same way a user does

When Google crawls a page, it should ideally [see the page the same way an average user does](https://developers.google.com/search/blog/2014/05/understanding-web-pages-better). For this, Google needs to be able to access the same resources as the user's browser. If your site is hiding important components that make up your website (like CSS and JavaScript), Google might not be able to understand your pages, which means they might not show up in search results or rank well for the terms you're targeting.

If your pages have different information depending on the user's physical location, make sure you're satisfied with the information that Google sees from its crawler's location, which is generally the US.

To check how Google sees your page, use the [URL Inspection Tool in Search Console](https://support.google.com/webmasters/answer/9012289).

### Don't want a page in Google's search results?

It might be important for you to opt out your site as a whole or sections of it from appearing in search results. For example, you might not want your posts about your new embarrassing haircut to show up in search results. Google supports various ways that lets you opt out of crawling and indexing of your URLs. If you need to block some files, directories, or even your whole site from Google Search, check out our guide about [ways to prevent content from appearing in search results](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share#how-to-block-content).

## Organize your site

When you're setting up or redoing your site, it can be good to organize it in a logical way because it can help search engines and users understand how your pages relate to the rest of your site. Don't drop everything and start reorganizing your site right now though: while these suggestions can be helpful long term (especially if you're working on a larger website), search engines will likely understand your pages as they are right now, regardless of how your site is organized.

### Use descriptive URLs

Parts of the URL can be displayed in search results as breadcrumbs, so users can also use the URLs to understand whether a result will be useful for them.

Google learns breadcrumbs automatically based on the words in the URL, but you can also influence them with [structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb) if you like a technical challenge. Try to include words in the URL that may be useful for users; for example:

\`https://www.example.com/pets/cats.html\`

A URL that only contains random identifiers is less helpful for users; for example:

\`https://www.example.com/2/6772756D707920636174\`

### Group topically similar pages in directories

![An illustration of how to group pages in directories](https://developers.google.com/static/search/docs/images/grouping-pages-in-directories.png)

If you have more than a few thousand URLs on your site, how you organize your content may have effects on how Google crawls and indexes your site. Specifically, using directories (or folders) to group similar topics can help Google learn how often the URLs in individual directories change.

For example, consider the following URLs:

\`https://www.example.com/policies/return-policy.html\`
\`https://www.example.com/promotions/new-promos.html\`

The content in the \`policies\` directory seldomly changes, however the content in the \`promotions\` directory likely changes very often. Google can learn this information and crawl the different directories at different frequencies. To learn more about search-friendly site structures, check out our [guide for ecommerce sites](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure), for which a good URL structure is more important as they tend to be larger.

### Reduce duplicate content

Some websites show the same content under different URLs, which is called *[duplicate content](https://developers.google.com/search/docs/crawling-indexing/canonicalization)*. Search engines choose a single URL (the *canonical* URL) to show users, per piece of content.

Having duplicate content on your site is not a violation of our spam policies, but it can be a bad user experience and search engines might waste crawling resources on URLs that you don't even care about. If you're feeling adventurous, it's worth figuring out if you can [specify a canonical version](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) for your pages. But if you don't canonicalize your URLs yourself, Google will try to automatically do it for you.

When working on canonicalization, try to ensure that each piece of content on your site is only accessible through one individual URL; having two pages that contain the same information about your promotions can be a confusing user experience.

If you have multiple pages that have the same information, try setting up a [redirect](https://developers.google.com/search/docs/crawling-indexing/301-redirects) from non-preferred URLs to a URL that best represents that information. If you can't redirect, use the \`link\` element instead. But again, don't worry too much about this; search engines can generally figure this out for you on their own most of the time.

## Make your site interesting and useful

Creating content that people find compelling and useful will likely influence your website's presence in search results more than any of the other suggestions in this guide. While "compelling and useful content" can mean different things to different people, content like this generally shares some common attributes, such as:

- **The text is easy-to-read and well organized**: Write content naturally and make sure the content is well written, easy to follow, and free of spelling and grammatical mistakes. Break up long content into paragraphs and sections, and provide headings to help users navigate your pages.
- **[The content is unique](https://developers.google.com/search/docs/essentials/spam-policies#scraped-content)**: When you're writing new content, don't copy others' content in part or in its entirety: create the content yourself based on what you know about the topic. Don't just rehash what others already published.
- **The content is up-to-date**: Check in on previously published content and update it as needed, or even delete it if it's not relevant anymore.
- **The content is [helpful, reliable, and people-first](https://developers.google.com/search/docs/fundamentals/creating-helpful-content):** Be sure that you're writing content that your readers will find helpful and reliable. For example, providing expert or experienced sources can help people understand your articles' expertise.

### Expect your readers' search terms

Think about the words that a user might search for to find a piece of your content. Users who know a lot about the topic might use different keywords in their search queries than someone who is new to the topic. For example, some users might search for "charcuterie", while others might search for "cheese board". Anticipating these differences in search behavior and writing with your readers in mind could produce positive effects on how your site performs in search results.

However, don't worry if you don't anticipate every variation of how someone might seek your content. Google's language matching systems are sophisticated and can understand how your page relates to many queries, even if you don't explicitly use the exact terms in them.

### Avoid distracting advertisements

While ads are a part of the internet and are meant to be seen by users, don't let them become overly distracting or prevent your users from reading your content. For example, advertisements, or [interstitial pages](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials) (pages displayed before or after the content you're expecting) that make it difficult to use the website.

### Link to relevant resources

Links are a great way to connect your users and search engines to other parts of your site, or relevant pages on other sites. In fact, the vast majority of the new pages Google finds every day are through links, making links a crucial resource you need to consider to help your pages be discovered by Google and potentially shown in search results. Additionally, links can also add value by connecting users (and Google) to another resource that corroborates what you're writing about.

![An illustration that shows how one web page is linking to other relevant resources](https://developers.google.com/static/search/docs/images/link-to-relevant-resources.png)

#### Write good link text

*Link text* (also known as *anchor text*) is the text part of a link that you can see. This text tells users and Google something about the page you're linking to. With [appropriate anchor text](https://developers.google.com/search/docs/crawling-indexing/links-crawlable#write-good-anchor-text), users and search engines can easily understand what your linked pages contain before they visit.

![An illustration that shows text part of a link](https://developers.google.com/static/search/docs/images/what-is-link-text.png)

#### Link when you need to

Links can provide more context on a topic, both for users and search engines, which may help demonstrate your knowledge on a topic. However when you're linking to pages outside of your control, for example content on other sites, make sure you trust the resource you're linking to. If you can't trust the content and you still want to link to them, add a [\`nofollow\` or similar annotation](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links) to the link to avoid search engines associating your site with the site you're linking to. This helps avoid potential negative consequences in your rankings in Google Search.

If you're accepting user-generated content on your site, such as forum posts or comments, make sure every link that's posted by users has a \`nofollow\` or similar annotation automatically added by your CMS. Since you're not creating the content in this case, you likely don't want your site to be blindly associated with the sites users are linking to. This can also help discourage spammers from abusing your website.

## Influence how your site looks in Google Search

A typical Google Search results page consists of a [few different visual elements](https://developers.google.com/search/docs/appearance/visual-elements-gallery) that you can influence to help users decide whether they should visit your site through those search results. In this section, we're focusing on the *title link* and the *snippet* because these are the more visually significant elements.

### Influence your title links

The *title link* is the headline part of the search result and it can help people decide which search result to click. There are a few sources that Google uses to generate this title link, including the words inside the \`<title>\` element (also called the title text) and other headings on the page. This title text can also be used for the title that's shown in browsers and bookmarks.

> [!NOTE]
> **If you use a CMS**, you might not need to do anything technical to your titles, beyond just focusing on writing good titles. Most CMSes can automatically turn the titles you write into a \`<title>\` element in the HTML.

![An illustration of how title text looks on a web page, and then how it looks in the HTML](https://developers.google.com/static/search/docs/images/titles-on-page-html.png)

You can influence the title links in Search by writing good titles: a good title is unique to the page, clear and concise, and accurately describes the contents of the page. For example, your title could include the name of your website or business, other bits of important information like the physical location of the business, and maybe some information about what the particular page has to offer for users. Our [documentation about title links](https://developers.google.com/search/docs/appearance/title-link) has more tips about how to create good titles and how to influence your site's search results' title links.

### Control your snippets

Below the title link, a search result typically has a description of the target page to help users decide whether they should click the search result. This is called a *snippet*.

The snippet is sourced from the actual content of the page the search result is linking to, thus you have complete control over the words that can be used to generate the snippet. Occasionally the snippet may be sourced from the contents of the meta description tag, which is typically a succinct, one- or two-sentence summary of the page. A good meta description is short, unique to one particular page, and includes the most relevant points of the page. Check out our tips for [writing good meta descriptions](https://developers.google.com/search/docs/appearance/snippet#meta-descriptions) for more inspiration.

## Add images to your site, and optimize them

Many people search visually, and images can be how people find your website for the first time. For example, if you have a recipe blog, people might find your content by searching for "fruit tart recipes" and browsing photos of various types of fruit tarts.

As you add images to your site, make sure that people and search engines can find and understand them.

### Add high-quality images near relevant text

When you use high quality images, you give users enough context and detail to decide which image best matches what they were looking for.

Use images that are sharp and clear, and place them near text that's relevant to the image. The text that's near images can help Google better understand what the image is about and what it means in context to your page.

For example, if the page is reviewing yarn shops in London, then it would make sense to embed one of your photos of the yarn shop in the section that details the location, description, and review information for that yarn shop. This helps Google and users associate the image with text that provides more context to what the page is about.

### Add descriptive alt text to the image

Alt text is a short, but descriptive piece of text that explains the relationship between the image and your content. It helps search engines understand what your image is about and the context of how your image relates to your page, so writing [good alt text](https://developers.google.com/search/docs/appearance/google-images#descriptive-alt-text) is quite important. You can add this to your HTML with the \`alt\` attribute of the \`img\` element, or your CMS may have an easy way to specify a description for an image when you're uploading it to your site.

## Optimize your videos

If your website includes pages that are primarily about individual videos, people may also be able to discover your site through video results in Google Search. Many of the best practices for images and text also apply to videos:

- Create high-quality video content, and embed the video on a standalone page, near text that's relevant to that video.
- Write descriptive text in the titles and description fields of a video (the title of a video is still a title, and so you can apply the best practices for writing titles here too).

If your site is particularly video-focused, then continue reading about more things you can do to [optimize your videos for search engines](https://developers.google.com/search/docs/appearance/video).

## Promote your website

Effectively promoting your new content will lead to faster discovery by those who are interested in the same subject, and also by search engines. You can do this in many ways:

- Social media promotion
- Community engagement
- Advertisement, both offline and online
- Word of mouth, and many other methods

One of the [most effective and lasting ways](https://www.nielsen.com/insights/2012/global-trust-in-advertising-and-brand-messages-2/) is word of mouth: that is, people familiar with your site tell their friends about it, who in turn visit your site. This can take time, and usually you need to invest some time and effort in other practices first, such as community engagement.

Putting effort into the offline promotion of your company or site can also be rewarding. For example, if you have a business site, make sure its URL is listed on your business cards, letterhead, posters, and other materials. With their permission, you could also send out recurring newsletters to your audience letting them know about new content on your website.

As with everything in life, you can overdo promoting your site and actually harm it: people may get fatigued of your promotions, and search engines may perceive some of the practices as [manipulation of search results](https://developers.google.com/search/docs/essentials/spam-policies).

## Things we believe you shouldn't focus on

As SEO has evolved, so have the ideas and practices (and at times, misconceptions) related to it. What was considered best practice or top priority in the past may no longer be relevant or effective due to the way search engines (and the internet) have developed over time.

To help you focus on the things that are actually important when it comes to SEO, we collected some of the most common and prominent topics we've seen circulating the internet. In general, our message on these topics is that you should do what's best for your business area.

| Focus Area | Google's Stance / Explanation |
|---|---|
| **Meta keywords** | Google Search [doesn't use the keywords meta tag](https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag). |
| **Keyword stuffing** | Excessively repeating the same words over and over (even in variations) is tiring for users, and [keyword stuffing is against Google's spam policies](https://developers.google.com/search/docs/essentials/spam-policies#keyword-stuffing). |
| **Keywords in domain or URL path** | When picking the name of your site, do what's best for your business. From a ranking perspective, keywords in the name of the domain (or URL path) alone have hardly any effect beyond appearing in breadcrumbs. The TLD (like \`.com\`, \`.org\` or \`.ch\`) only matters if you're targeting a specific country's users, and even then it's a low impact signal. |
| **Content length** | The length of the content alone doesn't matter for ranking purposes (there is no magical word count target). Writing naturally gives you more chances to show up simply because you use more keywords. |
| **Subdomains vs Subdirectories** | Do whatever makes sense for your business. Google Search is fine with either approach. |
| **PageRank** | PageRank is just one of many ranking signals Google Search uses. |
| **Duplicate content penalty** | There is no penalty for duplicate content. Google will just choose a canonical version to show. Copying others' content, however, is spam. |
| **Number and order of headings** | Semantic order is great for screen readers, but from Google Search perspective, it doesn't matter if headings are out of order. There is no ideal headings count. |
| **E-E-A-T** | E-E-A-T is not a direct ranking factor. It is a conceptual framework. |

## Next steps

- **Get started with Search Console**: Setting up a Search Console account helps you monitor and optimize how your website performs on Google Search. Learn how to [set up your account and what reports to check out first](https://developers.google.com/search/docs/monitor-debug/search-console-start).
- **Maintain your website's SEO over time**: Learn more about [managing your site's presence in the long term](https://developers.google.com/search/docs/fundamentals/get-started), including more in-depth SEO tasks and scenarios.
- **Enhance how your site looks in Google Search results**: Valid [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) on your pages also makes your pages eligible for many special features in Google Search results.

### Stay informed and ask questions

As you embark on your SEO journey, here are some resources that can help you stay on top of changes:

- [Google Search Central blog](https://developers.google.com/search/blog): Get the latest information from Google Search Central.
- [Google Search Central Help Forum](https://support.google.com/webmasters/community): Post questions about your site's SEO issues and get answers.
- [Google Search Central YouTube Channel](https://www.youtube.com/c/GoogleSearchCentral): Watch videos created for website owners.`,
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'Google Search Central',
    tags: '["SEO", "Google Search", "SEO Guide", "Web development"]',
    is_published: 1,
    published_at: '2026-05-26',
    created_at: '2026-05-26'
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
