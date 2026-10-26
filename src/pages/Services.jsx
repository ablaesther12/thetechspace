import { Check } from "lucide-react";
import WD1 from "../assets/img/WD1.png";
import GD1 from "../assets/img/GD1.png";
import UI2 from "../assets/img/UI2.png";
import S1 from "../assets/img/S1.jpg";
import ServicesExplorer from "@/components/sections/ServicesExplorer";
import PageHeader from "../components/ui/PageHeader";
import { ButtonLink, Container, Mono, SectionHeading, Status } from "../components/ui/primitives";
import { FinalCta } from "../components/home/PeopleAndLabs";
import { buildLog } from "../data/buildLog";
import { ServiceOrbit } from "@/components/sections/HeroVisuals";

const services = [
  {
    id: "web",
    title: "Website design & development",
    description: "Custom websites built with modern technologies, optimized for performance and conversions.",
    features: ["Responsive design", "SEO optimization", "Fast loading speed", "CMS integration", "E-commerce solutions", "Maintenance & support"],
    image: WD1,
  },
  {
    id: "brand",
    title: "Graphic design & branding",
    description: "Visual identity and marketing materials that make your brand stand out from the competition.",
    features: ["Logo design", "Brand identity", "Marketing materials", "Print design", "Packaging design", "Social media graphics"],
    image: GD1,
  },
  {
    id: "product",
    title: "UI/UX design",
    description: "User-centered design that creates intuitive experiences and drives engagement across all devices.",
    features: ["User research", "Wireframing", "Prototyping", "User testing", "Mobile app design", "Design systems"],
    image: UI2,
  },
  {
    id: "marketing",
    title: "SEO & marketing",
    description: "Boost your online visibility and drive qualified traffic to your website. Data-driven strategies that turn visits into enquiries.",
    features: ["Search engine optimization", "Content marketing", "Social media marketing", "Pay-per-click advertising", "Email campaigns", "Analytics & reporting"],
    image: S1,
  },
];

const moreServices = [
  { title: "Digital strategy", description: "Comprehensive digital strategies that align with your business goals." },
  { title: "Performance optimization", description: "Speed up your website and improve user experience across all devices." },
];

const pad = (n) => String(n).padStart(2, "0");

export default function ServicesPage() {
  return (
    <div>
      <PageHeader
        crumb="Services"
        badge="Design · Build · Grow"
        title="Design, build and growth under one roof."
        lede="From concept to launch, we provide end-to-end digital services that help your business thrive."
        actions={
          <>
            <ButtonLink to="/contact" arrow>Get a quote</ButtonLink>
            <ButtonLink to="/services#process" variant="ghostOnDark">See how we work</ButtonLink>
          </>
        }
        aside={<ServiceOrbit />}
      />

      <ServicesExplorer services={services} />

      {/* Also available */}
      <section aria-label="Also available" className="bg-canvas">
        <Container className="pb-20 md:pb-28">
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {moreServices.map((s) => (
              <li key={s.title} className="bg-panel p-7">
                <h3 className="font-display text-xl font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-dim">{s.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* The build process */}
      <section id="process" aria-labelledby="process-title" className="scroll-mt-24 border-y border-line bg-panel">
        <Container className="py-20 md:py-28">
          <SectionHeading
            id="process-title"
            title="Clear steps, no guesswork."
            lede="Every build follows the same steps, so you always know what happens next and what you'll see along the way."
          />
          <ol className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {buildLog.map((step) => {
              const launch = step.day === buildLog.length;
              return (
                <li
                  key={step.day}
                  className={`rounded-xl border p-5 ${launch ? "border-brand bg-brand text-white" : "border-line bg-canvas"}`}
                >
                  <Mono className={launch ? "text-white/80" : "text-brand"}>step {pad(step.day)}</Mono>
                  <h3 className={`mt-2 font-display text-lg font-bold leading-tight ${launch ? "text-white" : "text-ink"}`}>{step.title}</h3>
                  <p className={`mt-2 text-sm ${launch ? "text-white/85" : "text-dim"}`}>{step.detail}</p>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <div className="bg-canvas pt-24">
        <FinalCta />
      </div>
    </div>
  );
}
