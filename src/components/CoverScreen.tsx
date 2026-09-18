import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { COUPLE, IMAGES } from '@/lib/constants';
import { FallingPetals } from '@/components/FallingPetals';
import { OrnamentalDivider } from '@/components/FloralDivider';

interface CoverScreenProps {
  onEnter: () => void;
}

export function CoverScreen({ onEnter }: CoverScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-green-dark">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.gallery[0]}
          alt=""
          className="w-full h-full object-cover animate-ken-burns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-dark/70 via-green-dark/50 to-green-dark/80" />
      </div>

      {/* Falling petals */}
      <FallingPetals count={15} />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-16">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-1000 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/60 shadow-gold mx-auto">
            <img
              src={IMAGES.logo}
              alt="Jaya & Vijay"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Together with their families */}
        <p
          className={`font-cormorant text-ivory/80 text-lg tracking-wide text-center mb-6 transition-all duration-1000 delay-300 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Together with their families
        </p>

        {/* Names */}
        <div
          className={`text-center transition-all duration-1200 delay-500 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <h1 className="font-script text-ivory text-6xl sm:text-7xl md:text-8xl leading-tight">
            Jaya
          </h1>
          <span className="font-cormorant text-gold-light text-2xl italic block my-1">
            &amp;
          </span>
          <h1 className="font-script text-ivory text-6xl sm:text-7xl md:text-8xl leading-tight">
            Vijay
          </h1>
        </div>

        {/* Divider */}
        <div
          className={`mt-8 transition-all duration-1000 delay-700 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <OrnamentalDivider />
        </div>

        {/* Date */}
        <p
          className={`font-cormorant text-ivory/90 text-xl tracking-[0.3em] mt-6 transition-all duration-1000 delay-1000 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {COUPLE.dateLabel}
        </p>

        {/* Tap to enter */}
        <button
          onClick={onEnter}
          className={`group mt-16 flex flex-col items-center gap-3 transition-all duration-1000 delay-1500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="font-sans text-ivory/70 text-xs uppercase tracking-[0.3em] group-hover:text-gold-light transition-colors">
            Tap to Enter
          </span>
          <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center animate-pulse-glow group-hover:border-gold transition-colors">
            <ChevronDown className="w-5 h-5 text-gold-light animate-bounce-arrow group-hover:text-gold transition-colors" />
          </div>
        </button>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-dark to-transparent pointer-events-none" />
    </div>
  );
}
