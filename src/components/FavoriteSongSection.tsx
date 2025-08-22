import React from "react";
import SongCard from "@/components/SongCard";

const FavoriteSongSection = () => {
  return (
    <div className="w-full py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-always-black mb-8">
        My Favorite Song
      </h2>
      <div className="max-w-md mx-auto">
        <SongCard
          albumArtSrc="/diary_depresiku_album_art.jpg"
          title="Diary Depresiku"
          duration="04:00"
          audioSrc="/Last Child - Diary Depresiku.mp3"
        />
      </div>
    </div>
  );
};

export default FavoriteSongSection;
