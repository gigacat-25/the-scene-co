import { getPublishedBlogPosts } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "date-fns";
import { MarqueeStrip } from "@/components/marquee-strip";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Blog — The Scene Co.",
  description: "Insights on web development, POS systems, e-commerce, and building digital products.",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="flex flex-col bg-canvas">

      {/* Hero — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 pt-20 pb-16 max-w-6xl">
        <span className="eyebrow-mono text-ink/60 block mb-4">Blog</span>
        <h1
          className="text-ink mb-6"
          style={{ fontSize: "clamp(36px, 5vw, 86px)", fontWeight: 340, lineHeight: 1.0, letterSpacing: "-1.72px" }}
        >
          Insights &amp;
          <br />
          <span style={{ fontWeight: 700 }}>how we build.</span>
        </h1>
        <p className="body-lg-figma text-ink/70 max-w-2xl">
          Web development, POS systems, e-commerce, and building digital products — from the team.
        </p>
      </div>

      <MarqueeStrip />

      {/* Blog posts — white canvas */}
      <div className="container mx-auto px-4 sm:px-6 py-20 max-w-6xl">
        {posts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="body-figma text-ink/50 mb-6">No posts yet. Check back soon!</p>
            <Link href="/contact" className="btn-primary-figma">
              Get in Touch
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
              let tags: string[] = [];
              try { tags = JSON.parse(post.tags || "[]"); } catch {}

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-canvas border border-hairline rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  {post.cover_image_url && (
                    <div className="relative h-48 w-full overflow-hidden bg-surface-soft">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="caption-mono text-ink/40 mb-3 flex items-center gap-2">
                      <time dateTime={post.published_at || post.created_at}>
                        {formatDate(new Date(post.published_at || post.created_at), "MMM d, yyyy")}
                      </time>
                      <span>·</span>
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-ink font-bold mb-2 group-hover:underline" style={{ fontSize: 20, fontWeight: 540, lineHeight: 1.35 }}>
                      {post.title}
                    </h2>
                    <p className="body-sm-figma text-ink/65 line-clamp-3 mb-4">{post.excerpt}</p>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="caption-mono text-ink/60 bg-surface-soft px-3 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
