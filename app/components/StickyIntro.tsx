"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IntroPattern } from "./LogoPattern";

const StickyIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  /* =========================
      CURTAIN / IMAGE ANIMATION
  ========================= */
  // 1. Initial State (Very small, closed curtain)
  const startClip = "inset(25% 45% 25% 45%)"; // RENAMED from initialClip to startClip

  // 2. Intro State (The "Clipped Image" you want on load)
  const introClip = "inset(10% 20% 10% 20%)";

  // 3. Full State (Fully open)
  const fullClip = "inset(0% 0% 0% 0%)";

  const scrollClip = useTransform(
    smoothProgress,
    [0, 0.8],
    [introClip, fullClip]
  );

  const containerHeight = useTransform(
    smoothProgress,
    [0, 0.6, 0.85],
    ["55vh", "70vh", "100vh"]
  );

  // Shift image down (-5%) so there is space above it for the logo
  const containerBottom = useTransform(smoothProgress, [0, 1], ["-5%", "0%"]);

  const imgScale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
  const imgY = useTransform(smoothProgress, [0, 1], ["0%", "0%"]);

  /* =========================
      PATTERN & LOGO ANIMATION
  ========================= */
  const patternY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);
  const patternOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.2]);

  // LOGO ANIMATION
  const logoY = useTransform(smoothProgress, [0, 0.25], ["0%", "-50%"]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const logoScale = useTransform(smoothProgress, [0, 0.25], [1, 0.8]);

  /* =========================
      BADGE
  ========================= */
  const badgeOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const badgeScale = useTransform(smoothProgress, [0.3, 0.5], [0.85, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-secondary">

        {/* 1. SVG PATTERN */}
        <motion.div
          style={{ y: patternY, opacity: patternOpacity }}
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none mix-blend-overlay"
        >
          <div className="w-full h-full opacity-60">
            <IntroPattern />
          </div>
        </motion.div>

        {/* 2. LOGO LAYER */}
        <motion.div
          style={{
            y: logoY,
            opacity: logoOpacity,
            scale: logoScale
          }}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        >
          <div className="mb-32 md:mb-40 relative">
            <img
              src="/assets/images/logo.png"
              alt="Continental Group"
              className="w-50 md:w-50 h-auto object-contain opacity-60"
            />
          </div>
        </motion.div>

        {/* 3. IMAGE LAYER */}
        <motion.div
          initial={{ clipPath: startClip }}
          animate={{ clipPath: introClip }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => setIntroDone(true)}
          style={{
            clipPath: introDone ? scrollClip : undefined,
            height: containerHeight,
            bottom: containerBottom,
            y: imgY,
          }}
          className="absolute w-full z-0 overflow-hidden"
        >
          <motion.img
            style={{ scale: imgScale }}
            src="/assets/images/horizon/horizon-4.png"
            alt="Horizon"
            className="w-full h-full object-cover svg-fix origin-center"
          />

          {/* Badge */}
          <motion.div
            style={{ opacity: badgeOpacity, scale: badgeScale }}
            className="absolute bottom-16 right-16 z-30"
          >
            <div className="bg-gradient-gold px-8 py-3 rounded-full shadow-2xl">
              <span className="text-sm font-bold tracking-[0.12em] uppercase text-secondary">
                3D Map
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* =========================
            4. TYPOGRAPHY LAYER
        ========================= */}
        <div className="absolute inset-0 z-30 flex flex-row items-center justify-between px-6 pt-[15vh] md:px-12 md:py-24 pointer-events-none">

          {/* Left Section */}
          <motion.div
            style={{ y: useTransform(smoothProgress, [0, 1], [0, -100]) }}
            className="flex flex-col items-start"
          >
            <span className="text-[2vh] md:text-[1.5vw] tracking-[0.2em] font-light text-white uppercase ml-1 mb-2">
              Driven By
            </span>
            <h1 className="text-[12vw] leading-none font-serif tracking-tighter text-gradient-gold py-2 pr-2">
              VALUES
            </h1>
          </motion.div>

          {/* Right Section */}
          <motion.div
            style={{ y: useTransform(smoothProgress, [0, 1], [0, -100]) }}
            className="flex flex-col items-end text-right"
          >
            <span className="text-[2vh] md:text-[1.5vw] tracking-[0.2em] font-light text-white uppercase mr-1 mb-2">
              Built On
            </span>
            <h1 className="text-[12vw] leading-none font-serif tracking-tighter text-gradient-gold py-2 pr-2">
              TRUST
            </h1>
          </motion.div>
        </div>

        {/* Editorial Lines */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#825541]/10 -translate-x-1/2 z-10" />
        <div className="absolute left-[30%] top-0 h-full w-px bg-[#825541]/10 z-10" />
        <div className="absolute right-[30%] top-0 h-full w-px bg-[#825541]/10 z-10" />
      </div>
    </div>
  );
};

export default StickyIntro;