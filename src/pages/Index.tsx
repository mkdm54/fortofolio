import HeroSection from "@/components/HeroSection";
import CertificateSection from "@/components/CertificateSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectSection from "@/components/ProjectSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import SongCard from "@/components/SongCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div id="about" data-aos="zoom-in">
        <HeroSection />
      </div>
      <div className="py-8">
        <SongCard
          albumArtSrc="/diary_depresiku_album_art.jpg" // Mengganti dengan path ke gambar cover album yang baru
          title="Diary Depresiku"
          duration="04:00" // Initial duration, will be updated by audio metadata
          audioSrc="/Last Child - Diary Depresiku.mp3"
        />
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
    </div>
  );
};

export default Index;
