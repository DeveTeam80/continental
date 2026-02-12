import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ArchitectureSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.001,
  });

  /* ───────── Intro Text ───────── */
  const titleOpacity = useTransform(smoothProgress, [0, 0.15, 0.3], [0, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.3], [50, -80]);

  const descOpacity = useTransform(smoothProgress, [0.05, 0.2, 0.35], [0, 1, 0]);
  const descY = useTransform(smoothProgress, [0.05, 0.35], [30, -50]);

  /* ───────── Full bg overlay ,  hides image until arch opens ───────── */
  // Stays solid from 0→0.25, then fades as arch expands 0.25→0.55
  const bgOverlayOpacity = useTransform(smoothProgress, [0, 0.25, 0.55], [1, 1, 0]);

  /* ───────── Window ───────── */
  const windowWidth = useTransform(smoothProgress, [0.3, 0.75], ['35vw', '100vw']);
  const windowHeight = useTransform(smoothProgress, [0.3, 0.75], ['50.75vh', '100vh']);
  const windowRadius = useTransform(
    smoothProgress,
    [0.3, 0.72, 0.85],
    ['9000px 9000px 0 0', '500px 500px 0 0', '0px 0px 0 0']
  );
  const windowY = useTransform(smoothProgress, [0.1, 0.45], ['55vh', '0vh']);

  /* ───────── Image ───────── */
  const imageScale = useTransform(smoothProgress, [0.3, 1], [1.15, 1]);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[450vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── z-0: Full-bleed image ── */}
        <motion.div
          style={{ scale: imageScale }}
          className="absolute inset-0 w-full h-full origin-center z-0"
        >
          <img
            src="/assets/images/horizon/horizon-8.png"
            alt="Art Deco Architecture"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* ── z-10: Solid bg overlay ,  gives text a clean backdrop,
            fades away as the arch window expands ── */}
        <motion.div
          style={{ opacity: bgOverlayOpacity }}
          className="absolute inset-0 w-full h-full z-10 bg-secondary"
        />

        {/* ── z-40: Intro text (Above mask) ── */}
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="text-center mb-12"
          >
            <h2 className="text-[8vw] font-serif leading-none text-gradient-gold">
              Not Slogans. <br />Real Differentiators.
            </h2>
            <div className="w-24 h-px bg-gradient-gold mx-auto mt-6" />
          </motion.div>

          <motion.div
            style={{ opacity: descOpacity, y: descY }}
            className="mt-6 max-w-7xl mx-auto text-center"
          >
            <p className="text-3xl leading-relaxed tracking-wide text-white/90 uppercase">
              Self-owned land parcels. Proven delivery track record. Premium Mivan
              construction technology. Low-density planning. We don't chase scale.
              We protect reputation.
            </p>
          </motion.div>
        </div>

        {/* ── z-30: Arch window with box-shadow mat ──
            Shadow color matches bg-secondary exactly so the 
            transition from overlay fade → shadow mat is seamless ── */}
        <motion.div
          style={{
            width: windowWidth,
            height: windowHeight,
            borderRadius: windowRadius,
            y: windowY,
            // MUST match --color-secondary: #0f395c
            boxShadow: '0 0 0 2000px #0f395c',
          }}
          className="absolute z-30 left-1/2 -translate-x-1/2 bottom-0 overflow-visible"
        />

      </div>
    </motion.div>
  );
};

export default ArchitectureSection;
