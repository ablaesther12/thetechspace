import { Clock, CheckCircle2 } from "lucide-react";

// ── Floating background shapes ────────────────────────────────────────────────
const bgShapes = [
    { size: 90, left: "8%", top: "15%", delay: 0, dur: 22, color: "rgba(139,92,246,0.06)", type: "circle" },
    { size: 65, left: "75%", top: "55%", delay: 5, dur: 28, color: "rgba(99,102,241,0.05)", type: "circle" },
    { size: 45, left: "55%", top: "10%", delay: 3, dur: 20, color: "rgba(6,182,212,0.04)", type: "circle" },
    { size: 70, left: "85%", top: "20%", delay: 8, dur: 25, color: "rgba(139,92,246,0.05)", type: "square" },
    { size: 50, left: "15%", top: "65%", delay: 2, dur: 18, color: "rgba(99,102,241,0.04)", type: "square" },
    { size: 55, left: "40%", top: "75%", delay: 10, dur: 24, color: "rgba(6,182,212,0.05)", type: "circle" },
    { size: 35, left: "65%", top: "35%", delay: 7, dur: 19, color: "rgba(139,92,246,0.04)", type: "square" },
    { size: 80, left: "25%", top: "40%", delay: 4, dur: 26, color: "rgba(99,102,241,0.03)", type: "circle" },
];

// ─── Reusable Coming Soon Component ───────────────────────────────────────────
export default function ComingSoon({
    icon: Icon,
    title,
    description,
    features = [],
    accentFrom = "from-violet-500",
    accentTo = "to-indigo-500",
}) {
    return (
        <div className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden">
            {/* ── Animated background ── */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
                {/* Subtle dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.8) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                {/* Floating shapes */}
                {bgShapes.map((s, i) => (
                    <div
                        key={i}
                        className="absolute animate-admin-float"
                        style={{
                            left: s.left,
                            top: s.top,
                            "--float-dur": `${s.dur}s`,
                            "--float-delay": `${s.delay}s`,
                        }}
                    >
                        <div
                            style={{
                                width: s.size,
                                height: s.size,
                                background: s.color,
                                borderRadius: s.type === "circle" ? "50%" : "12px",
                                transform: s.type === "square" ? "rotate(45deg)" : "none",
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* ── Content card ── */}
            <div className="relative z-10 w-full max-w-lg mx-auto text-center px-4">
                {/* Icon + badge */}
                <div className="flex flex-col items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accentFrom} ${accentTo} flex items-center justify-center shadow-lg shadow-violet-500/20`}>
                        <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
                        <Clock className="w-3 h-3" />
                        In Development
                    </span>
                </div>

                {/* Coming Soon title */}
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                    <span className={`bg-gradient-to-r ${accentFrom} ${accentTo} bg-clip-text text-transparent`}>
                        Coming Soon
                    </span>
                </h2>
                <p className="text-lg font-semibold text-slate-800 mb-1">{title}</p>
                <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto leading-relaxed">
                    {description}
                </p>

                {/* Feature list */}
                {features.length > 0 && (
                    <div className="bg-white/80 backdrop-blur border border-slate-200/60 rounded-xl p-5 sm:p-6 shadow-sm text-left">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                            Planned Features
                        </p>
                        <ul className="space-y-3">
                            {features.map((feat, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-3 group"
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    <CheckCircle2 className="w-[18px] h-[18px] text-violet-500 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                                    <span className="text-sm text-slate-700 leading-snug">
                                        {feat}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
