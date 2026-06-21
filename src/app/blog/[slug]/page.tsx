import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.post.title} | ZOE DESIGN FORGE. Blog`,
    description: post.post.excerpt,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { post: meta, content } = post;

  // Convert markdown content to simple HTML (headings, paragraphs, lists)
  const htmlContent = content
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-heading font-bold text-brand-dark mt-8 mb-4">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-heading font-bold text-brand-dark mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-heading font-bold text-brand-dark mt-10 mb-4">$1</h1>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-6 list-decimal text-brand-default mb-2">$1. $2</li>')
    .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-brand-default mb-2">$1</li>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-brand-dark">$1</strong>')
    .replace(/^(.+)$/gm, (match: string) => {
      if (match.startsWith("<")) return match;
      if (match.trim() === "") return '<div class="h-4"></div>';
      return `<p class="text-brand-default leading-relaxed mb-4">${match}</p>`;
    });

  return (
    <article className="min-h-screen">
      {/* Spacer for fixed header */}
      <div className="h-24" />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-brand-default hover:text-brand-orange transition-colors mb-8"
        >
          <i className="bi bi-arrow-left"></i> Back to Blog
        </Link>

        <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">
                {meta.category}
              </span>
              <span className="text-xs text-brand-default/60">
                {formatDate(meta.date, "long")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-4">
              {meta.title}
            </h1>
            <p className="text-brand-default/70">By {meta.author}</p>

            {/* Tags */}
            {meta.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {meta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-brand-dark/5 text-brand-default px-3 py-1"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-brand-dark/10 mb-8" />

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        {/* Back link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="btn-outline"
          >
            More Articles
          </Link>
        </div>
      </div>
    </article>
  );
}