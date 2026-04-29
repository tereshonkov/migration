/** Open Graph prefers locale_territory (e.g. uk_UA) for social previews. */
export function openGraphAlternateLocale(locale: string): string {
  switch (locale) {
    case "uk":
      return "uk_UA";
    case "en":
      return "en_US";
    case "ru":
      return "ru_UA";
    default:
      return locale;
  }
}
