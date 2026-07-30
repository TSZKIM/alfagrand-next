import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { locales } from "../config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://alfagrandpumps.com";
  return {
    title: locale === "en" ? "Terms of Service | ALFAGRAND" : "Terms of Service | ALFAGRAND",
    description: "ALFAGRAND Terms of Service — terms and conditions governing the use of our website and services.",
    alternates: {
      canonical: `${baseUrl}/${locale}/terms`,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/terms`])),
    },
    robots: { index: true, follow: true },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("terms");

  return (
    <>
      <Navbar />
      <main className="bg-bg-primary text-white min-h-screen pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t("title")}</h1>
          <p className="text-text-tertiary text-sm mb-10">{t("lastUpdated")}</p>

          <div className="prose prose-invert max-w-none space-y-8 text-text-secondary text-sm leading-relaxed">
            <section>
              <h2 className="text-white text-lg font-semibold mb-3">{t("s1.title")}</h2>
              <p>{t("s1.content")}</p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">{t("s2.title")}</h2>
              <p>{t("s2.content")}</p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">{t("s3.title")}</h2>
              <p>{t("s3.content")}</p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">{t("s4.title")}</h2>
              <p>{t("s4.content")}</p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">{t("s5.title")}</h2>
              <p>{t("s5.content")}</p>
            </section>

            <section>
              <h2 className="text-white text-lg font-semibold mb-3">{t("s6.title")}</h2>
              <p>{t("s6.content")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
