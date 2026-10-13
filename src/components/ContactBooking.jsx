import React, { useState } from 'react';
import {
  Send,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  MapPin,
  ExternalLink,
  ChevronDown,
  ChevronUp,
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

function FacebookIcon({ size = 18, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function ContactBooking() {
  const { lang, t, isRtl } = useLanguage();
  const { portfolioData, addInquiry } = usePortfolioData();

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showBriefForm, setShowBriefForm] = useState(false);
  const [status, setStatus] = useState('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'street',
    location: '',
    message: '',
  });

  const contact = portfolioData?.photographer?.contact || {
    email: 'ziiikoali@gmail.com',
    phone: '01017421158',
    phoneFormatted: '+20 101 742 1158',
    instagram: '_zakaria_yahia_ph',
    instagramLink: 'https://www.instagram.com/_zakaria_yahia_ph/',
    tiktok: '@ziko744',
    tiktokLink: 'https://www.tiktok.com/@ziko744',
  };

  const emailAddress = contact.email || 'ziiikoali@gmail.com';
  const whatsappUrl = `https://wa.me/201017421158?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً زكريا، أود التواصل معك لمشروع تصوير وإنتاج وثائقي.'
      : 'Hello Zakaria, I would like to discuss a documentary and photography project.'
  )}`;

  const handleCopyEmail = () => {
    playCameraShutterSound();
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert(lang === 'ar' ? 'يرجى إدخال الاسم، البريد الإلكتروني، ورقم الهاتف.' : 'Please fill in Name, Email, and Phone.');
      return;
    }

    playCameraShutterSound();
    setStatus('submitting');
    addInquiry(formData);

    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'street',
        location: '',
        message: '',
      });
      setTimeout(() => {
        setStatus('idle');
        setShowBriefForm(false);
      }, 3500);
    }, 1000);
  };

  // 6 Sleek Contact Cards matching the reference layout
  const contactCards = [
    {
      title: 'WhatsApp',
      handle: 'wa.me/201017421158',
      href: whatsappUrl,
      icon: <MessageSquare size={18} className="text-emerald-400" />,
      colorHover: 'hover:border-emerald-500/50 group-hover:text-emerald-400',
    },
    {
      title: lang === 'ar' ? 'الهاتف المباشر' : 'Direct Phone',
      handle: '+20 101 742 1158',
      href: `tel:${contact.phone}`,
      icon: <Phone size={18} className="text-cinema-gold" />,
      colorHover: 'hover:border-cinema-gold/50 group-hover:text-cinema-gold',
    },
    {
      title: 'Instagram',
      handle: 'instagram.com/_zakaria_yahia_ph',
      href: contact.instagramLink || 'https://www.instagram.com/_zakaria_yahia_ph/',
      icon: <InstagramIcon size={18} className="text-pink-400" />,
      colorHover: 'hover:border-pink-500/50 group-hover:text-pink-400',
    },
    {
      title: 'TikTok',
      handle: 'tiktok.com/@ziko744',
      href: contact.tiktokLink || 'https://www.tiktok.com/@ziko744',
      icon: <TikTokIcon size={17} className="text-cyan-400" />,
      colorHover: 'hover:border-cyan-500/50 group-hover:text-cyan-400',
    },
    {
      title: 'Facebook',
      handle: 'facebook.com/zakaria.yahia.doc',
      href: 'https://www.facebook.com',
      icon: <FacebookIcon size={18} className="text-blue-400" />,
      colorHover: 'hover:border-blue-500/50 group-hover:text-blue-400',
    },
    {
      title: lang === 'ar' ? 'المقر والاستوديو' : 'Studio Location',
      handle: lang === 'ar' ? 'القاهرة، مصر • المعز والدرب الأحمر' : 'Cairo, Egypt • Historic Core',
      href: '#hero',
      icon: <MapPin size={18} className="text-amber-400" />,
      colorHover: 'hover:border-amber-500/50 group-hover:text-amber-400',
    },
  ];

  return (
    <section
      id="contact"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-[#06080e] relative z-10 overflow-hidden font-thmanyah select-none border-t border-cinema-border/50"
    >
      {/* Background Soft Optical Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cinema-gold/10 via-cyan-500/5 to-cinema-gold/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        {/* ------------------------------------------------------------- */}
        {/* 1. TOP STATUS BADGE & PILL                                   */}
        {/* ------------------------------------------------------------- */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d1322] border border-cinema-gold/40 text-cinema-gold text-xs tracking-wider uppercase mb-6 font-bold shadow-[0_0_20px_rgba(223,177,91,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{lang === 'ar' ? 'تواصل مع المخرج الوثائقي • Connect' : 'Connect // Direct Inquiries'}</span>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. PITCH & SUBTITLE                                          */}
        {/* ------------------------------------------------------------- */}
        <p className="text-slate-300 font-normal text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
          {lang === 'ar'
            ? 'مستعد لتوثيق مشاريعكم التراثية، الأفلام الوثائقية، والحملات البصرية في مصر والشرق الأوسط. بريدي الإلكتروني والواتساب هما أسرع وسيلة للتواصل المباشر.'
            : 'Open to documentary commissions, cultural heritage preservation, and cinematic visual direction across Egypt and MENA. My inbox and WhatsApp are the fastest way in.'}
        </p>

        {/* ------------------------------------------------------------- */}
        {/* 3. TWO ACTION PILLS (Start Conversation / View Resume)        */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {/* Primary Action Button (Gradient Cyan-Gold glow) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic="true"
            onClick={() => playCameraShutterSound()}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-[0_10px_35px_rgba(45,212,191,0.35)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{lang === 'ar' ? 'بدء محادثة فورية' : 'Start a conversation'}</span>
            <ArrowUpRight size={16} className={isRtl ? 'rotate-[-90deg]' : ''} />
          </a>

          {/* Secondary Action Button (Toggle Project Brief Form) */}
          <button
            type="button"
            data-magnetic="true"
            onClick={() => {
              playCameraShutterSound();
              setShowBriefForm(!showBriefForm);
            }}
            className="px-7 py-3 rounded-full bg-[#0d1322]/80 hover:bg-[#131c33] border border-white/20 hover:border-cinema-gold/60 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>{lang === 'ar' ? 'طلب حجز واستشارة إبداعية' : 'Send Project Brief'}</span>
            {showBriefForm ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 4. COPYABLE EMAIL CAPSULE PILL (زي الصورة بالظبط)            */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0b101c]/90 border border-white/15 hover:border-cinema-gold/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all group">
            <a
              href={`mailto:${emailAddress}`}
              onClick={() => playCameraShutterSound()}
              className="font-mono text-xs sm:text-sm text-slate-300 group-hover:text-cinema-gold transition-colors flex items-center gap-1.5 dir-ltr"
            >
              <span>{emailAddress}</span>
              <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cinema-gold transition-colors" />
            </a>

            <div className="w-[1px] h-4 bg-white/10" />

            {/* Copy Button */}
            <button
              onClick={handleCopyEmail}
              data-magnetic="true"
              title={lang === 'ar' ? 'نسخ البريد الإلكتروني' : 'Copy Email'}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-1 text-[0.7rem]"
            >
              {copiedEmail ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold">{lang === 'ar' ? 'تم النسخ!' : 'Copied!'}</span>
                </>
              ) : (
                <Copy size={14} />
              )}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 5. CENTER GLOWING CONNECTOR DOT (الدائرة المضيئة زي الصورة)    */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-col items-center justify-center my-2">
          <div className="w-[1px] h-6 bg-gradient-to-b from-transparent to-cyan-400/60" />
          <div className="w-5 h-5 rounded-full border border-cyan-400/50 bg-[#080d1a] flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)] my-0.5">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="w-[1px] h-6 bg-gradient-to-t from-transparent to-cyan-400/60" />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 6. GRID OF 6 CONTACT CARDS (شبكة كروت التواصل الـ 6)         */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-8 mb-12 text-right rtl:text-right ltr:text-left">
          {contactCards.map((card, idx) => (
            <a
              key={idx}
              href={card.href}
              target={card.href.startsWith('#') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              data-magnetic="true"
              onClick={() => playCameraShutterSound()}
              className={`p-4 sm:p-5 rounded-2xl bg-[#0b0f1a]/85 backdrop-blur-md border border-white/10 hover:bg-[#111728] transition-all duration-300 shadow-lg flex items-center justify-between group cursor-pointer hover:-translate-y-1 ${card.colorHover}`}
            >
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <div className="flex flex-col truncate">
                  <span className="font-bold text-xs sm:text-sm text-white group-hover:text-cinema-gold transition-colors">
                    {card.title}
                  </span>
                  <span className="text-[0.68rem] text-slate-400 font-mono truncate dir-ltr">
                    {card.handle}
                  </span>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-500 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0"
              />
            </a>
          ))}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 7. EXPANDABLE PROJECT BRIEF CONSOLE (استمارة الحجز المباشرة)   */}
        {/* ------------------------------------------------------------- */}
        {showBriefForm && (
          <div className="w-full bg-[#0a0e19] border border-cinema-gold/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.9)] mb-12 transition-all duration-500 text-right rtl:text-right ltr:text-left animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <h3 className="font-display font-extrabold text-xl text-white">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs text-cinema-gold mt-0.5">
                  {t.contact.formSubtitle}
                </p>
              </div>
              <button
                onClick={() => setShowBriefForm(false)}
                className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق الاستمارة' : 'Close form'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-bold">{t.contact.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.namePlaceholder}
                    className="bg-[#05070d] border border-cinema-border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-cinema-gold transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-bold">{t.contact.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.emailPlaceholder}
                    className="bg-[#05070d] border border-cinema-border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-cinema-gold transition-colors font-mono dir-ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-bold">{t.contact.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.contact.phonePlaceholder}
                    className="bg-[#05070d] border border-cinema-border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-cinema-gold transition-colors font-mono dir-ltr"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-300 font-bold">{t.contact.typeLabel}</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="bg-[#05070d] border border-cinema-border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-cinema-gold transition-colors font-thmanyah"
                  >
                    <option value="street">{t.contact.types.street}</option>
                    <option value="portrait">{t.contact.types.portrait}</option>
                    <option value="events">{t.contact.types.events}</option>
                    <option value="travel">{t.contact.types.travel}</option>
                    <option value="commercial">{t.contact.types.commercial}</option>
                    <option value="color">{t.contact.types.color}</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-bold">{t.contact.locationLabel}</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={t.contact.locationPlaceholder}
                  className="bg-[#05070d] border border-cinema-border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-cinema-gold transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 font-bold">{t.contact.messageLabel}</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.messagePlaceholder}
                  className="bg-[#05070d] border border-cinema-border rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-cinema-gold transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full mt-2 py-4 rounded-xl bg-cinema-gold hover:bg-cinema-goldLight text-cinema-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_30px_rgba(223,177,91,0.35)] cursor-pointer active:scale-95"
              >
                {status === 'submitting' ? (
                  <span>{t.contact.submittingBtn}</span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2 text-emerald-950 font-bold">
                    <CheckCircle2 size={16} /> {t.contact.successBtn}
                  </span>
                ) : (
                  <>
                    <Send size={15} className={isRtl ? 'rotate-180' : ''} />
                    <span>{t.contact.submitBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 8. BOTTOM TELEMETRY STATUS STRIP (زي الفوتر بالصورة)          */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <p className="font-mono text-[0.72rem]">
            © 2026 Zakaria Yahia. Crafted with Cinematic Passion & Vision.
          </p>

          <div className="flex items-center gap-2 text-[0.72rem] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold">Cairo, Egypt • All Systems Operational</span>
          </div>
        </div>

      </div>
    </section>
  );
}
