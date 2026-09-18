export const WEDDING_DATE = new Date('2026-12-11T00:00:00+05:30');

export const VENUE = {
  name: 'Rasra, Uttar Pradesh',
  address: 'VR8W+3H, Rasra, Uttar Pradesh 221712',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=VR8W%2B3H+Rasra+Uttar+Pradesh+221712',
  embedUrl:
    'https://www.google.com/maps?q=VR8W%2B3H+Rasra+Uttar+Pradesh+221712&output=embed',
  lat: 25.9789,
  lng: 83.8493,
};

export const IMAGES = {
  logo: 'https://i.ibb.co/Kc9jj8F2/jaya-logo.jpg',
  gallery: [
    'https://i.ibb.co/xKmGCV5F/jaya-1.jpg',
    'https://i.ibb.co/xKZD2B7z/haldi.jpg',
    'https://i.ibb.co/nsHRRQ7F/jaya-2.jpg',
    'https://i.ibb.co/Y4HkNvJ3/ht.jpg',
    'https://i.ibb.co/JbffczP/jaya.jpg',
  ],
};

export const COUPLE = {
  bride: 'Jaya',
  groom: 'Vijay',
  dateLabel: '11 • 12 • 2026',
  dateShort: '11 Dec 2026',
};

export const EVENTS = [
  {
    id: 'haldi',
    name: 'Haldi',
    icon: 'sun',
    date: '10 December 2026',
    time: '9:00 AM onwards',
    venue: 'Family Residence, Rasra',
    description:
      'A joyous morning of turmeric, laughter, and blessings as the couple is adorned for the sacred vows ahead.',
  },
  {
    id: 'wedding',
    name: 'Wedding Ceremony',
    icon: 'flame',
    date: '11 December 2026',
    time: '7:00 PM',
    venue: 'Rasra, Uttar Pradesh',
    description:
      'The sacred union of two souls, witnessed by fire, family, and the blessings of generations.',
  },
  {
    id: 'reception',
    name: 'Reception',
    icon: 'sparkles',
    date: '12 December 2026',
    time: '6:00 PM onwards',
    venue: 'Rasra, Uttar Pradesh',
    description:
      'An evening of celebration, music, and feast as we welcome the newlyweds into a new chapter.',
  },
] as const;
