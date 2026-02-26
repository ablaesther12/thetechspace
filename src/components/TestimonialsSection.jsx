import React from "react";
import { motion } from "motion/react";

// ─── Testimonial data ─────────────────────────────────────────────────────────
const testimonials = [
    {
        text: "TTS built our website in under a week and it looks stunning. Our bounce rate dropped by 40% in the first month — we couldn't be happier.",
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Briana Patton",
        role: "Operations Manager, FinTrack",
    },
    {
        text: "Working with TTS was seamless from start to finish. They understood our brand immediately and delivered a site that truly represents us.",
        image: "https://randomuser.me/api/portraits/men/2.jpg",
        name: "Bilal Ahmed",
        role: "CEO, GrowthLab",
    },
    {
        text: "The UI/UX work TTS did for our app increased our user retention significantly. Their attention to detail is second to none.",
        image: "https://randomuser.me/api/portraits/women/3.jpg",
        name: "Saman Malik",
        role: "Product Lead, PulseUp",
    },
    {
        text: "Not only did they deliver a beautiful design, but the site is blazing fast. Our Google PageSpeed score went from 55 to 96.",
        image: "https://randomuser.me/api/portraits/men/4.jpg",
        name: "Omar Raza",
        role: "CTO, Urban Wears",
    },
    {
        text: "We needed a complete rebrand and TTS delivered everything — logo, colours, typography, guidelines. Pure professionalism.",
        image: "https://randomuser.me/api/portraits/women/5.jpg",
        name: "Zainab Hussain",
        role: "Creative Director, Nomad Studio",
    },
    {
        text: "The e-commerce store TTS built for us processed over $500K in revenue in its first six months. Incredible work, incredible team.",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        name: "Aliza Khan",
        role: "Founder, Ember Roast",
    },
    {
        text: "They took our vague brief and turned it into a conversion machine. Our leads doubled in the first quarter after launch.",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        name: "Farhan Siddiqui",
        role: "Marketing Director, Bloom Collective",
    },
    {
        text: "TTS responded quickly, communicated clearly, and delivered exactly on time. I'll be using them for every future project.",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: "Sana Sheikh",
        role: "Sales Manager, NexaHub",
    },
    {
        text: "The mobile app they designed has a 4.9-star rating on the App Store. Users love it and so do we. Highly recommend TTS.",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        name: "Hassan Ali",
        role: "Founder, PulseUp",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// ─── Single scrolling column ──────────────────────────────────────────────────
const TestimonialsColumn = ({ testimonials: items, duration = 10, className = "" }) => (
    <div className={`overflow-hidden ${className}`}>
        <motion.div
            animate={{ translateY: "-50%" }}
            transition={{
                duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
            }}
            className="flex flex-col gap-6 pb-6"
        >
            {/* Duplicate list to create seamless loop */}
            {[0, 1].map((_, copy) => (
                <React.Fragment key={copy}>
                    {items.map(({ text, image, name, role }, i) => (
                        <div
                            key={i}
                            className="p-8 rounded-3xl border border-slate-100 bg-white shadow-md shadow-slate-200/60 max-w-xs w-full"
                        >
                            {/* Quote marks */}
                            <span className="text-3xl text-violet-300 leading-none select-none">"</span>
                            <p className="text-slate-600 text-sm leading-relaxed mt-1">{text}</p>
                            <div className="flex items-center gap-3 mt-5">
                                <img
                                    src={image}
                                    alt={name}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-100"
                                />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-slate-900 text-sm leading-tight">{name}</span>
                                    <span className="text-xs text-slate-400 leading-tight mt-0.5">{role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </React.Fragment>
            ))}
        </motion.div>
    </div>
);

// ─── Section ──────────────────────────────────────────────────────────────────
const TestimonialsSection = () => (
    <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background orbs */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30"
            style={{
                background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                filter: "blur(60px)",
            }}
        />

        <div className="container mx-auto px-4 relative z-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center max-w-xl mx-auto mb-14"
            >
                <span className="inline-block border border-violet-200 bg-violet-50 text-violet-600 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide uppercase mb-5">
                    Testimonials
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                    What our clients say
                </h2>
                <p className="mt-4 text-slate-500 text-lg">
                    Don't just take our word for it — hear from the businesses we've helped grow.
                </p>
            </motion.div>

            {/* Columns — fade top + bottom edges so the scroll loop is invisible */}
            <div
                className="flex justify-center gap-6 overflow-hidden max-h-[740px]"
                style={{
                    maskImage:
                        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                }}
            >
                <TestimonialsColumn testimonials={firstColumn} duration={22} />
                <TestimonialsColumn testimonials={secondColumn} duration={28} className="hidden md:block" />
                <TestimonialsColumn testimonials={thirdColumn} duration={25} className="hidden lg:block" />
            </div>
        </div>
    </section>
);

export default TestimonialsSection;
