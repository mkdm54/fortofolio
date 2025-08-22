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
      <div id="about" data-aos="fade-up">
        <HeroSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <CertificateSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <TechStackSection />
      </div>
      <div id="projects" data-aos="fade-up" data-aos-delay="600">
        <ProjectSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="800">
        <SocialMediaSection />
      </div>
      <div id="contact" data-aos="fade-up" data-aos-delay="1000">
        <ContactSection />
      </div>
      {/* <MadeWithDyad /> Dihapus */}
    </div>
  );
};

export default Index;
