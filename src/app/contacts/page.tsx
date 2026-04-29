import Footer from "@/widgets/footer/Footer";
import { Metadata } from "next";
import messages from "@/messages/uk.json";
import { buildBreadcrumbListJsonLd } from "@/shared/lib/breadcrumbJsonLd";
import { openGraphAlternateLocale } from "@/shared/lib/openGraphLocale";
import { JsonLd } from "@/shared/ui/JsonLd/JsonLd";
import ContactsPage from "@/views/ContactsPage/ContactsPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = (key: string) =>
    messages.seoContact[key as keyof typeof messages.seoContact];
  const locale = "uk"; // Default locale for non-localized routes

  const baseUrl = "https://t-mebel.com.ua";
  const path = "/contacts";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: baseUrl + path,
      siteName: "T-Mebel",
      locale: openGraphAlternateLocale(locale),
      images: [
        { url: "/og-image.jpg", width: 1200, height: 630, alt: "T-Mebel" },
      ],
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        uk: `${baseUrl}${path}`,
        en: `${baseUrl}/en${path}`,
        ru: `${baseUrl}/ru${path}`,
        "x-default": `${baseUrl}${path}`,
      },
    },
  };
}

const breadcrumbJsonLd = buildBreadcrumbListJsonLd("uk", [
  { name: messages.header.home, path: "" },
  { name: messages.contactPage.contactTitle, path: "/contacts" },
]);

export default async function page() {
  return (
    <div className="container">
      <JsonLd data={breadcrumbJsonLd} />
      <main className="main-service">
        <ContactsPage subtitle="Зв'яжіться з нами будь-яким зручним способом. Ми завжди раді вам допомогти!" />
      </main>
      <Footer />
    </div>
  );
}
