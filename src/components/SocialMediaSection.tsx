import React from "react";
import { Github, Linkedin } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/mkdm54",
    bgColor: "bg-github-black", // Menggunakan warna kustom dari tailwind.config.ts
    textColor: "text-white", // Teks putih untuk latar belakang gelap
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/makdum-ibrohim-1097532a1/",
    bgColor: "bg-linkedin-blue", // Menggunakan warna kustom dari tailwind.config.ts
    textColor: "text-white", // Teks putih untuk latar belakang gelap
  },
  {
    name: "Instagram",
    svgPath: "/instagram-167.svg",
    url: "https://www.instagram.com/mkdmibrhm_",
    bgColor: "bg-instagram-purple", // Menggunakan warna kustom dari tailwind.config.ts
    textColor: "text-white", // Teks putih untuk latar belakang gelap
  },
  {
    name: "Reddit",
    svgPath: "/reddit.svg",
    url: "https://www.reddit.com/user/Difficult_Lie_8919/",
    bgColor: "bg-reddit-orange", // Menggunakan warna kustom dari tailwind.config.ts
    textColor: "text-white", // Teks putih untuk latar belakang gelap
  },
  {
    name: "WhatsApp",
    svgPath: "/whatsapp.svg",
    url: "https://wa.me/+6285932576797",
    bgColor: "bg-whatsapp-green", // Menggunakan warna kustom dari tailwind.config.ts
    textColor: "text-white", // Teks putih untuk latar belakang gelap
  },
];

const SocialMediaSection = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          Connect With Me
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <div key={link.name} className="relative w-36 h-36">
              {" "}
              {/* Container untuk efek 3D */}
              {/* Elemen "bayangan" - ini adalah lapisan belakang putih dengan border hitam */}
              <div className="absolute top-2 left-2 w-full h-full bg-white rounded-lg border-4 border-portfolio-black"></div>
              {/* Kartu media sosial yang sebenarnya - ini akan bergerak saat di-hover */}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-2 p-4 ${link.bgColor} ${link.textColor} rounded-lg border-4 border-portfolio-black transition-transform duration-100 ease-out transform hover:translate-x-2 hover:translate-y-2`}
              >
                {link.icon ? (
                  <link.icon className="w-10 h-10" /> // Ikon Lucide akan mewarisi warna teks
                ) : (
                  <img
                    src={link.svgPath}
                    alt={link.name}
                    className="w-10 h-10"
                  />
                )}
                <span className="text-lg font-semibold">{link.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
