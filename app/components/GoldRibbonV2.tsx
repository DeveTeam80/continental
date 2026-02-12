"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useScroll } from "framer-motion";

/* ================================================================
   UTILITY ,  mapRange  (from original 16.js)
   ================================================================ */
function mapRange(
    v: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
    clamp = true
): number {
    const lo = outMin < outMax ? outMin : outMax;
    const hi = outMin < outMax ? outMax : outMin;
    const m = ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
    return clamp ? Math.max(lo, Math.min(hi, m)) : m;
}

/* ================================================================
   UTILITY ,  smoothstep  (from original 49.js)
   ================================================================ */
function ss(edge0: number, edge1: number, x: number): number {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
}

/* ================================================================
   SHADER ,  Fresnel rim glow  (from earlier working version)
   This approach produces the correct warm golden glow visual.
   ================================================================ */

const ribbonVertexShader = `
uniform float uTime;
uniform float uSpeed;
uniform float uProgress;
uniform vec3 uCameraPosition;

varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vNormal;
varying float vRevealAlpha;

// From original 237.js ,  value noise
float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
}

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPosition.xyz;

    // Time-based noise shimmer (original 237.js)
    float noiseAlpha = noise(vec2(position.y * 2.0 + uTime / uSpeed, 1.0));
    float timeAlpha = noiseAlpha * 0.5 + 0.5;

    // Progress-based reveal (bottom → top, original 237.js)
    float Y_MIN = -15.0;
    float Y_MAX = 15.0;
    float vpY = (position.y - Y_MIN) / (Y_MAX - Y_MIN);
    float progressAlpha = 1.0;
    if (uProgress <= 1.0) {
        progressAlpha = smoothstep(1.0 - uProgress, 1.35 - uProgress, vpY);
    } else {
        progressAlpha = smoothstep(uProgress - 1.0, uProgress - 0.4, 1.0 - vpY);
    }

    vRevealAlpha = clamp(timeAlpha * progressAlpha, 0.0, 1.0);

    gl_Position = projectionMatrix * mvPosition;
}
`;

const ribbonFragmentShader = `
uniform vec3 uColorNormal;
uniform vec3 uColorLight;
uniform vec3 uColorDark;
uniform float uAlpha;
uniform float uCoeficient;
uniform float uPower;

varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec2 vUv;
varying float vRevealAlpha;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);

    // Fresnel / Rim glow (produces the golden glow visual)
    float viewDot = dot(normal, viewDir);
    float fresnel = clamp(uCoeficient + abs(viewDot), 0.0, 1.0);
    float alpha = pow(fresnel, uPower);

    // Combine Fresnel with reveal
    alpha *= vRevealAlpha;

    // Color mixing ,  dark core → normal → light highlight
    vec3 finalColor = mix(uColorDark, uColorNormal, alpha);
    finalColor = mix(finalColor, uColorLight, pow(alpha, 2.0));

    gl_FragColor = vec4(finalColor, uAlpha * alpha);
    if (gl_FragColor.a < 0.001) discard;
}
`;

const GoldRibbonMat = shaderMaterial(
    {
        uTime: 0,
        uProgress: 0,
        uSpeed: 10.0,
        uColorNormal: new THREE.Color(),
        uColorLight: new THREE.Color(),
        uColorDark: new THREE.Color(),
        uAlpha: 1,
        uCoeficient: 0.1,
        uPower: 6.0,
        uCameraPosition: new THREE.Vector3(),
    },
    ribbonVertexShader,
    ribbonFragmentShader
);
extend({ GoldRibbonMat });

declare module "@react-three/fiber" {
    interface ThreeElements {
        goldRibbonMat: any;
    }
}

/* ================================================================
   HELIX CURVE  (ported from original 36.js)
   
   Correct structure with:
   - getRadiusAt() for varying ribbon thickness
   - edgeAlignment for bottom-aligned segments
   - smoothstep lift at top
   
   Scale = (radius - lineWidth) * baseScale  (from 19.js line 2714)
   ================================================================ */
interface HelixOpts {
    loops: number;
    direction: number;
    scale: [number, number, number];
    offset: number;
    length: number;
    varyingLoops: number;
    varyingLoopOffset: number;
    varyingMin: number;
    varyingMax: number;
    edgeRadius: number;
    edgeAlignment: string;
}

class HelixCurve extends THREE.Curve<THREE.Vector3> {
    opts: HelixOpts;
    constructor(opts: HelixOpts) {
        super();
        this.opts = opts;
    }

