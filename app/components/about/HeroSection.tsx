import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import BackgroundFlower from "../BackgroundFlower";

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const ring1Opacity = useTransform(smoothScroll, [0, 0.2], [0, 1]);
  const ring2Opacity = useTransform(smoothScroll, [0.3, 0.5], [0, 1]);
  const ring3Opacity = useTransform(smoothScroll, [0.6, 0.8], [0, 1]);

  const ringScale = useTransform(smoothScroll, [0, 1], [0.8, 1.2]);
  const ringRotate = useTransform(smoothScroll, [0, 1], [0, 180]);

  const textY = useTransform(smoothScroll, [0, 1], [100, -100]);
  const imageY = useTransform(smoothScroll, [0, 1], [50, -50]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[146vh] w-full overflow-hidden flex flex-col items-center bg-secondary"
    >
      <div className="sticky top-20 h-screen w-full overflow-hidden bg-secondary min-h-[180vh]">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <BackgroundFlower />
        </div>

        <div className="container mx-auto mt-25 relative z-10 w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Text Content */}
            <motion.div style={{ y: textY }} className="lg:col-span-12 -z-20">
              <h1 className="text-[6vw] leading-none font-serif tracking-tighter text-gradient-gold py-2 text-center">
                CONTINENTAL GROUP
              </h1>
            </motion.div>
          </div>

          {/* Center Image */}
          <motion.div
            style={{ y: imageY, marginTop: "-50px" }}
            className="max-w-2xl mx-auto relative group"
          >
            <div className="aspect-3/4 overflow-hidden">
              <img
                src="/assets/images/horizon/heights.png"
                alt="Art Deco Luxury"
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
              />
            </div>

            <div className="absolute inset-0 pointer-events-none border border-black/5 m-4" />
          </motion.div>

          {/* Bottom Centered Text */}
          {/* <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 max-w-7xl mx-auto text-center"
          >
            <div className="max-w-full mx-auto text-center px-6">
              <p className="text-3xl leading-relaxed tracking-wide text-white uppercase">
                We build for families who value stability, clarity, and legacy
                over short-term hype. Homes that are culturally aligned,
                family-oriented, and built on trust.
              </p>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
