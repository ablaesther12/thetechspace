import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Eye, Heart, Leaf, TrendingUp, Shield } from "lucide-react";

const valuesData = [
  { id: 1, title: "Innovation", description: "Constantly pushing boundaries with cutting-edge technology and creative solutions.", icon: Rocket, accent: "violet", size: "large" },
  { id: 2, title: "Transparency", description: "Open and honest collaboration at every stage of the process.", icon: Eye, accent: "blue", size: "small" },
  { id: 3, title: "User-Centric", description: "Empathy at our core. Every decision starts with the end user.", icon: Heart, accent: "rose", size: "small" },
  { id: 4, title: "Sustainability", description: "Building for the future with scalable, maintainable solutions.", icon: Leaf, accent: "emerald", size: "small" },
  { id: 5, title: "Growth", description: "Continuous improvement. We evolve with the industry and our clients.", icon: TrendingUp, accent: "amber", size: "small" },
  { id: 6, title: "Integrity", description: "Trust is our foundation. We deliver on every promise we make.", icon: Shield, accent: "indigo", size: "large" },
];

const accentColors = {
  violet: { bg: "bg-violet-50", hover: "bg-violet-100", text: "text-violet-600", border: "border-violet-200", gradient: "from-violet-500 to-purple-500", glow: "rgba(139,92,246,0.15)" },
  blue: { bg: "bg-blue-50", hover: "bg-blue-100", text: "text-blue-600", border: "border-blue-200", gradient: "from-blue-500 to-cyan-500", glow: "rgba(59,130,246,0.15)" },
  rose: { bg: "bg-rose-50", hover: "bg-rose-100", text: "text-rose-600", border: "border-rose-200", gradient: "from-rose-500 to-pink-500", glow: "rgba(244,63,94,0.15)" },
  emerald: { bg: "bg-emerald-50", hover: "bg-emerald-100", text: "text-emerald-600", border: "border-emerald-200", gradient: "from-emerald-500 to-teal-500", glow: "rgba(16,185,129,0.15)" },
  amber: { bg: "bg-amber-50", hover: "bg-amber-100", text: "text-amber-600", border: "border-amber-200", gradient: "from-amber-500 to-orange-500", glow: "rgba(245,158,11,0.15)" },
  indigo: { bg: "bg-indigo-50", hover: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-200", gradient: "from-indigo-500 to-violet-500", glow: "rgba(99,102,241,0.15)" },
};

function ValueCard({ value, index, isActive, onHover, onLeave }) {
  const Icon = value.icon;
  const isLarge = value.size === "large";
  const colors = accentColors[value.accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`cursor-pointer ${isLarge ? 'md:col-span-2' : ''}`}
    >
      {/* Gradient border wrapper */}
      <div className="relative">
        <motion.div
          className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${colors.gradient}`}
          animate={{ opacity: isActive ? 0.3 : 0 }}
          transition={{ duration: 0.35 }}
        />

        <motion.div
          className="relative h-full glass-card rounded-2xl overflow-hidden transition-all duration-500"
          animate={{
            scale: isActive ? 1.01 : 1,
            boxShadow: isActive
              ? `0 25px 50px -12px ${colors.glow}`
              : '0 1px 3px rgba(0,0,0,0.04)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Subtle gradient on active */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`}
            animate={{ opacity: isActive ? 0.04 : 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: '-100%', skewX: '-15deg' }}
            animate={isActive ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 0.65, ease: 'easeInOut' }}
          />

          <div className={`relative z-10 ${isLarge ? 'p-8 md:p-10' : 'p-6 md:p-8'}`}>
            <motion.div
              className={`
                inline-flex items-center justify-center rounded-xl mb-5 transition-all duration-400
                ${isLarge ? 'w-14 h-14' : 'w-11 h-11'}
                ${isActive ? `${colors.hover} ${colors.text}` : 'bg-slate-50 text-slate-400'}
              `}
              animate={{
                scale: isActive ? 1.1 : 1,
                rotate: isActive ? 6 : 0,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Icon className={`transition-colors duration-300 ${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`} />
            </motion.div>

            <motion.h3
              className={`font-display font-bold text-slate-900 mb-2 ${isLarge ? 'text-2xl' : 'text-lg'}`}
              animate={{ color: isActive ? (colors.text === 'text-violet-600' ? '#7c3aed' : colors.text === 'text-blue-600' ? '#2563eb' : colors.text === 'text-rose-600' ? '#e11d48' : colors.text === 'text-emerald-600' ? '#059669' : colors.text === 'text-amber-600' ? '#d97706' : '#4f46e5') : '#0f172a' }}
              transition={{ duration: 0.3 }}
            >
              {value.title}
            </motion.h3>
            <p className={`font-body text-slate-400 leading-relaxed font-light ${isLarge ? 'text-base max-w-sm' : 'text-sm'}`}>
              {value.description}
            </p>

            {/* Bottom accent line */}
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${colors.gradient}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          {/* Large card watermark */}
          {isLarge && (
            <motion.div
              className="absolute top-0 right-0 w-28 h-28"
              animate={{ opacity: isActive ? 0.08 : 0.03, rotate: isActive ? 12 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <Icon className="w-full h-full" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ValuesSection() {
  const [activeId, setActiveId] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 overflow-x-clip relative">
      {/* Background */}
      <div className="absolute inset-0 bg-white/60" />
      <div className="absolute inset-0 diagonal-lines-light" />

      {/* Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-violet-50/80 backdrop-blur-sm border border-violet-100 text-violet-600 px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide mb-6"
            >
              What Drives Us
            </motion.span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 text-slate-900 leading-[1.15] tracking-tight mb-5">
              Our{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                Values
              </span>
            </h2>
            <p className="font-body text-slate-400 text-base font-light leading-relaxed max-w-xl mx-auto">
              The principles that guide everything we do, from code to client relationships.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {valuesData.map((value, index) => (
            <ValueCard
              key={value.id}
              value={value}
              index={index}
              isActive={activeId === value.id}
              onHover={() => setActiveId(value.id)}
              onLeave={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}
