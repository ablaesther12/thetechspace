import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Rocket, Package, TrendingUp, Globe, Users } from "lucide-react";

const milestonesData = [
  { id: "1", year: "2018", title: "Founded", description: "TTS was born from a shared vision of three passionate tech enthusiasts who believed in the power of digital transformation.", icon: "rocket" },
  { id: "2", year: "2019", title: "First Product Launch", description: "We launched our flagship web development service, delivering our first major client project.", icon: "package" },
  { id: "3", year: "2021", title: "Series A Funding", description: "Secured $2.5M in Series A funding from leading tech investors.", icon: "trending-up" },
  { id: "4", year: "2023", title: "Global Expansion", description: "Expanded operations to serve clients across 15+ countries.", icon: "globe" },
  { id: "5", year: "Present", title: "500+ Clients", description: "Today, we proudly serve over 500 satisfied clients worldwide.", icon: "users" }
];

const iconMap = {
  rocket: Rocket,
  package: Package,
  "trending-up": TrendingUp,
  globe: Globe,
  users: Users,
};

export default function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section ref={containerRef} className="py-20 overflow-x-clip relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/40 to-white/60" />
      <div className="absolute inset-0 light-dot-grid opacity-30" />

      {/* Decorative accent */}
      <div className="absolute top-0 left-[8%] w-px h-full bg-gradient-to-b from-transparent via-slate-200/50 to-transparent hidden lg:block" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="font-body text-violet-600 font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">Our Journey</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 text-slate-900 leading-[1.15] tracking-tight mb-5">
              We are a collective of{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
                digital craftsmen.
              </span>
            </h2>
            <p className="font-body text-slate-400 text-base font-light leading-relaxed max-w-xl mx-auto">
              Innovating with precision, building the future of technology. Each milestone represents a chapter in our story.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto relative">
          {/* Central line - Desktop */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            style={{ transformOrigin: "top", background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.25), rgba(139,92,246,0.1), transparent)" }}
          />

          {/* Mobile line */}
          <motion.div
            className="absolute left-6 top-0 bottom-0 w-px md:hidden"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
            style={{ transformOrigin: "top", background: "linear-gradient(to bottom, transparent, rgba(139,92,246,0.25), transparent)" }}
          />

          <div className="space-y-6 md:space-y-0">
            {milestonesData.map((milestone, index) => {
              const Icon = iconMap[milestone.icon];
              const isEven = index % 2 === 0;
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.15, duration: 0.5 }}
                  className="relative"
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {/* Desktop alternating */}
                  <div className={`hidden md:grid grid-cols-[1fr_auto_1fr] gap-8 items-center ${index > 0 ? 'mt-[-16px]' : ''}`}>
                    <div className={isEven ? 'text-right pr-4' : ''}>
                      {isEven && <MilestoneCard milestone={milestone} isActive={isActive} align="right" />}
                    </div>

                    <div className="relative flex flex-col items-center z-10">
                      {/* Glow ring behind icon */}
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-violet-400/20 blur-md"
                        animate={{
                          scale: isActive ? 1.6 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.35 }}
                      />
                      <motion.div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 relative ${isActive
                          ? 'bg-violet-600 border-violet-500 shadow-lg shadow-violet-200'
                          : 'bg-white border-slate-200 shadow-sm hover:border-violet-200'
                          }`}
                        animate={{ scale: isActive ? 1.15 : 1, rotate: isActive ? 6 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <Icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-white' : 'text-violet-500'}`} />
                      </motion.div>
                    </div>

                    <div className={!isEven ? 'pl-4' : ''}>
                      {!isEven && <MilestoneCard milestone={milestone} isActive={isActive} align="left" />}
                    </div>
                  </div>

                  {/* Mobile left-aligned */}
                  <div className="md:hidden flex gap-5 items-start pl-2">
                    <div className="relative z-10 flex-shrink-0">
                      <motion.div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border-2 transition-all duration-300 ${isActive
                          ? 'bg-violet-600 border-violet-500'
                          : 'bg-white border-slate-200'
                          }`}
                        animate={{ scale: isActive ? 1.1 : 1 }}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-violet-500'}`} />
                      </motion.div>
                    </div>
                    <MilestoneCard milestone={milestone} isActive={isActive} align="left" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
}

function MilestoneCard({ milestone, isActive, align }) {
  return (
    <motion.div
      className={`group cursor-pointer ${align === 'right' ? 'flex flex-col items-end' : ''}`}
      animate={{ x: isActive ? (align === 'right' ? -6 : 6) : 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Gradient border wrapper on hover */}
      <motion.div
        className="relative"
        animate={{ scale: isActive ? 1.01 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-400/40 via-indigo-300/20 to-violet-300/30"
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className={`
          relative glass-card rounded-2xl p-6 max-w-sm transition-all duration-400 overflow-hidden
          ${isActive
            ? 'shadow-xl shadow-violet-100/50'
            : 'shadow-sm hover:shadow-md'
          }
        `}>
          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            initial={{ x: '-100%', skewX: '-15deg' }}
            animate={isActive ? { x: '200%' } : { x: '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />

          {/* Glow background */}
          <div className={`absolute inset-0 bg-gradient-to-br from-violet-50/60 to-transparent transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <motion.span
                className="font-display text-2xl font-800 tracking-tight"
                animate={{ color: isActive ? '#7c3aed' : '#0f172a' }}
                transition={{ duration: 0.3 }}
              >
                {milestone.year}
              </motion.span>
              <motion.div
                className="h-px flex-1"
                animate={{
                  background: isActive
                    ? 'linear-gradient(to right, rgba(139,92,246,0.4), transparent)'
                    : 'linear-gradient(to right, rgba(226,232,240,1), transparent)'
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <h3 className="font-display font-bold text-lg text-slate-800 mb-2">{milestone.title}</h3>
            <p className="font-body text-slate-400 text-sm leading-relaxed font-light">{milestone.description}</p>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isActive ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            style={{ transformOrigin: align === 'right' ? 'right' : 'left' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
