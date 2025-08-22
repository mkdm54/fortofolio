import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react"; // Import Pause icon
import { CustomProgressBar } from "@/components/CustomProgressBar"; // Mengganti Progress dengan CustomProgressBar

interface SongCardProps {
  albumArtSrc: string;
  title: string;
  duration: string; // This will now be the actual duration from audio metadata
  audioSrc: string; // New prop for the audio file source
}

const SongCard: React.FC<SongCardProps> = ({
  albumArtSrc,
  title,
  duration: initialDuration,
  audioSrc,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); // State for actual audio duration

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
      console.log("Audio metadata loaded. Duration:", audio.duration); // Log untuk debugging
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const setAudioEnded = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", setAudioEnded);

    // Initial check in case metadata loads very quickly
    if (audio.readyState >= 1) {
      // HTMLMediaElement.HAVE_METADATA
      setAudioData();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", setAudioEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
          // Handle cases where play() might fail (e.g., user hasn't interacted yet)
        });
      }
      setIsPlaying(!isPlaying);
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
          <div className="flex-grow ml-4">
            <h3 className="text-lg font-bold text-always-black">{title}</h3>
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
