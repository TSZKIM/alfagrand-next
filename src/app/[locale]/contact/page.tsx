import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { locales, defaultLocale } from "../config";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://alfagrandpumps.com";
  const titles: Record<string, string> = {
    en: "Contact Us | ALFAGRAND — Get a Quote",
    es: "Contáctenos | ALFAGRAND — Solicitar Cotización",
    fr: "Contactez-nous | ALFAGRAND — Demander un Devis",
    ar: "اتصل بنا | ALFAGRAND — احصل على عرض أسعار",
  };
  const descriptions: Record<string, string> = {
    en: "Contact ALFAGRAND for water pump inquiries, OEM/ODM orders, pricing and technical support. Response within 24 hours.",
    es: "Contacte a ALFAGRAND para consultas de bombas, pedidos OEM/ODM y soporte técnico.",
    fr: "Contactez ALFAGRAND pour demandes de pompes, commandes OEM/ODM et support technique.",
    ar: "تواصل مع ALFAGRAND لاستفسارات المضخات وأوامر OEM/ODM والدعم الفني.",
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: Object.fromEntries(locales.map((l) => [l, `${baseUrl}/${l}/contact`])),
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");
  const isRTL = locale === "ar";

  return (
    <>
      <Navbar />
      <main className="bg-bg-card text-white min-h-screen">
        {/* Page Header */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-bg-secondary to-bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("title")}</h1>
            <p className="text-xl text-accent-cyan/80 mb-2">{t("subtitle")}</p>
            <p className="text-base text-text-tertiary max-w-2xl mx-auto">{t("description")}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-bg-secondary/60 border border-border-subtle rounded-2xl p-8">
                  <h2 className="text-2xl font-bold mb-6">{t("subtitle")}</h2>
                  <form
                    action={`https://formsubmit.co/info@grandpumps.com`}
                    method="POST"
                    className="space-y-5"
                  >
                    {/* Honeypot */}
                    <input type="text" name="_honey" className="hidden" />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_next" value={`https://alfagrandpumps.com/${locale}/contact`} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">{t("labels.name")}</label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full bg-white/5 border border-border-emphasis rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-cyan/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">{t("labels.company")}</label>
                        <input
                          type="text"
                          name="company"
                          className="w-full bg-white/5 border border-border-emphasis rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-cyan/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">{t("labels.email")}</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full bg-white/5 border border-border-emphasis rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-cyan/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-text-secondary mb-2">{t("labels.product")}</label>
                        <select
                          name="product"
                          className="w-full bg-white/5 border border-border-emphasis rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-cyan/50 transition-colors"
                        >
                          <option value="" className="bg-bg-secondary">{t("products.select")}</option>
                          <option value="peripheral" className="bg-bg-secondary">{t("products.peripheral")}</option>
                          <option value="centrifugal" className="bg-bg-secondary">{t("products.centrifugal")}</option>
                          <option value="jet" className="bg-bg-secondary">{t("products.jet")}</option>
                          <option value="submersible" className="bg-bg-secondary">{t("products.submersible")}</option>
                          <option value="sewage" className="bg-bg-secondary">{t("products.sewage")}</option>
                          <option value="vfd" className="bg-bg-secondary">{t("products.vfd")}</option>
                          <option value="multi-stage" className="bg-bg-secondary">{t("products.multistage")}</option>
                          <option value="deep-well" className="bg-bg-secondary">{t("products.deepwell")}</option>
                          <option value="solar" className="bg-bg-secondary">{t("products.solar")}</option>
                          <option value="accessories" className="bg-bg-secondary">{t("products.accessories")}</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-text-secondary mb-2">{t("labels.message")}</label>
                      <textarea
                        name="message"
                        rows={5}
                        className="w-full bg-white/5 border border-border-emphasis rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-accent-cyan/50 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3.5 bg-accent-cyan text-white font-semibold rounded-xl hover:bg-accent-cyan-dark transition-all hover:shadow-lg hover:shadow-accent-cyan/20"
                    >
                      {t("labels.send")}
                    </button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-6">
                {/* Office */}
                <div className="bg-bg-secondary/60 border border-border-subtle rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">{t("info.office")}</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan flex-shrink-0 text-sm">📍</span>
                      <div>
                        <div className="text-sm text-text-tertiary mb-1">Address</div>
                        <div className="text-sm text-text-secondary">{t("info.address")}</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan flex-shrink-0 text-sm">📞</span>
                      <div>
                        <div className="text-sm text-text-tertiary mb-1">{t("info.phone")}</div>
                        <a href="tel:+8618657933982" className="text-sm text-accent-cyan hover:underline">+86-18657933982</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan flex-shrink-0 text-sm">✉️</span>
                      <div>
                        <div className="text-sm text-text-tertiary mb-1">{t("info.email")}</div>
                        <a href="mailto:info@grandpumps.com" className="text-sm text-accent-cyan hover:underline">info@grandpumps.com</a>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* WhatsApp */}
                <div className="bg-bg-secondary/60 border border-accent-cyan/20 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                  <p className="text-sm text-text-secondary mb-4">Quick response for urgent inquiries</p>
                  <a
                    href="https://wa.me/8618657933982"
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-all text-sm"
                  >
                    💬 Chat on WhatsApp
                  </a>
                </div>

                {/* Business Hours */}
                <div className="bg-bg-secondary/60 border border-border-subtle rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between text-text-secondary">
                      <span>Monday - Friday</span>
                      <span className="text-text-secondary">9:00 - 18:00 (GMT+8)</span>
                    </li>
                    <li className="flex justify-between text-text-secondary">
                      <span>Saturday</span>
                      <span className="text-text-secondary">9:00 - 12:00</span>
                    </li>
                    <li className="flex justify-between text-text-secondary">
                      <span>Sunday</span>
                      <span className="text-text-tertiary">Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps — Same Width as Contact Section */}
        <section className="relative py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=29.299526,120.005597&hl=zh-CN&z=16&output=embed"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ALFAGRAND Office Location"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
