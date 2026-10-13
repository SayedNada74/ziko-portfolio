import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Quote, Play } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Awards() {
  const { lang, t } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const dynamicAwards = portfolioData?.awards && portfolioData.awards.length ? portfolioData.awards : PORTFOLIO_DATA.awards;

  const arabicAwards = dynamicAwards.map((a, i) => ({
    ...a,
    rankBadge: a.rank || (i === 0 ? '2ND' : '3RD'),
  }));

  const currentAwards = arabicAwards;

  return (
    <section id="awards" className="py-28 px-6 md:px-12 bg-cinema-deep relative z-10 overflow-hidden font-thmanyah">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cinema-gold/5 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/30 text-cinema-gold text-xs tracking-wider uppercase mb-3 font-bold">
            <Trophy size={13} />
            <span>{t.awards.tag}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white mb-4 uppercase tracking-tight">
            {lang === 'ar' ? (
              <>الجوائز <span className="text-gold-shimmer">والاعتراف الإبداعي</span></>
            ) : (
              <>Accolades & <span className="text-gold-shimmer">Recognition</span></>
            )}
          </h2>
          <p className="text-slate-300 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t.awards.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentAwards.map((award, index) => (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative bg-cinema-card border border-cinema-border rounded-2xl p-8 sm:p-10 overflow-hidden shadow-2xl group transition-all duration-300 hover:border-cinema-gold"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cinema-gold/10 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              {/* Medal Badge */}
              <div
                className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center text-cinema-black mb-8 shadow-xl ${
                  index === 0
                    ? 'bg-gradient-to-br from-yellow-300 to-amber-500 shadow-[0_0_25px_rgba(223,177,91,0.5)]'
                    : 'bg-gradient-to-br from-slate-200 to-slate-400 shadow-[0_0_20px_rgba(148,163,184,0.3)]'
                }`}
              >
                {index === 0 ? <Trophy size={22} /> : <Award size={22} />}
                <span className="font-display font-extrabold text-[0.65rem]">
                  {award.rankBadge || award.rank}
                </span>
              </div>

              {/* Card Meta */}
              <div className="flex justify-between items-center mb-3 text-xs">
                <span className="text-slate-400 uppercase tracking-wider font-semibold">
                  {award.organization}
                </span>
                <span className="text-cinema-gold bg-cinema-gold/15 border border-cinema-gold/30 px-2.5 py-0.5 rounded-full font-bold">
                  {award.year} {t.awards.officialWinner}
                </span>
              </div>

              <h3 className="font-display font-extrabold text-2xl text-white mb-3 group-hover:text-cinema-goldLight transition-colors">
                {award.title}
              </h3>

              <p className="text-slate-300 font-light text-sm leading-relaxed mb-6">
                {award.description}
              </p>

              {award.citation && (
                <div className="border-l-2 border-cinema-gold pl-4 py-2 text-xs italic text-slate-300 flex items-start gap-2.5 bg-white/5 rounded-r-lg mb-5">
                  <Quote size={15} className="text-cinema-gold flex-shrink-0 mt-0.5" />
                  <span>"{award.citation}"</span>
                </div>
              )}

              {award.id === 'vivo-award' && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="rounded-xl overflow-hidden border border-cinema-gold/40 bg-black/90 shadow-2xl">
                    <video
                      src="/Content/Photo/Vivo Award/Winner.mp4"
                      controls
                      playsInline
                      className="w-full aspect-video object-cover"
                      poster="/Content/Photo/Vivo Award/2.jpg"
                    />
                    <div className="px-3.5 py-2 bg-cinema-black/90 border-t border-cinema-border flex items-center justify-between text-xs font-thmanyah">
                      <span className="text-cinema-gold font-bold flex items-center gap-1.5">
                        <Play size={11} className="fill-current text-cinema-gold" />
                        {lang === 'ar' ? 'فيديو إعلان الفوز الرسمي بالمسابقة' : 'Official Winner Announcement Video'}
                      </span>
                      <span className="font-mono text-[0.62rem] text-cinema-cyan dir-ltr font-bold">
                        VIVO EGYPT 2026
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
