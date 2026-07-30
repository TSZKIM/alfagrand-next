import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { locales, defaultLocale } from "../config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://alfagrandpumps.com";
  const titles: Record<string, string> = {
    en: "About Us | ALFAGRAND — Professional Water Pump Manufacturer",
    es: "Sobre Nosotros | ALFAGRAND — Fabricante Profesional de Bombas",
    fr: "À Propos | ALFAGRAND — Fabricant Professionnel de Pompes",
    ar: "من نحن | ALFAGRAND — مصنع متخصص للمضخات",
  };
  const descriptions: Record<string, string> = {
    en: "Learn about ALFAGRAND — 8+ years of expertise, 50+ countries served, ISO 9001 certified. Your trusted water pump manufacturer based in Yiwu, China.",
    es: "Conozca ALFAGRAND — más de 8 años de experiencia, 50+ países atendidos, certificado ISO 9001.",
    fr: "Découvrez ALFAGRAND — plus de 8 ans d'expertise, 50+ pays desservis, certifié ISO 9001.",
    ar: "تعرف على ALFAGRAND — أكثر من 8 سنوات من الخبرة، 50+ دولة، حاصل على شهادة ISO 9001.",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/about`])),
    },
  };
}

const milestones = [
  { year: "2017", title: "Founded", desc: "ALFAGRAND established in Yiwu, Zhejiang" },
  { year: "2018", title: "First 10 Countries", desc: "Expanded to Middle East & Southeast Asia" },
  { year: "2020", title: "ISO 9001 Certified", desc: "Quality management system certified" },
  { year: "2022", title: "30+ Countries", desc: "Rapid growth in Africa & Latin America" },
  { year: "2024", title: "50+ Countries", desc: "Global presence with 500-700 TEU annually" },
  { year: "2026", title: "Innovation", desc: "New VFD pump series & smart controllers" },
];

const certifications = [
  { name: "ISO 9001:2015", desc: "Quality Management System" },
  { name: "CE", desc: "European Conformity" },
  { name: "RoHS", desc: "Restriction of Hazardous Substances" },
  { name: "SGS", desc: "Third-party Inspection" },
];

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const basePath = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <>
      <Navbar />
      <main className="bg-bg-card text-white min-h-screen">
        {/* Page Header */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-bg-secondary to-bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-accent-cyan/80 mb-2">{t("subtitle")}</p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-text-secondary leading-relaxed mb-6">{t("paragraph1")}</p>
                <p className="text-text-secondary leading-relaxed">{t("paragraph2")}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: t("facility"), label: "Production" },
                  { value: t("iso"), label: "Quality" },
                  { value: t("countries"), label: "Reach" },
                  { value: t("oem"), label: "Service" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-bg-secondary/60 border border-border-subtle rounded-2xl p-6 text-center"
                  >
                    <div className="text-accent-cyan text-xl font-bold mb-1">{item.value}</div>
                    <div className="text-sm text-text-tertiary">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 border-t border-border-subtle">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-accent-cyan/20 hidden md:block" />

              <div className="space-y-8">
                {milestones.map((ms, i) => (
                  <div
                    key={ms.year}
                    className={`flex flex-col md:flex-row items-center gap-6 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      <div className="bg-bg-secondary/60 border border-border-subtle rounded-2xl p-6 inline-block max-w-md">
                        <div className="text-accent-cyan font-bold text-lg mb-1">{ms.year}</div>
                        <div className="text-white font-semibold mb-1">{ms.title}</div>
                        <div className="text-sm text-text-secondary">{ms.desc}</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-accent-cyan border-4 border-[#0D1B2A] z-10 hidden md:block" />
                    <div className="flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 border-t border-border-subtle">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Certifications</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-bg-secondary/60 border border-accent-cyan/20 rounded-2xl p-6 text-center hover:border-accent-cyan/40 transition-all"
                >
                  <div className="text-2xl font-bold text-accent-cyan mb-2">{cert.name}</div>
                  <div className="text-sm text-text-secondary">{cert.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Want to partner with us?</h2>
            <p className="text-text-secondary mb-8">
              OEM/ODM orders are always welcome. Let&apos;s build something great together.
            </p>
            <Link
              href={`${basePath}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent-cyan text-white font-semibold rounded-xl hover:bg-accent-cyan-dark transition-all hover:shadow-lg hover:shadow-accent-cyan/20"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
