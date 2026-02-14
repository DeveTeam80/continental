import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const AvailabilityCard: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <Reveal className="h-full">
    <div className="bg-white/5 border border-white/10 p-8 h-full flex flex-col justify-between group hover:bg-era-brick/10 transition-colors duration-500">
      <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-sans">
        {label}
      </p>
      <p className="text-6xl md:text-7xl text-era-brick mt-8">{value}</p>
    </div>
  </Reveal>
);

export const AvailabilitySection: React.FC = () => {
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

  const textY = useTransform(smoothScroll, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="relative pt-24 md:pt-32 bg-era-navy overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        {/* Headline */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-baseline">
          <div className="md:col-span-4">
            <Reveal>
              <motion.div
                style={{ y: textY }}
                className="text-center lg:text-left"
              >
                <h2 className="text-3xl md:text-4xl text-era-brick italic">
                  Final Chapter
                </h2>
              </motion.div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.2}>
              <motion.div
                style={{ y: textY }}
                className="text-center lg:text-left"
              >
                <p className="text-3xl md:text-5xl leading-tight opacity-90">
                  The highest floors now await their final residents.
                </p>
              </motion.div>
            </Reveal>
          </div>
        </div>

        {/* Availability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <AvailabilityCard
            label="Premium Residences Available"
            value="50th – 55th Floors"
          />
          <AvailabilityCard
            label="Commercial Wing Available"
            value="1 Wing"
          />
        </div>

        {/* Description */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center pt-6">
          <div className="md:col-span-6">
            <Reveal delay={0.3} direction="left">
              <motion.div style={{ y: textY }}>
                <p className="text-lg font-light opacity-70 leading-relaxed">
                  Rising above Mazgaon, the 50th to 55th floors offer a rare
                  vantage point, elevated living with sweeping views, greater
                  privacy, and the distinction of being among the final
                  residences at Continental Heights.
                </p>
              </motion.div>
            </Reveal>
          </div>

          <div className="md:col-span-6 space-y-8 md:pl-12">
            <Reveal delay={0.5} direction="left">
              <motion.div style={{ y: textY }}>
                <p className="text-lg font-light opacity-70 leading-relaxed">
                  In addition, one commercial wing remains available, an
                  opportunity for discerning businesses to establish themselves
                  within a landmark address already home to a respected and
                  established community.
                </p>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
