import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { IMAGES } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { OrnamentalDivider } from '@/components/FloralDivider';

export function PhotoGallery() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const images = IMAGES.gallery;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % images.length
    );
  }, [images.length]);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 bg-gradient-to-b from-ivory-light via-ivory to-champagne-light/20"
    >
      {/* Section header */}
      <div
        className={`text-center mb-14 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <Camera className="w-8 h-8 text-gold mx-auto mb-4" strokeWidth={1} />
        <h2 className="font-serif text-4xl sm:text-5xl text-green-dark mb-3">
          Our Moments
        </h2>
        <p className="font-cormorant text-lg text-green/50 italic">
          Every picture tells a part of our story
        </p>
        <OrnamentalDivider className="mt-6" />
      </div>

      {/* Gallery grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {images.map((src, index) => {
          const isLoaded = loadedImages.has(index);
          const isLarge = index === 0 || index === 3;

          return (
            <button
              key={index}
              onClick={() => setLightboxIndex(index)}
              className={`group relative overflow-hidden rounded-xl shadow-luxe cursor-pointer transition-all duration-700 ${
                isLarge ? 'col-span-2 row-span-2' : ''
              } ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                aspectRatio: isLarge ? '1 / 1' : '3 / 4',
                transitionDelay: `${index * 150}ms`,
              }}
            >
              {/* Skeleton */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-champagne-light/50 animate-pulse" />
              )}

              <img
                src={src}
                alt={`Jaya & Vijay moment ${index + 1}`}
                onLoad={() => handleImageLoad(index)}
                className={`w-full h-full object-cover transition-all duration-1000 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-110`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Hover icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full glass border border-gold/40 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-gold" strokeWidth={1.5} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-green-dark/95 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full glass border border-gold/40 flex items-center justify-center hover:bg-gold/20 transition-colors"
          >
            <X className="w-6 h-6 text-ivory" strokeWidth={1.5} />
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full glass border border-gold/40 flex items-center justify-center hover:bg-gold/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-ivory" strokeWidth={1.5} />
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[85vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex]}
              alt={`Jaya & Vijay moment ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            />
            <p className="text-center mt-4 font-cormorant text-ivory/70 text-lg">
              {lightboxIndex + 1} of {images.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full glass border border-gold/40 flex items-center justify-center hover:bg-gold/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-ivory" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </section>
  );
}
