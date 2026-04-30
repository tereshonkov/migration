import PageHeader from "@/widgets/page-title-section/PageHeader";
import Furniture from "@/widgets/furniture/ui/Furniture";
import CtaBlock from "@/widgets/cta/CtaBlock";
import TrustMe from "@/widgets/trust-me/TrustMe";
import Form from "@/widgets/finalCta/Form";
import Footer from "@/widgets/footer/Footer";
import Header from "@/widgets/header/Header";

type ServicePageProps = {
  title: string;
  subtitle: string;
  showHeader?: boolean;
};

export default function ServicePage({
  title,
  subtitle,
  showHeader = true,
}: ServicePageProps) {
  const content = (
    <div className="container">
      <PageHeader title={title} subtitle={subtitle} />
      <main className="main-service">
        <Furniture />
        <TrustMe />
        <CtaBlock />
        <Form />
      </main>
      <Footer />
    </div>
  );

  if (showHeader) {
    return (
      <>
        <Header />
        {content}
      </>
    );
  }

  return content;
}
