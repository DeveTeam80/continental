import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "../../components/heights/Reveal";
import { IntroPattern } from "../LogoPattern";

export const InteriorsSection: React.FC = () => {
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

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageArchY = useTransform(smoothScroll, [0, 1], ["10%", "-15%"]);

  /* Arch scale effect */
  const imageScale = useTransform(smoothScroll, [0.35, 1], [1.04, 1]);
  return (
    <section
      ref={containerRef}
      className="relative bg-era-navy overflow-hidden"
    >
      <div className="relative">
        <IntroPattern />

<div className="relative z-20 -mt-[80vh]">
  <div className="relative w-full h-[200vh] overflow-hidden rounded-t-[1000px]">

    {/* Image */}
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

    {/* TEXT OVER IMAGE */}
    <div className="absolute inset-0 z-30 flex items-center">
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-4xl">

          <Reveal>
            <p className="text-xl md:text-2xl font-serif text-era-brick italic mb-6">
              Marvel at reality as if it were fiction
            </p>
          </Reveal>

          <Reveal delay={0.3} direction="up">
            <h2 className="text-7xl md:text-[12rem] font-serif text-white tracking-tighter leading-none opacity-90 italic">
              Interiors
            </h2>
          </Reveal>

        </div>
      </div>
    </div>

  </div>
</div>

      </div>


      {/* Decorative Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-era-navy to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-era-navy to-transparent" />
    </section>
  );
};
