import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { buildLog } from "../../data/buildLog";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Mono } from "../ui/primitives";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BorderBeam } from "../ui/BorderBeam";

const pad = (n) => String(n).padStart(2, "0");

// Terminal-style log (pattern from Magic UI's Terminal, MIT): lines print one
// after another once the panel scrolls into view.
function Log() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [printed, setPrinted] = useState(reduceMotion ? buildLog.length : 0);

  useEffect(() => {
    if (!inView || reduceMotion || printed >= buildLog.length) return;
    const id = setTimeout(() => setPrinted((n) => n + 1), printed === 0 ? 250 : 420);
    return () => clearTimeout(id);
  }, [inView, printed, reduceMotion]);

  return (
    <div ref={ref} className="relative rounded-2xl border border-night-line bg-[#0b0817] shadow-2xl shadow-black/40">
      <BorderBeam duration={10} size={120} />
      <div className="flex items-center justify-between border-b border-night-line px-5 py-3">
        <Mono className="text-white/60">tts ship --site yourbusiness.com</Mono>
        <Mono className="text-white/40">brief → launch</Mono>
      </div>
      <ol className="px-5 py-4 space-y-1.5" aria-label="How a build moves, step by step">
        {buildLog.map((step, i) => {
          const shown = i < printed;
          const isLaunch = step.day === buildLog.length;
          return (
            <li
              key={step.day}
              className={`grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-baseline gap-x-4 gap-y-0.5 rounded-lg px-2 py-2 transition-opacity duration-300 ${shown ? "opacity-100" : "opacity-0"} ${isLaunch && shown ? "bg-white/[0.04]" : ""}`}
            >
              <Mono className={isLaunch ? "text-green-400" : "text-violet-300"}>step {pad(step.day)}</Mono>
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-semibold text-white">
                  <Check className={`h-4 w-4 shrink-0 ${isLaunch ? "text-green-400" : "text-violet-300"}`} aria-hidden="true" />
                  {step.title}
                </p>
                <p className="mt-0.5 text-sm text-white/60">{step.detail}</p>
              </div>
              <Mono className={`col-start-2 sm:col-start-3 ${isLaunch ? "text-green-400" : "text-white/45"}`}>
                → {step.output}
              </Mono>
            </li>
          );
        })}
      </ol>
      <div className="flex items-center gap-2 border-t border-night-line px-5 py-3">
        <Mono className="text-white/50">$</Mono>
        <span aria-hidden="true" className="caret inline-block h-4 w-2 bg-violet-300" />
      </div>
    </div>
  );
}

export default function BuildLogSection() {
  return (
    <section id="build-log" aria-labelledby="build-log-title" className="dark scroll-mt-24 bg-night text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Badge variant="outline" className="mb-5 h-7 border-white/20 px-3 font-normal text-white/80">How we work</Badge>
          <h2 id="build-log-title" className="text-3xl font-bold leading-[1.05] sm:text-5xl">
            From brief to launch, <span className="text-violet-300">without the wait.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/70 leading-relaxed">
            No months of back-and-forth. Every step of your build has a job and something you can see,
            so you always know where your project stands.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-white px-6 text-night hover:bg-white/90">
              <Link to="/contact">Start your build <ArrowRight /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 px-6 text-white hover:bg-white/10">
              <Link to="/services">Our services</Link>
            </Button>
          </div>
        </div>
        <Log />
      </div>
    </section>
  );
}
