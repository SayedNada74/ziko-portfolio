import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Sun, Thermometer, ZoomIn, RotateCcw, Palette, Activity } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCameraShutterSound } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';

export default function ColorGradingLab() {
  const { lang, t, isRtl } = useLanguage();
  const samples = PORTFOLIO_DATA.gradingSamples || [];
  const presets = PORTFOLIO_DATA.gradingPresets || [];

  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [exposure, setExposure] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [isLoupe, setIsLoupe] = useState(false);

  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const currentSample = samples[activeSampleIndex] || samples[0];
  const currentPreset = presets[activePresetIndex] || presets[0];

  const expMultiplier = 1 + exposure / 100;
  const tempHue = temperature * 0.8;
  const gradedFilter = `${currentPreset.filterCss} brightness(${expMultiplier}) hue-rotate(${tempHue}deg)`;

  const handleSliderMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleResetControls = () => {
    playCameraShutterSound();
    setExposure(0);
    setTemperature(0);
  };

  return (
    <section id="grading" className="py-28 px-6 md:px-12 bg-cinema-secondary relative z-10 overflow-hidden font-thmanyah">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cinema-gold/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-cinema-cyan/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Controls Console (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/30 text-cinema-gold text-xs tracking-wider uppercase mb-3 font-bold">
                <Palette size={13} />
                <span>{t.colorLab.tag}</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3 uppercase tracking-tight">
                {lang === 'ar' ? (
                  <>معمل تدريج <span className="text-gold-shimmer">الألوان السينمائي</span></>
                ) : (
                  <>Cinematic <span className="text-gold-shimmer">Color Lab</span></>
                )}
              </h2>
              <p className="text-slate-300 font-light text-sm leading-relaxed">
                {t.colorLab.subtitle}
              </p>
            </div>

            {/* Test Scene Selector */}
            <div>
              <label className="text-xs text-cinema-gold uppercase tracking-wider block mb-2.5 font-bold">
                {t.colorLab.step1}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {samples.map((sample, idx) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      playCameraShutterSound();
                      setActiveSampleIndex(idx);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      idx === activeSampleIndex
                        ? 'bg-cinema-gold/15 border-cinema-gold text-white shadow-[0_0_15px_rgba(223,177,91,0.25)]'
                        : 'bg-cinema-card border-cinema-border text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className="font-display text-xs font-bold text-white block truncate">
                      {sample.title}
                    </span>
                    <span className="text-[0.68rem] text-slate-400 font-mono">
                      {sample.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Film LUT Preset Switcher */}
            <div>
              <label className="text-xs text-cinema-gold uppercase tracking-wider block mb-2.5 font-bold">
                {t.colorLab.step2}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((lut, idx) => (
                  <button
                    key={lut.id}
                    onClick={() => {
                      playCameraShutterSound();
                      setActivePresetIndex(idx);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      idx === activePresetIndex
                        ? 'bg-cinema-gold/15 border-cinema-gold text-white shadow-[0_0_20px_rgba(223,177,91,0.3)]'
                        : 'bg-cinema-card border-cinema-border text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs text-white truncate">{lut.name}</span>
                      <span className="font-mono text-[0.6rem] text-cinema-gold bg-black/40 px-1.5 py-0.5 rounded border border-cinema-gold/20 font-bold">
                        {lut.badge}
                      </span>
                    </div>
                    <p className="text-[0.68rem] text-slate-400 leading-tight line-clamp-2">
                      {lut.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Fine Tuning Controls */}
            <div className="bg-cinema-card border border-cinema-border rounded-2xl p-5 flex flex-col gap-4 shadow-xl">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5 text-cinema-gold"><Sun size={13} /> {t.colorLab.exposureLabel}</span>
                  <span className="text-cinema-gold font-bold font-mono dir-ltr">{(exposure / 10).toFixed(1)} EV</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={exposure}
                  onChange={(e) => setExposure(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cinema-gold"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5 text-cinema-cyan"><Thermometer size={13} /> {t.colorLab.kelvinLabel}</span>
                  <span className="text-cinema-cyan font-bold font-mono dir-ltr">
                    {5600 + Math.round(temperature * 40)}K
                  </span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cinema-cyan"
                />
              </div>

              <button
                onClick={handleResetControls}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-cinema-border text-slate-300 hover:text-white hover:border-cinema-gold text-xs transition-colors mt-1 cursor-pointer font-bold"
              >
                <RotateCcw size={13} /> {t.colorLab.resetControls}
              </button>
            </div>
          </div>

          {/* Interactive Split-Screen Comparison Viewport (Right) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs text-slate-400 px-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cinema-gold animate-pulse" />
                {t.colorLab.splitPreview}
              </span>
              <button
                onClick={() => {
                  playCameraShutterSound();
                  setIsLoupe(!isLoupe);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs transition-all cursor-pointer font-medium ${
                  isLoupe ? 'bg-cinema-cyan text-cinema-black border-cinema-cyan font-bold' : 'border-cinema-border text-slate-300 hover:text-white'
                }`}
              >
                <ZoomIn size={12} /> {isLoupe ? t.colorLab.normalView : t.colorLab.loupeView}
              </button>
            </div>

            {/* Drag Compare Container */}
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden border-2 border-cinema-border hover:border-cinema-gold/60 transition-colors shadow-2xl cursor-ew-resize select-none bg-black"
            >
              {/* Graded Image (Full Width Base Layer) */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-transform duration-300 ${
                  isLoupe ? 'scale-150' : 'scale-100'
                }`}
                style={{
                  backgroundImage: `url("${currentSample.url}")`,
                  filter: gradedFilter
                }}
              />

              {/* Flat RAW C-LOG (Clipped Overlay Layer) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-cinema-gold z-10"
                style={{ width: `${sliderPosition}%` }}
              >
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-300 ${
                    isLoupe ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
                    height: '100%',
                    backgroundImage: `url("${currentSample.url}")`,
                    filter: 'contrast(0.85) saturate(0.8) brightness(1.05)'
                  }}
                />
              </div>

              {/* Slider Center Drag Handle */}
              <div
                className="absolute top-0 bottom-0 z-20 -translate-x-1/2 pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 rounded-full bg-cinema-gold text-cinema-black border-2 border-white shadow-[0_0_20px_rgba(223,177,91,0.6)] flex items-center justify-center font-bold text-xs pointer-events-auto">
                  <Sliders size={16} />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/10 text-xs text-red-400 flex items-center gap-1.5 pointer-events-none font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> {t.colorLab.rawBadge}
              </div>
              <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/10 text-xs text-cinema-gold flex items-center gap-1.5 pointer-events-none font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-cinema-gold animate-pulse" /> {t.colorLab.gradedBadge}
              </div>

              {/* RGB Scope Histogram Simulation */}
              <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/10 text-xs flex items-center gap-2 pointer-events-none">
                <Activity size={12} className="text-cinema-cyan" />
                <span className="text-slate-300 font-bold">{t.colorLab.waveform}</span>
                <span className="w-3.5 h-2 rounded-sm bg-red-500" />
                <span className="w-3.5 h-2 rounded-sm bg-emerald-500" />
                <span className="w-3.5 h-2 rounded-sm bg-blue-500" />
              </div>
            </div>

            {/* Color Science Specs Bar */}
            <div className="grid grid-cols-3 gap-3 bg-cinema-card border border-cinema-border rounded-2xl p-4 text-center shadow-lg">
              <div>
                <span className="text-xs text-slate-400 block font-bold mb-0.5">{t.colorLab.activeProfile}</span>
                <span className="text-xs text-cinema-gold font-bold">{currentPreset.name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-bold mb-0.5">{t.colorLab.dynamicLat}</span>
                <span className="text-xs text-white font-bold font-mono dir-ltr">14.8 EV</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-bold mb-0.5">{t.colorLab.colorSpace}</span>
                <span className="text-xs text-cinema-cyan font-bold font-mono">ACEScc 32-Bit</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
