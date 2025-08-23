import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-portfolio-teal py-8 border-t-4 border-portfolio-black shadow-[0_-4px_0px_0px_rgba(0,0,0,1)]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-always-black">
        <p className="text-lg font-semibold mb-4 md:mb-0">
          &copy; {currentYear} Makdum Ibrohim. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a
            href="https://github.com/mkdm54"
            target="_blank"
            rel="noopener noreferrer"
            className="text-always-black hover:text-portfolio-pink transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-7 h-7" />
          </a>
          <a
            href="https://www.linkedin.com/in/makdum-ibrohim-1097532a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-always-black hover:text-portfolio-pink transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-7 h-7" />
          </a>
          <a
            href="https://www.instagram.com/mkdmibrhm_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-always-black hover:text-portfolio-pink transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-7 h-7" />
          </a>
          <a
            href="mailto:makdumibrohim54@gmail.com"
            className="text-always-black hover:text-portfolio-pink transition-colors"
            aria-label="Email"
          >
            <Mail className="w-7 h-7" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;