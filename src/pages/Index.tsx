import HeroSection from "@/components/HeroSection";
import CertificateSection from "@/components/CertificateSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectSection from "@/components/ProjectSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-portfolio-yellow">
      <Navbar /> {/* Render Navbar di bagian atas */}
      <div id="about">
        <HeroSection />
      </div>
      <CertificateSection />
      <TechStackSection />
      <div id="projects">
        <ProjectSection />
      </div>
      <SocialMediaSection />
      <div id="contact">
        <ContactSection />
      </div>
      {/* <MadeWithDyad /> Dihapus */}
    </div>
  );
};

export default Index;