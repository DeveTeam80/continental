
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from '../../components/heights/Reveal';

export const BacklightSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const patternY = useTransform(scrollYProgress, [0, 1], ["10vh", "-10vh"]);
  const mainImageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-era-navy py-24 md:py-32 overflow-hidden"
    >
      {/* Intricate Art Deco Background Pattern */}
      <motion.div 
        style={{ y: patternY }}
        className="absolute inset-0 opacity-20 pointer-events-none z-0"
      >
        <svg className="w-full h-full" width="1440" height="721" viewBox="0 0 1440 721" fill="none" preserveAspectRatio="xMidYMid slice">
          <path d="M1440 0C1440 132.549 1332.55 240 1200 240M1200 240C1332.55 240 1440 347.451 1440 480M1200 240C1067.45 240 960 132.549 960 0M1200 240C1067.45 240 960 347.451 960 480" stroke="url(#backlight_gradient)" strokeWidth="1" />
          <path d="M720 240C852.548 240 960 347.451 960 480M720 240C587.452 240 480 132.549 480 0M720 240C587.452 240 480 347.451 480 480" stroke="url(#backlight_gradient)" strokeWidth="1" />
          <path d="M240 240C372.548 240 480 347.451 480 480M240 240C107.452 240 0 132.549 0 0" stroke="url(#backlight_gradient)" strokeWidth="1" />
          <defs>
            <linearGradient id="backlight_gradient" x1="1440" y1="360" x2="0" y2="360" gradientUnits="userSpaceOnUse">
              <stop stopColor="#CF8F7D" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#E0B196" stopOpacity="0.6" />
              <stop offset="1" stopColor="#CF8F7D" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="container mx-auto px-4 md:px-12 relative z-10">
        {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="md:col-start-5 md:col-span-7">
            <Reveal delay={0.2}>
              <p className="text-2xl md:text-4xl font-serif leading-tight opacity-90">
                When night falls on the city and the city flashes with myriads of colorful lights, ERA remains intelligent.
              </p>
            </Reveal>
          </div>
        </div> */}

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left Column: Video & Small Text */}
          <div className="md:col-span-4 space-y-8">
            <Reveal direction="right">
              <div className="aspect-video relative overflow-hidden rounded-sm shadow-2xl bg-black">
                <iframe 
                  className="absolute inset-0 w-full h-full scale-[1.3]"
                  src="https://player.vimeo.com/video/941142471?loop=1&muted=1&autoplay=1&autopause=0&background=1" 
                  allow="autoplay; encrypted-media" 
                  title="Architectural Illumination"
                />
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-sm font-sans font-light opacity-70 leading-relaxed max-w-xs">
                The delicate architectural illumination of the towers is designed to manifest the Art Deco soul of modern architecture: richness of form and elegance of detail, brass pylons and vegetal patterns.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Large Image & Secondary Text */}
          <div className="md:col-span-8 space-y-10">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
              <motion.img 
                style={{ y: mainImageY }}
                src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=2000" 
                alt="Golden Architectural Light"
                className="w-full h-full object-cover scale-110"
              />
              <div className="absolute inset-0 bg-era-navy/20 mix-blend-overlay" />
            </div>
            <Reveal delay={0.4} direction="left">
              <p className="text-base font-sans font-light opacity-80 leading-relaxed max-w-2xl">
                The restrained golden light of the color temperature is an homage to the classic ornaments of the style, which were often created using noble metallic tones. The light crown and active illumination of the lower floors allow the center of each tower to dissolve into darkness. This is how ERA becomes light and weightless.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
