import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  MapPin,
  Focus,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Volume2,
  VolumeX,
  Aperture,
  MoveHorizontal,
} from 'lucide-react';
import { playCameraShutterSound, toggleAudioFx, getAudioFxState } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

const cardMedia = [
  {
    id: 'hero-1',
    url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg',
    aperture: 'f/1.8',
    iso: 'ISO 200',
    focalBadge: '35mm Cine',
  },
  {
    id: 'hero-2',
    url: '/Content/Photo/Vivo Award/2.jpg',
    aperture: 'f/2.2',
    iso: 'ISO 100',
    focalBadge: 'Flagship Optics',
  },
  {
    id: 'hero-3',
    url: '/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/1.jpg',
    aperture: 'f/1.4',
    iso: 'ISO 400',
    focalBadge: '35mm Prime',
  },
  {
    id: 'hero-4',
    url: '/Content/Photo/فرقة التنورة/3.jpg',
    aperture: 'f/2.0',
    iso: 'ISO 320',
    focalBadge: '50mm Prime',
  },
  {
    id: 'hero-5',
    url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/5.jpg',
    aperture: 'f/1.4',
    iso: 'ISO 250',
    focalBadge: '85mm Portrait',
  },
];

export default function Hero3DStage({ onOpenPhoto }) {
  const { lang, t, isRtl } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const [activeCard, setActiveCard] = useState(2);
  const [soundEnabled, setSoundEnabled] = useState(getAudioFxState());
  const [flashKey, setFlashKey] = useState(0);
  const [stageWidth, setStageWidth] = useState(1024);
  const isDragging = useRef(false);

  // Responsive stage width detection
  useEffect(() => {
    const handleResize = () => setStageWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth mouse tilt parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { damping: 30, stiffness: 160 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-14, 14]), { damping: 30, stiffness: 160 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rawHeroCards = portfolioData?.heroCards && portfolioData.heroCards.length ? portfolioData.heroCards : cardMedia;

  const heroCardsData = rawHeroCards.map((item, idx) => {
    const textData = (t.heroCards && t.heroCards[idx]) || {};
    return {
      ...item,
      title: item.title || textData.title || '',
      location: item.location || textData.location || '',
      lens: item.lens || textData.lens || '',
      tag: item.tag || textData.tag || '',
    };
  });

  const triggerTransition = useCallback((nextIndex) => {
    playCameraShutterSound();
    setFlashKey((k) => k + 1);
    setActiveCard(nextIndex);
  }, []);

  const handlePrev = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      triggerTransition(activeCard > 0 ? activeCard - 1 : heroCardsData.length - 1);
    },
    [activeCard, heroCardsData.length, triggerTransition]
  );

  const handleNext = useCallback(
    (e) => {
      if (e) e.stopPropagation();
      triggerTransition(activeCard < heroCardsData.length - 1 ? activeCard + 1 : 0);
    },
    [activeCard, heroCardsData.length, triggerTransition]
  );

  const handleToggleSound = (e) => {
    e.stopPropagation();
    const next = toggleAudioFx();
    setSoundEnabled(next);
    if (next) playCameraShutterSound();
  };

  // Keyboard Navigation: Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        if (isRtl) handleNext();
        else handlePrev();
      } else if (e.key === 'ArrowRight') {
        if (isRtl) handlePrev();
        else handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, isRtl]);

  // Spring transition physics: ultra-responsive, zero lag, organic ease
  const springTransition = {
    type: 'spring',
    stiffness: 340,
    damping: 30,
    mass: 0.7,
  };

  const stepX = stageWidth < 640 ? 175 : stageWidth < 1024 ? 225 : 280;

  return (
    <div
      dir="ltr"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-4 flex flex-col items-center justify-center [perspective:1400px] select-none"
    >
      {/* 3D Floating Stage with Infinite Circular Layout */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full max-w-6xl h-[420px] sm:h-[480px] md:h-[530px] flex items-center justify-center touch-pan-y"
      >
        {heroCardsData.map((card, index) => {
          const isCenter = index === activeCard;
          const total = heroCardsData.length;

          // Compute shortest circular offset (-2, -1, 0, 1, 2)
          let diff = index - activeCard;
          while (diff > total / 2) diff -= total;
          while (diff < -total / 2) diff += total;

          const translateX = diff * stepX;
          const translateZ = isCenter ? 140 : -90 - Math.abs(diff) * 75;
          const rotateCardY = diff * -22;
          const scale = isCenter ? 1.05 : Math.max(0.72, 0.86 - Math.abs(diff) * 0.08);
          const opacity = isCenter ? 1 : Math.abs(diff) === 1 ? 0.82 : 0.42;
          const zIndex = 40 - Math.abs(diff) * 10;

          return (
            <motion.div
              key={card.id}
              drag={isCenter ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragStart={() => {
                isDragging.current = true;
              }}
              onDragEnd={(_, info) => {
                setTimeout(() => {
                  isDragging.current = false;
                }, 60);

                const threshold = 40;
                const velocityThreshold = 250;
                if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
                  handleNext();
                } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
                  handlePrev();
                }
              }}
              onClick={() => {
                if (isDragging.current) return;
                if (isCenter) {
                  playCameraShutterSound();
                  if (onOpenPhoto) onOpenPhoto(card);
                } else {
                  triggerTransition(index);
                }
              }}
              animate={{
                x: translateX,
                z: translateZ,
                rotateY: rotateCardY,
                scale,
                opacity,
              }}
              transition={springTransition}
              style={{
                zIndex,
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity',
              }}
              className={`absolute w-72 sm:w-84 md:w-96 h-[400px] sm:h-[460px] md:h-[495px] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing ${
                isCenter
                  ? 'border-2 border-cinema-gold shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_45px_rgba(223,177,91,0.35)] cursor-pointer ring-1 ring-cinema-gold/30'
                  : 'border border-white/10 hover:border-cinema-gold/50 shadow-2xl hover:brightness-110 cursor-pointer'
              }`}
            >
              {/* Photo Image */}
              <img
                src={card.url}
                alt={card.title}
                className="w-full h-full object-cover filter contrast-[1.08] pointer-events-none"
                loading="eager"
                draggable={false}
                onError={(e) => {
                  e.currentTarget.src = '/Content/Photo/Vivo Award/2.jpg';
                }}
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/30 to-transparent pointer-events-none" />

              {/* Shutter Burst Optical Flash Effect */}
              <AnimatePresence>
                {isCenter && (
                  <motion.div
                    key={`flash-${flashKey}`}
                    initial={{ opacity: 0.65 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="absolute inset-0 bg-gradient-to-tr from-cinema-gold/40 via-white/50 to-transparent pointer-events-none rounded-2xl z-30"
                  />
                )}
              </AnimatePresence>

              {/* Center Autofocus Reticle HUD */}
              {isCenter && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  {/* Outer Pulsing Target Box */}
                  <div className="w-24 h-24 border border-cinema-cyan/40 rounded flex items-center justify-center relative animate-pulse">
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cinema-cyan" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cinema-cyan" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cinema-cyan" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cinema-cyan" />
                    <Focus size={24} className="text-cinema-cyan/90" />
                  </div>

                  {/* Top Telemetry Chip */}
                  <div className="absolute top-4 right-4 bg-cinema-black/85 backdrop-blur-md border border-cinema-border px-2.5 py-1 rounded-full flex items-center gap-1.5 font-mono text-[0.62rem] text-cinema-cyan dir-ltr shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-cinema-cyan animate-ping" />
                    <span>4K • CINEMA</span>
                  </div>

                  {/* Top Tag Chip */}
                  <div
                    dir={isRtl ? 'rtl' : 'ltr'}
                    className="absolute top-4 left-4 bg-cinema-gold/25 backdrop-blur-md border border-cinema-gold/50 px-3 py-1 rounded-full font-thmanyah text-[0.7rem] text-cinema-gold font-bold shadow-md"
                  >
                    {card.tag}
                  </div>
                </div>
              )}

              {/* Bottom Card Meta Details (Clean storytelling without aperture/lens clutter) */}
              <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className="absolute bottom-5 left-5 right-5 z-20 flex flex-col font-thmanyah text-left rtl:text-right pointer-events-none"
              >
                <div className="mb-2">
                  <h4 className="font-bold text-lg sm:text-xl text-white drop-shadow-md leading-snug line-clamp-1">
                    {card.title}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 text-cinema-gold">
                    <MapPin size={13} />
                    <span className="font-medium text-xs">{card.location}</span>
                  </div>
                </div>

                {isCenter && (
                  <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[0.74rem] text-slate-200">
                    <span className="text-cinema-goldLight flex items-center gap-1.5 font-bold">
                      <Sparkles size={12} className="text-cinema-gold animate-spin" style={{ animationDuration: '4s' }} />
                      {lang === 'ar' ? 'انقر للمعاينة والتدقيق بدقة 4K' : 'Click to Inspect in 4K'}
                    </span>
                    <Maximize2 size={13} className="text-cinema-cyan" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Control Console & Navigation Dock */}
      <div dir="ltr" className="relative z-30 flex flex-col items-center gap-3 mt-6">
        {/* Navigation Bar */}
        <div className="flex items-center gap-3 sm:gap-4 bg-cinema-card/90 backdrop-blur-xl border border-cinema-border/90 px-4 py-2 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous masterwork"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-cinema-gold hover:text-cinema-black border border-white/10 hover:border-cinema-gold flex items-center justify-center text-white transition-all duration-200 cursor-pointer active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Pagination Dots with Sliding Layout */}
          <div className="flex items-center gap-1.5 px-2">
            {heroCardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => triggerTransition(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="relative py-2 px-1 cursor-pointer focus:outline-none"
              >
                <div
                  className={`h-2 rounded-full transition-all duration-200 ${
                    idx === activeCard
                      ? 'w-7 bg-cinema-gold shadow-[0_0_12px_#dfb15b]'
                      : 'w-2 bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Counter Badge */}
          <div className="font-mono text-xs text-cinema-gold/90 font-bold px-2 py-0.5 rounded bg-black/40 border border-cinema-gold/20 dir-ltr select-none">
            0{activeCard + 1} / 0{heroCardsData.length}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            aria-label="Next masterwork"
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-cinema-gold hover:text-cinema-black border border-white/10 hover:border-cinema-gold flex items-center justify-center text-white transition-all duration-200 cursor-pointer active:scale-95"
          >
            <ChevronRight size={18} />
          </button>

          <div className="w-px h-5 bg-white/15 mx-1" />

          {/* Shutter Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={soundEnabled ? 'Disable shutter audio' : 'Enable shutter audio'}
            title={soundEnabled ? 'كتم صوت الغالق' : 'تفعيل صوت الغالق'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
              soundEnabled
                ? 'bg-cinema-gold/15 text-cinema-gold border border-cinema-gold/30 hover:bg-cinema-gold/30'
                : 'bg-white/5 text-slate-500 border border-white/10 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>

        {/* Quick Optical Masterwork Selector Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-2 px-2 max-w-2xl">
          {heroCardsData.map((card, idx) => {
            const isCurrent = idx === activeCard;
            return (
              <button
                key={card.id}
                onClick={() => {
                  if (idx !== activeCard) triggerTransition(idx);
                }}
                className={`px-3 py-1.5 rounded-full text-[0.72rem] font-mono transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-cinema-gold text-cinema-black font-extrabold shadow-[0_0_16px_rgba(223,177,91,0.5)] scale-105'
                    : 'bg-cinema-card/70 border border-cinema-border text-slate-400 hover:text-white hover:border-white/30'
                }`}
              >
                <Aperture size={12} className={isCurrent ? 'text-cinema-black' : 'text-cinema-gold'} />
                <span>{card.aperture}</span>
                <span
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className="font-thmanyah text-[0.7rem] opacity-90 hidden sm:inline"
                >
                  {card.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gesture Navigation Tip */}
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className="flex items-center gap-1.5 text-[0.68rem] text-slate-400 font-thmanyah mt-1 opacity-80"
        >
          <MoveHorizontal size={13} className="text-cinema-gold animate-pulse" />
          <span>
            {lang === 'ar'
              ? 'اسحب بإصبعك/الماوس للتقليب، أو استخدم الأسهم'
              : 'Swipe or use arrow keys to navigate masterworks'}
          </span>
        </div>
      </div>
    </div>
  );
}
