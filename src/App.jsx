import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PortfolioDataProvider, usePortfolioData } from './context/PortfolioDataContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilmstripMarquee from './components/FilmstripMarquee';
import Expeditions from './components/Expeditions';
import Gallery from './components/Gallery';
import ColorGradingLab from './components/ColorGradingLab';
import Awards from './components/Awards';
import AboutDirector from './components/AboutDirector';
import ContactBooking from './components/ContactBooking';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import CustomCursor from './components/CustomCursor';
import FloatingSidebars from './components/FloatingSidebars';
import AdminDashboard from './components/admin/AdminDashboard';
import { Shield, Settings } from 'lucide-react';
import { playCameraShutterSound } from './utils/audioFx';

function PortfolioMain() {
  const { lang, isRtl } = useLanguage();
  const { portfolioData, isAdminOpen, setIsAdminOpen, isSecretAuthorized } = usePortfolioData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeGovernorate, setActiveGovernorate] = useState('all');

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMediaList, setLightboxMediaList] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Global Keyboard Shortcut: Alt + A only active when secret key is authorized
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.altKey && (e.key === 'a' || e.key === 'A' || e.key === 'ش')) ||
          (e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A' || e.key === 'ش'))) {
        if (isSecretAuthorized) {
          e.preventDefault();
          playCameraShutterSound();
          setIsAdminOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSecretAuthorized, setIsAdminOpen]);

  const handleOpenLightbox = (list, index) => {
    setLightboxMediaList(list);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleSelectExpedition = (expedition) => {
    setActiveCategory(expedition.category);
    setActiveGovernorate(expedition.gov);
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMarqueePhoto = (photo) => {
    const photos = portfolioData?.photos || [];
    const index = photos.findIndex((p) => p.url === photo.url);
    if (index !== -1) {
      handleOpenLightbox(photos, index);
    }
  };

  const handleHero3DCardClick = (card) => {
    const photos = portfolioData?.photos || [];
    const index = photos.findIndex((p) => p.url === card.url);
    if (index !== -1) {
      handleOpenLightbox(photos, index);
    } else {
      handleOpenLightbox([card], 0);
    }
  };

  const handleLightboxNavigate = (step) => {
    setLightboxIndex((prev) => {
      let next = prev + step;
      if (next >= lightboxMediaList.length) next = 0;
      if (next < 0) next = lightboxMediaList.length - 1;
      return next;
    });
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-cinema-black text-slate-100 selection:bg-cinema-gold selection:text-cinema-black relative overflow-x-hidden ${
        isRtl ? 'font-thmanyah' : 'font-body'
      }`}
    >
      {/* Opening Aperture Shutter Preloader */}
      <Preloader />

      {/* Reticle Cursor */}
      <CustomCursor />

      {/* Sleek Floating Navbar (Only rendered when Admin Dashboard is closed) */}
      {!isAdminOpen && <Navbar />}

      {/* Hero Viewport with 3D Perspective Stage */}
      <Hero onOpenPhoto={handleHero3DCardClick} />

      {/* 35mm Gliding Filmstrip Reel */}
      <FilmstripMarquee onSelectPhoto={handleSelectMarqueePhoto} />

      {/* Documentary Chapters Across Egypt */}
      <Expeditions onSelectExpedition={handleSelectExpedition} />

      {/* Master Gallery & Cinema Reels Showcase */}
      <Gallery
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeGovernorate={activeGovernorate}
        setActiveGovernorate={setActiveGovernorate}
        onOpenLightbox={handleOpenLightbox}
      />

      {/* Interactive Color Grading Lab (The Darkroom) */}
      <ColorGradingLab />

      {/* Prestige Awards & Recognition */}
      <Awards />

      {/* Director's Biography & Statement */}
      <AboutDirector />

      {/* Consultation & Booking Form */}
      <ContactBooking />

      {/* Footer */}
      <Footer />

      {/* Fullscreen Masterclass Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        mediaList={lightboxMediaList}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={handleLightboxNavigate}
      />

      {/* Floating Sidebars: Social Icons on Left & Vertical Email on Right */}
      {!isAdminOpen && <FloatingSidebars />}

      {/* Discreet Floating CMS Trigger Button (Only rendered when secret authorized and dashboard closed) */}
      {isSecretAuthorized && !isAdminOpen && (
        <button
          onClick={() => {
            playCameraShutterSound();
            setIsAdminOpen(true);
          }}
          title={lang === 'ar' ? 'لوحة تحكم الموقع وإدارة المحتوى (Alt + A)' : 'Director CMS Portal (Alt + A)'}
          aria-label="Director CMS"
          className="fixed bottom-6 left-16 sm:left-20 rtl:left-16 rtl:sm:left-20 rtl:right-auto ltr:right-16 ltr:sm:right-20 ltr:left-auto z-40 p-3 rounded-full bg-cinema-card/90 backdrop-blur-md border border-cinema-gold/40 text-cinema-gold hover:text-cinema-black hover:bg-cinema-gold hover:scale-110 transition-all duration-300 shadow-[0_5px_25px_rgba(0,0,0,0.8),0_0_20px_rgba(223,177,91,0.3)] cursor-pointer group flex items-center gap-2"
        >
          <Shield size={18} className="group-hover:rotate-12 transition-transform" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold font-thmanyah px-0 group-hover:px-1">
            {lang === 'ar' ? 'لوحة الإدارة' : 'CMS Portal'}
          </span>
        </button>
      )}

      {/* Complete Director Admin Dashboard Modal (Dual-layer protected) */}
      {isAdminOpen && isSecretAuthorized && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioDataProvider>
        <PortfolioMain />
      </PortfolioDataProvider>
    </LanguageProvider>
  );
}
