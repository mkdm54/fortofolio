import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/custom-sheet";
import { ThemeToggle } from "@/components/ThemeToggle"; // Import ThemeToggle

const Navbar = () => {
  return (
    <nav className="w-full bg-portfolio-teal p-4 border-b-4 border-portfolio-black shadow-[0_4px_0px_0px_rgba(0,0,0,1)] sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-portfolio-black text-2xl font-extrabold">
          My Portfolio
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Button
            asChild
            variant="ghost"
            className="text-portfolio-black text-lg font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black"
          >
            <a href="#about">About</a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-portfolio-black text-lg font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black"
          >
            <a href="#projects">Projects</a>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-portfolio-black text-lg font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black"
          >
            <a href="#contact">Contact</a>
          </Button>
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-portfolio-black"
              >
                <img src="/menu-hambuger.svg" alt="Menu" className="h-8 w-8" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-portfolio-teal border-l-4 border-portfolio-black p-6"
            >
              <div className="flex flex-col space-y-4 mt-8">
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-portfolio-black text-xl font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black w-full justify-start"
                  >
                    <a href="#about">About</a>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-portfolio-black text-xl font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black w-full justify-start"
                  >
                    <a href="#projects">Projects</a>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-portfolio-black text-xl font-semibold hover:bg-portfolio-pink/20 hover:text-portfolio-black w-full justify-start"
                  >
                    <a href="#contact">Contact</a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
