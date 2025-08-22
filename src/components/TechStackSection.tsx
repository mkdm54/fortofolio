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
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

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

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    let intervalId: NodeJS.Timeout;
    const startAutoplay = () => {
      intervalId = setInterval(autoplay, 3000); // Gulir setiap 3 detik
    };

    const stopAutoplay = () => {
      clearInterval(intervalId);
    };

    const onPointerDown = () => {
      stopAutoplay();
    };

    const onSettle = () => {
      stopAutoplay(); // Pastikan berhenti jika ada interaksi
      startAutoplay(); // Mulai lagi setelah interaksi selesai
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("settle", onSettle); // Ketika carousel berhenti bergerak setelah interaksi

    startAutoplay(); // Mulai autoplay saat komponen dimuat

    return () => {
      stopAutoplay();
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("settle", onSettle);
    };
  }, [emblaApi, autoplay]);

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          My Tech Stack
        </h2>
      </div>
      {/* Bagian gulir yang akan mengambil lebar penuh */}
      <div className="relative w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {" "}
          {/* Embla container */}
          {techStack.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="embla__slide flex-shrink-0 min-w-0 px-4 py-2
                         w-[calc(100%/2)] sm:w-[calc(100%/3)] md:w-[calc(100%/4)] lg:w-[calc(100%/5)]"
            >
              {" "}
              {/* Embla slide dengan lebar responsif */}
              <Badge className="bg-portfolio-red-pink text-white border-2 border-portfolio-black px-4 py-2 text-base font-semibold rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2">
                {tech.icon && <tech.icon className="w-5 h-5" />}
                <span>{tech.name}</span>
              </Badge>
            </div>
          ))}
          {/* Duplikasi untuk efek loop yang lebih mulus jika diperlukan oleh Embla,
              tapi Embla dengan loop:true sudah menangani ini secara internal.
              Kita tetap bisa menduplikasi untuk mengisi ruang jika jumlah item sedikit. */}
          {techStack.map((tech, index) => (
            <div
              key={`duplicate-${tech.name}-${index}`}
              className="embla__slide flex-shrink-0 min-w-0 px-4 py-2
                         w-[calc(100%/2)] sm:w-[calc(100%/3)] md:w-[calc(100%/4)] lg:w-[calc(100%/5)]"
            >
              <Badge className="bg-portfolio-red-pink text-white border-2 border-portfolio-black px-4 py-2 text-base font-semibold rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center space-x-2">
                {tech.icon && <tech.icon className="w-5 h-5" />}
                <span>{tech.name}</span>
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
