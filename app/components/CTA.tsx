import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const NewEraSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
  });

  /* Subtle parallax */
  const imgY = useTransform(smoothScroll, [0, 1], ["0%", "-12%"]);

  const textOpacity = useTransform(smoothScroll, [0.15, 0.35], [0, 1]);
  const textY = useTransform(smoothScroll, [0.15, 0.35], [40, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-white"
    >
      {/* =========================
          BACKGROUND IMAGE
      ========================= */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-0 h-[150%] z-0"
      >
        <img
          src="assets/images/horizon/horizon-4.png"
          alt="Architecture"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* =========================
          SOFT WHITE OVERLAY
      ========================= */}
      {/* <div className="absolute inset-0 z-10 bg-white/60" /> */}

      {/* =========================
          CONTENT
      ========================= */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 text-center">

        {/* Eyebrow */}
        <motion.p
          style={{ opacity: textOpacity, y: textY }}
          className="text-secondary text-md tracking-[0.4em] uppercase mb-8"
        >
          Calm. Confident. Considered.
        </motion.p>

        {/* Main Title */}
        <h2 className="text-6xl md:text-8xl font-serif text-white mb-12">
          We Invite <br />
          <span className="italic">Conversations</span>
        </h2>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            relative
            w-64 h-64
            rounded-full
            bg-primary
            text-white
            flex flex-col items-center justify-center
            shadow-xl
            group
            overflow-hidden
          "
        >
          <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10 text-center px-4">Request a <br />Private Preview</span>
        </motion.button>
      </div>
    </section>
  );
};

export default NewEraSection;
