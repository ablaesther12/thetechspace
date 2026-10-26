# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Ghana SMEs.** Local small and medium businesses that need to get online, look credible, and win customers. Usually non-technical owners deciding quickly and on a budget.
- **African startups.** Early-stage and funded teams across Africa that need product design, UI, development and brand to launch or scale.
- **Talent and learners.** Young Ghanaian and African designers and developers who want to join, train with, or intern at TTS.
- **Internal staff (admin console).** The TTS team managing site content: posts, team, services, milestones and incoming messages.

## Product Purpose

The Tech Space (TTS) is a Ghanaian design, development and marketing studio that is also building its own software products. The website must turn SMEs and startups into enquiries ("Book a call"), show talent that TTS is a place to grow, and give the team an admin console to keep the site current.

## Positioning

A local, founder-led studio that ships fast without cutting corners. The brand promises speed, not a day count: do not state a number of days or weeks for delivery. TTS combines design, development and marketing under one roof and builds its own products, so client work is done by people who build and ship software themselves, not by a reseller.

## Operating Context

- Visitors arrive on phones as often as desktops, often on mobile data; pages must stay fast.
- The main conversion is a call or contact enquiry; there is no self-serve checkout or pricing page.
- The admin console is used by a small in-house team; authentication and data are mocked today and will be wired to the backend later.

## Capabilities and Constraints

- Services: website design and development, graphic design and branding, UI/UX design, SEO and marketing.
- Stack: React 19 + Vite + Tailwind v4, motion/react, GSAP, lucide-react. Keep to this stack.
- Contact form delivery is not wired up yet (`src/lib/sendContactMessage.js`).
- **Open:** which in-house software products TTS builds and whether they get their own page; studio location/address; pricing.

## Brand Commitments

- Name: The Tech Space, short form TTS. Existing logo: `src/assets/img/logo1.png`.
- Core promise: "Launch sooner, without cutting corners." Speed is a brand commitment, but never as a fixed number of days (founder decision, Oct 2026).

## Evidence on Hand

- **Real:** team names and photos (Daniel Oppong-Boah, CEO; Esther Abla Dzampah, co-founder; Jeffery Boafo, co-founder; David Mensah, lead developer; Emmanuella Asante, product designer) in `src/assets/img/`.
- **Real:** fast delivery (no fixed day count is promised).
- **Placeholder, to be replaced by the founder:** the portfolio in `src/data/projectsData.js`. The real portfolio will be supplied; until then, project content stays clearly placeholder.
- **Not verified, do not present as fact:** client counts, satisfaction percentages, "50,000+ projects", "Series A $2.5M", "15+ countries", "500+ clients", the testimonials and their randomuser.me portraits, the phone number and street address.

## Product Principles

1. Speed is the proof: show how fast and how concretely TTS ships, not vague promises.
2. Local and accountable: real Ghanaian people with names and faces, never stock "global agency" gloss.
3. Builders, not resellers: TTS makes its own products, and the site should feel made by people who build.
4. Never fake evidence: no invented numbers, clients or testimonials; mark placeholders openly.
5. One clear next step on every page: book a call (clients) or get involved (talent).

## Accessibility & Inclusion

WCAG 2.1 AA. Respect reduced motion. Keep pages light for mobile data.
