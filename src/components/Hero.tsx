import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  language: 'en' | 'fr';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const content = {
    en: {
      title: 'Bridgelink Mineral Consultants Ltd',
      subtitle: 'Exploring the Future',
      description: 'Leading mining consultancy with 10+ years of excellence in Zambia and DRC, providing uncompromised professional quality results with the best turnaround time.',
      cta1: 'Learn More',
      cta2: 'Get Started',
      scroll: 'Scroll to explore'
    },
    fr: {
      title: 'Bridgelink Mineral Consultants Ltd',
      subtitle: 'Explorer l\'Avenir',
      description: 'Conseil minier de premier plan avec plus de 10 ans d\'excellence en Zambie et en RDC, fournissant des résultats de qualité professionnelle sans compromis avec le meilleur délai d\'exécution.',
      cta1: 'En Savoir Plus',
      cta2: 'Commencer',
      scroll: 'Faites défiler pour explorer'
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-orange-800/80 to-yellow-700/70 z-10" />
        <picture>
          <source srcSet="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1920&fm=avif" type="image/avif" />
          <source srcSet="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1920&fm=webp" type="image/webp" />
          <img
          src="https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Mining landscape"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          />
        </picture>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto text-center w-full">
        <div
          className={`space-y-6 sm:space-y-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight px-2">
            {content[language].title}
          </h1>

          <div className="space-y-4">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-amber-200 px-2">
              {content[language].subtitle}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed px-4">
              {content[language].description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <button
              onClick={() => scrollToSection('#about')}
              className="flex items-center justify-center space-x-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              <span>{content[language].cta1}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollToSection('#contact')}
              className="flex items-center justify-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-amber-900 active:scale-95 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 w-full sm:w-auto min-h-[48px] touch-manipulation"
            >
              <span>{content[language].cta2}</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection('#about')}
            className="flex flex-col items-center text-white/80 cursor-pointer touch-manipulation animate-bounce"
            aria-label={content[language].scroll}
          >
            <span className="text-xs sm:text-sm mb-2 hidden sm:block">{content[language].scroll}</span>
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;