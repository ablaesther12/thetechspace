import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger animation hook.
 *
 * @param {Object}  options
 * @param {number}  [options.y=40]         - Starting Y offset
 * @param {number}  [options.opacity=0]    - Starting opacity
 * @param {number}  [options.scale=1]      - Starting scale
 * @param {number}  [options.duration=0.8] - Tween duration
 * @param {number}  [options.stagger=0.12] - Stagger between children
 * @param {string}  [options.ease="power3.out"]
 * @param {string}  [options.start="top 85%"]  - ScrollTrigger start
 * @param {boolean} [options.once=true]    - Animate only once
 * @param {string}  [options.childSelector=".gs-animate"] - Selector for animated children
 *
 * @returns {React.RefObject} - Attach this ref to the container element
 */
export default function useGsapScrollAnimation({
    y = 40,
    opacity = 0,
    scale = 1,
    duration = 0.8,
    stagger = 0.12,
    ease = "power3.out",
    start = "top 85%",
    once = true,
    childSelector = ".gs-animate",
} = {}) {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const targets = containerRef.current?.querySelectorAll(childSelector);
            if (!targets || targets.length === 0) return;

            gsap.from(targets, {
                y,
                opacity,
                scale,
                duration,
                stagger,
                ease,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start,
                    once,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [y, opacity, scale, duration, stagger, ease, start, once, childSelector]);

    return containerRef;
}
