import Hero from "@/components/Hero/Hero";
import AboutSummary from "@/components/AboutSummary/AboutSummary";
import ServicesHighlight from "@/components/ServicesHighlight/ServicesHighlight";
import DynamicServicesSection from "@/components/DynamicServicesSection/DynamicServicesSection";
import HowItWorksSection from "@/components/HowItWorksSection/HowItWorksSection"; // 1. Importar
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection"; // 1. Importar o novo componente

export default function Home() {
  return (
    <>
      <Hero />
      <DynamicServicesSection />
      <AboutSummary />
      <HowItWorksSection /> {/* 2. Adicionar aqui */}
      <ProjectsSection />
            <TestimonialsSection /> {/* 2. Adicionar a nova seção aqui */}

      <ContactSection />
    </>
  );
}