import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IntroPattern } from "../LogoPattern";

const LifeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  // Parallax Transforms
  const textY = useTransform(smoothScroll, [0, 1], [100, -100]);
  /* Subtle parallax upward movement */
  const patternY = useTransform(smoothScroll, [0, 1], ["0%", "-10%"]);
  const image1Y = useTransform(smoothScroll, [0, 1], ["6%", "-8%"]);
  const image2Y = useTransform(smoothScroll, [0, 1], ["8%", "-10%"]);
  const image3Y = useTransform(smoothScroll, [0, 1], ["5%", "-12%"]);
  const imageArchY = useTransform(smoothScroll, [0, 1], ["10%", "-15%"]);

  /* Arch scale effect */
  const imageScale = useTransform(smoothScroll, [0.35, 1], [1.04, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-secondary text-white pt-32 overflow-hidden"
    >
      {/* BACKGROUND PATTERN */}
      <div className="absolute top-0 left-0 w-full h-[120vh] pointer-events-none opacity-20">
        <motion.div style={{ y: patternY }} className="w-full h-full">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1202 601"
            fill="none"
            className="w-full h-auto"
          >
            <path
              vectorEffect="non-scaling-stroke"
              d="M1201 601C1201 490.543 1111.46 401 1001 401M1001 401C1111.46 401 1201 311.457 1201 201M1001 401C890.543 401 801 490.543 801 601C801 490.543 711.456 401 601 401M1001 401C890.543 401 801 311.457 801 201"
              stroke="#0075bb"
              strokeOpacity="0.4"
            />
          </svg>
        </motion.div>
      </div>

      <div className="container-h relative z-10 px-6 max-w-7xl mx-auto">
        {/* BLOCK 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-24">
          <div className="md:col-span-4 flex flex-col gap-8">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              style={{ y: textY }}
              className="text-4xl md:text-5xl text-gradient-gold leading-tight"
            >
              The First Step <br /> Into Belonging
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              style={{ y: textY }}
              whileInView={{ opacity: 1 }}
              className="text-white/70 text-base font-light leading-relaxed max-w-sm"
            >
              The entrance at Continental is more than architecture, it is a
              reflection of identity. Crafted with dignity and restraint, it
              welcomes residents into a space that feels refined, rooted, and
              unmistakably their own.
            </motion.p>
          </div>

          <div className="md:col-span-1" />

          <div className="md:col-span-7">
            <motion.div
              style={{ y: image1Y }}
              className="aspect-4/3 overflow-hidden rounded-sm shadow-2xl"
            >
              <img
                src="/assets/images/horizon/amenities-gallery/lobby-ent-03.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        {/* BLOCK 2 — Logo + Paragraph */}
        <div className="grid grid-cols-1 md:grid-cols-12 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ y: textY }}
            className="md:col-span-6 flex justify-center md:justify-start mb-12 md:mb-0"
          >
            <img
              src="/assets/images/logo.png"
              alt="Continental Logo"
              className="w-48 md:w-60 h-auto object-contain opacity-60"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ y: textY }}
            className="md:col-span-6"
          >
            <p className="text-white/70 text-base font-light leading-relaxed max-w-md">
              The grand entrance is not merely a lobby, it is a statement of
              identity. Every material, every proportion, every framed presence
              speaks of heritage, reverence, and quiet pride. This is a space
              designed to honour where you come from, while welcoming you into
              where you are going. A setting that feels refined, familiar, and
              deeply personal, because true luxury begins with recognition.
            </p>
          </motion.div>
        </div>
        {/* BLOCK 3 — Floating Images */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            {/* Right Image */}
            <motion.div
              style={{ y: image3Y }}
              className="hidden md:block float-right w-[40%] ml-12 mb-88"
            >
              <img
                src="/assets/images/horizon/amenities-gallery/lobby-ent-01.jpg"
                alt=""
                className="w-full h-auto object-cover shadow-lg"
              />
            </motion.div>
            {/* Left Image */}
            <motion.div
              style={{ y: image3Y }}
              className="w-full md:w-[50%] float-left mr-12 aspect-5/4"
            >
              <img
                src="/assets/images/horizon/amenities-gallery/lifr-lobby-ent-01.jpg"
                alt=""
                className="w-full h-auto object-cover aspect-3/4"
              />
            </motion.div>
            {/* Editorial Text */}
            <motion.div style={{ y: textY }}>
              <p className="clear-right text-3xl leading-relaxed tracking-wide text-primary uppercase">
                <span className="text-gradient-gold font-medium">
                  Life at Continental is designed around balance, between
                  elegance and ease, privacy and connection. Amenities feel
                  intuitive rather than excessive, creating an atmosphere where
                  comfort flows naturally and community feels organic. It is
                  luxury that supports your life, not interrupts it.
                </span>
              </p>
            </motion.div>
            <div className="clear-both" />
          </div>
        </div>
      </div>

      {/* BLOCK 4 — ARCH IMAGE */}
      <div className="relative">
        <IntroPattern />

        <div className="relative z-20 -mt-[80vh]">
          <div className="relative w-full h-[200vh] overflow-hidden rounded-t-[1000px]">
            <motion.div
              style={{
                scale: imageScale,
                y: imageArchY,
              }}
              className="w-full h-full"
            >
              <img
                src="/assets/images/horizon/horizon-6.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Soft fade at bottom */}
            <div className="absolute inset-0 pointer-events-none" />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-end p-12 md:p-24 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="max-w-md text-right flex flex-col items-end"
              >
                <div className="w-16 h-px bg-primary mb-8" />
                <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed italic">
                  Through vine-covered arches you can get inside these green
                  walls, into the heart of ERA , the central park.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeSection;
