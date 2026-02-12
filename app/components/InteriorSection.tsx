"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

/* ─────────────────────────────────────────────
   Types
   ───────────────────────────────────────────── */

interface Slide {
  id: number | string;
  img: string;
}

interface InteriorCarouselProps {
  slides: Slide[];
  autoplayDelay?: number;
  slideWidthVW?: number;
}

/* ─────────────────────────────────────────────
   Component ,  matches legacy landing.css:
     .carousel, .carousel__list__inner, .carousel__list__item,
     .carousel__list__picture-crop, .carousel__list__picture-wrapper
   And cursor from landing.css + 13.js
   ───────────────────────────────────────────── */

const InteriorSection: React.FC<InteriorCarouselProps> = ({
  slides,
  autoplayDelay = 5000,
}) => {
  /* ── Infinite loop: triple the slides ── */
  const looped = useMemo(() => [...slides, ...slides, ...slides], [slides]);
  const total = slides.length;
  const [current, setCurrent] = useState(total);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  /* ── Track ── */
  const trackX = useMotionValue(0);
  const springX = useSpring(trackX, { stiffness: 120, damping: 26, mass: 1 });

  /* ── imageMove parallax offset ── */
  const imgOffsetX = useMotionValue(0);
  const springImgX = useSpring(imgOffsetX, {
    stiffness: 80,
    damping: 22,
    mass: 0.8,
  });

  /* ── Custom cursor ── */
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorSide, setCursorSide] = useState<"left" | "right">("right");
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springCursorX = useSpring(cursorX, { stiffness: 200, damping: 25 });
  const springCursorY = useSpring(cursorY, { stiffness: 200, damping: 25 });

  const containerRef = useRef<HTMLDivElement>(null);
  const slideWidthRef = useRef(0);
  const prevIndexRef = useRef(current);

  /* ── Measure ── */
  const measure = useCallback(() => {
    if (containerRef.current) {
      slideWidthRef.current = containerRef.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* ── Snap track ── */
  useEffect(() => {
    const sw = slideWidthRef.current || window.innerWidth;
    trackX.set(-current * sw);
  }, [current, trackX]);

  /* ── imageMove impulse on slide change ── */
  useEffect(() => {
    const dir = current > prevIndexRef.current ? -1 : 1;
    prevIndexRef.current = current;
    imgOffsetX.set(dir * 10);
    const t = setTimeout(() => imgOffsetX.set(0), 50);
    return () => clearTimeout(t);
  }, [current, imgOffsetX]);

  /* ── Boundary reset for infinite loop ── */
  useEffect(() => {
    if (current >= total * 2) {
      const t = setTimeout(() => {
        const sw = slideWidthRef.current || window.innerWidth;
        const idx = current - total;
        trackX.jump(-idx * sw);
        setCurrent(idx);
      }, 350);
      return () => clearTimeout(t);
    }
    if (current < total) {
      const t = setTimeout(() => {
        const sw = slideWidthRef.current || window.innerWidth;
        const idx = current + total;
        trackX.jump(-idx * sw);
        setCurrent(idx);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [current, total, trackX]);

  /* ── Navigate ── */
  const goTo = useCallback(
    (dir: 1 | -1) => {
      const sw = slideWidthRef.current || window.innerWidth;
      const next = current + dir;
      setCurrent(next);
      animate(trackX, -next * sw, {
        type: "spring",
        stiffness: 120,
        damping: 26,
        mass: 1,
      });
    },
    [current, trackX],
  );
  const next = useCallback(() => goTo(1), [goTo]);
  const prev = useCallback(() => goTo(-1), [goTo]);

  /* ── Autoplay ── */
  useEffect(() => {
    if (isPaused || isDragging) return;
    const id = setInterval(next, autoplayDelay);
    return () => clearInterval(id);
  }, [isPaused, isDragging, next, autoplayDelay]);

  /* ── Cursor tracking ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
      setCursorSide(e.clientX > window.innerWidth / 2 ? "right" : "left");
    },
    [cursorX, cursorY],
  );

  const handleMouseEnter = useCallback(() => {
    setCursorVisible(true);
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorVisible(false);
    setIsPaused(false);
  }, []);

  /* ── Drag + click ── */
  const dragStartX = useRef(0);
  const dragStartTime = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragStartTime.current = Date.now();
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const delta = e.clientX - dragStartX.current;
    const sw = slideWidthRef.current || window.innerWidth;
    const elapsed = Date.now() - dragStartTime.current;

    if (Math.abs(delta) > sw * 0.15) {
      goTo(delta < 0 ? 1 : -1);
    } else if (Math.abs(delta) < 8 && elapsed < 300) {
      if (e.clientX > window.innerWidth / 2) next();
      else prev();
    } else {
      animate(trackX, -current * sw, {
        type: "spring",
        stiffness: 120,
        damping: 26,
      });
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    const sw = slideWidthRef.current || window.innerWidth;
    trackX.set(-current * sw + delta);
  };

  const displayIdx = ((current % total) + total) % total;

  return (
    <section
      id="interiors"
      className="relative overflow-hidden select-none"
      style={{ background: "#0f395c" }}
    >
      <div
        ref={containerRef}
        className="relative w-screen overflow-hidden"
        style={{ height: "100dvh", cursor: "none" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerCancel={() => setIsDragging(false)}
      >
        {/* carousel__list__inner ,  flex row, no gap, no spacing */}
        <motion.div
          style={{
            display: "flex",
            height: "100%",
            x: springX,
            /* legacy: user-select none, touch-action pan-y */
            userSelect: "none",
            WebkitUserSelect: "none",
            touchAction: "pan-y",
            WebkitTouchCallout: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {looped.map((slide, idx) => {
            const isActive = idx === current;
            return (
              /* carousel__list__item ,  exactly 100% of viewport, NO padding, NO margin */
              <div
                key={`${slide.id}-${idx}`}
                style={{
                  position: "relative",
                  flex: "0 0 100%",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* carousel__list__picture-crop ,  clips overflow */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "clip",
                  }}
                >
                  {/* carousel__list__picture-wrapper
                      Legacy landing.css: width: 120%, left: 5% (NOT centered via calc)
                      This is wider than the slide to enable the imageMove parallax effect.
                  */}
                  <motion.div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "-10%",
                      width: "120%",
                      height: "100%",
                      overflow: "clip",
                      x: isActive ? springImgX : 0,
                    }}
                  >
                    {/* img ,  legacy: height 120%, object-position 50% 70% */}
                    <img
                      src={slide.img}
                      alt=""
                      draggable={false}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "120%",
                        marginTop: "-10%",
                        objectFit: "cover",
                        objectPosition: "50% 70%",
                        pointerEvents: "none",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
            willChange: "transform",
            pointerEvents: "none",
            x: springCursorX,
            y: springCursorY,
          }}
          animate={{ opacity: cursorVisible ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Left arrow button */}
          <span
            style={{
              display: cursorSide === "left" ? "inline-flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              /* btn--xl-2.btn--square: 120×120 circle */
              width: 120,
              height: 120,
              borderRadius: "50%",
              /* Our gold gradient */
              background: "linear-gradient(135deg, #eec06b 0%, #ca8c19 100%)",
              /* Dark blue text */
              color: "#0f395c",
              /* cursor__button positioning */
              transform: "translate(-50%, -50%)",
              margin: "-20px 0 0 -10px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path
                d="M18 6L10 15L18 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* Right arrow button */}
          <span
            style={{
              display: cursorSide === "right" ? "inline-flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #eec06b 0%, #ca8c19 100%)",
              color: "#0f395c",
              transform: "translate(-50%, -50%)",
              margin: "-20px 0 0 -10px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path
                d="M12 6L20 15L12 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.div>
      </div>

      {/* ═══════ Counter ═══════ */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem 0",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-gilroy, Gilroy, sans-serif)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(displayIdx + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
};

export default InteriorSection;
