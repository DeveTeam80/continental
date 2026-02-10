import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useScroll } from 'framer-motion';

// --- Ribbon Shaders ---

const ribbonVertexShader = `
uniform float uTime;
uniform float uSpeed;
uniform float uProgress;
uniform float uCoeficient;
uniform float uPower;
uniform float uAlpha;
uniform vec3 uCameraPosition;

varying float vAlpha;
varying vec2 vUv;

// --- Robust 2D Simplex Noise for WebGL 1.0 (Fixed) ---
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float noise(vec2 v) {
  vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  
  vec2 i1;
  float s = step(x0.y, x0.x); 
  i1 = vec2(s, 1.0 - s);

  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  
  i = mod(i, 289.0);
  
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  
  return 130.0 * dot(m, g);
}

float Y_MIN = -15.0; 
float Y_MAX = 15.0;

void main() {
    vUv = uv;
    
    vec3 vVertexNormal = normalize(normalMatrix * normal);
    vec3 vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    vec3 viewCameraToVertex = normalize((viewMatrix * vec4(vVertexWorldPosition - uCameraPosition, 0.0)).xyz);
    
    float alphaValue = clamp(uCoeficient + abs(dot(vVertexNormal, viewCameraToVertex)), 0.0, 1.0);
    float alphaGlow = clamp(pow(alphaValue, uPower), 0.0, 1.0);

    // Time based opacity
    float noiseAlpha = noise(vec2(vUv.x * 20.0, position.y * 0.5 + uTime * 0.5));
    float timeAlpha = noiseAlpha * 0.5 + 0.5;

    // Progress opacity
    float viewportPositionY = (position.y - Y_MIN) / (Y_MAX - Y_MIN);
    float progressAlpha = 1.0;

    if (uProgress <= 1.0) {
        progressAlpha = smoothstep(1.0 - uProgress, 1.1 - uProgress, viewportPositionY);
    } else {
        progressAlpha = smoothstep(uProgress - 1.0, uProgress - 0.9, 1.0 - viewportPositionY);
    }
    
    vAlpha = clamp(alphaGlow * timeAlpha * progressAlpha, 0.0, 1.0) * uAlpha;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const ribbonFragmentShader = `
uniform vec3 uColorNormal;
uniform vec3 uColorDark;
uniform vec3 uColorLight;

varying float vAlpha;

void main() {
    vec3 color = uColorNormal;

    // Light line color (glow)
    color = mix(color, uColorLight, smoothstep(0.2, 1.0, vAlpha) * 1.0);

    // Dark line color (core)
    color = mix(color, uColorDark, 1.0 - smoothstep(0.0, 0.15, vAlpha) * 1.0);

    gl_FragColor = vec4(color, vAlpha);
    
    if (gl_FragColor.a < 0.001) discard;
}
`;

// --- Logic ---

const GoldRibbonMaterial = shaderMaterial(
    {
        uTime: 0,
        uSpeed: 10.0,
        uProgress: 0,
        uCoeficient: 0.8, // Tuned for visibility
        uPower: 4.0,
        // UPDATED COLORS: Extracted from Art Deco legacy file + HDR Multiplier
        uColorNormal: new THREE.Color('#FF6524').multiplyScalar(2.0), // Vivid Orange
        uColorLight: new THREE.Color('#FF772E').multiplyScalar(2.0),  // Bright Highlight
        uColorDark: new THREE.Color('#260000'),                       // Deep Brown/Black
        uCameraPosition: new THREE.Vector3(0, 0, 0),
        uAlpha: 1.0
    },
    ribbonVertexShader,
    ribbonFragmentShader
);

extend({ GoldRibbonMaterial });

// Add usage to JSX Intrinsic Elements
declare module '@react-three/fiber' {
    interface ThreeElements {
        goldRibbonMaterial: any;
    }
}

interface GoldRibbonSceneProps {
    progress: number;
    mouseX: number;
}

const GoldRibbonScene: React.FC<GoldRibbonSceneProps> = ({ progress, mouseX }) => {
    const materialRef = useRef<any>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const { camera } = useThree();

    const path = useMemo(() => {
        const points: THREE.Vector3[] = [];
        const originalLoops = 3;
        const radius = 25; // Broad radius
        const height = 30; // Tall
        const segments = 800;

        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const angle = t * originalLoops * Math.PI * 2;
            const y = (t - 0.5) * height;

            // "Tornado" shape
            const currentRadius = radius * (0.8 + 0.4 * Math.sin(t * Math.PI));

            const x = Math.cos(angle) * currentRadius;
            const z = Math.sin(angle) * currentRadius;
            points.push(new THREE.Vector3(x, y, z));
        }
        return new THREE.CatmullRomCurve3(points);
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (materialRef.current) {
            materialRef.current.uTime = time;
            materialRef.current.uCameraPosition = camera.position;

            const lateProgress = Math.max(0, (progress - 0.30) * 1.54);
            materialRef.current.uProgress = lateProgress * 1.5;
        }

        if (meshRef.current) {
            meshRef.current.rotation.y += mouseX * 0.005;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, -5, 0]}>
            <tubeGeometry args={[path, 600, 0.15, 8, false]} />
            <goldRibbonMaterial
                ref={materialRef}
                transparent={true}
                side={THREE.DoubleSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

const GoldRibbon: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouseX, setMouseX] = React.useState(0);
    const [scrollProgress, setScrollProgress] = React.useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            setScrollProgress(latest);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            setMouseX(x);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full pointer-events-none">
            <Canvas
                gl={{ antialias: true, alpha: true }}
                camera={{
                    position: [0, 5, 55],
                    rotation: [-0.1, 0, 0],
                    fov: 60,
                }}
                style={{ background: "transparent" }}
            >
                <GoldRibbonScene progress={scrollProgress} mouseX={mouseX} />
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.2}
                        mipmapBlur
                        intensity={1.5}
                        radius={0.4}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default GoldRibbon;