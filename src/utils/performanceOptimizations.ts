// Performance optimization utilities

// Debounce function to limit function calls
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function to limit function calls
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Batch DOM operations to prevent layout thrashing
export const batchDOMOperations = (operations: (() => void)[]) => {
  requestAnimationFrame(() => {
    operations.forEach(operation => operation());
  });
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
};

// Lazy load non-critical CSS
export const loadCSS = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize scroll performance
export const optimizeScroll = () => {
  let ticking = false;
  
  const updateScrollPosition = () => {
    // Batch scroll-related DOM updates here
    ticking = false;
  };
  
  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };
  
  return onScroll;
};

// Reduce motion for users who prefer it
export const getReducedMotionSettings = () => {
  const prefersReduced = prefersReducedMotion();
  return {
    duration: prefersReduced ? 0.1 : 0.6,
    scale: prefersReduced ? 1 : 1.05,
    y: prefersReduced ? 0 : 30,
    staggerChildren: prefersReduced ? 0 : 0.2
  };
};

// Touch-friendly button sizing
export const getTouchFriendlySize = () => {
  return 'min-h-[44px] min-w-[44px]'; // iOS HIG recommendation
};

// Responsive text sizing
export const getResponsiveTextSize = (base: string) => {
  const sizes = {
    'text-xs': 'text-xs sm:text-sm',
    'text-sm': 'text-sm sm:text-base',
    'text-base': 'text-base sm:text-lg',
    'text-lg': 'text-lg sm:text-xl',
    'text-xl': 'text-xl sm:text-2xl',
    'text-2xl': 'text-2xl sm:text-3xl',
    'text-3xl': 'text-3xl sm:text-4xl',
    'text-4xl': 'text-4xl sm:text-5xl',
    'text-5xl': 'text-5xl sm:text-6xl'
  };
  return sizes[base as keyof typeof sizes] || base;
};