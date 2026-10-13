import React from 'react';
import { Camera } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCameraShutterSound } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function FilmstripMarquee({ onSelectPhoto }) {
  const { lang, t, isRtl } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const allPhotos = portfolioData?.photos || PORTFOLIO_DATA.photos || [];
  const featuredUrls = [
    '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg',
    '/Content/Photo/Vivo Award/2.jpg',
    '/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/1.jpg',
    '/Content/Photo/فرقة التنورة/3.jpg',
    '/Content/Photo/صور مميزه/retouch_2024062212325618.jpg',
    '/Content/Photo/Vivo Award/1.jpg',
    '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/2.jpg',
    '/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/2.jpg',
    '/Content/Photo/فرقة التنورة/2.jpg',
    '/Content/Photo/صور مميزه/photo_2025-05-09_16-32-55.jpg',
    '/Content/Photo/Vivo Award/7.jpg',
    '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/7.jpg',
  ];

  const photos = featuredUrls
    .map(url => allPhotos.find(p => p.url === url))
    .filter(Boolean);

  const marqueeItems = [...photos, ...photos];

  return (
    <section id="marquee" className="relative z-10 bg-cinema-black py-6 border-y border-cinema-border/70 overflow-hidden select-none">
      {/* Top Film Edge Ribbon with Gold Edge Code */}
      <div className="max-w-7xl mx-auto px-6 mb-2 flex items-center justify-between font-thmanyah text-xs text-cinema-gold/80 tracking-wider">
        <span className="flex items-center gap-1.5 font-bold">
          <Camera size={12} className="text-cinema-gold" />
          {t.filmstrip.ribbonLeft}
        </span>
        <span className="hidden sm:inline font-mono text-[0.68rem] dir-ltr">{t.filmstrip.ribbonRight}</span>
      </div>

      {/* Marquee viewport strictly dir=ltr so keyframe animation flows seamlessly */}
      <div className="w-full overflow-hidden relative" dir="ltr">
        {/* Top 35mm Sprocket Holes */}
        <div
          className="h-3 w-full mb-2 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, rgba(223, 177, 91, 0.9) 0%, rgba(223, 177, 91, 0.9) 55%, transparent 60%)`,
            backgroundSize: '24px 10px',
            backgroundRepeat: 'repeat-x'
          }}
        />

        {/* Marquee Continuous Sliding Track */}
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
          {marqueeItems.map((photo, idx) => {
            const frameNum = String((idx % 12) + 1).padStart(2, '0') + 'A';
            return (
              <div
                key={`${photo.url}-${idx}`}
                onClick={() => {
                  playCameraShutterSound();
                  if (onSelectPhoto) onSelectPhoto(photo);
                }}
                className="relative w-68 sm:w-76 h-44 rounded-lg bg-cinema-card border border-cinema-border/80 overflow-hidden cursor-pointer group flex-shrink-0 transition-all duration-300 hover:scale-[1.04] hover:border-cinema-gold hover:shadow-[0_0_25px_rgba(223,177,91,0.35)]"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter contrast-[1.08]"
                  onError={(e) => {
                    e.currentTarget.src = '/Content/Photo/Vivo Award/2.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/20 to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />

                {/* Film Frame Number */}
                <div className="absolute top-2 right-2.5 font-mono text-[0.6rem] text-cinema-gold/80 tracking-widest font-bold bg-cinema-black/75 px-1.5 py-0.5 rounded border border-cinema-gold/30 dir-ltr">
                  {frameNum}
                </div>

                {/* Bottom Meta */}
                <div
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className="absolute bottom-2.5 left-2.5 right-2.5 flex items-end justify-between z-10 font-thmanyah text-left rtl:text-right"
                >
                  <div>
                    <h5 className="font-display font-bold text-xs text-white truncate max-w-[150px] drop-shadow">
                      {photo.title}
                    </h5>
                    <span className="text-[0.65rem] text-cinema-gold font-medium">
                      {photo.location}
                    </span>
                  </div>
                  <span className="font-mono text-[0.58rem] text-cinema-cyan px-1.5 py-0.5 rounded bg-black/60 border border-white/10 font-bold dir-ltr">
                    {t.filmstrip.rawBadge}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 35mm Sprocket Holes */}
        <div
          className="h-3 w-full mt-2 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse at center, rgba(223, 177, 91, 0.9) 0%, rgba(223, 177, 91, 0.9) 55%, transparent 60%)`,
            backgroundSize: '24px 10px',
            backgroundRepeat: 'repeat-x'
          }}
        />
      </div>
    </section>
  );
}
