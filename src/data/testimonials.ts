/**
 * THE GREY · GUEST IMPRESSIONS (DEMO ARCHITECTURE)
 * 
 * NOTE FOR RESTAURANT MANAGEMENT:
 * Replace these demo impressions with verified guest testimonials from your
 * guest book or official feedback channels.
 */

export interface GuestImpression {
  id: string;
  quote: string;
  context: string;
  season: string;
  isVerifiedDemo?: boolean;
}

export const sampleGuestImpressions: GuestImpression[] = [
  {
    id: 'note-1',
    quote: "Quiet conversations over slow tea while the fog rolls across the pine ridge. There is nothing else quite like this atmosphere in the Galliat hills.",
    context: "Dinner Guest",
    season: "Autumn Fog",
    isVerifiedDemo: true,
  },
  {
    id: 'note-2',
    quote: "The contrast between the freezing mountain air outside and the warm, dark timber interior within creates an immediate sense of sanctuary.",
    context: "Evening Table",
    season: "Winter Hearth",
    isVerifiedDemo: true,
  },
  {
    id: 'note-3',
    quote: "An architectural gem in Nathia Gali. The lighting is deliberate, the food is deeply comforting, and the unhurried service lets you truly rest.",
    context: "Weekend Guest",
    season: "Monsoon Mist",
    isVerifiedDemo: true,
  },
];
