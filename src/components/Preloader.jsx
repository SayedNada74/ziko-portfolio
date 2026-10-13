import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aperture } from 'lucide-react';
import { playCameraShutterSound } from '../utils/audioFx';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          playCameraShutterSound();
          setTimeout(() => {
            setIsDone(true);
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    playCameraShutterSound();
    setIsDone(true);
    if (onComplete) onComplete();
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999999] bg-[#040508] flex flex-col items-center justify-center select-none"
        >
          {/* Pulsing Lens Flare */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-cinema-gold/10 blur-[130px] pointer-events-none" />

          {/* Dilating Aperture Blade SVG Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            className="relative mb-8 text-cinema-gold"
          >
            <Aperture size={76} className="drop-shadow-[0_0_30px_rgba(223,177,91,0.6)]" />
          </motion.div>

          {/* Title */}
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-gold-shimmer tracking-tight uppercase mb-2">
            Zakaria Yahia
          </h2>
          <span className="font-mono text-xs tracking-[4px] text-cinema-gold uppercase mb-8 font-semibold">
            Calibrating 35mm Cinema Optics
          </span>

          {/* Progress Bar & Counter */}
          <div className="w-64 max-w-xs flex flex-col gap-2">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cinema-gold via-yellow-200 to-cinema-cyan rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-[0.7rem] text-slate-400">
              <span className="font-bold">APERTURE INIT</span>
              <span className="text-cinema-gold font-bold">{progress}%</span>
            </div>
          </div>

          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="mt-10 font-mono text-[0.65rem] tracking-widest text-slate-400 hover:text-cinema-gold uppercase border border-white/10 hover:border-cinema-gold px-4 py-1.5 rounded-full transition-all cursor-pointer"
          >
            Skip Intro [ESC]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
