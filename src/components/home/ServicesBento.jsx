// Homepage services — adapted from Shadcn Space bento-grid-03: services in
// ruled columns either side of a centre panel of "who we build for" marquees.
import { Link } from "react-router";
import {
  Code2, Palette, PenTool, TrendingUp, Store, Rocket, UtensilsCrossed, Stethoscope,
  GraduationCap, Shirt, HeartHandshake, Building2, Mic2, ShoppingBag, Plane, Landmark, ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/shadcn-space/radix/animations/marquee";

const left = [
  { icon: Code2, title: "Websites & web apps", description: "Fast, mobile-first websites and web apps, designed in your brand and built to bring in customers." },
  { icon: PenTool, title: "UI/UX for products", description: "Research, flows and interfaces people understand the first time, from MVP to mature product." },
];

const right = [
  { icon: Palette, title: "Brand & graphic design", description: "Logos, colours and everything printed or posted, so your business looks as good as it is." },
  { icon: TrendingUp, title: "SEO & marketing", description: "Get found on Google and social, then turn those visits into orders, bookings and calls." },
];

// Who TTS builds for (centre panel)
const rows = [
  [
    { icon: Store, label: "Small businesses" },
    { icon: Rocket, label: "Startups" },
    { icon: UtensilsCrossed, label: "Restaurants" },
    { icon: Stethoscope, label: "Clinics" },
  ],
  [
    { icon: GraduationCap, label: "Schools" },
    { icon: Shirt, label: "Fashion brands" },
    { icon: HeartHandshake, label: "NGOs" },
    { icon: Building2, label: "Real estate" },
  ],
  [
    { icon: Mic2, label: "Creators" },
    { icon: ShoppingBag, label: "Online stores" },
    { icon: Plane, label: "Travel & tours" },
    { icon: Landmark, label: "Finance" },
  ],
];

function FeatureItem({ icon: Icon, title, description }) {
  return (
    <Link to="/services" className="group flex flex-1 flex-col justify-between gap-10 p-8 transition-colors hover:bg-accent/60">
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <ArrowUpRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:rotate-45 group-hover:text-primary" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

function AudienceCloud() {
  return (
    <div className="dark relative h-full overflow-hidden bg-[#0b0718]">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgb(124_58_237/0.55),transparent_65%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgb(56_189_248/0.18),transparent_70%)]" />
      <div className="relative flex h-full flex-col justify-center gap-5 py-10">
        <p className="sr-only">We build for: {rows.flat().map((t) => t.label).join(", ")}</p>
        {rows.map((row, i) => (
          <Marquee key={i} reverse={i % 2 === 1} className="p-0 [--duration:28s] [--gap:0.75rem]" aria-hidden="true">
            {row.map((tag) => (
              <Badge
                key={tag.label}
                variant="outline"
                className="flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border-white/20 bg-white/5 px-4 text-sm font-medium text-white backdrop-blur-sm"
              >
                <tag.icon className="size-4" />
                {tag.label}
              </Badge>
            ))}
          </Marquee>
        ))}
        <p className="px-6 text-center text-sm text-white/70">Who we build for</p>
      </div>
    </div>
  );
}

export default function ServicesBento() {
  return (
    <section aria-labelledby="services-title" className="relative w-full overflow-hidden bg-background py-20 md:py-28">
      {/* bento-grid-03 vertical rules */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="mx-auto h-full max-w-6xl px-4 sm:px-6">
          <div className="h-full w-full border-x border-border" />
        </div>
      </div>

      <div className="relative w-full border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 pb-12 text-center sm:px-6">
          <Badge variant="outline" className="h-7 px-3 text-sm font-normal">What we do</Badge>
          <h2 id="services-title" className="max-w-3xl text-3xl font-semibold text-foreground sm:text-5xl">
            One studio for design, build and growth.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
            Design, development and marketing under one roof, so your website, product and campaigns come from the same team.
          </p>
        </div>
      </div>

      <div className="relative w-full border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <div className="flex flex-col divide-y divide-border border-b border-border lg:border-b-0 lg:border-r">
              {left.map((f) => <FeatureItem key={f.title} {...f} />)}
            </div>
            <div className="aspect-[4/3] border-b border-border sm:aspect-video lg:aspect-auto lg:min-h-[460px] lg:border-b-0 lg:border-r">
              <AudienceCloud />
            </div>
            <div className="flex flex-col divide-y divide-border">
              {right.map((f) => <FeatureItem key={f.title} {...f} />)}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-10 flex justify-center px-4">
        <Button asChild variant="outline" className="rounded-full px-5">
          <Link to="/services">Explore all services <ArrowUpRight /></Link>
        </Button>
      </div>
    </section>
  );
}
