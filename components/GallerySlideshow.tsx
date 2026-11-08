'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { supabase, type GalleryPhoto } from '@/lib/supabase';

const AUTOPLAY_DELAY = 4500;

export default function GallerySlideshow() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });

  useEffect(() => {
    supabase
      .from('gallery_photos')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setPhotos(data || []);
        setLoading(false);
      });
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi || isHovered) {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      return;
    }
    autoplayRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_DELAY);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [emblaApi, isHovered]);

  if (loading) {
    return (
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[420px] rounded-3xl bg-cream-100 animate-pulse" />
        </div>
      </section>
    );
  }

  if (photos.length === 0) return null;

  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-golden-600 font-inter font-medium text-sm uppercase tracking-widest mb-3">
            <Camera className="w-4 h-4" />
            Life at Love Edify
          </span>
          <h2 className="font-poppins font-700 text-3xl md:text-4xl text-forest-500 mb-4">
            A Glimpse Into Our World
          </h2>
          <p className="text-muted-gray font-inter text-lg max-w-xl mx-auto leading-relaxed">
            Every photo tells the story of children thriving in a place filled with love, laughter, and learning.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex touch-pan-y -ml-4">
              {photos.map((photo, index) => (
                <div
  key={photo.id}
  className="flex-[0_0_90%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 pl-4"
>
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-card transition-all duration-500 ${
                      index === selectedIndex ? 'scale-100 opacity-100' : 'scale-[0.94] opacity-55'
                    }`}
                  >
                    <div className="aspect-[1/1] ">
                      <img
                        src={photo.image_url}
                        alt={photo.title || 'Daycare gallery photo'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Gradient overlay with caption */}
                    {/* {(photo.title || photo.caption) && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent pt-14 pb-5 px-6">
                        {photo.title && (
                          <p className="font-poppins font-600 text-white text-base md:text-lg leading-snug">
                            {photo.title}
                          </p>
                        )}
                        {photo.caption && (
                          <p className="font-inter text-white/80 text-sm mt-0.5 leading-relaxed">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    )} */}
                  </div> 
                </div>
              ))}
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Previous photo"
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-card flex items-center justify-center text-forest-500 hover:bg-white hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next photo"
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-card flex items-center justify-center text-forest-500 hover:bg-white hover:scale-105 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {photos.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to photo ${index + 1}`}
              className={`rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-6 h-2 bg-golden-500'
                  : 'w-2 h-2 bg-forest-500/25 hover:bg-forest-500/50'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-muted-gray font-inter text-xs mt-3">
          {selectedIndex + 1} / {photos.length}
        </p>
      </div>
    </section>
  );
}
