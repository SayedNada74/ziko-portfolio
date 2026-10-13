/* ==========================================================================
   ZAKARIA YAHIA | CINEMATIC & DOCUMENTARY MASTER PORTFOLIO
   Core Logic, Web Audio Synthesizer, Dynamic Darkroom & Interactivity
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Safe Fallback for PORTFOLIO_DATA
  const data = window.PORTFOLIO_DATA || {
    photographer: {},
    awards: [],
    photos: [],
    videos: [],
    bts: [],
    gear: [],
    expeditions: [],
    gradingSamples: [],
    gradingPresets: []
  };

  // State Management
  let currentFilteredList = [];
  let currentActiveIndex = 0;
  let activeCategory = "all";
  let activeGovernorate = "all";
  let activeSearchQuery = "";
  let currentViewMode = "masonry";
  let audioFxEnabled = true;
  let currentZoomLevel = 1;
  let isDraggingCompare = false;

  // Darkroom State
  let activeSampleIndex = 0;
  let activePresetIndex = 0;
  let customExposure = 0;
  let customTemp = 0;
  let customGrain = 40;

  // Cache Core DOM Elements
  const navbar = document.querySelector(".header-navbar");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const mouseSpotlight = document.getElementById("mouseSpotlight");
  const customCursor = document.getElementById("customCursor");
  const cursorLabel = document.getElementById("cursorLabel");
  const scrollProgressBar = document.getElementById("scrollProgressBar");
  
  // Gallery DOM
  const galleryGrid = document.getElementById("galleryGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const subFilterWrapper = document.getElementById("subFilterWrapper");
  const subFilterBtns = document.querySelectorAll(".sub-filter-btn");
  const searchInput = document.getElementById("gallerySearchInput");
  const searchClearBtn = document.getElementById("searchClearBtn");
  const viewModeBtns = document.querySelectorAll(".view-mode-btn");
  const statusIndicator = document.getElementById("galleryStatusIndicator");
  const statusIndicatorText = document.getElementById("statusIndicatorText");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");

  // Lightbox DOM Elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxVideo = document.getElementById("lightboxVideo");
  const lbCloseBtn = document.getElementById("lbCloseBtn");
  const lbPrevBtn = document.querySelector(".lightbox-nav-btn.prev-btn");
  const lbNextBtn = document.querySelector(".lightbox-nav-btn.next-btn");
  const lbCurrentIndex = document.getElementById("lbCurrentIndex");
  const lbTotalCount = document.getElementById("lbTotalCount");
  const lbTitle = document.getElementById("lbTitle");
  const lbLocation = document.getElementById("lbLocation");
  const lbCategoryTag = document.getElementById("lbCategoryTag");
  const exifGear = document.getElementById("exifGear");
  const exifFocal = document.getElementById("exifFocal");
  const exifAperture = document.getElementById("exifAperture");
  const exifShutter = document.getElementById("exifShutter");
  const exifIso = document.getElementById("exifIso");
  const lbStoryText = document.getElementById("lbStoryText");
  const lbDetailsPanel = document.getElementById("lightboxDetailsPanel");
  const lbExifToggleBtn = document.getElementById("lbExifToggleBtn");
  const lbZoomInBtn = document.getElementById("lbZoomInBtn");
  const lbZoomOutBtn = document.getElementById("lbZoomOutBtn");
  const lbFullscreenBtn = document.getElementById("lbFullscreenBtn");
  const lbThumbnailsTray = document.getElementById("lightboxThumbnailsTray");

  /* ==========================================================================
     1. WEB AUDIO API SYNTHETIC CAMERA SHUTTER SOUND ENGINE (ZERO-LATENCY)
     ========================================================================== */
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  // Realistic SLR Camera Shutter Sound (Mirror slap + Shutter blade curtain)
  function playCameraShutterSound() {
    if (!audioFxEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;

      const now = audioCtx.currentTime;

      // Click 1: Mirror Slap (Low-mid snappy thud)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(60, now + 0.04);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.04);

      // Noise Burst: Mechanical Focal Plane Shutter Blades (Crisp metallic click)
      const bufferSize = audioCtx.sampleRate * 0.06;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      // Bandpass filter for metallic camera body resonance
      const filter = audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(2800, now);
      filter.Q.setValueAtTime(3.0, now);

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.45, now + 0.015);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);

      whiteNoise.start(now + 0.015);
      whiteNoise.stop(now + 0.08);

      // Click 2: Second Curtain Reset
      const osc2 = audioCtx.createOscillator();
      const gain2 = audioCtx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(450, now + 0.055);
      osc2.frequency.exponentialRampToValueAtTime(90, now + 0.095);
      gain2.gain.setValueAtTime(0.25, now + 0.055);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
      osc2.connect(gain2);
      gain2.connect(audioCtx.destination);
      osc2.start(now + 0.055);
      osc2.stop(now + 0.1);
    } catch (e) {
      console.warn("Audio FX error", e);
    }
  }

  // Audio FX Toggle Button in Camera HUD Bar
  const btnAudioFx = document.getElementById("btnAudioFx");
  if (btnAudioFx) {
    btnAudioFx.addEventListener("click", () => {
      initAudioContext();
      audioFxEnabled = !audioFxEnabled;
      if (audioFxEnabled) {
        btnAudioFx.classList.add("active");
        btnAudioFx.innerHTML = `<i class="fas fa-volume-up"></i> <span>AUDIO FX: ON</span>`;
        playCameraShutterSound();
      } else {
        btnAudioFx.classList.remove("active");
        btnAudioFx.innerHTML = `<i class="fas fa-volume-mute"></i> <span>AUDIO FX: OFF</span>`;
      }
    });
  }

  // Viewfinder Grid Toggle
  const btnGridToggle = document.getElementById("btnGridToggle");
  const viewfinderGridOverlay = document.getElementById("viewfinderGridOverlay");
  if (btnGridToggle && viewfinderGridOverlay) {
    btnGridToggle.addEventListener("click", () => {
      viewfinderGridOverlay.classList.toggle("active");
      btnGridToggle.classList.toggle("active");
      playCameraShutterSound();
    });
  }

  // Analog Film Grain Toggle
  const btnGrainToggle = document.getElementById("btnGrainToggle");
  const filmGrainOverlay = document.getElementById("filmGrainOverlay");
  if (btnGrainToggle && filmGrainOverlay) {
    btnGrainToggle.addEventListener("click", () => {
      filmGrainOverlay.classList.toggle("active");
      btnGrainToggle.classList.toggle("active");
      playCameraShutterSound();
    });
  }

  /* ==========================================================================
     2. VIEWFINDER TIMECODE ENGINE (24 FPS LIVE COUNTER)
     ========================================================================== */
  const hudTimecode = document.getElementById("hudTimecode");
  let frameCount = 0;
  let seconds = 14;
  let minutes = 0;
  let hours = 0;

  setInterval(() => {
    frameCount++;
    if (frameCount >= 24) {
      frameCount = 0;
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }
    }
    if (hudTimecode) {
      const hh = String(hours).padStart(2, "0");
      const mm = String(minutes).padStart(2, "0");
      const ss = String(seconds).padStart(2, "0");
      const ff = String(frameCount).padStart(2, "0");
      hudTimecode.textContent = `${hh}:${mm}:${ss}:${ff}`;
    }
  }, 1000 / 24);

  /* ==========================================================================
     3. NAVBAR & PROGRESS BAR & MOUSE SPOTLIGHT
     ========================================================================== */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && scrollProgressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgressBar.style.width = `${progress}%`;
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      const isActive = navLinks.classList.contains("active");
      icon.className = isActive ? "fas fa-times" : "fas fa-bars";
    });
  }

  document.querySelectorAll(".nav-item, .nav-booking-btn").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = mobileToggle?.querySelector("i");
      if (icon) icon.className = "fas fa-bars";
    });
  });

  // Mouse / Touch Custom Cursor & Bokeh Parallax
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (customCursor) {
      customCursor.style.left = `${mouseX}px`;
      customCursor.style.top = `${mouseY}px`;
    }

    if (mouseSpotlight) {
      mouseSpotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    // Parallax Bokeh on Hero
    const xOffset = (e.clientX - window.innerWidth / 2) / 40;
    const yOffset = (e.clientY - window.innerHeight / 2) / 40;
    if (window.gsap) {
      window.gsap.to(".bokeh-1", { x: xOffset * 1.5, y: yOffset * 1.5, duration: 1.2, ease: "power2.out" });
      window.gsap.to(".bokeh-2", { x: -xOffset * 1.2, y: -yOffset * 1.2, duration: 1.2, ease: "power2.out" });
      window.gsap.to(".bokeh-3", { x: xOffset * 0.8, y: -yOffset * 0.8, duration: 1.2, ease: "power2.out" });
    }
  });

  function setCursorState(state, label = "") {
    if (!customCursor) return;
    customCursor.classList.remove("hovering-link", "hovering-card");
    if (state === "link") {
      customCursor.classList.add("hovering-link");
      cursorLabel.textContent = "";
    } else if (state === "card") {
      customCursor.classList.add("hovering-card");
      cursorLabel.textContent = label;
    }
  }

  document.querySelectorAll("a, button, input, select, textarea").forEach(el => {
    el.addEventListener("mouseenter", () => setCursorState("link"));
    el.addEventListener("mouseleave", () => setCursorState("default"));
  });

  /* ==========================================================================
     4. INFINITE 35MM FILMSTRIP REEL (MARQUEE)
     ========================================================================== */
  function initFilmstripMarquee() {
    const marquee = document.getElementById("filmstripMarquee");
    if (!marquee || !data.photos || data.photos.length === 0) return;

    // Pick a curated selection of 12 distinct photos
    const curated = data.photos.slice(0, 14);
    // Duplicate for seamless 100% infinite glide
    const list = [...curated, ...curated];

    marquee.innerHTML = "";
    list.forEach((photo, idx) => {
      const frameNum = String((idx % 14) + 1).padStart(2, "0") + "A";
      const item = document.createElement("div");
      item.className = "film-frame-item";
      item.innerHTML = `
        <img src="${photo.url}" alt="${photo.title}" loading="lazy">
        <div class="film-frame-badge">${photo.location}</div>
        <div class="film-edge-code">#5219 ${frameNum}</div>
      `;
      item.addEventListener("click", () => {
        const fullIndex = data.photos.findIndex(p => p.url === photo.url);
        if (fullIndex !== -1) {
          playCameraShutterSound();
          activeCategory = "all";
          renderGallery();
          openLightbox(fullIndex);
        }
      });
      item.addEventListener("mouseenter", () => setCursorState("card", "VIEW"));
      item.addEventListener("mouseleave", () => setCursorState("default"));
      marquee.appendChild(item);
    });
  }

  /* ==========================================================================
     5. DOCUMENTARY EXPEDITIONS (CHAPTERS ACROSS EGYPT)
     ========================================================================== */
  function renderExpeditions() {
    const grid = document.getElementById("expeditionsGrid");
    if (!grid || !data.expeditions) return;

    grid.innerHTML = "";
    data.expeditions.forEach(exp => {
      const card = document.createElement("div");
      card.className = "expedition-card";
      card.innerHTML = `
        <div class="expedition-card-bg" style="background-image: url('${exp.cover}');"></div>
        <div class="expedition-card-gradient"></div>
        <div class="expedition-card-content">
          <span class="expedition-badge">${exp.tagline}</span>
          <h3 class="expedition-title">${exp.title}</h3>
          <p class="expedition-quote">"${exp.quote}"</p>
          <div class="expedition-action">
            <span class="expedition-count"><i class="fas fa-camera"></i> ${exp.photoCount} Master Shots</span>
            <span class="expedition-btn">Open Story <i class="fas fa-arrow-right"></i></span>
          </div>
        </div>
      `;

      card.addEventListener("click", () => {
        playCameraShutterSound();
        // Set category to travel or street based on expedition
        activeCategory = exp.category;
        activeGovernorate = exp.gov;
        activeSearchQuery = "";
        if (searchInput) searchInput.value = "";

        // Update UI filter tabs
        filterBtns.forEach(btn => {
          btn.classList.toggle("active", btn.getAttribute("data-category") === activeCategory);
        });

        if (activeCategory === "travel") {
          subFilterWrapper.classList.add("active");
          subFilterBtns.forEach(b => {
            b.classList.toggle("active", b.getAttribute("data-gov") === activeGovernorate);
          });
        } else {
          subFilterWrapper.classList.remove("active");
        }

        renderGallery();
        document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
      });

      card.addEventListener("mouseenter", () => setCursorState("card", "EXPLORE"));
      card.addEventListener("mouseleave", () => setCursorState("default"));

      grid.appendChild(card);
    });
  }

  /* ==========================================================================
     6. DYNAMIC GALLERY RENDERING, VIEW MODES & FILTERS
     ========================================================================== */
  function updateCategoryCounts() {
    const counts = {
      all: data.photos.length + (data.videos ? data.videos.length : 0),
      street: data.photos.filter(p => p.category === "street").length,
      architecture: data.photos.filter(p => p.category === "architecture").length,
      culture: data.photos.filter(p => p.category === "culture").length,
      events: data.photos.filter(p => p.category === "events").length,
      portrait: data.photos.filter(p => p.category === "portrait").length,
      travel: data.photos.filter(p => p.category === "travel").length,
      videographics: data.videos ? data.videos.length : 0
    };

    Object.keys(counts).forEach(key => {
      const badge = document.getElementById(`count-${key}`);
      if (badge) badge.textContent = counts[key];
    });
  }

  function getGridSpanClass(index, category) {
    if (currentViewMode !== "masonry") return "";
    if (category === "portrait") return "span-h2";
    if (category === "architecture" && index % 3 === 0) return "span-w2";
    if (index % 6 === 0) return "span-large";
    if (index % 4 === 1) return "span-h2";
    return "";
  }

  function renderGallery() {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = "";
    currentFilteredList = [];

    // Filter by category
    let list = [];
    if (activeCategory === "all") {
      list = [...data.photos];
      if (data.videos) {
        const mappedVideos = data.videos.map(v => ({ ...v, category: "videographics", isVideo: true }));
        list = [...list, ...mappedVideos];
      }
    } else if (activeCategory === "travel") {
      list = data.photos.filter(photo => {
        if (photo.category !== "travel") return false;
        if (activeGovernorate === "all") return true;
        return photo.governorate === activeGovernorate;
      });
    } else if (activeCategory === "videographics") {
      list = (data.videos || []).map(v => ({ ...v, category: "videographics", isVideo: true }));
    } else {
      list = data.photos.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (activeSearchQuery.trim() !== "") {
      const q = activeSearchQuery.toLowerCase().trim();
      list = list.filter(item => {
        const titleMatch = (item.title || "").toLowerCase().includes(q);
        const locMatch = (item.location || "").toLowerCase().includes(q);
        const catMatch = (item.category || "").toLowerCase().includes(q);
        const gearMatch = item.exif ? (item.exif.gear || "").toLowerCase().includes(q) : false;
        return titleMatch || locMatch || catMatch || gearMatch;
      });
    }

    currentFilteredList = list;

    // Status Indicator
    if (statusIndicator) {
      if (activeCategory !== "all" || activeGovernorate !== "all" || activeSearchQuery !== "") {
        statusIndicator.style.display = "flex";
        statusIndicatorText.textContent = `Showing ${list.length} results for ${activeCategory.toUpperCase()}${activeGovernorate !== "all" ? " • " + activeGovernorate : ""}${activeSearchQuery ? ' • "' + activeSearchQuery + '"' : ""}`;
      } else {
        statusIndicator.style.display = "none";
      }
    }

    if (currentFilteredList.length === 0) {
      galleryGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fas fa-camera-slash" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--accent-gold); opacity: 0.5;"></i>
          <h3 style="font-family: var(--font-serif); color: var(--text-primary); margin-bottom: 0.5rem;">No Frames Found</h3>
          <p>No photographs match your active filter or search criteria. Try resetting filters.</p>
        </div>
      `;
      return;
    }

    currentFilteredList.forEach((item, index) => {
      const card = document.createElement("div");
      const spanClass = getGridSpanClass(index, activeCategory);
      card.className = `photo-card ${spanClass}`;
      card.setAttribute("data-index", index);

      let cardHTML = "";
      if (item.isVideo) {
        cardHTML = `
          <div class="photo-inner">
            <video class="photo-img" src="${item.url}" loop muted playsinline></video>
            <div class="video-badge"><i class="fas fa-play"></i></div>
            <div class="photo-overlay">
              <div class="photo-meta-header">
                <h4 class="photo-title">${item.title}</h4>
                <span class="photo-location">${item.duration || "REEL"}</span>
              </div>
              <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.3;">${item.description || ""}</p>
            </div>
          </div>
        `;
      } else {
        const exifLine = item.exif ? `${item.exif.gear} • ${item.exif.focal} • ${item.exif.aperture}` : "Canon EOS • 35mm";
        cardHTML = `
          <div class="photo-inner">
            <img class="photo-img" src="${item.url}" alt="${item.title}" loading="lazy">
            <div class="photo-overlay">
              <div class="photo-meta-header">
                <h4 class="photo-title">${item.title}</h4>
                <span class="photo-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
              </div>
              <span class="photo-exif-pill">${exifLine}</span>
            </div>
          </div>
        `;
      }

      card.innerHTML = cardHTML;
      galleryGrid.appendChild(card);

      // Event listener for opening lightbox
      card.addEventListener("click", () => {
        playCameraShutterSound();
        openLightbox(index);
      });

      card.addEventListener("mouseenter", () => setCursorState("card", item.isVideo ? "PLAY" : "VIEW"));
      card.addEventListener("mouseleave", () => setCursorState("default"));

      // 3D Tilt Interaction
      setupTiltEffect(card);

      // Video hover play
      if (item.isVideo) {
        const videoElement = card.querySelector("video");
        card.addEventListener("mouseenter", () => {
          videoElement.play().catch(e => {});
        });
        card.addEventListener("mouseleave", () => {
          videoElement.pause();
          videoElement.currentTime = 0;
        });
      }
    });

    // GSAP Animate In
    if (window.gsap) {
      window.gsap.fromTo("#galleryGrid .photo-card",
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.02, ease: "power2.out" }
      );
    }
  }

  // 3D Card Tilt with Dynamic Reflection Sheen
  function setupTiltEffect(card) {
    const inner = card.querySelector(".photo-inner");
    if (!inner) return;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 12;
      const rotateX = -((y - centerY) / centerY) * 12;

      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      inner.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  }

  // Filter Category Buttons Click
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      playCameraShutterSound();
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      activeCategory = btn.getAttribute("data-category");

      if (activeCategory === "travel") {
        subFilterWrapper.classList.add("active");
      } else {
        subFilterWrapper.classList.remove("active");
        activeGovernorate = "all";
        subFilterBtns.forEach(b => b.classList.remove("active"));
        const defaultSub = document.querySelector('.sub-filter-btn[data-gov="all"]');
        if (defaultSub) defaultSub.classList.add("active");
      }

      renderGallery();
    });
  });

  // Governorate Sub Filter Buttons Click
  subFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      playCameraShutterSound();
      subFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeGovernorate = btn.getAttribute("data-gov");
      renderGallery();
    });
  });

  // Search Input Handler
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearchQuery = e.target.value;
      if (searchClearBtn) {
        searchClearBtn.style.display = activeSearchQuery.length > 0 ? "block" : "none";
      }
      renderGallery();
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      searchInput.value = "";
      activeSearchQuery = "";
      searchClearBtn.style.display = "none";
      renderGallery();
    });
  }

  // View Mode Switcher Click
  viewModeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      playCameraShutterSound();
      viewModeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      currentViewMode = btn.getAttribute("data-mode");
      galleryGrid.className = `gallery-grid view-${currentViewMode}`;
      renderGallery();
    });
  });

  // Reset Filters Button
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      playCameraShutterSound();
      activeCategory = "all";
      activeGovernorate = "all";
      activeSearchQuery = "";
      if (searchInput) searchInput.value = "";
      if (searchClearBtn) searchClearBtn.style.display = "none";

      filterBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-category") === "all"));
      subFilterWrapper.classList.remove("active");
      renderGallery();
    });
  }

  /* ==========================================================================
     7. INTERACTIVE COLOR GRADING LAB (THE DARKROOM)
     ========================================================================== */
  const sceneButtonsRow = document.getElementById("sceneButtonsRow");
  const lutPillsGrid = document.getElementById("lutPillsGrid");
  const sliderWidget = document.getElementById("sliderWidget");
  const gradedBaseImg = document.getElementById("gradedBaseImg");
  const rawClippedImg = document.getElementById("rawClippedImg");
  const sliderDragHandle = document.getElementById("sliderDragHandle");
  const specLutName = document.getElementById("specLutName");
  const rangeExposure = document.getElementById("rangeExposure");
  const rangeTemperature = document.getElementById("rangeTemperature");
  const rangeGrain = document.getElementById("rangeGrain");
  const valExposure = document.getElementById("valExposure");
  const valTemperature = document.getElementById("valTemperature");
  const valGrain = document.getElementById("valGrain");
  const resetGradeBtn = document.getElementById("resetGradeBtn");
  const btnLoupeToggle = document.getElementById("btnLoupeToggle");

  function renderDarkroomControls() {
    if (!sceneButtonsRow || !lutPillsGrid) return;

    // 1. Scene Switchers
    sceneButtonsRow.innerHTML = "";
    (data.gradingSamples || []).forEach((sample, idx) => {
      const btn = document.createElement("button");
      btn.className = `scene-btn ${idx === activeSampleIndex ? "active" : ""}`;
      btn.innerHTML = `
        <strong>${sample.title}</strong>
        <span>${sample.category}</span>
      `;
      btn.addEventListener("click", () => {
        playCameraShutterSound();
        activeSampleIndex = idx;
        document.querySelectorAll(".scene-btn").forEach((b, i) => b.classList.toggle("active", i === idx));
        updateDarkroomImages();
      });
      sceneButtonsRow.appendChild(btn);
    });

    // 2. LUT Switchers
    lutPillsGrid.innerHTML = "";
    (data.gradingPresets || []).forEach((lut, idx) => {
      const pill = document.createElement("div");
      pill.className = `lut-pill-card ${idx === activePresetIndex ? "active" : ""}`;
      pill.innerHTML = `
        <div class="lut-pill-header">
          <span class="lut-pill-title">${lut.name}</span>
          <span class="lut-pill-badge">${lut.badge}</span>
        </div>
        <p class="lut-pill-desc">${lut.description}</p>
      `;
      pill.addEventListener("click", () => {
        playCameraShutterSound();
        activePresetIndex = idx;
        document.querySelectorAll(".lut-pill-card").forEach((p, i) => p.classList.toggle("active", i === idx));
        applyGradeFilters();
      });
      lutPillsGrid.appendChild(pill);
    });
  }

  function updateDarkroomImages() {
    const currentSample = data.gradingSamples[activeSampleIndex];
    if (!currentSample) return;

    gradedBaseImg.style.backgroundImage = `url('${currentSample.url}')`;
    rawClippedImg.style.backgroundImage = `url('${currentSample.url}')`;
    applyGradeFilters();
  }

  function applyGradeFilters() {
    const preset = data.gradingPresets[activePresetIndex];
    if (!preset) return;

    if (specLutName) specLutName.textContent = preset.name;

    // Calculate Dynamic CSS Filter
    const expValue = 1 + (customExposure / 100);
    const tempValue = customTemp * 0.8;
    const baseFilter = preset.filterCss;

    gradedBaseImg.style.filter = `${baseFilter} brightness(${expValue}) hue-rotate(${tempValue}deg)`;
  }

  // Compare Slider Drag Engine
  if (sliderWidget && sliderDragHandle && rawClippedImg) {
    function moveCompareSlider(clientX) {
      const rect = sliderWidget.getBoundingClientRect();
      let x = clientX - rect.left;
      if (x < 0) x = 0;
      if (x > rect.width) x = rect.width;

      const percentage = (x / rect.width) * 100;
      rawClippedImg.style.width = `${percentage}%`;
      sliderDragHandle.style.left = `${percentage}%`;
    }

    sliderDragHandle.addEventListener("mousedown", (e) => {
      isDraggingCompare = true;
      e.preventDefault();
    });

    window.addEventListener("mouseup", () => {
      isDraggingCompare = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDraggingCompare) return;
      moveCompareSlider(e.clientX);
    });

    // Mobile Touch
    sliderDragHandle.addEventListener("touchstart", () => {
      isDraggingCompare = true;
    });

    window.addEventListener("touchend", () => {
      isDraggingCompare = false;
    });

    window.addEventListener("touchmove", (e) => {
      if (!isDraggingCompare || e.touches.length === 0) return;
      moveCompareSlider(e.touches[0].clientX);
    });

    sliderWidget.addEventListener("click", (e) => {
      if (e.target !== sliderDragHandle && !sliderDragHandle.contains(e.target)) {
        moveCompareSlider(e.clientX);
      }
    });
  }

  // Range Adjusters
  if (rangeExposure && valExposure) {
    rangeExposure.addEventListener("input", (e) => {
      customExposure = parseFloat(e.target.value);
      valExposure.textContent = `${(customExposure / 10).toFixed(1)} EV`;
      applyGradeFilters();
    });
  }

  if (rangeTemperature && valTemperature) {
    rangeTemperature.addEventListener("input", (e) => {
      customTemp = parseFloat(e.target.value);
      const kelvin = 5600 + Math.round(customTemp * 40);
      valTemperature.textContent = `${kelvin}K (${customTemp > 0 ? "Warm" : customTemp < 0 ? "Cool" : "Neutral"})`;
      applyGradeFilters();
    });
  }

  if (rangeGrain && valGrain) {
    rangeGrain.addEventListener("input", (e) => {
      customGrain = parseInt(e.target.value);
      valGrain.textContent = customGrain < 25 ? "Fine 16mm" : customGrain > 60 ? "Heavy Push 35mm" : "Medium 35mm";
    });
  }

  if (resetGradeBtn) {
    resetGradeBtn.addEventListener("click", () => {
      playCameraShutterSound();
      customExposure = 0;
      customTemp = 0;
      customGrain = 40;
      rangeExposure.value = 0;
      rangeTemperature.value = 0;
      rangeGrain.value = 40;
      valExposure.textContent = "0.0 EV";
      valTemperature.textContent = "5600K (Neutral)";
      valGrain.textContent = "Medium 35mm";
      applyGradeFilters();
    });
  }

  // 100% Loupe Zoom Inspector
  let isLoupeActive = false;
  if (btnLoupeToggle && sliderWidget) {
    btnLoupeToggle.addEventListener("click", () => {
      playCameraShutterSound();
      isLoupeActive = !isLoupeActive;
      btnLoupeToggle.classList.toggle("active", isLoupeActive);
      if (isLoupeActive) {
        gradedBaseImg.style.transform = "scale(1.7)";
        rawClippedImg.style.transform = "scale(1.7)";
        btnLoupeToggle.innerHTML = `<i class="fas fa-search-minus"></i> <span>Reset Scale</span>`;
      } else {
        gradedBaseImg.style.transform = "scale(1)";
        rawClippedImg.style.transform = "scale(1)";
        btnLoupeToggle.innerHTML = `<i class="fas fa-search-plus"></i> <span>100% Loupe</span>`;
      }
    });
  }

  /* ==========================================================================
     8. THE GEAR LOCKER & BEHIND THE SCENES RENDERING
     ========================================================================== */
  function renderGearLocker() {
    const gearGrid = document.getElementById("gearGrid");
    if (!gearGrid || !data.gear) return;

    gearGrid.innerHTML = "";
    data.gear.forEach(item => {
      const card = document.createElement("div");
      card.className = "gear-card";
      card.innerHTML = `
        <div class="gear-icon-box"><i class="fas ${item.icon}"></i></div>
        <span class="gear-category">${item.category}</span>
        <h4 class="gear-name">${item.name}</h4>
        <p class="gear-spec">${item.spec}</p>
      `;
      gearGrid.appendChild(card);
    });
  }

  function renderBTS() {
    const btsGrid = document.getElementById("btsGrid");
    if (!btsGrid || !data.bts) return;

    btsGrid.innerHTML = "";
    data.bts.forEach(item => {
      const card = document.createElement("div");
      card.className = "bts-card";
      card.innerHTML = `
        <div class="bts-media-box">
          <img src="${item.url}" alt="${item.title}" loading="lazy">
        </div>
        <div class="bts-info-box">
          <h4 class="bts-card-title">${item.title}</h4>
          <p class="bts-card-desc">${item.description}</p>
        </div>
      `;
      btsGrid.appendChild(card);
    });
  }

  /* ==========================================================================
     9. BIOGRAPHY LANGUAGE TOGGLE & METRIC COUNTERS
     ========================================================================== */
  const btnEng = document.getElementById("btnEng");
  const btnAr = document.getElementById("btnAr");
  const bioEngText = document.getElementById("bioEngText");
  const bioArText = document.getElementById("bioArText");

  if (btnEng && btnAr) {
    btnEng.addEventListener("click", () => {
      btnEng.classList.add("active");
      btnAr.classList.remove("active");
      bioEngText.style.display = "block";
      bioArText.style.display = "none";
      playCameraShutterSound();
    });

    btnAr.addEventListener("click", () => {
      btnAr.classList.add("active");
      btnEng.classList.remove("active");
      bioEngText.style.display = "none";
      bioArText.style.display = "block";
      playCameraShutterSound();
    });
  }

  /* ==========================================================================
     10. FULLSCREEN CINEMA LIGHTBOX MASTERCLASS
     ========================================================================== */
  function openLightbox(index) {
    if (!currentFilteredList || currentFilteredList.length === 0) return;
    currentActiveIndex = index;
    const item = currentFilteredList[index];
    if (!item) return;

    currentZoomLevel = 1;
    lightboxImg.style.transform = "scale(1)";

    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";

    updateLightboxContent(item);
    renderLightboxThumbnails();
  }

  function updateLightboxContent(item) {
    lbCurrentIndex.textContent = currentActiveIndex + 1;
    lbTotalCount.textContent = currentFilteredList.length;

    lbTitle.textContent = item.title;
    lbLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location || "Egypt"}`;
    lbCategoryTag.textContent = (item.category || "DOCUMENTARY").toUpperCase();

    if (item.exif) {
      exifGear.textContent = item.exif.gear || "Canon EOS";
      exifFocal.textContent = item.exif.focal || "50mm";
      exifAperture.textContent = item.exif.aperture || "f/1.8";
      exifShutter.textContent = item.exif.shutter || "1/250s";
      exifIso.textContent = item.exif.iso || "100";
    } else {
      exifGear.textContent = "Full-Frame Cine";
      exifFocal.textContent = "35mm Prime";
      exifAperture.textContent = "f/1.4";
      exifShutter.textContent = "1/200s";
      exifIso.textContent = "400";
    }

    lbStoryText.textContent = item.description || `Captured in ${item.location || "Egypt"}, framing spontaneous human atmosphere and preserving the raw documentary essence.`;

    if (item.isVideo) {
      lightboxImg.style.display = "none";
      lightboxVideo.style.display = "block";
      lightboxVideo.src = item.url;
      lightboxVideo.play().catch(e => {});
    } else {
      lightboxVideo.style.display = "none";
      lightboxVideo.pause();
      lightboxVideo.src = "";
      lightboxImg.style.display = "block";
      lightboxImg.src = item.url;
      lightboxImg.alt = item.title;
    }

    highlightActiveThumbnail();
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    lightboxVideo.pause();
    lightboxVideo.src = "";
    lightboxImg.src = "";
  }

  function navigateLightbox(dir) {
    if (currentFilteredList.length <= 1) return;
    currentActiveIndex += dir;
    if (currentActiveIndex >= currentFilteredList.length) currentActiveIndex = 0;
    if (currentActiveIndex < 0) currentActiveIndex = currentFilteredList.length - 1;

    currentZoomLevel = 1;
    lightboxImg.style.transform = "scale(0.96)";
    lightboxImg.style.opacity = "0.4";

    setTimeout(() => {
      updateLightboxContent(currentFilteredList[currentActiveIndex]);
      lightboxImg.style.transform = "scale(1)";
      lightboxImg.style.opacity = "1";
    }, 150);
  }

  function renderLightboxThumbnails() {
    if (!lbThumbnailsTray) return;
    lbThumbnailsTray.innerHTML = "";

    currentFilteredList.forEach((photo, idx) => {
      const thumb = document.createElement("div");
      thumb.className = `lb-thumb-item ${idx === currentActiveIndex ? "active" : ""}`;
      thumb.innerHTML = `<img src="${photo.url}" alt="${photo.title}">`;
      thumb.addEventListener("click", () => {
        playCameraShutterSound();
        currentActiveIndex = idx;
        updateLightboxContent(currentFilteredList[idx]);
      });
      lbThumbnailsTray.appendChild(thumb);
    });
  }

  function highlightActiveThumbnail() {
    document.querySelectorAll(".lb-thumb-item").forEach((thumb, idx) => {
      thumb.classList.toggle("active", idx === currentActiveIndex);
      if (idx === currentActiveIndex) {
        thumb.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    });
  }

  if (lbCloseBtn) lbCloseBtn.addEventListener("click", closeLightbox);
  if (lbPrevBtn) lbPrevBtn.addEventListener("click", () => navigateLightbox(-1));
  if (lbNextBtn) lbNextBtn.addEventListener("click", () => navigateLightbox(1));

  // Toggle EXIF Drawer
  if (lbExifToggleBtn && lbDetailsPanel) {
    lbExifToggleBtn.addEventListener("click", () => {
      lbDetailsPanel.classList.toggle("hidden");
    });
  }

  // Zoom Controls
  if (lbZoomInBtn) {
    lbZoomInBtn.addEventListener("click", () => {
      currentZoomLevel = Math.min(currentZoomLevel + 0.35, 3);
      lightboxImg.style.transform = `scale(${currentZoomLevel})`;
    });
  }
  if (lbZoomOutBtn) {
    lbZoomOutBtn.addEventListener("click", () => {
      currentZoomLevel = Math.max(currentZoomLevel - 0.35, 1);
      lightboxImg.style.transform = `scale(${currentZoomLevel})`;
    });
  }

  // Fullscreen Toggle
  if (lbFullscreenBtn) {
    lbFullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        lightbox.requestFullscreen().catch(e => {});
      } else {
        document.exitFullscreen().catch(e => {});
      }
    });
  }

  // Keyboard Shortcuts
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });

  /* ==========================================================================
     11. HERO BACKGROUND CAROUSEL
     ========================================================================== */
  function initHeroCarousel() {
    const slides = document.querySelectorAll(".hero-slide");
    if (slides.length <= 1) return;
    let currentSlide = 0;

    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 6500);
  }

  /* ==========================================================================
     12. VIP BOOKING FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById("bookingForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("nameInput").value.trim();
      const email = document.getElementById("emailInput").value.trim();
      const phone = document.getElementById("phoneInput").value.trim();
      const type = document.getElementById("typeInput").value;
      const message = document.getElementById("messageInput").value.trim();

      if (!name || !email || !phone) {
        alert("Please provide your Name, Email, and Phone Number.");
        return;
      }

      playCameraShutterSound();
      const submitBtn = contactForm.querySelector(".form-submit-btn");
      const origContent = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Transmitting Details...</span>`;

      setTimeout(() => {
        submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> <span>Inquiry Received!</span>`;
        submitBtn.style.background = "#10b981";

        alert(`Thank you, ${name}! Zakaria Yahia has received your inquiry for ${type.toUpperCase()} coverage and will reach out shortly.`);
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origContent;
          submitBtn.style.background = "var(--accent-gold)";
        }, 3500);
      }, 1200);
    });
  }

  /* ==========================================================================
     13. GSAP SCROLL & ENTRANCE ANIMATIONS
     ========================================================================== */
  function runGSAPAnimations() {
    if (!window.gsap) return;

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    // Hero Entrance
    gsap.from(".hero-content > *", {
      opacity: 0,
      y: 35,
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.15
    });

    if (ScrollTrigger) {
      // Parallax on Hero Slides
      gsap.to(".hero-bg-carousel", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Section Titles Reveal
      document.querySelectorAll(".reveal-text").forEach(title => {
        gsap.from(title, {
          opacity: 0,
          y: 25,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: title,
            start: "top 88%",
            once: true
          }
        });
      });

      // Award Cards Tilt Stagger
      gsap.from(".award-prestige-card", {
        opacity: 0,
        y: 40,
        duration: 0.85,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".awards-section",
          start: "top 75%",
          once: true
        }
      });

      // Animated Numbers in Stats
      document.querySelectorAll(".stat-number").forEach(stat => {
        const target = parseInt(stat.getAttribute("data-target")) || 0;
        if (target > 0) {
          ScrollTrigger.create({
            trigger: stat,
            start: "top 90%",
            once: true,
            onEnter: () => {
              gsap.from(stat, {
                innerText: 0,
                duration: 1.6,
                snap: { innerText: 1 },
                ease: "power2.out"
              });
            }
          });
        }
      });
    }
  }

  /* ==========================================================================
     14. INITIALIZATION SEQUENCE
     ========================================================================== */
  updateCategoryCounts();
  initFilmstripMarquee();
  renderExpeditions();
  renderGallery();
  renderDarkroomControls();
  updateDarkroomImages();
  renderGearLocker();
  renderBTS();
  initHeroCarousel();

  // Run animations slightly after DOM settlement
  setTimeout(runGSAPAnimations, 300);
});
