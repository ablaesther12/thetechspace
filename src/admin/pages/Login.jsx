import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Mail, Lock, Loader2 } from "lucide-react";
import logo1 from "../../assets/img/logo1.png";

// ─── Floating tech shape definitions ──────────────────────────────────────────
const techParticles = [
    // Hexagons (outlines only — circuit board vibe)
    { type: "hexagon", size: 42, left: "8%", delay: 0, dur: 19, color: "rgba(139,92,246,0.18)" },
    { type: "hexagon", size: 58, left: "78%", delay: 6, dur: 26, color: "rgba(99,102,241,0.12)" },
    { type: "hexagon", size: 34, left: "45%", delay: 13, dur: 22, color: "rgba(6,182,212,0.14)" },
    // Squares (rotated — diamond shapes)
    { type: "square", size: 28, left: "62%", delay: 3, dur: 21, color: "rgba(139,92,246,0.12)" },
    { type: "square", size: 18, left: "22%", delay: 10, dur: 17, color: "rgba(99,102,241,0.15)" },
    { type: "square", size: 24, left: "88%", delay: 7, dur: 24, color: "rgba(6,182,212,0.1)" },
    // Circles (small glowing dots)
    { type: "circle", size: 10, left: "15%", delay: 2, dur: 14, color: "rgba(6,182,212,0.35)" },
    { type: "circle", size: 7, left: "55%", delay: 8, dur: 16, color: "rgba(139,92,246,0.30)" },
    { type: "circle", size: 12, left: "72%", delay: 1, dur: 18, color: "rgba(99,102,241,0.25)" },
    { type: "circle", size: 5, left: "35%", delay: 5, dur: 12, color: "rgba(6,182,212,0.40)" },
    { type: "circle", size: 8, left: "90%", delay: 11, dur: 15, color: "rgba(139,92,246,0.28)" },
    // Tiny dots (ambient particles)
    { type: "dot", size: 4, left: "18%", delay: 0, dur: 11, color: "rgba(6,182,212,0.5)" },
    { type: "dot", size: 3, left: "40%", delay: 4, dur: 13, color: "rgba(139,92,246,0.45)" },
    { type: "dot", size: 5, left: "65%", delay: 9, dur: 10, color: "rgba(99,102,241,0.4)" },
    { type: "dot", size: 3, left: "82%", delay: 2, dur: 14, color: "rgba(6,182,212,0.45)" },
    { type: "dot", size: 4, left: "28%", delay: 7, dur: 12, color: "rgba(139,92,246,0.5)" },
    { type: "dot", size: 3, left: "50%", delay: 15, dur: 9, color: "rgba(99,102,241,0.5)" },
];

// Render a single shape element
const TechShape = ({ type, size, color }) => {
    if (type === "hexagon") {
        return (
            <svg width={size} height={size} viewBox="0 0 100 100">
                <polygon
                    points="50,2 95,25 95,75 50,98 5,75 5,25"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                />
            </svg>
        );
    }
    if (type === "square") {
        return (
            <div
                style={{
                    width: size,
                    height: size,
                    border: `1.5px solid ${color}`,
                    transform: "rotate(45deg)",
                    borderRadius: 3,
                }}
            />
        );
    }
    if (type === "circle") {
        return (
            <div
                style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: color,
                    boxShadow: `0 0 ${size * 2}px ${color}`,
                }}
            />
        );
    }
    // dot
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: "50%",
                background: color,
            }}
        />
    );
};

// ─── Login Page ───────────────────────────────────────────────────────────────
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/admin";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await login(email, password);
        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)",
            }}
        >
            {/* ── Animated tech background ────────────────────────────────────────── */}
            <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Floating tech particles */}
                {techParticles.map((p, i) => (
                    <div
                        key={i}
                        className="absolute animate-tech-rise"
                        style={{
                            left: p.left,
                            bottom: "-10%",
                            "--rise-duration": `${p.dur}s`,
                            "--rise-delay": `${p.delay}s`,
                        }}
                    >
                        <TechShape type={p.type} size={p.size} color={p.color} />
                    </div>
                ))}

                {/* Ambient glow orbs */}
                <div
                    className="absolute w-[500px] h-[500px] rounded-full animate-glow"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
                        top: "5%",
                        left: "15%",
                        filter: "blur(80px)",
                    }}
                />
                <div
                    className="absolute w-[400px] h-[400px] rounded-full animate-glow"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
                        bottom: "10%",
                        right: "10%",
                        filter: "blur(80px)",
                        animationDelay: "2s",
                    }}
                />
            </div>

            {/* ── Login card ──────────────────────────────────────────────────────── */}
            <div className="relative z-10 w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-3">
                        <img
                            src={logo1}
                            alt="Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <span className="text-2xl font-bold text-white tracking-tight">
                            The<span className="text-violet-400">Tech</span>Space
                        </span>
                    </div>
                    <p className="text-slate-400 text-sm">
                        Sign in to the Admin Console
                    </p>
                </div>

                {/* Card */}
                <div className="bg-slate-800/60 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-black/20 hover:shadow-violet-500/5 transition-shadow duration-500">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 animate-pulse">
                                {error}
                            </div>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@thetechspace.com"
                                    required
                                    className="w-full bg-slate-700/40 border border-slate-600/50 text-white placeholder-slate-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-violet-500/50 focus:bg-slate-700/60 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-slate-700/40 border border-slate-600/50 text-white placeholder-slate-500 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/70 focus:border-violet-500/50 focus:bg-slate-700/60 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    {/* Demo hint */}
                    <div className="mt-6 pt-5 border-t border-slate-700/50">
                        <p className="text-[11px] text-slate-500 text-center">
                            Demo: admin@thetechspace.com / admin123
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
