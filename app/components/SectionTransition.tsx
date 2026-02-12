"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SectionTransition ,  Card-stack section transition effect.
 *
 * Wraps a section so that as it scrolls out of view, it:
 *   1. Translates downward (sinks behind the next section)
 *   2. Dims with a dark overlay
 *
 * The NEXT section (with higher z-index) slides over this one naturally,
 * creating the premium card-over-card feel from the Era legacy site.
 *
 * Based on the legacy 385.js `sectionOut` parallax pattern.
 */

interface SectionTransitionProps {
    children: React.ReactNode;
    /** Max downward translation in vh when section is leaving (default: 50) */
    translateAmount?: number;
    /** Max shade overlay opacity when section is leaving (default: 0.4) */
    shadeOpacity?: number;
    /** Additional classes for the wrapper */
    className?: string;
    /** z-index for stacking order ,  higher = on top */
    zIndex?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
    children,
    translateAmount = 30,
    shadeOpacity = 0.3,
    className = "",
    zIndex = 0,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        // 0 = section top hits viewport bottom (entering)
        // 1 = section bottom hits viewport top (fully left)
        offset: ["start end", "end start"],
    });

    // Translate downward only when section is mostly past viewport
    // 0.0–0.65 = no effect (section is in view)
    // 0.65–0.95 = section leaving → translate down
    const y = useTransform(
        scrollYProgress,
        [0.65, 0.95],
        ["0vh", `${translateAmount}vh`]
    );

    // Shade overlay: dims the section late as it's leaving
    const shade = useTransform(
        scrollYProgress,
        [0.65, 0.95],
        [0, shadeOpacity]
    );

    return (
        <motion.div
            ref={ref}
            style={{ y, position: "relative", zIndex }}
            className={`will-change-transform ${className}`}
        >
            {children}

            {/* Dark shade overlay */}
            <motion.div
                style={{ opacity: shade }}
                className="absolute inset-0 bg-black pointer-events-none z-[100]"
            />
        </motion.div>
    );
};

export default SectionTransition;
