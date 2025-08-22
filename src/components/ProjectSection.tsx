import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Folder } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { AspectRatio } from "@/components/ui/aspect-ratio"; // Import AspectRatio

const projects = [
  {
    id: 1,
    title: "Simple Calculator",
    description:
      "A basic calculator built using React, leveraging modern web technologies and styling with Tailwind CSS.",
    routePath: "/projects/calculator", // Changed to routePath for internal React route
    image: "/calculator_app_screenshot.jpg", // Menambahkan gambar untuk proyek kalkulator
  },
  {
    id: 2,
    title: "Chatbot App",
    description:
      "A simple chatbot application that can respond to user queries, built with React and a focus on conversational UI.",
    projectUrl: "https://github.com/mkdm54/chatbot_app", // Tautan ke repositori GitHub
    image: "/chatbot_app_screenshot.jpg", // Menambahkan gambar untuk proyek chatbot
  },
  {
    id: 3,
    title: "easyPDF App",
    description:
      "A mobile-friendly application for managing PDF files, including image to PDF conversion, opening, and merging PDFs.",
    projectUrl: "https://github.com/mkdm54/easyPDF-app",
    image: "/easyPDF_app_screenshot.jpg",
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
            <div key={project.id} className="relative w-full min-h-[450px]">
              {" "}
              {/* Increased min-height */}
              {/* Elemen "bayangan" */}
              <div className="absolute top-2 left-2 w-full h-full bg-white rounded-none border-4 border-portfolio-black"></div>
              {/* Kartu proyek yang sebenarnya */}
              <Card
                className="absolute top-0 left-0 w-full h-full border-4 border-portfolio-black rounded-none overflow-hidden bg-white
                           transition-transform duration-100 ease-out transform hover:translate-x-2 hover:translate-y-2 shadow-none"
              >
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover w-full h-full border-b-4 border-portfolio-black"
                      />
                    ) : (
                      <div className="relative w-full h-full bg-portfolio-teal border-b-4 border-portfolio-black flex items-center justify-center">
                        <Folder className="w-24 h-24 text-white" />
                        <div className="absolute top-4 right-4 w-8 h-8 bg-portfolio-teal border-2 border-portfolio-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                          <Plus className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    )}
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-portfolio-black mb-2">
                    {project.title}
                  </CardTitle>
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  {project.routePath ? (
                    <p className="text-sm text-gray-500">
                      <Link
                        to={project.routePath}
                        className="text-portfolio-pink hover:underline font-semibold"
                      >
                        View Project
                      </Link>
                    </p>
                  ) : project.projectUrl ? (
                    <p className="text-sm text-gray-500">
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-portfolio-pink hover:underline font-semibold"
                      >
                        View Project on GitHub
                      </a>
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
