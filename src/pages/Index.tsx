import HeroSection from "@/components/HeroSection";
import CertificateSection from "@/components/CertificateSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectSection from "@/components/ProjectSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
// import SongCard from "@/components/SongCard"; // Dihapus karena sudah dipindahkan

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div id="about" data-aos="zoom-in">
        <HeroSection />
      </div>
      {/* SongCard dipindahkan ke dalam HeroSection */}
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
    </div>
  );
};

export default Index;
