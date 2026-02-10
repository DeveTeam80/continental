"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, Variants } from "framer-motion";
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
  const startClip = "inset(25% 45% 25% 45%)";
  const introClip = "inset(10% 20% 10% 20%)";
  const fullClip = "inset(0% 0% 0% 0%)";

  const scrollClip = useTransform(smoothProgress, [0, 0.8], [introClip, fullClip]);
  const containerHeight = useTransform(smoothProgress, [0, 0.6, 0.85], ["55vh", "70vh", "100vh"]);
  const containerBottom = useTransform(smoothProgress, [0, 1], ["-5%", "0%"]);
  const imgScale = useTransform(smoothProgress, [0, 1], [0.85, 1]);
  const imgY = useTransform(smoothProgress, [0, 1], ["0%", "0%"]);

  /* =========================
      PATTERN & LOGO ANIMATION
  ========================= */
  const patternY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);
  const patternOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.2]);

  // Scroll Transforms for Logo
  const logoY = useTransform(smoothProgress, [0, 0.25], ["0%", "-50%"]);
  const logoOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const logoScale = useTransform(smoothProgress, [0, 0.25], [1, 0.8]);

  /* =========================
      LOGO REVEAL VARIANT (Inside-Out)
  ========================= */
  const revealVariant: Variants = {
    hidden: {
      clipPath: "circle(0% at 50% 50%)", // Starts as a tiny dot in center
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      clipPath: "circle(150% at 50% 50%)", // Expands circle outward
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1], // Smooth easing
        delay: 0.2
      }
    }
  };

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

        {/* 2. LOGO LAYER (UPDATED ANIMATION) */}
        <motion.div
          style={{
            y: logoY,
            opacity: logoOpacity,
            scale: logoScale
          }}
          className="absolute inset-0  flex items-center justify-center pointer-events-none"
        >
          {/* Kept your exact positioning classes */}
          <div className="mt-17 relative opacity-30">
            <motion.img
              initial="hidden"
              animate="visible"
              variants={revealVariant} // Applies the clip-path animation
              src="/assets/images/logo.png"
              alt="Continental Group"
              className="w-24 md:w-80 h-auto object-contain" // Kept your exact logo classes
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

        {/* 4. TYPOGRAPHY LAYER */}
        <div className="absolute inset-0 z-30 flex flex-row items-center justify-between px-6 pt-[15vh] md:px-12 md:py-24 pointer-events-none">
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