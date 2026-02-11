"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number | string;
  img: string;
}

interface InfiniteImageCarouselProps {
  slides: Slide[];
  autoplayDelay?: number;
  slideWidthVW?: number;
}

const InteriorSection: React.FC<InfiniteImageCarouselProps> = ({
  slides,
  autoplayDelay = 5000,
  slideWidthVW = 60,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const loopedSlides = useMemo(
    () => [...slides, ...slides, ...slides],
    [slides],
  );

  const total = slides.length;

  // Start in middle set
  const [current, setCurrent] = useState(total);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const handleIndexUpdate = useCallback(
    (index: number) => {
      if (index >= total * 2) {
        setTimeout(() => setCurrent(index - total), 0);
      }
      if (index < total) {
        setTimeout(() => setCurrent(index + total), 0);
      }
    },
    [total],
  );

  const nextSlide = useCallback(() => {
    if (!isAnimating) setCurrent((prev) => prev + 1);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (!isAnimating) setCurrent((prev) => prev - 1);
  }, [isAnimating]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, autoplayDelay]);

  return (
    <section
      id="interiors"
      ref={sectionRef}
      className="relative text-white pb-32 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-center items-center overflow-visible">
        <motion.div
          className="flex gap-8 items-center"
          animate={{
            x: `calc(50% - (${current} * (${slideWidthVW}vw + 2rem)) - ${
              slideWidthVW / 2
            }vw)`,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 22, mass: 1 }}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => {
            setIsAnimating(false);
            handleIndexUpdate(current);
          }}
        >
          {loopedSlides.map((slide, idx) => {
            const isCenter = idx === current;

            return (
              <motion.div
                key={`${slide.id}-${idx}`}
                className={`relative shrink-0 w-[${slideWidthVW}vw] aspect-video overflow-hidden shadow-2xl rounded-sm`}
                animate={{ scale: isCenter ? 1 : 0.9 }}
              >
                <motion.img
                  src={slide.img}
                  alt=""
                  className="w-full h-full object-cover"
                  animate={{ scale: isCenter ? 1 : 1.1 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="absolute inset-0 flex z-30 pointer-events-none">
        <div
          onClick={prevSlide}
          className="flex-1 cursor-pointer pointer-events-auto group relative"
        >
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
            <ChevronLeft size={32} />
          </div>
        </div>

        <div
          onClick={nextSlide}
          className="flex-1 cursor-pointer pointer-events-auto group relative"
        >
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
            <ChevronRight size={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorSection;
