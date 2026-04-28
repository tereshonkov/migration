import Form from "@/widgets/finalCta/Form";
import Footer from "@/widgets/footer/Footer";
import About from "@/widgets/about/About";
import Reviews from "@/widgets/reviews/Reviews";
import PageHeader from "@/widgets/page-title-section/PageHeader";
import Header from "@/widgets/header/Header";

type AboutPageProps = {
  title: string;
  subtitle: string;
  showHeader?: boolean;
};

export default function AboutPage({
  title,
  subtitle,
  showHeader = false,
}: AboutPageProps) {
  const content = (
    <div className="container">
      <PageHeader title={title} subtitle={subtitle} />
      <main className="main-service">
        <About />
        <Reviews />
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
