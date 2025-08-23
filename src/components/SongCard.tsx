import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react"; // Import Pause icon
import { CustomProgressBar } from "@/components/CustomProgressBar"; // Mengganti Progress dengan CustomProgressBar

interface SongCardProps {
  songId: number; // Add unique ID for the song
  albumArtSrc: string;
  title: string;
  audioSrc: string;
  currentlyPlayingId: number | null; // ID of the song currently playing globally
  onTogglePlay: (id: number | null) => void; // Function to update global playing state
}

const SongCard: React.FC<SongCardProps> = ({
  songId,
  albumArtSrc,
  title,
  audioSrc,
  currentlyPlayingId,
  onTogglePlay,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const currentTimeRef = useRef(currentTime); // Ref untuk menyimpan currentTime

  const isPlaying = songId === currentlyPlayingId; // Determine if THIS song should be playing

  // Effect untuk selalu memperbarui currentTimeRef dengan nilai currentTime terbaru
  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const setAudioEnded = () => {
      onTogglePlay(null); // Notify parent that playback has ended
      setCurrentTime(0); // Reset current time
    };

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", setAudioEnded);

    // Initial check in case metadata loads very quickly
    if (audio.readyState >= 1) {
      setAudioData();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", setAudioEnded);
    };
  }, [audioSrc, onTogglePlay]); // Re-run if audioSrc changes

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audio.pause();
      // Hanya reset waktu jika lagu sebelumnya diputar (currentTime > 0)
      // Menggunakan currentTimeRef.current untuk menghindari peringatan ESLint
      if (currentTimeRef.current > 0) {
        audio.currentTime = 0;
        setCurrentTime(0);
      }
    }
  }, [isPlaying]); // currentTime tidak lagi menjadi dependensi

  const togglePlayPause = () => {
    if (isPlaying) {
      onTogglePlay(null); // Pause this song
    } else {
      onTogglePlay(songId); // Play this song
    }
  };

  // Format time for display (MM:SS)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progressValue = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full max-w-md mx-auto h-32">
      {/* Elemen 'bayangan' untuk efek 3D */}
      <div className="absolute top-2 left-2 w-full h-full bg-portfolio-purple-link rounded-lg border-4 border-portfolio-black"></div>

      {/* Kartu lagu yang sebenarnya */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-white rounded-lg border-4 border-portfolio-black flex flex-col justify-between p-4
                      transition-transform duration-100 ease-out transform hover:translate-x-2 hover:translate-y-2 shadow-none"
      >
        <div className="flex items-center">
          {/* Gambar Album */}
          <img
            src={albumArtSrc}
            alt="Album Art"
            className="w-20 h-20 rounded-md object-cover border-2 border-portfolio-black"
          />

          {/* Informasi Lagu */}
          <div className="flex-grow ml-4 min-w-0">
            <h3 className="text-lg font-bold text-always-black overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </h3>
            <p className="text-sm text-gray-600">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          {/* Tombol Putar/Jeda */}
          <button
            onClick={togglePlayPause}
            className="w-12 h-12 bg-always-black text-white rounded-full flex items-center justify-center
                       border-2 border-portfolio-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current" />
            )}
          </button>
        </div>

        {/* Progress Bar */}
        <CustomProgressBar value={progressValue} className="w-full h-2 mt-2" />
      </div>
      {/* Elemen audio tersembunyi */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
    </div>
  );
};

export default SongCard;
