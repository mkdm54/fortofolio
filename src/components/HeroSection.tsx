import React from "react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="w-full bg-background py-16 md:py-20 lg:py-24">
      {" "}
      {/* Diubah dari bg-white */}
      <div className="container mx-auto px-4">
        <div className="relative bg-portfolio-teal border-4 border-portfolio-black rounded-none p-8 md:p-12 lg:p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center text-center">
          {/* Top Left Pink Circles */}
          <div className="absolute top-4 left-4 hidden md:flex space-x-1">
            <div className="w-4 h-4 bg-portfolio-pink rounded-full border-2 border-portfolio-black"></div>
            <div className="w-4 h-4 bg-portfolio-pink rounded-full border-2 border-portfolio-black"></div>
            <div className="w-4 h-4 bg-portfolio-pink rounded-full border-2 border-portfolio-black"></div>
          </div>

          {/* Dotted pattern on left */}
          <div className="absolute top-1/4 left-8 hidden md:block">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-portfolio-black rounded-full"
                ></div>
              ))}
            </div>
          </div>

          {/* Profile Image */}
          <img
            src="/profile.jpg" // Mengganti dengan URL foto profil Anda
            alt="Foto Profil Makdum Ibrohim"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-portfolio-black mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
          {/* Name */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-always-black leading-tight mb-4">
            Makdum Ibrohim
          </h1>
          {/* About Me Description */}
          <p className="text-lg md:text-xl text-always-black max-w-3xl mb-8">
            Halo! Saya adalah seorang pengembang web yang bersemangat dengan
            fokus pada pembuatan pengalaman digital yang menarik dan fungsional.
            Saya memiliki keahlian dalam pengembangan frontend dan backend,
            serta desain UI/UX. Saya selalu mencari tantangan baru dan
            kesempatan untuk belajar dan berkembang.
          </p>
          {/* Call to Action Button */}
          {/* Tombol Download CV dihapus */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
