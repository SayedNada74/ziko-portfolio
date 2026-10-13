import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCameraShutterSound, toggleAudioFx, getAudioFxState } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, t, toggleLang, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [soundEnabled, setSoundEnabled] = useState(getAudioFxState());

  const progressBarRef = useRef(null);

  // Ultra-Smooth 120fps Scroll Progress (Direct RAF DOM updates without CSS delay)
  useEffect(() => {
    let rafId = null;
    let lastSectionCheck = 0;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        const clamped = Math.min(100, Math.max(0, progress));

        // 1. Instant direct DOM sync - ZERO lag, ZERO delay, perfectly locked to viewport
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${clamped}%`;
        }

        // 2. Navbar style toggle (only updates state if changed)
        const shouldBeScrolled = scrollY > 20;
        setIsScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));

        // 3. Throttled Section Spy (runs every 150ms to prevent layout thrashing)
        const now = performance.now();
        if (now - lastSectionCheck > 150) {
          lastSectionCheck = now;
          const sections = ['contact', 'about', 'awards', 'gallery', 'expeditions', 'hero'];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 260) {
                setActiveSection((prev) => (prev !== id ? id : prev));
                break;
              }
            }
          }
        }

        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { id: 'hero', name: lang === 'ar' ? 'الرئيسية' : 'Home', href: '#hero' },
    { id: 'expeditions', name: lang === 'ar' ? 'الفصول الوثائقية' : 'Chapters', href: '#expeditions' },
    { id: 'gallery', name: lang === 'ar' ? 'الأعمال والريلز' : 'Gallery & Reels', href: '#gallery' },
    { id: 'awards', name: lang === 'ar' ? 'الجوائز' : 'Awards', href: '#awards' },
    { id: 'about', name: lang === 'ar' ? 'عن زكريا' : 'About', href: '#about' },
    { id: 'contact', name: lang === 'ar' ? 'تواصل' : 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href, id) => {
    playCameraShutterSound();
    setMobileOpen(false);
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const next = toggleAudioFx();
    setSoundEnabled(next);
    if (next) playCameraShutterSound();
  };

  return (
    <>
      {/* 1. Full-Width Laser Scroll Progress Bar (Top of Screen) */}
      <div className="fixed top-0 left-0 w-full h-[3.5px] z-[99999] pointer-events-none bg-black/40 overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-amber-500 via-cinema-gold to-yellow-300 shadow-[0_0_15px_#dfb15b,0_0_25px_#dfb15b] will-change-[width]"
          style={{
            width: '0%',
            position: 'absolute',
            ...(isRtl ? { right: 0 } : { left: 0 }),
          }}
        >
          {/* Laser Tip Glow */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-yellow-200 shadow-[0_0_12px_#ffffff,0_0_22px_#dfb15b] ${
              isRtl ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
            }`}
          />
        </div>
      </div>

      <header className="fixed top-0 left-0 w-full z-[9990] transition-all duration-300">
        <div
          className={`w-full transition-all duration-300 flex justify-center ${
            isScrolled ? 'pt-2.5 px-3 sm:px-6' : 'pt-4 px-4 sm:px-8'
          }`}
        >
          <nav
            dir={isRtl ? 'rtl' : 'ltr'}
            className={`relative w-full max-w-7xl rounded-2xl sm:rounded-full transition-all duration-300 flex items-center justify-between ${
              isScrolled
                ? 'bg-[#070a12]/95 backdrop-blur-2xl border border-cinema-gold/30 shadow-[0_15px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(223,177,91,0.15)] px-4 sm:px-7 py-2.5'
                : 'bg-[#090d16]/80 backdrop-blur-xl border border-white/10 px-5 sm:px-8 py-3.5 shadow-lg'
            }`}
          >

          {/* ZONE 1: BRAND LOGO & TITLE */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero', 'hero');
            }}
            className="flex items-center gap-3 group cursor-pointer flex-shrink-0"
          >
            {/* Monogram Crest */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cinema-gold to-amber-600 p-0.5 shadow-[0_0_15px_rgba(223,177,91,0.35)] group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full bg-[#0a0d14] rounded-[10px] sm:rounded-[14px] flex items-center justify-center text-cinema-gold font-extrabold text-xs sm:text-sm font-display tracking-wider">
                ZY
              </div>
            </div>

            {/* Typography */}
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-cinema-gold transition-colors leading-tight">
                {lang === 'ar' ? 'زكريا يحيى' : 'Zakaria Yahia'}
              </span>
              <span className="text-[0.62rem] sm:text-[0.68rem] text-slate-400 font-thmanyah font-medium leading-tight">
                {lang === 'ar' ? 'فوتوغرافيا وسينما وثائقية' : 'Documentary & Cinema'}
              </span>
            </div>
          </a>

          {/* ZONE 2: DESKTOP NAVIGATION LINKS (Spacious, elegant, zero bulky clutter) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href, item.id);
                  }}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-thmanyah font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'text-cinema-gold font-extrabold bg-cinema-gold/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{item.name}</span>
                  {/* Subtle active glowing pip indicator */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cinema-gold shadow-[0_0_6px_#dfb15b] animate-pulse" />
                  )}
                </a>
              );
            })}
          </div>

          {/* ZONE 3: ACTIONS (Sound, Language, Booking CTA) */}
          <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0">
            {/* Audio Shutter Sound Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundEnabled ? (lang === 'ar' ? 'كتم صوت الشاتر' : 'Mute Sound') : (lang === 'ar' ? 'تشغيل صوت الشاتر' : 'Enable Sound')}
              aria-label="Toggle Sound"
              className={`p-2 rounded-full border transition-all duration-200 cursor-pointer ${
                soundEnabled
                  ? 'border-cinema-gold/40 text-cinema-gold bg-cinema-gold/10 hover:bg-cinema-gold/25'
                  : 'border-white/10 text-slate-500 bg-white/5 hover:text-white'
              }`}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-slate-300 hover:border-cinema-gold hover:text-cinema-gold text-xs font-semibold transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              title="Switch Language / تبديل اللغة"
            >
              <Globe size={13} className="text-cinema-gold" />
              <span>{lang === 'ar' ? 'English' : 'عربي'}</span>
            </button>

            {/* Luxury Booking CTA */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#contact', 'contact');
              }}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-extrabold font-thmanyah rounded-full bg-cinema-gold text-cinema-black hover:bg-cinema-goldLight transition-all duration-200 shadow-[0_0_15px_rgba(223,177,91,0.35)] hover:shadow-[0_0_25px_rgba(223,177,91,0.6)] cursor-pointer active:scale-95"
            >
              <MessageCircle size={14} />
              <span>{lang === 'ar' ? 'حجز وتواصل' : 'Book Session'}</span>
            </a>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-lg border border-white/15 text-cinema-gold text-xs font-bold bg-white/5"
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            <button
              onClick={handleToggleSound}
              className={`p-1.5 rounded-lg border text-xs ${
                soundEnabled ? 'border-cinema-gold/40 text-cinema-gold' : 'border-white/10 text-slate-500'
              }`}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            <button
              onClick={() => {
                playCameraShutterSound();
                setMobileOpen(!mobileOpen);
              }}
              className="text-cinema-gold p-1.5 cursor-pointer focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-3 mt-2 rounded-2xl bg-[#090d16]/98 backdrop-blur-2xl border border-cinema-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            <div dir={isRtl ? 'rtl' : 'ltr'} className="p-5 flex flex-col gap-1.5 font-thmanyah">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.href, item.id);
                  }}
                  className={`py-2.5 px-3.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                    activeSection === item.id
                      ? 'bg-cinema-gold text-cinema-black font-extrabold'
                      : 'text-slate-200 hover:bg-white/5 hover:text-cinema-gold'
                  }`}
                >
                  <span>{item.name}</span>
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('#contact', 'contact');
                }}
                className="mt-3 text-center py-3 rounded-xl bg-cinema-gold text-cinema-black font-extrabold text-xs uppercase shadow-md"
              >
                {lang === 'ar' ? 'حجز وتواصل مباشر' : 'Book Session'}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  </>
  );
}
