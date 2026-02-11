
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ImageMasonary: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax offsets for the various images in the grid
  const y1 = useTransform(smoothScroll, [0, 1], ["0%", "-15%"]);
  const y2 = useTransform(smoothScroll, [0, 1], ["10%", "-10%"]);
  const y3 = useTransform(smoothScroll, [0, 1], ["5%", "-20%"]);
  const y4 = useTransform(smoothScroll, [0, 1], ["20%", "-30%"]);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-white text-primary pt-32 md:pt-48 overflow-hidden"
    >
      <div className="container-h px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8">
            <motion.div style={{ y: y1 }} className="aspect-4/5 md:aspect-square overflow-hidden rounded-sm shadow-xl">
              <img 
                src="/assets/images/horizon/amenities-gallery/kids-area-01.jpg" 
                alt="English Lawn Leisure" 
                className="w-full h-full object-cover grayscale-[0.1]"
              />
            </motion.div>
          </div>

          <div className="md:col-span-3 md:col-start-10 mt-12 md:mt-24">
            <div className="flex flex-col gap-12">
              <motion.div style={{ y: y2 }} className="aspect-4/5 overflow-hidden rounded-sm shadow-lg">
                <img 
                  src="/assets/images/horizon/amenities-gallery/game-05.jpg" 
                  alt="Yoga Session" 
                  className="w-full h-full object-cover grayscale-[0.2]"
                />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-xs md:text-sm font-light leading-relaxed text-primary/70 uppercase tracking-widest"
              >
                The perfectly cut English lawn in front of the pavilion beckons to bask in the
                July sun. Or do a dozen sun salutations at a yoga class.
              </motion.p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-32">
          <div className="md:col-span-8 md:col-start-3">
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl lg:text-6xl font-serif text-primary leading-[1.1] tracking-tight"
            >
              You won't have to rush and waste time in traffic jams to spend the evening at dinner
              with family or friends.
            </motion.p>
          </div>
        </div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
  {/* LEFT IMAGE — occupies first 4 columns */}
  <div className="hidden md:block md:col-span-4 relative">
    <motion.div
      style={{ y: y2 }} // 👈 use a subtle parallax value
      className="
        w-[85%]
        aspect-3/4
        overflow-hidden
        rounded-sm
        shadow-xl
        mt-24
      "
    >
      <img
        src="/assets/images/horizon/amenities-gallery/Dastarkhwan-011.jpg"
        alt="Quiet Lounge"
        className="w-full h-full object-cover"
      />
    </motion.div>
  </div>

  {/* RIGHT MAIN BLOCK — existing content */}
  <div className="md:col-span-8 relative">
    <div className="relative">
      {/* MAIN IMAGE */}
      <motion.div
        style={{ y: y3 }}
        className="aspect-16/10 overflow-hidden rounded-sm shadow-xl"
      >
        <img
          src="/assets/images/horizon/amenities-gallery/pool-01.jpg"
          alt="Cozy Cafe Atmosphere"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* FLOATING DETAIL IMAGE */}
      <motion.div
        style={{ y: y4 }}
        className="
          absolute
          top-[-30%]
          right-[-10%]
          w-[40%]
          aspect-3/4
          overflow-hidden
          rounded-sm
          shadow-2xl
          z-20
          border-12 border-[#f9f4ef]
        "
      >
        <img
          src="/assets/images/horizon/amenities-gallery/jacuzzi-steam.jpg"
          alt="Interior Detail"
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  </div>
</div>

      {/* TEXT */}
      <div className="mt-12 md:mt-24">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-xl font-light leading-relaxed text-primary uppercase tracking-widest"
        >
          A cozy cafe, a cup of aromatic coffee and your favorite dish is just a
          short walk away. The atmosphere of peace and tranquility will allow
          you to put time on pause and completely dissolve in aromas, tastes and
          long conversations with loved ones.
        </motion.p>
      </div>

      </div>

      {/* Background Architectural Accent Lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-primary/10 z-0" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-primary/10 z-0" />
    </section>
  );
};

export default ImageMasonary;
