// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Download, Globe } from 'lucide-react';
import { debounce } from '../utils/performanceOptimizations';

interface HeaderProps {
  language: 'en' | 'fr';
  onLanguageChange: (lang: 'en' | 'fr') => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll and apply sticky background
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsScrolled(window.scrollY > 50);
    }, 10);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navigation = {
    en: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Projects', href: '#projects' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'Strategy', href: '#strategy' },
      { name: 'Governance', href: '#governance' },
      { name: 'Contact', href: '#contact' },
    ],
    fr: [
      { name: 'Accueil', href: '#home' },
      { name: 'À Propos', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Projets', href: '#projects' },
      { name: 'Galerie', href: '#gallery' },
      { name: 'Stratégie', href: '#strategy' },
      { name: 'Gouvernance', href: '#governance' },
      { name: 'Contact', href: '#contact' },
    ]
  };

  // Smooth scroll with header offset
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80; // adjust to header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setIsMenuOpen(false); // close mobile menu
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} className="flex items-center space-x-2 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm sm:text-lg">BM</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Bridgelink</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Mineral Consultants</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation[language].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200 text-sm xl:text-base"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Actions (Desktop) */}
          <div className="hidden lg:flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-amber-600 text-white px-3 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm"
            >
              <Download className="w-4 h-4" />
              <span>{language === 'en' ? 'Profile' : 'Profil'}</span>
            </motion.button>

            <button
              onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
              className="flex items-center space-x-1 px-2 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`lg:hidden bg-white border-t border-gray-200 ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="py-4 space-y-2">
            {navigation[language].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-lg transition-colors text-base touch-manipulation"
              >
                {item.name}
              </button>
            ))}

            <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => onLanguageChange(language === 'en' ? 'fr' : 'en')}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border border-gray-300 touch-manipulation"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-4 py-3 rounded-lg touch-manipulation"
              >
                <Download className="w-4 h-4" />
                <span>{language === 'en' ? 'Profile' : 'Profil'}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
