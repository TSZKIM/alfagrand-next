import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { locales, defaultLocale } from "../config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://alfagrandpumps.com";
  const titles: Record<string, string> = {
    en: "News & Knowledge Center | ALFAGRAND",
    es: "Centro de Noticias y Conocimiento | ALFAGRAND",
    fr: "Centre de Nouvelles et Connaissances | ALFAGRAND",
    ar: "مركز الأخبار والمعرفة | ALFAGRAND",
  };
  const descriptions: Record<string, string> = {
    en: "Stay updated with ALFAGRAND latest news, pump knowledge articles and expert Q&A. Learn about pump selection, maintenance and industry trends.",
    es: "Manténgase actualizado con las últimas noticias de ALFAGRAND, artículos de conocimiento y preguntas y respuestas de expertos.",
    fr: "Restez informé avec les dernières nouvelles ALFAGRAND, articles de connaissance et questions-réponses d'experts.",
    ar: "ابق على اطلاع بأحدث أخبار ومقالات المعرفة والأسئلة والأجوبة من خبراء ALFAGRAND.",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/news`,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/news`])),
    },
  };
}

const categoryColors: Record<string, string> = {
  "Product Launch": "bg-accent-cyan/20 text-accent-cyan",
  "Event": "bg-blue-500/20 text-blue-400",
  "Company News": "bg-purple-500/20 text-purple-400",
  "Pump Knowledge": "bg-amber-500/20 text-amber-400",
  "Q&A": "bg-cyan-500/20 text-cyan-400",
};

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("news");
  const basePath = locale === defaultLocale ? "" : `/${locale}`;

  const posts = getAllPosts();
  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  return (
    <>
      <Navbar />
      <main className="bg-bg-card text-white min-h-screen">
        {/* Page Header */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-bg-secondary to-bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-accent-cyan/80">{t("subtitle")}</p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 border-b border-border-subtle">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-2 text-sm rounded-full border border-border-emphasis text-text-secondary hover:border-accent-cyan/30 hover:text-accent-cyan transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-bg-secondary/60 border border-border-subtle rounded-2xl overflow-hidden hover:border-accent-cyan/30 transition-all"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#1a3a2a] to-bg-card flex items-center justify-center">
                    <span className="text-4xl opacity-20">📰</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-bg-elevated/20 text-text-tertiary"}`}>
                        {post.category}
                      </span>
                      <span className="text-xs text-text-tertiary">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-cyan transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-3 mb-4">{post.excerpt}</p>
                    <Link
                      href={`${basePath}/news/${post.slug}`}
                      className="text-sm text-accent-cyan hover:underline"
                    >
                      {t("readMore")} →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Q&A CTA */}
        <section className="py-16 border-t border-border-subtle">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">{t("qa.submitTitle")}</h2>
            <p className="text-text-secondary mb-8">{t("qa.submitDesc")}</p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent-cyan text-white font-semibold rounded-xl hover:bg-accent-cyan-dark transition-all hover:shadow-lg hover:shadow-accent-cyan/20"
            >
              {t("qa.submitBtn")}
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
