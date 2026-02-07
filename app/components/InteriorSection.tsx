import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const INTERIOR_SLIDES = [
  { id: 1, img: "assets/images/horizon/amenities-gallery/Dastarkhwan-01.jpg" },
  { id: 2, img: "assets/images/horizon/amenities-gallery/Dastarkhwan-02.jpg" },
  { id: 3, img: "assets/images/horizon/amenities-gallery/Dastarkhwan-011.jpg" },
  { id: 4, img: "assets/images/horizon/amenities-gallery/game-01.jpg" },
  { id: 5, img: "assets/images/horizon/amenities-gallery/game-02.jpg" },
  { id: 6, img: "assets/images/horizon/amenities-gallery/game-03.jpg" },
  { id: 7, img: "assets/images/horizon/amenities-gallery/game-04.jpg" },
  { id: 8, img: "assets/images/horizon/amenities-gallery/game-05.jpg" },
  { id: 9, img: "assets/images/horizon/amenities-gallery/gym-01.jpg" },
  { id: 10, img: "assets/images/horizon/amenities-gallery/gym-02.jpg" },
];

const InteriorsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const loopedSlides = useMemo(() => [
    ...INTERIOR_SLIDES,
     ...INTERIOR_SLIDES,
      ...INTERIOR_SLIDES,
  ], []);

  // 2. Start the index in the middle set of images
  const [current, setCurrent] = useState(INTERIOR_SLIDES.length);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const ceilingImgY = useTransform(smoothScroll, [0.6, 1], ["0%", "-20%"]);
  const cardY = useTransform(smoothScroll, [0.6, 0.9], [100, 0]);

  // Handle the "Teleport" logic to keep it infinite
  const handleIndexUpdate = useCallback((index: number) => {
    const total = INTERIOR_SLIDES.length;
    // If we go too far right, jump back to middle set
    if (index >= total * 2) {
      setTimeout(() => setCurrent(index - total), 0);
    }
    // If we go too far left, jump forward to middle set
    if (index < total) {
      setTimeout(() => setCurrent(index + total), 0);
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setCurrent((prev) => prev + 1);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setCurrent((prev) => prev - 1);
  }, [isAnimating]);

  // Auto-play Logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Get the display index (0-4) for the progress bar
  const activeIndex = current % INTERIOR_SLIDES.length;
//bg-[#f9f4ef]
  return (
    <section id="interiors" ref={sectionRef} className="relative text-[#051936] pb-32 overflow-hidden">
      
      <div 
        className="relative w-full mt-24 mb-48 group/carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="flex justify-center items-center overflow-visible">
          <motion.div 
            className="flex gap-8 items-center"
            initial={false}
            animate={{ x: `calc(50% - (${current} * (60vw + 2rem)) - 30vw)` }}
            transition={{ type: "spring", stiffness: 100, damping: 22, mass: 1 }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => {
              setIsAnimating(false);
              handleIndexUpdate(current);
            }}
          >
            {loopedSlides.map((slide, idx) => {
              // Only highlight the "current" slide
              const isCenter = idx === current;
              
              return (
                <motion.div
                  key={`${slide.id}-${idx}`}
                  className="relative shrink-0 w-[60vw] aspect-[16/10] md:aspect-[16/9] overflow-hidden shadow-2xl rounded-sm bg-[#051936]"
                  animate={{ 
                    scale: isCenter ? 1 : 0.9,
                    opacity: isCenter ? 1 : 1
                  }}
                >
                  <motion.img 
                    src={slide.img}
                    alt={`Interior`}
                    className="w-full h-full object-cover"
                    animate={{ scale: isCenter ? 1 : 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex z-30 pointer-events-none">
          <div onClick={prevSlide} className="flex-1 cursor-pointer pointer-events-auto group/prev relative">
             <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#ca8c19]/90 text-white flex items-center justify-center shadow-2xl opacity-0 group-hover/prev:opacity-100 transition-all duration-500 scale-75 group-hover/prev:scale-100">
                <ChevronLeft size={32} />
             </div>
          </div>
          <div onClick={nextSlide} className="flex-1 cursor-pointer pointer-events-auto group/next relative">
             <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#ca8c19]/90 text-white flex items-center justify-center shadow-2xl opacity-0 group-hover/next:opacity-100 transition-all duration-500 scale-75 group-hover/next:scale-100">
                <ChevronRight size={32} />
             </div>
          </div>
        </div>
      </div>

      {/* Ceiling Height Feature Logic remains same */}
      {/* <div className="relative w-full h-screen overflow-hidden">
         <motion.div style={{ y: ceilingImgY }} className="absolute inset-0 w-full h-[140%]">
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover brightness-[0.85]" />
        </motion.div>
        <div className="container-h relative h-full flex flex-col justify-end pb-32 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 w-full">
            <motion.div style={{ y: cardY }} className="md:col-span-4 lg:col-span-3 bg-white p-12 shadow-2xl relative border-l-4 border-[#ca8c19]">
              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#051936]/40 text-right">Ceiling height, m</span>
                <div className="flex items-baseline justify-start gap-1">
                  <span className="text-9xl md:text-[10rem] font-serif leading-none text-[#051936]">5.</span>
                  <div className="overflow-hidden h-[1em] relative">
                    <motion.div animate={{ y: ["-100%", "0%"] }} transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} className="flex flex-col text-9xl md:text-[10rem] font-serif leading-none text-[#ca8c19]">
                      <span>8</span>
                      <span>9</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default InteriorsSection; 