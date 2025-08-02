import React from "react";
import { Github, Linkedin, Instagram, Reddit } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: Github, url: "#" },
  { name: "LinkedIn", icon: Linkedin, url: "#" },
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "Reddit", icon: Reddit, url: "#" },
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
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center space-y-2 p-4 bg-portfolio-teal text-white rounded-lg border-4 border-portfolio-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-portfolio-teal/80 transition-colors"
            >
              <link.icon className="w-10 h-10" />
              <span className="text-lg font-semibold">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;