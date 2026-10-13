// Portfolio Content Database for Zakaria Yahia
// Based on Real Documentary Projects from /Content

export const PORTFOLIO_DATA = {
  photographer: {
    name: "Zakaria Yahia",
    title: "Cinematic & Documentary Photographer",
    tagline: "Visual Storyteller",
    location: "Cairo, Egypt",
    bioEnglish: "I am an Egyptian documentary photographer and visual director based in Cairo, dedicated to preserving living cultural heritage, historic artisan crafts, and the raw human essence of Egyptian streets.\n\nFrom the 120-year-old historic textile dyehouse of Am Salama in El-Darb El-Ahmar to the ancient UNESCO-recognized art of Tahtib at Mawlid El-Hussein and Sufi whirling dervishes at Ghouri Dome, I approach every visual narrative with cinematic optical discipline and painterly color science.\n\nAwarded 2nd Place globally in the Vivo Photography Competition and 3rd Place across Egyptian Universities Championship, my mission is to immortalize authentic Egyptian stories before they fade into modernity.",
    bioArabic: "أنا صانع محتوى بصري ومصور وثائقي مصري مقيم بالقاهرة، أكرس عدستي لصون التراث الثقافي الحي، والحِرف اليدوية التاريخية، والمشاعر الإنسانية الصادقة في شوارع مصر العتيقة.\n\nمن مصبغة عم سلامة التراثية بالدرب الأحمر التي تجاوز عمرها 120 عاماً، إلى فن التحطيب الأصيل في مولد سيدنا الحسين ودراويش قبة الغورية وسوق ديانا للنوادر بوسط البلد، أتعامل مع كل كادر كحكاية مستقلة بذاتها تجمع بين الانضباط البصري والتدريج اللوني السينمائي.\n\nتكلل هذا الجهد بالمركز الثاني عالمياً في مسابقة Vivo للتصوير الفوتوغرافي والمركز الثالث في بطولة الجامعات المصرية، ورسالتي هي تخليد الروح والذاكرة المصرية الأصيلة في أنقى صورها.",
    stats: [
      { number: "2nd", label: "Vivo Global Photography Awards" },
      { number: "3rd", label: "Egyptian Universities Championship" },
      { number: "60+", label: "Documentary Masterworks & Cinema Reels" }
    ],
    contact: {
      email: "ziiikoali@gmail.com",
      phone: "01017421158",
      phoneFormatted: "+20 101 742 1158",
      instagram: "_zakaria_yahia_ph",
      instagramLink: "https://www.instagram.com/_zakaria_yahia_ph/",
      tiktok: "@ziko744",
      tiktokLink: "https://www.tiktok.com/@ziko744"
    }
  },

  awards: [
    {
      id: "vivo-award",
      rank: "2ND",
      title: "2nd Place | Vivo Global Photography Competition",
      year: "2026",
      organization: "Vivo Mobile Egypt & Global Photography Jury",
      description: "Awarded globally for exceptional mobile documentary storytelling and composition capturing the spontaneous spirit and golden light of Egyptian street life.",
      citation: "A masterclass in spontaneous natural light, emotional sincerity, and cinematic street composition.",
      videoUrl: "/Content/Photo/Vivo Award/Winner.mp4",
      icon: "trophy"
    },
    {
      id: "univ-award",
      rank: "3RD",
      title: "3rd Place | Egyptian Universities Championship",
      year: "2026",
      organization: "Ministry of Higher Education & Scientific Research",
      description: "Recognized among photography talents from all Egyptian universities for documentary series preserving living Egyptian crafts and intangible heritage.",
      citation: "A profound visual documentation preserving ancient Egyptian artisan traditions and heritage crafts.",
      icon: "award"
    }
  ],

  gear: [
    {
      category: "Cinema Body",
      name: "Full-Frame Cinema System",
      spec: "14.8 Stops Latitude • 4K 10-Bit C-LOG • Fast Hybrid Dual-Pixel AF",
      icon: "Camera"
    },
    {
      category: "Signature Prime",
      name: "35mm f/1.4 Cine Prime",
      spec: "The Storyteller Lens • Razor Sharp Bokeh • Natural Human Perspective",
      icon: "Focus"
    },
    {
      category: "Portrait Prime",
      name: "85mm f/1.4 Master Portrait",
      spec: "Dramatic Subject Separation • Creamy Low-Light Falloff • Intimate Faces",
      icon: "Aperture"
    },
    {
      category: "Ultra-Wide",
      name: "16-35mm f/2.8 Ultra-Wide Cine",
      spec: "Architectural & Dome Vista • Expansive Framing for Historic Vaults",
      icon: "Maximize2"
    },
    {
      category: "Field Stabilization",
      name: "3-Axis Precision Gimbal",
      spec: "Fluid Movement • Tracking Shots Through Tight Islamic Cairo Alleys",
      icon: "Video"
    },
    {
      category: "Color Suite",
      name: "DaVinci Resolve Studio & ACEScc",
      spec: "Deep 32-Bit Floating Point Grading • Custom 35mm Egyptian Emulsion LUTs",
      icon: "Sliders"
    }
  ],

  // Documentary Chapters
  expeditions: [
    {
      id: "exp-dyehouse",
      gov: "cairo_heritage",
      category: "dyehouse",
      title: "Am Salama's Historic Dyehouse",
      titleAr: "مصبغة عم سلامة بالدرب الأحمر",
      cover: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg",
      tagline: "A Century of Hand-Dyed Indigo & Steam",
      quote: "Under ancient Mamluk stone vaults, 120 years of boiling cauldrons and stained artisan hands keep Cairo's textile soul alive.",
      photoCount: 9
    },
    {
      id: "exp-tahtib",
      gov: "cairo_heritage",
      category: "tahtib",
      title: "The Ancient Art of Tahtib",
      titleAr: "فرسان العصا | فن التحطيب بمولد الحسين",
      cover: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/1.jpg",
      tagline: "UNESCO Intangible Cultural Heritage",
      quote: "Clashing wooden staves, circling men in traditional galabeyas, and electric drumbeats echoing through Mawlid El-Hussein.",
      photoCount: 9
    },
    {
      id: "exp-tanoura",
      gov: "cairo_heritage",
      category: "tanoura",
      title: "Whirling Dervishes of Al-Ghouri",
      titleAr: "دراويش النور | فرقة التنورة التراثية",
      cover: "/Content/Photo/فرقة التنورة/3.jpg",
      tagline: "Sufi Motion & Spiritual Geometry",
      quote: "Cascading colored tiers spinning beneath the 16th-century Mamluk dome in an intoxicating trance of motion and light.",
      photoCount: 7
    },
    {
      id: "exp-vivo",
      gov: "all",
      category: "vivo_award",
      title: "The Vivo Global Award Project",
      titleAr: "مشروع مسابقة ڤيڤو العالمية الفائز",
      cover: "/Content/Photo/Vivo Award/2.jpg",
      tagline: "2nd Place Global Storytelling Winner",
      quote: "Immortalizing fleeting Egyptian street dialogues, golden hour mosque reflections, and honest human joy.",
      photoCount: 8
    },
    {
      id: "exp-diana",
      gov: "all",
      category: "diana_market",
      title: "Diana Vintage Flea Market",
      titleAr: "سوق ديانا لكاميرات الزمن الجميل",
      cover: "/Content/Photo/صور مميزه/retouch_2024062212325618.jpg",
      tagline: "Downtown Cairo's Antique Time Capsule",
      quote: "Vintage rangefinders, crackling gramophone records, and antique collectors bargaining under the European arcade.",
      photoCount: 9
    },
    {
      id: "exp-sharkia",
      gov: "all",
      category: "cinema_reels",
      title: "Rural Sharkia & Human Stories",
      titleAr: "ريف الشرقية وحكايات الناس",
      cover: "/Content/Photo/صور مميزه/photo_2025-05-09_16-32-55.jpg",
      tagline: "Pastoral Serenity & Honest Encounters",
      quote: "Green Nile horizons, waterwheels at dawn, and warm conversations with folks the camera brought into my life.",
      photoCount: 6
    }
  ],

  gradingSamples: [
    {
      id: "sample-dyehouse",
      title: "Am Salama's Dyehouse Cauldron",
      category: "Dyehouse / Artisan Craft",
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg"
    },
    {
      id: "sample-tanoura",
      title: "Whirling Dervish Ghouri Dome",
      category: "Tanoura / Sufi Motion",
      url: "/Content/Photo/فرقة التنورة/3.jpg"
    },
    {
      id: "sample-tahtib",
      title: "Tahtib Duel at Mawlid",
      category: "Tahtib / Street Heritage",
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/1.jpg"
    },
    {
      id: "sample-vivo",
      title: "Al-Moez Mosque Reflection",
      category: "Vivo Winner / Islamic Cairo",
      url: "/Content/Photo/Vivo Award/2.jpg"
    }
  ],

  gradingPresets: [
    {
      id: "kodak-500t",
      name: "Kodak Vision3 500T",
      badge: "Warm Filmic",
      description: "Rich golden highlights, warm amber roll-off, cinematic contrast preserving shadow skin tones in Cairo alleys.",
      filterCss: "contrast(1.18) saturate(1.22) sepia(0.22) hue-rotate(-8deg) brightness(1.02)",
      highlights: "Warm Gold #f6c06a",
      shadows: "Deep Warm Navy #101626"
    },
    {
      id: "teal-orange",
      name: "Mediterranean Teal & Ochre",
      badge: "Blockbuster Cine",
      description: "Cyan/teal stone shadows contrasted with luminous warm ochre sunlit fabric highlights.",
      filterCss: "contrast(1.22) saturate(1.18) hue-rotate(18deg) brightness(0.98)",
      highlights: "Amber Orange #ff9800",
      shadows: "Cyan Teal #00838f"
    },
    {
      id: "leica-noir",
      name: "Leica Monochrome Tri-X",
      badge: "Timeless Noir",
      description: "Classic high-acutance silver halide black & white. Deep shadows and sculpted directional contrast for Tahtib.",
      filterCss: "grayscale(1) contrast(1.42) brightness(0.96)",
      highlights: "Pure Silver #f5f5f5",
      shadows: "Obsidian Black #050505"
    },
    {
      id: "vintage-portra",
      name: "Portra 400 Documentary",
      badge: "Natural Pastel",
      description: "Soft muted greens, warm earthy skin tones, smooth midtone gradations for authentic human storytelling.",
      filterCss: "contrast(1.06) saturate(1.08) brightness(1.04) sepia(0.12)",
      highlights: "Soft Cream #fffae6",
      shadows: "Olive Charcoal #1e201c"
    }
  ],

  // 100% Real Photo & Video Showcase
  photos: [
    // ----------------------------------------------------
    // 1. Vivo Global Award Series (8 Photos)
    // ----------------------------------------------------
    {
      url: "/Content/Photo/Vivo Award/2.jpg",
      category: "vivo_award",
      title: "انعكاس التاريخ | ساحات المعز الفاطمية",
      titleEn: "Reflection of Heritage | Al-Moez Arcade",
      location: "Old Cairo",
      description: "The award-winning shot capturing symmetrical arches reflected in clean water, framing Egyptian citizens strolling in timeless golden sunlight.",
      exif: { gear: "Vivo X-Series / Flagship Optics", focal: "35mm Equivalent", aperture: "f/2.2", shutter: "1/400s", iso: "100" }
    },
    {
      url: "/Content/Photo/Vivo Award/1.jpg",
      category: "vivo_award",
      title: "إشراقة أزقة القاهرة | ضوء الصباح على الوجوه",
      titleEn: "Morning Light on Cairo Alleys",
      location: "El-Darb El-Ahmar",
      description: "Gentle morning light piercing the historic limestone corridor, illuminating the genuine expressions of everyday Cairo passersby.",
      exif: { gear: "Vivo Flagship System", focal: "35mm Equivalent", aperture: "f/1.8", shutter: "1/250s", iso: "160" }
    },
    {
      url: "/Content/Photo/Vivo Award/3.jpg",
      category: "vivo_award",
      title: "حديث العابرين | كيمياء اللقاء العفوي",
      titleEn: "Spontaneous Street Dialogue",
      location: "Khan El-Khalili",
      description: "Capturing a fleeting, intimate moment of laughter between two Egyptian elders outside a century-old coffee house.",
      exif: { gear: "Vivo Flagship System", focal: "50mm Equivalent", aperture: "f/2.0", shutter: "1/320s", iso: "200" }
    },
    {
      url: "/Content/Photo/Vivo Award/4.jpg",
      category: "vivo_award",
      title: "نظرة الصانع | تركيز الحرفي البسيط",
      titleEn: "Artisan Gaze | The Quiet Craft",
      location: "Old Cairo",
      description: "Quiet dedication etched across the weathered face of a traditional Egyptian craft maker working by natural window light.",
      exif: { gear: "Vivo Flagship System", focal: "50mm Equivalent", aperture: "f/1.8", shutter: "1/160s", iso: "250" }
    },
    {
      url: "/Content/Photo/Vivo Award/5.jpg",
      category: "vivo_award",
      title: "شمس الظهيرة | ظلال المآذن والمشربيات",
      titleEn: "Midday Shadows of Minarets",
      location: "Al-Azhar Quarter",
      description: "Deep diagonal shadows cast by intricate wooden Mashrabiya screens onto ancient cobblestones.",
      exif: { gear: "Vivo Flagship System", focal: "24mm Equivalent", aperture: "f/2.4", shutter: "1/800s", iso: "50" }
    },
    {
      url: "/Content/Photo/Vivo Award/6.jpg",
      category: "vivo_award",
      title: "تفاصيل الحارة | نوستالجيا الجدران العتيقة",
      titleEn: "Alley Texture & Memory",
      location: "Bab El-Wazir",
      description: "Textured layers of peeled paint, historic masonry, and colorful vintage doorways framing neighborhood kids.",
      exif: { gear: "Vivo Flagship System", focal: "35mm Equivalent", aperture: "f/2.0", shutter: "1/200s", iso: "125" }
    },
    {
      url: "/Content/Photo/Vivo Award/7.jpg",
      category: "vivo_award",
      title: "ابتسامة مصرية | طيبة الملامح الأصيلة",
      titleEn: "Warm Egyptian Smile",
      location: "Sayeda Zeinab",
      description: "The unforgettable warmth and hospitality of an Egyptian street vendor captured in an unposed candid smile.",
      exif: { gear: "Vivo Flagship System", focal: "50mm Equivalent", aperture: "f/1.8", shutter: "1/250s", iso: "100" }
    },
    {
      url: "/Content/Photo/Vivo Award/8.jpg",
      category: "vivo_award",
      title: "سكون المساء | وداع الشمس فوق أسطح القاهرة",
      titleEn: "Cairo Rooftop Dusk",
      location: "Citadel Vista",
      description: "Warm amber dusk enveloping the silhouette of historic domes as the city settles into the evening call to prayer.",
      exif: { gear: "Vivo Flagship System", focal: "35mm Equivalent", aperture: "f/1.8", shutter: "1/100s", iso: "400" }
    },

    // ----------------------------------------------------
    // 2. Tahtib Stick Martial Dance at Mawlid (9 Photos)
    // ----------------------------------------------------
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/1.jpg",
      category: "tahtib",
      title: "فرسان العصا | تناغم الضربات الإيقاعية",
      titleEn: "Knights of the Stave | Tahtib Cadence",
      location: "Mawlid El-Hussein, Cairo",
      description: "Two seasoned Tahtib martial dancers clashing polished hardwood sticks in a synchronized ritual dance recognized by UNESCO.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/1.8", shutter: "1/640s", iso: "800" }
    },
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/2.jpg",
      category: "tahtib",
      title: "وقفة الفارس | ميزان الحركة والخطوات",
      titleEn: "Stance of Balance",
      location: "Mawlid El-Hussein, Cairo",
      description: "Poise, footwork, and mathematical balance as the elder fighter circles his opponent awaiting the drum's cue.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/2.0", shutter: "1/500s", iso: "640" }
    },
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/3.jpg",
      category: "tahtib",
      title: "اشتباك الخشب | لحظة التماس الحاسم",
      titleEn: "The Strike Contact",
      location: "Mawlid El-Hussein, Cairo",
      description: "The sharp acoustic crack of wood against wood frozen in mid-air amidst sawdust and cheering spectators.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/1.4", shutter: "1/1000s", iso: "1000" }
    },
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/4.jpg",
      category: "tahtib",
      title: "عيون الميدان | تركيز الصقر قبل الهجوم",
      titleEn: "Falcon Gaze Before Strike",
      location: "Mawlid El-Hussein, Cairo",
      description: "Intense ocular concentration and razor-sharp reflexes in the midst of the energetic circle.",
      exif: { gear: "Canon Cinema EOS", focal: "85mm Prime", aperture: "f/1.8", shutter: "1/800s", iso: "800" }
    },
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/5.jpg",
      category: "tahtib",
      title: "حلقة المحبين | هتاف الجماهير والطبول",
      titleEn: "Circle of Chants & Drums",
      location: "Mawlid El-Hussein, Cairo",
      description: "Hundreds of devotees and spectators crowding shoulder to shoulder, forming the living arena for the fighters.",
      exif: { gear: "Canon Cinema EOS", focal: "24mm Cine", aperture: "f/2.8", shutter: "1/320s", iso: "1250" }
    },
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/6.jpg",
      category: "tahtib",
      title: "جلباب المعركة | فروسية الصعيد في قلب القاهرة",
      titleEn: "Upper Egyptian Chivalry",
      location: "Mawlid El-Hussein, Cairo",
      description: "Traditional Saidi galabeyas swirling with the fighter's rotation, embodying centuries of martial chivalry.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/1.8", shutter: "1/640s", iso: "640" }
    },
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/7.jpg",
      category: "tahtib",
      title: "المناورة الصامتة | خداع العصا والانحناء السريع",
      titleEn: "Silent Feint & Dodge",
      location: "Mawlid El-Hussein, Cairo",
      description: "A lightning-fast feint and duck illustrating the athletic grace required in Egyptian stave martial art.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/2.0", shutter: "1/800s", iso: "800" }
    },
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/8.jpg",
      category: "tahtib",
      title: "التحية الختامية | شرف المبارزة وأخلاق الفرسان",
      titleEn: "Honor Embrace After the Duel",
      location: "Mawlid El-Hussein, Cairo",
      description: "Crossing sticks in mutual respect and embracing at the duel's conclusion, showing the deep fraternal ethos of Tahtib.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/2.2", shutter: "1/400s", iso: "500" }
    },
    {
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/9.jpg",
      category: "tahtib",
      title: "أنفاس المولد | عرق الجبين والروح الشعبية",
      titleEn: "Breath of the Mawlid",
      location: "Mawlid El-Hussein, Cairo",
      description: "Beads of sweat catching ambient stage light as the master rests his staff after twenty rounds of continuous combat.",
      exif: { gear: "Canon Cinema EOS", focal: "85mm Prime", aperture: "f/1.8", shutter: "1/500s", iso: "800" }
    },

    // ----------------------------------------------------
    // 3. Am Salama's Historic Dyehouse (9 Photos)
    // ----------------------------------------------------
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/1.jpg",
      category: "dyehouse",
      title: "شلالات النيلة | خيوط الحرير تحت القباب المملوكية",
      titleEn: "Indigo Cascades | Under Historic Vaults",
      location: "El-Darb El-Ahmar, Cairo",
      description: "Towering skeins of freshly dyed royal indigo and saffron yarn hanging from 10-meter stone arches in Cairo's oldest dyehouse.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/2.0", shutter: "1/160s", iso: "1250" }
    },
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/5.jpg",
      category: "dyehouse",
      title: "عم سلامة | حارس الألوان وآخر الأسطاوات",
      titleEn: "Master Salama | Keeper of Pigments",
      location: "El-Darb El-Ahmar, Cairo",
      description: "Am Salama standing proudly amidst his steaming stone vats, his hands permanently stained with sixty years of natural dye pigments.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/1.8", shutter: "1/200s", iso: "800" }
    },
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/2.jpg",
      category: "dyehouse",
      title: "أيدي الألوان | كفوف شربت صبغة القرن",
      titleEn: "Hands of Saturated Pigment",
      location: "El-Darb El-Ahmar, Cairo",
      description: "Close-up study of dyed indigo hands lifting raw woolen yarn from the boiling natural mineral bath.",
      exif: { gear: "Canon Cinema EOS", focal: "85mm Macro", aperture: "f/2.2", shutter: "1/250s", iso: "1000" }
    },
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/3.jpg",
      category: "dyehouse",
      title: "أبخرة المراجل | غليان الصبغة ونيران الخشب",
      titleEn: "Cauldron Steam & Woodfire Glow",
      location: "El-Darb El-Ahmar, Cairo",
      description: "Atmospheric plumes of warm steam rising against the cool limestone masonry as the wood fire heats the dyeing copper vats.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/1.8", shutter: "1/320s", iso: "1600" }
    },
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/4.jpg",
      category: "dyehouse",
      title: "أحواض التعتيق | أسرار خلط الألوان العتيقة",
      titleEn: "The Stone Vats of Antiquity",
      location: "El-Darb El-Ahmar, Cairo",
      description: "Deep ancient cisterns containing rich organic pigments, natural alum, and pomegranate peel used for mordanting.",
      exif: { gear: "Canon Cinema EOS", focal: "24mm Cine", aperture: "f/2.8", shutter: "1/125s", iso: "1250" }
    },
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/6.jpg",
      category: "dyehouse",
      title: "متاهة الخيوط | غابة من الألياف المعلقة للتجفيف",
      titleEn: "Forest of Drying Fibers",
      location: "El-Darb El-Ahmar, Cairo",
      description: "A labyrinthine perspective looking through thousands of vibrant orange and yellow threads hung up to air dry.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/2.0", shutter: "1/200s", iso: "800" }
    },
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/7.jpg",
      category: "dyehouse",
      title: "شعاع النور | ضوء الشمس يخترق سقف المصبغة",
      titleEn: "Shaft of Sun Through the Skylight",
      location: "El-Darb El-Ahmar, Cairo",
      description: "A single dramatic beam of Cairo sun cutting through steam, illuminating dust motes and drying yarn.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/1.8", shutter: "1/400s", iso: "400" }
    },
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/8.jpg",
      category: "dyehouse",
      title: "أرجواني وقرمزي | نسيج النبلاء في حارة شعبية",
      titleEn: "Crimson & Royal Purple",
      location: "El-Darb El-Ahmar, Cairo",
      description: "Rich madder root crimson skeins being wrung dry by two workers using heavy wooden poles.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/2.2", shutter: "1/250s", iso: "800" }
    },
    {
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/11.jpg",
      category: "dyehouse",
      title: "ذاكرة الحجر | جدران تشهد على 120 عاماً من الكدح",
      titleEn: "Stone Memory | 120 Years of Craft",
      location: "El-Darb El-Ahmar, Cairo",
      description: "The weathered texture of century-old stone stained with indigo splashes, witnessing generations of Cairo dyers.",
      exif: { gear: "Canon Cinema EOS", focal: "24mm Cine", aperture: "f/2.8", shutter: "1/100s", iso: "1600" }
    },

    // ----------------------------------------------------
    // 4. Tanoura Sufi Troupe at Ghouri Dome (7 Photos)
    // ----------------------------------------------------
    {
      url: "/Content/Photo/فرقة التنورة/3.jpg",
      category: "tanoura",
      title: "قوس قزح الدرويش | دوامة الحركة والإيقاع",
      titleEn: "The Whirling Rainbow | Dynamic Trance",
      location: "Wekalet El-Ghouri, Cairo",
      description: "Long exposure study of the tiered geometric skirt transforming into an optical vortex of sacred color and light.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/2.0", shutter: "1/125s", iso: "1000" }
    },
    {
      url: "/Content/Photo/فرقة التنورة/1.jpg",
      category: "tanoura",
      title: "مدار الفلك | دوران الروح نحو السماء",
      titleEn: "Celestial Orbit of the Spirit",
      location: "Wekalet El-Ghouri, Cairo",
      description: "The dancer's right hand raised to receive cosmic blessing while the left points downward to ground it into the earth.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/1.8", shutter: "1/250s", iso: "800" }
    },
    {
      url: "/Content/Photo/فرقة التنورة/2.jpg",
      category: "tanoura",
      title: "ألوان الوجد | تدرجات الطبقات الصوفية السبع",
      titleEn: "Seven Cosmic Tiers of Color",
      location: "Wekalet El-Ghouri, Cairo",
      description: "Lifting the heavy 15-kilogram skirt in concentric tiers, each layer signifying a stage in the Sufi seeker's journey.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/2.2", shutter: "1/320s", iso: "640" }
    },
    {
      url: "/Content/Photo/فرقة التنورة/4.jpg",
      category: "tanoura",
      title: "إيقاع الدفوف | نبض الأناشيد في قبة الغورية",
      titleEn: "Sacred Percussion & Chants",
      location: "Wekalet El-Ghouri, Cairo",
      description: "Traditional musicians playing the Duff, Nay, and Mazhar drums echoing inside the 16th-century acoustic dome.",
      exif: { gear: "Canon Cinema EOS", focal: "85mm Prime", aperture: "f/1.8", shutter: "1/200s", iso: "1250" }
    },
    {
      url: "/Content/Photo/فرقة التنورة/5.jpg",
      category: "tanoura",
      title: "رفع المظلة | انفتاح الكادر على النور",
      titleEn: "Lifting the Canopy of Light",
      location: "Wekalet El-Ghouri, Cairo",
      description: "The climax of the performance as the outer skirt is lifted over the dancer's head like an umbrella of spinning geometries.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/1.4", shutter: "1/400s", iso: "800" }
    },
    {
      url: "/Content/Photo/فرقة التنورة/6.jpg",
      category: "tanoura",
      title: "التحليق الأرضي | خفة الجسد مع سرعة الدوران",
      titleEn: "Earthly Levitation",
      location: "Wekalet El-Ghouri, Cairo",
      description: "Continuous rotational momentum exceeding 60 revolutions per minute while maintaining absolute serene equilibrium.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/2.0", shutter: "1/500s", iso: "1000" }
    },
    {
      url: "/Content/Photo/فرقة التنورة/7.jpg",
      category: "tanoura",
      title: "سكون ما بعد العاصفة | سلام الختام وخشوع الحضور",
      titleEn: "Peace After the Vortex",
      location: "Wekalet El-Ghouri, Cairo",
      description: "The final bow as the spinning skirts collapse back to stillness and the dancer crosses his hands over his chest in prayer.",
      exif: { gear: "Canon Cinema EOS", focal: "85mm Prime", aperture: "f/1.8", shutter: "1/160s", iso: "800" }
    },

    // ----------------------------------------------------
    // 5. Signature Highlights & Egyptian Heritage (8 Photos)
    // ----------------------------------------------------
    {
      url: "/Content/Photo/صور مميزه/retouch_2024062212325618.jpg",
      category: "featured",
      title: "سوق ديانا | كاميرات الزمن الجميل بوسط البلد",
      titleEn: "Diana Market | Vintage Optics",
      location: "Downtown Cairo",
      description: "A treasure trove of mechanical rangefinder cameras, vintage brass lenses, and antique collectors in Downtown Cairo.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/1.8", shutter: "1/200s", iso: "200" }
    },
    {
      url: "/Content/Photo/صور مميزه/photo_2025-05-09_16-32-55.jpg",
      category: "featured",
      title: "أيدي الطين الخالدة | فخار قرية جريس",
      titleEn: "Hands of Nile Clay",
      location: "Grace Pottery Village",
      description: "Centuries of pottery wisdom passed down through generations, shaping Nile mud on foot-powered stone wheels.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/1.8", shutter: "1/320s", iso: "400" }
    },
    {
      url: "/Content/Photo/صور مميزه/photo_2025-05-09_16-33-01.jpg",
      category: "featured",
      title: "نار الأفران التقليدية | أوعية الفخار في فجر الدلتا",
      titleEn: "Traditional Wood Kilns",
      location: "Grace Pottery Village",
      description: "Smoky wood kilns firing hundreds of clay vessels under the early dawn light in the rural Nile Delta.",
      exif: { gear: "Canon Cinema EOS", focal: "35mm Prime", aperture: "f/2.2", shutter: "1/250s", iso: "500" }
    },
    {
      url: "/Content/Photo/صور مميزه/photo_2025-05-09_16-31-28.jpg",
      category: "featured",
      title: "سكون شواطئ البحر | نوستالجيا الشتاء",
      titleEn: "Winter Coast Serenity",
      location: "Alexandria Coast",
      description: "Coastal solitude, cold Mediterranean mist, and fishing boats anchored along Alexandria's Eastern Harbour.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/2.0", shutter: "1/400s", iso: "100" }
    },
    {
      url: "/Content/Photo/صور مميزه/photo_2025-05-09_16-31-24.jpg",
      category: "featured",
      title: "عزلة المتوسط | صياد على صخور الكورنيش",
      titleEn: "The Solitary Angler",
      location: "Alexandria",
      description: "A lone fisherman silhouetted against crashing grey waves on Alexandria's historic corniche.",
      exif: { gear: "Canon Cinema EOS", focal: "85mm Prime", aperture: "f/2.8", shutter: "1/500s", iso: "160" }
    },
    {
      url: "/Content/Photo/صور مميزه/photo_2025-05-09_16-34-09.jpg",
      category: "featured",
      title: "ملامح الزمن | وجه مصري أصيل",
      titleEn: "Timeless Egyptian Face",
      location: "Nile Delta",
      description: "Gentle dignity and quiet resilience captured in an intimate, respectful portrait of a village elder.",
      exif: { gear: "Canon Cinema EOS", focal: "85mm Prime", aperture: "f/1.8", shutter: "1/250s", iso: "200" }
    },
    {
      url: "/Content/Photo/صور مميزه/photo_2025-05-09_21-18-51.jpg",
      category: "featured",
      title: "سحر الليل بالقاهرة | أضواء المآذن الفاطمية",
      titleEn: "Cairo Nocturne | Illuminated Minarets",
      location: "Historic Cairo",
      description: "Golden warm architectural lighting illuminating the medieval stone battlements and minarets against deep navy night skies.",
      exif: { gear: "Canon Cinema EOS", focal: "24mm Cine", aperture: "f/2.8", shutter: "1/60s", iso: "1600" }
    },
    {
      url: "/Content/Photo/صور مميزه/photo_2025-05-09_16-32-40.jpg",
      category: "featured",
      title: "حرفة الأجداد | تشكيل الطين بأقدام حافية",
      titleEn: "Foot-Powered Clay Shaping",
      location: "Grace Pottery Village",
      description: "The foot rhythmically spinning the heavy stone wheel while the hands guide the clay into a delicate water pitcher.",
      exif: { gear: "Canon Cinema EOS", focal: "50mm Prime", aperture: "f/2.0", shutter: "1/200s", iso: "320" }
    }
  ],

  // ----------------------------------------------------
  // Videos & Motion Cinema Reels (100% Real from Content/Video)
  // ----------------------------------------------------
  videos: [
    {
      id: "vid-human-stories",
      url: "/Content/Video/Human Stories/اوقات الكاميرا بتعرفك علي ناس مكنتش هتقابلهم.mp4",
      category: "cinema_reels",
      title: "أوقات الكاميرا بتعرفك على ناس مكنتش هتقابلهم",
      titleEn: "When the Camera Introduces You to Strangers",
      location: "Cairo & Rural Egypt",
      description: "A deeply moving documentary film exploring how the camera becomes a bridge of human empathy, unlocking untold life stories across Egypt.",
      duration: "01:24",
      format: "4K Motion Documentary"
    },
    {
      id: "vid-tanoura-ghouri",
      url: "/Content/Video/أجواء حفلة التنورة قبة الغورية/حالة روحانية والوان بتخطف العين من قلب القاهرة الفاطمية!.mp4",
      category: "cinema_reels",
      title: "حالة روحانية وألوان تخطف العين من قبة الغورية",
      titleEn: "Spiritual Trance & Whirling Colors of Ghouri",
      location: "Wekalet El-Ghouri, Fatimid Cairo",
      description: "Live dynamic footage inside the 500-year-old Mamluk dome capturing the mesmerizing acoustic resonance and kaleidoscopic whirling dervishes.",
      duration: "01:45",
      format: "4K Cinema Reel"
    },
    {
      id: "vid-mawlid-finale",
      url: "/Content/Video/الليلة الختامية في مولد سيدنا الحسين/الليلة الختامية في مولد سيدنا الحسين.mp4",
      category: "cinema_reels",
      title: "الليلة الختامية في مولد سيدنا الحسين",
      titleEn: "The Grand Finale of Mawlid El-Hussein",
      location: "Old Cairo",
      description: "Electric crowd energy, Sufi chanting, colorful street lights, and spiritual devotion during the peak night of Cairo's largest religious festival.",
      duration: "02:10",
      format: "4K Documentary Reel"
    },
    {
      id: "vid-rural-sharkia",
      url: "/Content/Video/ريف الشرقية/ريف الشرقية.mp4",
      category: "cinema_reels",
      title: "ريف الشرقية | سكون الطبيعة وحكايات الأرض",
      titleEn: "Rural Sharkia | Land of Peace & Nile Horizon",
      location: "Sharkia Governorate",
      description: "Pastoral cinematic poetry tracing the rhythm of Egyptian agrarian life, irrigation canals, and honest conversations with local farmers.",
      duration: "01:58",
      format: "4K Cinematic Essay"
    },
    {
      id: "vid-vivo-winner",
      url: "/Content/Photo/Vivo Award/Winner.mp4",
      category: "vivo_award",
      title: "مشروع مسابقة ڤيڤو | إعلان التتويج العالمي بالمركز الثاني",
      titleEn: "Vivo Global Award | Official 2nd Place Reel",
      location: "Global Competition Showcase",
      description: "The official competition winning presentation film celebrating Zakaria's outstanding street storytelling series.",
      duration: "00:45",
      format: "Award Film Reel"
    },
    // Diana Market Vintage Reels
    {
      id: "vid-diana-1",
      url: "/Content/Video/سوق ديانا/1.mp4",
      category: "diana_market",
      title: "سوق ديانا 01 | كاميرات فيلم وعدسات كلاسيكية",
      titleEn: "Diana Market Reel 01 | Vintage Film Cameras",
      location: "Downtown Cairo",
      description: "Examining rare mechanical cameras and vintage lenses traded every Saturday in Downtown Cairo.",
      duration: "00:30",
      format: "Vertical Reel"
    },
    {
      id: "vid-diana-2",
      url: "/Content/Video/سوق ديانا/2.mp4",
      category: "diana_market",
      title: "سوق ديانا 02 | نبض وسط البلد وعشاق الأنتيك",
      titleEn: "Diana Market Reel 02 | The Saturday Gathering",
      location: "Downtown Cairo",
      description: "The unique Saturday morning gathering where collectors, bohemians, and tourists browse vintage oddities.",
      duration: "00:35",
      format: "Vertical Reel"
    },
    {
      id: "vid-diana-3",
      url: "/Content/Video/سوق ديانا/3.mp4",
      category: "diana_market",
      title: "سوق ديانا 03 | أسطوانات الجرامافون وصوت الماضي",
      titleEn: "Diana Market Reel 03 | Vinyl & Gramophones",
      location: "Downtown Cairo",
      description: "Vinyl records of Umm Kulthum and golden-age Egyptian cinema playing on portable vintage gramophones.",
      duration: "00:28",
      format: "Vertical Reel"
    },
    {
      id: "vid-diana-4",
      url: "/Content/Video/سوق ديانا/4.mp4",
      category: "diana_market",
      title: "سوق ديانا 04 | ساعات الجيب والمقتنيات النادرة",
      titleEn: "Diana Market Reel 04 | Pocket Watches & Curios",
      location: "Downtown Cairo",
      description: "Intricate Swiss and vintage pocket watches being wound and inspected by expert antique collectors.",
      duration: "00:25",
      format: "Vertical Reel"
    },
    {
      id: "vid-diana-5",
      url: "/Content/Video/سوق ديانا/5.mp4",
      category: "diana_market",
      title: "سوق ديانا 05 | طقوس الفصال وشاي الرصيف",
      titleEn: "Diana Market Reel 05 | Sidewalk Tea & Deals",
      location: "Downtown Cairo",
      description: "Friendly bargaining rituals over hot mint tea on the sidewalk of Emad El-Din Street.",
      duration: "00:32",
      format: "Vertical Reel"
    },
    {
      id: "vid-diana-7",
      url: "/Content/Video/سوق ديانا/7.mp4",
      category: "diana_market",
      title: "سوق ديانا 06 | وجوه الباعة والشغف الموروث",
      titleEn: "Diana Market Reel 06 | Faces of the Antique Dealers",
      location: "Downtown Cairo",
      description: "Portraits and candid interactions with the veteran dealers who have inhabited this flea market for decades.",
      duration: "00:26",
      format: "Vertical Reel"
    },
    {
      id: "vid-diana-8",
      url: "/Content/Video/سوق ديانا/8.mp4",
      category: "diana_market",
      title: "سوق ديانا 07 | كنوز الورق والملصقات السينمائية",
      titleEn: "Diana Market Reel 07 | Vintage Cinema Posters",
      location: "Downtown Cairo",
      description: "Rare lithograph movie posters from the 1950s and 1960s Golden Era of Egyptian cinema.",
      duration: "00:38",
      format: "Vertical Reel"
    },
    {
      id: "vid-diana-10",
      url: "/Content/Video/سوق ديانا/10.mp4",
      category: "diana_market",
      title: "سوق ديانا 08 | تفاصيل النحاس والأواني القديمة",
      titleEn: "Diana Market Reel 08 | Islamic Brass & Antiquities",
      location: "Downtown Cairo",
      description: "Hand-engraved Mamluk-style brass trays, copper coffee pots, and historical trinkets.",
      duration: "00:34",
      format: "Vertical Reel"
    },
    {
      id: "vid-diana-11",
      url: "/Content/Video/سوق ديانا/11.mp4",
      category: "diana_market",
      title: "سوق ديانا 09 | نوستالجيا القاهرة الخديوية",
      titleEn: "Diana Market Reel 09 | Belle Époque Cairo Nostalgia",
      location: "Downtown Cairo",
      description: "Atmospheric wander through the Belle Époque arcades surrounding the historic Cinema Diana.",
      duration: "00:29",
      format: "Vertical Reel"
    }
  ],

  // Behind the Scenes Field Diaries (From Real Projects)
  bts: [
    {
      title: "مصبغة عم سلامة بالدرب الأحمر",
      titleEn: "Inside Am Salama's Dyehouse",
      description: "توثيق العمل في درجات حرارة مرتفعة وأبخرة كثيفة، والتعامل مع الإضاءة المنخفضة تحت قباب الدرب الأحمر التاريخية.",
      url: "/Content/Photo/مصبغة عم سلامة الدرب الاحمر/3.jpg"
    },
    {
      title: "حلقة التحطيب في زحام مولد الحسين",
      titleEn: "The Tahtib Circle at Mawlid El-Hussein",
      description: "التحرك بالكاميرا بين ضربات العصي السريعة وتدافع الحشود الغفيرة لتأطير اللحظات الحاسمة بحدة بؤرية فائقة.",
      url: "/Content/Photo/تحطيب ف مولد سيدنا الحسين ف القاهره/5.jpg"
    },
    {
      title: "دراويش قبة الغورية في القاهرة الفاطمية",
      titleEn: "Whirling Dervishes at Ghouri Dome",
      description: "ضبط سرعة الغالق لموازنة انسيابية ألوان التنورة الدوارة مع حدة تعبيرات وجه الدرويش في الضوء الخافت.",
      url: "/Content/Photo/فرقة التنورة/1.jpg"
    }
  ]
};