    getPoint(t: number, target = new THREE.Vector3()): THREE.Vector3 {
        const { scale, offset, length, direction, loops, edgeAlignment } = this.opts;

        // Map t [0,1] → subsection [offset, offset+length]
        const pos = mapRange(t, 0, 1, offset, offset + length);

        // Helix XYZ (36.js getXYZ)
        const x = Math.sin(Math.PI * 2 * pos * direction * loops);
        const z = Math.cos(Math.PI * 2 * pos * direction * loops);
        let y = loops > 1 ? pos - 0.5 : 0;
        if (loops > 1) y += ss(0.9, 1, pos) / 20;

        let yf = y;
        if (edgeAlignment === "bottom") {
            yf += (1 - this.getRadiusAt(t)) / -20;
        }

        return target.set(x * scale[0], yf * scale[1], z * scale[2]);
    }

    getRadiusAt(t: number): number {
        const { varyingLoops, varyingLoopOffset, varyingMin, varyingMax, edgeRadius } =
            this.opts;
        let vf = 1;
        if (varyingLoops) {
            vf = mapRange(
                Math.sin(Math.PI * varyingLoops * (t + varyingLoopOffset)),
                -1, 1, varyingMin, varyingMax
            );
        }
        let ef: number;
        if (t < edgeRadius) ef = Math.sin((Math.PI / 2) * t * (1 / edgeRadius));
        else if (t > 1 - edgeRadius) ef = Math.sin((Math.PI / 2) * (1 - t) * (1 / edgeRadius));
        else ef = 1;
        return ef * vf;
    }
}

/* ================================================================
   LINE DEFINITIONS  (from 132.js)
   ================================================================ */
interface LineConf {
    lineWidth: number;
    offset: number;
    length: number;
    colN: THREE.Color;
    colL: THREE.Color;
    colD: THREE.Color;
    pos: [number, number, number];
    coef: number;
    pow: number;
    edgeR: number;
    edgeA: string;
    vLoops: number;
    vOff: number;
    vMin: number;
    vMax: number;
    particles: number;
}

const HDR = 2.5; // HDR multiplier for additive blending brightness

const LINES: LineConf[] = [
    {
        // 1 ,  Main long ribbon + particles
        lineWidth: 0.25, offset: 0.07, length: 0.92,
        colN: new THREE.Color(1, 0.396, 0.141).multiplyScalar(HDR),
        colL: new THREE.Color(1, 0.396, 0.141).multiplyScalar(HDR),
        colD: new THREE.Color(1, 0.149, 0).multiplyScalar(HDR),
        pos: [0, 0, 0], coef: 0, pow: 2.5, edgeR: 0.05, edgeA: "center",
        vLoops: 8, vOff: 0.1, vMin: 0.75, vMax: 1, particles: 4000,
    },
    {
        // 2 ,  Wide accent, bottom-aligned
        lineWidth: 1.0, offset: 0.725, length: 0.2,
        colN: new THREE.Color(1, 0.467, 0.18).multiplyScalar(HDR),
        colL: new THREE.Color(1, 0.467, 0.18).multiplyScalar(HDR),
        colD: new THREE.Color(1, 0.149, 0).multiplyScalar(HDR),
        pos: [0, 2, 0], coef: 0, pow: 4.0, edgeR: 0.5, edgeA: "bottom",
        vLoops: 0, vOff: 0, vMin: 0.25, vMax: 1, particles: 0,
    },
    {
        // 3 ,  Thin accent
        lineWidth: 0.45, offset: 0.58, length: 0.11,
        colN: new THREE.Color(1, 0.51, 0.18).multiplyScalar(HDR),
        colL: new THREE.Color(1, 0.51, 0.18).multiplyScalar(HDR),
        colD: new THREE.Color(1, 0.149, 0).multiplyScalar(HDR),
        pos: [0, -0.75, 0], coef: 0.1, pow: 6, edgeR: 0.5, edgeA: "center",
        vLoops: 0, vOff: 0, vMin: 0.25, vMax: 1, particles: 0,
    },
    {
        // 4 ,  Small tail
        lineWidth: 0.6, offset: 0.245, length: 0.05,
        colN: new THREE.Color(1, 0.467, 0.18).multiplyScalar(HDR),
        colL: new THREE.Color(1, 0.467, 0.18).multiplyScalar(HDR),
        colD: new THREE.Color(1, 0.149, 0).multiplyScalar(HDR),
        pos: [0, -1.25, 0], coef: -0.1, pow: 8, edgeR: 0.5, edgeA: "center",
        vLoops: 0, vOff: 0, vMin: 0.25, vMax: 1, particles: 0,
    },
];

