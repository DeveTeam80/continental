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
            <h2 className="text-6xl font-serif leading-tight mb-12 text-secondary">
              Legacy. Transparency.
              <br />
              Responsibility.
            </h2>
            <div className="space-y-8 text-lg font-light leading-relaxed text-secondary/80 max-w-2xl">
              <p>
                The Continental Group is a legacy-driven real estate developer, built on trust, values, and long-term responsibility. We are not volume builders. We are not transactional developers.
              </p>
              <p>
                We focus on creating thoughtfully planned residential and commercial spaces that stand the test of time — structurally, ethically, and culturally. Our developments are rooted in self-owned land, transparent processes, and a deep respect for the communities we build for.
              </p>
              <p className="font-medium text-primary">
                That’s why Continental is not just a name — it’s a long-term commitment.
              </p>
            </div>
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
                  className="absolute inset-0 border border-primary/60 rounded-full"
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
                  className="absolute inset-0 border-[1.5px] border-primary/40 rounded-full"
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
                  className="absolute inset-0 border-[2px] border-primary/30 rounded-full"
                  animate={{ rotateX: [30, 40, 30], rotateY: [0, 360] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Central Gold Glow */}
                <div className="absolute inset-0 m-auto w-1/4 h-1/4 bg-primary/20 blur-3xl rounded-full" />
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
            <p className="text-3xl leading-relaxed tracking-wide text-primary uppercase">
              We build for families who value stability, clarity, and legacy over short-term hype. Homes that are culturally aligned, family-oriented, and built on trust.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Vertical Divider */}
      <div className="absolute left-1/2 bottom-0 w-px h-64 bg-gradient-to-t from-primary/30 to-transparent -translate-x-1/2" />
    </section>
  );
};

export default ArtDecoSection;
