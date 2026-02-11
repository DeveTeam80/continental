"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS = [
  {
    title: "LIFE AT CONTINENTAL",
    href: "/life-at-continental",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000",
  },
  {
    title: "CONTINENTAL HEIGHTS",
    href: "/infrastructure",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000",
  },
  {
    title: "CONTINENTAL HORIZON",
    href: "/improvement",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000",
  },
  {
    title: "ABOUT US",
    href: "/about",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2000",
  },
  {
    title: "CONTACT US",
    href: "/contact",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000",
  },
  //   {
  //     title: "GALLERY",
  //     href: "/gallery",
  //     image:
  //       "https://images.unsplash.com/photo-1518005020250-6859b2827c1d?q=80&w=2000",
  //   },
  //   {
  //     title: "HOW BUY",
  //     href: "/how-buy",
  //     image:
  //       "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000",
  //   },
];
const SUB_LINKS = [
  "CONSTRUCTION PROGRESS",
  "CAREERS",
  "NEWS",
  "PRIVACY POLICY",
];

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [routeIndex, setRouteIndex] = useState<number | null>(null);

  // Sync route → routeIndex
  useEffect(() => {
    const index = ITEMS.findIndex((item) => item.href === pathname);
    setRouteIndex(index !== -1 ? index : null);
  }, [pathname]);

  // Final active index (single source of truth)
  const activeIndex = hoveredIndex !== null ? hoveredIndex : (routeIndex ?? 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-100 overflow-hidden"
        >
          {/* ───── BACKGROUND IMAGE SLIDER ───── */}
          <div className="absolute inset-0 overflow-hidden bg-secondary">
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-[45vw] min-w-90"
              animate={{
                y: `calc(50vh - ${activeIndex * 60}vh - 30vh)`,
              }}
              transition={{
                duration: 0.9,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              {ITEMS.map((item, i) => (
                <div key={i} className="h-[60vh] relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover
                      brightness-[0.55] contrast-[0.9] saturate-[0.75] my-10"
                  />
                </div>
              ))}
            </motion.div>

            <div className="absolute inset-0" />
            <div className="absolute top-0 h-[25%] w-full bg-linear-to-b from-secondary to-transparent" />
            <div className="absolute bottom-0 h-[25%] w-full bg-linear-to-t from-secondary to-transparent" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/felt.png')]" />
          </div>

          {/* ───── UI LAYER ───── */}
          <div className="relative z-10 h-full px-10 md:px-16 py-10 flex flex-col justify-between text-[#e6e1d8]">
            {/* Top Bar */}
            <div className="flex items-start justify-between">
              {/* LEFT SIDE — Close + Buttons */}
              <div className="flex items-center gap-6">
                <button className="bg-gradient-gold text-secondary px-6 py-2.5 rounded-full flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:scale-[1.04] transition-transform duration-500 shadow-lg" onClick={onClose}>
                  <X size={16} />
                </button>

                <div className="relative p-px rounded-full bg-gradient-gold group hover:scale-[1.04] transition-transform duration-500 hidden md:block">
                  <button className="w-full h-full px-6 py-2.5 rounded-full bg-secondary text-white text-xs font-medium uppercase tracking-wider group-hover:bg-white group-hover:text-secondary transition-colors duration-500">
                    VIRTUAL TOUR
                  </button>
                </div>
              </div>{" "}
              {/* RIGHT SIDE — Logo */}
              <div className="hidden lg:flex items-center justify-center -mt-12.5">
                <img
                  src="/assets/images/continental-logo-01.png"
                  alt="Continental Logo"
                  className="w-40 h-auto invert brightness-0 opacity-80"
                />
              </div>
            </div>

            {/* Menu */}
            <div className="flex flex-1 items-center">
              <div className="pl-6 md:pl-16">
                {ITEMS.map((item, i) => {
                  const isActive =
                    hoveredIndex === i ||
                    (hoveredIndex === null && routeIndex === i);

                  return (
                    <button
                      key={item.title}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className={`block text-left font-serif uppercase tracking-wide leading-tight
                        text-[30px] md:text-[34px] lg:text-[38px] py-0.75
                        transition-colors duration-300
                        ${isActive ? "text-gradient-gold" : "text-white/35"}`}
                        onClick={() => {
  router.push(item.href);
  onClose();
}}

                    >
                      {item.title}
                    </button>
                  );
                })}

                <div className="mt-14 border-t border-white/10 pt-8 space-y-2">
                  {SUB_LINKS.map((link) => (
                    <div
                      key={link}
                      className="text-[9px] tracking-[0.3em] text-white/40 uppercase cursor-pointer hover:text-white"
                    >
                      {link}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center
                 text-white/60 hover:text-white hover:bg-white/10 transition"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center
                 text-white/60 hover:text-white hover:bg-white/10 transition"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center
                 text-white/60 hover:text-white hover:bg-white/10 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center
                 text-white/60 hover:text-white hover:bg-white/10 transition"
                  aria-label="Youtube"
                >
                  <Youtube size={16} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
