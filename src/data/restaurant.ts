/**
 * THE GREY · CENTRAL RESTAURANT CONFIGURATION
 * 
 * Edit this central file to update all business details, contact information,
 * operating hours, and location links across the entire website.
 */

export interface RestaurantConfig {
  name: string;
  tagline: string;
  description: string;
  location: string;
  address: string;
  region: string;
  country: string;
  elevation: string;
  phone: string;
  displayPhone: string;
  email: string;
  instagram: string;
  instagramHandle: string;
  instagramUrl: string;
  boutiqueSpace: string;
  googleMapsUrl: string;
  priceRange: string;
  hours: {
    days: string;
    hours: string;
  }[];
  features: string[];
  publicNotes: {
    tripadvisorNote: string;
    googleRatingNote: string;
  };
}

export const restaurantData: RestaurantConfig = {
  name: "The Grey",
  tagline: "A Table in the Hills",
  description: "A quiet mountain luxury dining space nestled amongst the pine canopies and mountain mist of Nathia Gali.",
  location: "Nathia Gali",
  address: "Upper Nathia Gali Rd",
  region: "Khyber Pakhtunkhwa",
  country: "Pakistan",
  elevation: "2,410 meters (7,900 ft)",
  phone: "+923264649991",
  displayPhone: "0326 4649991",
  email: "contact@thegrey.pk",
  instagram: "the.grey.pk",
  instagramHandle: "@the.grey.pk",
  instagramUrl: "https://www.instagram.com/the.grey.pk",
  boutiqueSpace: "@thedenathia",
  googleMapsUrl: "https://maps.google.com/?q=The+Grey+Upper+Nathia+Gali+Rd+Nathia+Gali",
  priceRange: "Rs 2,000 – 3,500 per guest",
  hours: [
    {
      days: "Monday – Thursday",
      hours: "11:00 AM – 1:00 AM",
    },
    {
      days: "Friday – Sunday",
      hours: "11:00 AM – 1:30 AM",
    },
  ],
  features: [
    "Fireplace & Ambient Heating",
    "Floor-to-Ceiling Pine Views",
    "Outdoor Terrace (Weather Permitting)",
    "Bespoke Table Reservations",
    "High Chairs Available",
    "Private Dining Inquiries",
  ],
  publicNotes: {
    tripadvisorNote: "Rated 4.8 / 5 · Ranked among the premier dining destinations in Nathia Gali",
    googleRatingNote: "4.5 Stars · Over 1,900 community guest reviews",
  },
};
