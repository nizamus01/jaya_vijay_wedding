import { useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import { COUPLE } from '@/lib/constants';
import { OrnamentalDivider } from '@/components/FloralDivider';

interface ScratchCardProps {
  onRevealed: () => void;
}

export function ScratchCard({ onRevealed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const SCRATCH_THRESHOLD = 45;

  const getPos = useCallback((e: TouchEvent | MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  const drawScratch = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 35, 0, Math.PI * 2);
      ctx.fill();

      if (lastPos.current) {
        ctx.lineWidth = 70;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastPos.current.x, lastPos.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      lastPos.current = { x, y };
    },
    []
  );

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparent = 0;
    const total = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }

    const pct = (transparent / total) * 100;
    setProgress(pct);

    if (pct >= SCRATCH_THRESHOLD && !revealed) {
      setRevealed(true);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(0, 0, width, height);
      setTimeout(onRevealed, 800);
    }
  }, [revealed, onRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = containerRef.current;
    const w = container?.clientWidth || 320;
    const h = 200;

    canvas.width = w * 2;
    canvas.height = h * 2;

    // Draw the scratch overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#2d4a3e');
    gradient.addColorStop(0.5, '#3d6452');
    gradient.addColorStop(1, '#1f3528');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative pattern
    ctx.strokeStyle = 'rgba(197, 165, 90, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 0; j < canvas.height; j += 40) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }

    // Text on scratch layer
    ctx.fillStyle = 'rgba(232, 213, 183, 0.9)';
    ctx.font = '600 28px "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      'Scratch to Reveal',
      canvas.width / 2,
      canvas.height / 2 - 15
    );
    ctx.font = '400 16px "Inter", sans-serif';
    ctx.fillStyle = 'rgba(232, 213, 183, 0.6)';
    ctx.fillText(
      'A special day is waiting...',
      canvas.width / 2,
      canvas.height / 2 + 25
    );
  }, []);

  const handleStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      lastPos.current = null;
      const pos = getPos(e.nativeEvent as TouchEvent | MouseEvent);
      drawScratch(pos.x, pos.y);
    },
    [drawScratch, getPos]
  );

  const handleMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      const pos = getPos(e.nativeEvent as TouchEvent | MouseEvent);
      drawScratch(pos.x, pos.y);
    },
    [drawScratch, getPos]
  );

  const handleEnd = useCallback(() => {
    isDrawing.current = false;
    lastPos.current = null;
    checkProgress();
  }, [checkProgress]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-ivory via-ivory-light to-champagne-light/30">
      <div className="text-center mb-10">
        <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" strokeWidth={1} />
        <h2 className="font-serif text-3xl text-green-dark mb-3">
          A Special Day Awaits
        </h2>
        <p className="font-cormorant text-lg text-green/60 italic">
          Gently scratch the card below to reveal our wedding date
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-luxe border border-gold/30"
        style={{ aspectRatio: '16 / 10' }}
      >
        {/* Hidden content underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-champagne-light via-ivory to-champagne-light">
          <p className="font-cormorant text-green/50 text-sm tracking-[0.2em] uppercase mb-3">
            Save the Date
          </p>
          <p className="font-script text-5xl text-gold-dark">
            {COUPLE.dateLabel}
          </p>
          <div className="mt-4">
            <OrnamentalDivider />
          </div>
          <p className="font-cormorant text-green-dark text-lg mt-4">
            We're getting married!
          </p>
        </div>

        {/* Scratch canvas */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            className="scratch-canvas absolute inset-0 w-full h-full"
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
          />
        )}
      </div>

      {/* Progress hint */}
      {!revealed && progress > 5 && (
        <p className="mt-6 text-sm text-green/50 font-sans">
          {progress < SCRATCH_THRESHOLD
            ? `Keep scratching... ${Math.round(progress)}%`
            : 'Almost there!'}
        </p>
      )}

      {revealed && (
        <div className="mt-8 animate-fade-in-up">
          <p className="font-cormorant text-xl text-green-dark italic">
            The countdown begins...
          </p>
      </div>
      )}
    </div>
  );
}
