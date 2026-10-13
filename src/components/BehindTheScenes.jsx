import React from 'react';
import { motion } from 'framer-motion';
import { Clapperboard } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const englishBts = [
  {
    title: "Inside Am Salama's Dyehouse",
    description: 'Operating amidst boiling steam cauldrons and heavy humidity, calibrating high-ISO sensors under 120-year-old historic stone vaults in El-Darb El-Ahmar.',
    url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/3.jpg',
  },
  {
    title: 'The Tahtib Circle at Mawlid El-Hussein',
    description: 'Weaving between swift hardwood stave strikes and dense celebration crowds to lock razor-sharp focus at 1/1000s shutter speed in Islamic Cairo.',
    url: '/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/5.jpg',
  },
  {
    title: 'Whirling Dervishes at Ghouri Dome',
    description: 'Balancing optical shutter angles to freeze the spiritual ecstasy of the dervish while rendering the kaleidoscopic skirt tiers as fluid color streaks.',
    url: '/Content/Photo/فرقة التنورة/1.jpg',
  },
];

export default function BehindTheScenes() {
  const { lang, t } = useLanguage();
  const btsItems = lang === 'ar' ? (PORTFOLIO_DATA.bts || []) : englishBts;

  return (
    <section id="bts" className="py-28 px-6 md:px-12 bg-cinema-secondary relative z-10 overflow-hidden font-thmanyah">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/30 text-cinema-gold text-xs tracking-wider uppercase mb-3 font-bold">
            <Clapperboard size={13} />
            <span>{t.bts.tag}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white mb-4 uppercase tracking-tight">
            {lang === 'ar' ? (
              <>خلف <span className="text-gold-shimmer">الكواليس الميدانية</span></>
            ) : (
              <>Behind The <span className="text-gold-shimmer">Scenes</span></>
            )}
          </h2>
          <p className="text-slate-300 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t.bts.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {btsItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -5 }}
              className="bg-cinema-card border border-cinema-border rounded-2xl overflow-hidden shadow-xl group transition-all duration-300 hover:border-cinema-gold relative"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.05]"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-xs text-cinema-gold font-bold">
                  {t.bts.badge}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-cinema-goldLight transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 font-light text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
