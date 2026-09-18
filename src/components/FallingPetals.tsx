import { useMemo } from 'react';

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export function FallingPetals({ count = 12 }: { count?: number }) {
  const petals = useMemo<Petal[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 6 + Math.random() * 10,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
            <path
              d="M10 2 C12 6 16 8 10 18 C4 8 8 6 10 2 Z"
              fill="#c5a55a"
              opacity="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
