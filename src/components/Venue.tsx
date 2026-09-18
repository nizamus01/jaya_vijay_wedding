import { useRef, useEffect, useState } from 'react';
import { MapPin, Navigation, ExternalLink, Heart, Plus, Minus } from 'lucide-react';
import { VENUE } from '@/lib/constants';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { OrnamentalDivider } from '@/components/FloralDivider';

declare global {
  interface Window {
    GoogleMapsLoader?: {
      _loaded: boolean;
      load: (cb: () => void) => void;
    };
    google?: any;
  }
}

export function Venue() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !visible) return;

    const initMap = () => {
      if (!window.google?.maps || !mapRef.current) return;
      if (mapInstance.current) return;

      const latLng = { lat: VENUE.lat, lng: VENUE.lng };

      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        center: latLng,
        zoom: 14,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: window.google.maps.ControlPosition.TOP_RIGHT,
        },
        streetViewControl: true,
        streetViewControlOptions: {
          position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
        },
        zoomControl: false,
        fullscreenControl: true,
        styles: [
          { featureType: 'poi', stylers: [{ visibility: 'simplified' }] },
          { featureType: 'transit', stylers: [{ visibility: 'off' }] },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#2d4a3e' }],
          },
          {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f0ebe0' }],
          },
        ],
      });

      const marker = new window.google.maps.Marker({
        position: latLng,
        map: mapInstance.current,
        title: 'Wedding Venue',
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="font-family: 'Cormorant Garamond', serif; padding: 8px;"><p style="font-weight: 600; font-size: 16px; color: #2d4a3e; margin: 0 0 4px;">Wedding Venue</p><p style="font-size: 13px; color: #5a7d6e; margin: 0;">${VENUE.address}</p></div>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstance.current, marker);
      });

      setMapReady(true);
    };

    if (window.google?.maps) {
      initMap();
    } else if (window.GoogleMapsLoader) {
      window.GoogleMapsLoader.load(initMap);
    }
  }, [visible]);

  const handleZoomIn = () => {
    if (mapInstance.current) {
      const current = mapInstance.current.getZoom();
      mapInstance.current.setZoom(current + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstance.current) {
      const current = mapInstance.current.getZoom();
      mapInstance.current.setZoom(current - 1);
    }
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 bg-gradient-to-b from-ivory-light via-ivory to-champagne-light/30"
    >
      {/* Section header */}
      <div
        className={`text-center mb-12 transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <MapPin className="w-8 h-8 text-gold mx-auto mb-4" strokeWidth={1} />
        <h2 className="font-serif text-4xl sm:text-5xl text-green-dark mb-3">
          The Venue
        </h2>
        <p className="font-cormorant text-lg text-green/50 italic">
          Your presence is the most beautiful gift
        </p>
        <OrnamentalDivider className="mt-6" />
      </div>

      <div
        className={`max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Address card */}
        <div className="bg-ivory-light rounded-2xl p-8 shadow-luxe border border-gold/20 mb-8 text-center">
          <div className="flex items-start justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-gold-dark mt-1 flex-shrink-0" />
            <p className="font-cormorant text-xl text-green-dark leading-relaxed">
              {VENUE.address}
            </p>
          </div>

          <a
            href={VENUE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-green to-green-light text-ivory font-sans text-sm tracking-wide shadow-luxe hover:shadow-gold transition-all hover:scale-105"
          >
            <Navigation className="w-4 h-4" />
            Get Directions
          </a>
        </div>

        {/* Interactive map */}
        <div
          className="rounded-2xl overflow-hidden shadow-luxe border border-gold/20 relative"
          style={{ aspectRatio: '16 / 10' }}
        >
          {/* Map container */}
          <div ref={mapRef} className="w-full h-full" />

          {/* Loading state */}
          {!mapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-champagne-light/50">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
                <p className="font-cormorant text-sm text-green/60">
                  Loading map...
                </p>
              </div>
            </div>
          )}

          {/* Custom zoom controls */}
          {mapReady && (
            <div className="absolute right-3 bottom-20 sm:bottom-3 flex flex-col gap-1 z-10">
              <button
                onClick={handleZoomIn}
                className="w-10 h-10 rounded-lg glass border border-gold/30 flex items-center justify-center shadow-luxe hover:bg-gold/10 transition-colors"
                aria-label="Zoom in"
              >
                <Plus className="w-5 h-5 text-green-dark" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleZoomOut}
                className="w-10 h-10 rounded-lg glass border border-gold/30 flex items-center justify-center shadow-luxe hover:bg-gold/10 transition-colors"
                aria-label="Zoom out"
              >
                <Minus className="w-5 h-5 text-green-dark" strokeWidth={1.5} />
              </button>
            </div>
          )}

          {/* Floating address badge */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs glass rounded-xl p-4 border border-gold/30 shadow-luxe pointer-events-none">
            <div className="flex items-start gap-2">
              <Heart
                className="w-4 h-4 text-rose flex-shrink-0 mt-1"
                fill="currentColor"
              />
              <div>
                <p className="font-cormorant text-sm text-green-dark font-medium">
                  {VENUE.name}
                </p>
                <p className="font-sans text-xs text-green/60 mt-1">
                  {VENUE.address}
                </p>
                <a
                  href={VENUE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-gold-dark hover:text-gold transition-colors pointer-events-auto"
                >
                  Open in Maps
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
