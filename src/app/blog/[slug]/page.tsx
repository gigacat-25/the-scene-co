import { getBlogPostBySlug } from "@/lib/db";
import { notFound } from "next/navigation";
import { formatDate } from "date-fns";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JsonLd, blogPostSchema, faqSchema } from "@/components/json-ld";
import type { Metadata } from "next";

export const runtime = "edge";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  
  const url = `https://thescene.co.in/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url: url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at || post.created_at,
      authors: [post.author || "The Scene Co."],
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = blogPostSchema({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${slug}`,
    imageUrl: post.cover_image_url || undefined,
    datePublished: post.published_at || post.created_at,
    authorName: post.author,
  });

  // Inject hardcoded FAQs specifically for the custom websites post
  let postFaqsJsonLd = null;
  if (slug === "why-custom-websites-beat-templates") {
    postFaqsJsonLd = faqSchema([
      {
        question: "Why is custom website development better than template builders like Wix or WordPress?",
        answer: "Custom website development gives you complete code ownership, significantly faster load times, and better SEO capabilities. Templates often load heavy third-party assets that slow down your mobile page speeds and restrict custom integrations."
      },
      {
        question: "How much does a custom website cost in Bangalore, India?",
        answer: "At The Scene Co., our custom-built, template-free websites start at transparent packages from ₹15,000 for standard sites, scaling to tailored systems for POS integration and enterprise setups."
      }
    ]);
  }

  let tags: string[] = [];
  try { tags = JSON.parse(post.tags || "[]"); } catch {}

  return (
    <div className="container mx-auto px-4 py-24 sm:py-32 max-w-4xl">
      <JsonLd data={articleJsonLd} />
      {postFaqsJsonLd && <JsonLd data={postFaqsJsonLd} />}

      <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Blog
      </Link>

      <article>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <time dateTime={post.published_at || post.created_at}>
            {formatDate(new Date(post.published_at || post.created_at), "MMMM d, yyyy")}
          </time>
          <span>·</span>
          <span>{post.author}</span>
        </div>

        <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>

        {post.cover_image_url && (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
            <img src={post.cover_image_url} alt={post.title} className="object-cover w-full h-full" />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none">
          {post.content.split("\n").map((paragraph: string, i: number) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("- ")) {
              return <li key={i} className="text-muted-foreground ml-4">{paragraph.replace("- ", "")}</li>;
            }
            if (paragraph.match(/^\d+\.\s/)) {
              return <li key={i} className="text-muted-foreground ml-4">{paragraph}</li>;
            }
            if (paragraph.trim()) {
              return <p key={i} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
            }
            return null;
          })}
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/10">
            {tags.map((tag) => (
              <span key={tag} className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
