import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import uk from "../messages/uk.json";
import ru from "../messages/ru.json";
import en from "../messages/en.json";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  let requested = await requestLocale;

  // For routes without [locale] segment, use default locale
  if (!requested) {
    requested = routing.defaultLocale;
  }

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
  const messagesMap = {
    uk,
    ru,
    en,
  };
  return {
    locale,
    // messages: (await import(`../../messages/${locale}.json`)).default
    messages: messagesMap[locale as keyof typeof messagesMap],
  };
});
