// "Why TTS" — adapted from Shadcn Space feature-28 (bento of reasons with a
// WebGL GradientWaves card). Absorbs the old products + talent cards.
import { lazy, Suspense } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { Zap, Layers, MapPin, Code2, ShieldCheck, GraduationCap, Headphones, KeyRound, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// WebGL (ogl) shader, loaded on demand so it stays out of the main bundle.
const GradientWaves = lazy(() => import("@/components/shadcn-space/radix/animations/GradientWaves"));

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };
const cardIn = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
};

const topRow = [
  { icon: Zap, title: "Launch sooner", description: "Short, visible steps get you live sooner, without cutting corners." },
  { icon: Layers, title: "One team, end to end", description: "Design, development and marketing under one roof. No hand-offs between agencies." },
  { icon: MapPin, title: "Local and accountable", description: "A Ghanaian team you can meet, call and hold to account." },
];

const bottomRow = [
  { icon: ShieldCheck, title: "Quality you can see", description: "Every step ends with something you can click, review and approve." },
  { icon: Headphones, title: "Support after launch", description: "Maintenance and support packages keep your site secure and up to date." },
  { icon: KeyRound, title: "Handover included", description: "We show your team how to update the site themselves." },
];

function ReasonCard({ icon: Icon, title, description }) {
  return (
    <motion.div variants={cardIn} className="flex min-h-56 flex-col justify-between gap-8 rounded-2xl border bg-card p-6 sm:min-h-64">
      <div className="flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
}

export default function WhyTts() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="why-title" className="w-full bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={stagger}
          className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center md:mb-16"
        >
          <motion.div variants={fadeUp}>
            <Badge className="h-auto rounded-lg border-border bg-background px-3 py-1 text-sm font-normal text-foreground">Why TTS</Badge>
          </motion.div>
          <motion.h2 variants={fadeUp} id="why-title" className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Built by a team that ships.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-base text-muted-foreground md:text-lg">
            What working with TTS feels like, from the first call to long after launch.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {topRow.map((c) => <ReasonCard key={c.title} {...c} />)}

          {/* Dark wave card: our own products */}
          <motion.div variants={cardIn} className="relative flex min-h-64 flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-[#0b0718] p-6 sm:col-span-2">
            <div className="absolute inset-0" aria-hidden="true">
              {reduceMotion ? (
                <div className="h-full w-full bg-[radial-gradient(ellipse_at_70%_80%,rgb(139_92_246/0.6),transparent_60%)]" />
              ) : (
                <Suspense fallback={<div className="h-full w-full bg-[radial-gradient(ellipse_at_70%_80%,rgb(139_92_246/0.6),transparent_60%)]" />}>
                <GradientWaves
                  horizonColor="#a78bfa"
                  waveColor="#6d28d9"
                  crestColor="#f5f3ff"
                  speed={0.35}
                  amplitude={2.5}
                  waveScale={0.6}
                  waveRatio={0.9}
                  swell={35}
                  turbulence={20}
                  tilt={1.11}
                  zoom={1.0}
                  height={5.5}
                  fogDepth={15}
                  detail="medium"
                  brightness={1.25}
                  opacity={1.0}
                  mouseInteraction={true}
                  parallaxStrength={0.5}
                  grain={true}
                  grainIntensity={0.05}
                />
                </Suspense>
              )}
            </div>
            {/* tint the shader violet (keeps its light and shade), then shade the text area */}
            <div className="pointer-events-none absolute inset-0 bg-violet-600 mix-blend-color" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0718]/85 via-[#0b0718]/20 to-transparent" aria-hidden="true" />
            <div className="relative z-10 flex size-11 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
              <Code2 className="size-5" aria-hidden="true" />
            </div>
            <div className="relative z-10 flex flex-col gap-1.5">
              <h3 className="text-lg font-semibold tracking-tight text-white">Builders, not resellers</h3>
              <p className="text-sm text-white/75">
                We design and ship our own software too, so your project is built by people who run products in production.
              </p>
              {/* TODO(content): name the products once they are public. */}
              <span className="mt-2 w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-violet-100 ring-1 ring-inset ring-white/15">Products announced soon</span>
            </div>
          </motion.div>

          <ReasonCard {...bottomRow[0]} />

          {/* Talent card */}
          <motion.div variants={cardIn} className="flex min-h-64 flex-col justify-between gap-8 rounded-2xl border border-primary/20 bg-secondary p-6 sm:col-span-2">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="size-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">Grow with TTS</h3>
                <p className="text-sm text-muted-foreground">
                  Young designers and developers in Ghana and across Africa: learn by shipping real work with a team that ships fast.
                </p>
              </div>
              <Button asChild size="sm" className="w-fit rounded-full">
                <Link to="/contact">Introduce yourself <ArrowRight /></Link>
              </Button>
            </div>
          </motion.div>

          {bottomRow.slice(1).map((c) => <ReasonCard key={c.title} {...c} />)}
        </motion.div>
      </div>
    </section>
  );
}
