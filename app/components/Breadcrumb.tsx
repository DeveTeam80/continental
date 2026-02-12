"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface BreadcrumbProps {
  title: string;
  backgroundImage: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, backgroundImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Background parallax
  const bgScale = useTransform(smoothProgress, [0, 1], [1.05, 1]);
  const bgOpacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 1, 0.85],
  );

  // Title motion
  const titleY = useTransform(smoothProgress, [0, 0.4], [40, 0]);
  //   const titleOpacity = useTransform(smoothProgress, [0, 0.25], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-[#051936] text-white"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src={backgroundImage}
            alt={title}
            className="w-full h-full object-cover brightness-[0.45]"
          />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-6 max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{ y: titleY }}
            className="text-[12vw] uppercase leading-none text-center opacity-100 pointer-events-none"
          >
            {title}
          </motion.h2>
        </div>
      </div>
    </section>
  );
};

export default Breadcrumb;
