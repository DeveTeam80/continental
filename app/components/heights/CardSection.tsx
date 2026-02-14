import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const ReflectCard: React.FC<{ label: string; value: string; sub?: string }> = ({
  label,
  value,
  sub,
}) => (
  <Reveal className="h-full">
    <div className="group relative  bg-secondary border border-secondary/40 h-full min-h-40 md:min-h-50 p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(207,143,125,0.2)]">
      <div className="relative z-10">
        <p className="text-sm uppercase tracking-widest text-white opacity-60 mb-2 font-bold whitespace-pre-line">
          {label}
        </p>
      </div>
      <div className="relative z-10 flex items-baseline">
        <p className="text-4xl md:text-5xl lg:text-6xl text-accent">{value}</p>
        {sub && (
          <span className="text-lg md:text-xl text-accent ml-1">{sub}</span>
        )}
      </div>

      <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-current text-accent"
        >
          <path
            d="M0 0 L100 100 M100 0 L0 100"
            strokeWidth="2"
            stroke="currentColor"
          />
        </svg>
      </div>
    </div>
  </Reveal>
);

export const CardSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 0.6, 0.6, 0.3],
  );
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  const textY = useTransform(smoothScroll, [0, 1], [100, -100]);
  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-era-navy overflow-hidden"
    >
      {/* Parallax Background Image */}
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/assets/images/heights-garden.webp"
          alt="Atmospheric Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-era-navy/80" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        {/* Main Heading */}
        <motion.div
          style={{ y: textY }}
          className="col-span-12 z-20 will-change-transform text-center lg:text-left relative"
        >
          <h2 className="text-5xl md:text-8xl  text-center mb-16 md:mb-24 leading-none">
            The Address That Redefined Mazgaon
          </h2>
        </motion.div>

        {/* Text and Offset Column */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="md:col-start-9 md:col-span-4">
            <Reveal delay={0.3}>
              <p className="text-lg font-light leading-relaxed opacity-90">
                Rising 55 storeys above Mazgaon, Continental Heights offers a
                rare balance of height and harmony.
                <br />A curated mix of 1, 2, 2.5, 3 and 4 BHK residences ensures
                homes for evolving families, while 8 levels of dedicated parking
                and 6 high-speed lifts support seamless daily life at every
                level.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <ReflectCard
            label="CONFIGURATION"
            value="1 – 4"
            sub="BHK Apartments"
          />
          <ReflectCard label="TOWER SCALE" value="55" sub="Storeys" />
          <ReflectCard
            label="LOW DENSITY LIVING"
            value="10"
            sub="Homes Per Floor"
          />
        </div>
      </div>
    </section>
  );
};
