import React from "react";
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
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          My Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech) => (
            <Badge
              key={tech.name}
              className="bg-portfolio-teal text-white border-2 border-portfolio-black px-4 py-2 text-base font-semibold rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center space-x-2"
            >
              {tech.icon && <tech.icon className="w-5 h-5" />}
              <span>{tech.name}</span>
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;