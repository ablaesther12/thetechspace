// Ported from Magic UI (MIT) — https://magicui.design/docs/components/border-beam
// A light travelling along a panel's border. Parent needs `relative` and a radius.
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

export function BorderBeam({
  className,
  size = 80,
  duration = 8,
  delay = 0,
  colorFrom = "#a78bfa",
  colorTo = "#6d28d9",
  borderWidth = 1,
  reverse = false,
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="border-beam pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] border-transparent"
      style={{
        borderWidth,
        borderStyle: "solid",
        mask: "linear-gradient(transparent, transparent) padding-box, linear-gradient(#000, #000) border-box",
        maskComposite: "intersect",
        WebkitMask: "linear-gradient(transparent, transparent) padding-box, linear-gradient(#000, #000) border-box",
        WebkitMaskComposite: "source-in",
      }}
    >
      <motion.div
        className={cn("absolute aspect-square", className)}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
        }}
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: reverse ? ["100%", "0%"] : ["0%", "100%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration, delay: -delay }}
      />
    </div>
  );
}
