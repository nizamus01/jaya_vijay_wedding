import { useState, useCallback } from 'react';
import { CoverScreen } from '@/components/CoverScreen';
import { ScratchCard } from '@/components/ScratchCard';
import { Countdown } from '@/components/Countdown';
import { PhotoGallery } from '@/components/PhotoGallery';
import { WeddingEvents } from '@/components/WeddingEvents';
import { Venue } from '@/components/Venue';
import { RSVP } from '@/components/RSVP';
import { ClosingScreen } from '@/components/ClosingScreen';
import { ScrollNav } from '@/components/ScrollNav';

type Phase = 'cover' | 'scratch' | 'main';

function App() {
  const [phase, setPhase] = useState<Phase>('cover');

  const handleEnter = useCallback(() => {
    setPhase('scratch');
  }, []);

  const handleRevealed = useCallback(() => {
    setPhase('main');
    setTimeout(() => {
      document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  if (phase === 'cover') {
    return <CoverScreen onEnter={handleEnter} />;
  }

  if (phase === 'scratch') {
    return <ScratchCard onRevealed={handleRevealed} />;
  }

  return (
    <div className="relative bg-ivory">
      <ScrollNav />
      <main className="pt-0">
        <div id="countdown">
          <Countdown />
        </div>
        <div id="gallery">
          <PhotoGallery />
        </div>
        <div id="events">
          <WeddingEvents />
        </div>
        <div id="venue">
          <Venue />
        </div>
        <div id="rsvp">
          <RSVP />
        </div>
        <ClosingScreen />
      </main>
    </div>
  );
}

export default App;
