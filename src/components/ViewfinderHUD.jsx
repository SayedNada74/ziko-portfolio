import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Grid, Radio, BatteryCharging, Globe } from 'lucide-react';
import { playCameraShutterSound, toggleAudioFx, getAudioFxState } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';

export default function ViewfinderHUD({ isGridActive, setIsGridActive, isGrainActive, setIsGrainActive }) {
  const { lang, t, toggleLang } = useLanguage();
  const [audioActive, setAudioActive] = useState(getAudioFxState());
  const [timecode, setTimecode] = useState('00:00:14:08');

  // Live 24 FPS Timecode Counter
  useEffect(() => {
    let frames = 8;
    let seconds = 14;
    let minutes = 0;
    let hours = 0;

    const interval = setInterval(() => {
      frames++;
      if (frames >= 24) {
        frames = 0;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
      }
      const hh = String(hours).padStart(2, '0');
      const mm = String(minutes).padStart(2, '0');
      const ss = String(seconds).padStart(2, '0');
      const ff = String(frames).padStart(2, '0');
      setTimecode(`${hh}:${mm}:${ss}:${ff}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const newState = toggleAudioFx();
    setAudioActive(newState);
    if (newState) playCameraShutterSound();
  };

  const handleGridToggle = () => {
    setIsGridActive(prev => !prev);
    playCameraShutterSound();
  };

  const handleGrainToggle = () => {
    setIsGrainActive(prev => !prev);
    playCameraShutterSound();
  };

  return (
    <>
      {/* Top Cyber-Cine Director Monitor Bar */}
      <header className="fixed top-0 left-0 w-full h-[40px] bg-cinema-black/95 backdrop-blur-xl border-b border-cinema-border z-[10000] flex justify-between items-center px-4 md:px-8 font-mono text-[0.72rem] text-slate-300 select-none shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
        {/* Left Telemetry */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-cinema-crimson font-bold tracking-wider px-2 py-0.5 rounded bg-cinema-crimson/10 border border-cinema-crimson/30">
            <span className="w-2 h-2 rounded-full bg-cinema-crimson shadow-[0_0_10px_#ff2a55] animate-ping" />
            {t.hud.rec}
          </span>
          <span className="text-neon-cyan font-bold tracking-widest text-sm font-mono dir-ltr">
            {timecode}
          </span>
          <span className="hidden sm:inline-block bg-cinema-card border border-cinema-border px-2 py-0.5 rounded text-[0.65rem] text-cinema-cyan font-bold tracking-wider">
            {t.hud.raw}
          </span>
          <span className="hidden md:inline-block bg-cinema-card border border-cinema-border px-2 py-0.5 rounded text-[0.65rem] text-cinema-amber font-bold">
            {t.hud.aces}
          </span>
        </div>

        {/* Center Camera Gauges */}
        <div className="hidden lg:flex items-center gap-2.5 text-[0.68rem] text-slate-400 font-mono">
          <span className="text-slate-500">FPS:</span>
          <span className="text-white font-bold">{t.hud.fps}</span>
          <span className="opacity-30">•</span>
          <span className="text-slate-500">SHUTTER:</span>
          <span className="text-cinema-cyan font-bold">{t.hud.shutter}</span>
          <span className="opacity-30">•</span>
          <span className="text-slate-500">EI:</span>
          <span className="text-cinema-amber font-bold">{t.hud.iso}</span>
          <span className="opacity-30">•</span>
          <span className="text-slate-500">SENSOR:</span>
          <span className="text-emerald-400 font-bold">{t.hud.sensor}</span>
          <span className="opacity-30">•</span>
          <span className="text-slate-500 flex items-center gap-1"><BatteryCharging size={12} className="text-emerald-400" /> {t.hud.volts}</span>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Prominent Language Switcher Button */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-cinema-gold bg-cinema-gold/15 text-cinema-gold hover:bg-cinema-gold hover:text-cinema-black font-thmanyah font-bold text-xs transition-all duration-300 shadow-[0_0_15px_rgba(223,177,91,0.3)] cursor-pointer"
            title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
          >
            <Globe size={13} className="text-cinema-gold group-hover:text-cinema-black" />
            <span>{lang === 'ar' ? 'English' : 'العربية (ثمانية)'}</span>
          </button>

          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all cursor-pointer ${
              audioActive
                ? 'border-cinema-cyan text-cinema-cyan bg-cinema-cyan/15 box-neon-cyan'
                : 'border-cinema-border text-slate-400 hover:text-white'
            }`}
            title="Toggle Mechanical Camera Audio FX"
          >
            {audioActive ? <Volume2 size={13} className="text-cinema-cyan" /> : <VolumeX size={13} />}
            <span className="hidden sm:inline font-mono text-[0.68rem] font-bold">
              {t.hud.audio}: {audioActive ? t.hud.on : t.hud.off}
            </span>
          </button>

          <button
            onClick={handleGridToggle}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all cursor-pointer ${
              isGridActive
                ? 'border-cinema-cyan text-cinema-cyan bg-cinema-cyan/15 box-neon-cyan'
                : 'border-cinema-border text-slate-400 hover:text-white'
            }`}
            title="Toggle Scope & Targeting Grid"
          >
            <Grid size={13} />
            <span className="font-mono text-[0.68rem] font-bold">{t.hud.scope}</span>
          </button>

          <button
            onClick={handleGrainToggle}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all cursor-pointer ${
              isGrainActive
                ? 'border-cinema-amber text-cinema-amber bg-cinema-amber/15 box-neon-amber'
                : 'border-cinema-border text-slate-400 hover:text-white'
            }`}
            title="Toggle Analog Film Grain Texture"
          >
            <Radio size={13} />
            <span className="font-mono text-[0.68rem] font-bold">{t.hud.grain}</span>
          </button>
        </div>
      </header>

      {/* Scope & Crosshairs Grid Overlay (Toggleable) */}
      <div
        className={`fixed inset-0 pointer-events-none z-[9995] transition-opacity duration-300 ${
          isGridActive ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-[6.5vh] bg-black/90 border-b border-cinema-cyan/30 flex items-center justify-between px-6 font-mono text-[0.65rem] text-cinema-cyan/60">
          <span>ANAMORPHIC GATE 2.39:1 // 35MM FULL FRAME</span>
          <span>CALIBRATED OVERLAY</span>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[6.5vh] bg-black/90 border-t border-cinema-cyan/30 flex items-center justify-between px-6 font-mono text-[0.65rem] text-cinema-cyan/60">
          <span>SAFE ACTION 90% // TITLE SAFE 80%</span>
          <span>SYSTEM: READY</span>
        </div>

        {/* Laser Grid Lines */}
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-cinema-cyan/25" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-cinema-cyan/25" />
        <div className="absolute left-1/3 top-0 w-[1px] h-full bg-cinema-cyan/25" />
        <div className="absolute left-2/3 top-0 w-[1px] h-full bg-cinema-cyan/25" />

        {/* Center Target Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
          <div className="absolute top-1/2 left-0 w-10 h-[1px] bg-cinema-cyan -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 w-[1px] h-10 bg-cinema-cyan -translate-x-1/2" />
          <div className="absolute inset-1 rounded-full border border-cinema-cyan/40" />
        </div>
      </div>

      {/* Film Grain Texture Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-[9996] transition-opacity duration-300 ${
          isGrainActive ? 'opacity-[0.06]' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </>
  );
}
