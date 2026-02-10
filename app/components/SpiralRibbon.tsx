"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Spiral curve formula from the original code
class SpiralCurve extends THREE.Curve<THREE.Vector3> {
    loops: number;
    direction: number;
    radius: number;
    scale: [number, number, number];

    constructor(
        loops = 2.7,
        direction = -1,
        radius = 35,
        // Reduced Y-scale (0.3) makes it flat like a pancake/disc, matching the "Era" reference
        scale: [number, number, number] = [1, 0.3, 1]
    ) {
        super();
        this.loops = loops;
        this.direction = direction;
        this.radius = radius;
        this.scale = scale;
    }

    getPoint(t: number, optionalTarget = new THREE.Vector3()) {
        const angle = 2 * Math.PI * t * this.loops * this.direction;
        const x = Math.sin(angle) * this.radius * this.scale[0];
        const y = (t - 0.5) * 60 * this.scale[1];
        const z = Math.cos(angle) * this.radius * this.scale[2];

        return optionalTarget.set(x, y, z);
    }
}

// Individual spiral ribbon line
interface RibbonLineProps {
    offset: number;
    length: number;
    lineWidth: number;
    color: THREE.Color;
    progress: number;
    mouseY: number;
}

function RibbonLine({
    offset,
    length,
    lineWidth,
    color,
    progress,
    mouseY,
}: RibbonLineProps) {
    const meshRef = useRef<THREE.Line>(null);
    const materialRef = useRef<THREE.LineBasicMaterial>(null);

    const curve = useMemo(() => new SpiralCurve(), []);

    const geometry = useMemo(() => {
        const points: THREE.Vector3[] = [];
        const segments = 10000; // INCREASED: Was 100. Smoothness is critical for large spiral.

        for (let i = 0; i <= segments; i++) {
            const t = offset + (i / segments) * length;
            if (t >= 0 && t <= 1) {
                points.push(curve.getPoint(t));
            }
        }

        return new THREE.BufferGeometry().setFromPoints(points);
    }, [curve, offset, length]);

    useFrame(() => {
        if (meshRef.current) {
            // UNWINDING ANIMATION: Rotate based on scroll progress
            // -Math.PI/2 puts it in initial position
            // + progress * 2 makes it spin/unwind as you scroll
            meshRef.current.rotation.y = -Math.PI / 2 + (progress * Math.PI) + (mouseY * 0.1);
        }

        if (materialRef.current) {
            // Updated Visibility Logic:
            // "Illuminates as we go down" -> Starts at 0
            // Uses a sharper curve (Math.pow) so it glows in quickly once scrolled
            const rawVisibility = Math.max(0, Math.min(1, (progress - offset * 0.5) / (length * 0.8)));
            const smoothedVisibility = Math.pow(rawVisibility, 2); // Ease in
            materialRef.current.opacity = smoothedVisibility; // Full opacity brightness
        }
    });

    return (
        <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: color,
            linewidth: lineWidth,
            transparent: true,
            opacity: 0,
            toneMapped: false, // CRITICAL: Allows color to go > 1 for Bloom
        }))} ref={meshRef}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial
                ref={materialRef}
                color={color}
                linewidth={lineWidth}
                transparent
                opacity={0}
                toneMapped={false}
            />
        </primitive>
    );
}

// Particles component removed as per user request for cleaner look

// Main 3D Scene
interface RibbonSceneProps {
    progress: number;
    mouseY: number;
}

function RibbonScene({ progress, mouseY }: RibbonSceneProps) {
    const lines = [
        {
            offset: 0.0,
            length: 1.0, // Full Spiral
            lineWidth: 5, // Thicker main ribbon
            color: new THREE.Color(4, 2, 0.5),
        },
        {
            offset: 0.5, // Starts halfway
            length: 0.8, // Almost full spiral (The "Second Ribbon")
            lineWidth: 4, // Thicker secondary ribbon
            color: new THREE.Color(4, 2, 0.8),
        },
        // Smaller accents
        {
            offset: 0.2,
            length: 0.15,
            lineWidth: 3, // Thicker accent
            color: new THREE.Color(4, 2.5, 0.8),
        },
    ];

    return (
        <group>
            {/* Particles Removed */}

            {lines.map((line, index) => (
                <RibbonLine
                    key={index}
                    offset={line.offset}
                    length={line.length}
                    lineWidth={line.lineWidth}
                    color={line.color}
                    progress={progress}
                    mouseY={mouseY}
                />
            ))}
        </group>
    );
}

// Wrapper component
const SpiralRibbon: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouseY, setMouseY] = React.useState(0.5);
    const [scrollProgress, setScrollProgress] = React.useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            // Map scroll to animation progress
            const mapped = Math.max(0, Math.min(1, (latest - 0.1) / 0.5));
            setScrollProgress(mapped);
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseY(e.clientY / window.innerHeight);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full pointer-events-none">
            <Canvas
                gl={{ antialias: true, alpha: true }} // ENABLED AA: Smooths out pixel aliasing

                // ADJUSTED TARGET: RESTORING EXACT ERA VALUES
                // The wide FOV (90) + Tilt (-0.444) creates the dynamic "sweeping" look.
                camera={{
                    position: [0, 11, 47],
                    rotation: [-0.444, 0, 0],
                    fov: 90,
                }}
                style={{ background: "transparent" }}
            >
                <RibbonScene
                    progress={scrollProgress}
                    mouseY={mouseY}
                />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.1} // Restored low threshold for GLOW
                        mipmapBlur
                        intensity={2} // High intensity for "Spark"
                        radius={0.1} // Tighter radius = Less "Haze/Hue effect", more sharp glow
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default SpiralRibbon;