import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { menuCategories, MenuItem } from '../data/menu';
import { restaurantData } from '../data/restaurant';
import { getLiveMenuItems } from '../services/menuStore';

export const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => getLiveMenuItems());

  useEffect(() => {
    // Listen for live updates made via the Admin portal
    const handleMenuUpdate = (e: CustomEvent<MenuItem[]>) => {
      if (e.detail) {
        setMenuItems(e.detail);
      }
    };
    window.addEventListener('the_grey_menu_updated', handleMenuUpdate as EventListener);
    return () => {
      window.removeEventListener('the_grey_menu_updated', handleMenuUpdate as EventListener);
    };
  }, []);

  const filteredItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="bg-[#111215] text-[#F5F3EF] pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880] mb-3">
            <span>The Grey</span>
            <span aria-hidden="true">·</span>
            <span>Nathia Gali</span>
            <span aria-hidden="true">·</span>
            <span>Seasonal Offerings</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F3EF] tracking-tight mb-6">
            The Alpine Table
          </h1>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed max-w-2xl">
            Our kitchen draws inspiration from alpine simplicity and slow braises designed for cold hill weather. Freshly prepared, unhurried, and served in an intimate setting.
          </p>
        </div>

        {/* Category Tabs (Minimalist Segmented Control) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-white/10 no-scrollbar">
          {menuCategories.map((cat) => {
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

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 bg-[#14161A] border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-2xl text-[#F5F3EF] group-hover:text-[#C5A880] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <span className="font-sans text-sm tabular-nums text-[#C5A880] font-medium whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-[#8E8D8A] font-light leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#8E8D8A] uppercase tracking-wider text-[11px]">
                  <span>{item.categoryLabel}</span>
                  {item.dietary?.map((diet) => (
                    <React.Fragment key={diet}>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#C5A880]/90">{diet}</span>
                    </React.Fragment>
                  ))}
                </div>

                {item.isSignature && (
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3" />
                    Signature
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dining Notes & Table Reservation Callout */}
        <div className="mt-16 p-8 sm:p-12 bg-[#0C0D0F] border border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-medium">
              Dietary & Allergens
            </span>
            <h3 className="font-serif text-2xl text-[#F5F3EF] mb-2">
              Bespoke Culinary Requests
            </h3>
            <p className="text-sm text-[#8E8D8A] font-light leading-relaxed">
              We cater to dietary preferences with advance notice. For private tasting arrangements or bespoke group dinners, please contact us or specify upon booking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              to="/reservations"
              className="px-8 py-3.5 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <span>Reserve a Table</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href={`tel:${restaurantData.phone}`}
              className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-[#F5F3EF] text-xs uppercase tracking-[0.2em] font-medium transition-colors text-center"
            >
              Call for Daily Specials
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
