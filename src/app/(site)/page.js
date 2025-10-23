import Hero from "@/components/Hero/Hero";
import AboutSummary from "@/components/AboutSummary/AboutSummary";
import ServicesHighlight from "@/components/ServicesHighlight/ServicesHighlight";
import DynamicServicesSection from "@/components/DynamicServicesSection/DynamicServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection/HowItWorksSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import FaqSection from "@/components/FaqSection/FaqSection";
import CtaButtonSection from "@/components/CtaButtonSection/CtaButtonSection"; // 1. Importar o novo componente

export default function Home() {
  return (
    <>
      <Hero />
      <DynamicServicesSection />
      <AboutSummary />
      <WhyChooseUs />
      <HowItWorksSection />
      <CtaButtonSection /> {/* 2. Adicionar a nova seção aqui */}
      <ProjectsSection />
      <TestimonialsSection />
            <CtaButtonSection /> {/* 2. Adicionar a nova seção aqui */}
      <FaqSection />
      <ContactSection />
    </>
  );
}