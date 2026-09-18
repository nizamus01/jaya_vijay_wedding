import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { COUPLE } from '@/lib/constants';
import { FallingPetals } from '@/components/FallingPetals';
import { OrnamentalDivider } from '@/components/FloralDivider';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function ClosingScreen() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [showSignature, setShowSignature] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setShowSignature(true), 1500);
      return () => clearTimeout(t);
    }
  }, [visible]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-ivory-light via-ivory to-champagne-light/40 overflow-hidden"
    >
      <FallingPetals count={8} />

      <div
        className={`relative z-20 text-center transition-all duration-1200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Heart */}
        <div className="mb-8">
          <Heart
            className="w-10 h-10 text-rose mx-auto"
            fill="currentColor"
            strokeWidth={1}
          />
        </div>

        {/* Names */}
        <h2 className="font-script text-6xl sm:text-7xl text-green-dark leading-tight">
          {COUPLE.bride}
        </h2>
        <span className="font-cormorant text-gold-dark text-2xl italic block my-1">
          &amp;
        </span>
        <h2 className="font-script text-6xl sm:text-7xl text-green-dark leading-tight">
          {COUPLE.groom}
        </h2>

        {/* Date */}
        <p className="font-cormorant text-xl text-green/60 tracking-[0.3em] mt-8">
          {COUPLE.dateLabel}
        </p>

        <OrnamentalDivider className="mt-8" />

        {/* Message */}
        <p className="font-cormorant text-2xl text-green-dark italic mt-8 max-w-md mx-auto leading-relaxed">
          Two hearts, one beautiful beginning.
        </p>
        <p className="font-sans text-sm text-green/50 mt-4 max-w-sm mx-auto leading-relaxed">
          Thank you for being a part of our story.
        </p>

        {/* Signature */}
        <div
          className={`mt-12 transition-all duration-1000 ${
            showSignature ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="font-script text-3xl text-gold-dark">
            With Love,
          </p>
          <p className="font-script text-4xl text-green-dark mt-2">
            Jaya &amp; Vijay
          </p>
        </div>
      </div>

      {/* Bottom decorative border */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-champagne-light/40 to-transparent pointer-events-none" />
    </section>
  );
}
