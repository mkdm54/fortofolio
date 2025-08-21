import React from "react";
import Calculator from "./Calculator";
import Navbar from "@/components/Navbar";
import ParticleBackground from "@/components/ParticleBackground"; // Import ParticleBackground

const CalculatorPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {" "}
      {/* Tambahkan relative di sini */}
      <ParticleBackground /> {/* Render ParticleBackground di sini */}
      <Navbar />
      <div className="flex-grow flex items-center justify-center z-10">
        {" "}
        {/* Tambahkan z-10 agar kalkulator di atas background */}
        <Calculator />
      </div>
    </div>
  );
};

export default CalculatorPage;
