import HeroSection from "@/components/HeroSection";
import CertificateSection from "@/components/CertificateSection";
import TechStackSection from "@/components/TechStackSection";
import ProjectSection from "@/components/ProjectSection";
import SocialMediaSection from "@/components/SocialMediaSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RobloxProfileCard from "@/components/RobloxProfileCard"; // Import the new component

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow">
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
        {/* New Roblox Profile Section */}
        <section className="w-full bg-background py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
              My Roblox Profile
            </h2>
            <div className="flex justify-center">
              <RobloxProfileCard userId={7466077465} />
            </div>
          </div>
        </section>
        {/* End New Roblox Profile Section */}
        <div id="contact" data-aos="fade-up">
          <ContactSection />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
