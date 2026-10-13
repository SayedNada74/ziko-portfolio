import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCameraShutterSound } from '../utils/audioFx';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function CameraFlashEffect() {
  const { lang, t, isRtl } = useLanguage();
  const [isFlashing, setIsFlashing] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);

  const takeSnapshot = () => {
    playCameraShutterSound();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 220);

    const photos = PORTFOLIO_DATA.photos || [];
    if (photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * photos.length);
      setCapturedPhoto(photos[randomIndex]);
    }
  };

  return (
    <>
      {/* Screen Strobe Flash */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0.95 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white pointer-events-none z-[999999]"
          />
        )}
      </AnimatePresence>

      {/* Floating Action Shutter Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={takeSnapshot}
        className={`fixed bottom-6 z-[9998] flex items-center gap-2.5 px-5 py-3 rounded-full bg-cinema-gold text-cinema-black font-extrabold font-thmanyah text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(223,177,91,0.5)] border-2 border-white hover:bg-yellow-400 transition-all cursor-pointer group ${
          isRtl ? 'left-6' : 'right-6'
        }`}
      >
        <Camera size={16} className="group-hover:rotate-12 transition-transform" />
        <span>{t.takeShot}</span>
        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping ml-0.5" />
      </motion.button>

      {/* Polaroid Keepsake Modal */}
      <AnimatePresence>
        {capturedPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            className={`fixed bottom-24 z-[9999] w-72 p-3 pb-5 rounded-xl bg-white text-neutral-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-4 border-white select-none font-thmanyah ${
              isRtl ? 'left-6' : 'right-6'
            }`}
          >
            <div className="relative aspect-square overflow-hidden bg-black rounded-lg mb-3">
              <img
                src={capturedPhoto.url}
                alt={capturedPhoto.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setCapturedPhoto(null)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex justify-between items-baseline px-1">
              <div>
                <h4 className="font-display font-bold text-sm text-neutral-900 leading-tight">
                  {capturedPhoto.title}
                </h4>
                <span className="text-xs text-neutral-500">
                  {capturedPhoto.location} • 35mm
                </span>
              </div>
              <span className="font-mono text-[0.6rem] px-2 py-0.5 bg-neutral-100 rounded text-amber-700 font-bold border border-amber-200">
                {lang === 'ar' ? 'بولارويد' : 'POLAROID'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
