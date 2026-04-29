/** Absolute URL for a path under the site (matches canonical / next-intl as-needed). */
export function siteAbsolutePath(locale: string, pathname: string): string {
  const base =
    locale === "uk"
      ? "https://t-mebel.com.ua"
      : `https://t-mebel.com.ua/${locale}`;
  if (!pathname || pathname === "/") {
    return base;
  }
  const slug = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${slug}`;
}

export function buildBreadcrumbListJsonLd(
  locale: string,
  items: { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: siteAbsolutePath(locale, item.path),
    })),
  };
}
