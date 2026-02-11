import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function JoyEditorialSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const titleX = useTransform(scrollYProgress, [0, 0.6], [80, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative bg-white text-[#825541] pt-28 pb-32 overflow-hidden"
    >
      {/* =========================
          EDITORIAL TITLE
      ========================= */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <motion.h2
          style={{ x: titleX, opacity: titleOpacity }}
          className="
    text-[7vw]
    font-serif uppercase leading-none
    text-secondary text-right
    pointer-events-none
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
          <div className="hidden md:block float-right w-[28%] ml-12 mb-[22rem]">
            <img
              src="/assets/images/media/landing/joy/image-2@md.webp"
              alt=""
              className="w-full h-auto object-cover shadow-lg"
            />
          </div>

          {/* Left Image */}
          <div className="w-full md:w-[50%] float-left mr-12 mb-8">
            <img
              src="/assets/images/media/landing/joy/image-1@md.webp"
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Editorial Text */}
          <p className="joy-editorial-text clear-right text-3xl leading-relaxed tracking-wide text-[#825541]/80 uppercase">
            <span className="text-primary font-medium">
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
