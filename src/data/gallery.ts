/**
 * THE GREY · GALLERY ASSET DIRECTORY
 * 
 * Curated photography reflecting the actual layout, dining experience,
 * and pine forest atmosphere of The Grey in Nathia Gali, Pakistan.
 */

export interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'exterior' | 'culinary' | 'atmosphere';
  categoryLabel: string;
  src: string;
  alt: string;
  aspect: 'landscape' | 'portrait' | 'square';
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Pine Deck & Lawn',
    category: 'exterior',
    categoryLabel: 'Exterior',
    src: '/src/assets/images/the_grey_patio_1790370363099.jpg',
    alt: 'Outdoor terrace and lawn seating surrounded by Himalayan pines at The Grey',
    aspect: 'landscape',
    caption: 'Outdoor lawn and deck seating surrounded by centuries-old Nathia Gali pines.',
  },
  {
    id: 'gal-2',
    title: 'Lodge Interior & View',
    category: 'interior',
    categoryLabel: 'Interior',
    src: '/src/assets/images/dining_warm_interior_1790368111714.jpg',
    alt: 'Warm interior dining area with window framing mountain pine trees',
    aspect: 'portrait',
    caption: 'Comfortable indoor dining with large windows looking out into the mist and trees.',
  },
  {
    id: 'gal-3',
    title: 'Specialty Coffee & Mountain Tea',
    category: 'culinary',
    categoryLabel: 'Culinary',
    src: '/src/assets/images/mountain_coffee_1790370377559.jpg',
    alt: 'Artisanal latte on wooden table overlooking Nathia Gali valley',
    aspect: 'landscape',
    caption: 'Freshly brewed specialty coffees, lattes, and mountain infusions served against scenic heights.',
  },
  {
    id: 'gal-4',
    title: 'Chalet on Upper Nathia Gali Rd',
    category: 'exterior',
    categoryLabel: 'Exterior',
    src: '/src/assets/images/the_grey_chalet_1790370407556.jpg',
    alt: 'The Grey modern wood and glass facade nestled in Nathia Gali pine forest',
    aspect: 'landscape',
    caption: 'Modern architectural pavilion nestled quietly within the Galliat forest.',
  },
  {
    id: 'gal-5',
    title: 'Himalayan Herb-Grilled Trout',
    category: 'culinary',
    categoryLabel: 'Culinary',
    src: '/src/assets/images/mountain_trout_1790370393281.jpg',
    alt: 'Grilled trout with fresh herbs and roasted baby potatoes',
    aspect: 'square',
    caption: 'Fresh grilled river trout with herbs and charred lemon, a highlands favorite.',
  },
  {
    id: 'gal-6',
    title: 'Evening Light at the Chalet',
    category: 'atmosphere',
    categoryLabel: 'Atmosphere',
    src: '/src/assets/images/hero_mountain_lodge_1790368092107.jpg',
    alt: 'The Grey glowing warmly at twilight amidst pine trees and fog',
    aspect: 'landscape',
    caption: 'Twilight settling across Upper Nathia Gali as warm interior lights welcome arriving guests.',
  },
  {
    id: 'gal-7',
    title: 'Mountain Grills & Braises',
    category: 'culinary',
    categoryLabel: 'Culinary',
    src: '/src/assets/images/culinary_mountain_dish_1790368127851.jpg',
    alt: 'Artisanal culinary preparation served on dark ceramic slate',
    aspect: 'square',
    caption: 'Carefully prepared steak cuts, slow roasts, and wild forest mushrooms.',
  },
  {
    id: 'gal-8',
    title: 'Quiet Highlands Atmosphere',
    category: 'atmosphere',
    categoryLabel: 'Atmosphere',
    src: '/src/assets/images/lodge_exterior_mist_1790368141854.jpg',
    alt: 'Forest mist drifting through the pine trees around the restaurant pavilion',
    aspect: 'landscape',
    caption: 'Cool mountain breezes, birdsong, and the calm rhythm of the Galliat.',
  },
];
