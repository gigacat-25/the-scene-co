import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all bots to crawl public pages
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/_next/",
          "/studio/",
        ],
      },
      {
        // Prevent AI training crawlers from scraping content
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "anthropic-ai",
          "Claude-Web",
          "cohere-ai",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://thescene.co.in/sitemap.xml",
    host: "https://thescene.co.in",
  };
}
