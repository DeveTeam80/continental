
"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "./preloader.module.css";
import { usePathname } from "next/navigation";

const Preloader = () => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    // Reset preloader on route change? 
    // Usually preloaders run once per session or hard refresh. 
    // For now, we'll run it on mount.

    useEffect(() => {
        // Disable scrolling when preloader is active
        document.body.style.overflow = "hidden";

        const duration = 2500; // 2.5 seconds load time
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);

            // Easing: easeOutQuart
            const ease = 1 - Math.pow(1 - t, 4);

            setProgress(ease);

            if (containerRef.current) {
                containerRef.current.style.setProperty("--progress", ease.toString());
            }

            // Removed parallax for gradient as per user feedback

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                // Complete
                setTimeout(() => {
                    setIsLoaded(true);
                    document.body.style.overflow = "";
                    // Complete animation (fade out)
                    setTimeout(() => setIsHidden(true), 1200); // Wait for CSS transition
                }, 500);
            }
        };

        requestAnimationFrame(animate);

        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    if (isHidden) return null;

    return (
        <div
            ref={containerRef}
            className={`${styles.preloader} ${isLoaded ? styles.invisible : ""}`}
        >
            {/* Background Pattern */}
            <div className={styles.preloader__pattern}>
                <div className={styles.gradient_animation}></div>
                <svg width="100%" height="100%" viewBox="0 0 1442 721" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.999942 0C0.999942 132.549 108.452 240 241 240M241 240C108.452 240 0.999942 347.451 0.999942 480M241 240C373.548 240 481 132.549 481 0C481 132.549 588.452 240 721 240M241 240C373.548 240 481 347.451 481 480M241 240C241 372.549 133.548 480 0.999942 480M241 240C241 372.549 348.452 480 481 480M0.999942 480C0.999942 612.549 108.452 720 241 720M0.999942 480C133.548 480 241 587.451 241 720M721 240C588.452 240 481 347.451 481 480M721 240C853.548 240 961 132.549 961 0C961 132.549 1068.45 240 1201 240M721 240C853.548 240 961 347.451 961 480M721 240C721 372.549 613.548 480 481 480M721 240C721 372.549 828.452 480 961 480M481 480C481 612.549 373.548 720 241 720M481 480C481 612.549 588.452 720 721 720M481 480C348.452 480 241 587.451 241 720M481 480C613.548 480 721 587.451 721 720M1201 240C1068.45 240 961 347.451 961 480M1201 240C1333.55 240 1441 132.549 1441 0M1201 240C1333.55 240 1441 347.451 1441 480M1201 240C1201 372.549 1093.55 480 961 480M1201 240C1201 372.549 1308.45 480 1441 480M961 480C961 612.549 853.548 720 721 720M961 480C961 612.549 1068.45 720 1201 720M961 480C828.452 480 721 587.451 721 720M961 480C1093.55 480 1201 587.451 1201 720M1441 480C1441 612.549 1333.55 720 1201 720M1441 480C1308.45 480 1201 587.451 1201 720" stroke="url(#paint0_linear_5446_966)" />
                    <path d="M0.999942 0C0.999942 132.549 108.452 240 241 240M241 240C108.452 240 0.999942 347.451 0.999942 480M241 240C373.548 240 481 132.549 481 0C481 132.549 588.452 240 721 240M241 240C373.548 240 481 347.451 481 480M241 240C241 372.549 133.548 480 0.999942 480M241 240C241 372.549 348.452 480 481 480M0.999942 480C0.999942 612.549 108.452 720 241 720M0.999942 480C133.548 480 241 587.451 241 720M721 240C588.452 240 481 347.451 481 480M721 240C853.548 240 961 132.549 961 0C961 132.549 1068.45 240 1201 240M721 240C853.548 240 961 347.451 961 480M721 240C721 372.549 613.548 480 481 480M721 240C721 372.549 828.452 480 961 480M481 480C481 612.549 373.548 720 241 720M481 480C481 612.549 588.452 720 721 720M481 480C348.452 480 241 587.451 241 720M481 480C613.548 480 721 587.451 721 720M1201 240C1068.45 240 961 347.451 961 480M1201 240C1333.55 240 1441 132.549 1441 0M1201 240C1333.55 240 1441 347.451 1441 480M1201 240C1201 372.549 1093.55 480 961 480M1201 240C1201 372.549 1308.45 480 1441 480M961 480C961 612.549 853.548 720 721 720M961 480C961 612.549 1068.45 720 1201 720M961 480C828.452 480 721 587.451 721 720M961 480C1093.55 480 1201 587.451 1201 720M1441 480C1441 612.549 1333.55 720 1201 720M1441 480C1308.45 480 1201 587.451 1201 720" stroke="url(#paint1_linear_5446_966)" />
                    <defs>
                        <linearGradient id="paint0_linear_5446_966" x1="-2159" y1="2040.96" x2="2881" y2="2040.96" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.0472397" stopColor="#CF8F7D" />
                            <stop offset="0.0952083" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.143177" stopColor="#CF8F7D" />
                            <stop offset="0.190824" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.23847" stopColor="#CF8F7D" />
                            <stop offset="0.285795" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.334085" stopColor="#CF8F7D" />
                            <stop offset="0.380766" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.428413" stopColor="#CF8F7D" />
                            <stop offset="0.47606" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.523384" stopColor="#CF8F7D" />
                            <stop offset="0.571675" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.619322" stopColor="#CF8F7D" />
                            <stop offset="0.666968" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.714615" stopColor="#CF8F7D" />
                            <stop offset="0.76194" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.81023" stopColor="#CF8F7D" />
                            <stop offset="0.857233" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="0.906167" stopColor="#E0B196" />
                            <stop offset="0.952526" stopColor="#CF8F7D" stopOpacity="0.3" />
                            <stop offset="1" stopColor="#CF8F7D" />
                            {/* Animate the gradient to create a pulse/shimmer effect */}
                            <animateTransform
                                attributeName="gradientTransform"
                                type="translate"
                                values="-1000 0; 1000 0; -1000 0"
                                dur="12s"
                                repeatCount="indefinite"
                            />
                        </linearGradient>
                        <linearGradient id="paint1_linear_5446_966" x1="361" y1="0" x2="361" y2="720" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#051936" />
                            <stop offset="0.211699" stopColor="#051936" stopOpacity="0" />
                            <stop offset="1" stopColor="#051936" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Percentage Counter */}
            <div className={styles.preloader__percent}>
                <div className={styles.preloader__percent_wrap}>
                    <div className={styles.preloader__percent_number}>
                        {Array.from({ length: 101 }, (_, i) => (
                            <span key={i} className={styles.preloader__percent_item}>
                                {i}
                            </span>
                        ))}
                    </div>
                    <span className={styles.preloader__percent_postfix}>%</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
