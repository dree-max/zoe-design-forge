import Link from "next/link";
import { getPostBySlug, getPostSlugs, getImageUrl } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  if (!result) return { title: "Post Not Found" };
  return {
    title: `${result.post.title} | ZOE DESIGN FORGE. Blog`,
    description: result.post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  if (!result) notFound();

  const { post } = result;

  return (
    <article className="min-h-screen">
      <div className="h-24" />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-brand-default hover:text-brand-orange transition-colors mb-8"
        >
          <i className="bi bi-arrow-left"></i> Back to Blog
        </Link>

        <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12">
          {post.image && (
            <div className="aspect-[16/9] mb-8 overflow-hidden">
              <img
                src={getImageUrl(post.image)}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">
                {post.category}
              </span>
              <span className="text-xs text-brand-default/60">
                {formatDate(post.date, "long")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark mb-4">
              {post.title}
            </h1>
            <p className="text-brand-default/70">By {post.author}</p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
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

          <div className="h-px bg-brand-dark/10 mb-8" />

          <div className="prose prose-lg max-w-none">
            {post.body ? (
              <PortableText value={post.body} />
            ) : (
              <p className="text-brand-default/60">No content available.</p>
            )}
          </div>
        </div>

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
