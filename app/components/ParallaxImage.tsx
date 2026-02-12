"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ParallaxImage ,  A reusable component that makes images "float" as the user scrolls.
 *
 * The container clips overflow and the image is scaled to ~120% height with object-fit:cover.
 * As the element scrolls through the viewport, the image translates slightly in Y,
 * creating the subtle floating/parallax feel seen on the Era website.
 *
 * Usage:
 *   <ParallaxImage src="/path/to/image.png" alt="Description" />
 *   <ParallaxImage src="/path/to/image.png" alt="Description" speed={0.15} className="rounded-xl" />
 */

interface ParallaxImageProps {
    src: string;
    alt: string;
    /** Parallax speed: 0 = no effect, 0.1 = subtle, 0.2 = noticeable. Default: 0.1 */
    speed?: number;
    /** Additional classes applied to the outer container */
    className?: string;
    /** Additional classes applied to the <img> element */
    imgClassName?: string;
    /** Custom inline styles for the outer container */
    style?: React.CSSProperties;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
    src,
    alt,
    speed = 0.1,
    className = "",
    imgClassName = "",
    style,
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"], // 0 when top enters bottom, 1 when bottom exits top
    });

    // Map scroll progress (0→1) to a Y translation range
    // At start (element entering from bottom), image is shifted down
    // At end (element leaving from top), image is shifted up
    // This creates the "floaty" feeling
    const yPercent = useTransform(
        scrollYProgress,
        [0, 1],
        [speed * 100, -speed * 100]
    );

    return (
        <div
            ref={ref}
            className={`overflow-hidden ${className}`}
            style={style}
        >
            <motion.img
                src={src}
                alt={alt}
                style={{ y: yPercent }}
                className={`w-full h-[120%] object-cover ${imgClassName}`}
            />
        </div>
    );
};

export default ParallaxImage;
