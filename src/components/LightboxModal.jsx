import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, MapPin, Sparkles, BookOpen, Trophy } from 'lucide-react';
import { playCameraShutterSound } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';

export default function LightboxModal({
  isOpen,
  mediaList,
  currentIndex,
  onClose,
  onNavigate
}) {
  const { lang, t, isRtl } = useLanguage();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isStoryOpen, setIsStoryOpen] = useState(true);

  const currentItem = mediaList[currentIndex];

  useEffect(() => {
    setZoomLevel(1);
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate(isRtl ? 1 : -1);
      if (e.key === 'ArrowRight') onNavigate(isRtl ? -1 : 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNavigate, onClose, isRtl]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col select-none font-thmanyah"
      >
        {/* Top Controls Bar */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-white/10 text-xs">
          <div className="text-cinema-gold font-bold font-mono">
            {currentIndex + 1} / {mediaList.length}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.35, 3))}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={15} />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.35, 1))}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={15} />
            </button>
            <button
              onClick={() => setIsStoryOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                isStoryOpen ? 'bg-cinema-gold/15 border-cinema-gold text-cinema-gold font-bold' : 'bg-white/5 border-white/10 text-slate-300'
              }`}
              title={lang === 'ar' ? 'إظهار / إخفاء حكاية المشهد' : 'Toggle Story Note'}
            >
              <BookOpen size={13} />
              <span>{lang === 'ar' ? 'حكاية الكادر' : 'Story'}</span>
            </button>
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
              title="Toggle Fullscreen"
            >
              <Maximize2 size={15} />
            </button>
            <button
              onClick={() => {
                playCameraShutterSound();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-colors ml-2 cursor-pointer"
              title="Close Viewer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => {
            playCameraShutterSound();
            onNavigate(-1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-cinema-card/80 border border-cinema-border text-white flex items-center justify-center hover:bg-cinema-gold hover:text-cinema-black transition-all shadow-xl cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => {
            playCameraShutterSound();
            onNavigate(1);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-cinema-card/80 border border-cinema-border text-white flex items-center justify-center hover:bg-cinema-gold hover:text-cinema-black transition-all shadow-xl cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>

        {/* Center Display Area */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Main Media */}
          <div className="flex-1 flex items-center justify-center p-6 overflow-hidden relative">
            {currentItem.isVideo ? (
              <video
                src={currentItem.url}
                controls
                autoPlay
                loop
                className="max-h-[80vh] max-w-full rounded shadow-2xl"
              />
            ) : (
              <motion.img
                key={currentItem.url}
                src={currentItem.url}
                alt={currentItem.title}
                initial={{ opacity: 0.5, scale: 0.96 }}
                animate={{ opacity: 1, scale: zoomLevel }}
                transition={{ duration: 0.25 }}
                className="max-h-[80vh] max-w-full object-contain rounded shadow-2xl transition-transform duration-200"
              />
            )}
          </div>

          {/* Story & Narrative Side Drawer (No technical camera clutter) */}
          <AnimatePresence>
            {isStoryOpen && (
              <motion.aside
                initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? -50 : 50 }}
                className={`w-80 md:w-96 bg-cinema-card/95 backdrop-blur-2xl p-6 flex flex-col gap-6 overflow-y-auto ${
                  isRtl ? 'border-r border-white/10' : 'border-l border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs uppercase tracking-wider text-cinema-gold font-bold px-3 py-0.5 rounded-full bg-cinema-gold/15 border border-cinema-gold/30">
                      {currentItem.category}
                    </span>
                    <span className="text-[0.68rem] text-slate-400 font-mono tracking-wider">
                      4K CINEMA
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2 leading-snug">
                    {currentItem.title}
                  </h3>
                  <span className="text-xs text-cinema-cyan flex items-center gap-1.5 font-semibold">
                    <MapPin size={13} /> {currentItem.location || (lang === 'ar' ? 'مصر' : 'Egypt')}
                  </span>
                </div>

                {/* Special Vivo Award Highlight */}
                {(currentItem.category === 'vivo_award' || currentItem.title?.includes('ڤيڤو') || currentItem.title?.includes('Vivo')) && (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 flex items-center gap-3 text-amber-300 text-xs font-bold shadow-lg">
                    <Trophy size={18} className="text-cinema-gold flex-shrink-0" />
                    <span>{lang === 'ar' ? 'المركز الثاني عالمياً • مسابقة ڤيڤو الدولية للتصوير' : 'Vivo Global Photography Award • 2nd Place'}</span>
                  </div>
                )}

                {/* Story Description Box */}
                <div className="bg-black/50 border border-white/10 p-5 rounded-2xl flex flex-col gap-2.5 shadow-inner">
                  <div className="flex items-center gap-1.5 text-cinema-gold text-xs font-bold">
                    <Sparkles size={13} />
                    <span>{lang === 'ar' ? 'الرؤية والسياق التوثيقي' : 'Documentary Context & Story'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
                    {currentItem.description ||
                      (lang === 'ar'
                        ? `تم التقاط هذا المشهد الميداني في ${currentItem.location || 'مصر'}، مع التركيز على نقاء الضوء الطبيعي والمشاعر الإنسانية الصادقة وعراقة المشهد الأصيل.`
                        : `Captured on location in ${currentItem.location || 'Egypt'}, prioritizing authentic natural lighting, heartfelt human emotions, and raw heritage storytelling.`)}
                  </p>
                </div>

                {/* Signature Credit */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>{lang === 'ar' ? 'عدسة وتوثيق:' : 'Director & Photography:'}</span>
                  <span className="text-cinema-gold font-bold">{lang === 'ar' ? 'زكريا يحيى' : 'Zakaria Yahia'}</span>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="h-20 bg-black/80 border-t border-white/10 px-6 flex items-center gap-2 overflow-x-auto">
          {mediaList.map((item, idx) => (
            <button
              key={`${item.url}-${idx}`}
              onClick={() => {
                playCameraShutterSound();
                onNavigate(idx - currentIndex);
              }}
              className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'border-cinema-gold scale-105 opacity-100 shadow-[0_0_10px_rgba(223,177,91,0.5)]'
                  : 'border-white/10 opacity-40 hover:opacity-80'
              }`}
            >
              <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
