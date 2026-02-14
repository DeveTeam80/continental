
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const INTERIOR_SLIDES = [
  { id: 1, img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" },
  { id: 2, img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, img: "https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, img: "https://images.unsplash.com/photo-1616137422495-1e9e46e2aa77?q=80&w=2000&auto=format&fit=crop" },
  { id: 5, img: "https://images.unsplash.com/photo-1600607687940-477a24911f32?q=80&w=2070&auto=format&fit=crop" },
];

const InteriorCarousel: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Section Parallax
  const decoY = useTransform(smoothScroll, [0, 1], ["80px", "-180px"]);
  const ceilingImgY = useTransform(smoothScroll, [0.6, 1], ["0%", "-20%"]);
  const cardY = useTransform(smoothScroll, [0.6, 0.9], [100, 0]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % INTERIOR_SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + INTERIOR_SLIDES.length) % INTERIOR_SLIDES.length);

  return (
    <section id="interiors" ref={sectionRef} className="relative bg-secondary text-[#051936] pt-16 overflow-hidden">

      {/* FULL WIDTH CAROUSEL: Center focused with side peeking */}
      <div className="relative w-full mt-24 mb-48 group/carousel">
        <div className="flex justify-center items-center overflow-visible">
          <motion.div 
            className="flex gap-8 items-center"
            animate={{ x: `calc(50% - (${current} * (60vw + 2rem)) - 30vw)` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {INTERIOR_SLIDES.map((slide, idx) => (
              <motion.div
                key={slide.id}
                className="relative shrink-0 w-[60vw] aspect-[16/10] md:aspect-[16/9] overflow-hidden shadow-2xl rounded-sm bg-[#051936]"
                animate={{ 
                  scale: current === idx ? 1 : 0.9,
                  opacity: current === idx ? 1 : 0.4
                }}
              >
                <motion.img 
                  src={slide.img}
                  alt={`Interior ${idx + 1}`}
                  className="w-full h-full object-cover"
                  animate={{ 
                    x: (current - idx) * 100,
                    scale: current === idx ? 1 : 1.1
                  }}
                  transition={{ type: "tween", ease: "linear", duration: 0.1 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Large Interaction Hitboxes with Circular Buttons */}
        <div className="absolute inset-0 flex z-30 pointer-events-none">
          <div 
            onClick={prevSlide}
            className="flex-1 cursor-pointer pointer-events-auto group/prev relative"
          >
             <motion.div 
               className="absolute top-1/2 left-1/4 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#cf8f7d]/90 text-white flex items-center justify-center shadow-2xl opacity-0 group-hover/prev:opacity-100 transition-all duration-500 scale-75 group-hover/prev:scale-100"
             >
                <ChevronLeft size={32} />
             </motion.div>
          </div>
          <div 
            onClick={nextSlide}
            className="flex-1 cursor-pointer pointer-events-auto group/next relative"
          >
             <motion.div 
               className="absolute top-1/2 right-1/4 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#cf8f7d]/90 text-white flex items-center justify-center shadow-2xl opacity-0 group-hover/next:opacity-100 transition-all duration-500 scale-75 group-hover/next:scale-100"
             >
                <ChevronRight size={32} />
             </motion.div>
          </div>
        </div>

        {/* Progress Counter */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-12 text-[10px] font-bold tracking-[0.6em] uppercase text-[#cf8f7d]/50">
           <span>0{current + 1}</span>
           <div className="w-48 h-px bg-[#cf8f7d]/20 relative overflow-hidden">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-[#cf8f7d]"
                animate={{ width: `${((current + 1) / INTERIOR_SLIDES.length) * 100}%` }}
              />
           </div>
           <span>0{INTERIOR_SLIDES.length}</span>
        </div>
      </div>
    </section>
  );
};

export default InteriorCarousel;
