import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CertificateSection = () => {
  return (
    <section className="w-full bg-portfolio-yellow py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-portfolio-black mb-12">
          My Certificates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2].map((i) => (
            <Card
              key={i}
              className="border-4 border-portfolio-black rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white"
            >
              <CardHeader className="p-0">
                <AspectRatio ratio={16 / 9}>
                  <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500 text-xl font-semibold border-b-4 border-portfolio-black">
                    Certificate Placeholder {i}
                  </div>
                </AspectRatio>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl font-bold text-portfolio-black mb-2">
                  Certificate Title {i}
                </CardTitle>
                <p className="text-gray-700">
                  Description of the certificate and what it covers.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;