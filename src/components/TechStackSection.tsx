import React, { useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Atom, // For React
  Type, // For TypeScript
  Wind, // For Tailwind CSS
  Figma,
  GitBranch,
  Database,
  Server,
  Cloud,
  Palette,
  Code,
} from "lucide-react"; // Menghapus ChevronLeft dan ChevronRight
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { Button } from "@/components/ui/button";

const techStack = [
  { name: "React", icon: Atom },
  { name: "TypeScript", icon: Type },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Figma", icon: Figma },
  { name: "Git", icon: GitBranch },
  { name: "SQL", icon: Database },
  { name: "Node.js", icon: Server },
  { name: "Cloud", icon: Cloud },
  { name: "UI/UX Design", icon: Palette },
  { name: "Frontend Dev", icon: Code },
];

const TechStackSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    let intervalId: NodeJS.Timeout;
    const startAutoplay = () => {
      intervalId = setInterval(autoplay, 3000);
    };

    const stopAutoplay = () => {
      clearInterval(intervalId);
    };

    const onPointerDown = () => {
      stopAutoplay();
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect(emblaApi);

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("settle", startAutoplay);

    startAutoplay();

    return () => {
      stopAutoplay();
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("settle", startAutoplay);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, autoplay, onSelect]);

  return (
    <section className="w-full bg-background py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          My Tech Stack
        </h2>
      </div>
      <div className="relative w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {techStack.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="embla__slide flex-shrink-0 min-w-0 px-4 py-2
                         w-[calc(100%/2)] sm:w-[calc(100%/3)] md:w-[calc(100%/4)] lg:w-[calc(100%/5)]"
            >
              <Badge className="bg-portfolio-red-pink text-white border-2 border-portfolio-black px-6 py-3 text-lg font-semibold rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2">
                {tech.icon && <tech.icon className="w-6 h-6" />}
                <span>{tech.name}</span>
              </Badge>
            </div>
          ))}
          {techStack.map((tech, index) => (
            <div
              key={`duplicate-${tech.name}-${index}`}
              className="embla__slide flex-shrink-0 min-w-0 px-4 py-2
                         w-[calc(100%/2)] sm:w-[calc(100%/3)] md:w-[calc(100%/4)] lg:w-[calc(100%/5)]"
            >
              <Badge className="bg-portfolio-red-pink text-white border-2 border-portfolio-black px-6 py-3 text-lg font-semibold rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2">
                {tech.icon && <tech.icon className="w-6 h-6" />}
                <span>{tech.name}</span>
              </Badge>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="bg-portfolio-teal text-portfolio-black border-2 border-always-black rounded-full w-12 h-12 flex items-center justify-center shadow-[0_4px_0_hsl(var(--portfolio-black))] active:shadow-[0_0px_0_hsl(var(--portfolio-black))] active:translate-y-1 transition-all duration-100 hover:bg-portfolio-teal/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src="/chevron-left.svg" alt="Previous" className="w-6 h-6" />
        </Button>
        <Button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="bg-portfolio-teal text-portfolio-black border-2 border-always-black rounded-full w-12 h-12 flex items-center justify-center shadow-[0_4px_0_hsl(var(--portfolio-black))] active:shadow-[0_0px_0_hsl(var(--portfolio-black))] active:translate-y-1 transition-all duration-100 hover:bg-portfolio-teal/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src="/chevron-right.svg" alt="Next" className="w-6 h-6" />
        </Button>
      </div>
    </section>
  );
};

export default TechStackSection;
