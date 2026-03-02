import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Rocket, Package, TrendingUp, Globe, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { milestonesData } from "../../data/milestonesData";

// Icon mapping for milestones
const iconMap = {
  rocket: Rocket,
  package: Package,
  "trending-up": TrendingUp,
  globe: Globe,
  users: Users,
};

// 3D Rotating Cube Component
function RotatingCube({ isHovered, color = "violet" }) {
  return (
    <div className="cube-container" style={{ perspective: "200px" }}>
      <motion.div
        className="cube"
        animate={{
          rotateY: isHovered ? 180 : 0,
          rotateX: isHovered ? 15 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          width: "60px",
          height: "60px",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Front face */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl shadow-lg flex items-center justify-center`}
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="w-3 h-3 bg-white/30 rounded-full" />
        </div>
        {/* Back face */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-600 to-${color}-700 rounded-xl shadow-lg flex items-center justify-center`}
          style={{ transform: "rotateY(180deg) translateZ(30px)" }}
        >
          <div className="w-3 h-3 bg-white/30 rounded-full" />
        </div>
        {/* Left face */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-400 to-${color}-500 rounded-xl`}
          style={{
            width: "60px",
            transform: "rotateY(-90deg) translateZ(30px)",
          }}
        />
        {/* Right face */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-600 to-${color}-700 rounded-xl`}
          style={{
            width: "60px",
            transform: "rotateY(90deg) translateZ(30px)",
          }}
        />
        {/* Top face */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-300 to-${color}-400 rounded-xl`}
          style={{
            height: "60px",
            transform: "rotateX(90deg) translateZ(30px)",
          }}
        />
        {/* Bottom face */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-${color}-700 to-${color}-800 rounded-xl`}
          style={{
            height: "60px",
            transform: "rotateX(-90deg) translateZ(30px)",
          }}
        />
      </motion.div>
    </div>
  );
}

// Milestone Node Component
function MilestoneNode({ milestone, index, isActive, onHover, onLeave }) {
  const Icon = iconMap[milestone.icon] || Rocket;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
  };

  return (
    <motion.div
      className="relative flex flex-col items-center cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover Card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-4 z-50 w-72"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-violet-100 p-5 relative">
              {/* Arrow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-violet-100 transform rotate-45" />

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Icon className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{milestone.title}</h4>
                  <span className="text-sm text-violet-600 font-semibold">{milestone.year}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Cube */}
      <div className="relative z-10 mb-4">
        <RotatingCube isHovered={isHovered} />

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-violet-500/30 rounded-xl blur-xl -z-10"
          animate={{ opacity: isHovered ? 0.6 : 0, scale: isHovered ? 1.5 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Year Label */}
      <motion.div
        className="text-center"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className={`text-xl font-bold ${isHovered ? 'text-violet-600' : 'text-gray-900'} transition-colors duration-300`}>
          {milestone.year}
        </span>
        <p className={`text-sm ${isHovered ? 'text-violet-500' : 'text-gray-500'} transition-colors duration-300 font-medium mt-1`}>
          {milestone.title}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Main Timeline Component
export default function MilestoneTimeline() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleScroll = (direction) => {
    if (timelineRef.current) {
      const scrollAmount = 300;
      const newPosition = direction === 'left'
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;

      timelineRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-violet-50/30 to-white">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We are a collective of{" "}
            <span className="text-violet-600 italic">digital craftsmen</span>.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Innovating with precision, building the future of technology.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-violet-50 transition-colors border border-gray-100 -ml-2 md:ml-0"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-violet-50 transition-colors border border-gray-100 -mr-2 md:mr-0"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Timeline Scroll Container */}
          <div
            ref={timelineRef}
            className="overflow-x-auto scrollbar-hide px-12 py-8"
            onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
          >
            <div className="flex items-center justify-center min-w-max gap-8 md:gap-16 lg:gap-24 px-8">
              {milestonesData.map((milestone, index) => (
                <div key={milestone.id} className="flex items-center">
                  <MilestoneNode
                    milestone={milestone}
                    index={index}
                    isActive={activeIndex === index}
                    onHover={setActiveIndex}
                    onLeave={() => setActiveIndex(null)}
                  />

                  {/* Connecting Line */}
                  {index < milestonesData.length - 1 && (
                    <motion.div
                      className="hidden md:block h-1 bg-gradient-to-r from-violet-300 to-violet-400 rounded-full mx-4"
                      style={{ width: '80px' }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Milestone Detail (Mobile) */}
        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="md:hidden mt-8 bg-white rounded-2xl shadow-lg border border-violet-100 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                {(() => {
                  const Icon = iconMap[milestonesData[activeIndex].icon] || Rocket;
                  return (
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-violet-600" />
                    </div>
                  );
                })()}
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{milestonesData[activeIndex].title}</h4>
                  <span className="text-violet-600 font-semibold">{milestonesData[activeIndex].year}</span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {milestonesData[activeIndex].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
