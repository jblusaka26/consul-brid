import React, { useState, Suspense, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';

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

// Lightweight loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-8">
    <div className="w-8 h-8 border-3 border-amber-200 border-t-amber-600 rounded-full animate-spin" />
  </div>
);

function App() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en');

  useEffect(() => {
    document.title =
      language === 'en'
        ? 'Bridgelink Mineral Consultants Ltd - Mining Excellence in Zambia & DRC'
        : 'Bridgelink Mineral Consultants Ltd - Excellence Minière en Zambie et RDC';

    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="min-h-screen bg-white">
      <Header language={language} onLanguageChange={setLanguage} />
      <Hero language={language} />

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
