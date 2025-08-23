import React, { useCallback, useEffect, useState } from "react"; // Import useState
import SongCard from "@/components/SongCard";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import Chevron icons

const favoriteSongs = [
  {
    id: 1, // Add unique ID
    albumArtSrc: "/diary_depresiku_album_art.jpg",
    title: "Diary Depresiku",
    audioSrc: "/Last Child - Diary Depresiku.mp3",
  },
  {
    id: 2, // Add unique ID
    albumArtSrc: "/taylor_swift_message_in_a_bottle_album_art.jpg",
    title: "Message In A Bottle (Taylor's Version)",
    audioSrc: "/Taylor Swift - Message In A Bottle (Taylor's Version).mp3",
  },
  {
    id: 3, // Add unique ID
    albumArtSrc: "/calvin_harris_feels_album_art.png",
    title: "Feels (ft. Pharrell Williams, Katy Perry, Big Sean)",
    audioSrc:
      "/Calvin Harris - Feels (Official Video) ft. Pharrell Williams, Katy Perry, Big Sean.mp3",
  },
];

const FavoriteSongSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<number | null>(
    null
  ); // State to track which song is currently playing

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: UseEmblaCarouselType[1]) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const handleTogglePlay = useCallback((id: number | null) => {
    setCurrentlyPlayingId(id);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect(emblaApi);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-always-black mb-8">
        My Favorite Songs
      </h2>
      <div className="relative w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {favoriteSongs.map((song) => (
            <div
              key={song.id} // Use song.id as key
              className="embla__slide flex-shrink-0 min-w-0 px-4 py-2
                         w-full sm:w-[calc(100%/2)] md:w-[calc(100%/3)] lg:w-[calc(100%/3)]"
            >
              <SongCard
                songId={song.id} // Pass song ID
                albumArtSrc={song.albumArtSrc}
                title={song.title}
                audioSrc={song.audioSrc}
                currentlyPlayingId={currentlyPlayingId} // Pass global playing state
                onTogglePlay={handleTogglePlay} // Pass handler to update global state
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          onClick={scrollPrev}
          className="bg-portfolio-yellow text-portfolio-black border-2 border-always-black rounded-full w-12 h-12 flex items-center justify-center shadow-[0_4px_0_hsl(var(--portfolio-black))] active:shadow-[0_0px_0_hsl(var(--portfolio-black))] active:translate-y-1 transition-all duration-100 hover:bg-portfolio-yellow/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={scrollNext}
          className="bg-portfolio-yellow text-portfolio-black border-2 border-always-black rounded-full w-12 h-12 flex items-center justify-center shadow-[0_4px_0_hsl(var(--portfolio-black))] active:shadow-[0_0px_0_hsl(var(--portfolio-black))] active:translate-y-1 transition-all duration-100 hover:bg-portfolio-yellow/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default FavoriteSongSection;