// Decorative growth curve under the stats. It isn't real data, so it's a
// plain SVG instead of a charting library (recharts added ~350 KB to the
// homepage bundle for this one shape).
const CURVE = "M0 168 C 120 160, 220 148, 333 128 S 560 96, 667 72 S 880 30, 1000 8";
// TODO(content): replace with verified figures before launch.
const stats = [
    { value: "50,000+", label: "Projects Completed" },
    { value: "99.9%", label: "Client Satisfaction" },
    { value: "1,200+", label: "Happy Clients" },
    { value: "24/7", label: "Support Available" },
];

export default function StatsSection() {
    return (
        <section aria-labelledby="stats-heading" className="w-full max-w-6xl mx-auto text-left py-24 md:py-32">
            <div className="px-4 sm:px-6">
                <h2 id="stats-heading" className="max-w-4xl text-2xl sm:text-3xl lg:text-4xl font-semibold leading-snug text-slate-900 mb-12 md:mb-16">
                    Proven results you can trust.{" "}
                    <span className="text-slate-500">
                        We deliver quality solutions, build strong client relationships, and provide dependable support to help your business grow with confidence.
                    </span>
                </h2>

                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col-reverse gap-1">
                            <dt className="text-slate-600 text-sm sm:text-base">{stat.label}</dt>
                            <dd className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <svg
                className="w-full h-40 md:h-48 mt-8"
                viewBox="0 0 1000 176"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="statsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <path d={`${CURVE} L1000 176 L0 176 Z`} fill="url(#statsFill)" />
                <path d={CURVE} fill="none" stroke="#7c3aed" strokeWidth={2} vectorEffect="non-scaling-stroke" />
            </svg>
        </section>
    );
}
