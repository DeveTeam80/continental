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
    title: "Rendezvous with nature",
    subtitle: "apartments with terraces",
    description:
      "24 unique apartments with corner terraces open up the city panorama as far as the eye can see. Here you can be yourself and forget about the outside world: put your hands in the spring rain, watch the July sunsets on the deckchairs and catch the first snowflakes with your palms.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Rest in the fresh air",
    subtitle: "apartments with balconettes",
    description:
      "Feel the sun on your skin, breathe in the fresh morning air, and appreciate the quiet. With an ERA apartment, you don't need to leave the city to experience the tranquility of nature. Every time you open your balconette doors, it's like taking a little stroll.",
    image:
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Have the morning all to yourself",
    subtitle: "master bedroom apartments",
    description:
      "Parents juggle errands and countless kids' activities. However, besides responsibilities, parents also have privileges. One of them is a master bedroom in ERA. Complete with a private bathroom and ample closet space, it's your personal sanctuary where you can savor those peaceful mornings.",
    image:
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Reach for the sky",
    subtitle: "top floor apartments",
    description:
      "Nestled atop ERA’s towers, these 24 exclusive residences redefine everyday luxury. With soaring 4.3-meter ceilings and floor-to-ceiling windows, they offer unparalleled space and breathtaking vistas. Enjoy panoramic views of city, as the city gazes back in awe at ERA.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Hear the wind whisper",
    subtitle: "apartments with loggias",
    description:
      "Imagine your Saturday mornings accompanied by the rustling of leaves, and your evenings filled with the cheerful chatter of swallows. You'll fall in love with the sounds of the world in a home with a spacious loggia balcony.",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Be brimming with hospitality",
    subtitle: "apartments with open-plan kitchens",
    description:
      "The wise men say that friends are a second family. These generous kitchens, spanning up to 20 square meters, are perfect for bringing two families together. Imagine sharing holiday memories or preparing a feast with loved ones.",
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Head and shoulders above",
    subtitle: "apartments with soaring ceilings",
    description:
      "Higher windows and lower sills bath every corner in natural light. With ceilings reaching 3.3 meters, even the largest rooms maintain their harmonious proportions. A variety of window styles, from arched to French, offer stunning views.",
    image:
      "https://images.unsplash.com/photo-1464890100898-a385f744067f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Create your reality",
    subtitle: "whitebox apartments",
    description:
      "Whitebox apartments at ERA are a blank canvas, ready for your personal masterpiece. ERA has taken care of the groundwork, so all you need to do is add your unique touch. Quickly transform your apartment into a space that reflects your style.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1200",
  },
];

export const AptSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // UPDATED PHYSICS: Looser spring for a "floaty/smooth" luxury feel
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40, // Was 100. Lower = more "lag" behind scroll
    damping: 20, // Was 30. Lower = smoother settling
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
              Exclusive
              apartments
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
          <div className="md:col-span-5 pt-8 md:pt-20 flex flex-col h-full">
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
