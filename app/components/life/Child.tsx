import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import InteriorsSection from "../InteriorSection";
import { INTERIOR_SLIDES } from "@/constants";

const SLIDES = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1502086223501-7ea2cea4e0ff?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?q=80&w=2070&auto=format&fit=crop",
  },
];

const ChildhoodSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Parallax transforms based on the original data-parallax attributes
  const patternY = useTransform(smoothScroll, [0, 1], ["0%", "-10%"]);
  const image1Y = useTransform(smoothScroll, [0.2, 0.8], ["10%", "-10%"]);
  const image2Y = useTransform(smoothScroll, [0.4, 1], ["5%", "-15%"]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-primary pt-16 overflow-hidden"
    >
      {/* BACKGROUND PATTERN: Geometric Grid */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.15]">
        <motion.div style={{ y: patternY }} className="w-full h-full">
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 1202 601"
            fill="none"
            className="w-full"
          >
            <path
              vectorEffect="non-scaling-stroke"
              d="M1201 0C1201 110.457 1111.46 200 1001 200M1001 200C1111.46 200 1201 289.543 1201 400M1001 200C890.544 200 801 110.457 801 0C801 110.457 711.456 200 601 200M1001 200C890.544 200 801 289.543 801 400"
              stroke="url(#childhood-grad)"
              strokeWidth="1"
            />
            <path
              vectorEffect="non-scaling-stroke"
              d="M601 200C711.456 200 801 289.543 801 400M601 200C490.543 200 401 110.457 401 0C401 110.457 311.457 200 201 200"
              stroke="url(#childhood-grad)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient
                id="childhood-grad"
                x1="0"
                y1="0"
                x2="1200"
                y2="600"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#0075bb" stopOpacity="0.8" />
                <stop offset="0.5" stopColor="#0075bb" />
                <stop offset="1" stopColor="#0075bb" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      <div className="container-h relative z-10 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-center mb-16 md:mb-24 uppercase text-gradient-gold"
        >
          Designed for comfort. Reserved for belonging.
        </motion.h2>

        {/* LEAD TEXT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-32">
          <div className="md:col-span-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl leading-relaxed tracking-wide text-primary uppercase"
            >
              Evenings are no longer defined by traffic or distance. A swim
              before dinner, a quiet steam session after a long day, children
              playing safely within sight, or a spontaneous game of table tennis
              with friends, life unfolds naturally when everything is designed
              around ease.
            </motion.p>
          </div>
        </div>
      </div>
      <InteriorsSection
        slides={INTERIOR_SLIDES}
        autoplayDelay={5000}
        slideWidthVW={60}
      />
    </section>
  );
};

export default ChildhoodSection;
