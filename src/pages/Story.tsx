import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { restaurantData } from '../data/restaurant';
import { SafeImage } from '../components/SafeImage';

export const Story: React.FC = () => {
  return (
    <div className="bg-[#111215] text-[#F5F3EF] pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880] mb-3">
            <span>Our Story</span>
            <span aria-hidden="true">·</span>
            <span>The Grey</span>
            <span aria-hidden="true">·</span>
            <span>Nathia Gali</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F3EF] tracking-tight mb-6">
            A Table in the Hills.
          </h1>
          <p className="text-lg text-[#D4D0C7] font-light leading-relaxed">
            Conceived as an intimate sanctuary in the Galliat mountains, The Grey is defined by quietude, natural texture, and the luxury of an unhurried table.
          </p>
        </div>

        {/* Hero Narrative Image */}
        <div className="mb-24 border border-white/10 shadow-2xl overflow-hidden">
          <SafeImage
            src="/src/assets/images/hero_mountain_lodge_1790368092107.jpg"
            alt="The Grey lodge illuminated at dusk in Nathia Gali"
            aspectClass="aspect-[21/9]"
            className="w-full h-full object-cover"
          />
          <div className="p-4 bg-[#14161A] border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#8E8D8A] gap-2">
            <span>Upper Nathia Gali Road</span>
            <span>Elevation: 2,410 meters / 7,900 feet</span>
          </div>
        </div>

        {/* Narrative Chapters */}
        <div className="space-y-24 max-w-5xl mx-auto">
          {/* Chapter 01 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="md:col-span-4">
              <span className="font-serif text-4xl text-[#C5A880]/60 block mb-2 font-light">
                01
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
                The Setting
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F3EF] mt-2">
                Himalayan Pine Ridges
              </h2>
            </div>
            <div className="md:col-span-8 text-sm sm:text-base text-[#8E8D8A] font-light leading-relaxed space-y-4">
              <p>
                Nathia Gali is renowned for its dense evergreen forests, cool alpine breezes, and the dramatic fog that sweeps up from the valleys. To build here requires deep architectural humility: the structure must not overpower the surrounding nature.
              </p>
              <p>
                The Grey was envisioned to reflect the mountain itself. With deep charcoal timber, raw local stonework, and wide glass frames, the space lets the pines, clouds, and changing twilight light take center stage.
              </p>
            </div>
          </div>

          {/* Chapter 02: Image + Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="md:col-span-6 order-2 md:order-1">
              <div className="border border-white/10 shadow-xl overflow-hidden">
                <SafeImage
                  src="/src/assets/images/dining_warm_interior_1790368111714.jpg"
                  alt="Warm interior table at The Grey"
                  aspectClass="aspect-[4/3]"
                />
              </div>
            </div>
            <div className="md:col-span-6 order-1 md:order-2 space-y-4">
              <span className="font-serif text-4xl text-[#C5A880]/60 block font-light">
                02
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
                The Atmosphere
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F3EF]">
                Intimacy & Soft Shadows
              </h2>
              <p className="text-sm sm:text-base text-[#8E8D8A] font-light leading-relaxed">
                Rather than high-output white light or generic modern restaurant interiors, The Grey maintains a warm, amber-lit sanctuary. Low pendant lamps cast gentle pools of light over dark timber tables, allowing darkness to hold its gentle place.
              </p>
              <p className="text-sm sm:text-base text-[#8E8D8A] font-light leading-relaxed">
                Whether visiting during an autumn rain, winter snow, or a clear summer dusk, the interior offers an immediate feeling of shelter.
              </p>
            </div>
          </div>

          {/* Chapter 03 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="md:col-span-4">
              <span className="font-serif text-4xl text-[#C5A880]/60 block mb-2 font-light">
                03
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
                The Table
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F3EF] mt-2">
                Honest Hospitality
              </h2>
            </div>
            <div className="md:col-span-8 text-sm sm:text-base text-[#8E8D8A] font-light leading-relaxed space-y-4">
              <p>
                Dining in the hills is inherently different from city dining. When you step inside from a brisk mountain wind, food is about warmth, comfort, and nourishment.
              </p>
              <p>
                Our kitchen balances slow-cooked braises and rich handmade pasta with fragrant local mountain teas and warm infusions. We honor the time our guests spend here—service is attentive, unhurried, and genuinely hospitable.
              </p>
            </div>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="mt-24 p-10 sm:p-16 bg-[#0C0D0F] border border-white/5 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block mb-3 font-medium">
            Join Us in Nathia Gali
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F3EF] mb-4">
            Experience an Unhurried Evening
          </h3>
          <p className="text-sm text-[#8E8D8A] font-light max-w-lg mx-auto mb-8 leading-relaxed">
            Reserve your table for an evening of quiet luxury, ambient fire warmth, and honest culinary craft.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/reservations"
              className="px-8 py-3.5 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Book a Table
            </Link>
            <Link
              to="/menu"
              className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-[#F5F3EF] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
            >
              Explore Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
