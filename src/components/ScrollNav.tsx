import { useEffect, useState } from 'react';
import { Home, Clock, Camera, Calendar, MapPin, Mail } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'countdown', label: 'Countdown', icon: Clock },
  { id: 'gallery', label: 'Moments', icon: Camera },
  { id: 'events', label: 'Celebrations', icon: Calendar },
  { id: 'venue', label: 'Venue', icon: MapPin },
  { id: 'rsvp', label: 'RSVP', icon: Mail },
];

export function ScrollNav() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Find active section
      const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-gold/20 py-3'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <Home className="w-4 h-4 text-gold-dark group-hover:text-gold transition-colors" />
            <span className="font-script text-xl text-green-dark group-hover:text-gold-dark transition-colors">
              Jaya &amp; Vijay
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all ${
                  activeSection === item.id
                    ? 'bg-gold/15 text-gold-dark'
                    : 'text-green/60 hover:text-green-dark'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass border-t border-gold/20 px-2 py-2">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all ${
                activeSection === item.id
                  ? 'text-gold-dark'
                  : 'text-green/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-[10px] font-sans">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
