/**
 * THE GREY · SAMPLE MENU DATA
 * 
 * IMPORTANT NOTICE FOR RESTAURANT TEAM & DEVELOPERS:
 * This sample menu demonstrates layout, category filtering, dietary tags,
 * and pricing presentation. Please replace these sample dishes with The Grey's
 * actual seasonal menu offerings.
 */

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'pasta' | 'desserts' | 'drinks';
  categoryLabel: string;
  description: string;
  price: string;
  dietary?: string[];
  isSignature?: boolean;
}

export const menuCategories = [
  { id: 'all', label: 'All Offerings' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains & Grills' },
  { id: 'pasta', label: 'Handmade Pasta' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Beverages & Warm Infusions' },
] as const;

export const sampleMenuItems: MenuItem[] = [
  {
    id: 'str-1',
    name: 'Wild Forest Mushroom Tartlet',
    category: 'starters',
    categoryLabel: 'Starters',
    description: 'Caramelized shallot duxelles, thyme-infused ricotta, hand-rolled puff pastry, and pine honey glaze.',
    price: 'Rs 1,450',
    dietary: ['Vegetarian'],
    isSignature: true,
  },
  {
    id: 'str-2',
    name: 'Charred Burrata & Smoked Heirloom',
    category: 'starters',
    categoryLabel: 'Starters',
    description: 'Local mountain herbs, reduced balsamic glaze, crushed walnuts, and wood-fired sourdough crisps.',
    price: 'Rs 1,750',
    dietary: ['Vegetarian'],
  },
  {
    id: 'str-3',
    name: 'Crispy Brioche Prawn Toast',
    category: 'starters',
    categoryLabel: 'Starters',
    description: 'Hand-chopped tiger prawns, toasted black sesame, citrus herb emulsion, and micro greens.',
    price: 'Rs 1,890',
  },
  {
    id: 'main-1',
    name: 'Slow-Braised Mountain Shank',
    category: 'mains',
    categoryLabel: 'Mains & Grills',
    description: 'Twelve-hour tender lamb, bone marrow jus, velvety pomme purée, and glazed seasonal root vegetables.',
    price: 'Rs 3,450',
    isSignature: true,
  },
  {
    id: 'main-2',
    name: 'Pan-Seared Himalayan Trout',
    category: 'mains',
    categoryLabel: 'Mains & Grills',
    description: 'Crispy skin fresh catch, brown butter almond reduction, charred lemon, and baby asparagus.',
    price: 'Rs 2,950',
    dietary: ['Gluten-Free'],
  },
  {
    id: 'main-3',
    name: 'Charcoal-Grilled Ribeye Steak',
    category: 'mains',
    categoryLabel: 'Mains & Grills',
    description: 'Prime cut grilled over cedar charcoal, roasted garlic herb butter, and triple-cooked mountain wedges.',
    price: 'Rs 3,850',
    isSignature: true,
  },
  {
    id: 'main-4',
    name: 'Cedar Roasted Spiced Chicken',
    category: 'mains',
    categoryLabel: 'Mains & Grills',
    description: 'Free-range half chicken marinated with mountain wild sumac, served with garlic yogurt and flatbread.',
    price: 'Rs 2,650',
  },
  {
    id: 'pasta-1',
    name: 'Truffle & Forest Morel Pappardelle',
    category: 'pasta',
    categoryLabel: 'Handmade Pasta',
    description: 'Hand-rolled egg ribbons, shaved black summer truffle, mountain morels, and 24-month aged parmesan.',
    price: 'Rs 2,450',
    dietary: ['Vegetarian'],
    isSignature: true,
  },
  {
    id: 'pasta-2',
    name: 'Braised Duck Ragù Tagliatelle',
    category: 'pasta',
    categoryLabel: 'Handmade Pasta',
    description: 'Slow-simmered spiced duck confit, juniper berries, fresh sage, and pecorino romano.',
    price: 'Rs 2,650',
  },
  {
    id: 'pasta-3',
    name: 'Ricotta & Charred Lemon Ravioli',
    category: 'pasta',
    categoryLabel: 'Handmade Pasta',
    description: 'Delicate pasta parcels, brown butter sage emulsion, toasted pine nuts, and baby spinach.',
    price: 'Rs 2,150',
    dietary: ['Vegetarian'],
  },
  {
    id: 'des-1',
    name: 'Smoked Dark Chocolate Fondant',
    category: 'desserts',
    categoryLabel: 'Desserts',
    description: 'Warm molten 70% single-origin cacao core, salted caramel gelato, and toasted hazelnut crumble.',
    price: 'Rs 1,350',
    isSignature: true,
  },
  {
    id: 'des-2',
    name: 'Caramelized Mountain Apple Tarte Tatin',
    category: 'desserts',
    categoryLabel: 'Desserts',
    description: 'Murree hill apples gently stewed in vanilla pods, flaky butter crust, and house clotted cream.',
    price: 'Rs 1,250',
    dietary: ['Vegetarian'],
  },
  {
    id: 'des-3',
    name: 'Cardamom & Saffron Panna Cotta',
    category: 'desserts',
    categoryLabel: 'Desserts',
    description: 'Infused buffalo cream, wild berry compote, and crushed pistachio brittle.',
    price: 'Rs 1,150',
    dietary: ['Gluten-Free'],
  },
  {
    id: 'drk-1',
    name: 'The Grey Signature Kashmiri Kahwa',
    category: 'drinks',
    categoryLabel: 'Beverages & Warm Infusions',
    description: 'Steeped green tea leaves, green cardamom, whole cinnamon, crushed almonds, and organic saffron threads.',
    price: 'Rs 650',
    isSignature: true,
  },
  {
    id: 'drk-2',
    name: 'Spiced Mountain Hot Chocolate',
    category: 'drinks',
    categoryLabel: 'Beverages & Warm Infusions',
    description: 'Single-origin melted chocolate, whole steamed milk, hint of cinnamon bark, and torched marshmallow cream.',
    price: 'Rs 850',
  },
  {
    id: 'drk-3',
    name: 'Pine & Blackberry Sparkler',
    category: 'drinks',
    categoryLabel: 'Beverages & Warm Infusions',
    description: 'House-made pine needle syrup, crushed wild blackberries, lime zest, and sparkling mineral water.',
    price: 'Rs 750',
  },
  {
    id: 'drk-4',
    name: 'Artisanal Single-Origin Pour Over',
    category: 'drinks',
    categoryLabel: 'Beverages & Warm Infusions',
    description: 'Freshly roasted specialty beans brewed by the cup with notes of dark chocolate and dried stone fruit.',
    price: 'Rs 720',
  },
];
