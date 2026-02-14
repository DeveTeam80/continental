import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BgPattern } from "../BgPattern";
import { Reveal } from "./Reveal";
import ParallaxImage from "../ParallaxImage";

export const StyleSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="style"
      className="relative isolate min-h-screen bg-era-navy py-20 overflow-hidden"
    >
      {/* ===== Background Pattern (Bottom Layer) ===== */}
      <BgPattern className="absolute inset-0 -z-20 pointer-events-none" />

      {/* ===== Animated Gradient Overlay (Above Pattern) ===== */}
      <div className="absolute inset-0 -z-10 gradient-animate opacity-30 mix-blend-overlay pointer-events-none" />

      {/* ===== Main Content (Top Layer) ===== */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative">
          {/* Right Image */}
          <div className="hidden md:block float-right w-[46%] mb-[40%]">
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xlfont-light leading-relaxed mb-8">
                <span className="text-accent">
                  Mazgaon had history. <br />
                  Continental Heights gave it a new benchmark.
                  <br />
                  <br />
                </span>
                <span>
                   It did not redefine the skyline through scale alone,
                  but through intention. From separate amenities designed with
                  sensitivity, to spaces that encourage both privacy and
                  togetherness, Heights created an environment where families
                  felt understood without explanation. It became more than an
                  address, it became a shared standard of living.
                  </span>
              </p>
            </Reveal>
          </div>

          {/* Left Image */}
          <div className="w-full md:w-[50%] float-left mr-12 mb-8">
            <ParallaxImage
              src="/assets/images/horizon/about-ch-01.jpg"
              alt=""
              className="w-full"
              speed={0.2}
            />
          </div>

          {/* Editorial Text */}
          <p className="joy-editorial-text clear-right text-3xl leading-relaxed tracking-wide text-white/80 uppercase">
            <Reveal delay={0.6} className="mt-8 md:mt-20">
              <p className="text-3xl md:text-4xl  font-normal leading-tight">
                Continental Heights was never introduced as a project. It was
                envisioned as a standard. At a time when luxury was often loud
                and impersonal, Heights quietly delivered something more
                meaningful, a residence shaped around cultural understanding,
                privacy, and architectural dignity.
              </p>
            </Reveal>
          </p>

          <div className="clear-both" />
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"></div>

        {/* Footer Text */}
        <div className="grid grid-cols-1 md:grid-cols-12 mt-16">
          <div className="md:col-start-9 md:col-span-4">
            <Reveal delay={0.8} direction="left">
              <p className="text-sm md:text-basefont-light opacity-60 leading-relaxed">
                Today, Continental Heights is largely established, a living
                testament to the trust it has earned. A final release of premium
                upper-floor residences <br /> (50th–55th floors) and select
                commercial spaces now remains, offering a rare opportunity to
                become part of an address already embraced by the community.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Bottom Fade Transition */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-era-navy to-transparent pointer-events-none z-20"
      />
    </section>
  );
};
