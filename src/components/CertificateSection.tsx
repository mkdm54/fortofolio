import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const certificates = [
  {
    id: 1,
    title: "Belajar Dasar Pemrograman JavaScript",
    description:
      "Sertifikat kelulusan dari Dicoding Indonesia untuk kelas Belajar Dasar Pemrograman JavaScript.",
    image: "/sertifikat_dicoding_js_dasar.png",
    link: "https://raw.githubusercontent.com/mkdm54/fortofolio/main/public/sertifikat_dicoding_js_dasar.png",
  },
  {
    id: 2,
    title: "Sertifikat Kompetensi Kemalasan",
    description:
      "Sertifikat partisipasi pada grup 'Ingin Menjadi Programmer Handal Namun Enggan Ngoding' dari IMPHNEN.",
    image: "/sertifikat_kompetensi_kemalasan.jpg",
    link: "https://raw.githubusercontent.com/mkdm54/fortofolio/main/public/sertifikat_kompetensi_kemalasan.jpg",
  },
  {
    id: 3,
    title: "Belajar Dasar Pemrograman Web",
    description:
      "Sertifikat kelulusan untuk kelas Belajar Dasar Pemrograman Web.",
    image: "/sertifikat_belajar_dasar_pemrograman_web.png",
    link: "https://raw.githubusercontent.com/mkdm54/fortofolio/main/public/sertifikat_belajar_dasar_pemrograman_web.png",
  },
  {
    id: 4,
    title: "Belajar Membuat Front-End Web untuk Pemula",
    description:
      "Sertifikat kelulusan dari Dicoding Indonesia untuk kelas Belajar Membuat Front-End Web untuk Pemula.",
    image: "/sertifikat_belajar_membuat_front-end_web_untuk_pemula.png",
    link: "https://raw.githubusercontent.com/mkdm54/fortofolio/main/public/sertifikat_belajar_membuat_front-end_web_untuk_pemula.png",
  },
];

const CertificateSection = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          My Certificates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="relative w-full min-h-[450px]">
              {" "}
              {/* Increased min-height */}
              {/* Elemen "bayangan" */}
              <div className="absolute top-2 left-2 w-full h-full bg-white rounded-none border-4 border-portfolio-black"></div>
              {/* Kartu sertifikat yang sebenarnya */}
              <Card
                className="absolute top-0 left-0 w-full h-full border-4 border-portfolio-black rounded-none overflow-hidden bg-white
                           transition-transform duration-100 ease-out transform hover:translate-x-2 hover:translate-y-2 shadow-none"
              >
                <CardHeader className="p-0">
                  <AspectRatio ratio={16 / 9}>
                    {certificate.image ? (
                      <img
                        src={certificate.image}
                        alt={certificate.title}
                        className="object-cover w-full h-full border-b-4 border-portfolio-black"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500 text-xl font-semibold border-b-4 border-portfolio-black">
                        Certificate Placeholder {certificate.id}
                      </div>
                    )}
                  </AspectRatio>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-portfolio-black mb-2">
                    {certificate.title}
                  </CardTitle>
                  <p className="text-gray-700 mb-4">
                    {certificate.description}
                  </p>
                  {certificate.link && (
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-portfolio-pink hover:underline font-semibold"
                    >
                      View Certificate
                    </a>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
