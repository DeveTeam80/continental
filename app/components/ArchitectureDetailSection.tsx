import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import ParallaxImage from "./ParallaxImage";

const ArchitectureDetailsSection: React.FC = () => {
  return (
    <section className="relative z-10 bg-white min-h-screen text-primary pt-12 pb-24 overflow-hidden">
      {/* Art Deco Flower SVG Pattern Background */}
      {/* <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none flex justify-center items-center">
        <svg
          width="842"
          height="1151"
          viewBox="0 0 842 1151"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[80%] h-auto max-w-4xl"
        >
          <path
            d="M841 262.147C841 412.175 730.822 510.2 619.654 594.241C532.277 660.297 421 773.504 421 888.853M841 262.147V524.294C841 674.322 730.822 772.347 619.654 856.388C532.277 922.444 421 1035.65 421 1151M841 262.147V0C841 150.028 730.822 248.053 619.654 332.094C532.277 398.15 421 511.357 421 626.706M421 1151C421 1035.65 309.723 922.444 222.346 856.388C111.178 772.347 1 674.322 1 524.294V262.147M421 1151V888.853M421 888.853C421 773.504 309.723 660.297 222.346 594.241C111.178 510.2 1 412.175 1 262.147M421 888.853V626.706M421 626.706C421 511.357 309.723 398.15 222.346 332.094C111.178 248.053 1 150.028 1 0V262.147M421 626.706V365.119M619.654 70.5075C532.277 136.563 421 249.771 421 365.119M421 365.119C421 249.771 309.723 136.563 222.346 70.5075M421 365.119V102.972"
            stroke="#0075bb"
            strokeWidth="1"
          />
        </svg>
      </div> */}

      <div className="container mx-auto pl-6 relative z-10 max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 max-w-7xl mx-auto text-center"
        >
          <div className="max-w-full mx-auto text-center px-10 py-20">
            <p className="text-[2.5vw] leading-relaxed tracking-wide text-secondary uppercase">
              This vision is carried seamlessly indoors through interiors by
              Saylas Interiors, where spatial planning, material choices, and
              subtle detailing come together to create homes that feel calm,
              grounded, and effortlessly sophisticated.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Quote and Interview */}
          <div className="lg:col-span-5 flex flex-col gap-[6rem]">
            {/* The Architect's Quote */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="border-l border-primary pl-8"
            >
              <blockquote className="text-xl md:text-xl font-serif text-secondary leading-relaxed mb-8">
                Behind the elegance lies advanced construction intelligence.
                MWAN technology brings greater precision, enhanced safety, and
                long-term structural resilience, resulting in cleaner layouts,
                dependable quality, and homes that age gracefully. Innovation
                here works quietly, supporting everyday life without ever
                demanding attention.
              </blockquote>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-widest uppercase text-secondary">
                  Construction Intelligence
                </span>
                {/* <span className="text-xs tracking-widest uppercase text-primary">
                  founder of GAFA bureau
                </span> */}
              </div>
            </motion.div>

            {/* Architects Interview Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="group cursor-pointer"
            >
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-secondary mb-6">
                ARCHITECTS INTERVIEW
              </p>
              <div className="relative aspect-video rounded-sm overflow-hidden shadow-xl max-w-sm">
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
                  alt="Architects"
                  className="w-full h-full"
                  imgClassName="grayscale group-hover:grayscale-0 transition-all duration-700"
                  speed={0.08}
                />
                <div className="absolute inset-0 bg-secondary/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                    <Play
                      size={24}
                      className="text-white fill-current translate-x-0.5"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Main Visual and Navigation */}
          <div className="lg:col-span-7 relative">
            {/* IMAGE FRAME */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative aspect-[4/3] md:aspect-[4/3] overflow-hidden rounded-sm shadow-2xl"
            >
              <ParallaxImage
                src="assets/images/horizon/horizon-3.png"
                alt="Architecture Close Up"
                className="w-full h-full"
                speed={0.3}
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* ARCHITECTURE CTA ,  LEFT SIDE */}
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="
      absolute
      top-1/2
      -left-20
      -translate-y-1/2
      w-40 h-40
      rounded-full
      bg-gradient-gold
      text-white
      flex items-center justify-center
      shadow-2xl
      z-30
      transition-transform duration-500
      hover:scale-105
    "
            >
              <span className="text-[11px] font-semibold tracking-[0.4em] uppercase">
                Architecture
              </span>
            </motion.button>

            {/* Decorative corners */}
            <div className="absolute -top-12 -left-12 w-32 h-32 border-t border-l border-primary/30 pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 border-b border-r border-primary/30 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Subtle bottom scroll hint */}
      {/* <div className="mt-40 flex justify-center">
        <div className="w-px h-24 bg-gradient-to-b from-[#ca8c19] to-transparent" />
      </div> */}
    </section>
  );
};

export default ArchitectureDetailsSection;
