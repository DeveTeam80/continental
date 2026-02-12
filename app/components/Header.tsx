"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu } from "lucide-react";

interface HeaderProps {
  onMenuOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuOpen }) => {
  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothScrollY, [0, 400], [1, 0]);
  const y = useTransform(smoothScrollY, [0, 400], [0, -40]);
  const pointerEvents = useTransform(opacity, (v) => (v < 0.1 ? "none" : "auto"));

  return (
    <motion.header
      style={{ opacity, y, pointerEvents }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex items-center justify-between"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="bg-gradient-gold text-secondary px-6 py-2.5 rounded-full flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:scale-[1.04] transition-transform duration-500 shadow-lg" onClick={onMenuOpen}>
          <Menu size={16} />
          MENU
        </button>

        <div className="relative p-px rounded-full bg-gradient-gold group hover:scale-[1.04] transition-transform duration-500 hidden md:block">
          <button className="w-full h-full px-6 py-2.5 rounded-full bg-secondary text-white text-xs font-medium uppercase tracking-wider group-hover:bg-white group-hover:text-secondary transition-colors duration-500">
            SELECT APARTMENT
          </button>
        </div>

        <div className="relative p-px rounded-full bg-gradient-gold group hover:scale-[1.04] transition-transform duration-500 hidden md:block">
          <button className="w-full h-full px-6 py-2.5 rounded-full bg-secondary text-white text-xs font-medium uppercase tracking-wider group-hover:bg-white group-hover:text-secondary transition-colors duration-500">
            VIRTUAL TOUR
          </button>
        </div>
      </div>

      {/* Logo - Updated Font */}
      <div className="absolute left-1/2 -translate-x-1/2">
        {/* 3. Apply the font class here */}
        <div className={`text-2xl md:text-3xl font-serif tracking-[0.15em] font-normal text-white text-center`}>
          CONTINENTAL GROUP
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <button className="bg-gradient-gold text-secondary px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:scale-[1.04] transition-all duration-500 shadow-lg">
          REQUEST A CALL
        </button>
      </div>
    </motion.header>
  );
};

export default Header;