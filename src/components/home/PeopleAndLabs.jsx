import { Mail } from "lucide-react";
import { ButtonLink } from "../ui/primitives";
import { BorderBeam } from "../ui/BorderBeam";
import { Marquee } from "@/components/shadcn-space/radix/animations/marquee";

// ── Closing call to action ───────────────────────────────────────────────────
// cta-02 pattern (Shadcn Space): a panel over a marquee band, here listing
// what TTS does instead of a video background.
const ctaMarquee = ["Websites", "Web & mobile apps", "UI/UX design", "Branding", "SEO", "Social media marketing", "Product strategy", "Maintenance & support"];

export function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-canvas px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-t-3xl bg-night px-6 py-16 text-center sm:px-12 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-80 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(124_58_237/0.55),transparent)] blur-2xl" />
        <BorderBeam duration={9} size={160} />
        <div className="relative">
          <h2 id="cta-title" className="mx-auto max-w-3xl text-4xl sm:text-6xl font-bold leading-[1.02] text-white">
            Tell us the idea. <span className="text-violet-300">We'll help you ship it.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">
            One call is all it takes to plan your project and a launch that comes sooner than you think.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ButtonLink to="/contact" variant="light" arrow>Book a call</ButtonLink>
            <a
              href="mailto:hello@thetechspace.com"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white ring-1 ring-inset ring-white/20 hover:bg-white/10 transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> hello@thetechspace.com
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-b-3xl bg-brand py-3.5">
        <p className="sr-only">Services: {ctaMarquee.join(", ")}</p>
        <Marquee className="p-0 [--duration:36s] [--gap:1.5rem]" pauseOnHover aria-hidden="true">
          {ctaMarquee.map((item) => (
            <span key={item} className="flex items-center gap-6 whitespace-nowrap text-sm font-semibold text-white">
              {item}
              <span className="size-1.5 rounded-full bg-violet-200" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
