import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackIconText?: string;
  aspectClass?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackIconText = 'THE GREY · NATHIA GALI',
  aspectClass = 'aspect-[16/9]',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
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
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#16171B] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
    </div>
  );
};
