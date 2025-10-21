import Hero from "@/components/Hero/Hero";
import AboutSummary from "@/components/AboutSummary/AboutSummary";
import ServicesHighlight from "@/components/ServicesHighlight/ServicesHighlight";
import DynamicServicesSection from "@/components/DynamicServicesSection/DynamicServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection/HowItWorksSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import FaqSection from "@/components/FaqSection/FaqSection"; // 1. Importar o novo componente

export default function Home() {
  return (
    <>
      <Hero />
      <DynamicServicesSection />
      <AboutSummary />
      <WhyChooseUs />
      <HowItWorksSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FaqSection /> {/* 2. Adicionar a nova seção aqui */}
      <ContactSection />
    </>
  );
}