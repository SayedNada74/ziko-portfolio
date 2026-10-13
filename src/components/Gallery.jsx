import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, LayoutGrid, Film, Grid3X3, MapPin, Play, RotateCcw, Focus, Sparkles, Camera } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCameraShutterSound } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Gallery({
  activeCategory,
  setActiveCategory,
  activeGovernorate,
  setActiveGovernorate,
  onOpenLightbox
}) {
  const { lang, t, isRtl } = useLanguage();
  const { portfolioData, customCategories } = usePortfolioData();
  const [viewMode, setViewMode] = useState('masonry'); // 'masonry' | 'cinema' | 'contact'
  const [searchQuery, setSearchQuery] = useState('');

  const defaultCategoryKeys = [
    'all',
    'vivo_award',
    'dyehouse',
    'tahtib',
    'tanoura',
    'diana_market',
    'cinema_reels',
    'featured',
  ];

  // Combine photos and videos with authentic categories preserved
  const allMediaItems = useMemo(() => {
    const photos = portfolioData?.photos || PORTFOLIO_DATA.photos || [];
    const videos = (portfolioData?.videos || PORTFOLIO_DATA.videos || []).map(v => ({ ...v, isVideo: true }));
    return [...photos, ...videos];
  }, [portfolioData]);

  // Dynamically compute categoryKeys: defaults + customCategories + uncategorized
  const categoryKeys = useMemo(() => {
    const keys = [...defaultCategoryKeys];
    // Custom categories
    (customCategories || []).forEach((cat) => {
      if (!keys.includes(cat.id)) {
        keys.push(cat.id);
      }
    });
    // Check if any items are uncategorized
    const hasUncategorized = allMediaItems.some(
      (item) => !item.category || item.category === 'uncategorized' || item.category === 'none'
    );
    if (hasUncategorized && !keys.includes('uncategorized')) {
      keys.push('uncategorized');
    }
    // Any remaining unique categories from items
    allMediaItems.forEach((item) => {
      if (item.category && !keys.includes(item.category) && item.category !== 'none') {
        keys.push(item.category);
      }
    });
    return keys;
  }, [allMediaItems, customCategories]);

  // Category label helper
  const getCategoryLabel = (catId) => {
    if (t.gallery.categories[catId]) return t.gallery.categories[catId];
    if (catId === 'uncategorized' || catId === 'none') {
      return lang === 'ar' ? 'بدون تصنيف' : 'Uncategorized';
    }
    const custom = (customCategories || []).find((c) => c.id === catId);
    if (custom) return lang === 'ar' ? (custom.labelAr || custom.labelEn) : (custom.labelEn || custom.labelAr);
    return catId.replace(/^cat_/, '').replace(/_/g, ' ');
  };

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    categoryKeys.forEach((catId) => {
      if (catId === 'all') {
        counts[catId] = allMediaItems.length;
      } else if (catId === 'uncategorized') {
        counts[catId] = allMediaItems.filter(
          (item) => !item.category || item.category === 'uncategorized' || item.category === 'none'
        ).length;
      } else {
        counts[catId] = allMediaItems.filter((item) => item.category === catId).length;
      }
    });
    return counts;
  }, [allMediaItems, categoryKeys]);

  // Filtered Items
  const filteredItems = useMemo(() => {
    return allMediaItems.filter((item) => {
      if (activeCategory !== 'all') {
        if (activeCategory === 'uncategorized') {
          if (item.category && item.category !== 'uncategorized' && item.category !== 'none') {
            return false;
          }
        } else if (item.category !== activeCategory) {
          return false;
        }
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (item.title || '').toLowerCase().includes(q);
        const titleEnMatch = (item.titleEn || '').toLowerCase().includes(q);
        const locMatch = (item.location || '').toLowerCase().includes(q);
        const catMatch = (item.category || '').toLowerCase().includes(q);
        const gearMatch = item.exif ? (item.exif.gear || '').toLowerCase().includes(q) : false;
        return titleMatch || titleEnMatch || locMatch || catMatch || gearMatch;
      }
      return true;
    });
  }, [allMediaItems, activeCategory, searchQuery]);

  const handleCategoryClick = (catId) => {
    playCameraShutterSound();
    setActiveCategory(catId);
  };

  const handleResetFilters = () => {
    playCameraShutterSound();
    setActiveCategory('all');
    setActiveGovernorate('all');
    setSearchQuery('');
  };

  return (
    <section id="gallery" className="py-28 px-6 md:px-12 bg-cinema-black relative z-10 font-thmanyah">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/30 text-cinema-gold font-thmanyah text-xs tracking-wider uppercase mb-3 font-bold">
            <Sparkles size={13} />
            <span>{t.gallery.tag}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white mb-4 uppercase tracking-tight">
            {lang === 'ar' ? (
              <>معرض <span className="text-gold-shimmer">الأعمال الماستر</span></>
            ) : (
              <>Master <span className="text-gold-shimmer">Gallery</span></>
            )}
          </h2>
          <p className="text-slate-300 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Search & View Mode Switcher Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          {/* Search Box */}
          <div className="relative w-full sm:w-84">
            <Search size={16} className={`absolute top-1/2 -translate-y-1/2 text-cinema-gold/70 ${isRtl ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.gallery.searchPlaceholder}
              className={`w-full bg-cinema-card/90 border border-cinema-border rounded-xl py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cinema-gold focus:ring-1 focus:ring-cinema-gold transition-colors font-thmanyah ${
                isRtl ? 'pr-10 pl-9' : 'pl-10 pr-9'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-white ${isRtl ? 'left-3' : 'right-3'}`}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-cinema-card/90 border border-cinema-border rounded-xl p-1 gap-1 shadow-lg">
            <button
              onClick={() => {
                playCameraShutterSound();
                setViewMode('masonry');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'masonry'
                  ? 'bg-cinema-gold text-cinema-black font-extrabold shadow-[0_0_12px_rgba(223,177,91,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title={t.gallery.editorialGrid}
            >
              <LayoutGrid size={13} />
              <span className="hidden md:inline font-thmanyah text-xs">{t.gallery.editorialGrid}</span>
            </button>

            <button
              onClick={() => {
                playCameraShutterSound();
                setViewMode('cinema');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'cinema'
                  ? 'bg-cinema-gold text-cinema-black font-extrabold shadow-[0_0_12px_rgba(223,177,91,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title={t.gallery.cinemaScope}
            >
              <Film size={13} />
              <span className="hidden md:inline font-thmanyah text-xs">{t.gallery.cinemaScope}</span>
            </button>

            <button
              onClick={() => {
                playCameraShutterSound();
                setViewMode('contact');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs transition-all ${
                viewMode === 'contact'
                  ? 'bg-cinema-gold text-cinema-black font-extrabold shadow-[0_0_12px_rgba(223,177,91,0.4)]'
                  : 'text-slate-300 hover:text-white'
              }`}
              title={t.gallery.contactSheet}
            >
              <Grid3X3 size={13} />
              <span className="hidden md:inline font-thmanyah text-xs">{t.gallery.contactSheet}</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {categoryKeys.map((catId) => {
            const count = categoryCounts[catId] || 0;
            const isActive = activeCategory === catId;
            const label = getCategoryLabel(catId);

            return (
              <button
                key={catId}
                onClick={() => handleCategoryClick(catId)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-thmanyah transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cinema-gold text-cinema-black font-bold shadow-[0_0_20px_rgba(223,177,91,0.4)] scale-105'
                    : 'bg-cinema-card border border-cinema-border text-slate-300 hover:border-cinema-gold/40 hover:text-white'
                }`}
              >
                <span>{label}</span>
                <span
                  className={`font-mono text-[0.64rem] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-white/10 text-cinema-gold'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Info & Reset Button */}
        {(activeCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-center gap-3 mb-8 text-xs font-thmanyah text-slate-400">
            <span>
              {t.gallery.showingFrames} <strong className="text-white font-mono">{filteredItems.length}</strong> {t.gallery.framesFor}{' '}
              <strong className="text-cinema-gold">
                {getCategoryLabel(activeCategory)}
              </strong>
              {searchQuery && ` • "${searchQuery}"`}
            </span>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-cinema-cyan hover:underline ml-2 cursor-pointer font-bold"
            >
              <RotateCcw size={12} /> {t.gallery.resetFilter}
            </button>
          </div>
        )}

        {/* Media Grid */}
        <motion.div
          layout
          className={`grid gap-5 ${
            viewMode === 'masonry'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              : viewMode === 'cinema'
              ? 'grid-cols-1 md:grid-cols-2'
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 bg-black/80 p-5 rounded-2xl border border-white/10'
          }`}
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const isTall = viewMode === 'masonry' && (item.category === 'tanoura' || item.category === 'tahtib' || index % 5 === 2);
              const displayTitle = lang === 'ar' ? (item.title || item.titleEn) : (item.titleEn || item.title);

              return (
                <motion.div
                  layout
                  key={item.url}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    playCameraShutterSound();
                    onOpenLightbox(filteredItems, index);
                  }}
                  className={`relative rounded-xl overflow-hidden bg-cinema-card border border-cinema-border hover:border-cinema-gold transition-all duration-500 cursor-pointer group shadow-xl ${
                    viewMode === 'cinema'
                      ? 'aspect-video'
                      : viewMode === 'contact'
                      ? 'aspect-[3/2] border border-neutral-800'
                      : isTall
                      ? 'h-[460px]'
                      : 'h-[320px]'
                  }`}
                >
                  {/* Photo or Video Element */}
                  {item.isVideo ? (
                    <div className="relative w-full h-full">
                      <video
                        src={item.url}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        onMouseEnter={(e) => e.target.play().catch(() => {})}
                        onMouseLeave={(e) => {
                          e.target.pause();
                          e.target.currentTime = 0;
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-cinema-gold/30 border border-cinema-gold text-cinema-gold flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:bg-cinema-gold group-hover:text-cinema-black transition-all duration-300 shadow-[0_0_20px_rgba(223,177,91,0.5)]">
                          <Play size={20} className={isRtl ? 'mr-1' : 'ml-1'} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={displayTitle}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.08]"
                    />
                  )}

                  {/* Top Badge for Video */}
                  {item.isVideo && (
                    <div className="absolute top-3 right-3 bg-cinema-black/85 backdrop-blur-md border border-cinema-gold/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-mono text-[0.62rem] text-cinema-gold font-bold z-20 shadow-lg dir-ltr">
                      <Play size={10} className="fill-current" />
                      <span>{item.format || '4K REEL'}</span>
                    </div>
                  )}

                  {/* Corner Brackets */}
                  <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-cinema-gold opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
                  <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-cinema-gold opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-cinema-gold opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-cinema-gold opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none" />

                  {/* Center Target Crosshair on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="w-12 h-12 border border-cinema-cyan/50 rounded-full flex items-center justify-center text-cinema-cyan animate-pulse">
                      <Focus size={20} />
                    </div>
                  </div>

                  {/* Hover Meta Information Drawer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 pointer-events-none z-20">
                    <div className="flex items-baseline justify-between mb-1.5 font-thmanyah">
                      <h4 className="font-display font-bold text-lg text-white drop-shadow-md">
                        {displayTitle}
                      </h4>
                      <span className="text-xs text-cinema-gold flex items-center gap-1 font-semibold">
                        <MapPin size={11} /> {item.location}
                      </span>
                    </div>

                    {item.isVideo ? (
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-mono text-[0.62rem] text-cinema-gold bg-cinema-black/80 border border-cinema-gold/30 px-2 py-0.5 rounded dir-ltr flex items-center gap-1 font-bold">
                          <Play size={9} className="fill-current" /> {item.duration || '00:30'} • {item.format || 'Reel'}
                        </span>
                        <span className="font-thmanyah text-xs text-cinema-goldLight font-bold">
                          {lang === 'ar' ? 'تشغيل الفيديو بالصوت' : 'Play Cinema Reel'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-thmanyah text-xs text-cinema-gold font-bold flex items-center gap-1.5">
                          <Sparkles size={11} className="text-cinema-gold" />
                          <span>{lang === 'ar' ? 'كادر سينمائي أصيل' : 'Cinematic Frame'}</span>
                        </span>
                        <span className="font-thmanyah text-xs text-slate-300">
                          {t.gallery.clickToInspect}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-thmanyah">
            <Camera size={48} className="mx-auto mb-4 text-cinema-gold/40" />
            <h3 className="font-display text-xl text-white mb-2 font-bold">{t.gallery.emptyTitle}</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              {t.gallery.emptyDesc}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-5 py-2.5 rounded-xl bg-cinema-gold text-cinema-black font-bold text-xs uppercase cursor-pointer"
            >
              {t.gallery.resetAll}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
