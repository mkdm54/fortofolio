import HeroSection from "@/components/HeroSection";
import CertificateSection from "@/components/CertificateSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectSection from "@/components/ProjectSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar /> {/* Render Navbar di bagian atas */}
      <div id="about" data-aos="zoom-in">
        <HeroSection />
      </div>
      <div data-aos="fade-up">
        <CertificateSection />
      </div>
      <div data-aos="fade-up">
        <TechStackSection />
      </div>
      <div id="projects" data-aos="fade-up">
        <ProjectSection />
      </div>
      <div data-aos="fade-up">
        <SocialMediaSection />
      </div>
      <div id="contact" data-aos="fade-up">
        <ContactSection />
      </div>
      {/* <MadeWithDyad /> Dihapus */}
    </div>
  );
};

export default Index;
