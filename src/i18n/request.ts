import { getRequestConfig } from "next-intl/server";
import { routing } from "../app/[locale]/config";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../public/locales/${locale}/translation.json`)).default,
  };
});
