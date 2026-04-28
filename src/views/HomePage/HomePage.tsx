import Hero from "@/widgets/hero/Hero";
import Rewies from "@/widgets/reviews/Reviews";
import Logo from "@/widgets/logo/Logo";
import Furniture from "@/widgets/furniture/ui/Furniture";
import Faq from "@/widgets/fiq/Faq";
import Form from "@/widgets/finalCta/Form";
import Footer from "@/widgets/footer/Footer";
import PopapClientWrapper from "@/widgets/scroll-popup/PopapClientWrapper";
import WhyYou from "@/widgets/why-you/WhyYou";
import TrustMe from "@/widgets/trust-me/TrustMe";
import CtaBlock from "@/widgets/cta/CtaBlock";
import ContactForm from "@/widgets/contact-form/ContactForm";
import AnimatedSection from "@/shared/ui/AnimatedSection/AnimatedSection";

export default function HomePage() {
  return (
    <div className="container">
      <Hero startIndex={0} home={true} />
      <main>
        <PopapClientWrapper />
        <AnimatedSection>
          <WhyYou />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <TrustMe />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Furniture home={true} />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <CtaBlock />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Logo />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Rewies />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <ContactForm />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Faq />
        </AnimatedSection>
        <AnimatedSection delay={100}>
          <Form />
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
}
