import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, ArrowUpRight, Copy, Check, Clock } from 'lucide-react';
import { restaurantData } from '../data/restaurant';

export const Contact: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Private Dining',
    message: '',
  });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="bg-[#111215] text-[#F5F3EF] pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880] mb-3">
            <span>Contact & Arrival</span>
            <span aria-hidden="true">·</span>
            <span>The Grey</span>
            <span aria-hidden="true">·</span>
            <span>Nathia Gali</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F3EF] tracking-tight mb-6">
            Finding The Table
          </h1>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed max-w-2xl">
            Located high in the pine ridges of Upper Nathia Gali. Whether you are traveling from Islamabad or Abbottabad, we are here to welcome you.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Card 1: Address */}
          <div className="p-8 bg-[#14161A] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#1D1F24] flex items-center justify-center mb-6">
                <MapPin className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl text-[#F5F3EF] mb-2">Location</h3>
              <p className="text-sm text-[#8E8D8A] font-light mb-6">
                {restaurantData.address}<br />
                {restaurantData.location}, {restaurantData.region}<br />
                {restaurantData.country}
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <a
                href={restaurantData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-[#C5A880] hover:text-[#D8BD97] inline-flex items-center gap-1.5"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => handleCopy(`${restaurantData.address}, ${restaurantData.location}, Pakistan`, 'addr')}
                className="text-xs uppercase tracking-wider text-[#8E8D8A] hover:text-[#F5F3EF] inline-flex items-center gap-1"
              >
                {copiedType === 'addr' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'addr' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Phone & Host Desk */}
          <div className="p-8 bg-[#14161A] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#1D1F24] flex items-center justify-center mb-6">
                <Phone className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl text-[#F5F3EF] mb-2">Telephone</h3>
              <p className="text-sm text-[#8E8D8A] font-light mb-6">
                Direct inquiries, same-day tables, and route assistance.
              </p>
              <span className="font-mono text-xl text-[#F5F3EF] tracking-wider block mb-2">
                {restaurantData.displayPhone}
              </span>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <a
                href={`tel:${restaurantData.phone}`}
                className="text-xs uppercase tracking-wider text-[#C5A880] hover:text-[#D8BD97] inline-flex items-center gap-1.5"
              >
                <span>Call Now</span>
              </a>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={() => handleCopy(restaurantData.phone, 'phone')}
                className="text-xs uppercase tracking-wider text-[#8E8D8A] hover:text-[#F5F3EF] inline-flex items-center gap-1"
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Social & Boutique */}
          <div className="p-8 bg-[#14161A] border border-white/5 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#1D1F24] flex items-center justify-center mb-6">
                <Instagram className="w-5 h-5 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-2xl text-[#F5F3EF] mb-2">Digital Presence</h3>
              <p className="text-sm text-[#8E8D8A] font-light mb-6">
                Follow our seasonal stories, weather conditions, and boutique space updates.
              </p>
              <div className="text-xs text-[#D4D0C7] space-y-1">
                <div>Instagram: <span className="text-[#C5A880]">{restaurantData.instagramHandle}</span></div>
                <div>Boutique: <span className="text-[#C5A880]">{restaurantData.boutiqueSpace}</span></div>
              </div>
            </div>
            <div className="pt-4 border-t border-white/5">
              <a
                href={restaurantData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-[#C5A880] hover:text-[#D8BD97] inline-flex items-center gap-1.5"
              >
                <span>Open Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Hours & Inquiries Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Operating Schedule */}
          <div className="lg:col-span-5 bg-[#14161A] p-8 sm:p-12 border border-white/5 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A880]">
              <Clock className="w-4 h-4" />
              <span>Service Hours</span>
            </div>
            <h2 className="font-serif text-3xl text-[#F5F3EF]">
              When We Are Open
            </h2>
            <p className="text-sm text-[#8E8D8A] font-light leading-relaxed">
              We open each morning for mountain coffee and light fare, transitioning into our warm dinner service through midnight.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5">
              {restaurantData.hours.map((item, idx) => (
                <div key={idx} className="flex justify-between items-baseline py-2 border-b border-white/5 text-sm">
                  <span className="text-[#F5F3EF] font-medium">{item.days}</span>
                  <span className="tabular-nums text-[#C5A880]">{item.hours}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 text-xs text-[#8E8D8A] space-y-1.5 font-light">
              <p>• Kitchen accepts final orders 45 minutes prior to close.</p>
              <p>• Outdoor seating depends on mountain fog and winter conditions.</p>
            </div>
          </div>

          {/* Private Dining / Direct Note Form */}
          <div className="lg:col-span-7 bg-[#14161A] p-8 sm:p-12 border border-white/5">
            <span className="text-xs uppercase tracking-wider text-[#C5A880] block mb-2">
              Private Dining & Special Inquiries
            </span>
            <h2 className="font-serif text-3xl text-[#F5F3EF] mb-4">
              Connect with Our Host
            </h2>

            {inquirySent ? (
              <div className="p-8 bg-[#111215] border border-[#C5A880]/30 text-center animate-fade-in">
                <h3 className="font-serif text-2xl text-[#F5F3EF] mb-2">
                  Inquiry Dispatched
                </h3>
                <p className="text-sm text-[#8E8D8A] font-light mb-6">
                  Thank you, {inquiryData.name}. Our hospitality team in Nathia Gali will review your note and respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setInquirySent(false)}
                  className="px-6 py-2.5 bg-[#C5A880] text-[#0C0D0F] text-xs uppercase tracking-wider font-medium"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiryName" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="inquiryName"
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="e.g. Ayesha Malik"
                      className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryEmail" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="inquiryEmail"
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="e.g. ayesha@example.com"
                      className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiryPhone" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      id="inquiryPhone"
                      type="tel"
                      value={inquiryData.phone}
                      onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                      placeholder="e.g. 0300 0000000"
                      className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquirySubject" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-1.5">
                      Nature of Inquiry
                    </label>
                    <select
                      id="inquirySubject"
                      value={inquiryData.subject}
                      onChange={(e) => setInquiryData({ ...inquiryData, subject: e.target.value })}
                      className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                    >
                      <option value="Private Dining">Private Dining Booking</option>
                      <option value="Event Hosting">Intimate Event Hosting</option>
                      <option value="Press & Media">Photography & Media</option>
                      <option value="General Note">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiryMessage" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="inquiryMessage"
                    rows={4}
                    required
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder="Details about your date, guest count, or special requests..."
                    className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
