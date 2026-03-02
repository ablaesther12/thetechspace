import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ChevronRight, Users, Zap, Award, Heart
} from "lucide-react";
import JourneyTimeline from "../components/about/JourneyTimeline";
import ValuesSection from "../components/about/ValuesSection";
import TeamSection from "../components/about/TeamSection";
import Hero3DScene from "../components/about/Hero3DScene";

/* ═══════════════════════════════════════════════════════════
   Animated Background — CSS-driven for performance
   No framer-motion infinite loops; uses CSS keyframes instead
   ═══════════════════════════════════════════════════════════ */
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/30 via-white to-slate-50/50" />
      <div className="absolute inset-0 hex-grid opacity-80" />
      <div className="absolute inset-0 cross-hatch" />

      {/* Gradient blobs — CSS animated */}
      <div
        className="absolute w-[550px] h-[550px] top-[5%] left-[-8%] opacity-50 rounded-full blur-3xl will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
          animation: 'blob-drift-1 22s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[650px] h-[650px] top-[30%] right-[-10%] opacity-35 rounded-full blur-3xl will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)',
          animation: 'blob-drift-2 28s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] bottom-[15%] left-[15%] opacity-40 rounded-full blur-3xl will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 60%)',
          animation: 'blob-drift-1 18s ease-in-out infinite reverse',
        }}
      />

      {/* Particles — CSS animated, reduced to 4 */}
      {[
        { x: 15, y: 25, size: 4, delay: '0s', dur: '16s', color: 'rgba(139,92,246,0.12)' },
        { x: 72, y: 18, size: 3, delay: '3s', dur: '20s', color: 'rgba(99,102,241,0.10)' },
        { x: 40, y: 70, size: 5, delay: '1s', dur: '18s', color: 'rgba(168,85,247,0.08)' },
        { x: 85, y: 55, size: 3, delay: '5s', dur: '15s', color: 'rgba(139,92,246,0.10)' },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            width: p.size, height: p.size,
            left: `${p.x}%`, top: `${p.y}%`,
            background: p.color,
            animation: `particle-float ${p.dur} ${p.delay} ease-in-out infinite`,
          }}
        />
      ))}

      {/* Wireframe shapes — CSS rotation */}
      <div
        className="absolute top-[10%] right-[7%] opacity-[0.025] will-change-transform"
        style={{ animation: 'spin 55s linear infinite' }}
      >
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          <rect x="40" y="40" width="100" height="100" stroke="#7c3aed" strokeWidth="0.8" transform="rotate(45 90 90)" />
          <rect x="58" y="58" width="64" height="64" stroke="#7c3aed" strokeWidth="0.5" transform="rotate(45 90 90)" />
        </svg>
      </div>

      <div
        className="absolute bottom-[18%] left-[4%] opacity-[0.02] will-change-transform"
        style={{ animation: 'spin 45s linear infinite' }}
      >
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <polygon points="70,8 132,42 132,98 70,132 8,98 8,42" stroke="#6366f1" strokeWidth="0.7" />
          <polygon points="70,28 112,50 112,90 70,112 28,90 28,50" stroke="#6366f1" strokeWidth="0.4" />
        </svg>
      </div>

      {/* Vertical accent lines — static, no animation */}
      <div className="absolute top-0 right-[22%] w-px h-full bg-gradient-to-b from-transparent via-violet-200/20 to-transparent" />
      <div className="absolute top-0 left-[18%] w-px h-full bg-gradient-to-b from-transparent via-slate-200/20 to-transparent" />

      <div className="absolute inset-0 fine-grain" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Animated Counter — counts up when scrolled into view
   ═══════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, suffix }) {
  const numericValue = parseInt(value);
  const count = useMotionValue(0);
  const springCount = useSpring(count, { stiffness: 50, damping: 20 });
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animate(count, numericValue, { duration: 2, ease: "easeOut" });
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, numericValue, hasAnimated]);

  useEffect(() => {
    const unsubscribe = springCount.on("change", (v) => {
      setDisplay(Math.round(v).toString());
    });
    return unsubscribe;
  }, [springCount]);

  return (
    <span ref={ref}>
      {display}<span className="text-violet-600">{suffix}</span>
    </span>
  );
}

