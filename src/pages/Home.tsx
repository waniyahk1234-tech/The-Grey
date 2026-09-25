import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown, MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { restaurantData } from '../data/restaurant';
import { MenuItem } from '../data/menu';
import { getLiveMenuItems } from '../services/menuStore';
import { galleryItems, GalleryItem } from '../data/gallery';
import { sampleGuestImpressions } from '../data/testimonials';
import { Lightbox } from '../components/Lightbox';
import { SafeImage } from '../components/SafeImage';

export const Home: React.FC = () => {
  // Lightbox state for gallery previews
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [menuList, setMenuList] = useState<MenuItem[]>(() => getLiveMenuItems());

  useEffect(() => {
    const handleMenuUpdate = (e: CustomEvent<MenuItem[]>) => {
      if (e.detail) {
        setMenuList(e.detail);
      }
    };
    window.addEventListener('the_grey_menu_updated', handleMenuUpdate as EventListener);
    return () => {
      window.removeEventListener('the_grey_menu_updated', handleMenuUpdate as EventListener);
    };
  }, []);

  const previewGallery = galleryItems.slice(0, 4);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#111215] text-[#F5F3EF]">
      {/* ==================================================
          SECTION 0: HERO (Quiet Mountain Luxury)
          ================================================== */}
      <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 lg:px-12 overflow-hidden">
        {/* Background Image with Dark Vignette & Atmospheric Fog Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src="/src/assets/images/hero_mountain_lodge_1790368092107.jpg"
            alt="The Grey restaurant lodge in misty pine hills of Nathia Gali"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle gradient scrim for readability and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111215] via-[#111215]/60 to-[#0C0D0F]/70" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#111215]/30 to-[#111215]/90" />
        </div>

        {/* Top small kicker */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880]/90">
            <span>Galliat Hills</span>
            <span aria-hidden="true">·</span>
            <span>2,410M Elevation</span>
            <span aria-hidden="true">·</span>
            <span>Nathia Gali</span>
          </div>
        </div>

        {/* Hero Center Editorial Composition */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8E8D8A] block mb-4">
              {restaurantData.name}
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.04] text-[#F5F3EF] mb-6 text-balance">
              A Table in the Hills.
            </h1>
            <p className="text-base sm:text-lg text-[#D4D0C7] font-light max-w-xl leading-relaxed mb-10">
              Where mountain mist meets an unhurried table. Warm fires, dark timber, and unhurried culinary craft high above the valley.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/reservations"
                className="px-8 py-4 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-[0.2em] font-medium transition-all text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                Reserve a Table
              </Link>
              <Link
                to="/menu"
                className="px-8 py-4 border border-white/20 hover:border-white/60 text-[#F5F3EF] text-xs uppercase tracking-[0.2em] font-medium transition-all text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
              >
                Explore The Menu
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar / Scroll Cue */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 flex items-center justify-between border-t border-white/10 text-xs text-[#8E8D8A]">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Upper Nathia Gali Rd, Pakistan</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>Open Daily from 11:00 AM</span>
          </div>

          <a
            href="#introduction"
            className="flex items-center gap-2 hover:text-[#F5F3EF] transition-colors"
            aria-label="Scroll to introduction"
          >
            <span className="tracking-widest uppercase text-[10px]">Scroll Down</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ==================================================
          SECTION 1: INTRODUCTION
          ================================================== */}
      <section id="introduction" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-3 font-medium">
              The Prelude
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F3EF] leading-snug mb-6 text-balance">
              Where mountain air meets an unhurried table.
            </h2>
            <p className="text-sm sm:text-base text-[#8E8D8A] font-light leading-relaxed mb-6">
              Perched high upon the pine slopes of Nathia Gali, The Grey was conceived as a refuge from the noise of the plains below. Here, the temperature cools, the mist gathers outside floor-to-ceiling glass, and meals unfold at a deliberate, relaxed tempo.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="relative group overflow-hidden border border-white/5">
              <SafeImage
                src="/src/assets/images/dining_warm_interior_1790368111714.jpg"
                alt="Intimate dining room inside The Grey with mountain view"
                aspectClass="aspect-[16/10]"
                className="transform group-hover:scale-102 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 2: THE EXPERIENCE (Three Pillars)
          ================================================== */}
      <section className="py-24 bg-[#0C0D0F] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="mb-16 max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-medium">
              Sanctuary in the Pines
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F3EF]">
              Three elements of an evening at The Grey.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Pillar 1 */}
            <div className="flex flex-col justify-between p-8 bg-[#14161A] border border-white/5 group hover:border-[#C5A880]/30 transition-colors">
              <div>
                <span className="font-serif text-3xl text-[#C5A880]/60 mb-6 block font-light">
                  01
                </span>
                <h3 className="font-serif text-2xl text-[#F5F3EF] mb-3">
                  The Place
                </h3>
                <p className="text-sm text-[#8E8D8A] font-light leading-relaxed mb-6">
                  Surrounded by centuries-old Himalayan pines, steep ridges, and the ever-shifting mountain mist that encloses Nathia Gali in quiet tranquility.
                </p>
              </div>
              <div className="text-xs text-[#C5A880] uppercase tracking-widest pt-4 border-t border-white/5">
                Nathia Gali Ridge
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex flex-col justify-between p-8 bg-[#14161A] border border-white/5 group hover:border-[#C5A880]/30 transition-colors">
              <div>
                <span className="font-serif text-3xl text-[#C5A880]/60 mb-6 block font-light">
                  02
                </span>
                <h3 className="font-serif text-2xl text-[#F5F3EF] mb-3">
                  The Table
                </h3>
                <p className="text-sm text-[#8E8D8A] font-light leading-relaxed mb-6">
                  Low, warm ambient lighting that respects the shadows. Intimate seating arrangements where conversation flows without hurry or intrusion.
                </p>
              </div>
              <div className="text-xs text-[#C5A880] uppercase tracking-widest pt-4 border-t border-white/5">
                Intimate Dining
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex flex-col justify-between p-8 bg-[#14161A] border border-white/5 group hover:border-[#C5A880]/30 transition-colors">
              <div>
                <span className="font-serif text-3xl text-[#C5A880]/60 mb-6 block font-light">
                  03
                </span>
                <h3 className="font-serif text-2xl text-[#F5F3EF] mb-3">
                  The Craft
                </h3>
                <p className="text-sm text-[#8E8D8A] font-light leading-relaxed mb-6">
                  A menu designed for cold mountain evenings: slow-braised cuts, handmade pastas, fragrant kahwa, and warm single-origin desserts.
                </p>
              </div>
              <div className="text-xs text-[#C5A880] uppercase tracking-widest pt-4 border-t border-white/5">
                Honest Cuisine
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 3: SIGNATURE MENU PREVIEW
          ================================================== */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-medium">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F3EF]">
              The Seasonal Table
            </h2>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#D8BD97] transition-colors py-1 group"
          >
            <span>View Full Menu</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Menu preview grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {menuList.filter((item) => item.isSignature).slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="p-6 bg-[#14161A]/80 border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#F5F3EF]">
                    {item.name}
                  </h3>
                  <span className="font-sans text-sm tabular-nums text-[#C5A880] font-medium whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#8E8D8A] font-light leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#8E8D8A] uppercase tracking-wider pt-3 border-t border-white/5">
                <span>{item.categoryLabel}</span>
                {item.dietary?.map((tag) => (
                  <React.Fragment key={tag}>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#C5A880]/80">{tag}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-[#8E8D8A] font-light max-w-md mx-auto mb-6">
            Demonstration menu items. All dishes are prepared fresh to order. Please notify our staff of any allergens or dietary preferences.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/20 hover:border-[#C5A880] text-xs uppercase tracking-[0.2em] text-[#F5F3EF] hover:text-[#C5A880] transition-colors"
          >
            <span>Explore All Categories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ==================================================
          SECTION 4: ATMOSPHERE (Editorial Layered Composition)
          ================================================== */}
      <section className="relative py-28 sm:py-36 bg-[#0C0D0F] border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image */}
            <div className="lg:col-span-7 relative">
              <div className="border border-white/10 shadow-2xl overflow-hidden">
                <SafeImage
                  src="/src/assets/images/lodge_exterior_mist_1790368141854.jpg"
                  alt="A-frame pavilion of The Grey in thick mountain fog"
                  aspectClass="aspect-[16/10]"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Editorial Statement */}
            <div className="lg:col-span-5 lg:-ml-8 z-20">
              <div className="bg-[#14161A] p-8 sm:p-12 border border-white/10 shadow-2xl backdrop-blur-md">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-3 font-medium">
                  The Atmosphere
                </span>
                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F5F3EF] leading-tight mb-6">
                  &ldquo;Come for the mountains. Stay for the table.&rdquo;
                </blockquote>
                <p className="text-sm text-[#8E8D8A] font-light leading-relaxed mb-6">
                  At 7,900 feet, weather becomes a companion to dining. Thick clouds pass across the cedar glass frames while inside, the warmth of the hearth and the aroma of roasted spices fill the air.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#C5A880]">
                  <span>Alpine Architecture</span>
                  <span aria-hidden="true">·</span>
                  <span>Panoramic Valley Views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 5: GALLERY PREVIEW (Asymmetric with Lightbox)
          ================================================== */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-medium">
              Visual Archive
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F3EF]">
              Frames from Nathia Gali
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-[#D8BD97] transition-colors py-1 group"
          >
            <span>Full Gallery ({galleryItems.length} Photographs)</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Asymmetrical 4-image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewGallery.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View photo: ${item.title}`}
              className="group cursor-pointer overflow-hidden bg-[#14161A] border border-white/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <SafeImage
                  src={item.src}
                  alt={item.alt}
                  aspectClass="aspect-[4/5]"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0F]/90 via-[#0C0D0F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] mb-1">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-serif text-lg text-[#F5F3EF]">
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 6: OUR STORY (Editorial Split Layout)
          ================================================== */}
      <section className="py-24 bg-[#0C0D0F] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Story text */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
                The Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F5F3EF] leading-tight">
                Quiet luxury, crafted for the Galliat highlands.
              </h2>
              <p className="text-sm sm:text-base text-[#8E8D8A] font-light leading-relaxed">
                Nathia Gali has always held a special mystique: the fragrant pine breezes, the winding roads of Upper Nathia Gali, and the rapid descent of evening mist. The Grey was founded to complement that landscape with a dining environment of equal quietude.
              </p>
              <p className="text-sm sm:text-base text-[#8E8D8A] font-light leading-relaxed">
                Rather than competing with the elements outside, our architecture embraces them. High-pitched dark wood ceilings, ambient lamps, and soft seating create an environment where conversation deepens as the mountain cold settles in.
              </p>
              <div className="pt-4">
                <Link
                  to="/story"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#F5F3EF] hover:text-[#C5A880] transition-colors py-2 border-b border-white/20 hover:border-[#C5A880]"
                >
                  <span>Read Our Philosophy</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Story Image */}
            <div className="lg:col-span-6">
              <div className="relative border border-white/10 overflow-hidden shadow-2xl">
                <SafeImage
                  src="/src/assets/images/culinary_mountain_dish_1790368127851.jpg"
                  alt="Culinary presentation at The Grey with wild mountain mushrooms"
                  aspectClass="aspect-[4/3]"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 7: GUEST NOTES (Tasteful Testimonials)
          ================================================== */}
      <section className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-medium">
            Guest Impressions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F3EF]">
            Echoes from the Hills
          </h2>
          <p className="text-xs text-[#8E8D8A] mt-2">
            Sample impressions reflecting the atmosphere of The Grey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sampleGuestImpressions.map((note) => (
            <div
              key={note.id}
              className="p-8 bg-[#14161A] border border-white/5 flex flex-col justify-between"
            >
              <p className="font-serif text-lg text-[#D4D0C7] font-light leading-relaxed mb-8 italic">
                &ldquo;{note.quote}&rdquo;
              </p>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#8E8D8A]">
                <span>{note.context}</span>
                <span className="text-[#C5A880]/80">{note.season}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================
          SECTION 8: LOCATION & ESSENTIALS
          ================================================== */}
      <section className="py-24 bg-[#0C0D0F] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
                The Destination
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F3EF]">
                Upper Nathia Gali Road
              </h2>
              <p className="text-sm text-[#8E8D8A] font-light leading-relaxed">
                Located on the historic upper ridge of Nathia Gali, accessible via the main Murree-Abbottabad scenic highway. Safe parking and covered arrival available.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3 text-sm text-[#D4D0C7]">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>{restaurantData.address}, {restaurantData.location}, {restaurantData.region}, {restaurantData.country}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#D4D0C7]">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>{restaurantData.displayPhone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#D4D0C7]">
                  <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <span>Open Daily from 11:00 AM until late</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href={restaurantData.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#1F2126] hover:bg-[#2C2E35] border border-white/10 text-xs uppercase tracking-wider text-[#F5F3EF] inline-flex items-center gap-2 transition-colors"
                >
                  <span>Google Maps Directions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </a>
                <a
                  href={restaurantData.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/10 hover:border-white/30 text-xs uppercase tracking-wider text-[#F5F3EF] inline-flex items-center gap-2 transition-colors"
                >
                  <span>Instagram {restaurantData.instagramHandle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </a>
              </div>
            </div>

            {/* Stylized Mountain Map Card */}
            <div className="lg:col-span-7">
              <div className="p-8 bg-[#14161A] border border-white/5 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <span className="font-serif text-xl text-[#F5F3EF]">
                    Mountain Travel Guide
                  </span>
                  <span className="text-xs text-[#C5A880] uppercase tracking-wider">
                    Elevation 7,900 ft
                  </span>
                </div>

                <div className="space-y-4 text-xs text-[#8E8D8A] font-light leading-relaxed">
                  <div className="p-4 bg-[#111215] border border-white/5">
                    <strong className="text-[#F5F3EF] font-medium block mb-1">
                      From Islamabad / Rawalpindi
                    </strong>
                    Approx. 2.5 to 3 hours drive via Murree Expressway / Abbottabad Road. Mountain weather can change quickly; warm coats recommended year-round in the evening.
                  </div>
                  <div className="p-4 bg-[#111215] border border-white/5">
                    <strong className="text-[#F5F3EF] font-medium block mb-1">
                      From Abbottabad
                    </strong>
                    Approx. 1 hour scenic ascent through dense pine forest reserves.
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#8E8D8A] pt-2">
                  <span>Valet & Parking Available</span>
                  <span>Indoor Hearth Seating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          SECTION 9: RESERVATION CTA (Dramatic Full-Width)
          ================================================== */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-12 text-center bg-[#0C0D0F] border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
          <img
            src="/hero_mountain_lodge_1790368092107.jpg"
            alt="The Grey background"
            className="w-full h-full object-cover filter blur-sm scale-105"
          />
          <div className="absolute inset-0 bg-[#0C0D0F]/90" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] block mb-4 font-medium">
            Evening Sanctuary
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F3EF] tracking-tight mb-6">
            Your Table is Waiting.
          </h2>
          <p className="text-sm sm:text-base text-[#D4D0C7] font-light leading-relaxed mb-10">
            Due to our intimate layout and mountain demand, we recommend reserving your evening table in advance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/reservations"
              className="px-10 py-4 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-[0.2em] font-medium transition-all"
            >
              Make a Reservation
            </Link>
            <a
              href={`tel:${restaurantData.phone}`}
              className="px-10 py-4 border border-white/20 hover:border-white/50 text-[#F5F3EF] text-xs uppercase tracking-[0.2em] font-medium transition-all"
            >
              Call {restaurantData.displayPhone}
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox for Gallery previews */}
      <Lightbox
        items={galleryItems}
        currentIndex={activePhotoIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1))
        }
        onNext={() =>
          setActivePhotoIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0))
        }
      />
    </div>
  );
};
