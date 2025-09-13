"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import RobloxProfileDetails from "@/components/RobloxProfileDetails";
import RobloxAvatarItemsCarousel from "@/components/RobloxAvatarItemsCarousel";

interface RobloxProfileOverviewCardProps {
  userId: number;
}

const RobloxProfileOverviewCard: React.FC<RobloxProfileOverviewCardProps> = ({
  userId,
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-[800px]">
      {" "}
      {/* Increased min-h to 800px */}
      {/* Elemen "bayangan" */}
      <div className="absolute top-2 left-2 w-full h-full bg-background rounded-none border-4 border-portfolio-black"></div>
      {/* Kartu utama yang sebenarnya */}
      <Card
        className="absolute top-0 left-0 w-full h-full border-4 border-portfolio-black rounded-none overflow-hidden bg-portfolio-teal
                   transition-transform duration-100 ease-out transform hover:translate-x-2 hover:translate-y-2 shadow-none p-0"
      >
        <div className="flex flex-col gap-6">
          {" "}
          {/* Use gap for spacing between sections */}
          <RobloxProfileDetails userId={userId} />
          <RobloxAvatarItemsCarousel userId={userId} />
        </div>
      </Card>
    </div>
  );
};

export default RobloxProfileOverviewCard;
