import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Lock,
  ArrowUp,
  MapPin,
  Clock,
  Sparkles,
  Trophy,
  Compass,
  Film,
  Camera,
} from 'lucide-react';
import { playCameraShutterSound } from '../utils/audioFx';
import { useLanguage } from '../context/LanguageContext';
import { usePortfolioData } from '../context/PortfolioDataContext';

function InstagramIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.27 1.76-.29 1.13.06 2.39.87 3.21.75.78 1.9 1.18 2.99 1.05 1.03-.09 1.97-.73 2.45-1.63.3-.54.43-1.16.44-1.77.03-4.57.01-9.15.02-13.72z" />
    </svg>
  );
}

export default function Footer() {
  const { lang, t, isRtl } = useLanguage();
  const { setIsAdminOpen, portfolioData, isSecretAuthorized } = usePortfolioData();
  const [cairoTime, setCairoTime] = useState('');

  // Live Cairo Local Time (UTC+3 / UTC+2 according to Egypt standard time)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('ar-EG', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setCairoTime(timeStr);
      } catch {
        setCairoTime('القاهرة');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playCameraShutterSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: lang === 'ar' ? 'الرئيسية' : 'Home', href: '#hero' },
    { name: lang === 'ar' ? 'الفصول الوثائقية' : 'Expeditions', href: '#expeditions' },
    { name: lang === 'ar' ? 'المعرض والريلز' : 'Gallery & Reels', href: '#gallery' },
    { name: lang === 'ar' ? 'معمل تدريج الألوان' : 'Color Lab', href: '#lab' },
    { name: lang === 'ar' ? 'الجوائز والتكريمات' : 'Awards', href: '#awards' },
    { name: lang === 'ar' ? 'عن زكريا' : 'About', href: '#about' },
    { name: lang === 'ar' ? 'حجز وتواصل' : 'Contact', href: '#contact' },
  ];

  const chapters = [
    { name: lang === 'ar' ? 'مصبغة عم سلامة بالدرب الأحمر' : 'Am Salama Dyehouse', href: '#expeditions' },
    { name: lang === 'ar' ? 'فرسان التحطيب بمولد الحسين' : 'The Art of Tahtib', href: '#expeditions' },
    { name: lang === 'ar' ? 'دراويش النور بقبة الغورية' : 'Whirling Dervishes', href: '#expeditions' },
    { name: lang === 'ar' ? 'مشروع مسابقة ڤيڤو الفائز' : 'Vivo Award Story', href: '#expeditions' },
    { name: lang === 'ar' ? 'سوق ديانا للأنتيكات' : 'Diana Vintage Market', href: '#expeditions' },
    { name: lang === 'ar' ? 'ريف الشرقية وحكايات الناس' : 'Rural Sharkia Stories', href: '#expeditions' },
  ];

  return (
    <footer
      dir={isRtl ? 'rtl' : 'ltr'}
      className="relative bg-gradient-to-b from-[#04060a] via-[#060911] to-[#020306] border-t border-cinema-gold/20 pt-20 pb-12 px-6 md:px-12 text-slate-300 font-thmanyah select-none overflow-hidden"
    >
      {/* Background Optical Flares */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-cinema-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Top Call to Action Strip */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0d121f] via-[#090d16] to-[#0e1422] border border-cinema-border/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cinema-gold/15 border border-cinema-gold/30 text-cinema-gold text-xs font-bold mb-3">
              <Sparkles size={12} />
              <span>{lang === 'ar' ? 'رسالة بصرية خالدة' : 'Bespoke Visual Narrative'}</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {lang === 'ar' ? (
                <>لِنصنع لقصتك <span className="text-gold-shimmer">كادراً سينمائياً أصيلاً</span></>
              ) : (
                <>Let's Immortalize Your <span className="text-gold-shimmer">Story</span></>
              )}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
              {lang === 'ar'
                ? 'توثيق المشاريع التراثية، الحملات الثقافية، وتصوير الأفلام والبورتريه بعدسة 35 ملم وتدرج لوني سينمائي خاص.'
                : 'Preserving living crafts, heritage documentaries, and timeless human portraits across Egypt.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/201017421158?text=مرحباً%20زكريا،%20أرغب%20في%20التعاون%20في%20مشروع%20تصوير."
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              onClick={() => playCameraShutterSound()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-cinema-gold text-cinema-black font-extrabold text-xs shadow-[0_10px_30px_rgba(223,177,91,0.35)] hover:bg-cinema-goldLight hover:scale-105 transition-all cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>{lang === 'ar' ? 'تواصل عبر واتساب مباشر' : 'Start WhatsApp Chat'}</span>
            </a>

            <a
              href="#contact"
              data-magnetic="true"
              onClick={() => playCameraShutterSound()}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs transition-all cursor-pointer hover:border-cinema-gold/40"
            >
              <Camera size={15} />
              <span>{lang === 'ar' ? 'حجز جلسة عمل' : 'Book a Session'}</span>
            </a>
          </div>
        </div>

        {/* 4-Column Master Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand & Identity (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cinema-gold via-amber-500 to-amber-700 p-0.5 shadow-[0_0_20px_rgba(223,177,91,0.4)]">
                <div className="w-full h-full bg-[#0a0d14] rounded-[14px] flex items-center justify-center text-cinema-gold font-extrabold text-lg font-display">
                  ZY
                </div>
              </div>
              <div>
                <span className="font-display font-extrabold text-2xl text-white block uppercase tracking-tight">
                  {lang === 'ar' ? 'زكريا يحيى' : 'Zakaria Yahia'}
                </span>
                <span className="text-xs text-cinema-gold font-bold uppercase tracking-wider block">
                  {t.footer.role}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              {lang === 'ar'
                ? 'مخرج ومصور وثائقي مصري مقيم بالقاهرة، حاصل على المركز الثاني عالمياً في مسابقة ڤيڤو، يكرس عدسته لحفظ الذاكرة الشعبية والهوية التراثية المصرية في أنقى أشكالها.'
                : 'Award-winning Egyptian documentary photographer and director preserving timeless heritage crafts and human stories through bespoke optical discipline.'}
            </p>

            {/* Live Cairo Telemetry Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[0.72rem] text-slate-300">
                <MapPin size={12} className="text-cinema-gold" />
                <span>{lang === 'ar' ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[0.72rem] text-slate-300 font-mono dir-ltr">
                <Clock size={12} className="text-cinema-cyan" />
                <span>{cairoTime || 'Cairo Time'}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[0.72rem] text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{lang === 'ar' ? 'متاح للمشاريع الفنية' : 'Available for Booking'}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Documentary Chapters (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 pb-2 border-b border-white/10">
              <Compass size={14} className="text-cinema-gold" />
              <span>{lang === 'ar' ? 'الفصول الوثائقية' : 'Documentary Chapters'}</span>
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {chapters.map((chap, i) => (
                <li key={i}>
                  <a
                    href={chap.href}
                    data-magnetic="true"
                    onClick={() => playCameraShutterSound()}
                    className="text-slate-400 hover:text-cinema-gold transition-colors block py-0.5"
                  >
                    {chap.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 pb-2 border-b border-white/10">
              <Film size={14} className="text-cinema-gold" />
              <span>{lang === 'ar' ? 'استكشف' : 'Explore'}</span>
            </h4>
            <ul className="flex flex-col gap-2 text-xs">
              {navLinks.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    data-magnetic="true"
                    onClick={() => playCameraShutterSound()}
                    className="text-slate-400 hover:text-cinema-gold transition-colors block py-0.5"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Social Channels (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5 pb-2 border-b border-white/10">
              <Sparkles size={14} className="text-cinema-gold" />
              <span>{lang === 'ar' ? 'قنوات التواصل' : 'Connect'}</span>
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/201017421158"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                onClick={() => playCameraShutterSound()}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/5 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-400 text-xs transition-all"
              >
                <MessageSquare size={15} />
                <span className="font-mono text-[0.75rem]">01017421158</span>
              </a>

              <a
                href="https://www.instagram.com/_zakaria_yahia_ph/"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                onClick={() => playCameraShutterSound()}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-pink-500/20 border border-white/5 hover:border-pink-500/40 text-slate-300 hover:text-pink-400 text-xs transition-all"
              >
                <InstagramIcon size={15} />
                <span className="font-mono text-[0.75rem]">@_zakaria_yahia_ph</span>
              </a>

              <a
                href="https://www.tiktok.com/@ziko744"
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                onClick={() => playCameraShutterSound()}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/5 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 text-xs transition-all"
              >
                <TikTokIcon size={14} />
                <span className="font-mono text-[0.75rem]">@ziko744</span>
              </a>

              <a
                href="mailto:ziiikoali@gmail.com"
                data-magnetic="true"
                onClick={() => playCameraShutterSound()}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 hover:bg-cinema-gold/20 border border-white/5 hover:border-cinema-gold/40 text-slate-300 hover:text-cinema-gold text-xs transition-all"
              >
                <Mail size={15} />
                <span className="font-mono text-[0.75rem]">ziiikoali@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Scroll to Top + CMS Portal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
            <p>{t.footer.rights}</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-3 text-cinema-gold font-bold">
              <span className="flex items-center gap-1">
                <Trophy size={12} />
                {lang === 'ar' ? 'المركز الثاني عالمياً - ڤيڤو' : 'Vivo 2nd Place Global'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* CMS Portal Access Button (Hidden from public; only visible when secret authorized) */}
            {isSecretAuthorized && (
              <button
                onClick={() => {
                  playCameraShutterSound();
                  setIsAdminOpen(true);
                }}
                data-magnetic="true"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-cinema-gold/15 border border-cinema-gold/50 text-cinema-gold transition-all text-xs cursor-pointer shadow-md"
              >
                <Lock size={13} className="text-cinema-gold" />
                <span>{lang === 'ar' ? 'لوحة الإدارة المعتمدة (CMS)' : 'Director CMS Portal'}</span>
              </button>
            )}

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              data-magnetic="true"
              aria-label="Scroll back to top"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-cinema-card border border-cinema-border hover:border-cinema-gold hover:text-cinema-gold text-white transition-all text-xs cursor-pointer shadow-lg active:scale-95 group"
            >
              <span>{lang === 'ar' ? 'للأعلى' : 'Top'}</span>
              <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform text-cinema-gold" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
