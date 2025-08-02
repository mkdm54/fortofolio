import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MousePointer2 } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative w-full bg-portfolio-yellow py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative bg-portfolio-teal border-4 border-portfolio-black rounded-lg p-8 md:p-12 lg:p-16 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Top Left Cloud */}
          <div className="absolute top-4 left-4 flex space-x-1">
            <div className="w-4 h-4 bg-portfolio-pink rounded-full border-2 border-portfolio-black"></div>
            <div className="w-4 h-4 bg-portfolio-pink rounded-full border-2 border-portfolio-black"></div>
            <div className="w-4 h-4 bg-portfolio-pink rounded-full border-2 border-portfolio-black"></div>
          </div>

          {/* Dotted pattern on left */}
          <div className="absolute top-1/4 left-8 hidden md:block">
            <div className="grid grid-cols-3 gap-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-portfolio-black rounded-full"></div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-portfolio-black leading-tight mb-6">
              Emerging Web Design Trends
            </h1>
            <Button
              className="bg-white text-portfolio-black border-4 border-portfolio-black rounded-full px-8 py-6 text-lg font-bold hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              onClick={() => console.log("Explore clicked")}
            >
              EXPLORE
            </Button>
          </div>

          {/* Right Side Elements */}
          <div className="relative flex-shrink-0 w-full lg:w-auto flex flex-col items-center lg:items-end space-y-6 z-10">
            {/* Search Bar */}
            <div className="relative w-full max-w-md bg-white border-4 border-portfolio-black rounded-full flex items-center p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Input
                type="text"
                placeholder="Search..."
                className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-lg px-4 py-2 bg-transparent"
              />
              <Button className="bg-portfolio-teal text-white rounded-full p-3 border-2 border-portfolio-black hover:bg-portfolio-teal/80">
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Small Password Window */}
            <div className="relative bg-white border-4 border-portfolio-black rounded-lg p-4 w-48 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="absolute top-2 left-2 flex space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-center mt-4 text-4xl font-bold tracking-widest">
                ***
              </div>
            </div>

            {/* Abstract Shapes and Cursor - Hidden on small screens */}
            <div className="absolute hidden sm:block -bottom-10 -right-10 lg:bottom-auto lg:right-auto lg:top-1/2 lg:-translate-y-1/2 lg:mr-16">
              <div className="w-24 h-24 border-4 border-portfolio-black rotate-45 bg-portfolio-pink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
            </div>
            <div className="absolute hidden sm:block -top-10 right-10 lg:top-auto lg:right-auto lg:bottom-1/4 lg:ml-16">
              <div className="w-16 h-16 border-4 border-portfolio-black bg-portfolio-pink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
            </div>
            {/* Cursor/Triangle shape */}
            <div className="absolute hidden sm:block bottom-10 right-20 lg:bottom-auto lg:right-auto lg:top-3/4 lg:mr-24">
              <MousePointer2 className="w-12 h-12 text-portfolio-pink rotate-45" />
            </div>
          </div>
        </div>
      </div>
      {/* NN/g branding */}
      <div className="absolute bottom-4 left-4 text-portfolio-black text-2xl font-bold">
        NN/g
      </div>
    </section>
  );
};

export default HeroSection;