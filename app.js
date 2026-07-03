/* ==========================================================================
   APP INITIALIZATION & INTERACTIVITY - ZAKARIA YAHIA PORTFOLIO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Check if PORTFOLIO_DATA exists, otherwise fallback
  const data = window.PORTFOLIO_DATA || { photos: [], videos: [], bts: [], photographer: {} };
  
  // State variables
  let currentFilteredList = [];
  let currentActiveIndex = 0;
  let activeCategory = "all";
  let activeGovernorate = "all";
  let galleryAnimatedOnScroll = false; // Tracks if initial gallery scroll reveal has run

  // Cache DOM elements
  const navbar = document.querySelector(".header-navbar");
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const heroContent = document.querySelector(".hero-content");
  const galleryGrid = document.getElementById("galleryGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const subFilterWrapper = document.getElementById("subFilterWrapper");
  const subFilterBtns = document.querySelectorAll(".sub-filter-btn");
  const btsGrid = document.getElementById("btsGrid");
  const mouseSpotlight = document.getElementById("mouseSpotlight");
  
  // Lightbox DOM Elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector(".lightbox-img");
  const lightboxVideo = lightbox.querySelector(".lightbox-video");
  const lightboxClose = lightbox.querySelector(".lightbox-close-btn");
  const lightboxPrev = lightbox.querySelector(".prev-btn");
  const lightboxNext = lightbox.querySelector(".next-btn");
  const lightboxTitle = lightbox.querySelector(".lightbox-title");
  const lightboxLoc = lightbox.querySelector(".lightbox-location");

  /* ==========================================================================
     NAVBAR & SCROLL PROGRESS EFFECTS
     ========================================================================== */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update reading progress bar at the very top of the page
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      const bar = document.getElementById("scrollProgressBar");
      if (bar) bar.style.width = `${progress}%`;
    }
  });

  // Mobile Menu Toggle with GSAP stagger animation
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      const isActive = navLinks.classList.contains("active");
      
      icon.className = isActive ? "fas fa-times" : "fas fa-bars";
      
      if (isActive && window.gsap) {
        // Stagger link items slide-in on mobile
        window.gsap.fromTo(".nav-links .nav-item, .nav-links .nav-booking-btn", 
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", overwrite: "auto" }
        );
      }
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll(".nav-item, .nav-booking-btn").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = mobileToggle?.querySelector("i");
      if (icon) icon.className = "fas fa-bars";
    });
  });

  /* ==========================================================================
     MOUSE/TOUCH SPOTLIGHT & 3D BOKEH PARALLAX
     ========================================================================== */
  if (window.gsap) {
    if (mouseSpotlight) {
      window.gsap.set(mouseSpotlight, { xPercent: -50, yPercent: -50 });
    }
    
    // Mouse movement track
    window.addEventListener("mousemove", (e) => {
      if (mouseSpotlight) {
        window.gsap.to(mouseSpotlight, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power2.out"
        });
      }

      // Parallax Bokeh depth elements calculations
      const xOffset = (e.clientX - window.innerWidth / 2) / 35;
      const yOffset = (e.clientY - window.innerHeight / 2) / 35;

      window.gsap.to(".bokeh-1", { x: xOffset * 1.5, y: yOffset * 1.5, duration: 1.2, ease: "power2.out" });
      window.gsap.to(".bokeh-2", { x: -xOffset * 1.2, y: -yOffset * 1.2, duration: 1.2, ease: "power2.out" });
      window.gsap.to(".bokeh-3", { x: xOffset * 0.8, y: -yOffset * 0.8, duration: 1.2, ease: "power2.out" });
    });

    // Touch screen track for mobile support
    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        if (mouseSpotlight) {
          window.gsap.to(mouseSpotlight, {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
            duration: 0.6,
            ease: "power2.out"
          });
        }

        const xOffset = (e.touches[0].clientX - window.innerWidth / 2) / 35;
        const yOffset = (e.touches[0].clientY - window.innerHeight / 2) / 35;

        window.gsap.to(".bokeh-1", { x: xOffset * 1.5, y: yOffset * 1.5, duration: 1.2, ease: "power2.out" });
        window.gsap.to(".bokeh-2", { x: -xOffset * 1.2, y: -yOffset * 1.2, duration: 1.2, ease: "power2.out" });
        window.gsap.to(".bokeh-3", { x: xOffset * 0.8, y: -yOffset * 0.8, duration: 1.2, ease: "power2.out" });
      }
    });
  }

  /* ==========================================================================
     LANGUAGE TOGGLE (BIOGRAPHY)
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
    });

    btnAr.addEventListener("click", () => {
      btnAr.classList.add("active");
      btnEng.classList.remove("active");
      bioEngText.style.display = "none";
      bioArText.style.display = "block";
    });
  }

  /* ==========================================================================
     DYNAMIC GALLERY RENDERING & FILTERING
     ========================================================================== */
  
  // Generate random grid classes to make the layout feel like a dynamic collage
  function getGridSpanClass(index, category) {
    if (category === "portrait") {
      return "span-h2"; // Portraits are tall
    }
    if (category === "architecture" && index % 3 === 0) {
      return "span-w2"; // Some wide architectures
    }
    if (index % 5 === 0) {
      return "span-large"; // Large showcase card
    }
    if (index % 4 === 1) {
      return "span-h2"; // Staggered heights
    }
    return "";
  }

  // Build list and append to DOM
  function renderGallery() {
    galleryGrid.innerHTML = "";
    
    // Clear elements
    currentFilteredList = [];

    // Filter logic
    if (activeCategory === "all") {
      currentFilteredList = [...data.photos];
    } else if (activeCategory === "travel") {
      // Travel has governorates sub-filter
      currentFilteredList = data.photos.filter(photo => {
        if (photo.category !== "travel") return false;
        if (activeGovernorate === "all") return true;
        return photo.governorate === activeGovernorate;
      });
    } else if (activeCategory === "videographics") {
      // Load cinematic stock clips
      currentFilteredList = data.videos.map(video => ({
        ...video,
        category: "video",
        isVideo: true
      }));
    } else {
      currentFilteredList = data.photos.filter(photo => photo.category === activeCategory);
    }

    if (currentFilteredList.length === 0) {
      galleryGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No assets found in this category.</div>`;
      return;
    }

    currentFilteredList.forEach((item, index) => {
      const card = document.createElement("div");
      const spanClass = getGridSpanClass(index, activeCategory);
      card.className = `photo-card ${spanClass}`;
      card.setAttribute("data-index", index);

      let cardHTML = "";
      if (item.isVideo) {
        // Video card layout
        cardHTML = `
          <div class="photo-inner">
            <video class="photo-img" src="${item.url}" loop muted playsinline poster=""></video>
            <div class="video-badge">
              <i class="fas fa-play"></i>
            </div>
            <div class="photo-overlay">
              <div class="photo-meta-header">
                <h4 class="photo-title">${item.title}</h4>
                <span class="photo-location">${item.duration}</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.3;">${item.description}</p>
            </div>
          </div>
        `;
      } else {
        // Standard Photo card layout
        cardHTML = `
          <div class="photo-inner">
            <img class="photo-img" src="${item.url}" alt="${item.title}" loading="lazy">
            <div class="photo-overlay">
              <div class="photo-meta-header">
                <h4 class="photo-title">${item.title}</h4>
                <span class="photo-location">${item.location}</span>
              </div>
            </div>
          </div>
        `;
      }

      card.innerHTML = cardHTML;
      galleryGrid.appendChild(card);

      // Event listener for opening lightbox
      card.addEventListener("click", () => {
        openLightbox(index);
      });

      // Hook up 3D tilt effect on card
      setupTiltEffect(card);

      // Hook up video hover play/pause
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

    // Run active filter transition immediately if the scroll reveal has already happened
    if (galleryAnimatedOnScroll && window.gsap) {
      window.gsap.fromTo(".photo-card",
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.015,
          ease: "power2.out",
          overwrite: "auto"
        }
      );
    } else if (window.gsap && window.ScrollTrigger) {
      // Set up individual self-trigger ScrollTriggers for photo cards (immune to layout shifts)
      document.querySelectorAll("#galleryGrid .photo-card").forEach(card => {
        window.gsap.set(card, { opacity: 0, y: 30 });
        window.ScrollTrigger.create({
          trigger: card,
          start: "top 95%",
          once: true,
          onEnter: () => {
            window.gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              onComplete: () => {
                galleryAnimatedOnScroll = true; // Mark scroll animation complete
              }
            });
          }
        });
      });
    }
  }

  // Hook up filter category button click handlers
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const newCategory = btn.getAttribute("data-category");
      activeCategory = newCategory;

      // Handle sub-navigation show/hide for Travel
      if (activeCategory === "travel") {
        subFilterWrapper.classList.add("active");
      } else {
        subFilterWrapper.classList.remove("active");
        activeGovernorate = "all";
        subFilterBtns.forEach(b => b.classList.remove("active"));
        const defaultSubBtn = document.querySelector('.sub-filter-btn[data-gov="all"]');
        if (defaultSubBtn) defaultSubBtn.classList.add("active");
      }

      // Animate out, then re-render
      if (window.gsap) {
        window.gsap.to(".photo-card", {
          opacity: 0,
          scale: 0.98,
          y: -8,
          duration: 0.15,
          stagger: 0.008,
          onComplete: () => {
            renderGallery();
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          }
        });
      } else {
        renderGallery();
      }
    });
  });

  // Hook up governorate sub-filter button click handlers
  subFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      subFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeGovernorate = btn.getAttribute("data-gov");

      if (window.gsap) {
        window.gsap.to(".photo-card", {
          opacity: 0,
          scale: 0.98,
          y: -8,
          duration: 0.15,
          stagger: 0.008,
          onComplete: () => {
            renderGallery();
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          }
        });
      } else {
        renderGallery();
      }
    });
  });

  /* ==========================================================================
     3D TILT MOUSE INTERACTION WITH REFLECTION SHEEN
     ========================================================================== */
  function setupTiltEffect(card) {
    const inner = card.querySelector(".photo-inner");
    if (!inner) return;

    // Create sheen overlay element if not already present
    let sheen = inner.querySelector(".card-sheen");
    if (!sheen) {
      sheen = document.createElement("div");
      sheen.className = "card-sheen";
      inner.appendChild(sheen);
    }

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate tilt angles (max tilt 15 degrees)
      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = -((y - centerY) / centerY) * 15;

      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

      // Dynamic sheen gradient sweep
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      sheen.style.background = `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`;
    });

    card.addEventListener("mouseleave", () => {
      inner.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      sheen.style.background = "none";
    });
  }

  // Setup tilt for the portrait image in About section
  const aboutPortrait = document.querySelector(".portrait-glow-frame");
  if (aboutPortrait) {
    setupTiltEffect(aboutPortrait);
  }

  /* ==========================================================================
     INTERACTIVE BEFORE/AFTER SLIDER (COLOR GRADING)
     ========================================================================== */
  const sliderWidget = document.getElementById("sliderWidget");
  if (sliderWidget) {
    const rawImageOverlay = sliderWidget.querySelector(".slider-img.raw");
    const dragHandle = sliderWidget.querySelector(".slider-drag-handle");
    let isDragging = false;

    // Core slide movement calculation
    function moveSlider(clientX) {
      const rect = sliderWidget.getBoundingClientRect();
      let positionX = clientX - rect.left;
      
      // Keep boundaries inside widget
      if (positionX < 0) positionX = 0;
      if (positionX > rect.width) positionX = rect.width;
      
      // Calculate percentage
      const percentage = (positionX / rect.width) * 100;
      
      // Update clip-path and handle positioning
      rawImageOverlay.style.width = `${percentage}%`;
      dragHandle.style.left = `${percentage}%`;
    }

    // Mouse Listeners
    dragHandle.addEventListener("mousedown", (e) => {
      isDragging = true;
      dragHandle.style.transition = "none";
      rawImageOverlay.style.transition = "none";
      e.preventDefault();
    });

    window.addEventListener("mouseup", () => {
      isDragging = false;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    // Touch Listeners (Mobile support)
    dragHandle.addEventListener("touchstart", (e) => {
      isDragging = true;
      dragHandle.style.transition = "none";
      rawImageOverlay.style.transition = "none";
    });

    window.addEventListener("touchend", () => {
      isDragging = false;
    });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        moveSlider(e.touches[0].clientX);
      }
    });

    // Direct Click on Widget to slide to position
    sliderWidget.addEventListener("click", (e) => {
      if (e.target !== dragHandle) {
        dragHandle.style.transition = "left 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        rawImageOverlay.style.transition = "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
        moveSlider(e.clientX);
      }
    });
  }

  /* ==========================================================================
     LIGHTBOX SYSTEM
     ========================================================================== */
  function openLightbox(index) {
    currentActiveIndex = index;
    const item = currentFilteredList[index];
    if (!item) return;

    // Show Lightbox modal
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden"; // Stop page scroll
    
    updateLightboxContent(item);
  }

  function updateLightboxContent(item) {
    // Check if media is video or image
    if (item.isVideo) {
      lightboxImg.style.display = "none";
      lightboxVideo.style.display = "block";
      lightboxVideo.src = item.url;
      lightboxVideo.play().catch(e => {});
      
      // Update details
      lightboxTitle.textContent = item.title;
      lightboxLoc.textContent = "Duration: " + item.duration;
    } else {
      lightboxVideo.style.display = "none";
      lightboxVideo.pause();
      lightboxVideo.src = "";
      
      lightboxImg.style.display = "block";
      lightboxImg.src = item.url;
      lightboxImg.alt = item.title;

      // Update details
      lightboxTitle.textContent = item.title;
      lightboxLoc.textContent = item.location;
    }
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = ""; // Re-enable page scroll
    lightboxVideo.pause();
    lightboxVideo.src = "";
    lightboxImg.src = "";
  }

  function navigateLightbox(direction) {
    if (currentFilteredList.length <= 1) return;
    
    currentActiveIndex += direction;
    
    // Boundary wrapping
    if (currentActiveIndex >= currentFilteredList.length) {
      currentActiveIndex = 0;
    } else if (currentActiveIndex < 0) {
      currentActiveIndex = currentFilteredList.length - 1;
    }

    const nextItem = currentFilteredList[currentActiveIndex];
    
    // Zoom scale-out effect during transit
    lightboxImg.style.transform = "scale(0.95)";
    lightboxImg.style.opacity = "0.5";
    
    setTimeout(() => {
      updateLightboxContent(nextItem);
      lightboxImg.style.transform = "scale(1)";
      lightboxImg.style.opacity = "1";
    }, 200);
  }

  // Lightbox event hooks
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => navigateLightbox(1));
  
  // Close on outside click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-content") || e.target.classList.contains("lightbox-media-wrapper")) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });

  /* ==========================================================================
     BEHIND THE SCENES DYNAMIC GENERATION
     ========================================================================== */
  function renderBTS() {
    if (!btsGrid) return;
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

    // Set up individual self-trigger ScrollTriggers for BTS cards
    if (window.gsap && window.ScrollTrigger) {
      document.querySelectorAll(".bts-card").forEach(card => {
        window.gsap.set(card, { opacity: 0, y: 30 });
        window.ScrollTrigger.create({
          trigger: card,
          start: "top 95%",
          once: true,
          onEnter: () => {
            window.gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out"
            });
          }
        });
      });
    }
  }

  /* ==========================================================================
     GSAP ONLOAD & SCROLL ANIMATIONS
     ========================================================================== */
  function runPageAnimations() {
    if (!window.gsap) {
      // If GSAP fails to load, display contents directly
      if (heroContent) {
        heroContent.style.opacity = "1";
        heroContent.style.transform = "none";
      }
      document.querySelectorAll(".timeline-item, .stat-card, .bts-card, .portrait-glow-frame, .contact-channel-item, .contact-form-card").forEach(item => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      return;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    // 0. Dynamic Typography Splitting for reveal-text headings
    document.querySelectorAll(".reveal-text").forEach(el => {
      const text = el.textContent.trim();
      const words = text.split(/\s+/);
      el.innerHTML = words.map(word => {
        return `<span class="word-wrapper"><span class="word-inner">${word}</span></span>`;
      }).join(" ");
    });

    // 1. Hero Content Entrance (Animate children to decouple ScrollTrigger)
    const heroElements = heroContent.querySelectorAll(".hero-tag, .hero-title, .hero-subtitle, .hero-cta-btn");
    gsap.set(heroContent, { opacity: 1, y: 0, scale: 1 }); // Ensure container is visible
    
    const heroTl = gsap.timeline();
    heroTl.fromTo(heroElements, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.0, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );

    // 2. Parallax Scroll Effect for Hero slides & container
    if (ScrollTrigger) {
      gsap.to(".hero-bg-carousel", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Decoupled Scroll Parallax: fade-out hero content cleanly
      gsap.fromTo(heroContent, 
        { opacity: 1, yPercent: 0 },
        {
          opacity: 0,
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom 25%",
            scrub: true,
            immediateRender: false
          }
        }
      );
    }

    // 3. Section Headers Reveal (Premium staggered split-text typography entrances)
    const fadeSections = document.querySelectorAll("section:not(.hero-section)");
    fadeSections.forEach(section => {
      const header = section.querySelector(".section-header");
      if (!header) return;

      if (ScrollTrigger) {
        const subtitle = header.querySelector(".section-subtitle");
        const titleWords = header.querySelectorAll(".word-inner");
        
        // Hide subtitle and words initially
        gsap.set(subtitle, { opacity: 0, y: 15 });
        gsap.set(titleWords, { y: "105%" });

        ScrollTrigger.create({
          trigger: header,
          start: "top 90%",
          once: true,
          onEnter: () => {
            // Fade-up subtitle
            gsap.to(subtitle, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            // Slide-up words with staggered delay
            gsap.to(titleWords, {
              y: "0%",
              duration: 0.75,
              stagger: 0.04,
              ease: "power3.out",
              delay: 0.1
            });
          }
        });
      }
    });

    // 4. About Me Section Elements (Self-triggering to prevent height shift locks)
    if (document.querySelector(".about-grid") && ScrollTrigger) {
      // Portrait Image
      const portrait = document.querySelector(".portrait-glow-frame");
      if (portrait) {
        gsap.set(portrait, { opacity: 0, scale: 0.94 });
        ScrollTrigger.create({
          trigger: portrait,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.to(portrait, { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" });
          }
        });
      }

      // About Text
      const aboutText = document.querySelectorAll(".about-intro-txt, .about-bio");
      aboutText.forEach(el => {
        gsap.set(el, { opacity: 0, x: -20 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" });
          }
        });
      });

      // Stats Cards
      document.querySelectorAll(".stat-card").forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 20, scale: 0.9 });
        ScrollTrigger.create({
          trigger: card,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.3)", delay: index * 0.05 });
          }
        });
      });
    }

    // 5. Awards Timeline Scroll Draw & Items Reveal
    const timeline = document.querySelector(".awards-timeline");
    if (timeline && ScrollTrigger) {
      // Inject progress line div dynamically if not already present
      let progressLine = timeline.querySelector(".timeline-progress-line");
      if (!progressLine) {
        progressLine = document.createElement("div");
        progressLine.className = "timeline-progress-line";
        timeline.appendChild(progressLine);
      }

      gsap.fromTo(progressLine, 
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: timeline,
            start: "top 80%",
            end: "bottom 70%",
            scrub: true
          }
        }
      );
    }

    document.querySelectorAll(".timeline-item").forEach(item => {
      if (ScrollTrigger) {
        gsap.set(item, { opacity: 0, x: -20 });
        ScrollTrigger.create({
          trigger: item,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(item, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" });
          }
        });
      }
    });

    // 6. Contact Channels & Booking Form Reveal (Self-triggering)
    if (document.querySelector(".contact-section") && ScrollTrigger) {
      document.querySelectorAll(".contact-channel-item").forEach((item, index) => {
        gsap.set(item, { opacity: 0, x: -20 });
        ScrollTrigger.create({
          trigger: item,
          start: "top 95%",
          once: true,
          onEnter: () => {
            gsap.to(item, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: index * 0.05 });
          }
        });
      });

      const formCard = document.querySelector(".contact-form-card");
      if (formCard) {
        gsap.set(formCard, { opacity: 0, x: 20 });
        ScrollTrigger.create({
          trigger: formCard,
          start: "top 92%",
          once: true,
          onEnter: () => {
            gsap.to(formCard, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" });
          }
        });
      }
    }

    // 8. Slider Widget Auto-Peek Hint Animation
    const slider = document.getElementById("sliderWidget");
    if (slider && ScrollTrigger) {
      const rawImageOverlay = slider.querySelector(".slider-img.raw");
      const dragHandle = slider.querySelector(".slider-drag-handle");
      
      if (rawImageOverlay && dragHandle) {
        // Create an auto-peek timeline that only plays once when the section enters view
        const peekTl = gsap.timeline({
          scrollTrigger: {
            trigger: slider,
            start: "top 80%",
            once: true
          }
        });

        // Add visual cue transition classes
        dragHandle.style.transition = "none";
        rawImageOverlay.style.transition = "none";

        peekTl.to(rawImageOverlay, { width: "35%", duration: 0.7, ease: "power2.inOut" })
              .to(dragHandle, { left: "35%", duration: 0.7, ease: "power2.inOut" }, "<")
              .to(rawImageOverlay, { width: "65%", duration: 0.9, ease: "power2.inOut" })
              .to(dragHandle, { left: "65%", duration: 0.9, ease: "power2.inOut" }, "<")
              .to(rawImageOverlay, { width: "50%", duration: 0.7, ease: "power2.out" })
              .to(dragHandle, { left: "50%", duration: 0.7, ease: "power2.out" }, "<");
      }
    }

    // 9. DYNAMIC SCROLLSPY (Highlighting active section link in navigation header)
    if (ScrollTrigger) {
      const sections = ["about", "awards", "gallery", "grading", "bts", "contact"];
      
      // Home section tracker
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top 15%",
        end: "bottom 15%",
        onToggle: self => {
          if (self.isActive) {
            updateActiveMenuLink("");
          }
        }
      });

      // Other sections tracker
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top 35%",
          end: "bottom 35%",
          onToggle: self => {
            if (self.isActive) {
              updateActiveMenuLink(id);
            }
          }
        });
      });
    }

    function updateActiveMenuLink(activeId) {
      document.querySelectorAll(".nav-links .nav-item").forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (activeId === "" && href === "#") {
          link.classList.add("active");
        } else if (href === `#${activeId}`) {
          link.classList.add("active");
        }
      });
    }
  }

  /* ==========================================================================
     HERO BACKGROUND CAROUSEL
     ========================================================================== */
  function initHeroCarousel() {
    const slides = document.querySelectorAll(".hero-slide");
    if (slides.length <= 1) return;

    let currentSlide = 0;

    setInterval(() => {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }, 6000); // Transitions every 6 seconds
  }

  /* ==========================================================================
     CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById("bookingForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = document.getElementById("nameInput").value.trim();
      const email = document.getElementById("emailInput").value.trim();
      const phone = document.getElementById("phoneInput").value.trim();
      const message = document.getElementById("messageInput").value.trim();

      if (!name || !email || !phone) {
        alert("Please fill in all required fields (Name, Email, Phone).");
        return;
      }

      // Simple success visual feedback
      const submitBtn = contactForm.querySelector(".form-submit-btn");
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending details...";
      submitBtn.style.background = "var(--text-muted)";

      setTimeout(() => {
        submitBtn.textContent = "Details Sent Successfully!";
        submitBtn.style.background = "#2ec4b6"; // Green success shade
        submitBtn.style.color = "#fff";
        contactForm.reset();

        // Reveal thank you alert
        alert(`Thank you ${name}! Zakaria has received your booking inquiry and will contact you shortly.`);

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.background = "var(--accent-gold)";
          submitBtn.style.color = "var(--bg-primary)";
        }, 3000);
      }, 1500);
    });
  }

  /* ==========================================================================
     EXECUTE LAYOUT GENERATION
     ========================================================================== */
  renderGallery();
  renderBTS();
  initHeroCarousel();
  
  // Wait slightly to trigger entrance animations so resources are set up
  setTimeout(runPageAnimations, 400);

  // Refresh ScrollTrigger positions after all images are completely loaded (resolves layout shifts)
  if (document.readyState === "complete") {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  } else {
    window.addEventListener("load", () => {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  }
});
