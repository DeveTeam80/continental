import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxImage from "./ParallaxImage";

export default function JoyEditorialSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  const textY = useTransform(smoothProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="relative bg-secondary text-white pt-28 pb-32 overflow-hidden"
    >
      {/* =========================
          EDITORIAL TITLE
      ========================= */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <motion.h2
          style={{ y: textY }}
          className="
    text-[10vw]
    font-serif uppercase leading-none
     text-center
    pointer-events-none
 text-gradient-gold
  "
        >
          Life at Continental
        </motion.h2>
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          {/* Right Image */}
          <div className="hidden md:block float-right w-[28%] ml-12 mb-88">
            <ParallaxImage
              src="/assets/images/media/landing/joy/image-2@md.webp"
              alt=""
              className="w-full shadow-lg"
              speed={0.2}
            />
          </div>

          {/* Left Image */}
          <div className="w-full md:w-[50%] float-left mr-12 mb-8">
            <ParallaxImage
              src="/assets/images/media/landing/joy/image-1@md.webp"
              alt=""
              className="w-full"
              speed={0.2}
            />
          </div>

          {/* Editorial Text */}
          <p className="joy-editorial-text clear-right text-3xl leading-relaxed tracking-wide text-white/80 uppercase">
            <span className="text-white font-medium">
              Life at Continental Horizon is shaped around calm, continuity, and
              connection. Shared spaces and curated amenities are designed to
              feel natural, not crowded, encouraging comfort, privacy, and a
              sense of belonging. It’s an environment where families feel
              secure, daily routines flow effortlessly, and community feels
              familiar, not forced.
            </span>
          </p>

          <div className="clear-both" />
        </div>
      </div>
    </section>
  );
}
