import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";

// ─── Animation variants ──────────────────────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

// ─── Star icon ───────────────────────────────────────────────────────────────
const StarIcon = () => (
    <svg className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

// ─── Cursor SVG pointer ───────────────────────────────────────────────────────
const CursorSVG = ({ color }) => (
    <svg
        width="20"
        height="24"
        viewBox="0 0 20 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `drop-shadow(0 2px 8px ${color}99)` }}
    >
        <path
            d="M1 1L17.5 9.5L10.5 12L7.5 20L1 1Z"
            fill={color}
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
    </svg>
);

// ─── Collaborator cursor data ─────────────────────────────────────────────────
// Positions use percentage strings so they work across all screen sizes.
// Each cursor loops through 4 waypoints then returns to the first (seamless).
const cursors = [
    {
        id: 1,
        name: "Danny",
        color: "#7c3aed",
        glow: "rgba(124,58,237,0.30)",
        // upper-left quadrant, gentle drift
        path: [
            { x: "9%", y: "30%" },
            { x: "16%", y: "22%" },
            { x: "13%", y: "55%" },
            { x: "7%", y: "45%" },
        ],
        duration: 10,
        delay: 0,
    },
    {
        id: 2,
        name: "Esther",
        color: "#0ea5e9",
        glow: "rgba(14,165,233,0.28)",
        // upper-right quadrant
        path: [
            { x: "78%", y: "20%" },
            { x: "85%", y: "38%" },
            { x: "72%", y: "50%" },
            { x: "80%", y: "28%" },
        ],
        duration: 12,
        delay: 1.8,
    },
    {
        id: 3,
        name: "Mon Ami",
        color: "#10b981",
        glow: "rgba(16,185,129,0.26)",
        // lower-right, slow drift
        path: [
            { x: "65%", y: "72%" },
            { x: "72%", y: "60%" },
            { x: "58%", y: "55%" },
            { x: "68%", y: "78%" },
        ],
        duration: 14,
        delay: 3.4,
    },
    {
        id: 4,
        name: "Kofi",
        color: "#f59e0b",
        glow: "rgba(245,158,11,0.26)",
        // lower-left
        path: [
            { x: "28%", y: "70%" },
            { x: "20%", y: "82%" },
            { x: "33%", y: "60%" },
            { x: "24%", y: "76%" },
        ],
        duration: 11,
        delay: 5.0,
    },
];

// ─── Single floating cursor ───────────────────────────────────────────────────
const FloatingCursor = ({ name, color, glow, path, duration, delay }) => {
    // Build looping keyframe arrays (append first point to close the loop)
    const xs = [...path.map((p) => p.x), path[0].x];
    const ys = [...path.map((p) => p.y), path[0].y];
    const times = xs.map((_, i) => i / (xs.length - 1));

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-20"
            style={{ left: path[0].x, top: path[0].y }}
            animate={{ left: xs, top: ys }}
            transition={{
                duration,
                delay,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                times,
            }}
        >
            {/* Blur-glow blob behind the cursor */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 72,
                    height: 72,
                    top: -20,
                    left: -20,
                    background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
                    filter: "blur(14px)",
                }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Cursor pointer */}
            <motion.div
                whileHover={{ scale: 1.18 }}
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <CursorSVG color={color} />
            </motion.div>

            {/* Name tag */}
            <motion.div
                className="absolute top-5 left-4 px-2.5 py-[3px] rounded-full text-white text-[11px] font-semibold whitespace-nowrap select-none"
                style={{
                    background: color,
                    boxShadow: `0 2px 14px ${color}66`,
                    letterSpacing: "0.02em",
                }}
                initial={{ opacity: 0, scale: 0.7, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: delay + 0.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
                {name}
            </motion.div>
        </motion.div>
    );
};

// ─── User's own mouse-tracking cursor ────────────────────────────────────────
const USER_COLOR = "#3D3D3D"; // rose-600 — distinct from the other four
const USER_GLOW = "rgba(0, 0, 0, 0.28)";

const UserCursor = ({ sectionRef }) => {
    const [pos, setPos] = useState(null); // null = not yet moved
    const [visible, setVisible] = useState(false);

    const onMouseMove = useCallback((e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setVisible(true);
    }, [sectionRef]);

    const onMouseLeave = useCallback(() => setVisible(false), []);
    const onMouseEnter = useCallback(() => setVisible(true), []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        el.addEventListener("mousemove", onMouseMove);
        el.addEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mouseenter", onMouseEnter);
        return () => {
            el.removeEventListener("mousemove", onMouseMove);
            el.removeEventListener("mouseleave", onMouseLeave);
            el.removeEventListener("mouseenter", onMouseEnter);
        };
    }, [sectionRef, onMouseMove, onMouseLeave, onMouseEnter]);

    if (!pos) return null;

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute z-30"
            animate={{ left: pos.x, top: pos.y, opacity: visible ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.4 }}
            style={{ left: pos.x, top: pos.y }}
        >
            {/* Glow blob */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    width: 72,
                    height: 72,
                    top: -20,
                    left: -20,
                    background: `radial-gradient(circle, ${USER_GLOW} 0%, transparent 70%)`,
                    filter: "blur(14px)",
                }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Cursor pointer */}
            <motion.div
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <CursorSVG color={USER_COLOR} />
            </motion.div>

            {/* Name tag */}
            <motion.div
                className="absolute top-5 left-4 px-2.5 py-[3px] rounded-full text-white text-[11px] font-semibold whitespace-nowrap select-none"
                style={{
                    background: USER_COLOR,
                    boxShadow: `0 2px 14px ${USER_COLOR}66`,
                    letterSpacing: "0.02em",
                }}
                initial={{ opacity: 0, scale: 0.7, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
                You
            </motion.div>
        </motion.div>
    );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = () => {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{
                cursor: "none",
                background:
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.08) 0%, rgba(249,250,251,0) 70%), linear-gradient(180deg, #f5f3ff 0%, #f9fafb 40%, #fff 100%)",
            }}
        >
            {/* Subtle grid */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)",
                    backgroundSize: "52px 52px",
                }}
            />

            {/* Top glow orb */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-25"
                style={{
                    background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            {/* ── Figma-style floating collaborator cursors ── */}
            {cursors.map((c) => (
                <FloatingCursor key={c.id} {...c} />
            ))}

            {/* ── User's own cursor ── */}
            <UserCursor sectionRef={sectionRef} />

            {/* ── Main content ── */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center pt-32 pb-20">
                <motion.div
                    className="flex flex-col items-center gap-7"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Announcement badge */}
                    <motion.div variants={itemVariants}>
                        <span
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide border"
                            style={{
                                background: "rgba(139,92,246,0.07)",
                                borderColor: "rgba(139,92,246,0.2)",
                                color: "#7c3aed",
                            }}
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" aria-hidden="true" />
                            Your <span className="font-bold italic mx-1">Partner</span> In Digital Innovation
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.12] tracking-tight text-slate-900"
                    >
                        Unique websites ready to{" "}
                        <span
                            className="italic font-black"
                            style={{
                                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            convert
                        </span>{" "}
                        in less than{" "}
                        <span
                            className="italic"
                            style={{
                                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            7 days
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="max-w-xl text-base sm:text-lg text-slate-500 leading-relaxed"
                    >
                        Because a website should be much more than a showcase, we create tools that{" "}
                        <span className="text-slate-700 font-medium">engage</span>,{" "}
                        <span className="text-slate-700 font-medium">attract</span>, and{" "}
                        <span className="text-slate-700 font-medium">convert</span>.
                    </motion.p>

                    {/* CTA button */}
                    <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                        <motion.button
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white shadow-xl shadow-violet-500/30 transition-shadow duration-300 hover:shadow-violet-500/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                            style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)" }}
                            aria-label="Book a call"
                        >
                            Book a call
                            <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                            {/* Sheen */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)" }}
                            />
                        </motion.button>

                        {/* Availability indicator */}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="font-medium text-slate-600">Available now</span>
                        </div>
                    </motion.div>

                    {/* Divider */}
                    <motion.div
                        variants={itemVariants}
                        className="w-48 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                        aria-hidden="true"
                    />


                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
