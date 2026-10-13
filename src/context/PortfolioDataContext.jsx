import React, { createContext, useContext, useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const STORAGE_KEY = 'ziko_portfolio_data_v3';
const INQUIRIES_KEY = 'ziko_inquiries_v3';
const ADMIN_AUTH_KEY = 'ziko_admin_auth_v3';
const ADMIN_PIN_KEY = 'ziko_admin_pin_v3';
const DEFAULT_PIN = 'ziko2026';

// Secret URL Key Configuration
const SECRET_KEY_STORAGE = 'ziko_secret_key_v3';
const SECRET_SESSION_STORAGE = 'ziko_secret_session_v3';
const DEFAULT_SECRET_KEY = 'ziko_vault_2026';

const defaultHeroCards = [
  {
    id: 'hero-1',
    url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg',
    title: 'مصبغة عم سلامة التراثية',
    titleEn: "Am Salama's Dyehouse",
    location: 'الدرب الأحمر، القاهرة',
    locationEn: 'El-Darb El-Ahmar, Cairo',
    lens: 'عدسة 35 مم سينمائية',
    lensEn: '35mm Cine Prime',
    tag: 'حرفة تراثية منذ 120 عاماً',
    tagEn: '120-Year Heritage Craft',
    aperture: 'f/1.8',
    iso: 'ISO 200',
    focalBadge: '35mm Cine',
  },
  {
    id: 'hero-2',
    url: '/Content/Photo/Vivo Award/2.jpg',
    title: 'انعكاس التاريخ الفاطمي',
    titleEn: 'Reflection of Heritage',
    location: 'شارع المعز لدين الله',
    locationEn: 'Al-Moez Arcade, Cairo',
    lens: 'بصريات ڤيڤو الفائزة',
    lensEn: 'Vivo Flagship Optics',
    tag: 'المركز الثاني عالمياً - ڤيڤو',
    tagEn: 'Vivo Global 2nd Place Winner',
    aperture: 'f/2.2',
    iso: 'ISO 100',
    focalBadge: 'Flagship Optics',
  },
  {
    id: 'hero-3',
    url: '/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/1.jpg',
    title: 'فرسان التحطيب بمولد الحسين',
    titleEn: 'The Art of Tahtib',
    location: 'ساحة مسجد الحسين',
    locationEn: 'Mawlid El-Hussein, Cairo',
    lens: 'عدسة 35 مم راوي الحكاية',
    lensEn: '35mm Cine Prime',
    tag: 'تراث إنساني معتمد باليونسكو',
    tagEn: 'UNESCO Cultural Treasure',
    aperture: 'f/1.4',
    iso: 'ISO 400',
    focalBadge: '35mm Prime',
  },
  {
    id: 'hero-4',
    url: '/Content/Photo/فرقة التنورة/3.jpg',
    title: 'دراويش النور بقبة الغورية',
    titleEn: 'Whirling Dervishes of Ghouri',
    location: 'قبة الغورية، القاهرة',
    locationEn: 'Al-Ghouri Dome, Cairo',
    lens: 'عدسة 50 مم برايم',
    lensEn: '50mm Cine Prime',
    tag: 'حالة صوفية وانسياب لوني',
    tagEn: 'Sufi Spiritual Motion',
    aperture: 'f/2.0',
    iso: 'ISO 320',
    focalBadge: '50mm Prime',
  },
  {
    id: 'hero-5',
    url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/5.jpg',
    title: 'شيخ الصباغين في صومعته',
    titleEn: 'Master Salama in the Steam',
    location: 'قباب الدرب الأحمر',
    locationEn: 'Historic Vaults, Cairo',
    lens: 'عدسة 85 مم بورتريه',
    lensEn: '85mm Master Portrait',
    tag: 'روح الحرفي المصري الأصيل',
    tagEn: 'Master Artisan Spirit',
    aperture: 'f/1.4',
    iso: 'ISO 250',
    focalBadge: '85mm Portrait',
  },
];

const initialData = {
  ...PORTFOLIO_DATA,
  heroCards: defaultHeroCards,
};

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children }) {
  // Load data from localStorage or fallback to default
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialData,
          ...parsed,
          heroCards: parsed.heroCards || defaultHeroCards,
          customCategories: parsed.customCategories || [],
        };
      }
    } catch (e) {
      console.error('Failed to load portfolio data from storage:', e);
    }
    return initialData;
  });

  // Load inquiries
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load inquiries:', e);
    }
    return [
      {
        id: 'inq-sample-1',
        date: new Date().toLocaleDateString('ar-EG'),
        name: 'كريم الشناوي',
        email: 'karim@production.eg',
        phone: '01099887766',
        type: 'documentary',
        location: 'القاهرة التاريخية',
        message: 'نرغب في التعاون لتصوير فيلم وثائقي عن الحرف اليدوية في شارع المعز.',
        status: 'new',
      },
    ];
  });

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminPin, setAdminPin] = useState(() => {
    try {
      return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  });

  // Secret URL Key State
  const [adminSecretKey, setAdminSecretKey] = useState(() => {
    try {
      return localStorage.getItem(SECRET_KEY_STORAGE) || DEFAULT_SECRET_KEY;
    } catch {
      return DEFAULT_SECRET_KEY;
    }
  });

  // Secret Authorized Session (Controls whether portal exists/visible at all)
  const [isSecretAuthorized, setIsSecretAuthorized] = useState(() => {
    try {
      return sessionStorage.getItem(SECRET_SESSION_STORAGE) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Parse and validate Secret URL Key on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryKey = params.get('key') || params.get('secret') || params.get('admin');
      const activeKey = localStorage.getItem(SECRET_KEY_STORAGE) || DEFAULT_SECRET_KEY;

      if (queryKey && queryKey.trim() === activeKey.trim()) {
        setIsSecretAuthorized(true);
        setIsAdminOpen(true);
        sessionStorage.setItem(SECRET_SESSION_STORAGE, 'true');
        // Clean URL so the secret key is removed from address bar and history
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (err) {
      console.error('Error verifying secret URL key:', err);
    }
  }, []);

  // Auto-sync data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving portfolio data to localStorage:', e);
    }
  }, [data]);

  // Auto-sync inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Error saving inquiries to localStorage:', e);
    }
  }, [inquiries]);

  // Auth Functions
  const loginAdmin = (inputPin) => {
    if (inputPin.trim() === adminPin.trim()) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  };

  const changeAdminPin = (newPin) => {
    if (!newPin || newPin.trim().length < 4) return false;
    const clean = newPin.trim();
    setAdminPin(clean);
    localStorage.setItem(ADMIN_PIN_KEY, clean);
    return true;
  };

  const changeSecretKey = (newKey) => {
    if (!newKey || newKey.trim().length < 4) return false;
    const clean = newKey.trim();
    setAdminSecretKey(clean);
    localStorage.setItem(SECRET_KEY_STORAGE, clean);
    return true;
  };

  const getSecretUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';
    return `${origin}${path}?key=${adminSecretKey}`;
  };

  const deauthorizeSecret = () => {
    setIsSecretAuthorized(false);
    setIsAdminLoggedIn(false);
    setIsAdminOpen(false);
    sessionStorage.removeItem(SECRET_SESSION_STORAGE);
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  };

  // --- Category Management ---
  const addCustomCategory = (name) => {
    if (!name || !name.trim()) return null;
    const cleanName = name.trim();
    const cleanId = 'cat_' + cleanName.toLowerCase().replace(/[^a-z0-9\u0621-\u064A]/g, '_');
    const newCategory = {
      id: cleanId,
      labelAr: cleanName,
      labelEn: cleanName,
    };
    setData((prev) => {
      const existing = prev.customCategories || [];
      if (existing.some((c) => c.id === cleanId || c.labelAr === cleanName)) {
        return prev;
      }
      return {
        ...prev,
        customCategories: [...existing, newCategory],
      };
    });
    return cleanId;
  };

  // --- CRUD: Expeditions ---
  const addExpedition = (expedition) => {
    const newExp = {
      id: `exp-${Date.now()}`,
      photoCount: 6,
      gov: 'all',
      ...expedition,
    };
    setData((prev) => ({
      ...prev,
      expeditions: [newExp, ...(prev.expeditions || [])],
    }));
    return newExp;
  };

  const updateExpedition = (id, updatedFields) => {
    setData((prev) => ({
      ...prev,
      expeditions: (prev.expeditions || []).map((exp) =>
        exp.id === id ? { ...exp, ...updatedFields } : exp
      ),
    }));
  };

  const deleteExpedition = (id) => {
    setData((prev) => ({
      ...prev,
      expeditions: (prev.expeditions || []).filter((exp) => exp.id !== id),
    }));
  };

  // --- CRUD: Photos ---
  const addPhoto = (photo) => {
    const newPhoto = {
      id: `photo-${Date.now()}`,
      exif: { gear: '35mm Cine System', focal: '35mm', aperture: 'f/1.8', shutter: '1/320s', iso: '200' },
      ...photo,
    };
    setData((prev) => ({
      ...prev,
      photos: [newPhoto, ...(prev.photos || [])],
    }));
    return newPhoto;
  };

  const updatePhoto = (index, updatedPhoto) => {
    setData((prev) => {
      const updated = [...(prev.photos || [])];
      if (index >= 0 && index < updated.length) {
        updated[index] = { ...updated[index], ...updatedPhoto };
      }
      return { ...prev, photos: updated };
    });
  };

  const deletePhoto = (index) => {
    setData((prev) => {
      const updated = [...(prev.photos || [])];
      if (index >= 0 && index < updated.length) {
        updated.splice(index, 1);
      }
      return { ...prev, photos: updated };
    });
  };

  // --- CRUD: Hero 3D Stage Cards ---
  const updateHeroCards = (newHeroCards) => {
    setData((prev) => ({
      ...prev,
      heroCards: newHeroCards,
    }));
  };

  const updateHeroCard = (index, updatedCard) => {
    setData((prev) => {
      const updated = [...(prev.heroCards || defaultHeroCards)];
      if (index >= 0 && index < updated.length) {
        updated[index] = { ...updated[index], ...updatedCard };
      }
      return { ...prev, heroCards: updated };
    });
  };

  // --- CRUD: Reels & Videos ---
  const addVideo = (video) => {
    const newVideo = {
      id: `vid-${Date.now()}`,
      isVideo: true,
      ...video,
    };
    setData((prev) => ({
      ...prev,
      videos: [newVideo, ...(prev.videos || [])],
    }));
  };

  const updateVideo = (index, updatedVideo) => {
    setData((prev) => {
      const updated = [...(prev.videos || [])];
      if (index >= 0 && index < updated.length) {
        updated[index] = { ...updated[index], ...updatedVideo };
      }
      return { ...prev, videos: updated };
    });
  };

  const deleteVideo = (index) => {
    setData((prev) => {
      const updated = [...(prev.videos || [])];
      if (index >= 0 && index < updated.length) {
        updated.splice(index, 1);
      }
      return { ...prev, videos: updated };
    });
  };

  // --- CRUD: Awards ---
  const addAward = (award) => {
    const newAward = {
      id: `award-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      ...award,
    };
    setData((prev) => ({
      ...prev,
      awards: [newAward, ...(prev.awards || [])],
    }));
  };

  const updateAward = (id, updatedAward) => {
    setData((prev) => ({
      ...prev,
      awards: (prev.awards || []).map((a) =>
        a.id === id ? { ...a, ...updatedAward } : a
      ),
    }));
  };

  const deleteAward = (id) => {
    setData((prev) => ({
      ...prev,
      awards: (prev.awards || []).filter((a) => a.id !== id),
    }));
  };

  // --- CRUD: Photographer Info ---
  const updatePhotographer = (updatedFields) => {
    setData((prev) => ({
      ...prev,
      photographer: {
        ...(prev.photographer || {}),
        ...updatedFields,
      },
    }));
  };

  // --- Inquiries ---
  const addInquiry = (inquiry) => {
    const newInq = {
      id: `inq-${Date.now()}`,
      date: new Date().toLocaleDateString('ar-EG'),
      status: 'new',
      ...inquiry,
    };
    setInquiries((prev) => [newInq, ...prev]);
    return newInq;
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const markInquiryContacted = (id) => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'contacted' } : item
      )
    );
  };

  // --- Backup & Restore ---
  const exportBackup = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ziko-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        setData(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return { success: true };
      }
      return { success: false, error: 'الملف لا يحتوي على بيانات صالحة' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(initialData);
  };

  const value = {
    portfolioData: data,
    inquiries,
    isAdminLoggedIn,
    isAdminOpen,
    setIsAdminOpen,
    loginAdmin,
    logoutAdmin,
    changeAdminPin,
    adminPin,

    // Secret URL Key Protection
    adminSecretKey,
    isSecretAuthorized,
    changeSecretKey,
    getSecretUrl,
    deauthorizeSecret,

    // CRUD
    addExpedition,
    updateExpedition,
    deleteExpedition,
    addPhoto,
    updatePhoto,
    deletePhoto,
    updateHeroCards,
    updateHeroCard,
    addVideo,
    updateVideo,
    deleteVideo,
    addAward,
    updateAward,
    deleteAward,
    updatePhotographer,

    // Inquiries
    addInquiry,
    deleteInquiry,
    markInquiryContacted,

    // Backup
    exportBackup,
    importBackup,
    resetToDefaults,

    // Categories
    customCategories: data.customCategories || [],
    addCustomCategory,
  };

  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
}
