import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Focus, Aperture, Maximize2, Video, Sliders, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  Camera: Camera,
  Focus: Focus,
  Aperture: Aperture,
  Maximize2: Maximize2,
  Video: Video,
  Sliders: Sliders,
};

const arabicGear = [
  {
    category: 'جسم الكاميرا الرئيسي',
    name: 'نظام سينمائي كامل الإطار (Full-Frame)',
    spec: 'نطاق ديناميكي واسع • تصوير 4K 10-Bit C-LOG • تركيز بؤري هجين فائق السرعة',
    icon: 'Camera'
  },
  {
    category: 'العدسة البرايم الأساسية',
    name: 'عدسة سينمائية 35 مم f/1.4 Prime',
    spec: 'عدسة راوي الحكايات الوثائقية • حدة بصرية استثنائية • منظور طبيعي مريح للعين',
    icon: 'Focus'
  },
  {
    category: 'عدسة الملامح والوجوه',
    name: 'عدسة بورتريه 85 مم f/1.4 Prime',
    spec: 'عزل خلفيات سينمائي فائق النعومة (Bokeh) • تفاصيل دقيقة للمشاعر الإنسانية',
    icon: 'Aperture'
  },
  {
    category: 'العدسة الواسعة للمشاهد',
    name: 'عدسة سينمائية فائقة الاتساع 16-35 مم f/2.8',
    spec: 'تأطير معماري ملحمي للمساجد التاريخية والأفق الساحلي في الإسكندرية',
    icon: 'Maximize2'
  },
  {
    category: 'تثبيت الحركة الميداني',
    name: 'مثبت كاميرا سينمائي ثلاثي المحاور (Gimbal)',
    spec: 'لقطات تتبع مستمرة (Tracking Shots) بين حركات الناس في الأسواق والأزقة',
    icon: 'Video'
  },
  {
    category: 'المظلمة الرقمية وعلم الألوان',
    name: 'جناح تدريج الألوان DaVinci Resolve Studio',
    spec: 'معالجة احترافية بنظام ألوان ACEScc • تدريج عميق 32-Bit يحفظ تفاصيل الضوء المصري',
    icon: 'Sliders'
  }
];

export default function GearLocker() {
  const { lang, t } = useLanguage();
  const gearItems = lang === 'ar' ? arabicGear : (PORTFOLIO_DATA.gear || []);

  return (
    <section id="gear" className="py-28 px-6 md:px-12 bg-cinema-secondary relative z-10 overflow-hidden font-thmanyah">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cinema-cyan/10 border border-cinema-cyan/30 text-cinema-cyan text-xs tracking-wider uppercase mb-3 font-bold">
            <Cpu size={13} />
            <span>{t.gear.tag}</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white mb-4 uppercase tracking-tight">
            {lang === 'ar' ? (
              <>صندوق <span className="text-gold-shimmer">المعدات والعدسات</span></>
            ) : (
              <>The <span className="text-gold-shimmer">Gear Locker</span></>
            )}
          </h2>
          <p className="text-slate-300 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            {t.gear.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gearItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Camera;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-cinema-card border border-cinema-border hover:border-cinema-cyan p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-xl group flex flex-col gap-3 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cinema-cyan/5 rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                <div className="w-12 h-12 rounded-xl bg-cinema-cyan/15 border border-cinema-cyan/30 flex items-center justify-center text-cinema-cyan group-hover:bg-cinema-cyan group-hover:text-cinema-black transition-all duration-300 shadow-md mb-2">
                  <IconComponent size={22} />
                </div>

                <span className="text-xs uppercase tracking-wider text-cinema-gold font-bold">
                  {item.category}
                </span>

                <h3 className="font-display font-extrabold text-xl text-white group-hover:text-cinema-cyan transition-colors">
                  {item.name}
                </h3>

                <p className="text-slate-300 font-light text-xs sm:text-sm leading-relaxed">
                  {item.spec}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
