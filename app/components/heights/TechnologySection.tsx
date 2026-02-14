import React, { useRef } from "react";
import { Reveal } from "./Reveal";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { BgPattern } from "../BgPattern";

interface TechCardProps {
  title: string;
  description: string;
}

const TechCard: React.FC<TechCardProps> = ({ title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group relative h-full bg-primary/20 border border-secondary/40 p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-lg"
  >
    <div className="relative z-10">
      <h3 className="text-2xl text-era-navy mb-4 group-hover:text-era-brick transition-colors">
        {title}
      </h3>
    </div>

    <div className="relative z-10">
      <p className="text-era-navy/70 text-base leading-relaxed">
        {description}
      </p>
    </div>

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
      className="relative min-h-screen bg-secondary text-secondary pt-24 overflow-hidden"
    >
      {/* Background Arch Layer */}
      <div className="absolute inset-x-0 top-0 h-full bg-white rounded-t-[1000px] z-0 overflow-hidden">
        <motion.div
          style={{ scale: imageScale, y: imageArchY }}
          className="absolute inset-0 z-0"
        />
        <BgPattern className="absolute inset-0 -z-20 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-12">
        <Reveal>
          <motion.div
            style={{ y: textY }}
            className="text-center relative"
          >
            <h2 className="text-[7vw] leading-tight mb-4 text-gradient-gold uppercase">
              The Privilege <br />
              of Address
            </h2>
          </motion.div>
        </Reveal>

        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24">
          <div className="md:col-start-9 md:col-span-4">
            <Reveal delay={0.2}>
              <p className="text-base text-era-navy/80 leading-relaxed pr-12 italic">
                Located in the heart of Mazgaon, Continental Heights places you
                at the intersection of heritage, connectivity, and community.
                With faith, greenery, and the sea all within reach, everyday life
                feels centered, effortless, and complete.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-32">
          <Reveal delay={0.1}>
            <TechCard
              title="Sacred Proximity"
              description="Just 250 metres from Jamali Masjid (Nariyalwadi) and 3 km from Raudat Tahera,  keeping faith and daily life beautifully connected."
            />
          </Reveal>

          <Reveal delay={0.2}>
            <TechCard
              title="Seamless Connectivity"
              description="3 minutes to the Eastern Freeway and 2 minutes to Reay Road Station, reducing travel time and restoring balance to your day."
            />
          </Reveal>

          <Reveal delay={0.3}>
            <TechCard
              title="Green & Sea Views"
              description="Adjoining Jijamata Udyan with the Arabian Sea on the other side, a rare blend of open skies and urban convenience."
            />
          </Reveal>

          <Reveal delay={0.4}>
            <TechCard
              title="Everyday Convenience"
              description="Schools, colleges, hospitals, and major roads within easy reach, essentials that remain part of your neighbourhood."
            />
          </Reveal>
        </div>

        {/* Bottom Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto pt-24">
            <motion.h3
              style={{ y: textY }}
              className="absolute top-16 right-16 text-[4vw] font-serif tracking-wide text-era-brick/70 leading-none z-20"
            >
              Where Mazgaon Meets Everything
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-stretch">
              {/* Left Column */}
              <div className="md:col-span-4 flex flex-col justify-center">
                <div className="mb-16">
                  <div className="aspect-3/2 overflow-hidden">
                    <img
                      src="/assets/images/locations-1.JPG"
                      alt="Mazgaon surroundings"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div>
                  <p className="text-era-navy/80 text-sm md:text-base leading-relaxed mb-6">
                    Continental Heights stands in the very heart of South Mumbai,
                    where heritage landmarks, green canopies, coastal breeze,
                    and daily conveniences coexist. It is not simply well
                    connected; it is meaningfully placed.
                  </p>
                </div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block md:col-span-2"></div>

              {/* Right Image */}
              <div className="md:col-span-6">
                <div className="aspect-3/4 overflow-hidden">
                  <img
                    src="/assets/images/locations-2.JPG"
                    alt="South Mumbai skyline"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
