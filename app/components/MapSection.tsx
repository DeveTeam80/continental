import React from "react";

import { motion, MotionValue, useTransform } from "framer-motion";

import { MapPin } from "lucide-react";

interface MapProps {
  progress: MotionValue<number>;
}

const MapSection: React.FC<MapProps> = ({ progress }) => {
  // Map starts appearing at 30% scroll and is fully set by 60%

  // It stays visible until the very end

  const mapScale = useTransform(progress, [0.3, 0.6, 0.9], [0.7, 1, 1.05]);

  const mapOpacity = useTransform(progress, [0.3, 0.5], [0, 1]);

  const contentY = useTransform(progress, [0.5, 0.7], [50, 0]);

  const contentOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);

  return (
    // Changed to h-full so it fills the sticky parent

    <div className="relative h-full w-full flex items-center justify-center p-6 md:p-12 overflow-hidden">
      <motion.div
        style={{ scale: mapScale, opacity: mapOpacity }}
        className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
      >
        <img
          src="https://picsum.photos/id/16/1600/900"
          alt="3D Map"
          className="w-full h-full object-cover"
        />

        {/* Overlay Content */}

        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 md:p-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary rounded-full text-white">
              <MapPin size={24} />
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-white">
              Prime Location
            </h3>
          </div>

          <p className="max-w-xl text-white/70 text-lg leading-relaxed mb-8">
            Nestled at the intersection of history and innovation...
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2 text-white group"
          >
            <span className="h-px w-8 bg-primary transition-all group-hover:w-16" />

            <span className="uppercase tracking-widest text-sm font-medium">
              Explore 3D Map
            </span>
          </a>
        </motion.div>

        {/* Map UI */}

        <div className="absolute top-8 right-8 flex flex-col gap-4">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/20 hover:bg-white/20 cursor-pointer transition-colors">
            +
          </div>

          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-white border border-white/20 hover:bg-white/20 cursor-pointer transition-colors">
            -
          </div>
        </div>
      </motion.div>

      {/* Decorations */}

      <motion.div
        style={{ opacity: mapOpacity }}
        animate={{ y: [0, 0, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-12 w-24 h-24 border border-primary/20 rounded-full hidden xl:block"
      />
    </div>
  );
};

export default MapSection;
