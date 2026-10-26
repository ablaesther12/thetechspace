import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUp, ArrowRight, Check, MousePointer2 } from "lucide-react";

// ─── Hero: "What are we building?" ───────────────────────────────────────────
// Inspo: Anima (prompt as hero), Builder.io (one coloured word, live cursors),
// Design Maestro (glowing product frame), Krea/Diffusion (dark canvas, product
// fills the lower fold). Beams follow the Shadcn Space animated-beam pattern.

const services = [
  { id: "website", label: "Website", contactType: "Website Design & Development" },
  { id: "app", label: "Web or mobile app", contactType: "Web or mobile app" },
  { id: "uiux", label: "UI/UX design", contactType: "UI/UX Design" },
  { id: "brand", label: "Branding", contactType: "Graphic Design & Branding" },
  { id: "marketing", label: "Marketing", contactType: "Marketing & SEO" },
];

// Example briefs typed into the prompt (illustrative, Ghana-local).
const examples = [
  "An online store for my fashion brand in Accra…",
  "A booking app for our clinic in Kumasi…",
  "A new logo and brand for my restaurant…",
  "Google and Instagram ads that bring customers to my shop…",
];

function useTypedPlaceholder(lines, active) {
  const [text, setText] = useState(lines[0]);
  useEffect(() => {
    if (!active) return;
    let line = 0, i = 0, deleting = false, id;
    const tick = () => {
      const full = lines[line];
      if (!deleting) {
        i++;
        setText(full.slice(0, i));
        if (i === full.length) { deleting = true; id = setTimeout(tick, 1800); return; }
      } else {
        i -= 2;
        setText(full.slice(0, Math.max(i, 0)));
        if (i <= 0) { deleting = false; line = (line + 1) % lines.length; }
      }
      id = setTimeout(tick, deleting ? 18 : 42);
    };
    id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  }, [lines, active]);
  return text;
}

// ─── The prompt box ───────────────────────────────────────────────────────────
function BriefPrompt() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [brief, setBrief] = useState("");
  const [picked, setPicked] = useState(["website"]);
  const placeholder = useTypedPlaceholder(examples, !reduceMotion && brief === "");

  const toggle = (id) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const submit = (e) => {
    e.preventDefault();
    const chosen = services.filter((s) => picked.includes(s.id));
    const params = new URLSearchParams();
    if (brief.trim()) params.set("brief", brief.trim());
    if (chosen.length) params.set("services", chosen.map((s) => s.contactType).join("|"));
    navigate(`/contact${params.size ? `?${params}` : ""}#brief`);
  };

  return (
    <form onSubmit={submit} className="relative mx-auto w-full max-w-2xl" aria-label="Start your project">
      {/* glowing rotating border (shine-border pattern) */}
      <div aria-hidden="true" className="hero-shine pointer-events-none absolute -inset-px rounded-[22px]" />
      <div className="relative rounded-[21px] bg-[#0d0a1a]/95 p-3 shadow-[0_30px_80px_-20px_rgb(124_58_237/0.55)] backdrop-blur">
        <label htmlFor="hero-brief" className="sr-only">What are we building?</label>
        <textarea
          id="hero-brief"
          rows={2}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) submit(e); }}
          placeholder={brief ? "" : `What are we building? ${placeholder}`}
          className="block w-full resize-none bg-transparent px-3 pt-2 text-base leading-relaxed text-white placeholder:text-white/45 focus:outline-none focus-visible:outline-none sm:text-lg"
        />
        <div className="mt-2 flex items-end justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="What do you need?">
            {services.map((s) => {
              const on = picked.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${on
                    ? "bg-violet-500/20 text-violet-100 ring-1 ring-inset ring-violet-400/60"
                    : "bg-white/[0.04] text-white/65 ring-1 ring-inset ring-white/10 hover:text-white hover:ring-white/25"
                  }`}
                >
                  {on && <Check className="size-3" aria-hidden="true" />}
                  {s.label}
                </button>
              );
            })}
          </div>
          <button
            type="submit"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-violet-500 text-white shadow-[0_0_24px_rgb(139_92_246/0.8)] transition hover:bg-violet-400"
            aria-label="Send brief and book a call"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── Beams from the prompt into the three panels ──────────────────────────────
function Beams() {
  const paths = ["M500 0 C 500 60, 167 50, 167 120", "M500 0 L 500 120", "M500 0 C 500 60, 833 50, 833 120"];
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 120" preserveAspectRatio="none" className="hidden h-20 w-full md:block">
      <defs>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c4b5fd" stopOpacity="0" />
          <stop offset="0.5" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
      {paths.map((d, i) => (
        <g key={d}>
          <path d={d} stroke="rgb(255 255 255 / 0.08)" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
          <path
            d={d}
            stroke="url(#beam)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
            pathLength="100"
            className="hero-beam"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        </g>
      ))}
    </svg>
  );
}

// ─── Panel chrome ─────────────────────────────────────────────────────────────
function Panel({ label, tag, children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e0b1c]/90 shadow-[0_20px_60px_-25px_rgb(0_0_0/0.8)] backdrop-blur ${className}`}>
      <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-2.5">
        <span className="flex items-center gap-2 text-xs font-semibold text-white/80">
          <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa]" aria-hidden="true" />
          {label}
        </span>
        <span className="font-mono text-[10px] text-white/35">{tag}</span>
      </div>
      <div className="relative h-[220px]">{children}</div>
    </div>
  );
}

