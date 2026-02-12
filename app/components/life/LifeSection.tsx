import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { IntroPattern } from "../LogoPattern";

const LifeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Parallax transforms for various elements
  const patternY = useTransform(smoothScroll, [0, 1], ["0%", "-10%"]);
  const image1Y = useTransform(smoothScroll, [0, 1], ["10%", "-10%"]);
  const image2Y = useTransform(smoothScroll, [0, 1], ["20%", "-20%"]);
  const image3Y = useTransform(smoothScroll, [0, 1], ["5%", "-15%"]);
  const image4Y = useTransform(smoothScroll, [0.6, 1], ["0%", "20%"]);
  const imageY = useTransform(smoothScroll, [0, 1], [50, -50]);

  /* Image motion */
  const imageScale = useTransform(smoothScroll, [0.35, 1], [1.05, 1]);
  const imageInsideY = useTransform(smoothScroll, [0.35, 1], ["6%", "0%"]);
  const archRadius = useTransform(
    smoothScroll,
    [0.4, 0.8, 0.9],
    ["1000px 1000px 0 0", "500px 500px 0 0", "0px 0px 0 0"],
  );
  return (
    <section
      id="outside"
      ref={sectionRef}
      className="relative bg-secondary text-white pt-32 overflow-hidden"
    >
      {/* BACKGROUND PATTERN 1: The Geometric Grid */}
      <div className="absolute top-0 left-0 w-full h-[120vh] pointer-events-none opacity-20">
        <motion.div style={{ y: patternY }} className="w-full h-full">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1202 601"
            fill="none"
            className="pattern w-full h-auto"
          >
            <path
              vectorEffect="non-scaling-stroke"
              d="M1201 601C1201 490.543 1111.46 401 1001 401M1001 401C1111.46 401 1201 311.457 1201 201M1001 401C890.543 401 801 490.543 801 601C801 490.543 711.456 401 601 401M1001 401C890.543 401 801 311.457 801 201"
              stroke="url(#gradient1)"
            />
            <path
              vectorEffect="non-scaling-stroke"
              d="M601 401C711.456 401 801 311.457 801 201M601 401C490.543 401 401 490.543 401 601C401 490.543 311.457 401 201 401"
              stroke="url(#gradient1)"
            />
            <path
              vectorEffect="non-scaling-stroke"
              d="M201 401C311.457 401 401 311.457 401 201M201 401C90.5434 401 1 490.543 1 601"
              stroke="url(#gradient1)"
            />
            <defs>
              <linearGradient
                id="gradient1"
                x1="0"
                y1="0"
                x2="1200"
                y2="600"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#0075bb" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#0075bb" />
                <stop offset="1" stopColor="#0075bb" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>

      <div className="container-h relative z-10 px-6 max-w-7xl mx-auto">
        {/* BLOCK 1: Escape to the countryside */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-48">
          <div className="md:col-span-4 flex flex-col gap-8">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-5xl font-serif text-gradient-gold leading-tight"
            >
              Escape <br /> to the countryside
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-white/70 text-base font-light leading-relaxed max-w-sm"
            >
              ERA draws on English park art to recapture the carefree nature of
              urban nature. From whatever angle you look at the ERA courtyard,
              it will remind you of a postcard taken by a talented nature
              photographer.
            </motion.p>
          </div>

          <div className="md:col-span-1" />

          <div className="md:col-span-7">
            <motion.div
              style={{ y: image1Y }}
              className="aspect-4/3 overflow-hidden rounded-sm shadow-2xl"
            >
              <img
                src="/assets/images/horizon/amenities-gallery/lobby-ent-03.jpg"
                alt="English Park Art"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 mb-25">
          <div className="md:col-start-9 md:col-span-4 flex flex-col gap-8">
            <p className="text-white/60 text-sm font-light leading-relaxed">
              The meticulous work of Gafas landscape architects, who filigree
              ERA's landscapes down to the finest lines and halftones, is
              responsible for this sense of naturalness and authenticity.
            </p>
            <button className="self-start px-10 py-4 border border-white/20 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-primary transition-all">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* BACKGROUND PATTERN 2: The Flower Motif */}
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-full max-w-4xl pointer-events-none opacity-20">
          <svg
            width="100%"
            height="auto"
            viewBox="0 0 840 1140"
            fill="none"
            className="w-full h-auto"
          >
            <path
              vectorEffect="non-scaling-stroke"
              d="M840 206.042V468.062C840 618.019 729.822 715.995 618.654 799.997C531.277 866.021 420 979.174 420 1094.47"
              stroke="#0075bb"
              strokeOpacity="0.5"
            />
            <path
              vectorEffect="non-scaling-stroke"
              d="M420 1094.47C420 979.174 308.723 866.021 221.346 799.997C110.178 715.995 0 618.019 0 468.062V206.042"
              stroke="#0075bb"
              strokeOpacity="0.5"
            />
          </svg>
        </div>

        {/* BLOCK 2: Journey through times */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            {/* Right Image */}
            <div className="hidden md:block float-right w-[40%] ml-12 mb-88">
              <img
                src="/assets/images/horizon/amenities-gallery/game-02.jpg"
                alt=""
                className="w-full h-auto object-cover shadow-lg"
              />
            </div>

            {/* Left Image */}
            <div className="w-full md:w-[50%] float-left mr-12 mb-8 aspect-3/4">
              <img
                src="/assets/images/horizon/amenities-gallery/lifr-lobby-ent-01.jpg"
                alt=""
                className="w-full h-auto object-cover aspect-3/4"
              />
            </div>

            {/* Editorial Text */}
            <p className="joy-editorial-text clear-right text-3xl leading-relaxed tracking-wide text-primary uppercase">
              <span className="text-gradient-gold font-medium">
                Life at Continental Horizon is shaped around calm, continuity,
                and connection. Shared spaces and curated amenities are designed
                to feel natural, not crowded, encouraging comfort, privacy, and
                a sense of belonging. It is an environment where families feel
                secure, daily routines flow effortlessly, and community feels
                familiar, not forced.
              </span>
            </p>

            <div className="clear-both" />
          </div>
        </div>
      </div>
      <div className="relative">
        <IntroPattern />

        {/* BLOCK 3: Arch Visual */}
        <div className="relative z-20 -mt-[80vh]">
          <div
            className="relative w-full h-[200vh] overflow-hidden aspect-3/4 rounded-t-[1000px] rounded-b-none"
          >
            <motion.div
              style={{
                scale: imageScale,
                y: imageInsideY,
              }}
              className="w-full h-full overflow-hidden relative"
            >
              <img
                src="/assets/images/horizon/amenities-gallery/lobby-ent-01.jpg"
                alt="Art Deco Architecture"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Soft fade at bottom */}
            <div className="absolute inset-0 pointer-events-none" />
            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-end p-12 md:p-24 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="max-w-md text-right flex flex-col items-end"
              >
                <div className="w-16 h-px bg-primary mb-8" />
                <p className="text-lg md:text-xl font-light text-white/80 leading-relaxed italic">
                  Through vine-covered arches you can get inside these green
                  walls, into the heart of ERA ,  the central park.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifeSection;
