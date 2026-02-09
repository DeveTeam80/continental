import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* =========================
   Carousel Data
========================= */
const PROJECTS = [
  {
    id: 1,
    title: "Continental Heights",
    description:
      "A landmark that redefined living in South Mumbai. Continental Heights is more than a residential address—it is a community built on trust, familiarity, and enduring values. Delivered as promised, it stands today as lived proof of our commitment to precision, care, and quality.",
    image: "assets/images/horizon/about-ch-01.jpg",
    link: "/continental-heights",
  },
  {
    id: 2,
    title: "Continental Horizon",
    description:
      "The next chapter in our legacy. Located in Mazgaon, Horizon is designed as a refined, future-ready address for families who value quality, proximity, and long-term confidence. A project built not just to sell, but to be lived in proudly.",
    image: "assets/images/horizon/horizons-5.png",
    link: "/continental-horizon",
  },
  // {
  //   id: 3,
  //   title: "Sahar Business Center",
  //   description:
  //     "A thoughtfully conceived commercial address, Sahar Business Center reflects Continental’s approach beyond residences. Strategically located and purpose-driven, it is designed to support ambition with clarity, efficiency, and long-term value.",
  //   image: "assets/images/horizon/horizons-7.png",
  //   link: "/sahar-business-center",
  // },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 800 : -800,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 800 : -800,
    opacity: 0,
    zIndex: 0,
  }),
};

const PlansSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const bgScale = useTransform(smoothProgress, [0, 1], [1.1, 1]);
  const titleX = useTransform(smoothProgress, [0, 0.4], [100, 0]);

  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  const paginate = (dir: number) => {
    setIndex(([prev]) => [
      (prev + dir + PROJECTS.length) % PROJECTS.length,
      dir,
    ]);
  };

  const activeProject = PROJECTS[index];

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-white text-secondary"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* BACKGROUND CAROUSEL */}
        <motion.div style={{ scale: bgScale }} className="absolute inset-0 z-0">
          <AnimatePresence initial={false} custom={direction}>
            <motion.img
              key={index}
              src={activeProject.image}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 260, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/20 to-transparent" />
        </motion.div>

        {/* EDITORIAL PANEL */}
        <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="
              ml-24
              w-[520px]
              h-[450px]
              bg-white
              px-12 py-14
              flex flex-col justify-between
              shadow-2xl
              pointer-events-auto
            "
          >
            <div className="space-y-8">
              <h3 className="text-sm tracking-[0.3em] uppercase text-primary">
                {activeProject.title}
              </h3>

              <div className="h-px w-full bg-secondary/20" />

              <p className="text-[15px] leading-relaxed text-secondary/80 max-w-[420px]">
                {activeProject.description}
              </p>

              <a
                href={activeProject.link}
                className="
                  inline-flex items-center justify-center w-fit
                  px-8 py-4 rounded-full
                  bg-primary text-white
                  text-[11px] font-semibold tracking-[0.3em] uppercase
                  hover:bg-secondary transition-colors
                "
              >
                Explore the Landmark
              </a>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs tracking-[0.3em] text-secondary/50">
                <span className="text-secondary">{index + 1}</span> /{" "}
                {PROJECTS.length}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => paginate(-1)}
                  className="
                    w-12 h-12 rounded-full
                    border border-secondary/30
                    flex items-center justify-center
                    text-secondary
                    hover:bg-primary hover:text-white
                    transition-all
                  "
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => paginate(1)}
                  className="
                    w-12 h-12 rounded-full
                    border border-secondary/30
                    flex items-center justify-center
                    text-secondary
                    hover:bg-primary hover:text-white
                    transition-all
                  "
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* TITLE */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 max-w-7xl mx-auto">
          <motion.h2
            style={{ x: titleX }}
            className="text-[5vw] font-serif uppercase leading-none text-right text-secondary pointer-events-none"
          >
            Our <br /> Projects
          </motion.h2>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
