import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════
   Floating Element Wrapper
   Handles: mouse parallax + entrance animation + float bob
   ═══════════════════════════════════════════════════════════ */
function FloatingElement({
  children, springX, springY, depth = 1,
  style = {}, rotateY = 0, rotateX = 0,
  floatY = 10, floatDuration = 6, delay = 0, className = ''
}) {
  const x = useTransform(springX, [-1, 1], [-14 * depth, 14 * depth])
  const y = useTransform(springY, [-1, 1], [-10 * depth, 10 * depth])

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{
        ...style,
        x, y,
        rotateY: `${rotateY}deg`,
        rotateX: `${rotateX}deg`,
        transformStyle: 'preserve-3d',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Float bobbing via CSS instead of framer-motion for perf */}
        <div
          className="will-change-transform"
          style={{
            animation: `hero-float ${floatDuration}s ease-in-out infinite`,
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   3D Diamond / Gem — faceted purple crystal
   ═══════════════════════════════════════════════════════════ */
function Diamond({ size = 80 }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 80 96" fill="none">
      <defs>
        <linearGradient id="diamondGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="diamondGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="diamondGrad3" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ddd6fe" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <polygon points="40,0 0,36 40,96" fill="url(#diamondGrad1)" />
      <polygon points="40,0 80,36 40,96" fill="url(#diamondGrad2)" />
      <polygon points="40,0 20,18 40,40 60,18" fill="url(#diamondGrad3)" />
      <line x1="40" y1="0" x2="40" y2="96" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════
   3D Cube — dark with subtle face shading
   ═══════════════════════════════════════════════════════════ */
function Cube3D({ size = 70 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 70 70" fill="none">
      <polygon points="35,8 62,20 35,32 8,20" fill="#3f3f46" />
      <polygon points="8,20 35,32 35,58 8,46" fill="#27272a" />
      <polygon points="62,20 35,32 35,58 62,46" fill="#18181b" />
      <polyline points="8,20 35,8 62,20" stroke="rgba(139,92,246,0.4)" strokeWidth="0.8" fill="none" />
      <line x1="35" y1="32" x2="35" y2="58" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════
   Code Bracket Icon — </> badge
   ═══════════════════════════════════════════════════════════ */
function CodeBracket({ size = 52 }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl shadow-lg"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        boxShadow: '0 8px 24px rgba(124,58,237,0.3)',
      }}
    >
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16,18 22,12 16,6" />
        <polyline points="8,6 2,12 8,18" />
        <line x1="14" y1="4" x2="10" y2="20" strokeWidth="1.5" opacity="0.7" />
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   Programming Language Badges
   ═══════════════════════════════════════════════════════════ */
function LangBadge({ label, color, bgColor, size = 44 }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg font-mono font-bold shadow-lg border"
      style={{
        width: size,
        height: size,
        background: bgColor,
        color: color,
        fontSize: size * 0.3,
        borderColor: `${color}22`,
        boxShadow: `0 6px 20px ${color}20`,
      }}
    >
      {label}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   3D Triangle / Prism
   ═══════════════════════════════════════════════════════════ */
function TrianglePrism({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
      <defs>
        <linearGradient id="triGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="triGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4c1d95" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <polygon points="28,4 52,48 4,48" fill="url(#triGrad1)" />
      <polygon points="28,4 52,48 40,48 28,20" fill="url(#triGrad2)" opacity="0.6" />
      <line x1="28" y1="4" x2="4" y2="48" stroke="rgba(255,255,255,0.25)" strokeWidth="0.6" />
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════
   Glowing Accent Orb
   ═══════════════════════════════════════════════════════════ */
function AccentOrb({ size = 10, color = 'rgba(139,92,246,0.5)' }) {
  return (
    <div
      className="rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color.replace('0.5', '0.15')}`,
      }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════
   Exported Component — Floating 3D Geometric Workspace
   Elements clustered in TWO DIAGONAL STREAMS:
   • BOTTOM-LEFT → shooting up-right toward center
   • TOP-RIGHT → shooting down-left toward center
   Mouse-reactive parallax with CSS 3D perspective
   ═══════════════════════════════════════════════════════════ */
export default function Hero3DScene() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 28 })

  useEffect(() => {
    const handler = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mouseX, mouseY])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
    >
      {/* ═══════════════════════════════════════════════════
         BOTTOM-LEFT CLUSTER — shooting up-right
         ═══════════════════════════════════════════════════ */}

      {/* Large diamond — bottom left, angled toward center */}
      <FloatingElement
        springX={springX} springY={springY} depth={1.2}
        style={{ left: '3%', bottom: '12%' }}
        rotateY={15} rotateX={-8}
        floatY={14} floatDuration={7} delay={0.5}
        className="hidden md:block"
      >
        <Diamond size={75} />
      </FloatingElement>

      {/* Code bracket — left side, mid-height */}
      <FloatingElement
        springX={springX} springY={springY} depth={1.3}
        style={{ left: '14%', top: '42%' }}
        rotateY={10} rotateX={-5}
        floatY={11} floatDuration={6.5} delay={0.7}
        className="hidden md:block"
      >
        <CodeBracket size={50} />
      </FloatingElement>

      {/* 3D Cube — upper left area */}
      <FloatingElement
        springX={springX} springY={springY} depth={0.8}
        style={{ left: '6%', top: '10%' }}
        rotateY={12} rotateX={-6}
        floatY={10} floatDuration={9} delay={0.6}
        className="hidden md:block"
      >
        <Cube3D size={60} />
      </FloatingElement>

      {/* Small triangle — bottom left mid */}
      <FloatingElement
        springX={springX} springY={springY} depth={1}
        style={{ left: '20%', bottom: '22%' }}
        rotateY={8} rotateX={-4}
        floatY={12} floatDuration={6} delay={0.9}
        className="hidden lg:block"
      >
        <TrianglePrism size={40} />
      </FloatingElement>

      {/* PY badge — left cluster trailing */}
      <FloatingElement
        springX={springX} springY={springY} depth={0.7}
        style={{ left: '22%', top: '18%' }}
        rotateY={5} rotateX={-3}
        floatY={8} floatDuration={8.5} delay={1.0}
        className="hidden lg:block"
      >
        <LangBadge label="PY" color="#3b82f6" bgColor="rgba(59,130,246,0.1)" size={38} />
      </FloatingElement>

      {/* Accent orb — bottom left scatter */}
      <FloatingElement
        springX={springX} springY={springY} depth={2}
        style={{ left: '10%', bottom: '32%' }}
        floatY={6} floatDuration={4} delay={0.4}
        className="hidden lg:block"
      >
        <AccentOrb size={8} color="rgba(139,92,246,0.45)" />
      </FloatingElement>

      <FloatingElement
        springX={springX} springY={springY} depth={1.6}
        style={{ left: '25%', top: '60%' }}
        floatY={5} floatDuration={3.5} delay={0.8}
        className="hidden xl:block"
      >
        <AccentOrb size={5} color="rgba(139,92,246,0.5)" />
      </FloatingElement>

      {/* ═══════════════════════════════════════════════════
         TOP-RIGHT CLUSTER — shooting down-left
         ═══════════════════════════════════════════════════ */}

      {/* Large diamond — top right */}
      <FloatingElement
        springX={springX} springY={springY} depth={1.2}
        style={{ right: '4%', top: '5%' }}
        rotateY={-14} rotateX={6}
        floatY={16} floatDuration={7} delay={0.5}
        className="hidden md:block"
      >
        <Diamond size={80} />
      </FloatingElement>

      {/* Triangle prism — right side mid */}
      <FloatingElement
        springX={springX} springY={springY} depth={0.9}
        style={{ right: '5%', bottom: '18%' }}
        rotateY={-8} rotateX={4}
        floatY={13} floatDuration={7.5} delay={0.8}
        className="hidden md:block"
      >
        <TrianglePrism size={55} />
      </FloatingElement>

      {/* JS Badge — right cluster */}
      <FloatingElement
        springX={springX} springY={springY} depth={1.1}
        style={{ right: '12%', top: '35%' }}
        rotateY={-10} rotateX={3}
        floatY={9} floatDuration={6} delay={0.9}
        className="hidden lg:block"
      >
        <LangBadge label="JS" color="#f59e0b" bgColor="rgba(245,158,11,0.1)" size={42} />
      </FloatingElement>

      {/* TS badge — right cluster lower */}
      <FloatingElement
        springX={springX} springY={springY} depth={1.4}
        style={{ right: '8%', bottom: '38%' }}
        rotateY={-12} rotateX={5}
        floatY={15} floatDuration={5.8} delay={1.1}
        className="hidden lg:block"
      >
        <LangBadge label="TS" color="#2563eb" bgColor="rgba(37,99,235,0.1)" size={40} />
      </FloatingElement>

      {/* 3D Cube — right side upper */}
      <FloatingElement
        springX={springX} springY={springY} depth={0.6}
        style={{ right: '18%', top: '12%' }}
        rotateY={-6} rotateX={4}
        floatY={8} floatDuration={10} delay={1.2}
        className="hidden lg:block"
      >
        <Cube3D size={45} />
      </FloatingElement>

      {/* Small diamond accent — right trailing */}
      <FloatingElement
        springX={springX} springY={springY} depth={1.5}
        style={{ right: '22%', bottom: '25%' }}
        rotateY={-5} rotateX={3}
        floatY={10} floatDuration={5.5} delay={1.0}
        className="hidden xl:block"
      >
        <Diamond size={30} />
      </FloatingElement>

      {/* Accent orbs — right scatter */}
      <FloatingElement
        springX={springX} springY={springY} depth={1.8}
        style={{ right: '15%', top: '25%' }}
        floatY={5} floatDuration={3.5} delay={0.6}
        className="hidden lg:block"
      >
        <AccentOrb size={6} color="rgba(168,85,247,0.4)" />
      </FloatingElement>

      <FloatingElement
        springX={springX} springY={springY} depth={1.5}
        style={{ right: '28%', bottom: '15%' }}
        floatY={7} floatDuration={5} delay={1.0}
        className="hidden md:block"
      >
        <AccentOrb size={10} color="rgba(99,102,241,0.35)" />
      </FloatingElement>

      <FloatingElement
        springX={springX} springY={springY} depth={2}
        style={{ right: '10%', top: '58%' }}
        floatY={4} floatDuration={4.5} delay={0.7}
        className="hidden xl:block"
      >
        <AccentOrb size={5} color="rgba(139,92,246,0.4)" />
      </FloatingElement>
    </div>
  )
}
