import { Flower2 } from 'lucide-react';

export function FloralDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`divider-ornament ${className}`}>
      <Flower2 className="w-5 h-5 text-gold/60" strokeWidth={1} />
    </div>
  );
}

export function OrnamentalDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
      <span className="text-gold text-xl">✦</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
    </div>
  );
}
