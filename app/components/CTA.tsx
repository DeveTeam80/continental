import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const NewEraSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
  });

  /* Subtle parallax */
  const imgY = useTransform(smoothScroll, [0, 1], ["0%", "-12%"]);

  const textOpacity = useTransform(smoothScroll, [0.15, 0.35], [0, 1]);
  const textY = useTransform(smoothScroll, [0.15, 0.35], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================= */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 h-[150%] z-0"
      >
        <img
          src="assets/images/horizon/horizon-4.png"
          alt="Architecture"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* =========================
          SOFT WHITE OVERLAY
      ========================= */}
      {/* <div className="absolute inset-0 z-10 bg-white/60" /> */}

      {/* =========================
          CONTENT
      ========================= */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 text-center">

        {/* Eyebrow */}
        <motion.p
          style={{ opacity: textOpacity, y: textY }}
          className="text-[#0f395c] text-md tracking-[0.4em] uppercase mb-8"
        >
          A way of living, thoughtfully elevated
        </motion.p>

        <motion.h2
          style={{ opacity: textOpacity, y: textY }}
          className="max-w-5xl text-white text-4xl md:text-6xl font-light leading-tight mb-24"
        >
          A new chapter shaped by trust, <br />
          crafted for the way you live.
        </motion.h2>

        {/* =========================
            CTA BUTTON
        ========================= */}
        <motion.button
          style={{
            opacity: useTransform(smoothScroll, [0.3, 0.5], [0, 1]),
            scale: useTransform(smoothScroll, [0.3, 0.5], [0.9, 1]),
          }}
          className="
            relative
            w-40 h-40
            rounded-full
            bg-[#ca8c19]
            text-white
            flex flex-col items-center justify-center
            shadow-xl
            transition-transform duration-500
            hover:scale-105
          "
        >
          <span className="text-[11px] font-semibold tracking-[0.5em] uppercase">
            Begin Your
          </span>
          <span className="text-2xl font-serif italic leading-none mt-1">
            Journey
          </span>

          {/* Inner ring */}
          {/* <span className="absolute inset-4 rounded-full border border-white/40" /> */}
        </motion.button>
      </div>
    </section>
  );
};

export default NewEraSection;
