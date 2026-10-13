import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronDown, Layers, MessageCircle } from 'lucide-react';
import Hero3DStage from './Hero3DStage';
import { playCameraShutterSound } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';

export default function Hero({ onOpenPhoto }) {
  const { lang, t } = useLanguage();

  const handleCtaClick = (targetId) => {
    playCameraShutterSound();
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-16 bg-gradient-to-b from-[#040508] via-[#070a12] to-[#040508]">
      {/* Subtle Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0 opacity-30">
        <div className="w-[600px] h-[600px] rounded-full bg-cinema-gold/10 blur-[150px]" />
        <div className="w-[450px] h-[450px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      {/* Hero Header Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mb-6">
        {/* Top Distinction Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cinema-gold/10 border border-cinema-gold/30 text-cinema-gold font-thmanyah text-xs font-bold shadow-[0_0_20px_rgba(223,177,91,0.2)] mb-5"
        >
          <Trophy size={14} className="text-cinema-gold" />
          <span>{lang === 'ar' ? 'المركز الثاني عالمياً • مسابقة ڤيڤو للتصوير الفوتوغرافي' : '2nd Place • Vivo Global Mobile Photography Awards'}</span>
        </motion.div>

        {/* Main Name with High Legibility & Gold Gradient */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight mb-4 text-gold-shimmer select-none drop-shadow-[0_10px_35px_rgba(0,0,0,0.9)]"
        >
          {lang === 'ar' ? 'زكريا يحيى' : 'Zakaria Yahia'}
        </motion.h1>

        {/* Subtitle Statement with Clean Line Height and No Overlap */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-thmanyah text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-8"
        >
          {lang === 'ar'
            ? 'مخرج سينمائي ومصور وثائقي مصري يخلّد ملامح الشارع الأصيل، وعراقة الحِرف التراثية، والمشاعر الإنسانية الصادقة .'
            : 'Egyptian cinematic director & documentary photographer preserving cultural heritage, living crafts, and honest human emotion through bespoke 35mm optical framing.'}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 font-thmanyah"
        >
          <button
            onClick={() => handleCtaClick('gallery')}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-cinema-gold text-cinema-black font-extrabold text-xs uppercase tracking-wider rounded-full transition-all duration-300 shadow-[0_10px_30px_rgba(223,177,91,0.35)] hover:shadow-[0_12px_40px_rgba(223,177,91,0.6)] hover:scale-105 cursor-pointer"
          >
            <Layers size={16} />
            <span>{lang === 'ar' ? 'استكشف المعرض والريلز' : 'Explore Masterworks & Reels'}</span>
          </button>

          <button
            onClick={() => handleCtaClick('contact')}
            className="flex items-center gap-2.5 px-7 py-3.5 bg-white/5 backdrop-blur-md border border-white/15 text-white font-bold text-xs uppercase tracking-wider rounded-full hover:border-cinema-gold hover:text-cinema-gold transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>{lang === 'ar' ? 'تواصل وحجز مباشر' : 'Contact & Booking'}</span>
          </button>
        </motion.div>
      </div>

      {/* Interactive 3D Perspective Floating Gallery Stage */}
      <div className="relative z-10 w-full mt-4">
        <Hero3DStage onOpenPhoto={onOpenPhoto} />
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={() => handleCtaClick('marquee')}
        className="relative z-10 mt-8 flex flex-col items-center gap-1 text-slate-400 hover:text-cinema-gold transition-colors font-thmanyah text-xs cursor-pointer"
      >
        <span>{lang === 'ar' ? 'مرّر لاكتشاف الفصول الوثائقية' : 'Scroll to Discover'}</span>
        <ChevronDown size={14} className="animate-bounce text-cinema-gold" />
      </button>
    </section>
  );
}
