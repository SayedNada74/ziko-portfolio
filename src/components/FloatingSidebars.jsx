import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Copy, Check } from 'lucide-react';
import { playCameraShutterSound } from '../utils/audioFx';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { useLanguage } from '../context/LanguageContext';

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

function TikTokIcon({ size = 17, className = '' }) {
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

export default function FloatingSidebars() {
  const { portfolioData } = usePortfolioData();
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const contact = portfolioData?.photographer?.contact || {
    email: 'ziiikoali@gmail.com',
    phone: '01017421158',
    phoneFormatted: '+20 101 742 1158',
    instagram: '_zakaria_yahia_ph',
    instagramLink: 'https://www.instagram.com/_zakaria_yahia_ph/',
    tiktok: '@ziko744',
    tiktokLink: 'https://www.tiktok.com/@ziko744',
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    playCameraShutterSound();
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/201017421158?text=${encodeURIComponent(
        lang === 'ar' ? 'مرحباً زكريا، أرغب في التعاون بمشروع تصوير وثائقي.' : 'Hello Zakaria, I would like to collaborate on a project.'
      )}`,
      icon: <MessageSquare size={17} />,
      colorHover: 'hover:text-emerald-400 hover:border-emerald-500/40',
      title: lang === 'ar' ? 'واتساب' : 'WhatsApp',
    },
    {
      name: 'Instagram',
      href: contact.instagramLink || 'https://www.instagram.com/_zakaria_yahia_ph/',
      icon: <InstagramIcon size={17} />,
      colorHover: 'hover:text-pink-400 hover:border-pink-500/40',
      title: lang === 'ar' ? 'إنستغرام' : 'Instagram',
    },
    {
      name: 'TikTok',
      href: contact.tiktokLink || 'https://www.tiktok.com/@ziko744',
      icon: <TikTokIcon size={16} />,
      colorHover: 'hover:text-cyan-400 hover:border-cyan-500/40',
      title: lang === 'ar' ? 'تيك توك' : 'TikTok',
    },
    {
      name: 'Phone',
      href: `tel:${contact.phone}`,
      icon: <Phone size={16} />,
      colorHover: 'hover:text-cinema-gold hover:border-cinema-gold/40',
      title: lang === 'ar' ? 'اتصال هاتفي' : 'Phone',
    },
    {
      name: 'Mail',
      href: `mailto:${contact.email}`,
      icon: <Mail size={16} />,
      colorHover: 'hover:text-amber-400 hover:border-amber-500/40',
      title: lang === 'ar' ? 'بريد إلكتروني' : 'Email',
    },
  ];

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* LEFT SIDEBAR: FIXED SOCIAL ICONS (طول التمرير في الموقع)       */}
      {/* ------------------------------------------------------------- */}
      <div
        className="fixed bottom-0 left-4 sm:left-6 md:left-7 z-40 hidden md:flex flex-col items-center gap-3.5 select-none pointer-events-auto"
        aria-label="Social Links Sidebar"
      >
        <div className="flex flex-col items-center gap-3">
          {socialLinks.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              title={item.title}
              aria-label={item.name}
              data-magnetic="true"
              onClick={() => playCameraShutterSound()}
              className={`w-9 h-9 rounded-xl bg-[#090d16]/80 backdrop-blur-md border border-white/10 text-slate-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_5px_15px_rgba(223,177,91,0.25)] ${item.colorHover}`}
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Vertical Tail Line (Down to bottom) */}
        <div className="w-[1.5px] h-20 bg-gradient-to-b from-cinema-gold/70 via-cinema-gold/30 to-transparent rounded-full mt-1" />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT SIDEBAR: FIXED VERTICAL EMAIL (طول التمرير في الموقع)    */}
      {/* ------------------------------------------------------------- */}
      <div
        className="fixed bottom-0 right-4 sm:right-6 md:right-7 z-40 hidden md:flex flex-col items-center gap-4 select-none pointer-events-auto"
        aria-label="Email Sidebar"
      >
        <div className="relative group">
          <a
            href={`mailto:${contact.email}`}
            data-magnetic="true"
            onClick={handleCopyEmail}
            title={lang === 'ar' ? 'انقر للنسخ أو إرسال بريد' : 'Click to copy or compose'}
            className="font-mono text-[0.72rem] tracking-[0.22em] text-slate-400 hover:text-cinema-gold transition-all duration-300 [writing-mode:vertical-rl] hover:-translate-y-1.5 cursor-pointer flex items-center gap-2 group-hover:drop-shadow-[0_0_8px_rgba(223,177,91,0.6)]"
          >
            <span>{contact.email}</span>
          </a>

          {/* Copied Tooltip */}
          {copied && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-emerald-500 text-cinema-black font-extrabold text-[0.65rem] px-2 py-1 rounded shadow-lg whitespace-nowrap animate-bounce flex items-center gap-1 font-mono">
              <Check size={12} />
              <span>{lang === 'ar' ? 'تم نسخ الإيميل!' : 'Copied!'}</span>
            </div>
          )}
        </div>

        {/* Vertical Tail Line (Down to bottom) */}
        <div className="w-[1.5px] h-20 bg-gradient-to-b from-cinema-gold/70 via-cinema-gold/30 to-transparent rounded-full" />
      </div>
    </>
  );
}
