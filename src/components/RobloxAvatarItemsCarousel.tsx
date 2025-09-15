"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";

interface RobloxItem {
  id: number;
  name: string;
  imageUrl: string;
}

// Interface for catalog item details
interface CatalogItemDetail {
  id: number;
  name: string;
  // Add other properties if needed, but for this context, id and name are sufficient
}

// Interface for thumbnail data
interface ThumbnailData {
  targetId: number;
  state: "Completed" | "Pending" | "Error"; // More specific states
  imageUrl: string;
  // Add other properties if needed
}

interface RobloxAvatarItemsCarouselProps {
  userId: number;
}

const RobloxAvatarItemsCarousel: React.FC<RobloxAvatarItemsCarouselProps> = ({
  userId,
}) => {
  const [items, setItems] = useState<RobloxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

  useEffect(() => {
    const fetchAvatarItems = async () => {
      setLoading(true);
      setError(null);
      try {
        // Determine the base URL for Roblox API calls
        const isProduction = import.meta.env.PROD;
        const proxyApiBase = isProduction
          ? `/api/roblox/proxy`
          : `/roblox-avatar-api`; //? ubah nanti ygy

        // --- Step 0: Fetch X-CSRF-TOKEN using a dummy POST request ---
        let csrfToken = "";
        try {
          const csrfResponse = await fetch(
            isProduction
              ? `${proxyApiBase}?service=catalog&robloxPath=v1/catalog/items/details`
              : `/roblox-catalog-api/v1/catalog/items/details`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({}),
            }
          );

          const token = csrfResponse.headers.get("x-csrf-token");
          if (token) {
            csrfToken = token;
          } else {
            console.warn(
              "X-CSRF-TOKEN not found in response headers from dummy POST to catalog endpoint."
            );
          }
        } catch (csrfErr) {
          console.error("Error fetching CSRF token:", csrfErr);
        }

        // Step 1: Get item IDs currently wearing
        const wearingResponse = await fetch(
          isProduction
            ? `${proxyApiBase}?service=avatar&robloxPath=v1/users/${userId}/currently-wearing`
            : `${proxyApiBase}/v1/users/${userId}/currently-wearing`
        );
        if (!wearingResponse.ok) {
          throw new Error(
            `Failed to fetch currently wearing items: ${wearingResponse.statusText}`
          );
        }
        const wearingData = await wearingResponse.json();
        const assetIds: number[] = wearingData.assetIds || [];

        if (assetIds.length === 0) {
          setItems([]);
          setLoading(false);
          return;
        }

        // Step 2: Fetch item names from catalog API (requires CSRF token)
        const catalogResponse = await fetch(
          isProduction
            ? `${proxyApiBase}?service=catalog&robloxPath=v1/catalog/items/details`
            : `/roblox-catalog-api/v1/catalog/items/details`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "X-CSRF-TOKEN": csrfToken, // Use the fetched CSRF token
            },
            body: JSON.stringify({
              items: assetIds.map((id) => ({ itemType: "Asset", id: id })),
            }),
          }
        );

        if (!catalogResponse.ok) {
          const errorBody = await catalogResponse
            .json()
            .catch(() => ({ message: catalogResponse.statusText }));
          throw new Error(
            `Failed to fetch catalog item details for names: ${
              errorBody.message || catalogResponse.statusText
            }`
          );
        }
        const catalogData = await catalogResponse.json();
        const itemNamesMap = new Map<number, string>();
        catalogData.data.forEach((item: CatalogItemDetail) => {
          // Using CatalogItemDetail interface
          itemNamesMap.set(item.id, item.name);
        });

        // Step 3: Fetch item thumbnails from the dedicated thumbnails API
        const thumbnailsResponse = await fetch(
          isProduction
            ? `${proxyApiBase}?service=thumbnails&robloxPath=v1/assets?assetIds=${assetIds.join(
                ","
              )}&size=420x420&format=Png`
            : `/roblox-thumbnails-api/v1/assets?assetIds=${assetIds.join(
                ","
              )}&size=420x420&format=Png`
        );
        if (!thumbnailsResponse.ok) {
          throw new Error(
            `Failed to fetch item thumbnails: ${thumbnailsResponse.statusText}`
          );
        }
        const thumbnailsData = await thumbnailsResponse.json();
        const itemThumbnailsMap = new Map<number, string>();
        thumbnailsData.data.forEach((thumbnail: ThumbnailData) => {
          // Using ThumbnailData interface
          if (thumbnail.state === "Completed") {
            itemThumbnailsMap.set(thumbnail.targetId, thumbnail.imageUrl);
          }
        });

        // Step 4: Combine names and image URLs
        const fetchedItems: RobloxItem[] = assetIds.map((id) => ({
          id: id,
          name: itemNamesMap.get(id) || `Unknown Item ${id}`, // Fallback name
          imageUrl: itemThumbnailsMap.get(id) || "/placeholder.svg", // Fallback image
        }));
        setItems(fetchedItems);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAvatarItems();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-portfolio-red-pink rounded-none border-4 border-portfolio-black min-h-[200px]">
        <Loader2 className="w-10 h-10 animate-spin text-always-black mb-4" />
        <p className="text-always-black text-lg font-semibold">
          Loading Avatar Items...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-red-500 text-white rounded-none border-4 border-portfolio-black min-h-[200px]">
        <CardTitle className="text-xl font-bold mb-2">Error</CardTitle>
        <CardDescription className="text-center">{error}</CardDescription>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="p-6 bg-portfolio-red-pink rounded-none border-4 border-portfolio-black">
        <CardTitle className="text-xl font-bold mb-2 text-always-black text-center">
          No Items Found
        </CardTitle>
        <CardDescription className="text-center text-always-black">
          This user is not currently wearing any items.
        </CardDescription>
      </div>
    );
  }

  return (
    <div className="p-6 pt-0">
      {" "}
      {/* No outer padding or title */}
      <h3 className="text-2xl font-bold text-center text-portfolio-black mb-6">
        Currently Wearing
      </h3>
      <div className="relative w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item) => (
            <div
              key={item.id}
              className="embla__slide flex-shrink-0 min-w-0 px-4 py-2
                         w-full sm:w-[calc(100%/2)] md:w-[calc(100%/3)] lg:w-[calc(100%/3)]"
            >
              <div className="relative w-full min-h-[280px]">
                <div className="absolute top-2 left-2 w-full h-full bg-background rounded-none border-4 border-portfolio-black"></div>
                <Card
                  className="absolute top-0 left-0 w-full h-full border-4 border-portfolio-black rounded-none overflow-hidden bg-white
                             transition-transform duration-100 ease-out transform hover:translate-x-2 hover:translate-y-2 shadow-none"
                >
                  <CardHeader className="p-0">
                    <AspectRatio ratio={1 / 1}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="object-cover w-full h-full border-b-4 border-portfolio-black"
                      />
                    </AspectRatio>
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-bold text-card-text-dark-mode">
                      {item.name}
                    </CardTitle>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="bg-portfolio-yellow text-portfolio-black border-2 border-always-black rounded-full w-12 h-12 flex items-center justify-center shadow-[0_4px_0_hsl(var(--portfolio-black))] active:shadow-[0_0px_0_hsl(var(--portfolio-black))] active:translate-y-1 transition-all duration-100 hover:bg-portfolio-yellow/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="bg-portfolio-yellow text-portfolio-black border-2 border-always-black rounded-full w-12 h-12 flex items-center justify-center shadow-[0_4px_0_hsl(var(--portfolio-black))] active:shadow-[0_0px_0_hsl(var(--portfolio-black))] active:translate-y-1 transition-all duration-100 hover:bg-portfolio-yellow/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default RobloxAvatarItemsCarousel;
