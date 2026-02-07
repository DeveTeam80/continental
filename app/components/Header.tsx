import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Heart, Grid2X2, Menu } from "lucide-react";

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  /* Smooth scroll signal */
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
  });

  /* Very soft fade + drift */
  const opacity = useTransform(smoothScroll, [0, 0.25], [1, 0]);
  const y = useTransform(smoothScroll, [0, 0.25], [0, -24]);

  return (
    <motion.header
      ref={headerRef}
      style={{ opacity, y }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
      }}
      className="
        absolute top-0 left-0 w-full z-50
        px-6 py-8
        flex items-center justify-between
        pointer-events-none
      "
    >
      {/* Left */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button className="bg-[#ca8c19] text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:scale-[1.04] transition-transform duration-500">
          <Menu size={16} />
          MENU
        </button>

        <button className="border border-black/20 text-[#0f395c] px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-500">
          SELECT APARTMENT
        </button>

        <button className="border border-black/20 text-[#0f395c] px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider backdrop-blur-sm hover:bg-black hover:text-white transition-all duration-500">
          VIRTUAL TOUR
        </button>
      </div>

      {/* Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="text-3xl font-serif tracking-[0.2em] font-light text-[#0f395c]">
          CONTINENTAL GROUP
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 pointer-events-auto">
        {/* <button className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all duration-500">
          <Heart size={18} />
        </button> */}

        <button className="bg-[#ca8c19] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all duration-500">
          REQUEST A CALL
        </button>

        {/* <button className="w-10 h-10 bg-[#ca8c19] text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all duration-500">
          <Grid2X2 size={18} />
        </button> */}
      </div>
    </motion.header>
  );
};

export default Header;
