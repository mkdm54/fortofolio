import React from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-full bg-portfolio-teal p-4 border-b-4 border-portfolio-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-portfolio-black text-2xl font-extrabold">
          My Portfolio
        </a>
        <div className="space-x-4">
          <Button asChild variant="ghost" className="text-portfolio-black text-lg font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black">
            <a href="#about">About</a>
          </Button>
          <Button asChild variant="ghost" className="text-portfolio-black text-lg font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black">
            <a href="#projects">Projects</a>
          </Button>
          <Button asChild variant="ghost" className="text-portfolio-black text-lg font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black">
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;