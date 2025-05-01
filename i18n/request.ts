import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const heroMessages = (await import(`@/dictionaries/hero/${locale}.json`))
    .default;
  const featureMessages = (
    await import(`@/dictionaries/feature-section/${locale}.json`)
  ).default;

  return {
    locale,
    messages: {
      ...heroMessages,
      ...featureMessages,
    },
  };
});
