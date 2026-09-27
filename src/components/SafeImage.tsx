import React, { useState, useEffect, useRef } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackIconText?: string;
  aspectClass?: string;
  priority?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackIconText = 'THE GREY · NATHIA GALI',
  aspectClass = 'aspect-[16/9]',
  priority = false,
  rootMargin = '250px 0px',
  threshold = 0.01,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState<boolean>(() => priority);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for viewport-triggered lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, // viewport
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [priority, isInView, rootMargin, threshold]);

  // Normalize path for Vercel production deployment: /src/assets/images/... -> /images/...
  const resolvedSrc = React.useMemo(() => {
    if (!src) return '';
    let s = src;
    if (s.startsWith('/src/assets/images/')) {
      s = s.replace(/^\/src\/assets\/images\//, '/images/');
    }
    // Prefer modern high-performance webp if it's one of the known app assets
    if (s.endsWith('.jpg') && s.startsWith('/images/')) {
      return s.replace(/\.jpg$/, '.webp');
    }
    return s;
  }, [src]);

  // Fallback jpg source if webp fails
  const fallbackJpg = React.useMemo(() => {
    if (resolvedSrc.endsWith('.webp')) {
      return resolvedSrc.replace(/\.webp$/, '.jpg');
    }
    return undefined;
  }, [resolvedSrc]);

  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={`w-full bg-[#181A1F] border border-white/5 flex flex-col items-center justify-center p-6 text-center text-[#8E8D8A] select-none ${aspectClass} ${className}`}
        aria-label={alt}
      >
        <span className="font-serif text-lg tracking-[0.2em] text-[#C5A880]/80 uppercase mb-2">
          THE GREY
        </span>
        <span className="text-xs uppercase tracking-widest text-[#8E8D8A]">
          {fallbackIconText}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-[#14161A] ${aspectClass} ${className}`}
    >
      {/* Zero-CLS placeholder skeleton while waiting for intersection or image decoding */}
      {(!isInView || !isLoaded) && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#14161A] via-[#1C1F26] to-[#14161A] animate-pulse pointer-events-none" />
      )}

      {/* Picture is mounted strictly when the image enters or approaches viewport */}
      {isInView && (
        <picture>
          {resolvedSrc.endsWith('.webp') && (
            <source srcSet={resolvedSrc} type="image/webp" />
          )}
          {fallbackJpg && (
            <source srcSet={fallbackJpg} type="image/jpeg" />
          )}
          <img
            src={resolvedSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setHasError(true);
            }}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            {...rest}
          />
        </picture>
      )}
    </div>
  );
};
