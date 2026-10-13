import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Languages, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function AboutDirector() {
  const { lang, t, setLang } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const customBioAr = portfolioData?.photographer?.bioArabic;
  const customBioEn = portfolioData?.photographer?.bioEnglish;

  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-cinema-deep relative z-10 overflow-hidden font-thmanyah">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-cinema-gold/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Bio Text (Left) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/30 text-cinema-gold text-xs tracking-wider uppercase mb-3 font-bold">
                <Sparkles size={13} />
                <span>{t.director.tag}</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
                {lang === 'ar' ? (
                  <>ما وراء <span className="text-gold-shimmer">العدسة</span></>
                ) : (
                  <>Behind the <span className="text-gold-shimmer">Lens</span></>
                )}
              </h2>
            </div>

            {/* Content Container (Written in Thmanyah Documentary Tone) */}
            <div className="flex flex-col gap-5 text-slate-300 font-light text-sm sm:text-base leading-relaxed">
              <p className="font-display italic text-lg sm:text-xl text-cinema-goldLight font-bold leading-normal border-r-2 rtl:border-r-2 ltr:border-l-2 border-cinema-gold px-4 py-1 bg-white/5 rounded-lg">
                {t.director.quote}
              </p>
              {lang === 'ar' && customBioAr ? (
                <p className="leading-relaxed whitespace-pre-line">{customBioAr}</p>
              ) : lang === 'en' && customBioEn ? (
                <p className="leading-relaxed whitespace-pre-line">{customBioEn}</p>
              ) : (
                <>
                  <p className="leading-relaxed">{t.director.bio1}</p>
                  <p className="leading-relaxed">{t.director.bio2}</p>
                  <p className="leading-relaxed">{t.director.bio3}</p>
                </>
              )}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 font-thmanyah">
              <div className="bg-cinema-card border border-cinema-border rounded-xl p-4 text-center">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-cinema-gold block">
                  2nd
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mt-1 font-bold">
                  {t.director.statVivo}
                </span>
              </div>
              <div className="bg-cinema-card border border-cinema-border rounded-xl p-4 text-center">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-cinema-gold block">
                  3rd
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mt-1 font-bold">
                  {t.director.statUniv}
                </span>
              </div>
              <div className="bg-cinema-card border border-cinema-border rounded-xl p-4 text-center">
                <span className="font-display font-extrabold text-2xl sm:text-3xl text-cinema-gold block">
                  50+
                </span>
                <span className="text-xs text-slate-400 uppercase tracking-wider block mt-1 font-bold">
                  {t.director.statStories}
                </span>
              </div>
            </div>
          </div>

          {/* Portrait Image (Right) */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative w-full max-w-sm rounded-2xl p-3 bg-gradient-to-br from-cinema-gold/30 via-white/5 to-transparent border border-cinema-border shadow-2xl"
            >
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-black">
                <img
                  src="/About Me/20240629183655_IMG_0806_١١٥٤٢٣.JPG"
                  alt="Zakaria Yahia Photographer Portrait"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter contrast-[1.05]"
                />
                
                {/* Floating Info Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-cinema-black/90 backdrop-blur-md border border-cinema-gold/40 p-3.5 rounded-xl flex flex-col shadow-xl font-thmanyah">
                  <span className="font-display font-bold text-base text-white">
                    {lang === 'ar' ? 'زكريا يحيى' : 'Zakaria Yahia'}
                  </span>
                  <span className="text-xs text-cinema-gold flex items-center gap-1 font-semibold">
                    <MapPin size={12} /> {t.director.inField}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