const OUTER_RADIUS = 30;
const SHARED_SCALE: [number, number, number] = [1, 0.75, 1];
const LOOPS = 2.7;
const DIR = -1;
const BASE_ROT_Y = -Math.PI / 2;

/* ================================================================
   SINGLE RIBBON  (correct HelixCurve + TubeGeometry)
   ================================================================ */
function SingleRibbon({
    cfg,
    progress,
    mouseX,
}: {
    cfg: LineConf;
    progress: number;
    mouseX: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const matRef = useRef<any>(null);
    const { camera } = useThree();

    const geometry = useMemo(() => {
        // Original 19.js line 2710-2716:
        //   curveScale = (radius - lineWidth) * options.scale
        //   tube = new TubeGeometry(curve, 200, lineWidth, 6, false)
        const r = OUTER_RADIUS - cfg.lineWidth;
        const curve = new HelixCurve({
            loops: LOOPS,
            direction: DIR,
            scale: [r * SHARED_SCALE[0], r * SHARED_SCALE[1], r * SHARED_SCALE[2]],
            offset: cfg.offset,
            length: cfg.length,
            varyingLoops: cfg.vLoops,
            varyingLoopOffset: cfg.vOff,
            varyingMin: cfg.vMin,
            varyingMax: cfg.vMax,
            edgeRadius: cfg.edgeR,
            edgeAlignment: cfg.edgeA,
        });
        return new THREE.TubeGeometry(curve, 400, cfg.lineWidth, 8, false);
    }, [cfg]);

    useFrame((state) => {
        if (matRef.current) {
            matRef.current.uTime = state.clock.getElapsedTime();
            matRef.current.uCameraPosition = camera.position;
            // Match V1's working progress mapping: delay start to 30%, scale by 1.5
            const lateProgress = Math.max(0, (progress - 0.30) * 1.54);
            matRef.current.uProgress = lateProgress * 1.2;
        }
        if (meshRef.current) {
            meshRef.current.rotation.y = BASE_ROT_Y - (mouseX - 0.5) * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={cfg.pos} geometry={geometry}>
            <goldRibbonMat
                ref={matRef}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uColorNormal={cfg.colN}
                uColorLight={cfg.colL}
                uColorDark={cfg.colD}
                uCoeficient={cfg.coef}
                uPower={cfg.pow}
            />
        </mesh>
    );
}

/* ================================================================
   PARTICLES ,  sparkles along the main ribbon
   GPU shader from original 238.js (vertex) + 88.js (fragment)
   Per-particle: Y-based reveal, side-fade, shimmer, size variation
   ================================================================ */

const particleVertexShader = `
uniform float size;
uniform float uCount;
uniform float uProgress;
uniform float uSpeed;
uniform float uTime;

varying float vOpacity;

float Y_MIN = -15.0;
float Y_MAX = 15.0;

float rand2(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}
float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);
    float res = mix(
        mix(rand2(ip), rand2(ip + vec2(1.0, 0.0)), u.x),
        mix(rand2(ip + vec2(0.0, 1.0)), rand2(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
}

void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = size;
    bool isPerspective = projectionMatrix[2][3] == -1.0;
    if (isPerspective) {
        gl_PointSize *= (1.0 / -mvPosition.z);
    }

    // Per-particle index [0..1]
    float index = float(gl_VertexID) / uCount;

    // Side fade ,  dim particles near screen edges
    vec4 clipSpace = projectionMatrix * mvPosition;
    vec3 viewSpace = clipSpace.xyz / clipSpace.w;
    float sideOpacity = smoothstep(0.2, 1.0, 1.0 - abs(viewSpace.x));

    // Progress-based Y reveal ,  same as ribbon
    float viewportPositionY = (position.y - Y_MIN) / (Y_MAX - Y_MIN);
    float progressOpacity = 1.0;
    if (uProgress <= 1.0) {
        progressOpacity = smoothstep(1.0 - uProgress, 1.35 - uProgress, viewportPositionY);
    } else {
        progressOpacity = smoothstep(uProgress - 1.0, uProgress - 0.4, 1.0 - viewportPositionY);
    }

    // Varied point size per particle
    float variation = (sin(index * 863.1274160392) + 1.0) * 0.5;
    gl_PointSize = (gl_PointSize + variation * gl_PointSize) * 0.5;

    // Opacity from point size
    float pointScale = gl_PointSize / size;
    float pointSizeOpacity = clamp(pointScale * 10.0, 0.25, 1.0);

    // Animated noise shimmer
    float animatedOpacity = noise(vec2(index * 86.31274160392 + uTime / uSpeed, 1.0)) * 0.8 + 0.2;

    vOpacity = sideOpacity * progressOpacity * pointSizeOpacity * animatedOpacity;
}
`;

const particleFragmentShader = `
uniform vec3 diffuse;
varying float vOpacity;

void main() {
    // Circular point shape
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

    gl_FragColor = vec4(diffuse, vOpacity * alpha);
    if (gl_FragColor.a < 0.001) discard;
}
`;

function Sparkles({
    cfg,
    progress,
    mouseX,
}: {
    cfg: LineConf;
    progress: number;
    mouseX: number;
}) {
    const ref = useRef<THREE.Points>(null);

    const geo = useMemo(() => {
        const r = OUTER_RADIUS - cfg.lineWidth;
        const curve = new HelixCurve({
            loops: LOOPS,
            direction: DIR,
            scale: [r * SHARED_SCALE[0], r * SHARED_SCALE[1], r * SHARED_SCALE[2]],
            offset: cfg.offset,
            length: cfg.length,
            varyingLoops: cfg.vLoops,
            varyingLoopOffset: cfg.vOff,
            varyingMin: cfg.vMin,
            varyingMax: cfg.vMax,
            edgeRadius: cfg.edgeR,
            edgeAlignment: cfg.edgeA,
        });

        const pos: number[] = [];
        for (let i = 0; i < cfg.particles; i++) {
            const pt = curve.getPoint(i / cfg.particles);
            pos.push(
                pt.x + (Math.random() - 0.5),
                pt.y + (Math.random() - 0.5),
                pt.z + (Math.random() - 0.5)
            );
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
        return g;
    }, [cfg]);

    const mat = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: particleVertexShader,
            fragmentShader: particleFragmentShader,
            uniforms: {
                size: { value: 50.0 },
                uCount: { value: cfg.particles },
                uProgress: { value: 0 },
                uSpeed: { value: 10.0 },
                uTime: { value: 0 },
                diffuse: { value: cfg.colN.clone().multiplyScalar(1 / HDR) },
            },
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
    }, [cfg]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = BASE_ROT_Y - (mouseX - 0.5) * 0.2;
        }
        mat.uniforms.uTime.value = state.clock.getElapsedTime();
        const lateProgress = Math.max(0, (progress - 0.30) * 1.54);
        mat.uniforms.uProgress.value = lateProgress * 1.2;
    });

    return (
        <points ref={ref} geometry={geo} material={mat} />
    );
}

