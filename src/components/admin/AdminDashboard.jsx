import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Compass,
  Trophy,
  Film,
  User,
  Inbox,
  Settings,
  X,
  Plus,
  Trash2,
  Edit3,
  Check,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Download,
  Upload,
  RefreshCw,
  Search,
  Camera,
  Aperture,
  MapPin,
  ExternalLink,
  MessageSquare,
  Phone,
  Mail,
  ShieldCheck,
  Save,
  Layers,
  Sparkles,
  Sliders,
} from 'lucide-react';
import { usePortfolioData } from '../../context/PortfolioDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { playCameraShutterSound } from '../../utils/audioFx';

// Presets for quick image selection
const PRESET_IMAGES = [
  { label: 'مصبغة عم سلامة - 1', url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg' },
  { label: 'مصبغة عم سلامة - 2', url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/2.jpg' },
  { label: 'مصبغة عم سلامة - 5', url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/5.jpg' },
  { label: 'فرسان التحطيب - 1', url: '/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/1.jpg' },
  { label: 'فرسان التحطيب - 2', url: '/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/2.jpg' },
  { label: 'فرقة التنورة - 1', url: '/Content/Photo/فرقة التنورة/1.jpg' },
  { label: 'فرقة التنورة - 3', url: '/Content/Photo/فرقة التنورة/3.jpg' },
  { label: 'جائزة ڤيڤو - 2', url: '/Content/Photo/Vivo Award/2.jpg' },
  { label: 'سوق ديانا - نوادر', url: '/Content/Photo/صور مميزه/retouch_2024062212325618.jpg' },
  { label: 'ريف الشرقية', url: '/Content/Photo/صور مميزه/photo_2025-05-09_16-32-55.jpg' },
  { label: 'شارع المعز كادر ذهبي', url: '/Content/Photo/صور مميزه/retouch_2024072216254125.jpg' },
];

export default function AdminDashboard({ onClose }) {
  const { lang, isRtl } = useLanguage();
  const {
    portfolioData,
    inquiries,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    changeAdminPin,
    adminPin,
    addExpedition,
    updateExpedition,
    deleteExpedition,
    addPhoto,
    updatePhoto,
    deletePhoto,
    updateHeroCard,
    addVideo,
    deleteVideo,
    addAward,
    updateAward,
    deleteAward,
    updatePhotographer,
    deleteInquiry,
    markInquiryContacted,
    exportBackup,
    importBackup,
    resetToDefaults,
    adminSecretKey,
    changeSecretKey,
    getSecretUrl,
    deauthorizeSecret,
    customCategories,
    addCustomCategory,
  } = usePortfolioData();

  // Lock body scroll while Admin Dashboard is mounted
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Authentication Local State
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Current Tab
  const [activeTab, setActiveTab] = useState('overview');

  // Search & Filters
  const [photoSearch, setPhotoSearch] = useState('');
  const [photoCatFilter, setPhotoCatFilter] = useState('all');

  // Modals for Adding / Editing
  const [editingExpedition, setEditingExpedition] = useState(null);
  const [isAddExpeditionOpen, setIsAddExpeditionOpen] = useState(false);
  const [newExpedition, setNewExpedition] = useState({
    title: '',
    titleAr: '',
    category: 'cairo_heritage',
    gov: 'cairo_heritage',
    cover: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg',
    tagline: '',
    quote: '',
    photoCount: 6,
  });

  const [editingPhoto, setEditingPhoto] = useState(null);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    url: '/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg',
    title: '',
    titleEn: '',
    category: 'cairo_heritage',
    location: 'القاهرة',
    description: '',
    exif: {
      gear: 'Full-Frame Cine System',
      focal: '35mm',
      aperture: 'f/1.8',
      shutter: '1/320s',
      iso: '200',
    },
  });

  // Pin Change Modal
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [newPinValue, setNewPinValue] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    playCameraShutterSound();
    if (loginAdmin(pinInput)) {
      setAuthError('');
      setPinInput('');
    } else {
      setAuthError(lang === 'ar' ? 'رمز الدخول غير صحيح! يرجى إدخال الرمز الصحيح.' : 'Invalid PIN! Please check and try again.');
    }
  };

  // -------------------------------------------------------------
  // VIEW: 1. LOCK SCREEN IF NOT AUTHENTICATED
  // -------------------------------------------------------------
  if (!isAdminLoggedIn) {
    return (
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 font-thmanyah"
      >
        <div className="relative w-full max-w-md bg-[#0a0d14] border border-cinema-gold/40 rounded-3xl p-8 sm:p-10 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(223,177,91,0.2)]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 left-5 rtl:left-5 rtl:right-auto ltr:right-5 ltr:left-auto text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Aperture Logo */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cinema-gold/15 border border-cinema-gold/40 text-cinema-gold flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(223,177,91,0.3)]">
              <Lock size={30} className="text-cinema-gold" />
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              {lang === 'ar' ? 'بوابة إدارة الموقع المركزية' : 'Director CMS Portal'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ar'
                ? 'أدخل الرمز السري للتحكم الكامل في محتوى المعرض والفعاليات'
                : 'Enter your master security PIN to manage all content'}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setAuthError('');
                }}
                placeholder={lang === 'ar' ? 'أدخل رمز الدخول السري (Master PIN)' : 'Enter Master PIN'}
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-4 py-3.5 text-center font-mono text-lg text-white tracking-widest placeholder:tracking-normal placeholder:font-thmanyah placeholder:text-xs placeholder:text-slate-500 focus:outline-none focus:border-cinema-gold transition-colors"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-3 rtl:right-auto ltr:right-3 ltr:left-auto text-slate-400 hover:text-white"
              >
                {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {authError && (
              <p className="text-xs text-rose-400 text-center font-medium bg-rose-500/10 border border-rose-500/20 py-1.5 px-3 rounded-lg">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-cinema-gold hover:bg-cinema-goldLight text-cinema-black font-extrabold text-sm rounded-xl transition-all shadow-[0_5px_20px_rgba(223,177,91,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Unlock size={17} />
              <span>{lang === 'ar' ? 'تسجيل الدخول للوحة الإدارة' : 'Unlock Dashboard'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: 2. AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[100000] bg-[#06080d] text-slate-100 flex flex-col font-thmanyah overflow-hidden select-none"
    >
      {/* Top Header Bar */}
      <header className="h-16 border-b border-cinema-border/80 bg-[#090d16]/90 backdrop-blur-md px-6 flex items-center justify-between flex-shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cinema-gold/15 border border-cinema-gold/40 text-cinema-gold flex items-center justify-center">
            <Camera size={19} />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-lg text-white leading-tight">
              {lang === 'ar' ? 'لوحة تحكم الموقع والمحتوى' : 'Director CMS'}
            </h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[0.68rem] text-emerald-400 font-mono">
                {lang === 'ar' ? 'حفظ تلقائي حي ومباشر' : 'Live Persistent Storage Active'}
              </span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              playCameraShutterSound();
              exportBackup();
            }}
            title={lang === 'ar' ? 'تصدير نسخة احتياطية' : 'Export Backup'}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cinema-gold text-xs text-slate-300 hover:text-cinema-gold transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>{lang === 'ar' ? 'نسخة احتياطية' : 'Backup'}</span>
          </button>

          <button
            onClick={() => {
              logoutAdmin();
              playCameraShutterSound();
            }}
            title={lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <Lock size={16} />
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cinema-gold text-cinema-black font-extrabold text-xs transition-all hover:bg-cinema-goldLight cursor-pointer shadow-md"
          >
            <X size={15} />
            <span>{lang === 'ar' ? 'إغلاق وعرض الموقع' : 'Exit to Live Site'}</span>
          </button>
        </div>
      </header>

      {/* Main Container: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-56 sm:w-64 border-r rtl:border-r-0 rtl:border-l border-cinema-border/70 bg-[#080b12] flex flex-col justify-between p-3 flex-shrink-0 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <SidebarBtn
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              icon={<LayoutDashboard size={17} />}
              label={lang === 'ar' ? 'نظرة عامة وإحصائيات' : 'Overview'}
            />
            <SidebarBtn
              active={activeTab === 'expeditions'}
              onClick={() => setActiveTab('expeditions')}
              icon={<Compass size={17} />}
              label={lang === 'ar' ? 'الفعاليات والفصول الوثائقية' : 'Expeditions & Events'}
              badge={portfolioData.expeditions?.length || 0}
            />
            <SidebarBtn
              active={activeTab === 'gallery'}
              onClick={() => setActiveTab('gallery')}
              icon={<ImageIcon size={17} />}
              label={lang === 'ar' ? 'المعرض الفوتوغرافي الشامل' : 'Photo Masterworks'}
              badge={portfolioData.photos?.length || 0}
            />
            <SidebarBtn
              active={activeTab === 'heroCards'}
              onClick={() => setActiveTab('heroCards')}
              icon={<Layers size={17} />}
              label={lang === 'ar' ? 'كروت الهيرو ثلاثية الأبعاد' : '3D Hero Cards'}
              badge={portfolioData.heroCards?.length || 5}
            />
            <SidebarBtn
              active={activeTab === 'reels'}
              onClick={() => setActiveTab('reels')}
              icon={<Film size={17} />}
              label={lang === 'ar' ? 'الريلز والأعمال المرئية' : 'Reels & Videos'}
              badge={portfolioData.videos?.length || 0}
            />
            <SidebarBtn
              active={activeTab === 'awards'}
              onClick={() => setActiveTab('awards')}
              icon={<Trophy size={17} />}
              label={lang === 'ar' ? 'الجوائز والتكريمات' : 'Awards'}
              badge={portfolioData.awards?.length || 0}
            />
            <SidebarBtn
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
              icon={<User size={17} />}
              label={lang === 'ar' ? 'بيانات المصور والتواصل' : 'Director Profile'}
            />
            <SidebarBtn
              active={activeTab === 'inquiries'}
              onClick={() => setActiveTab('inquiries')}
              icon={<Inbox size={17} />}
              label={lang === 'ar' ? 'صندوق رسائل الحجز' : 'Inquiries Inbox'}
              badge={inquiries?.length || 0}
              badgeColor="bg-cinema-gold text-cinema-black"
            />
            <SidebarBtn
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
              icon={<Settings size={17} />}
              label={lang === 'ar' ? 'النسخ الاحتياطي والأمان' : 'Backup & Security'}
            />
          </div>

          {/* Quick Director Info */}
          <div className="p-3 bg-[#0d121c] border border-cinema-border/50 rounded-xl text-center">
            <span className="text-[0.68rem] text-slate-400 block">{lang === 'ar' ? 'المصور والمخرج' : 'Director'}</span>
            <span className="font-bold text-xs text-cinema-gold block mt-0.5">{portfolioData.photographer?.name || 'Zakaria Yahia'}</span>
            <span className="text-[0.62rem] text-slate-500 font-mono block mt-1">v3.0 • Real-time DB</span>
          </div>
        </aside>

        {/* Tab Content Canvas */}
        <main className="flex-1 overflow-y-auto p-5 sm:p-8 bg-[#05070c]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <OverviewTab
              portfolioData={portfolioData}
              inquiries={inquiries}
              setActiveTab={setActiveTab}
              exportBackup={exportBackup}
              setIsAddPhotoOpen={setIsAddPhotoOpen}
              setIsAddExpeditionOpen={setIsAddExpeditionOpen}
              lang={lang}
            />
          )}

          {/* TAB 2: EXPEDITIONS & EVENTS */}
          {activeTab === 'expeditions' && (
            <ExpeditionsTab
              expeditions={portfolioData.expeditions || []}
              onAddClick={() => setIsAddExpeditionOpen(true)}
              onEditClick={(exp) => setEditingExpedition(exp)}
              onDeleteClick={(id) => {
                if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه الفعالية؟' : 'Delete this expedition?')) {
                  deleteExpedition(id);
                }
              }}
              lang={lang}
            />
          )}

          {/* TAB 3: PHOTO GALLERY */}
          {activeTab === 'gallery' && (
            <GalleryTab
              photos={portfolioData.photos || []}
              search={photoSearch}
              setSearch={setPhotoSearch}
              filter={photoCatFilter}
              setFilter={setPhotoCatFilter}
              onAddClick={() => setIsAddPhotoOpen(true)}
              onEditClick={(photo, index) => setEditingPhoto({ photo, index })}
              onDeleteClick={(index) => {
                if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذه الصورة؟' : 'Delete this photo?')) {
                  deletePhoto(index);
                }
              }}
              lang={lang}
            />
          )}

          {/* TAB 4: HERO 3D STAGE CARDS */}
          {activeTab === 'heroCards' && (
            <HeroCardsTab
              heroCards={portfolioData.heroCards || []}
              onUpdateCard={updateHeroCard}
              lang={lang}
            />
          )}

          {/* TAB 5: REELS & VIDEOS */}
          {activeTab === 'reels' && (
            <ReelsTab
              videos={portfolioData.videos || []}
              onAddVideo={addVideo}
              onDeleteVideo={deleteVideo}
              lang={lang}
            />
          )}

          {/* TAB 6: AWARDS */}
          {activeTab === 'awards' && (
            <AwardsTab
              awards={portfolioData.awards || []}
              onAddAward={addAward}
              onUpdateAward={updateAward}
              onDeleteAward={deleteAward}
              lang={lang}
            />
          )}

          {/* TAB 7: DIRECTOR PROFILE */}
          {activeTab === 'profile' && (
            <ProfileTab
              photographer={portfolioData.photographer || {}}
              onUpdate={updatePhotographer}
              lang={lang}
            />
          )}

          {/* TAB 8: INQUIRIES INBOX */}
          {activeTab === 'inquiries' && (
            <InquiriesTab
              inquiries={inquiries || []}
              onDelete={deleteInquiry}
              onMarkContacted={markInquiryContacted}
              lang={lang}
            />
          )}

          {/* TAB 9: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <SettingsTab
              exportBackup={exportBackup}
              importBackup={importBackup}
              resetToDefaults={resetToDefaults}
              changeAdminPin={changeAdminPin}
              adminSecretKey={adminSecretKey}
              changeSecretKey={changeSecretKey}
              getSecretUrl={getSecretUrl}
              deauthorizeSecret={deauthorizeSecret}
              onClose={onClose}
              lang={lang}
            />
          )}
        </main>
      </div>

      {/* ----------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT EXPEDITION */}
      {/* ----------------------------------------------------------- */}
      {(isAddExpeditionOpen || editingExpedition) && (
        <ExpeditionModal
          initialData={editingExpedition || newExpedition}
          isEdit={!!editingExpedition}
          onClose={() => {
            setIsAddExpeditionOpen(false);
            setEditingExpedition(null);
          }}
          onSave={(data) => {
            if (editingExpedition) {
              updateExpedition(editingExpedition.id, data);
            } else {
              addExpedition(data);
            }
            setIsAddExpeditionOpen(false);
            setEditingExpedition(null);
            playCameraShutterSound();
          }}
          lang={lang}
        />
      )}

      {/* ----------------------------------------------------------- */}
      {/* MODAL: ADD / EDIT PHOTO */}
      {/* ----------------------------------------------------------- */}
      {(isAddPhotoOpen || editingPhoto) && (
        <PhotoModal
          initialData={editingPhoto ? editingPhoto.photo : newPhoto}
          isEdit={!!editingPhoto}
          onClose={() => {
            setIsAddPhotoOpen(false);
            setEditingPhoto(null);
          }}
          onSave={(photoData) => {
            if (editingPhoto) {
              updatePhoto(editingPhoto.index, photoData);
            } else {
              addPhoto(photoData);
            }
            setIsAddPhotoOpen(false);
            setEditingPhoto(null);
            playCameraShutterSound();
          }}
          lang={lang}
          customCategories={customCategories}
          addCustomCategory={addCustomCategory}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENTS & TABS
// -------------------------------------------------------------

function SidebarBtn({ active, onClick, icon, label, badge, badgeColor = 'bg-white/10 text-slate-300' }) {
  return (
    <button
      onClick={() => {
        playCameraShutterSound();
        onClick();
      }}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
        active
          ? 'bg-cinema-gold text-cinema-black font-extrabold shadow-md'
          : 'text-slate-300 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        {icon}
        <span className="truncate">{label}</span>
      </div>
      {badge !== undefined && (
        <span className={`text-[0.62rem] font-mono px-2 py-0.5 rounded-full ${active ? 'bg-black/30 text-cinema-black font-bold' : badgeColor}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// TAB: OVERVIEW
function OverviewTab({ portfolioData, inquiries, setActiveTab, exportBackup, setIsAddPhotoOpen, setIsAddExpeditionOpen, lang }) {
  const stats = [
    { label: lang === 'ar' ? 'إجمالي الصور الوثائقية' : 'Total Photos', count: portfolioData.photos?.length || 0, icon: <ImageIcon size={22} className="text-cinema-gold" />, tab: 'gallery' },
    { label: lang === 'ar' ? 'الفعاليات والفصول' : 'Expeditions & Chapters', count: portfolioData.expeditions?.length || 0, icon: <Compass size={22} className="text-cyan-400" />, tab: 'expeditions' },
    { label: lang === 'ar' ? 'الريلز والأعمال السينمائية' : 'Reels & Videos', count: portfolioData.videos?.length || 0, icon: <Film size={22} className="text-purple-400" />, tab: 'reels' },
    { label: lang === 'ar' ? 'الجوائز والتكريمات' : 'Awards', count: portfolioData.awards?.length || 0, icon: <Trophy size={22} className="text-amber-400" />, tab: 'awards' },
    { label: lang === 'ar' ? 'استفسارات الحجز الواردة' : 'Booking Inquiries', count: inquiries?.length || 0, icon: <Inbox size={22} className="text-emerald-400" />, tab: 'inquiries' },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#111728] via-[#0c101d] to-[#12192c] border border-cinema-gold/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cinema-gold/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cinema-gold/15 text-cinema-gold text-xs font-bold mb-3">
              <Sparkles size={12} />
              <span>{lang === 'ar' ? 'التحكم المركزي الشامل' : 'Full CMS Center'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'ar' ? 'مرحباً بك يا زكريا في لوحة تحكم موقعك' : 'Welcome to Your Director CMS'}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
              {lang === 'ar'
                ? 'من هنا يمكنك إضافة وتعديل وحذف أي صورة، فعالية، ريل، جائزة، أو معلومات اتصال على الموقع بنقرة واحدة، وتُحفظ التعديلات فورياً.'
                : 'Manage every photo, expedition, reel, award, or contact info with instant live saving across your portfolio.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsAddPhotoOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cinema-gold hover:bg-cinema-goldLight text-cinema-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>{lang === 'ar' ? 'إضافة صورة جديدة' : 'Add Photo'}</span>
            </button>
            <button
              onClick={() => setIsAddExpeditionOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-all cursor-pointer"
            >
              <Plus size={16} />
              <span>{lang === 'ar' ? 'إضافة فعالية جديدة' : 'Add Expedition'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            onClick={() => setActiveTab(s.tab)}
            className="p-5 rounded-2xl bg-[#090d16] border border-cinema-border/70 hover:border-cinema-gold/60 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">{s.icon}</div>
              <span className="font-mono text-2xl font-extrabold text-white">{s.count}</span>
            </div>
            <span className="text-xs text-slate-400 group-hover:text-cinema-gold transition-colors font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Launchpad & Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Quick Shortcuts */}
        <div className="p-6 rounded-2xl bg-[#090d16] border border-cinema-border/60">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Sliders size={16} className="text-cinema-gold" />
            <span>{lang === 'ar' ? 'روابط سريعة للإدارة' : 'Quick Actions'}</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab('heroCards')}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-left rtl:text-right text-xs text-slate-200 border border-white/5 hover:border-cinema-gold/30 transition-all"
            >
              <span className="font-bold block text-white">{lang === 'ar' ? 'كروت شاشة الهيرو' : 'Hero 3D Cards'}</span>
              <span className="text-[0.68rem] text-slate-400">{lang === 'ar' ? 'تعديل الصور الخمس الأولى' : 'Edit top 5 showcase cards'}</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-left rtl:text-right text-xs text-slate-200 border border-white/5 hover:border-cinema-gold/30 transition-all"
            >
              <span className="font-bold block text-white">{lang === 'ar' ? 'النبذة والتواصل' : 'Bio & Contact'}</span>
              <span className="text-[0.68rem] text-slate-400">{lang === 'ar' ? 'تحديث الهاتف وروابط السوشيال' : 'Update phone and links'}</span>
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-left rtl:text-right text-xs text-slate-200 border border-white/5 hover:border-cinema-gold/30 transition-all"
            >
              <span className="font-bold block text-white">{lang === 'ar' ? 'رسائل العملاء' : 'Inquiries'}</span>
              <span className="text-[0.68rem] text-slate-400">{lang === 'ar' ? 'استعراض الحجوزات الواردة' : 'View new booking requests'}</span>
            </button>
            <button
              onClick={exportBackup}
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-left rtl:text-right text-xs text-slate-200 border border-white/5 hover:border-cinema-gold/30 transition-all"
            >
              <span className="font-bold block text-white">{lang === 'ar' ? 'تحميل نسخة JSON' : 'Export JSON'}</span>
              <span className="text-[0.68rem] text-slate-400">{lang === 'ar' ? 'حفظ ملف نسخة احتياطية' : 'Save full offline backup'}</span>
            </button>
          </div>
        </div>

        {/* Database Health Info */}
        <div className="p-6 rounded-2xl bg-[#090d16] border border-cinema-border/60 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck size={16} className="text-emerald-400" />
              <span>{lang === 'ar' ? 'حالة التخزين المحلي' : 'Database Status'}</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ar'
                ? 'كل العمليات يتم حفظها محلياً وبشكل دائم في ذاكرة المتصفح (Persistent LocalStorage). عند إضافة أو تعديل أي عنصر، تظهر النتائج في الموقع الرئيسي فوراً دون الحاجة لإعادة التشغيل.'
                : 'All changes are permanently saved into browser local storage and sync in real-time across the live site.'}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>{lang === 'ar' ? 'رمز الحماية الحالي:' : 'Active Master PIN:'}</span>
            <span className="font-mono text-cinema-gold font-bold">••••••</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// TAB: EXPEDITIONS & EVENTS
function ExpeditionsTab({ expeditions, onAddClick, onEditClick, onDeleteClick, lang }) {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            {lang === 'ar' ? 'إدارة الفعاليات والفصول الوثائقية' : 'Documentary Expeditions & Events'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'ar'
              ? 'أضف فعاليات جديدة مثل مولد الحسين أو مصبغة عم سلامة أو عدّل الموجودة'
              : 'Add new cultural events or edit existing documentary chapters'}
          </p>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cinema-gold hover:bg-cinema-goldLight text-cinema-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>{lang === 'ar' ? 'إضافة فعالية جديدة' : 'Add New Expedition'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {expeditions.map((exp) => (
          <div
            key={exp.id}
            className="rounded-2xl bg-[#090d16] border border-cinema-border/70 overflow-hidden shadow-xl flex flex-col group hover:border-cinema-gold/50 transition-all"
          >
            {/* Cover Image */}
            <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
              <img
                src={exp.cover}
                alt={exp.titleAr || exp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.src = '/Content/Photo/Vivo Award/2.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent" />
              <span className="absolute top-3 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[0.65rem] font-mono text-cinema-gold font-bold border border-cinema-gold/30">
                {exp.photoCount || 6} {lang === 'ar' ? 'صور' : 'Photos'}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-white mb-1 line-clamp-1">
                  {exp.titleAr || exp.title}
                </h4>
                {exp.title && exp.titleAr && (
                  <p className="text-[0.72rem] text-slate-400 font-mono mb-2 line-clamp-1">{exp.title}</p>
                )}
                <p className="text-xs text-cinema-gold/90 font-medium mb-2 line-clamp-1">
                  {exp.tagline}
                </p>
                <p className="text-[0.75rem] text-slate-400 line-clamp-2 leading-relaxed">
                  {exp.quote}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[0.65rem] font-mono text-slate-500">
                  ID: {exp.id}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditClick(exp)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-cinema-gold hover:text-cinema-black text-slate-300 transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'تعديل' : 'Edit'}
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteClick(exp.id)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500 hover:text-white text-slate-400 transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'حذف' : 'Delete'}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// TAB: GALLERY PHOTOS
function GalleryTab({ photos, search, setSearch, filter, setFilter, onAddClick, onEditClick, onDeleteClick, lang }) {
  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      if (filter !== 'all' && p.category !== filter) return false;
      if (search.trim() !== '') {
        const q = search.toLowerCase().trim();
        const tMatch = (p.title || '').toLowerCase().includes(q);
        const teMatch = (p.titleEn || '').toLowerCase().includes(q);
        const lMatch = (p.location || '').toLowerCase().includes(q);
        if (!tMatch && !teMatch && !lMatch) return false;
      }
      return true;
    });
  }, [photos, search, filter]);

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            {lang === 'ar' ? 'إدارة المعرض الفوتوغرافي الشامل' : 'Photo Masterworks Manager'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'ar'
              ? `إجمالي ${photos.length} صورة مسجلة في المعرض الوثائقي`
              : `${photos.length} total photos in database`}
          </p>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cinema-gold hover:bg-cinema-goldLight text-cinema-black font-extrabold text-xs shadow-md transition-all cursor-pointer"
        >
          <Plus size={16} />
          <span>{lang === 'ar' ? 'إضافة صورة جديدة' : 'Add New Photo'}</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === 'ar' ? 'بحث في العناوين، الأماكن، أو الوصف...' : 'Search photos by title, location...'}
            className="w-full bg-[#0d121c] border border-cinema-border rounded-xl px-9 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cinema-gold"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#0d121c] border border-cinema-border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cinema-gold cursor-pointer w-full sm:w-auto"
        >
          <option value="all">{lang === 'ar' ? 'جميع التصنيفات' : 'All Categories'}</option>
          <option value="vivo_award">ڤيڤو (Vivo Award)</option>
          <option value="dyehouse">مصبغة عم سلامة (Dyehouse)</option>
          <option value="tahtib">التحطيب (Tahtib)</option>
          <option value="tanoura">التنورة (Tanoura)</option>
          <option value="diana_market">سوق ديانا (Diana Market)</option>
          <option value="featured">صور مميزة (Featured)</option>
        </select>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPhotos.map((photo, index) => (
          <div
            key={index}
            className="rounded-2xl bg-[#090d16] border border-cinema-border/70 overflow-hidden shadow-lg flex flex-col group hover:border-cinema-gold/60 transition-all"
          >
            {/* Image Preview */}
            <div className="relative h-40 w-full bg-black overflow-hidden">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = '/Content/Photo/Vivo Award/2.jpg';
                }}
              />
              <span className="absolute top-2 left-2 rtl:left-2 rtl:right-auto ltr:right-2 ltr:left-auto bg-black/80 font-thmanyah text-[0.62rem] text-cinema-gold px-2.5 py-0.5 rounded-full border border-cinema-gold/30">
                {photo.category || 'كادر'}
              </span>
            </div>

            {/* Meta */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h5 className="font-bold text-xs text-white line-clamp-1 mb-1">
                  {photo.title || 'بدون عنوان'}
                </h5>
                <p className="text-[0.68rem] text-slate-400 line-clamp-1 flex items-center gap-1">
                  <MapPin size={10} className="text-cinema-gold" />
                  <span>{photo.location || 'القاهرة'}</span>
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[0.62rem] font-mono text-slate-500">
                  #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEditClick(photo, index)}
                    className="p-1 rounded-lg bg-white/5 hover:bg-cinema-gold hover:text-cinema-black text-slate-300 transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'تعديل' : 'Edit'}
                  >
                    <Edit3 size={13} />
                  </button>
                  <button
                    onClick={() => onDeleteClick(index)}
                    className="p-1 rounded-lg bg-white/5 hover:bg-rose-500 hover:text-white text-slate-400 transition-colors cursor-pointer"
                    title={lang === 'ar' ? 'حذف' : 'Delete'}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// TAB: HERO 3D STAGE CARDS
function HeroCardsTab({ heroCards, onUpdateCard, lang }) {
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [cardFormData, setCardFormData] = useState(null);

  const handleEdit = (card, idx) => {
    setEditingCardIndex(idx);
    setCardFormData({ ...card });
  };

  const handleSave = () => {
    if (editingCardIndex !== null && cardFormData) {
      onUpdateCard(editingCardIndex, cardFormData);
      playCameraShutterSound();
      setEditingCardIndex(null);
      setCardFormData(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold text-white">
          {lang === 'ar' ? 'كروت المنصة ثلاثية الأبعاد (Hero 3D Stage)' : '3D Hero Stage Cards'}
        </h2>
        <p className="text-xs text-slate-400">
          {lang === 'ar'
            ? 'هذه هي الكروت الخمسة البارزة التي تدور في بداية الموقع بتقنية 3D. يمكنك تغيير صورها وعناوينها وفتحة عدساتها.'
            : 'These are the 5 prominent focal cards rotating in the 3D Hero Carousel.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {heroCards.map((card, idx) => (
          <div
            key={card.id || idx}
            className="rounded-2xl bg-[#090d16] border border-cinema-border/70 overflow-hidden shadow-lg flex flex-col"
          >
            <div className="relative h-44 w-full bg-black">
              <img
                src={card.url}
                alt={card.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/Content/Photo/Vivo Award/2.jpg';
                }}
              />
              <span className="absolute top-2 right-2 bg-cinema-gold text-cinema-black font-extrabold text-[0.68rem] px-2.5 py-0.5 rounded-full font-mono">
                Slot #{idx + 1}
              </span>
              <span className="absolute bottom-2 left-2 bg-black/80 text-cinema-gold font-mono text-[0.68rem] px-2 py-0.5 rounded-md border border-cinema-gold/30">
                {card.aperture} • {card.iso}
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-white mb-1 line-clamp-1">{card.title}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                  <MapPin size={11} className="text-cinema-gold" />
                  <span>{card.location}</span>
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[0.65rem] bg-cinema-gold/15 text-cinema-gold px-2.5 py-0.5 rounded-full font-bold">
                    {card.tag}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleEdit(card, idx)}
                className="mt-4 w-full py-2 bg-white/5 hover:bg-cinema-gold hover:text-cinema-black text-xs font-bold text-slate-200 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit3 size={13} />
                <span>{lang === 'ar' ? 'تعديل هذا الكارت' : 'Edit This Card'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingCardIndex !== null && cardFormData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg bg-[#0c101b] border border-cinema-gold/50 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base text-white">
                {lang === 'ar' ? `تعديل كارت الهيرو #${editingCardIndex + 1}` : `Edit Hero Card #${editingCardIndex + 1}`}
              </h3>
              <button onClick={() => setEditingCardIndex(null)} className="text-slate-400 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs max-h-[70vh] overflow-y-auto px-1">
              <div>
                <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'رابط الصورة:' : 'Image URL:'}</label>
                <input
                  type="text"
                  value={cardFormData.url}
                  onChange={(e) => setCardFormData({ ...cardFormData, url: e.target.value })}
                  className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">{lang === 'ar' ? 'العنوان بالعربي:' : 'Title (AR):'}</label>
                  <input
                    type="text"
                    value={cardFormData.title}
                    onChange={(e) => setCardFormData({ ...cardFormData, title: e.target.value })}
                    className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 block mb-1">{lang === 'ar' ? 'الموقع بالعربي:' : 'Location (AR):'}</label>
                  <input
                    type="text"
                    value={cardFormData.location}
                    onChange={(e) => setCardFormData({ ...cardFormData, location: e.target.value })}
                    className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'الوسم الترويجي (Tag):' : 'Tag Badge:'}</label>
                <input
                  type="text"
                  value={cardFormData.tag}
                  onChange={(e) => setCardFormData({ ...cardFormData, tag: e.target.value })}
                  placeholder="حرفة تراثية منذ 120 عاماً"
                  className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">{lang === 'ar' ? 'اسم العدسة:' : 'Lens Name:'}</label>
                <input
                  type="text"
                  value={cardFormData.lens}
                  onChange={(e) => setCardFormData({ ...cardFormData, lens: e.target.value })}
                  className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setEditingCardIndex(null)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-xl bg-cinema-gold text-cinema-black font-bold text-xs"
              >
                {lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// TAB: REELS & VIDEOS
function ReelsTab({ videos, onAddVideo, onDeleteVideo, lang }) {
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newVideoUrl.trim()) return;
    onAddVideo({
      url: newVideoUrl.trim(),
      title: newVideoTitle.trim() || 'عمل سينمائي جديد',
      category: 'cinema_reels',
    });
    setNewVideoUrl('');
    setNewVideoTitle('');
    playCameraShutterSound();
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold text-white">
          {lang === 'ar' ? 'إدارة الريلز والأعمال المرئية' : 'Cinema Reels & Videos'}
        </h2>
        <p className="text-xs text-slate-400">
          {lang === 'ar'
            ? 'أضف روابط مقاطع الفيديو السينمائية التي تظهر في قسم المعرض والأعمال'
            : 'Manage video showcase and documentary reels'}
        </p>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="p-5 rounded-2xl bg-[#090d16] border border-cinema-border/70 flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1 w-full text-xs">
          <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'عنوان الريل:' : 'Video Title:'}</label>
          <input
            type="text"
            value={newVideoTitle}
            onChange={(e) => setNewVideoTitle(e.target.value)}
            placeholder={lang === 'ar' ? 'مثال: ريل توثيق حرفة الدباغة القديمة' : 'e.g. Heritage Craft Reel'}
            className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white"
          />
        </div>
        <div className="flex-1 w-full text-xs">
          <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'مسار/رابط الفيديو (.mp4):' : 'Video URL (.mp4):'}</label>
          <input
            type="text"
            value={newVideoUrl}
            onChange={(e) => setNewVideoUrl(e.target.value)}
            placeholder="/Content/Photo/Vivo Award/Winner.mp4"
            className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white font-mono"
            required
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-cinema-gold text-cinema-black font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <Plus size={15} />
          <span>{lang === 'ar' ? 'إضافة الريل' : 'Add Reel'}</span>
        </button>
      </form>

      {/* Videos List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((vid, idx) => (
          <div key={vid.id || idx} className="rounded-2xl bg-[#090d16] border border-cinema-border/60 p-4 flex flex-col justify-between">
            <div>
              <div className="h-32 bg-black rounded-xl mb-3 flex items-center justify-center overflow-hidden border border-white/5">
                <video src={vid.url} controls className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-xs text-white line-clamp-1">{vid.title}</h4>
              <p className="text-[0.65rem] text-slate-500 font-mono line-clamp-1 mt-1">{vid.url}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  if (window.confirm(lang === 'ar' ? 'حذف هذا الفيديو؟' : 'Delete this video?')) {
                    onDeleteVideo(idx);
                  }
                }}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// TAB: AWARDS
function AwardsTab({ awards, onAddAward, onUpdateAward, onDeleteAward, lang }) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [awardForm, setAwardForm] = useState({
    rank: '1ST',
    title: '',
    year: '2026',
    organization: '',
    description: '',
    citation: '',
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    onAddAward(awardForm);
    setIsAddOpen(false);
    setAwardForm({ rank: '1ST', title: '', year: '2026', organization: '', description: '', citation: '' });
    playCameraShutterSound();
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            {lang === 'ar' ? 'الجوائز والتكريمات الدولية' : 'Awards & Honors'}
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'ar' ? 'إدارة الجوائز الرسمية والمراكز المحققة' : 'Manage global recognition and awards'}
          </p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cinema-gold text-cinema-black font-extrabold text-xs cursor-pointer shadow-md"
        >
          <Plus size={15} />
          <span>{lang === 'ar' ? 'إضافة جائزة جديدة' : 'Add Award'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {awards.map((award) => (
          <div key={award.id} className="p-5 rounded-2xl bg-[#090d16] border border-cinema-border/70 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-extrabold px-3 py-1 rounded-full bg-cinema-gold/15 text-cinema-gold border border-cinema-gold/30">
                  {award.rank}
                </span>
                <span className="font-mono text-xs text-slate-400">{award.year}</span>
              </div>
              <h4 className="font-bold text-base text-white mb-1">{award.title}</h4>
              <p className="text-xs text-cinema-gold/90 font-medium mb-2">{award.organization}</p>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{award.description}</p>
              {award.citation && (
                <p className="text-[0.72rem] text-slate-400 italic bg-white/5 p-2.5 rounded-xl border border-white/5">
                  "{award.citation}"
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
              <button
                onClick={() => {
                  if (window.confirm(lang === 'ar' ? 'حذف هذه الجائزة؟' : 'Delete award?')) {
                    onDeleteAward(award.id);
                  }
                }}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <form onSubmit={handleAddSubmit} className="w-full max-w-lg bg-[#0c101b] border border-cinema-gold/50 rounded-3xl p-6 shadow-2xl flex flex-col gap-3">
            <h3 className="font-bold text-base text-white mb-2">{lang === 'ar' ? 'إضافة جائزة جديدة' : 'Add New Award'}</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">{lang === 'ar' ? 'المركز (Rank):' : 'Rank:'}</label>
                <input
                  type="text"
                  value={awardForm.rank}
                  onChange={(e) => setAwardForm({ ...awardForm, rank: e.target.value })}
                  placeholder="2ND"
                  className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">{lang === 'ar' ? 'السنة:' : 'Year:'}</label>
                <input
                  type="text"
                  value={awardForm.year}
                  onChange={(e) => setAwardForm({ ...awardForm, year: e.target.value })}
                  placeholder="2026"
                  className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-300 block mb-1">{lang === 'ar' ? 'اسم الجائزة:' : 'Award Title:'}</label>
              <input
                type="text"
                value={awardForm.title}
                onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                placeholder="Vivo Global Photography Competition"
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                required
              />
            </div>

            <div className="text-xs">
              <label className="text-slate-300 block mb-1">{lang === 'ar' ? 'الجهة المانحة:' : 'Organization:'}</label>
              <input
                type="text"
                value={awardForm.organization}
                onChange={(e) => setAwardForm({ ...awardForm, organization: e.target.value })}
                placeholder="Vivo Mobile Egypt & Global Jury"
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div className="text-xs">
              <label className="text-slate-300 block mb-1">{lang === 'ar' ? 'الوصف الوثائقي:' : 'Description:'}</label>
              <textarea
                value={awardForm.description}
                onChange={(e) => setAwardForm({ ...awardForm, description: e.target.value })}
                rows={2}
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-cinema-gold text-cinema-black font-bold text-xs"
              >
                {lang === 'ar' ? 'حفظ الجائزة' : 'Save Award'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// TAB: PROFILE & CONTACT
function ProfileTab({ photographer, onUpdate, lang }) {
  const [formData, setFormData] = useState({
    name: photographer.name || 'Zakaria Yahia',
    title: photographer.title || 'Cinematic & Documentary Photographer',
    bioArabic: photographer.bioArabic || '',
    bioEnglish: photographer.bioEnglish || '',
    phone: photographer.contact?.phone || '01017421158',
    email: photographer.contact?.email || 'ziiikoali@gmail.com',
    instagram: photographer.contact?.instagram || '_zakaria_yahia_ph',
    tiktok: photographer.contact?.tiktok || '@ziko744',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdate({
      name: formData.name,
      title: formData.title,
      bioArabic: formData.bioArabic,
      bioEnglish: formData.bioEnglish,
      contact: {
        ...(photographer.contact || {}),
        phone: formData.phone,
        email: formData.email,
        instagram: formData.instagram,
        tiktok: formData.tiktok,
      },
    });
    playCameraShutterSound();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold text-white">
          {lang === 'ar' ? 'بيانات المصور وحسابات التواصل' : 'Director Profile & Contact Info'}
        </h2>
        <p className="text-xs text-slate-400">
          {lang === 'ar' ? 'تعديل السيرة الذاتية، أرقام التواصل، وروابط السوشيال ميديا' : 'Edit biography, contacts, and social links'}
        </p>
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-[#090d16] border border-cinema-border/70 flex flex-col gap-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'الاسم:' : 'Director Name:'}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white"
            />
          </div>
          <div>
            <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'المسمى المهني:' : 'Professional Title:'}</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'النبذة بالعربية (Bio):' : 'Bio (Arabic):'}</label>
          <textarea
            value={formData.bioArabic}
            onChange={(e) => setFormData({ ...formData, bioArabic: e.target.value })}
            rows={4}
            className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white leading-relaxed resize-none"
          />
        </div>

        <div>
          <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'النبذة بالإنجليزية (Bio):' : 'Bio (English):'}</label>
          <textarea
            value={formData.bioEnglish}
            onChange={(e) => setFormData({ ...formData, bioEnglish: e.target.value })}
            rows={4}
            className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white leading-relaxed resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/10">
          <div>
            <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'رقم الهاتف / واتساب:' : 'Phone / WhatsApp:'}</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'البريد الإلكتروني:' : 'Email Address:'}</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'حساب إنستغرام:' : 'Instagram Username:'}</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'حساب تيك توك:' : 'TikTok Username:'}</label>
            <input
              type="text"
              value={formData.tiktok}
              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white font-mono"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3">
          {savedSuccess && (
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <Check size={16} />
              <span>{lang === 'ar' ? 'تم حفظ التعديلات بنجاح!' : 'Profile updated successfully!'}</span>
            </span>
          )}
          <button
            type="submit"
            className="mr-auto rtl:mr-auto rtl:ml-0 ltr:ml-auto ltr:mr-0 px-6 py-3 rounded-xl bg-cinema-gold text-cinema-black font-extrabold text-xs shadow-md cursor-pointer hover:bg-cinema-goldLight transition-all"
          >
            {lang === 'ar' ? 'حفظ البيانات' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

// TAB: INQUIRIES
function InquiriesTab({ inquiries, onDelete, onMarkContacted, lang }) {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold text-white">
          {lang === 'ar' ? 'صندوق رسائل واستفسارات الحجز' : 'Client Inquiries & Booking Requests'}
        </h2>
        <p className="text-xs text-slate-400">
          {lang === 'ar' ? 'الرسائل المرسلة من نموذج التواصل في الموقع' : 'Messages submitted via website contact form'}
        </p>
      </div>

      {inquiries.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#090d16] border border-cinema-border/50 text-slate-400">
          <Inbox size={40} className="mx-auto mb-3 opacity-40 text-cinema-gold" />
          <p className="text-sm">{lang === 'ar' ? 'لا توجد رسائل جديدة حالياً' : 'No inquiries received yet'}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`p-5 rounded-2xl bg-[#090d16] border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                inq.status === 'new' ? 'border-cinema-gold/60 shadow-lg' : 'border-cinema-border/60 opacity-80'
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-sm text-white">{inq.name}</h4>
                  <span className="text-[0.65rem] font-mono text-slate-400">({inq.date})</span>
                  {inq.status === 'new' && (
                    <span className="bg-emerald-500/20 text-emerald-400 text-[0.65rem] px-2 py-0.5 rounded-full font-bold">
                      {lang === 'ar' ? 'جديد' : 'New'}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-mono mb-2">
                  <span className="text-cinema-gold">{inq.phone}</span>
                  <span className="text-slate-400">{inq.email}</span>
                  {inq.type && <span className="bg-white/5 px-2 py-0.5 rounded text-[0.68rem]">{inq.type}</span>}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-[#05070c] p-3 rounded-xl border border-white/5">
                  {inq.message}
                </p>
              </div>

              <div className="flex sm:flex-col items-center gap-2 flex-shrink-0">
                <a
                  href={`https://wa.me/2${inq.phone?.replace(/[^0-9]/g, '')}?text=مرحباً%20${encodeURIComponent(inq.name)}،%20معك%20زكريا%20يحيى.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <MessageSquare size={13} />
                  <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </a>
                <button
                  onClick={() => onMarkContacted(inq.id)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                >
                  {lang === 'ar' ? 'تم التواصل' : 'Contacted'}
                </button>
                <button
                  onClick={() => onDelete(inq.id)}
                  className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// TAB: SETTINGS & BACKUP
function SettingsTab({
  exportBackup,
  importBackup,
  resetToDefaults,
  changeAdminPin,
  adminSecretKey = 'ziko_vault_2026',
  changeSecretKey,
  getSecretUrl,
  deauthorizeSecret,
  onClose,
  lang,
}) {
  const [pinInput, setPinInput] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  const [secretKeyInput, setSecretKeyInput] = useState('');
  const [secretKeyMsg, setSecretKeyMsg] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const fullSecretUrl = getSecretUrl
    ? getSecretUrl()
    : typeof window !== 'undefined'
    ? `${window.location.origin}?key=${adminSecretKey}`
    : `?key=${adminSecretKey}`;

  const handleCopySecretUrl = () => {
    try {
      navigator.clipboard.writeText(fullSecretUrl);
      setIsCopied(true);
      playCameraShutterSound();
      setTimeout(() => setIsCopied(false), 3000);
    } catch {
      alert(fullSecretUrl);
    }
  };

  const handleSecretKeyChange = (e) => {
    e.preventDefault();
    if (changeSecretKey && changeSecretKey(secretKeyInput)) {
      setSecretKeyMsg(lang === 'ar' ? 'تم تحديث المفتاح السري والرابط بنجاح!' : 'Secret key updated!');
      setSecretKeyInput('');
      playCameraShutterSound();
      setTimeout(() => setSecretKeyMsg(''), 3000);
    } else {
      setSecretKeyMsg(lang === 'ar' ? 'المفتاح يجب أن يتكون من 4 أحرف/أرقام على الأقل' : 'Key must be at least 4 characters');
    }
  };

  const handlePinChange = (e) => {
    e.preventDefault();
    if (changeAdminPin(pinInput)) {
      setPinMsg(lang === 'ar' ? 'تم تحديث الرمز السري بنجاح!' : 'PIN updated!');
      setPinInput('');
      playCameraShutterSound();
      setTimeout(() => setPinMsg(''), 3000);
    } else {
      setPinMsg(lang === 'ar' ? 'الرمز يجب أن يتكون من 4 خانات على الأقل' : 'PIN must be at least 4 digits');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importBackup(event.target.result);
      if (res.success) {
        alert(lang === 'ar' ? 'تم استيراد واسترجاع البيانات بنجاح!' : 'Data restored successfully!');
        playCameraShutterSound();
      } else {
        alert(lang === 'ar' ? `خطأ في الاستيراد: ${res.error}` : `Error: ${res.error}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold text-white">
          {lang === 'ar' ? 'النسخ الاحتياطي وحماية الرابط السري' : 'Backup & Secret Key Security'}
        </h2>
        <p className="text-xs text-slate-400">
          {lang === 'ar' ? 'إدارة الرابط السري المخصص، رمز الدخول، وحفظ النسخ الاحتياطية' : 'Manage your private secret URL, master PIN, and database backup'}
        </p>
      </div>

      {/* 1. TOP HIGHLIGHT: SECRET URL KEY MANAGER */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#12192c] via-[#0d1322] to-[#141b30] border-2 border-cinema-gold/60 shadow-[0_15px_45px_rgba(0,0,0,0.85)] flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cinema-gold/20 text-cinema-gold text-xs font-bold mb-2">
              <ShieldCheck size={14} />
              <span>{lang === 'ar' ? 'نظام الحماية المشفرة (Secret URL Access)' : 'Fortress URL Security'}</span>
            </div>
            <h3 className="font-bold text-base text-white">
              {lang === 'ar' ? 'رابط الدخول السري المخصص لك' : 'Your Dedicated Secret Admin URL'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              {lang === 'ar'
                ? 'الموقع محمي تماماً ولا يظهر أي أثر للوحة الإدارة للزوار العاديين. الوصول للوحة يتم فقط بفتح الموقع عبر هذا الرابط المحمي بالمفتاح السري.'
                : 'All admin UI is completely hidden from public visitors. Access is strictly granted only via your secret key URL.'}
            </p>
          </div>

          <button
            onClick={handleCopySecretUrl}
            className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 flex-shrink-0 ${
              isCopied
                ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                : 'bg-cinema-gold hover:bg-cinema-goldLight text-cinema-black shadow-cinema-gold/30'
            }`}
          >
            {isCopied ? <Check size={16} /> : <ExternalLink size={16} />}
            <span>{isCopied ? (lang === 'ar' ? 'تم نسخ الرابط السري!' : 'Copied!') : (lang === 'ar' ? 'نسخ الرابط السري' : 'Copy Secret URL')}</span>
          </button>
        </div>

        {/* URL Box */}
        <div className="p-3.5 rounded-2xl bg-black/60 border border-cinema-gold/40 flex items-center justify-between gap-3 overflow-hidden">
          <span className="font-mono text-xs sm:text-sm text-cinema-gold truncate select-all dir-ltr">
            {fullSecretUrl}
          </span>
          <span className="font-mono text-[0.68rem] text-slate-400 bg-white/5 px-2 py-1 rounded flex-shrink-0">
            KEY: {adminSecretKey}
          </span>
        </div>

        {/* Change Secret Key Form */}
        <form onSubmit={handleSecretKeyChange} className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full text-xs">
            <label className="text-slate-300 block mb-1 font-bold">
              {lang === 'ar' ? 'تغيير المفتاح السري (Secret Key):' : 'Change Secret Key:'}
            </label>
            <input
              type="text"
              value={secretKeyInput}
              onChange={(e) => setSecretKeyInput(e.target.value)}
              placeholder={lang === 'ar' ? `المفتاح الحالي: ${adminSecretKey}` : `Current key: ${adminSecretKey}`}
              className="w-full bg-[#0a0d16] border border-cinema-border rounded-xl px-3 py-2 text-white font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition-all cursor-pointer flex-shrink-0"
          >
            {lang === 'ar' ? 'حفظ المفتاح الجديد' : 'Update Key'}
          </button>
        </form>
        {secretKeyMsg && <p className="text-xs text-cinema-gold font-bold">{secretKeyMsg}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup & Restore */}
        <div className="p-6 rounded-3xl bg-[#090d16] border border-cinema-border/70 flex flex-col gap-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Download size={16} className="text-cinema-gold" />
            <span>{lang === 'ar' ? 'تصدير واستيراد البيانات' : 'Export & Import Data'}</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'ar'
              ? 'يمكنك تحميل ملف JSON يحتوي على كامل قاعدة بيانات الموقع، والاحتفاظ به على جهازك كنسخة احتياطية آمنة.'
              : 'Download a complete JSON database snapshot of your website.'}
          </p>

          <button
            onClick={exportBackup}
            className="w-full py-3 rounded-xl bg-cinema-gold text-cinema-black font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer hover:bg-cinema-goldLight transition-all"
          >
            <Download size={16} />
            <span>{lang === 'ar' ? 'تحميل النسخة الاحتياطية (JSON)' : 'Download Full Backup (JSON)'}</span>
          </button>

          <div className="pt-3 border-t border-white/10">
            <label className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer border border-white/10 transition-all">
              <Upload size={16} />
              <span>{lang === 'ar' ? 'استيراد واسترجاع من ملف JSON' : 'Restore from JSON File'}</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Change PIN */}
        <div className="p-6 rounded-3xl bg-[#090d16] border border-cinema-border/70 flex flex-col gap-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Lock size={16} className="text-cinema-gold" />
            <span>{lang === 'ar' ? 'تغيير رمز الدخول السري (Master PIN)' : 'Change Master PIN'}</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lang === 'ar'
              ? 'قم بتعيين رمز PIN جديد خاص بك لحماية بوابة الإدارة والتحكم في الموقع. يمكنك تغييره هنا في أي وقت لحفظ أمان موقعك.'
              : 'Set a new master PIN for your administrative access. You can update it here at any time to keep your portfolio secure.'}
          </p>

          <form onSubmit={handlePinChange} className="flex flex-col gap-3">
            <input
              type="text"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder={lang === 'ar' ? 'أدخل الرمز السري الجديد...' : 'Enter new PIN...'}
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2.5 text-white font-mono text-xs"
            />
            {pinMsg && <p className="text-xs text-cinema-gold font-bold">{pinMsg}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/10 transition-all cursor-pointer"
            >
              {lang === 'ar' ? 'تحديث الرمز السري' : 'Update PIN'}
            </button>
          </form>
        </div>
      </div>

      {/* Lock Secret Session & Logout */}
      <div className="p-6 rounded-3xl bg-[#0a0d14] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-slate-200 flex items-center gap-2">
            <Lock size={16} className="text-cinema-gold" />
            <span>{lang === 'ar' ? 'قفل الجلسة وإخفاء البوابة بالكامل' : 'Lock Session & Hide Portal'}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ar'
              ? 'عند الضغط هنا سيتم قفل الجلسة وإخفاء أي إمكانية للوصول للوحة حتى تعيد الدخول بالرابط السري.'
              : 'End session and completely lock admin access until secret URL is visited again.'}
          </p>
        </div>
        <button
          onClick={() => {
            if (deauthorizeSecret) deauthorizeSecret();
            if (onClose) onClose();
            playCameraShutterSound();
          }}
          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-rose-600 text-white font-bold text-xs border border-white/15 transition-all cursor-pointer flex-shrink-0"
        >
          {lang === 'ar' ? 'قفل اللوحة الآن' : 'Lock Portal Now'}
        </button>
      </div>

      {/* Danger Zone: Factory Reset */}
      <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-rose-300 flex items-center gap-2">
            <RefreshCw size={16} />
            <span>{lang === 'ar' ? 'استعادة ضبط المصنع (Reset to Default)' : 'Reset to Default'}</span>
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'ar'
              ? 'إعادة الموقع بالكامل إلى البيانات الأصلية الأولى وحذف كل التعديلات المحلية.'
              : 'Restore initial default database and discard all local edits.'}
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm(lang === 'ar' ? 'تحذير: هل أنت متأكد من مسح كافة التعديلات واستعادة البيانات الأصلية؟' : 'Reset all data to defaults?')) {
              resetToDefaults();
              playCameraShutterSound();
              alert(lang === 'ar' ? 'تمت استعادة البيانات الأصلية بنجاح!' : 'Defaults restored!');
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md cursor-pointer transition-all"
        >
          {lang === 'ar' ? 'استعادة البيانات الافتراضية' : 'Reset All Defaults'}
        </button>
      </div>
    </div>
  );
}

// Helper: Process and compress image file to lightweight FHD Data URL
function processImageFile(file, callback) {
  if (!file || !file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const rawDataUrl = e.target.result;
    const img = new Image();
    img.onload = () => {
      const maxDim = 1920;
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
      callback(optimizedDataUrl, { width: img.width, height: img.height });
    };
    img.src = rawDataUrl;
  };
  reader.readAsDataURL(file);
}

// -------------------------------------------------------------
// EXPEDITION MODAL (ADD / EDIT)
// -------------------------------------------------------------
function ExpeditionModal({ initialData, isEdit, onClose, onSave, lang }) {
  const [form, setForm] = useState({ ...initialData });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 font-thmanyah">
      <div className="w-full max-w-xl bg-[#0b0f19] border border-cinema-gold/50 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-bold text-base text-white">
            {isEdit
              ? lang === 'ar' ? 'تعديل الفعالية الوثائقية' : 'Edit Expedition'
              : lang === 'ar' ? 'إضافة فعالية وثائقية جديدة' : 'Add New Expedition'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3.5 text-xs">
          {/* Cover Upload From Computer */}
          <div className="p-3.5 rounded-2xl bg-[#090d16] border border-cinema-border/70 flex flex-col gap-2.5">
            <label className="text-slate-300 block font-bold">
              {lang === 'ar' ? 'صورة الغلاف (من الجهاز أو الرابط):' : 'Cover Image (From PC or URL):'}
            </label>
            <div className="flex flex-wrap items-center gap-2">
              <label className="px-4 py-2 rounded-xl bg-cinema-gold text-cinema-black font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer hover:bg-cinema-goldLight shadow-md">
                <Upload size={14} />
                <span>{lang === 'ar' ? 'رفع صورة من جهازك' : 'Upload from Device'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      processImageFile(file, (dataUrl) => {
                        setForm((prev) => ({ ...prev, cover: dataUrl }));
                        playCameraShutterSound();
                      });
                    }
                  }}
                />
              </label>
              <span className="text-[0.68rem] text-slate-400">{lang === 'ar' ? 'أو اختر من الأرشيف:' : 'or choose archive:'}</span>
              <div className="flex flex-wrap gap-1">
                {PRESET_IMAGES.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setForm({ ...form, cover: img.url })}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-cinema-gold hover:text-cinema-black border border-white/10 text-[0.65rem] text-slate-300"
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              value={form.cover}
              onChange={(e) => setForm({ ...form, cover: e.target.value })}
              placeholder={lang === 'ar' ? 'أو الصق رابط صورة الغلاف مباشرة...' : 'or paste image URL...'}
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white font-mono text-xs"
              required
            />

            {/* Live Cover Thumbnail */}
            {form.cover && (
              <div className="relative h-28 w-full rounded-xl overflow-hidden border border-cinema-gold/30 bg-black mt-1">
                <img src={form.cover} alt="Preview" className="w-full h-full object-cover" />
                <span className="absolute bottom-1.5 right-1.5 bg-black/80 px-2 py-0.5 rounded text-[0.62rem] text-cinema-gold font-mono">
                  {lang === 'ar' ? 'معاينة الغلاف' : 'Cover Preview'}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'العنوان بالعربية:' : 'Title (AR):'}</label>
              <input
                type="text"
                value={form.titleAr || form.title}
                onChange={(e) => setForm({ ...form, titleAr: e.target.value, title: e.target.value })}
                placeholder="مصبغة عم سلامة بالدرب الأحمر"
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'العنوان بالإنجليزية:' : 'Title (EN):'}</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Am Salama's Dyehouse"
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'الشعار الترويجي (Tagline):' : 'Tagline:'}</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="120 عاماً من النيلة والبخار"
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'عدد الصور التقديري:' : 'Photo Count:'}</label>
              <input
                type="number"
                value={form.photoCount || 6}
                onChange={(e) => setForm({ ...form, photoCount: parseInt(e.target.value) || 6 })}
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'الاقتباس والوصف الوثائقي (Quote):' : 'Documentary Quote:'}</label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              rows={3}
              placeholder="تحت قباب الحجر المملوكي العتيق..."
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs">
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            onClick={() => onSave(form)}
            className="px-6 py-2 rounded-xl bg-cinema-gold text-cinema-black font-extrabold text-xs shadow-md cursor-pointer hover:bg-cinema-goldLight transition-all"
          >
            {lang === 'ar' ? 'حفظ الفعالية' : 'Save Expedition'}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PHOTO MODAL (ADD / EDIT) WITH DIRECT UPLOAD & LIVE STUDIO
// -------------------------------------------------------------
function PhotoModal({
  initialData,
  isEdit,
  onClose,
  onSave,
  lang,
  customCategories = [],
  addCustomCategory,
}) {
  const [form, setForm] = useState({
    ...initialData,
    category: initialData.category || 'featured',
    aspectRatio: initialData.aspectRatio || 'auto',
    fitMode: initialData.fitMode || 'cover',
    objectPosition: initialData.objectPosition || 'center',
    exif: initialData.exif || { gear: '35mm Cine', aperture: 'f/1.8' },
  });

  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [newCatInput, setNewCatInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imageMeta, setImageMeta] = useState(null);
  const fileInputRef = useRef(null);

  // Standard Categories list
  const standardCategories = [
    { id: 'vivo_award', labelAr: 'مشروع مسابقة ڤيڤو (Vivo Award)', labelEn: 'Vivo Award Project' },
    { id: 'dyehouse', labelAr: 'مصبغة عم سلامة (Dyehouse)', labelEn: 'Am Salama Dyehouse' },
    { id: 'tahtib', labelAr: 'فن التحطيب (Tahtib)', labelEn: 'The Art of Tahtib' },
    { id: 'tanoura', labelAr: 'دراويش التنورة (Tanoura)', labelEn: 'Whirling Dervishes' },
    { id: 'diana_market', labelAr: 'سوق ديانا للأنتيكات (Diana Market)', labelEn: 'Diana Vintage Market' },
    { id: 'featured', labelAr: 'صور وحرف مميزة (Featured)', labelEn: 'Featured Heritage' },
  ];

  // Direct Device File Upload Handler
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    processImageFile(file, (dataUrl, meta) => {
      setForm((prev) => ({ ...prev, url: dataUrl }));
      setImageMeta(meta);
      setIsUploading(false);
      playCameraShutterSound();
    });
  };

  // Create New Category Handler
  const handleCreateNewCategory = (e) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;
    if (addCustomCategory) {
      const newId = addCustomCategory(newCatInput);
      if (newId) {
        setForm((prev) => ({ ...prev, category: newId }));
      }
    }
    setNewCatInput('');
    setIsAddingNewCat(false);
    playCameraShutterSound();
  };

  // Aspect ratio helper CSS class
  const getAspectClass = () => {
    switch (form.aspectRatio) {
      case '16/9':
        return 'aspect-[16/9] max-h-72';
      case '3/2':
        return 'aspect-[3/2] max-h-72';
      case '4/5':
        return 'aspect-[4/5] max-h-80';
      case '1/1':
        return 'aspect-square max-h-72';
      default:
        return 'h-60';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 font-thmanyah">
      <div className="w-full max-w-2xl bg-[#0b0f19] border border-cinema-gold/50 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Camera size={18} className="text-cinema-gold" />
            <h3 className="font-bold text-base sm:text-lg text-white">
              {isEdit
                ? lang === 'ar' ? 'تعديل الصورة واستوديو الأبعاد' : 'Edit Photo & Aspect Studio'
                : lang === 'ar' ? 'إضافة صورة جديدة من جهازك' : 'Upload & Add New Photo'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-xs">
          {/* ------------------------------------------------------------- */}
          {/* 1. DIRECT FILE UPLOAD ZONE FROM DEVICE */}
          {/* ------------------------------------------------------------- */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#111728] via-[#0d1220] to-[#12192a] border-2 border-dashed border-cinema-gold/50 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-sm text-white flex items-center gap-2">
                  <Upload size={16} className="text-cinema-gold" />
                  <span>{lang === 'ar' ? 'رفع الصورة من جهاز الكمبيوتر' : 'Upload Image from Computer'}</span>
                </h4>
                <p className="text-[0.68rem] text-slate-300 mt-0.5">
                  {lang === 'ar'
                    ? 'اختر أي صورة JPG أو PNG من جهازك، وسيتم تحسينها وضبط دقتها فورياً'
                    : 'Select any JPG/PNG from your local drive with automatic high-fidelity optimization'}
                </p>
              </div>

              <label className="px-5 py-2.5 rounded-xl bg-cinema-gold text-cinema-black font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer hover:bg-cinema-goldLight shadow-md active:scale-95 flex-shrink-0">
                <Upload size={14} />
                <span>{isUploading ? (lang === 'ar' ? 'جارٍ التحميل...' : 'Uploading...') : (lang === 'ar' ? 'اختيار ملف من جهازك' : 'Browse Local File')}</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* URL Fallback & Archive Presets */}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[0.68rem] text-slate-400 flex-shrink-0">{lang === 'ar' ? 'أو مسار/رابط الصورة:' : 'or Image URL:'}</span>
                <input
                  type="text"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="/Content/Photo/..."
                  className="flex-1 bg-[#090d16] border border-cinema-border rounded-xl px-3 py-1.5 text-white font-mono text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[0.65rem] text-slate-400">{lang === 'ar' ? 'نماذج جاهزة للأرشيف:' : 'Archive Presets:'}</span>
                {PRESET_IMAGES.slice(0, 5).map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, url: img.url });
                      playCameraShutterSound();
                    }}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-cinema-gold hover:text-cinema-black border border-white/10 text-[0.65rem] text-slate-300"
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* 2. LIVE PREVIEW & ASPECT RATIO / DIMENSION TUNING STUDIO */}
          {/* ------------------------------------------------------------- */}
          {form.url && (
            <div className="p-4 rounded-2xl bg-[#090d16] border border-cinema-gold/30 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="font-bold text-xs text-cinema-gold flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>{lang === 'ar' ? 'استوديو المعاينة وضبط أبعاد الكادر' : 'Live Preview & Aspect Studio'}</span>
                </span>
                <span className="font-mono text-[0.68rem] text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                  {form.aspectRatio.toUpperCase()} • {form.fitMode.toUpperCase()} • POS: {form.objectPosition.toUpperCase()}
                </span>
              </div>

              {/* Interactive Live Preview Box */}
              <div className={`relative w-full rounded-2xl overflow-hidden bg-black/90 border border-cinema-border flex items-center justify-center ${getAspectClass()}`}>
                <img
                  src={form.url}
                  alt="Preview"
                  style={{
                    objectFit: form.fitMode || 'cover',
                    objectPosition: form.objectPosition || 'center',
                  }}
                  className="w-full h-full transition-all duration-300"
                />

                {/* Aspect Ratio Badge Overlay */}
                <div className="absolute top-2.5 right-2.5 rtl:right-2.5 rtl:left-auto ltr:left-2.5 ltr:right-auto bg-black/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-cinema-gold/30 font-mono text-[0.62rem] text-cinema-gold">
                  {form.aspectRatio === '16/9' ? '16:9 CINEMA' : form.aspectRatio === '3/2' ? '3:2 CLASSIC' : form.aspectRatio === '4/5' ? '4:5 PORTRAIT' : form.aspectRatio === '1/1' ? '1:1 SQUARE' : 'AUTO / ORIGINAL'}
                </div>
              </div>

              {/* Aspect Ratio Presets Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs">
                {/* Ratio Preset */}
                <div>
                  <label className="text-slate-400 block mb-1 text-[0.68rem] font-bold">
                    {lang === 'ar' ? 'نسبة الأبعاد (Aspect Ratio):' : 'Aspect Ratio:'}
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { id: 'auto', label: lang === 'ar' ? 'تلقائي' : 'Auto' },
                      { id: '16/9', label: '16:9' },
                      { id: '3/2', label: '3:2' },
                      { id: '4/5', label: '4:5' },
                      { id: '1/1', label: '1:1' },
                    ].map((ratio) => (
                      <button
                        key={ratio.id}
                        type="button"
                        onClick={() => {
                          setForm({ ...form, aspectRatio: ratio.id });
                          playCameraShutterSound();
                        }}
                        className={`px-2 py-1 rounded-lg text-[0.68rem] font-mono transition-all ${
                          form.aspectRatio === ratio.id
                            ? 'bg-cinema-gold text-cinema-black font-extrabold shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fit Mode */}
                <div>
                  <label className="text-slate-400 block mb-1 text-[0.68rem] font-bold">
                    {lang === 'ar' ? 'طريقة الاحتواء (Fit):' : 'Fit Mode:'}
                  </label>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, fitMode: 'cover' })}
                      className={`flex-1 py-1 rounded-lg text-[0.68rem] transition-all ${
                        form.fitMode === 'cover'
                          ? 'bg-cinema-gold text-cinema-black font-extrabold'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {lang === 'ar' ? 'تغطية كاملة' : 'Cover'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, fitMode: 'contain' })}
                      className={`flex-1 py-1 rounded-lg text-[0.68rem] transition-all ${
                        form.fitMode === 'contain'
                          ? 'bg-cinema-gold text-cinema-black font-extrabold'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {lang === 'ar' ? 'احتواء بدون قص' : 'Contain'}
                    </button>
                  </div>
                </div>

                {/* Focal Position */}
                <div>
                  <label className="text-slate-400 block mb-1 text-[0.68rem] font-bold">
                    {lang === 'ar' ? 'محاذاة الكادر (Focal Pos):' : 'Focal Position:'}
                  </label>
                  <div className="flex gap-1">
                    {[
                      { id: 'top', label: lang === 'ar' ? 'أعلى' : 'Top' },
                      { id: 'center', label: lang === 'ar' ? 'وسط' : 'Center' },
                      { id: 'bottom', label: lang === 'ar' ? 'أسفل' : 'Bottom' },
                    ].map((pos) => (
                      <button
                        key={pos.id}
                        type="button"
                        onClick={() => setForm({ ...form, objectPosition: pos.id })}
                        className={`flex-1 py-1 rounded-lg text-[0.68rem] transition-all ${
                          form.objectPosition === pos.id
                            ? 'bg-cinema-gold text-cinema-black font-extrabold'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ------------------------------------------------------------- */}
          {/* 3. TITLES (AR / EN) */}
          {/* ------------------------------------------------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'العنوان بالعربية:' : 'Title (AR):'}</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="انعكاس التاريخ | ساحات المعز"
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
                required
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'العنوان بالإنجليزية:' : 'Title (EN):'}</label>
              <input
                type="text"
                value={form.titleEn}
                onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                placeholder="Reflection of Heritage"
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* 4. CATEGORY SELECTOR + NEW CATEGORY + UNCATEGORIZED */}
          {/* ------------------------------------------------------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-bold">{lang === 'ar' ? 'التصنيف:' : 'Category:'}</label>
                <button
                  type="button"
                  onClick={() => setIsAddingNewCat(!isAddingNewCat)}
                  className="text-[0.68rem] text-cinema-gold hover:underline flex items-center gap-1 font-bold cursor-pointer"
                >
                  <Plus size={12} />
                  <span>{lang === 'ar' ? '+ تصنيف جديد' : '+ New Category'}</span>
                </button>
              </div>

              <select
                value={form.category}
                onChange={(e) => {
                  if (e.target.value === '__new__') {
                    setIsAddingNewCat(true);
                  } else {
                    setForm({ ...form, category: e.target.value });
                  }
                }}
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white font-thmanyah"
              >
                {/* Standard Categories */}
                <optgroup label={lang === 'ar' ? 'التصنيفات المعتمدة' : 'Standard Categories'}>
                  {standardCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {lang === 'ar' ? cat.labelAr : cat.labelEn}
                    </option>
                  ))}
                </optgroup>

                {/* Custom Categories added by user */}
                {customCategories && customCategories.length > 0 && (
                  <optgroup label={lang === 'ar' ? 'تصنيفاتك المخصصة' : 'Your Custom Categories'}>
                    {customCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.labelAr || cat.labelEn}
                      </option>
                    ))}
                  </optgroup>
                )}

                {/* Special options */}
                <optgroup label={lang === 'ar' ? 'خيارات أخرى' : 'Other Options'}>
                  <option value="uncategorized">
                    {lang === 'ar' ? 'بدون تصنيف (Uncategorized)' : 'Uncategorized (None)'}
                  </option>
                  <option value="__new__">
                    {lang === 'ar' ? '➕ إضافة تصنيف جديد...' : '➕ Add New Category...'}
                  </option>
                </optgroup>
              </select>

              {/* Inline Add New Category Box */}
              {isAddingNewCat && (
                <div className="mt-2 p-2.5 rounded-xl bg-[#12192c] border border-cinema-gold/40 flex items-center gap-2">
                  <input
                    type="text"
                    value={newCatInput}
                    onChange={(e) => setNewCatInput(e.target.value)}
                    placeholder={lang === 'ar' ? 'اسم التصنيف الجديد (مثال: أفراح النوبة)...' : 'New Category Name...'}
                    className="flex-1 bg-black/60 border border-cinema-border rounded-lg px-2.5 py-1.5 text-white text-xs"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCreateNewCategory}
                    className="px-3 py-1.5 rounded-lg bg-cinema-gold text-cinema-black font-extrabold text-xs cursor-pointer shadow-md"
                  >
                    {lang === 'ar' ? 'إضافة' : 'Add'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewCat(false)}
                    className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'الموقع الجغرافي:' : 'Location:'}</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="الدرب الأحمر، القاهرة"
                className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* 5. DOCUMENTARY STORY */}
          {/* ------------------------------------------------------------- */}
          <div>
            <label className="text-slate-300 block mb-1 font-bold">{lang === 'ar' ? 'الوصف والسياق الوثائقي للكادر:' : 'Documentary Story:'}</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              placeholder="وصف المشهد التراثي وقصته الإنسانية..."
              className="w-full bg-[#111622] border border-cinema-border rounded-xl px-3 py-2 text-white resize-none"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs cursor-pointer hover:bg-white/10">
            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
          </button>
          <button
            onClick={() => {
              playCameraShutterSound();
              onSave(form);
            }}
            className="px-6 py-2.5 rounded-xl bg-cinema-gold hover:bg-cinema-goldLight text-cinema-black font-extrabold text-xs shadow-md cursor-pointer transition-all active:scale-95"
          >
            {lang === 'ar' ? 'حفظ الصورة وتطبيق الأبعاد' : 'Save Photo & Apply'}
          </button>
        </div>
      </div>
    </div>
  );
}
