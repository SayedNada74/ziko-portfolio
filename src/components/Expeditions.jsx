import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Camera, Compass, Radio } from 'lucide-react';
import { playCameraShutterSound } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

const expeditionTelemetry = {
  'exp-dyehouse': { coords: '30.0412° N, 31.2589° E', sectorEn: 'EL-DARB EL-AHMAR', sectorAr: 'الدرب الأحمر' },
  'exp-tahtib': { coords: '30.0478° N, 31.2635° E', sectorEn: 'MAWLID EL-HUSSEIN', sectorAr: 'مولد الحسين' },
  'exp-tanoura': { coords: '30.0456° N, 31.2608° E', sectorEn: 'GHOURI DOME', sectorAr: 'قبة الغورية' },
  'exp-vivo': { coords: '30.0520° N, 31.2610° E', sectorEn: 'AL-MOEZ ARCADE', sectorAr: 'شارع المعز' },
  'exp-diana': { coords: '30.0490° N, 31.2420° E', sectorEn: 'DOWNTOWN CAIRO', sectorAr: 'وسط البلد' },
  'exp-sharkia': { coords: '30.5877° N, 31.5020° E', sectorEn: 'RURAL NILE DELTA', sectorAr: 'ريف الشرقية' },
};

const arabicExpeditionsContent = {
  'exp-dyehouse': {
    title: 'مصبغة عم سلامة بالدرب الأحمر',
    tagline: 'قرنٌ كامل من النيلة الساخنة والأبخرة المتصاعدة',
    quote: 'تحت قباب المماليك الحجرية، 120 عاماً من القدور النحاسية وأيدي الصباغين المصبوغة بالنيلة تحفظ هوية قاهرة المعز.',
  },
  'exp-tahtib': {
    title: 'فرسان العصا | فن التحطيب بمولد الحسين',
    tagline: 'تراث لامادي معتمد من اليونسكو',
    quote: 'صليل العصي الخيزران، دوائر الرجال بالجلاليب الصعيدية، ونبض الطبول الذي يهز أرجاء ساحة الحسين في القاهرة.',
  },
  'exp-tanoura': {
    title: 'دراويش النور | فرقة التنورة التراثية',
    tagline: 'حالة روحانية وهندسة لونية باهرة',
    quote: 'طبقات التنورة الملونة تدور في انسيابية إعجازية تحت قبة الغورية التي شيدت في القرن السادس عشر لتخطف العقل والوجدان.',
  },
  'exp-vivo': {
    title: 'مشروع مسابقة ڤيڤو العالمية الفائز',
    tagline: 'المركز الثاني عالمياً في السرد البصري',
    quote: 'تخليد الحوارات العفوية في أزقة الحسين، انعكاسات المآذن في ضوء الغروب الذهبي، ودفء الابتسامة المصرية الصادقة.',
  },
  'exp-diana': {
    title: 'سوق ديانا لكاميرات الزمن الجميل',
    tagline: 'كبسولة زمنية للأنتيكات بوسط البلد',
    quote: 'كاميرات رينجفايندر فيلمية، أسطوانات جرامافون، وعشاق النوادر يتفاوضون في ممرات القاهرة الخديوية العتيقة.',
  },
  'exp-sharkia': {
    title: 'ريف الشرقية وحكايات الناس',
    tagline: 'سكينة الحقول وحميمية اللقاءات الإنسانية',
    quote: 'أفق النيل الأخضر، السواقي في ضوء الفجر، وأحاديث دافئة مع أناس صادقين قربتني منهم الكاميرا في قلب الدلتا.',
  },
};

export default function Expeditions({ onSelectExpedition }) {
  const { lang, t, isRtl } = useLanguage();
  const { portfolioData } = usePortfolioData();
  const expeditions = portfolioData?.expeditions || [];

  return (
    <section id="expeditions" className="py-28 px-6 md:px-12 bg-cinema-deep relative z-10 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full border border-cinema-gold/30 animate-pulse-glow" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full border border-cinema-cyan/20" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cinema-gold/10 border border-cinema-gold/30 text-cinema-gold font-thmanyah text-xs tracking-wider uppercase mb-3 font-bold">
            <Compass size={13} className="animate-spin [animation-duration:10s]" />
            <span>{t.expeditions.tag}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white mb-4 uppercase tracking-tight">
            {lang === 'ar' ? (
              <>الرحلات <span className="text-gold-shimmer">الوثائقية</span></>
            ) : (
              <>Documentary <span className="text-gold-shimmer">Expeditions</span></>
            )}
          </h2>
          <p className="font-thmanyah text-slate-300 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.expeditions.subtitle}
          </p>
        </div>

        {/* Expeditions 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-thmanyah">
          {expeditions.map((exp, index) => {
            const telemetry = expeditionTelemetry[exp.id] || { coords: '30.0444° N, 31.2357° E', sectorEn: 'SECTOR-01', sectorAr: 'القطاع الأول' };
            const arContent = arabicExpeditionsContent[exp.id] || {};

            const cardTitle = lang === 'ar' && arContent.title ? arContent.title : (lang === 'ar' && exp.titleAr ? exp.titleAr : exp.title);
            const cardTagline = lang === 'ar' && arContent.tagline ? arContent.tagline : exp.tagline;
            const cardQuote = lang === 'ar' && arContent.quote ? arContent.quote : exp.quote;
            const sectorName = lang === 'ar' ? telemetry.sectorAr : telemetry.sectorEn;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                onClick={() => {
                  playCameraShutterSound();
                  if (onSelectExpedition) onSelectExpedition(exp);
                }}
                className="relative h-[460px] rounded-2xl overflow-hidden cursor-pointer group border border-cinema-border hover:border-cinema-gold transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 bg-cinema-card"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 filter brightness-[0.65] group-hover:brightness-[0.8] contrast-[1.12]"
                  style={{ backgroundImage: `url("${exp.cover}")` }}
                />

                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/40 to-black/30" />

                {/* Top Telemetry Overlay */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="font-thmanyah text-xs text-cinema-gold font-bold px-2.5 py-0.5 rounded bg-cinema-black/85 backdrop-blur-md border border-cinema-gold/30">
                    {sectorName}
                  </span>
                  <span className="font-mono text-[0.6rem] text-cinema-cyan/90 bg-cinema-black/85 backdrop-blur-md px-2 py-0.5 rounded border border-cinema-border flex items-center gap-1 dir-ltr">
                    <Radio size={9} className="animate-pulse text-cinema-cyan" />
                    {telemetry.coords}
                  </span>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-wider text-cinema-gold font-bold block mb-1.5">
                    {cardTagline}
                  </span>
                  <h3 className="font-bold text-xl sm:text-2xl text-white mb-2 leading-snug group-hover:text-cinema-goldLight transition-colors">
                    {cardTitle}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-4 line-clamp-2">
                    "{cardQuote}"
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                    <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                      <Camera size={13} className="text-cinema-gold" />
                      {exp.photoCount} {t.expeditions.masterCount}
                    </span>
                    <span className="text-cinema-gold font-bold flex items-center gap-1 group-hover:gap-2 transition-all text-xs">
                      {t.expeditions.openStory} <ArrowRight size={13} className={isRtl ? 'rotate-180' : ''} />
                    </span>
                  </div>
                </div>

                {/* Corner Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cinema-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cinema-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cinema-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cinema-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
