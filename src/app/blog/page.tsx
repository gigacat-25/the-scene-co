import { getPublishedBlogPosts } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "date-fns";
import type { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Blog — The Scene Co.",
  description: "Insights on web development, POS systems, e-commerce, and building digital products.",
};

export default async function BlogPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
          Blog
        </h1>
        <p className="text-muted-foreground text-lg">
          Insights on web development, POS systems, e-commerce, and building digital products.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts.map((post) => {
            let tags: string[] = [];
            try { tags = JSON.parse(post.tags || "[]"); } catch {}

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-secondary/20 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                {post.cover_image_url && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <time dateTime={post.published_at || post.created_at}>
                      {formatDate(new Date(post.published_at || post.created_at), "MMM d, yyyy")}
                    </time>
                    <span>·</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="font-headline text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
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
  );
}
