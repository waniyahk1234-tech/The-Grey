import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Phone, Instagram, ShieldCheck } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0C0D0F] border-t border-white/5 text-[#F5F3EF] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          {/* Col 1: Wordmark & Poetic premise */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-serif text-3xl tracking-[0.25em] uppercase text-[#F5F3EF] block mb-3">
                {restaurantData.name}
              </span>
              <p className="text-sm text-[#8E8D8A] max-w-sm leading-relaxed mb-6 font-light">
                {restaurantData.tagline}. A quiet mountain luxury sanctuary nestled 2,410 meters high in the pines of Nathia Gali.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-[#8E8D8A]">
              <span>Galliat Range</span>
              <span aria-hidden="true">·</span>
              <span>Khyber Pakhtunkhwa</span>
              <span aria-hidden="true">·</span>
              <span>Pakistan</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-medium">
              Navigation
            </span>
            <Link to="/menu" className="text-sm text-[#D4D0C7] hover:text-[#C5A880] transition-colors py-1">
              Seasonal Menu
            </Link>
            <Link to="/story" className="text-sm text-[#D4D0C7] hover:text-[#C5A880] transition-colors py-1">
              Our Story
            </Link>
            <Link to="/gallery" className="text-sm text-[#D4D0C7] hover:text-[#C5A880] transition-colors py-1">
              Visual Archive
            </Link>
            <Link to="/reservations" className="text-sm text-[#D4D0C7] hover:text-[#C5A880] transition-colors py-1">
              Table Reservations
            </Link>
            <Link to="/contact" className="text-sm text-[#D4D0C7] hover:text-[#C5A880] transition-colors py-1">
              Location & Hours
            </Link>
            <Link to="/admin" className="text-sm text-[#8E8D8A] hover:text-[#C5A880] transition-colors py-1 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Admin Portal</span>
            </Link>
          </div>

          {/* Col 3: Hours & Direct Contact */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] mb-1 font-medium">
              Visiting The Grey
            </span>

            <div className="space-y-1.5 text-xs text-[#D4D0C7]">
              {restaurantData.hours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-white/5 pb-1">
                  <span className="text-[#8E8D8A]">{h.days}</span>
                  <span className="tabular-nums">{h.hours}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2 text-xs">
              <a
                href={`tel:${restaurantData.phone}`}
                className="inline-flex items-center gap-2 text-[#D4D0C7] hover:text-[#C5A880] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#8E8D8A]" />
                <span>{restaurantData.displayPhone}</span>
              </a>
              <a
                href={restaurantData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#D4D0C7] hover:text-[#C5A880] transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8E8D8A]" />
                <span>{restaurantData.address}, {restaurantData.location}</span>
                <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
              </a>
              <a
                href={restaurantData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#D4D0C7] hover:text-[#C5A880] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#8E8D8A]" />
                <span>Instagram: {restaurantData.instagramHandle}</span>
                <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E8D8A] gap-4">
          <p>© {new Date().getFullYear()} {restaurantData.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#F5F3EF] cursor-pointer">Privacy & Terms</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#8E8D8A]/70">Boutique Mountain Experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
