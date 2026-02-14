import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { BgPattern } from "../BgPattern";
import { Reveal } from "../../components/heights/Reveal";
import ParallaxImage from "../ParallaxImage";

export const HorizonHeadSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40, 
    damping: 20,   
    restDelta: 0.001,
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const textY = useTransform(smoothScroll, [0, 1], [100, -100]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="style"
      className="relative isolate min-h-screen bg-era-navy py-20 overflow-hidden"
    >
      {/* ===== Background Pattern (Bottom Layer) ===== */}
      <BgPattern className="absolute inset-0 -z-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text Content */}
          <motion.div
            style={{ y: textY }}
            className="col-span-12 z-20 will-change-transform text-center relative"
          >
            <h2 className="text-[7vw] font-serif leading-tight mb-4 text-gradient-gold">
              Legacy. Transparency.
              <br />
              Responsibility.
            </h2>

            {/* 3D RIBBON - Positioned Lower to start below "Responsibility" */}
            {/* <div className="absolute w-[140vw] h-[100vh] -left-[50vw] bottom-[-28vw] pointer-events-none z-[-1]">
              <GoldRibbon />
            </div> */}
          </motion.div>
        </div>

        {/* Center Image - Added Parallax & Smoothness */}
        <motion.div
          style={{ y: imageY, marginTop: "-10vh" }}
          className="max-w-2xl mx-auto relative group will-change-transform"
        >
          <div className="aspect-3/4 overflow-hidden rounded-sm shadow-2xl">
            <ParallaxImage
              src="/assets/images/horizon/horizons-5.png"
              alt="Art Deco Luxury"
              className="w-full h-full"
              imgClassName="transition-transform duration-1000 group-hover:scale-105"
              speed={0.2}
            />
          </div>
          <div className="absolute inset-0 pointer-events-none m-4" />
        </motion.div>

        {/* Bottom Centered Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }} // Added viewport margin for better trigger
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 max-w-7xl mx-auto text-center"
        >
          <div className="max-w-full mx-auto text-center px-6">
            <p className="text-3xl leading-relaxed tracking-wide text-white uppercase font-light">
              We build for families who value stability, clarity, and legacy over short-term hype. Homes that are culturally aligned, family-oriented, and built on trust.
            </p>
          </div>
        </motion.div>
      </div>
      {/* Bottom Fade Transition */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-era-navy to-transparent pointer-events-none z-20"
      />
    </section>
  );
};
