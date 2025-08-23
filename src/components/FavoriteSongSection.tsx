import React from "react";
import SongCard from "@/components/SongCard";

const favoriteSongs = [
  {
    albumArtSrc: "/diary_depresiku_album_art.jpg",
    title: "Diary Depresiku",
    audioSrc: "/Last Child - Diary Depresiku.mp3",
  },
  {
    albumArtSrc: "/taylor_swift_message_in_a_bottle_album_art.jpg",
    title: "Message In A Bottle (Taylor's Version)",
    audioSrc: "/Taylor Swift - Message In A Bottle (Taylor's Version).mp3",
  },
  {
    albumArtSrc: "/calvin_harris_feels_album_art.png",
    title: "Feels (ft. Pharrell Williams, Katy Perry, Big Sean)",
    audioSrc:
      "/Calvin Harris - Feels (Official Video) ft. Pharrell Williams, Katy Perry, Big Sean.mp3",
  },
];

const FavoriteSongSection = () => {
  return (
    <div className="w-full py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-always-black mb-8">
        My Favorite Songs
      </h2>
      <div className="w-full mx-auto space-y-6">
        {" "}
        {/* Menambahkan space-y-6 untuk jarak antar kartu */}
        {favoriteSongs.map((song, index) => (
          <SongCard
            key={index}
            albumArtSrc={song.albumArtSrc}
            title={song.title}
            audioSrc={song.audioSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoriteSongSection;
