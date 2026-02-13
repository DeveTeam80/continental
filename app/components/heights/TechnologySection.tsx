import React, { useRef } from "react";
import { Reveal } from "./Reveal";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
interface TechCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const TechCard: React.FC<TechCardProps> = ({ title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group relative h-full bg-primary/20 border border-secondary/40 p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-lg"
  >
    <div className="relative z-10">
      <h3 className="text-2xl  text-era-navy mb-4 group-hover:text-era-brick transition-colors">
        {title}
      </h3>
    </div>

    <div className="relative z-10">
      <p className="text-era-navy/70 text-base leading-relaxed">
        {description}
      </p>
    </div>

    {/* Decorative corner icon or element */}
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-era-brick"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  </motion.div>
);

export const TechnologySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });

  const imageArchY = useTransform(smoothScroll, [0, 1], ["10%", "-15%"]);

  const imageScale = useTransform(smoothScroll, [0.35, 1], [1.04, 1]);
  const textY = useTransform(smoothScroll, [0, 1], [100, -100]);
  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-secondary text-secondary py-24 md:py-32 overflow-hidden"
    >
      {/* ARCH BACKGROUND LAYER */}
      <div className="absolute inset-x-0 top-0 h-[200vh] bg-white rounded-t-[1000px] z-0 overflow-hidden">
        <motion.div
          style={{
            scale: imageScale,
            y: imageArchY,
          }}
          className="absolute inset-0 z-0"
        />

        {/* Decorative SVG Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 725"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M1440 724.547C1440 591.345 1332.55 483.365 1200 483.365M1200 483.365C1332.55 483.365 1440 375.384 1440 242.182M1200 483.365C1067.45 483.365 960 591.345 960 724.547"
              stroke="#051936"
              strokeWidth="0.5"
            />
            <path
              d="M960 242.182C960 108.981 1067.45 1.00009 1200 1.00009M960 242.182C1307.45 242.182 1200 134.202 1200 1.00009"
              stroke="#051936"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 container mx-auto px-4 md:px-12">
        <Reveal>
          <motion.div
            style={{ y: textY }}
            className="col-span-12 z-20 will-change-transform text-center relative"
          >
            <h2 className="text-[7vw]  leading-tight mb-4 text-gradient-gold uppercase">
              Be a technology <br />
              Virtuoso
            </h2>
          </motion.div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
          <div className="md:col-start-9 md:col-span-4">
            <Reveal delay={0.2}>
              <p className="text-base text-era-navy/80 leading-relaxed pl-6 italic">
                Artists can only create masterpieces if they know the techniques
                and control them perfectly. That's why ERA focuses on
                cutting-edge technology to make your life special.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-32">
          <Reveal delay={0.1}>
            <TechCard
              title="Safety"
              description="Gated area and modern IP intercom system to keep family and friends safe and secure at all times."
            />
          </Reveal>
          <Reveal delay={0.2}>
            <TechCard
              title="Ventilation system"
              description="There is mechanical supply ventilation with air heating and purification filters in the common areas."
            />
          </Reveal>
          <Reveal delay={0.3}>
            <TechCard
              title="Mobile signal"
              description="An amplified signal allows you to stay on the phone when you are in a car park or elevator."
            />
          </Reveal>
          <Reveal delay={0.4}>
            <TechCard
              title="Public area Wi-Fi"
              description="Seamless Wi-Fi connectivity in entrance groups and courtyard for a connected lifestyle."
            />
          </Reveal>
        </div>

        {/* Bottom Lifts Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-8">
            <Reveal direction="right">
              <h3 className="text-3xl md:text-5xl text-era-navy mb-8 leading-tight">
                Get home faster than
                <br />
                you expect
              </h3>
              <div className="aspect-video relative overflow-hidden rounded-sm shadow-xl bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200"
                  alt="High speed lift interior"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end h-full pt-8">
            <Reveal delay={0.5}>
              <p className="text-era-navy/80 text-sm md:text-base leading-relaxed mb-6">
                The SWORD lifts travel from the car park to the upper floors at
                a speed of 2.5 m/s. The lift interiors were designed to
                harmonise with the overall artistic concept of the lobby.
              </p>
              <div className="flex items-center space-x-2 text-era-brick">
                <span className="h-px w-12 bg-era-brick"></span>
                <span className="text-xs uppercase tracking-widest font-bold">
                  2.5 m/s speed
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
};
