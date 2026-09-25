import React, { useState } from 'react';
import { CheckCircle2, Copy, Calendar, Clock, Users, MapPin, Phone, AlertCircle, Sparkles, Check } from 'lucide-react';
import { submitReservation, ReservationRequest, ReservationResponse, AUTHENTIC_TIME_SLOTS } from '../services/reservationService';
import { restaurantData } from '../data/restaurant';

export const Reservations: React.FC = () => {
  const [formData, setFormData] = useState<ReservationRequest>({
    fullName: '',
    phone: '',
    email: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow default
    timeSlot: '7:30 PM',
    guests: 2,
    seatingArea: 'indoor',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<ReservationResponse | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const timeSlots = AUTHENTIC_TIME_SLOTS;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      errs.phone = 'Please provide a valid contact phone number.';
    }
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please provide a valid email format.';
      }
    }
    if (!formData.date) {
      errs.date = 'Please choose a dining date.';
    }
    if (!formData.guests || formData.guests < 1 || formData.guests > 20) {
      errs.guests = 'Please select between 1 and 20 guests.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await submitReservation(formData);
      setConfirmation(response);
    } catch (err) {
      console.error('Reservation submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCode = () => {
    if (!confirmation) return;
    navigator.clipboard.writeText(confirmation.confirmationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="bg-[#111215] text-[#F5F3EF] pt-32 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[#C5A880] mb-3">
            <span>Table Reservations</span>
            <span aria-hidden="true">·</span>
            <span>The Grey</span>
            <span aria-hidden="true">·</span>
            <span>Nathia Gali</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F5F3EF] tracking-tight mb-4">
            Reserve Your Table
          </h1>
          <p className="text-base text-[#8E8D8A] font-light leading-relaxed">
            Due to our intimate layout and mountain climate, tables are held with care. Please let us know your preferred seating and dining time.
          </p>
        </div>

        {/* Successful Confirmation View */}
        {confirmation ? (
          <div className="p-8 sm:p-12 bg-[#14161A] border border-[#C5A880]/40 shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 text-emerald-400 mb-6">
              <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#C5A880]">
                Table Request Acknowledged
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-[#F5F3EF] mb-4">
              Thank You, {confirmation.data.fullName}.
            </h2>

            <p className="text-sm text-[#8E8D8A] font-light leading-relaxed max-w-xl mb-8">
              Your reservation inquiry for <strong className="text-[#F5F3EF]">{confirmation.data.guests} guests</strong> on{' '}
              <strong className="text-[#F5F3EF]">{confirmation.data.date}</strong> at{' '}
              <strong className="text-[#F5F3EF]">{confirmation.data.timeSlot}</strong> has been received by our host desk.
            </p>

            {/* Reference card */}
            <div className="p-6 bg-[#0C0D0F] border border-white/5 mb-8 max-w-md">
              <span className="text-[11px] uppercase tracking-widest text-[#8E8D8A] block mb-2">
                Booking Reference
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl sm:text-2xl text-[#C5A880] tracking-wider font-semibold">
                  {confirmation.confirmationCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 bg-[#1F2126] hover:bg-[#2C2E35] text-xs text-[#F5F3EF] flex items-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Reservation details summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8 mb-8 border-b border-white/5 text-xs text-[#8E8D8A]">
              <div>
                <span className="block text-[#C5A880] mb-1">Seating Area</span>
                <span className="capitalize text-[#F5F3EF]">
                  {confirmation.data.seatingArea.replace('-', ' ')}
                </span>
              </div>
              <div>
                <span className="block text-[#C5A880] mb-1">Contact Phone</span>
                <span className="text-[#F5F3EF]">{confirmation.data.phone}</span>
              </div>
              <div>
                <span className="block text-[#C5A880] mb-1">Contact Email</span>
                <span className="text-[#F5F3EF]">{confirmation.data.email}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setConfirmation(null)}
                className="px-6 py-3 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] text-xs uppercase tracking-[0.2em] font-medium transition-colors"
              >
                Make Another Booking
              </button>
              <a
                href={`tel:${restaurantData.phone}`}
                className="px-6 py-3 border border-white/20 hover:border-white/50 text-[#F5F3EF] text-xs uppercase tracking-[0.2em] font-medium transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Call Host Desk ({restaurantData.displayPhone})</span>
              </a>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 bg-[#14161A] p-8 sm:p-12 border border-white/5">
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-2">
                    Full Name <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Tariq Khan"
                    className={`w-full bg-[#0C0D0F] border px-4 py-3.5 text-sm text-[#F5F3EF] placeholder-[#5A5957] focus-visible:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-rose-500/80 focus-visible:border-rose-500'
                        : 'border-white/10 focus-visible:border-[#C5A880]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-400 mt-1.5">{errors.fullName}</p>
                  )}
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-2">
                      Phone Number <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="e.g. 0321 0000000"
                      className={`w-full bg-[#0C0D0F] border px-4 py-3.5 text-sm text-[#F5F3EF] placeholder-[#5A5957] focus-visible:outline-none transition-colors ${
                        errors.phone
                          ? 'border-rose-500/80 focus-visible:border-rose-500'
                          : 'border-white/10 focus-visible:border-[#C5A880]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-2">
                      Email Address <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="e.g. name@example.com"
                      className={`w-full bg-[#0C0D0F] border px-4 py-3.5 text-sm text-[#F5F3EF] placeholder-[#5A5957] focus-visible:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-500/80 focus-visible:border-rose-500'
                          : 'border-white/10 focus-visible:border-[#C5A880]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Date & Time Slot & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-2">
                      Date <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value });
                        if (errors.date) setErrors({ ...errors, date: '' });
                      }}
                      className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3.5 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                    />
                    {errors.date && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.date}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="timeSlot" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-2">
                      Time Slot <span className="text-[#C5A880]">*</span>
                    </label>
                    <select
                      id="timeSlot"
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3.5 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-[#14161A] text-[#F5F3EF]">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="guests" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-2">
                      Guests <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="guests"
                      type="number"
                      min={1}
                      max={20}
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                      className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3.5 text-sm text-[#F5F3EF] focus-visible:outline-none focus-visible:border-[#C5A880]"
                    />
                    {errors.guests && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.guests}</p>
                    )}
                  </div>
                </div>

                {/* Seating Preference */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-3">
                    Seating Area Preference
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'indoor', label: 'Indoor Dining Room', desc: 'Warm ambiance with forest views' },
                      { id: 'outdoor', label: 'Outdoor Pine Deck & Lawn', desc: 'Fresh mountain breeze (weather permitting)' },
                      { id: 'no-preference', label: 'First Available Table', desc: 'Best table assigned by host' },
                    ].map((area) => (
                      <label
                        key={area.id}
                        className={`p-4 border cursor-pointer transition-all flex flex-col justify-between ${
                          formData.seatingArea === area.id
                            ? 'bg-[#1D1F24] border-[#C5A880]'
                            : 'bg-[#0C0D0F] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="seatingArea"
                          value={area.id}
                          checked={formData.seatingArea === area.id}
                          onChange={() => setFormData({ ...formData, seatingArea: area.id as any })}
                          className="sr-only"
                        />
                        <span className="font-serif text-base text-[#F5F3EF] block mb-1">
                          {area.label}
                        </span>
                        <span className="text-[11px] text-[#8E8D8A]">
                          {area.desc}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="specialRequests" className="block text-xs uppercase tracking-wider text-[#8E8D8A] mb-2">
                    Special Inquiries or Dietary Notes (Optional)
                  </label>
                  <textarea
                    id="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder="Allergies, high chair requirement, birthday celebration, or arrival specifics..."
                    className="w-full bg-[#0C0D0F] border border-white/10 px-4 py-3 text-sm text-[#F5F3EF] placeholder-[#5A5957] focus-visible:outline-none focus-visible:border-[#C5A880]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 bg-[#C5A880] text-[#0C0D0F] hover:bg-[#D8BD97] disabled:opacity-50 text-xs uppercase tracking-[0.2em] font-medium transition-all text-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                  >
                    {isSubmitting ? 'Recording Inquiry...' : 'Submit Reservation Request'}
                  </button>
                </div>
              </form>
            </div>

            {/* Sidebar Information */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 bg-[#14161A] border border-white/5 space-y-4">
                <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] block font-medium">
                  Direct Inquiries
                </span>
                <h3 className="font-serif text-2xl text-[#F5F3EF]">
                  Same-Day Bookings
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8D8A] font-light leading-relaxed">
                  For bookings within the next 3 hours, please contact the host desk directly by phone for instant table availability.
                </p>
                <div className="pt-2">
                  <a
                    href={`tel:${restaurantData.phone}`}
                    className="text-sm text-[#F5F3EF] hover:text-[#C5A880] flex items-center gap-2 font-medium"
                  >
                    <Phone className="w-4 h-4 text-[#C5A880]" />
                    <span>{restaurantData.displayPhone}</span>
                  </a>
                </div>
              </div>

              <div className="p-8 bg-[#14161A] border border-white/5 space-y-3 text-xs text-[#8E8D8A] font-light">
                <span className="text-xs uppercase tracking-wider text-[#F5F3EF] font-medium block">
                  Table Policies
                </span>
                <p>• Tables are held for 20 minutes past booking time.</p>
                <p>• Valet assistance is available upon arrival on Upper Nathia Gali Road.</p>
                <p>• Warm attire is recommended as evenings in the Galliat drop significantly in temperature.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
