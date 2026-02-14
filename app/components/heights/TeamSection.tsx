import React from "react";
import { Reveal } from "./Reveal";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface ParticipantCardProps {
  label: string;
  name: string;
  description: string;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  label,
  name,
  description,
}) => (
  <Reveal className="h-full">
    <div className="group relative h-80 md:h-100 w-full bg-[#112240] border border-white/5 overflow-hidden transition-all duration-700">
      {/* Front Face */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between transition-transform duration-700 group-hover:-translate-y-full">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-era-brick font-bold mb-4">
            {label}
          </p>
          <h3 className="text-2xl font-serif text-white opacity-90">{name}</h3>
        </div>

        <div className="w-12 h-12 border border-era-brick/30 flex items-center justify-center rounded-full group-hover:bg-era-brick group-hover:text-era-navy transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Back Face */}
      <div className="absolute inset-0 bg-era-brick p-10 flex flex-col justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-700">
        <p className="text-era-navy font-sans text-sm leading-relaxed font-medium">
          {description}
        </p>

        <div className="flex justify-between items-center border-t border-era-navy/20 pt-6">
          <span className="text-[10px] uppercase tracking-widest text-era-navy font-bold">
            {name}
          </span>
        </div>
      </div>
    </div>
  </Reveal>
);

export const TeamSection: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  const textY = useTransform(smoothScroll, [0, 1], [100, -100]);

  return (
    <section
      ref={containerRef}
      className="relative pb-24 md:pb-32 bg-era-navy overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        {/* <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-era-brick font-bold mb-6">
            About
          </p>
        </Reveal> */}

        <Reveal delay={0.1}>
          <motion.div style={{ y: textY }} className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-12">
              The Team
            </h2>
          </motion.div>
        </Reveal>

        <Reveal delay={0.2}>
                    <motion.div style={{ y: textY }} className="text-center lg:text-left">
          <p className="text-white/70 max-w-3xl mb-16 leading-relaxed">
            Continental Heights is powered by a distinguished team of
            developers, designers, engineers, and consultants whose collective
            expertise has shaped one of Mazgaon’s most respected landmark
            developments.
          </p>
          </motion.div>
        </Reveal>
        <Reveal delay={0.2}>
                    <motion.div style={{ y: textY }} className="text-center lg:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ParticipantCard
            label="Project Head"
            name="Mr. Samoon Rassiwala"
            description="With extensive experience in executing large-scale developments, Mr. Rassiwala’s strategic planning and deep understanding of cluster development regulations have ensured both value optimisation and long-term viability for Continental Heights."
          />

          <ParticipantCard
            label="Architectural Vision"
            name="Hafeez Contractor"
            description="Bringing refined design sensibility and urban awareness, the architectural leadership has shaped Continental Heights into a skyline-defining landmark — balancing elegance, proportion, and enduring appeal."
          />

          <ParticipantCard
            label="Structural Engineering"
            name="JW Consultants LLP"
            description="Specialists in advanced high-rise engineering, the structural team has delivered a robust and future-ready framework designed in accordance with the latest industry standards for safety, durability, and resilience."
          />

          <ParticipantCard
            label="Legal Advisory"
            name="Mr. Kaizar Merchant"
            description="A seasoned expert in real estate legal frameworks, Mr. Merchant has ensured complete regulatory compliance, providing residents with clarity, security, and a seamless ownership experience."
          />
        </div>
          </motion.div>
        </Reveal>
        {/* Supporting Consultants Section */}
        <div className="mt-20 border-t border-white/10 pt-12">
          <Reveal>
            <h3 className="text-lg text-era-brick uppercase tracking-[0.3em] mb-8">
              Specialist Consultants
            </h3>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-white/60 text-sm leading-relaxed">
            <p>
              <strong>Hydro Mechanical Consultants</strong>
              <br />
              Mechanical, Electrical & Plumbing
            </p>
            <p>
              <strong>Pristine Consultants</strong>
              <br />
              Environmental Advisory
            </p>
            <p>
              <strong>TAK Consultants</strong>
              <br />
              Vertical Traffic (Lift Systems)
            </p>
            <p>
              <strong>Aakar Abhinav Consultants Pvt. Ltd.</strong>
              <br />
              Traffic Planning
            </p>
            <p>
              <strong>Geocon International Pvt. Ltd.</strong>
              <br />
              Soil Investigations
            </p>
            <p>
              <strong>Fatehi & Associates</strong>
              <br />
              Chartered Accountants
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
