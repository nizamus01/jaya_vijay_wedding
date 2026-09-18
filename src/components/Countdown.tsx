import { useCountdown } from '@/hooks/useCountdown';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { OrnamentalDivider } from '@/components/FloralDivider';
import { Heart } from 'lucide-react';

function TimeUnit({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="w-20 h-24 sm:w-24 sm:h-28 flex items-center justify-center rounded-xl bg-gradient-to-b from-ivory-light to-champagne-light/50 border border-gold/30 shadow-luxe">
          <span className="font-serif text-3xl sm:text-4xl text-green-dark tabular-nums">
            {display}
          </span>
        </div>
        {/* Top gold accent */}
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-12 h-px bg-gold/40" />
      </div>
      <span className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-green/60">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const timeLeft = useCountdown();

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-champagne-light/30 via-ivory to-ivory-light"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div
        className={`text-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="w-4 h-4 text-rose/60" fill="currentColor" />
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold-dark">
            The Big Day
          </p>
          <Heart className="w-4 h-4 text-rose/60" fill="currentColor" />
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl text-green-dark mb-3">
          Counting Down
        </h2>
        <p className="font-cormorant text-lg text-green/50 italic mb-10">
          Every second brings us closer to forever
        </p>

        <OrnamentalDivider className="mb-10" />

        {/* Timer */}
        <div className="flex items-start justify-center gap-3 sm:gap-6">
          <TimeUnit value={timeLeft.days} label="Days" />
          <span className="font-serif text-3xl text-gold/50 mt-8">:</span>
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <span className="font-serif text-3xl text-gold/50 mt-8">:</span>
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <span className="font-serif text-3xl text-gold/50 mt-8">:</span>
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Date display */}
        <div className="mt-12">
          <p className="font-cormorant text-2xl text-green-dark tracking-wide">
            11<sup>th</sup> of December, 2026
          </p>
          <p className="font-sans text-sm text-green/50 mt-2 tracking-[0.15em] uppercase">
            Rasra, Uttar Pradesh
          </p>
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
