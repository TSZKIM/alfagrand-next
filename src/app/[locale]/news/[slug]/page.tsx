import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { marked } from "marked";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { locales, defaultLocale } from "../../config";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const baseUrl = "https://alfagrandpumps.com";
  return {
    title: `${post.title} | ALFAGRAND News`,
    description: post.excerpt,
    alternates: {
      canonical: `${baseUrl}/${locale}/news/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `${baseUrl}/${l}/news/${slug}`])
      ),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const basePath = locale === defaultLocale ? "" : `/${locale}`;
  const htmlContent = marked(post.content);

  return (
    <>
      <Navbar />
      <main className="bg-bg-primary text-white min-h-screen pt-32 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-text-tertiary mb-6 flex items-center gap-2">
            <Link href={`${basePath}/`} className="hover:text-accent-cyan">Home</Link>
            <span>/</span>
            <Link href={`${basePath}/news`} className="hover:text-accent-cyan">News</Link>
            <span>/</span>
            <span className="text-accent-cyan/80">{post.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan">
                {post.category}
              </span>
              <span className="text-xs text-text-tertiary">{post.date}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">{post.title}</h1>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none text-text-secondary text-sm leading-relaxed
              prose-headings:text-white prose-headings:font-semibold
              prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-p:my-3 prose-li:my-1
              prose-code:bg-bg-elevated prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs
              prose-pre:bg-bg-elevated prose-pre:border prose-pre:border-border-subtle
              prose-table:border-collapse prose-th:border prose-th:border-border-default prose-th:px-3 prose-th:py-2 prose-th:bg-bg-elevated
              prose-td:border prose-td:border-border-default prose-td:px-3 prose-td:py-2
              prose-a:text-accent-cyan prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white/90"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border-subtle">
            <Link
              href={`${basePath}/news`}
              className="text-accent-cyan hover:underline text-sm"
            >
              ← Back to News
            </Link>
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </>
  );
}