/* ───── Enhanced Stat Card ───── */
function StatCard({ value, suffix, label, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        className="absolute -inset-px rounded-2xl"
        style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(99,102,241,0.15), rgba(139,92,246,0.1))' }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <div className="relative glass-card rounded-2xl p-8 overflow-hidden hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-500">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          initial={{ x: '-100%', skewX: '-15deg' }}
          animate={isHovered ? { x: '200%' } : { x: '-100%' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-violet-100/50 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="font-display text-5xl md:text-6xl font-800 text-slate-900 tracking-tight relative z-10 block">
          <AnimatedCounter value={value} suffix={suffix} />
        </span>
        <p className="font-body text-slate-400 mt-3 text-xs uppercase tracking-[0.2em] font-medium relative z-10">{label}</p>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-indigo-500 to-violet-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero Section — Original content + inspired visual layout
   Centered text, floating 3D shapes from two diagonal clusters,
   grid background, single CTA
   ═══════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section style={{ position: 'relative' }} className="min-h-screen">
      {/* Background: white base + grid with violet dots */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-0 hero-dot-grid" />

      {/* Radial glow behind content */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(99,102,241,0.05) 40%, transparent 70%)' }}
      />

      {/* Subtle violet accent lines radiating from center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-300/20 to-transparent" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-300/15 to-transparent" />
      </div>

      {/* Floating 3D Geometric Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Hero3DScene />
      </div>

      {/* Content — centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7"
          >
            <span className="inline-flex items-center gap-2.5 glass-card border border-violet-200/50 text-violet-600 px-5 py-2.5 rounded-full text-sm font-body font-semibold shadow-sm">
              Software Engineering Studio
            </span>
          </motion.div>

          {/* Headline — original content */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-800 text-slate-900 mb-8 leading-[1.15] tracking-tight"
          >
            We Engineer
            <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600">
              Digital Excellence
            </span>
          </motion.h1>

          {/* Subtext — original content */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
            className="font-body text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
          >
            From architecture to deployment — we build scalable, performant digital
            products that power businesses worldwide.
          </motion.p>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex justify-center"
          >
            <motion.button
              className="group relative bg-gradient-to-r from-violet-600 to-purple-600 text-white font-body font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center gap-2.5 overflow-hidden"
              whileHover={{ scale: 1.04, boxShadow: '0 20px 40px -12px rgba(124,58,237,0.4)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Book a call
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───── Story Section ───── */
function StorySection() {
  const features = [
    { icon: Zap, text: "Fast Delivery", desc: "Shipped in weeks, not months" },
    { icon: Users, text: "Expert Team", desc: "50+ skilled professionals" },
    { icon: Award, text: "Quality Assured", desc: "Pixel-perfect execution" },
    { icon: Heart, text: "Client-Focused", desc: "Your success is our mission" }
  ];

  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredListItem, setHoveredListItem] = useState(null);

  return (
    <section className="py-20 relative overflow-x-clip">
      <div className="absolute inset-0 bg-slate-50/40" />
      <div className="absolute inset-0 diagonal-lines-light" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-violet-100/40 to-transparent rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <span className="font-body text-violet-600 font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">Our Story</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 text-slate-900 leading-[1.15] tracking-tight mb-5">
            Why Choose{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              TTS?
            </span>
          </h2>
          <p className="font-body text-slate-400 text-base font-light leading-relaxed max-w-xl mx-auto">
            We're your strategic partners who understand that every pixel, every line of code, and every user interaction matters.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start max-w-7xl mx-auto">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="space-y-5 mb-10">
              <p className="font-body text-slate-500 text-lg leading-relaxed font-light">
                Founded in 2018, TTS emerged from a simple belief: that great design and powerful technology should work hand in hand.
              </p>
              <p className="font-body text-slate-400 text-base leading-relaxed font-light">
                We're not just another agency. We're your strategic partners who understand that every pixel, every line of code, and every user interaction matters.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="group relative overflow-hidden"
                >
                  <motion.div
                    className="absolute -inset-px rounded-xl bg-gradient-to-br from-violet-300/40 to-indigo-300/20"
                    animate={{ opacity: hoveredFeature === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative flex items-start gap-3 p-4 rounded-xl glass-card hover:shadow-lg hover:shadow-violet-50/60 transition-all duration-300">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-100/30 to-transparent rounded-xl"
                      initial={{ x: '-100%' }}
                      animate={hoveredFeature === index ? { x: '200%' } : { x: '-100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="w-9 h-9 bg-violet-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-violet-100 group-hover:shadow-md group-hover:shadow-violet-200/50 transition-all duration-300">
                      <feature.icon className="h-4 w-4 text-violet-600" />
                    </div>
                    <div className="relative z-10">
                      <span className="font-display font-bold text-slate-800 text-sm block">{feature.text}</span>
                      <span className="font-body text-slate-400 text-xs">{feature.desc}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-violet-200/30 to-indigo-200/20 rounded-3xl blur-2xl" />

            <div className="relative glass-card border border-slate-200/80 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-violet-100/40 transition-all duration-500">
              <div className="flex items-center gap-3 px-6 py-4 bg-slate-50/80 border-b border-slate-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-amber-400 hover:bg-amber-500 transition-colors cursor-pointer" />
                  <div className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors cursor-pointer" />
                </div>
                <span className="text-slate-400 text-xs font-mono ml-2">what-sets-us-apart.ts</span>
              </div>

              <div className="p-8">
                <h3 className="font-display text-2xl font-bold mb-8 text-slate-900">What Sets Us Apart</h3>

                <ul className="space-y-5 mb-8">
                  {[
                    { text: "Technical + Creative Expertise", tag: "CORE" },
                    { text: "Agile Development Process", tag: "PROCESS" },
                    { text: "24/7 Support & Maintenance", tag: "SERVICE" },
                    { text: "Results-Driven Approach", tag: "STRATEGY" }
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 group cursor-pointer"
                      onMouseEnter={() => setHoveredListItem(index)}
                      onMouseLeave={() => setHoveredListItem(null)}
                    >
                      <motion.div
                        className="w-2.5 h-2.5 bg-violet-500 rounded-full flex-shrink-0"
                        animate={{
                          scale: hoveredListItem === index ? 1.4 : 1,
                          boxShadow: hoveredListItem === index ? '0 0 12px rgba(139,92,246,0.5)' : '0 0 0px rgba(139,92,246,0)',
                        }}
                        transition={{ duration: 0.25 }}
                      />
                      <motion.span
                        className="font-body text-slate-600 font-medium flex-1"
                        animate={{
                          x: hoveredListItem === index ? 4 : 0,
                          color: hoveredListItem === index ? '#7c3aed' : '#475569',
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.text}
                      </motion.span>
                      <motion.span
                        className="text-[10px] font-body font-semibold text-violet-500 bg-violet-50 px-2.5 py-0.5 rounded-full tracking-wider"
                        animate={{
                          backgroundColor: hoveredListItem === index ? 'rgba(124,58,237,0.15)' : 'rgba(245,243,255,1)',
                          scale: hoveredListItem === index ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.tag}
                      </motion.span>
                    </motion.li>
                  ))}
                </ul>

                <div className="p-5 bg-slate-900 rounded-xl font-mono text-sm group hover:shadow-lg hover:shadow-slate-900/20 transition-shadow duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-slate-600 text-xs">1</span>
                    <span className="text-violet-400">const</span>{" "}
                    <span className="text-cyan-300">success</span>{" "}
                    <span className="text-slate-400">=</span>{" "}
                    <span className="text-amber-300">"TheTechSpace"</span>
                    <span className="text-slate-600">;</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 text-xs">2</span>
                    <span className="text-violet-400">export default</span>{" "}
                    <span className="text-cyan-300">success</span>
                    <span className="text-slate-600">;</span>
                    <span className="inline-block w-2 h-4 bg-violet-400 animate-pulse ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}

/* ───── Main About Page ───── */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-body relative">
      <AnimatedBackground />

      <div className="relative z-10">
        <HeroSection />

        {/* Stats */}
        <section className="py-16 relative">
          <div className="absolute inset-0 bg-white/60" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 relative z-10"
          >
            <span className="font-body text-slate-400 text-xs uppercase tracking-[0.2em] block mb-3">By the Numbers</span>
            <h2 className="font-display text-3xl md:text-4xl font-800 text-slate-900 tracking-tight">
              Impact at <span className="italic text-violet-600">Scale</span>
            </h2>
          </motion.div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <StatCard value="50" suffix="+" label="Projects Completed" index={0} />
              <StatCard value="30" suffix="+" label="Happy Clients" index={1} />
              <StatCard value="5" suffix="+" label="Years Experience" index={2} />
              <StatCard value="24" suffix="/7" label="Support Available" index={3} />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        </section>

        <JourneyTimeline />
        <ValuesSection />
        <StorySection />
        <TeamSection />
      </div>
    </div>
  );
}
