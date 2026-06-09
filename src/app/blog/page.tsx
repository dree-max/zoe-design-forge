import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import Hero from "@/components/Hero";

export default function BlogPage() {
  const posts = getAllPosts();

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      <section id="hero" className="relative min-h-[60vh] flex items-center justify-center" />

      <section className="section-padding bg-transparent">
        <div className="container-site">
          <div className="bg-white/90 backdrop-blur-sm text-center mb-12 p-12">
            <span className="section-label">Our Blog</span>
            <h1 className="section-title">Insights from the Studio</h1>
            <p className="section-subtitle mx-auto">
              Thoughts on architecture, design, and construction from the ZOE DESIGN FORGE team.
            </p>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 text-xs uppercase tracking-wider bg-brand-orange/10 text-brand-orange font-semibold"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-500"
              >
                <article>
                  <div className="aspect-[16/9] bg-brand-gray-bg flex items-center justify-center overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-wider text-brand-orange font-semibold">
                        {post.category}
                      </span>
                      <span className="text-xs text-brand-default/60">
                        {new Date(post.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-lg font-heading font-bold text-brand-dark mb-2 group-hover:text-brand-orange transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-brand-default leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-brand-dark/5">
                      <span className="text-xs text-brand-default/60">By {post.author}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}