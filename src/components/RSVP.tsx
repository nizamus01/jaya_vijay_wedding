import { useState } from 'react';
import { Heart, Send, Check, User, Users, MessageSquare, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { OrnamentalDivider } from '@/components/FloralDivider';

type RSVPStatus = 'idle' | 'submitting' | 'success' | 'error';

export function RSVP() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [status, setStatus] = useState<RSVPStatus>('idle');
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestsCount, setGuestsCount] = useState(1);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (attending === null) {
      setErrorMsg('Please let us know if you will attend.');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('rsvp').insert({
        name: name.trim(),
        attending,
        guests_count: guestsCount,
        message: message.trim() || null,
      });

      if (error) throw error;

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      );
    }
  };

  if (status === 'success') {
    return (
      <section
        ref={ref}
        className="relative py-20 px-6 bg-gradient-to-b from-champagne-light/30 via-ivory to-ivory-light"
      >
        <div
          className={`max-w-lg mx-auto text-center transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose/20 to-gold/20 border-2 border-gold/40 flex items-center justify-center mx-auto mb-8 animate-scale-in">
            <Heart className="w-10 h-10 text-rose" fill="currentColor" />
          </div>
          <h2 className="font-serif text-4xl text-green-dark mb-4">
            Thank You!
          </h2>
          <p className="font-cormorant text-xl text-green/60 italic mb-2">
            We can't wait to celebrate this beautiful day with you.
          </p>
          <OrnamentalDivider className="mt-8" />
          <p className="font-script text-3xl text-gold-dark mt-6">
            With Love, Jaya &amp; Vijay
          </p>

          <button
            onClick={() => {
              setStatus('idle');
              setName('');
              setAttending(null);
              setGuestsCount(1);
              setMessage('');
            }}
            className="mt-8 text-sm text-green/50 hover:text-green-dark transition-colors font-sans"
          >
            Submit another response
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 bg-gradient-to-b from-champagne-light/30 via-ivory to-ivory-light"
    >
      {/* Header */}
      <div
        className={`text-center mb-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <Heart className="w-8 h-8 text-rose mx-auto mb-4" strokeWidth={1} />
        <h2 className="font-serif text-4xl sm:text-5xl text-green-dark mb-3">
          Will You Join Us?
        </h2>
        <p className="font-cormorant text-lg text-green/50 italic">
          Your presence would make our celebration complete
        </p>
        <OrnamentalDivider className="mt-6" />
      </div>

      {/* Form */}
      <div
        className={`max-w-lg mx-auto transition-all duration-1000 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-ivory-light rounded-2xl p-8 shadow-luxe border border-gold/20 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block font-sans text-sm text-green-dark mb-2 tracking-wide">
              Your Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-dark" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-ivory border border-champagne-dark/30 text-green-dark placeholder:text-green/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                disabled={status === 'submitting'}
              />
            </div>
          </div>

          {/* Attending */}
          <div>
            <label className="block font-sans text-sm text-green-dark mb-3 tracking-wide">
              Will you attend?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                  attending === true
                    ? 'bg-green border-green text-ivory shadow-luxe'
                    : 'bg-ivory border-champagne-dark/30 text-green-dark hover:border-gold'
                }`}
                disabled={status === 'submitting'}
              >
                <Heart className="w-4 h-4" fill="currentColor" />
                <span className="font-sans text-sm">Yes, I'll be there</span>
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
                  attending === false
                    ? 'bg-rose/80 border-rose text-ivory shadow-luxe'
                    : 'bg-ivory border-champagne-dark/30 text-green-dark hover:border-gold'
                }`}
                disabled={status === 'submitting'}
              >
                <span className="font-sans text-sm">Sorry, can't make it</span>
              </button>
            </div>
          </div>

          {/* Guests count */}
          {attending === true && (
            <div className="animate-fade-in">
              <label className="block font-sans text-sm text-green-dark mb-2 tracking-wide">
                Number of Guests
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-dark" />
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-ivory border border-champagne-dark/30 text-green-dark focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all appearance-none cursor-pointer"
                  disabled={status === 'submitting'}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block font-sans text-sm text-green-dark mb-2 tracking-wide">
              Message <span className="text-green/40">(optional)</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gold-dark" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your wishes or a special message..."
                rows={3}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-ivory border border-champagne-dark/30 text-green-dark placeholder:text-green/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                disabled={status === 'submitting'}
              />
            </div>
          </div>

          {/* Error */}
          {status === 'error' && (
            <p className="text-sm text-rose-dark font-sans text-center">
              {errorMsg}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-green to-green-light text-ivory font-sans text-sm tracking-[0.2em] uppercase shadow-luxe hover:shadow-gold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send RSVP
              </>
            )}
          </button>

          {/* Success indicator hint */}
          <p className="text-center text-xs text-green/40 font-sans">
            <Check className="inline w-3 h-3 mr-1" />
            Your response will be sent directly to Jaya &amp; Vijay
          </p>
        </form>
      </div>
    </section>
  );
}
