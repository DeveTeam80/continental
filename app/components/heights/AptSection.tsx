import React, { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Reveal } from "./Reveal";

const slides = [
  {
    title: "An Arrival Worthy of the Address",
    subtitle: "grand entrance lobby",
    description:
      "A double-height lobby finished in rich materials and warm lighting sets the tone the moment you enter. Thoughtfully arranged seating lounges create a space to pause, welcome guests, or simply enjoy the quiet dignity of your surroundings.",
    image: "/assets/images/horizon/amenities-gallery/lobby-ent-01.jpg",
  },
  {
    title: "Breathe Between Moments",
    subtitle: "landscaped garden spaces",
    description:
      "Lush garden areas offer residents a natural retreat within the building itself. Morning walks, evening conversations, or a quiet moment alone — the outdoors becomes part of everyday life, not a destination you must travel to.",
    image: "/assets/images/heights-garden.webp",
  },
  {
    title: "Effortless Vertical Living",
    subtitle: "six grand high-speed lifts",
    description:
      "Six spacious lifts ensure seamless movement from parking to penthouse levels. Reduced wait times, smooth transitions, and everyday convenience — because true luxury feels effortless.",
    image: "/assets/images/horizon/amenities-gallery/lifr-lobby-ent-01.jpg",
  },
  {
    title: "Fitness, Without Compromise",
    subtitle: "private gymnasium",
    description:
      "A fully equipped fitness space designed for strength, focus, and consistency. Spacious, well-ventilated, and never overwhelming — your daily discipline begins just an elevator ride away.",
    image: "/assets/images/horizon/amenities-gallery/gym-02.jpg",
  },
  {
    title: "Swim in Complete Comfort",
    subtitle: "separate swimming pools",
    description:
      "Dedicated swimming pools for men, women, and children ensure privacy without sacrificing experience. Whether it’s early-morning laps or relaxed evening swims, every moment feels respectful and refined.",
    image: "/assets/images/horizon/amenities-gallery/pool-02.jpg",
  },
  {
    title: "Restore the Body. Calm the Mind.",
    subtitle: "steam & jacuzzi",
    description:
      "Unwind in thoughtfully designed steam rooms and jacuzzi spaces that offer quiet restoration. A place where the pace slows, the day softens, and well-being takes priority.",
    image: "/assets/images/horizon/amenities-gallery/jacuzzi-steam.jpg",
  },
  {
    title: "Play Across Generations",
    subtitle: "games & recreation lounge",
    description:
      "From carrom and pool tables to table tennis and air hockey, the games room encourages friendly competition and shared laughter — creating connections that extend beyond the home.",
    image: "/assets/images/horizon/amenities-gallery/game-04.jpg",
  },
  {
    title: "Childhood, Safely Celebrated",
    subtitle: "indoor kids’ play zone",
    description:
      "Slides, doll houses, and vibrant activity areas give children the freedom to explore within a secure environment. A space where imagination grows naturally within the comfort of community.",
    image: "/assets/images/horizon/amenities-gallery/kids-area-01.jpg",
  },
  {
    title: "Gather. Celebrate. Belong.",
    subtitle: "community hall",
    description:
      "A thoughtfully designed hall that accommodates cherished traditions — including the Bohri thaal system — allowing families to celebrate milestones and shared meals within their own address.",
    image: "/assets/images/horizon/amenities-gallery/Dastarkhwan-02.jpg",
  },
  {
    title: "Spaces for Reflection & Learning",
    subtitle: "dedicated study room",
    description:
      "Quiet rooms designed for focus and madrasa sessions create an environment of discipline and continuity — nurturing growth while staying rooted in values.",
    image: "/assets/images/horizon/amenities-gallery/madrassa.jpg",
  },
];

export const AptSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40, 
    damping: 20, 
    restDelta: 0.001,
  });

  // Parallax Transforms
  const textY = useTransform(smoothScroll, [0, 1], [100, -100]);
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-era-navy py-24 overflow-hidden"
    >
      {/* Background SVG Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          className="w-full h-full"
          width="1440"
          height="721"
          viewBox="0 0 1440 721"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M1440 721C1440 588.451 1332.55 481 1200 481M1200 481C1332.55 481 1440 373.549 1440 241M1200 481C1067.45 481 960 588.451 960 721C960 588.451 852.548 481 720 481M1200 481C1067.45 481 960 373.549 960 241"
            stroke="#0075bb"
            strokeWidth="1"
          />
          <path
            d="M720 481C852.548 481 960 373.549 960 241M720 481C587.452 481 480 588.451 480 721C480 588.451 372.548 481 240 481"
            stroke="#0075bb"
            strokeWidth="1"
          />
          <path
            d="M240 481C372.548 481 480 373.549 480 241M240 481C107.452 481 0 588.451 0 721"
            stroke="#0075bb"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <Reveal>
          <motion.div
            style={{ y: textY }}
            className="col-span-12 z-20 will-change-transform text-center lg:text-right relative"
          >
            <h2 className="text-[7vw] font-serif leading-tight mb-4 text-gradient-gold">
Thoughtful Amenities
            </h2>
          </motion.div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Image Slider Column */}
          <div className="md:col-span-7 relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-gray-900 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current}
                  src={slides[current].image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-era-navy/10 pointer-events-none" />
            </div>
          </div>

          {/* Content Column */}
          <div className="md:col-span-5 pt-[90%] flex flex-col h-full">
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={prev}
                className="w-12 h-12 flex items-center justify-center border border-era-brick/30 text-era-brick hover:bg-era-brick hover:text-era-navy transition-all duration-300 rounded-full"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button
                onClick={next}
                className="w-12 h-12 flex items-center justify-center border border-era-brick/30 text-era-brick hover:bg-era-brick hover:text-era-navy transition-all duration-300 rounded-full"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <span className="text-sm tracking-widest opacity-60 ml-4">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl md:text-3xl  text-era-brick mb-2">
                  {slides[current].title}
                </h3>
                <h4 className="text-xl md:text-2xl  italic text-white/90 mb-6">
                  — {slides[current].subtitle}
                </h4>
                <p className="text-lg font-light opacity-70 leading-relaxed max-w-md">
                  {slides[current].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
