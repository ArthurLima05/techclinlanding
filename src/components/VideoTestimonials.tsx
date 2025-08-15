import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from "lucide-react";

const slides = [
  { id: 1, poster: "/hero-image.jpg", alt: "Depoimento em vídeo 1 - miniatura" },
  { id: 2, poster: "/new-og-image.png", alt: "Depoimento em vídeo 2 - miniatura" },
  { id: 3, poster: "/og-image-update.png", alt: "Depoimento em vídeo 3 - miniatura" },
];

export default function VideoTestimonials() {
  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      <Carousel>
        <CarouselContent>
          {slides.map((s) => (
            <CarouselItem key={s.id} className="px-2">
              <div className="relative rounded-xl overflow-hidden border border-primary/15 bg-background shadow-elegant">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={s.poster}
                    alt={s.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-background/10" aria-hidden />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-accent drop-shadow-md" aria-hidden />
                  </div>
                </AspectRatio>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Vídeo anterior" className="hidden sm:flex" />
        <CarouselNext aria-label="Próximo vídeo" className="hidden sm:flex" />
        <div className="mt-3 flex items-center justify-center gap-3 sm:hidden">
          <CarouselPrevious aria-label="Vídeo anterior" />
          <CarouselNext aria-label="Próximo vídeo" />
        </div>
      </Carousel>
    </div>
  );
}
