import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';
import { playCameraShutterSound } from '../utils/audioFx';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  // Default to Arabic or previous user selection
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('ziko_portfolio_lang');
      return saved === 'en' ? 'en' : 'ar'; // default to Arabic for authentic Thmanyah experience!
    } catch {
      return 'ar';
    }
  });

  const isRtl = lang === 'ar';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.ar;

  useEffect(() => {
    try {
      localStorage.setItem('ziko_portfolio_lang', lang);
    } catch {}

    // Update document attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    if (isRtl) {
      document.body.classList.add('lang-ar');
      document.title = 'زكريا يحيى | مصور ومخرج سينمائي ووثائقي • أرشيف مصر';
    } else {
      document.body.classList.remove('lang-ar');
      document.title = 'Zakaria Yahia | Cinematic & Documentary Visual Storyteller';
    }
  }, [lang, isRtl]);

  const setLang = (newLang) => {
    playCameraShutterSound();
    setLangState(newLang);
  };

  const toggleLang = () => {
    playCameraShutterSound();
    setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <LanguageContext.Provider value={{ lang, isRtl, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
