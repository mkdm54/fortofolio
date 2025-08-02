import HeroSection from "@/components/HeroSection";
import CertificateSection from "@/components/CertificateSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectSection from "@/components/ProjectSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import ContactSection from "@/components/ContactSection";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-yellow">
      <HeroSection />
      <CertificateSection />
      <TechStackSection />
      <ProjectSection />
      <SocialMediaSection />
      <ContactSection />
      <MadeWithDyad />
    </div>
  );
};

export default Index;