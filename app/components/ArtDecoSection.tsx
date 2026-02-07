import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import BackgroundFlower from "./BackgroundFlower";

const ArtDecoSection: React.FC = () => {
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
      className="relative min-h-[180vh] bg-white overflow-hidden flex flex-col items-center"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <BackgroundFlower />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Content */}
          <motion.div style={{ y: textY }} className="lg:col-span-8 z-20">
            <h2 className="text-8xl font-serif leading-tight mb-12 text-[#0f395c]">
              A legacy of Precision & a
              <br />
             Commitment
              <br />
              to People.
            </h2>
          </motion.div>

          {/* Right Visual / Animation Canvas */}
          <div className="lg:col-span-4 relative aspect-square flex items-center justify-center">
            <motion.div
              style={{ rotate: ringRotate, scale: ringScale }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <div className="absolute inset-0 perspective-[1000px]">
                {/* Ring 1 */}
                <motion.div
                  style={{ opacity: ring1Opacity }}
                  className="absolute inset-0 border border-[#ca8c19]/60 rounded-full"
                  animate={{ rotateX: [60, 70, 60], rotateY: [0, 360] }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Ring 2 */}
                <motion.div
                  style={{ opacity: ring2Opacity, scale: 0.85 }}
                  className="absolute inset-0 border-[1.5px] border-[#ca8c19]/40 rounded-full"
                  animate={{ rotateX: [45, 55, 45], rotateY: [360, 0] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Ring 3 */}
                <motion.div
                  style={{ opacity: ring3Opacity, scale: 0.7 }}
                  className="absolute inset-0 border-[2px] border-[#ca8c19]/30 rounded-full"
                  animate={{ rotateX: [30, 40, 30], rotateY: [0, 360] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Central Gold Glow */}
                <div className="absolute inset-0 m-auto w-1/4 h-1/4 bg-[#e6c16a]/20 blur-3xl rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Center Image */}
        <motion.div
          style={{ y: imageY, marginTop: "-300px" }}
          className="max-w-2xl mx-auto relative group"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl">
            <img
              src="/assets/images/horizon/horizons-5.png"
              alt="Art Deco Luxury"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none border border-black/5 m-4" />
        </motion.div>

        {/* Bottom Centered Text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-6 max-w-7xl mx-auto text-center"
        >
          <div className="max-w-full mx-auto text-center px-6">
            <p className="text-4xl leading-relaxed tracking-wide text-[#ca8c19] uppercase">
              Luxury lives in the strength of what holds a home together, the thought behind every detail, and the care with which spaces are shaped. At Continental, architectural excellence is guided by human values, creating environments that feel refined, familiar, and enduring. A legacy built not just to be lived in today, but to be trusted for generations.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Vertical Divider */}
      <div className="absolute left-1/2 bottom-0 w-px h-64 bg-gradient-to-t from-[#ca8c19]/30 to-transparent -translate-x-1/2" />
    </section>
  );
};

export default ArtDecoSection;
