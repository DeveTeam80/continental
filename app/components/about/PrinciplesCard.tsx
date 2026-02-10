import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Principle } from '@/types';

interface PrinciplesCardProps {
  principle: Principle;
}

const PrinciplesCard: React.FC<PrinciplesCardProps> = ({ principle }) => {
  return (
    <motion.div
      className="relative w-[320px] md:w-150 h-105 bg-secondary/20 border border-secondary/40 shrink-0 group overflow-hidden"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div className="relative w-[80%] h-[80%] flex items-end justify-center">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute border-t border-l border-r border-secondary/40 rounded-t-full"
              style={{
                width: `${40 + i * 20}%`,
                height: `${50 + i * 15}%`,
                bottom: '0',
                borderWidth: '1px'
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full w-full p-8 md:p-14 flex flex-col justify-between">
        {/* Title */}
        <h3 className="text-sm md:text-base font-medium tracking-[0.25em] text-[#0A1F44]">
          {principle.title}
        </h3>

        {/* Image */}
        <div className="grow flex items-center justify-center pb-20">
          <motion.div
            className="w-[75%] md:w-[65%] aspect-square flex items-center justify-center"
            variants={{
              rest: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: { duration: 0.4, ease: 'easeOut' }
              },
              hover: {
                opacity: 0,
                scale: 0.9,
                y: -30,
                transition: { duration: 0.4, ease: 'easeInOut' }
              }
            }}
          >
            <img
              src={principle.imageUrl}
              alt={principle.title}
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          className="absolute bottom-24 md:bottom-32 left-8 md:left-14 right-14"
          variants={{
            rest: { opacity: 0, y: 30 },
            hover: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1
              }
            }
          }}
        >
          <p className="text-[#0A1F44] text-sm md:text-xl font-light leading-relaxed max-w-[90%] md:max-w-[85%]">
            {principle.description}
          </p>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
          variants={{
            rest: { opacity: 1, scale: 1 },
            hover: {
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.3 }
            }
          }}
        >
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-secondary/80 flex items-center justify-center">
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-secondary/80" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrinciplesCard;
