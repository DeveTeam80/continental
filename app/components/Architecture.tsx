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
  const titleOpacity = useTransform(smoothProgress, [0, 0.2, 0.35], [0, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.35], [50, -100]);

  const descOpacity = useTransform(smoothProgress, [0.05, 0.25, 0.4], [0, 1, 0]);
  const descY = useTransform(smoothProgress, [0.05, 0.4], [30, -50]);

  /* ───────── Arch Geometry ───────── */
  const archY = useTransform(smoothProgress, [0.2, 0.5, 0.8], ['85vh', '20vh', '0vh']);
  const archWidth = useTransform(smoothProgress, [0.4, 0.8], ['50vw', '100vw']);
  const archHeight = useTransform(smoothProgress, [0.4, 0.8], ['65vh', '100vh']);

  // SAME radius for outer frame AND inner image
  const archRadius = useTransform(
    smoothProgress,
    [0.4, 0.8, 0.9],
    ['1000px 1000px 0 0', '500px 500px 0 0', '0px 0px 0 0']
  );

  /* ───────── Thick White Mat ───────── */
  const archPadding = useTransform(
    smoothProgress,
    [0.35, 0.75],
    ['8rem', '0rem' ]
  );

  /* Image motion */
  const imageScale = useTransform(smoothProgress, [0.35, 1], [1.05, 1]);
  const imageInsideY = useTransform(smoothProgress, [0.35, 1], ['6%', '0%']);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-[450vh] w-full bg-white"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* ───── Intro Text Layer ───── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.div style={{ opacity: titleOpacity, y: titleY }} className="text-center mb-12">
            <h2 className="text-[10vw] font-serif italic text-[#0f395c] leading-none">
              Architecture, <br/>With Intention

            </h2>
            <div className="w-24 h-px bg-[#ca8c19] mx-auto mt-6" />
          </motion.div>
          <motion.div
          // initial={{ opacity: 0, y: 50 }}
          style={{ opacity: descOpacity, y: descY }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 max-w-7xl mx-auto text-center"
        >
          <div className="max-w-full mx-auto text-center px-6">
            <p className="text-3xl leading-relaxed tracking-wide text-[#ca8c19] uppercase">
               At Continental Group, architecture is designed with purpose, not performance. Conceived by Hafeez Contractor, every proportion, elevation, and line is composed to convey permanence, balance, and quiet confidence. The design doesn’t seek attention, it earns it, through restraint, dignity, and timeless presence.
            </p>
          </div>
        </motion.div>
        </div>

        {/* ───── Expanding Semi-Circle Frame ───── */}
        <motion.div
          style={{
            y: archY,
            width: archWidth,
            height: archHeight,
            borderRadius: archRadius,
            padding: archPadding,
          }}
          className="
            absolute z-10 bg-white origin-bottom box-border
            shadow-[0_-40px_80px_rgba(0,0,0,0.18)]
          "
        >
          {/* INNER IMAGE — SAME SEMI-CIRCLE */}
          <motion.div
            style={{
              scale: imageScale,
              y: imageInsideY,
              borderRadius: archRadius, // 👈 CRITICAL FIX
            }}
            className="w-full h-full overflow-hidden relative"
          >
            <img
              src="/assets/images/horizon/horizon-8.png"
              alt="Art Deco Architecture"
              className="w-full h-full object-cover"
            />

            {/* Optional subtle architectural grid */}
            {/* <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute left-1/4 h-full w-px bg-black" />
              <div className="absolute left-1/2 h-full w-px bg-black" />
              <div className="absolute left-3/4 h-full w-px bg-black" />
            </div> */}
          </motion.div>
        </motion.div>

        {/* ───── Structural Grid (Very Subtle) ───── */}
        {/* <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]">
          <div className="w-full h-full grid grid-cols-12 grid-rows-6">
            {Array.from({ length: 72 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-black" />
            ))}
          </div>
        </div> */}

      </div>
    </motion.div>
  );
};

export default ArchitectureSection;
