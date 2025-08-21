import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Folder } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const projects = [
  {
    id: 1,
    title: "Simple Calculator",
    description:
      "A basic calculator built using React, leveraging modern web technologies and styling with Tailwind CSS.",
    routePath: "/projects/calculator", // Changed to routePath for internal React route
  },
  {
    id: 2,
    title: "Project Beta",
    description:
      "A brief description of Project Beta, highlighting its key features and technologies used.",
  },
  {
    id: 3,
    title: "Project Gamma",
    description:
      "A brief description of Project Gamma, highlighting its key features and technologies used.",
  },
];

const ProjectSection = () => {
  return (
    <section className="w-full bg-portfolio-yellow py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="relative border-4 border-portfolio-black rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white"
            >
              <CardHeader className="p-0">
                <div className="relative w-full h-48 bg-portfolio-teal border-b-4 border-portfolio-black flex items-center justify-center">
                  <Folder className="w-24 h-24 text-white" />
                  <div className="absolute top-4 right-4 w-8 h-8 bg-portfolio-teal border-2 border-portfolio-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold text-portfolio-black mb-2">
                  {project.title}
                </CardTitle>
                <p className="text-gray-700 mb-4">{project.description}</p>
                {project.routePath && (
                  <p className="text-sm text-gray-500">
                    <Link
                      to={project.routePath}
                      className="text-portfolio-pink hover:underline font-semibold"
                    >
                      View Project
                    </Link>
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