const Cursor = ({ name, color, className = "" }) => (
  <div aria-hidden="true" className={`pointer-events-none absolute z-10 ${className}`}>
    <MousePointer2 className="size-4 -rotate-12" style={{ color, fill: color }} />
    <span className="absolute left-3 top-4 whitespace-nowrap rounded-full px-1.5 py-px text-[10px] font-semibold text-white" style={{ background: color }}>
      {name}
    </span>
  </div>
);

// Design: an artboard with a selected component
function DesignPanel() {
  return (
    <Panel label="Design" tag="ui/ux · figma">
      <div className="absolute inset-0 grid grid-cols-[72px_1fr]">
        <div className="space-y-1.5 border-r border-white/[0.07] p-3" aria-hidden="true">
          {["Frame", "Navbar", "Hero", "Button", "Cards"].map((l, i) => (
            <div key={l} className={`rounded px-1.5 py-1 text-[9px] ${i === 3 ? "bg-violet-500/25 text-violet-100" : "text-white/40"}`}>{l}</div>
          ))}
        </div>
        <div className="relative p-4" aria-hidden="true">
          <div className="h-full rounded-lg bg-white/[0.04] p-3 ring-1 ring-white/10">
            <div className="h-2 w-10 rounded bg-white/30" />
            <div className="mt-4 h-3 w-3/4 rounded bg-white/70" />
            <div className="mt-1.5 h-3 w-1/2 rounded bg-white/70" />
            <div className="mt-2 h-1.5 w-2/3 rounded bg-white/20" />
            <div className="relative mt-4 inline-block">
              <div className="h-6 w-20 rounded-full bg-violet-500" />
              <div className="absolute -inset-1.5 rounded-[14px] border border-violet-300" />
              {[["-top-2.5", "-left-2.5"], ["-top-2.5", "-right-2.5"], ["-bottom-2.5", "-left-2.5"], ["-bottom-2.5", "-right-2.5"]].map(([a, b]) => (
                <span key={a + b} className={`absolute ${a} ${b} size-2 rounded-sm border border-violet-300 bg-[#0e0b1c]`} />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-1.5">
              {[0, 1, 2].map((i) => <div key={i} className="h-8 rounded-md bg-white/[0.06] ring-1 ring-white/10" />)}
            </div>
          </div>
          <Cursor name="Emmanuella" color="#ec4899" className="hero-float left-[58%] top-[52%]" />
        </div>
      </div>
    </Panel>
  );
}

// Build: code typing itself
const codeLines = [
  [["c-k", "export default"], ["c-p", " function "], ["c-f", "Hero"], ["c-p", "() {"]],
  [["c-p", "  return ("]],
  [["c-p", "    <"], ["c-t", "section"], ["c-a", " className"], ["c-p", "="], ["c-s", "\"hero\""], ["c-p", ">"]],
  [["c-p", "      <"], ["c-t", "h1"], ["c-p", ">Your business, online</"], ["c-t", "h1"], ["c-p", ">"]],
  [["c-p", "      <"], ["c-t", "Button"], ["c-a", " to"], ["c-p", "="], ["c-s", "\"/contact\""], ["c-p", " />"]],
  [["c-p", "    </"], ["c-t", "section"], ["c-p", ">"]],
  [["c-p", "  );"]],
  [["c-p", "}"]],
];

function BuildPanel() {
  const reduceMotion = useReducedMotion();
  const [shown, setShown] = useState(reduceMotion ? codeLines.length : 1);
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setShown((n) => (n >= codeLines.length + 3 ? 1 : n + 1)), 650);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <Panel label="Build" tag="Hero.jsx" className="md:-translate-y-4">
      <pre className="absolute inset-0 overflow-hidden p-4 font-mono text-[11px] leading-[1.7]" aria-hidden="true">
        {codeLines.slice(0, Math.min(shown, codeLines.length)).map((line, i) => (
          <div key={i} className="flex">
            <span className="mr-3 w-4 select-none text-right text-white/20">{i + 1}</span>
            <span>
              {line.map(([cls, t], j) => <span key={j} className={cls}>{t}</span>)}
              {i === Math.min(shown, codeLines.length) - 1 && <span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-violet-300" />}
            </span>
          </div>
        ))}
      </pre>
      <Cursor name="David" color="#0ea5e9" className="hero-float-slow right-[18%] top-[64%]" />
    </Panel>
  );
}

// Grow: a campaign curve drawing itself
function GrowPanel() {
  return (
    <Panel label="Grow" tag="seo · ads · social">
      <div className="absolute inset-0 p-4" aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white/50">Website visits</span>
          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">campaign live</span>
        </div>
        <svg viewBox="0 0 300 140" className="mt-3 h-[150px] w-full">
          <defs>
            <linearGradient id="growFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.45" />
              <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[35, 70, 105].map((y) => <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="rgb(255 255 255 / 0.06)" />)}
          <path d="M0 120 C 40 115, 60 110, 90 100 S 150 92, 180 70 S 240 40, 300 12 L300 140 L0 140Z" fill="url(#growFill)" className="hero-grow-fill" />
          <path d="M0 120 C 40 115, 60 110, 90 100 S 150 92, 180 70 S 240 40, 300 12" fill="none" stroke="#c4b5fd" strokeWidth="2.5" pathLength="100" className="hero-grow-line" />
          <circle cx="300" cy="12" r="4" fill="#c4b5fd" className="hero-grow-dot" />
        </svg>
        <div className="mt-1 flex justify-between text-[9px] text-white/30">
          <span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span>
        </div>
      </div>
      <Cursor name="Esther" color="#f59e0b" className="hero-float left-[30%] top-[40%]" />
    </Panel>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function HeroSection() {
  const stars = useMemo(
    () => Array.from({ length: 36 }, (_, i) => ({ x: (i * 37.3) % 100, y: (i * 61.7) % 70, s: i % 5 === 0 ? 2 : 1, o: 0.15 + ((i * 13) % 40) / 100 })),
    []
  );

  return (
    <section aria-labelledby="hero-title" className="dark relative isolate overflow-hidden bg-[#06040d] text-white">
      {/* ── Atmosphere ── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-18%] h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.55),rgb(76_29_149/0.25)_45%,transparent)] blur-2xl" />
        <div className="hero-aurora absolute left-[12%] top-[8%] h-[360px] w-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(217_70_239/0.28),transparent)] blur-3xl" />
        <div className="hero-aurora-alt absolute right-[8%] top-[18%] h-[320px] w-[380px] rounded-full bg-[radial-gradient(closest-side,rgb(56_189_248/0.18),transparent)] blur-3xl" />
        {stars.map((s, i) => (
          <span key={i} className="absolute rounded-full bg-white" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, opacity: s.o }} />
        ))}
        {/* planet horizon behind the studio canvas */}
        <div className="absolute left-1/2 top-[640px] h-[1400px] w-[2200px] -translate-x-1/2 rounded-[50%] border-t border-violet-300/40 bg-[#06040d] shadow-[0_-30px_120px_-10px_rgb(139_92_246/0.6),inset_0_40px_80px_-40px_rgb(167_139_250/0.35)] md:top-[600px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pt-32 sm:px-6 md:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            {...fadeUp(0)}
            id="hero-title"
            className="text-[2.6rem] font-bold leading-[1.02] text-white sm:text-6xl lg:text-[4.6rem]"
          >
            We design, build and{" "}
            <span className="text-violet-300 [text-shadow:0_0_40px_rgb(167_139_250/0.65)]">grow</span>{" "}
            digital products.
          </motion.h1>
          <motion.p {...fadeUp(0.1)} className="mx-auto mt-6 max-w-2xl text-lg text-white/65 sm:text-xl">
            Software, UI/UX and marketing from one Ghanaian team, so you launch sooner without cutting corners.
          </motion.p>
        </div>

        <motion.div {...fadeUp(0.2)} className="mt-10">
          <BriefPrompt />
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/55">
            <span>Tell us in a sentence. We reply within 24 hours.</span>
            <a href="#build-log" className="inline-flex items-center gap-1 font-medium text-white/80 hover:text-white">
              See how we work <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          </p>
        </motion.div>

        {/* ── Studio canvas: one brief → design, build, grow ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-6 pb-20 md:mt-4"
        >
          <Beams />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="hidden md:block"><DesignPanel /></div>
            <BuildPanel />
            <div className="hidden md:block"><GrowPanel /></div>
          </div>
          <p className="mt-4 text-center font-mono text-[11px] text-white/30">illustrative · how a TTS project moves from brief to growth</p>
        </motion.div>
      </div>

      {/* fade into the next (night) section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-night" />
    </section>
  );
}
