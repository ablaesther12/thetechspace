// The build process, step by step, as shown on the homepage build log and the
// Services page. Deliberately has no durations: TTS promises speed, never a
// day count. DRAFT written from the site's existing process copy —
// TODO(Daniel): replace with what actually happens at each step at TTS.
//
// Each step: { day, title, detail, output } — `day` is the step number;
// `output` is the tangible thing the client receives at that step.
export const buildLog = [
  {
    day: 1,
    title: "Kick-off call",
    detail: "We agree goals, pages and audience, and collect your logo, photos and copy.",
    output: "brief.pdf",
  },
  {
    day: 2,
    title: "Structure",
    detail: "Sitemap and wireframes for every page, approved by you before design starts.",
    output: "sitemap + wireframes",
  },
  {
    day: 3,
    title: "Design",
    detail: "Your homepage designed in your brand, then the inner pages to match.",
    output: "design preview link",
  },
  {
    day: 4,
    title: "Build",
    detail: "Pages developed, responsive on phones, tablets and desktops.",
    output: "staging site",
  },
  {
    day: 5,
    title: "Content & SEO",
    detail: "Copy and images placed, search basics and analytics set up.",
    output: "SEO checklist",
  },
  {
    day: 6,
    title: "Review",
    detail: "Your feedback round: we fix, polish and test speed on mobile data.",
    output: "change log",
  },
  {
    day: 7,
    title: "Launch",
    detail: "Domain connected, site live, and a handover so your team can update it.",
    output: "yourbusiness.com — live",
  },
];
