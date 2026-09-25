import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryItem } from '../data/gallery';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  const currentItem = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 bg-[#0C0D0F]/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-fade-in"
    >
      {/* Top Bar: Index counter and Close button */}
      <div className="flex items-center justify-between z-10 w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-xs tracking-[0.2em] text-[#8E8D8A] uppercase">
          <span className="text-[#C5A880]">{currentItem.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#8E8D8A] hover:text-[#F5F3EF] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Center Image Container with Previous & Next controls */}
      <div className="relative flex-1 flex items-center justify-center max-w-5xl w-full mx-auto my-4 overflow-hidden">
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:left-4 z-10 p-3 text-[#F5F3EF]/70 hover:text-[#F5F3EF] bg-[#111215]/50 hover:bg-[#111215] border border-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
        </button>

        <div className="max-h-[75vh] max-w-full flex items-center justify-center">
          <img
            src={currentItem.src}
            alt={currentItem.alt}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] max-w-full object-contain shadow-2xl transition-all duration-300"
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:right-4 z-10 p-3 text-[#F5F3EF]/70 hover:text-[#F5F3EF] bg-[#111215]/50 hover:bg-[#111215] border border-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6 stroke-[1.5]" />
        </button>
      </div>

      {/* Bottom Bar: Title & Caption */}
      <div className="w-full max-w-2xl mx-auto text-center pb-2">
        <h3 className="font-serif text-xl sm:text-2xl text-[#F5F3EF] mb-1">
          {currentItem.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#8E8D8A] font-light">
          {currentItem.caption}
        </p>
      </div>
    </div>
  );
};
