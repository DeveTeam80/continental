"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import BackgroundFlower from "./BackgroundFlower";

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
     CURTAIN (UNCHANGED)
  ========================= */
  const initialClip = "inset(18% 40% 18% 40%)";
  const framedClip = "inset(15% 20% 15% 20%)";

  const scrollClip = useTransform(
    smoothProgress,
    [0, 0.5, 0.85],
    [framedClip, "inset(8% 10% 8% 10%)", "inset(0% 0% 0% 0%)"],
  );

  const containerHeight = useTransform(
    smoothProgress,
    [0, 0.6, 0.85],
    ["55vh", "70vh", "100vh"],
  );

  const containerBottom = useTransform(
    smoothProgress,
    [0, 0.6, 0.85],
    ["-12%", "-6%", "0%"],
  );

  /* =========================
     TYPOGRAPHY — APARTMENTS STYLE
  ========================= */

  // INTRO REVEAL
  const introY = introDone ? 0 : 60;
  const introOpacity = introDone ? 1 : 0;

  // SCROLL TAKEOVER
  const subtitleScrollY = useTransform(
    smoothProgress,
    [0.2, 0.6, 1],
    ["0%", "-120%", "-220%"],
  );

  const titleScrollY = useTransform(
    smoothProgress,
    [0.25, 0.7, 1],
    ["0%", "-60%", "-140%"], // slower than subtitle
  );
const subtitleY = useTransform(smoothProgress, [0, 0.4], ["0%", "-100%"]); const subtitleOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  /* =========================
     BADGE
  ========================= */
  const badgeOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const badgeScale = useTransform(smoothProgress, [0.3, 0.5], [0.85, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
        {/* Background Ornament */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.5], [0.35, 0.1]),
          }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <BackgroundFlower />
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ clipPath: initialClip }}
          animate={{ clipPath: framedClip }}
          transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
          onAnimationComplete={() => setIntroDone(true)}
          style={{
            clipPath: introDone ? scrollClip : undefined,
            height: containerHeight,
            bottom: containerBottom,
          }}
          className="absolute w-full z-10 overflow-hidden"
        >
          <img
            src="/assets/images/horizon/horizon-4.png"
            alt="Horizon"
            className="w-full h-full object-cover"
          />

          {/* Badge */}
          <motion.div
            style={{ opacity: badgeOpacity, scale: badgeScale }}
            className="absolute bottom-16 right-16 z-30"
          >
            <div className="bg-[#ca8c19]/90 px-8 py-3 rounded-full shadow-2xl">
              <span className="text-sm font-bold tracking-[0.12em] uppercase text-[#825541]">
                3D Map
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* =========================
            TYPOGRAPHY LAYER
        ========================= */}
        {/* <div className="relative z-20 h-full w-full pointer-events-none px-12"> */}

        <div className="relative z-20 h-full w-full flex flex-col items-center justify-center px-12 pointer-events-none">
          <motion.div
            style={{ y: subtitleY, opacity: subtitleOpacity }}
            className="absolute top-[22%] text-[14px] tracking-[0.4em] uppercase text-[#0f395c]/70"
          >
            {" "}
            Rooted in Heritage. Rising with Vision.{" "}
          </motion.div>
          {/* Main Title */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              y: introDone ? titleScrollY : introY,
              opacity: introOpacity,
            }}
            className="absolute top-[40%] w-full max-w-[1440px] -translate-x-1/2 flex justify-between"
          >
            <div>
              <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-light tracking-tight text-[#0f395c]">
                HERITAGE
              </h1>
              <h1 className="text-[10vw] md:text-[8vw] mt-10 leading-[0.85] italic font-serif text-[#0f395c]/80">
                MEETS
              </h1>
            </div>

            <h1 className="text-[10vw] md:text-[8vw] leading-[0.85] font-light tracking-tight text-[#ca8c19]">
              HORIZON
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
