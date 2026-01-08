import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  lazy?: boolean;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  lazy = true,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`relative overflow-hidden`}>
      {isInView && (
        <>
          {!hasError ? (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes={sizes}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => setIsLoaded(true)}
              onError={handleError}
              className={`transition-opacity duration-300 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              } ${className}`}
            />
          ) : (
            <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
              <span className="text-gray-500 text-sm">Image unavailable</span>
            </div>
          )}
        </>
      )}
      {!isLoaded && !hasError && (
        <div className={`bg-gray-200 animate-pulse ${className}`} />
      )}
    </div>
  );
};

export default OptimizedImage;