import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X, CheckCircle, TrendingUp, Users, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Service Data ────────────────────────────────────────────────────────────
const services = [
    {
        title: "Website Design & Development",
        tagline: "Custom websites built for performance",
        color: "bg-[#ff4747] text-white",
        accent: "#ff4747",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600",
        description:
            "Custom websites built with modern technologies, optimized for performance and conversions. We craft responsive, fast-loading digital experiences.",
        benefits: [
            "Responsive Design",
            "SEO Optimization",
            "Fast Loading Speed",
            "CMS Integration",
            "E-commerce Solutions",
            "Maintenance & Support",
        ],
        stats: [
            { label: "Websites Launched", value: "150+" },
            { label: "Avg. Speed Score", value: "95+" },
            { label: "Client Satisfaction", value: "99%" },
        ],
    },
    {
        title: "Graphic Design",
        tagline: "Visuals that speak louder than words",
        color: "bg-white text-black border border-neutral-200",
        accent: "#6366f1",
        image: "https://images.unsplash.com/photo-1626785774625-0d188e8c0c4c?w=600",
        description:
            "Visual identity and marketing materials that make your brand stand out from the competition. We translate your brand's voice into stunning visuals.",
        benefits: [
            "Logo Design",
            "Brand Identity",
            "Marketing Materials",
            "Print Design",
            "Packaging Design",
            "Social Media Graphics",
        ],
        stats: [
            { label: "Projects Delivered", value: "200+" },
            { label: "Brand Revamps", value: "60+" },
            { label: "Client Satisfaction", value: "98%" },
        ],
    },
    {
        title: "UI/UX Design",
        tagline: "Intuitive experiences, seamless engagement",
        color: "bg-[#f3f3f3] text-black border border-neutral-200",
        accent: "#10b981",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600",
        description:
            "User-centered design that creates intuitive experiences and drives engagement across all devices. From research to polished design systems.",
        benefits: [
            "User Research",
            "Wireframing",
            "Prototyping",
            "User Testing",
            "Mobile App Design",
            "Design Systems",
        ],
        stats: [
            { label: "Apps Designed", value: "80+" },
            { label: "User Satisfaction", value: "96%" },
            { label: "Usability Boost", value: "40%" },
        ],
    },
    {
        title: "SEO & Marketing",
        tagline: "Drive qualified traffic to your website",
        color: "bg-[#4f8df7] text-white",
        accent: "#4f8df7",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600",
        description:
            "Boost your online visibility and drive qualified traffic to your website. Our data-driven strategies ensure measurable growth.",
        benefits: [
            "Search Engine Optimization",
            "Content Marketing Strategy",
            "Social Media Marketing",
            "Pay-Per-Click Advertising",
            "Email Marketing Campaigns",
            "Analytics & Reporting",
        ],
        stats: [
            { label: "Avg. Traffic Growth", value: "65%" },
            { label: "Campaigns Managed", value: "300+" },
            { label: "ROI Delivered", value: "4.5×" },
        ],
    },
];

