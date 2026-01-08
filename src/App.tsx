import React, { useState, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingSpinner from './components/LoadingSpinner';
import { prefersReducedMotion } from './utils/performanceOptimizations';

// Lazy-loaded components
const LazyAbout = React.lazy(() => import('./components/About'));
const LazyServices = React.lazy(() => import('./components/Services'));
const LazyProjects = React.lazy(() => import('./components/Projects'));
const LazyStatistics = React.lazy(() => import('./components/Statistics'));
const LazyGallery = React.lazy(() => import('./components/Gallery'));
const LazyStrategy = React.lazy(() => import('./components/Strategy'));
const LazyGovernance = React.lazy(() => import('./components/Governance'));
const LazyContact = React.lazy(() => import('./components/Contact'));
const LazyFooter = React.lazy(() => import('./components/Footer'));

function App() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const reducedMotion = prefersReducedMotion();

  React.useEffect(() => {
    document.title =
      language === 'en'
        ? 'Bridgelink Mineral Consultants Ltd - Mining Excellence in Zambia & DRC'
        : 'Bridgelink Mineral Consultants Ltd - Excellence Minière en Zambie et RDC';
    
    // Set lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  // Optimize loading for mobile
  const LoadingFallback = () => (
    <div className="flex items-center justify-center py-12 sm:py-20">
      <LoadingSpinner />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Above-the-fold content */}
      <Header language={language} onLanguageChange={setLanguage} />
      <Hero language={language} />

      {/* Lazy-loaded sections individually */}
      <Suspense fallback={<LoadingFallback />}>
        <LazyAbout language={language} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <LazyServices language={language} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <LazyProjects language={language} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <LazyStatistics language={language} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <LazyGallery language={language} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <LazyStrategy language={language} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <LazyGovernance language={language} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <LazyContact language={language} />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <LazyFooter language={language} />
      </Suspense>
    </div>
  );
}

export default App;
