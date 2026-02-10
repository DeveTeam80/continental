import React, { useRef, useLayoutEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRINCIPLES } from "../../../constants";
import PrinciplesCard from './PrinciplesCard';

const PrinciplesSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [maxTranslate, setMaxTranslate] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  /**
   * Measure widths and calculate max translateX
   */
  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const calculate = () => {
      const trackWidth = trackRef.current!.scrollWidth;
      const viewportWidth = window.innerWidth;

      const max = Math.max(trackWidth - viewportWidth, 0);
      setMaxTranslate(max);
    };

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  /**
   * Clamp horizontal movement
   */
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -maxTranslate]
  );

  return (
    <div ref={containerRef} className="relative h-[600vh]">
      {/* Sticky Container */}
      <div className="sticky top-10 h-screen flex flex-col justify-center overflow-hidden">

        {/* Section Header */}
        <div className="px-6 md:px-20 mb-8 md:mb-12">
          <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-[#0A1F44] uppercase leading-none">
            Company Principles
          </h2>
        </div>

        {/* Horizontal Track */}
        <div className="relative flex items-center pb-10">
          <motion.div
            ref={trackRef}
            style={{ x: xTranslate }}
            className="flex gap-8 md:gap-12 px-6 md:px-20 will-change-transform"
          >
            {PRINCIPLES.map((principle) => (
              <PrinciplesCard
                key={principle.id}
                principle={principle}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrinciplesSection;
