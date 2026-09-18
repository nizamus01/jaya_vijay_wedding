import { Sun, Flame, Sparkles, MapPin, Clock, Calendar } from 'lucide-react';
import { EVENTS } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { OrnamentalDivider } from '@/components/FloralDivider';

const ICONS = {
  sun: Sun,
  flame: Flame,
  sparkles: Sparkles,
} as const;

export function WeddingEvents() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 bg-gradient-to-b from-champagne-light/20 via-ivory to-ivory-light"
    >
      {/* Section header */}
      <div
        className={`text-center mb-16 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-gold text-2xl">💍</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl text-green-dark mb-3">
          Wedding Celebrations
        </h2>
        <p className="font-cormorant text-lg text-green/50 italic">
          Join us for three days of love, laughter, and blessings
        </p>
        <OrnamentalDivider className="mt-6" />
      </div>

      {/* Timeline */}
      <div className="max-w-2xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0" />

        {EVENTS.map((event, index) => {
          const Icon = ICONS[event.icon as keyof typeof ICONS] ?? Sun;
          const isLeft = index % 2 === 0;

          return (
            <div
              key={event.id}
              className={`relative flex items-center mb-12 transition-all duration-1000 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${isLeft ? 'justify-start' : 'justify-end'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute z-10 w-14 h-14 rounded-full bg-gradient-to-br from-champagne to-gold/60 border-2 border-ivory flex items-center justify-center shadow-gold ${
                  isLeft
                    ? 'left-8 sm:left-1/2 -translate-x-1/2'
                    : 'left-8 sm:left-1/2 -translate-x-1/2'
                }`}
              >
                <Icon className="w-6 h-6 text-green-dark" strokeWidth={1.5} />
              </div>

              {/* Card */}
              <div
                className={`w-full sm:w-[calc(50%-3rem)] ml-20 sm:ml-0 ${
                  isLeft ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto'
                }`}
              >
                <div className="bg-ivory-light rounded-2xl p-6 shadow-luxe border border-gold/20 hover:border-gold/40 transition-colors">
                  <h3 className="font-serif text-2xl text-green-dark mb-3">
                    {event.name}
                  </h3>

                  <div
                    className={`space-y-2 ${
                      isLeft ? 'sm:items-end' : ''
                    } flex flex-col`}
                  >
                    <div className="flex items-center gap-2 text-green/70">
                      <Calendar className="w-4 h-4 text-gold-dark flex-shrink-0" />
                      <span className="font-sans text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green/70">
                      <Clock className="w-4 h-4 text-gold-dark flex-shrink-0" />
                      <span className="font-sans text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-green/70">
                      <MapPin className="w-4 h-4 text-gold-dark flex-shrink-0" />
                      <span className="font-sans text-sm">{event.venue}</span>
                    </div>
                  </div>

                  <p
                    className={`font-cormorant text-base text-green/60 italic mt-4 leading-relaxed ${
                      isLeft ? 'sm:text-right' : ''
                    }`}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