// ─── Modal Component ─────────────────────────────────────────────────────────
function ServiceModal({ service, onClose }) {
    const overlayRef = useRef(null);
    const panelRef = useRef(null);
    const contentRef = useRef(null);

    // Open animation
    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: "power2.out" }
        )
            .fromTo(panelRef.current,
                { opacity: 0, scale: 0.88, y: 60 },
                { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" },
                "-=0.2"
            )
            .fromTo(
                contentRef.current?.querySelectorAll(".modal-item"),
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.07, duration: 0.35, ease: "power2.out" },
                "-=0.15"
            );
    }, []);

    // Close animation
    const handleClose = () => {
        const tl = gsap.timeline({ onComplete: onClose });
        tl.to(panelRef.current, {
            opacity: 0, scale: 0.9, y: 40,
            duration: 0.3, ease: "power2.in",
        })
            .to(overlayRef.current, {
                opacity: 0,
                duration: 0.2, ease: "power2.in",
            }, "-=0.15");
    };

    // Close on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) handleClose();
    };

    const isLight = service.color.includes("bg-white") || service.color.includes("bg-[#f3f3f3]");

    return (
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            style={{
                position: "fixed", inset: 0, zIndex: 1000,
                backgroundColor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(6px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px",
            }}
        >
            <div
                ref={panelRef}
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "780px",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    borderRadius: "24px",
                    background: "#fff",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
                    scrollbarWidth: "none",
                }}
            >
                {/* Header Banner */}
                <div
                    style={{
                        background: service.accent,
                        padding: "40px 36px 32px",
                        position: "relative",
                        borderRadius: "24px 24px 0 0",
                        overflow: "hidden",
                    }}
                >


                    {/* Close */}
                    <button
                        onClick={handleClose}
                        className="modal-item"
                        style={{
                            position: "absolute", top: 20, right: 20,
                            background: "rgba(255,255,255,0.2)",
                            border: "none", borderRadius: "50%",
                            width: 38, height: 38,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "#fff",
                            backdropFilter: "blur(4px)",
                            transition: "background 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
                        onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                    >
                        <X size={18} />
                    </button>

                    <p className="modal-item" style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500, letterSpacing: "0.08em", marginBottom: 8 }}>
                        SERVICE
                    </p>
                    <h2 className="modal-item" style={{ color: "#fff", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
                        {service.title}
                    </h2>
                    <p className="modal-item" style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, marginTop: 8, fontStyle: "italic" }}>
                        {service.tagline}
                    </p>
                </div>

                {/* Body */}
                <div ref={contentRef} style={{ padding: "32px 36px 36px" }}>

                    {/* Hero Image */}
                    <div className="modal-item" style={{
                        borderRadius: 16, overflow: "hidden", marginBottom: 28,
                        height: 200, boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    }}>
                        <img
                            src={service.image}
                            alt={service.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>

                    {/* Description */}
                    <p className="modal-item" style={{
                        color: "#444", fontSize: 16, lineHeight: 1.75,
                        marginBottom: 28,
                    }}>
                        {service.description}
                    </p>

                    {/* Stats Row */}
                    <div className="modal-item" style={{
                        display: "flex", flexWrap: "wrap",
                        gap: 16, marginBottom: 32,
                        justifyContent: "center",
                    }}>
                        {service.stats.map((stat, i) => (
                            <div key={i} style={{
                                background: "#f8f8f8", borderRadius: 14,
                                padding: "18px 16px", textAlign: "center",
                                border: "1px solid #eee",
                                flex: "1 1 0", minWidth: 100,
                            }}>
                                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: service.accent, lineHeight: 1 }}>
                                    {stat.value}
                                </div>
                                <div style={{ fontSize: 12, color: "#888", marginTop: 6, fontWeight: 500 }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Benefits */}
                    <div className="modal-item">
                        <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 14, letterSpacing: "0.02em" }}>
                            WHAT'S INCLUDED
                        </h4>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                            {service.benefits.map((b, i) => (
                                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#333", lineHeight: 1.5 }}>
                                    <CheckCircle size={16} style={{ color: service.accent, flexShrink: 0, marginTop: 2 }} />
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="modal-item" style={{ marginTop: 32, display: "flex", gap: 12 }}>
                        <button
                            style={{
                                background: service.accent,
                                color: "#fff",
                                border: "none",
                                borderRadius: 12,
                                padding: "14px 28px",
                                fontSize: 14,
                                fontWeight: 700,
                                cursor: "pointer",
                                display: "flex", alignItems: "center", gap: 8,
                                transition: "filter 0.2s, transform 0.15s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.filter = "brightness(1)"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            Get Started <ArrowRight size={16} />
                        </button>
                        <button
                            onClick={handleClose}
                            style={{
                                background: "transparent",
                                color: "#666",
                                border: "1.5px solid #ddd",
                                borderRadius: 12,
                                padding: "14px 24px",
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "border-color 0.2s, color 0.2s, transform 0.15s",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = "#999"; e.currentTarget.style.color = "#222"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#666"; e.currentTarget.style.transform = "translateY(0)"; }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Individual Card ──────────────────────────────────────────────────────────
function ServiceCard({ service, index, onClick }) {
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const arrowRef = useRef(null);
    const shineRef = useRef(null);

    // Scroll-triggered entrance
    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 60 },
            {
                opacity: 1, y: 0,
                duration: 0.7,
                delay: index * 0.12,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            }
        );

        // Looping arrow bounce
        gsap.to(arrowRef.current, {
            x: 5,
            duration: 0.55,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.15,
        });
    }, [index]);

    // ── Magnetic hover handlers ──────────────────────────────────────────────
    const handleMouseMove = (e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);  // −1 → 1
        const dy = (e.clientY - cy) / (rect.height / 2); // −1 → 1

        // Card tilt
        gsap.to(cardRef.current, {
            rotateX: -dy * 8,
            rotateY: dx * 8,
            transformPerspective: 900,
            ease: "power2.out",
            duration: 0.4,
        });

        // Image parallax — moves opposite direction
        gsap.to(imgRef.current, {
            x: -dx * 14,
            y: -dy * 10,
            scale: 1.08,
            rotate: dx * 4,
            ease: "power2.out",
            duration: 0.4,
        });

        // Shine sweep position
        if (shineRef.current) {
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            shineRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 65%)`;
            gsap.to(shineRef.current, { opacity: 1, duration: 0.3 });
        }
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0, rotateY: 0, y: 0, scale: 1,
            ease: "elastic.out(1, 0.5)",
            duration: 0.7,
        });
        gsap.to(imgRef.current, {
            x: 0, y: 0, scale: 1, rotate: 0,
            ease: "elastic.out(1, 0.5)",
            duration: 0.7,
        });
        if (shineRef.current) {
            gsap.to(shineRef.current, { opacity: 0, duration: 0.4 });
        }
    };

    const handleMouseEnter = () => {
        gsap.to(cardRef.current, {
            y: -10, scale: 1.02,
            ease: "power2.out",
            duration: 0.35,
        });
    };

    // Click ripple
    const handleClick = (e) => {
        const ripple = document.createElement("span");
        const rect = cardRef.current.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        Object.assign(ripple.style, {
            position: "absolute",
            left: `${e.clientX - rect.left - size / 2}px`,
            top: `${e.clientY - rect.top - size / 2}px`,
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.25)",
            pointerEvents: "none",
            transform: "scale(0)",
        });
        cardRef.current.appendChild(ripple);
        gsap.to(ripple, {
            scale: 1, opacity: 0, duration: 0.6, ease: "power2.out",
            onComplete: () => ripple.remove(),
        });
        onClick(service);
    };

    return (
        <div
            ref={cardRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ willChange: "transform", transformStyle: "preserve-3d" }}
            className={`relative p-8 rounded-2xl overflow-hidden cursor-pointer min-h-[220px] flex flex-col justify-between ${service.color}`}
        >
            {/* Shine layer */}
            <div
                ref={shineRef}
                style={{
                    position: "absolute", inset: 0,
                    pointerEvents: "none", opacity: 0, borderRadius: "inherit",
                    transition: "opacity 0.3s",
                }}
            />

            {/* Title */}
            <h3 className="text-2xl font-semibold relative z-10">
                {service.title}
            </h3>

            {/* Learn more */}
            <div className="flex items-center text-sm font-medium mt-6 relative z-10" style={{ letterSpacing: "0.08em" }}>
                LEARN MORE
                <span ref={arrowRef} style={{ display: "inline-flex", marginLeft: 8 }}>
                    <ArrowRight className="w-4 h-4" />
                </span>
            </div>

            {/* Floating image */}
            <img
                ref={imgRef}
                src={service.image}
                alt=""
                className="absolute bottom-[-20px] right-[-20px] w-[140px] h-[140px] object-contain pointer-events-none"
                style={{ willChange: "transform" }}
            />
        </div>
    );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ServicesSection() {
    const [activeService, setActiveService] = useState(null);

    return (
        <>
            <section className="w-full py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Section Heading */}
                    <div className="text-center mb-14">
                        <span className="inline-block mb-3 text-sm font-semibold tracking-widest uppercase" style={{ color: "#4f8df7" }}>
                            What We Do
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                            Our Services
                        </h2>
                        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                            From design to development and marketing, we deliver end-to-end digital solutions that help your business thrive.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                service={service}
                                index={index}
                                onClick={setActiveService}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {activeService && (
                <ServiceModal
                    service={activeService}
                    onClose={() => setActiveService(null)}
                />
            )}
        </>
    );
}