import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    let isVisible = false;
    let rafId = null;

    // Stable Magnetic State
    let magneticEl = null;
    let originX = 0;
    let originY = 0;
    let maxRadius = 50;

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    if (!dotEl || !ringEl) return;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dotEl.style.opacity = '1';
        ringEl.style.opacity = '1';
      }

      // 1. Instant 1:1 hardware tracking for center dot
      dotEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // 2. Check for magnetic interactive target
      const target = e.target.closest(
        'button, a, [data-magnetic="true"], .magnetic, [role="button"]'
      );

      if (target) {
        // If switching to a new element or entering for the first time
        if (magneticEl !== target) {
          // Release previous element if exists
          if (magneticEl) {
            magneticEl.style.transform = 'translate3d(0, 0, 0)';
            magneticEl.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          }

          magneticEl = target;
          // Capture FIXED static origin center (Never recalculate while hovering!)
          const rect = target.getBoundingClientRect();
          originX = rect.left + rect.width / 2;
          originY = rect.top + rect.height / 2;
          maxRadius = Math.max(rect.width, rect.height) * 0.9;

          ringEl.classList.add('cursor-ring--hover');
        }

        // Calculate magnetic attraction vector relative to FIXED origin
        const dx = mouseX - originX;
        const dy = mouseY - originY;
        const dist = Math.hypot(dx, dy);

        if (dist <= maxRadius) {
          // Stable magnetic pull (max 14px displacement to ensure comfort & zero jitter)
          const pullStrength = 0.32;
          const pullX = Math.max(-14, Math.min(14, dx * pullStrength));
          const pullY = Math.max(-14, Math.min(14, dy * pullStrength));

          magneticEl.style.transition = 'transform 0.1s ease-out';
          magneticEl.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
        } else {
          // Outside pull radius -> release gracefully
          if (magneticEl) {
            magneticEl.style.transform = 'translate3d(0, 0, 0)';
            magneticEl.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            magneticEl = null;
            ringEl.classList.remove('cursor-ring--hover');
          }
        }
      } else {
        // Left any interactive element -> smooth elastic release
        if (magneticEl) {
          magneticEl.style.transform = 'translate3d(0, 0, 0)';
          magneticEl.style.transition = 'transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
          magneticEl = null;
          ringEl.classList.remove('cursor-ring--hover');
        }
      }
    };

    const handleMouseDown = () => {
      ringEl.classList.add('cursor-ring--click');
      dotEl.classList.add('cursor-dot--click');
    };

    const handleMouseUp = () => {
      ringEl.classList.remove('cursor-ring--click');
      dotEl.classList.remove('cursor-dot--click');
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dotEl.style.opacity = '0';
      ringEl.style.opacity = '0';
      if (magneticEl) {
        magneticEl.style.transform = 'translate3d(0, 0, 0)';
        magneticEl = null;
        ringEl.classList.remove('cursor-ring--hover');
      }
    };

    // Smooth lerp loop for the optical reticle ring
    const renderLoop = () => {
      let targetX = mouseX;
      let targetY = mouseY;

      // When magnetically attached, subtly pull outer ring towards button center
      if (magneticEl) {
        targetX = mouseX + (originX - mouseX) * 0.25;
        targetY = mouseY + (originY - mouseY) * 0.25;
      }

      ringX += (targetX - ringX) * 0.22;
      ringY += (targetY - ringY) * 0.22;

      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      rafId = requestAnimationFrame(renderLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    rafId = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (magneticEl) {
        magneticEl.style.transform = '';
      }
    };
  }, []);

  return (
    <>
      <style>{`
        /* Smooth styling for custom cursor elements */
        .cursor-dot-wrapper, .cursor-ring-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 9999999;
          opacity: 0;
          transition: opacity 0.2s ease;
          will-change: transform;
        }

        .cursor-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #dfb15b;
          box-shadow: 0 0 10px #dfb15b;
          transform: translate(-50%, -50%);
          transition: transform 0.15s ease, background-color 0.2s ease;
        }

        .cursor-dot--click {
          transform: translate(-50%, -50%) scale(0.6);
          background: #38bdf8;
        }

        .cursor-ring {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(223, 177, 91, 0.45);
          box-shadow: 0 0 12px rgba(223, 177, 91, 0.15);
          transform: translate(-50%, -50%);
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.25s ease,
                      background-color 0.25s ease,
                      transform 0.15s ease;
        }

        .cursor-ring--hover .cursor-ring {
          width: 52px;
          height: 52px;
          border-color: rgba(223, 177, 91, 0.85);
          background: rgba(223, 177, 91, 0.08);
          box-shadow: 0 0 25px rgba(223, 177, 91, 0.35);
        }

        .cursor-ring--click .cursor-ring {
          transform: translate(-50%, -50%) scale(0.85);
          border-color: #38bdf8;
        }
      `}</style>

      {/* 1. Precision Center Dot (Instant 1:1 hardware mouse tracking) */}
      <div ref={dotRef} className="cursor-dot-wrapper hidden lg:block">
        <div className="cursor-dot" />
      </div>

      {/* 2. Fluid Optical HUD Ring (Magnetic expansion + suction) */}
      <div ref={ringRef} className="cursor-ring-wrapper hidden lg:block">
        <div className="cursor-ring" />
      </div>
    </>
  );
}
