import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Menu', path: '/menu' },
    { label: 'Story', path: '/story' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Reservations', path: '/reservations' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          isScrolled
            ? 'bg-[#111215]/95 backdrop-blur-md border-b border-white/5 py-4 shadow-xl'
            : 'bg-gradient-to-b from-[#0C0D0F]/80 via-[#0C0D0F]/30 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <Link
            to="/"
            className="group flex flex-col items-start focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
          >
            <span className="font-serif text-2xl tracking-[0.22em] text-[#F5F3EF] uppercase transition-colors group-hover:text-[#C5A880]">
              THE GREY
            </span>
            <span className="text-[10px] tracking-[0.28em] text-[#8E8D8A] uppercase font-sans">
              Nathia Gali
            </span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] ${
                    isActive
                      ? 'text-[#F5F3EF]'
                      : 'text-[#8E8D8A] hover:text-[#F5F3EF]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#C5A880]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-4">
            <Link
              to="/reservations"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.18em] text-[#F5F3EF] border border-[#C5A880]/40 hover:border-[#C5A880] hover:bg-[#C5A880]/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
            >
              <span>Reserve</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#F5F3EF] hover:text-[#C5A880] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-30 bg-[#0C0D0F]/98 backdrop-blur-xl flex flex-col justify-between pt-28 pb-12 px-8 md:hidden animate-fade-in"
        >
          <nav className="flex flex-col gap-6 items-start">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#8E8D8A]">
              Navigation
            </span>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-serif text-3xl tracking-wider transition-colors ${
                    isActive ? 'text-[#C5A880]' : 'text-[#F5F3EF] hover:text-[#C5A880]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 border-t border-white/10 flex flex-col gap-5">
            <Link
              to="/reservations"
              className="w-full text-center py-4 bg-[#C5A880] text-[#0C0D0F] font-medium tracking-[0.2em] text-xs uppercase hover:bg-[#D8BD97] transition-colors"
            >
              Make a Reservation
            </Link>
            <div className="flex items-center justify-between text-xs text-[#8E8D8A]">
              <span>Upper Nathia Gali Rd, Pakistan</span>
              <a
                href="https://www.instagram.com/the.grey.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5F3EF] transition-colors"
              >
                @the.grey.pk
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