/* ================================================================
   SCENE
   ================================================================ */
function Scene({
    progress,
    mouseX,
}: {
    progress: number;
    mouseX: number;
}) {
    return (
        <group>
            {LINES.map((l, i) => (
                <React.Fragment key={i}>
                    <SingleRibbon cfg={l} progress={progress} mouseX={mouseX} />
                    {l.particles > 0 && (
                        <Sparkles cfg={l} progress={progress} mouseX={mouseX} />
                    )}
                </React.Fragment>
            ))}
        </group>
    );
}

/* ================================================================
   WRAPPER ,  Canvas + scroll/mouse tracking
   Camera: position=[0,11,47], fov=90
   ================================================================ */
const GoldRibbonV2: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouseX, setMouseX] = useState(0.5);
    const [scrollProgress, setScrollProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    useEffect(() => {
        const unsub = scrollYProgress.on("change", (latest) => {
            setScrollProgress(latest);
        });
        return () => unsub();
    }, [scrollYProgress]);

    useEffect(() => {
        const h = (e: MouseEvent) => setMouseX(e.clientX / window.innerWidth);
        window.addEventListener("mousemove", h);
        return () => window.removeEventListener("mousemove", h);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full pointer-events-none">
            <Canvas
                gl={{ antialias: true, alpha: true }}
                camera={{
                    position: [0, 11, 40],
                    rotation: [-0.444, 0, 0],
                    fov: 90,
                    near: 0.1,
                    far: 1000,
                }}
                style={{ background: "transparent" }}
            >
                <Scene progress={scrollProgress} mouseX={mouseX} />
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0}
                        mipmapBlur
                        intensity={1.5}
                        radius={0.6}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default GoldRibbonV2;
