import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="w-full bg-portfolio-yellow py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="bg-portfolio-teal border-4 border-portfolio-black rounded-lg p-8 md:p-12 lg:p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
          {/* Profile Image */}
          <img
            src="/placeholder.svg" // Ganti dengan URL foto profil Anda
            alt="Foto Profil"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-portfolio-black mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
          {/* Name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-portfolio-black leading-tight mb-4">
            [Nama Anda Di Sini]
          </h1>
          {/* About Me Description */}
          <p className="text-lg md:text-xl text-portfolio-black max-w-3xl mb-8">
            Halo! Saya adalah seorang pengembang web yang bersemangat dengan fokus pada pembuatan pengalaman digital yang menarik dan fungsional. Saya memiliki keahlian dalam pengembangan frontend dan backend, serta desain UI/UX. Saya selalu mencari tantangan baru dan kesempatan untuk belajar dan berkembang.
          </p>
          {/* Call to Action Button */}
          <Button
            className="bg-white text-portfolio-black border-4 border-portfolio-black rounded-full px-8 py-6 text-lg font-bold hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            onClick={() => console.log("Download CV clicked")}
          >
            Download CV
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;