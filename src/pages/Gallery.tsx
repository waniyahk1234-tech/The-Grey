import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../data/gallery';
import { getLiveGalleryItems } from '../services/galleryStore';
import { Lightbox } from '../components/Lightbox';
import { SafeImage } from '../components/SafeImage';

export const Gallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(() => getLiveGalleryItems());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleUpdate = (e: CustomEvent<GalleryItem[]>) => {
      if (e.detail) setItems(e.detail);
    };
    window.addEventListener('the_grey_gallery_updated', handleUpdate as EventListener);
    return () => {
      window.removeEventListener('the_grey_gallery_updated', handleUpdate as EventListener);
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'interior', label: 'Interior' },
    { id: 'exterior', label: 'Architecture & Hills' },
    { id: 'culinary', label: 'Culinary' },
    { id: 'atmosphere', label: 'Atmosphere' },
  ];

  const filteredItems =
    selectedCategory === 'all'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const handleOpenPhoto = (item: GalleryItem) => {
    const originalIndex = items.findIndex((g) => g.id === item.id);
    setActiveIndex(originalIndex >= 0 ? originalIndex : 0);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-[#111215] text-[#F5F3EF] pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880] mb-3">
            <span>Visual Archive</span>
            <span aria-hidden="true">·</span>
            <span>The Grey</span>
            <span aria-hidden="true">·</span>
            <span>Nathia Gali</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F3EF] tracking-tight mb-6">
            Atmosphere & Form
          </h1>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed max-w-2xl">
            A photographic index of our space: where Himalayan mist gathers outside floor-to-ceiling glass, and warm candlelight embraces unhurried conversations.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-white/10 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] ${
                  isSelected
                    ? 'bg-[#C5A880] text-[#0C0D0F] font-medium'
                    : 'text-[#8E8D8A] hover:text-[#F5F3EF] bg-[#16171B]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Consistent Uniform Card Grid - Clean 4:3 Ratio */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenPhoto(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenPhoto(item);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View photo ${item.title}`}
              className="group cursor-pointer bg-[#14161A] border border-white/5 overflow-hidden flex flex-col justify-between hover:border-[#C5A880]/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
            >
              {/* Uniform 4:3 Aspect Ratio Image Frame */}
              <div className="relative aspect-[4/3] w-full bg-[#0C0D0F] overflow-hidden">
                <SafeImage
                  src={item.src}
                  alt={item.alt}
                  aspectClass="aspect-[4/3]"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle category badge on top */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-2.5 py-1 bg-[#0C0D0F]/85 backdrop-blur-sm text-[10px] uppercase tracking-widest text-[#C5A880] font-medium border border-white/5">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Overlay Caption on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0F]/95 via-[#0C0D0F]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <h3 className="font-serif text-lg text-[#F5F3EF] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#D4D0C7] font-light line-clamp-2">
                    {item.caption || item.alt}
                  </p>
                </div>
              </div>

              {/* Clean Uniform Card Footer */}
              <div className="p-4 bg-[#14161A] border-t border-white/5 flex items-center justify-between text-xs">
                <span className="font-serif text-[#F5F3EF] text-sm truncate mr-2">
                  {item.title}
                </span>
                <span className="text-[#8E8D8A] text-[11px] shrink-0 uppercase tracking-wider">
                  {item.categoryLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Photography */}
        <div className="mt-16 text-center text-xs text-[#8E8D8A] font-light max-w-md mx-auto">
          Photography captures the architectural mood, shifting highland weather, and culinary spirit of The Grey in Nathia Gali.
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={items}
        currentIndex={activeIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))
        }
        onNext={() =>
          setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))
        }
      />
    </div>
  );
};
