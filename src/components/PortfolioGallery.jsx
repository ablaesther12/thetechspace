import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { projects as defaultProjects } from "../data/projectsData";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

const cardShadow = `
  rgba(0,0,0,0.01) 0.796192px 0px 0.796192px 0px,
  rgba(0,0,0,0.03) 2.41451px 0px 2.41451px 0px,
  rgba(0,0,0,0.08) 6.38265px 0px 6.38265px 0px,
  rgba(0,0,0,0.25) 20px 0px 20px 0px
`;

export function PortfolioGallery({
    title = "Browse our projects",
    archiveButton = { text: "View all projects", href: "/projects" },
    customImages,
    className = "",
    maxHeight = 120,
    spacing = "-space-x-72 md:-space-x-80",
    pauseOnHover = true,
    marqueeRepeat = 4,
}) {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    // Use passed images or fall back to real project data
    const images = customImages
        ? customImages
        : defaultProjects.map((p) => ({ src: p.thumb, alt: p.alt, title: p.title, id: p.id }));

    const handleCardClick = (index) => {
        const img = images[index];
        if (img.id) {
            navigate(`/projects/${img.id}`);
        }
    };

    return (
        <section
            aria-label={title}
            className={`relative min-h-screen bg-slate-50 ${className}`}
            id="projects"
        >
            <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
                {/* Header */}
                <div className="relative z-10 text-center pt-16 pb-8 px-8">
                    <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm mb-3">
                        Our Work
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 text-balance">
                        {title}
                    </h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto mb-10">
                        A curated selection of websites, apps, and digital experiences we've crafted for our clients.
                    </p>
                    <Link
                        to={archiveButton.href}
                        className="inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-slate-700 transition-colors group mb-16"
                    >
                        <span>{archiveButton.text}</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Desktop 3D overlapping layout */}
                <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[200px]">
                    <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
                        {images.map((image, index) => {
                            const totalImages = images.length;
                            const middle = Math.floor(totalImages / 2);
                            const distanceFromMiddle = Math.abs(index - middle);
                            const staggerOffset = maxHeight - distanceFromMiddle * 20;
                            const zIndex = totalImages - index;
                            const isHovered = hoveredIndex === index;
                            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
                            const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset;

                            return (
                                <motion.div
                                    key={index}
                                    className="group cursor-pointer flex-shrink-0"
                                    style={{ zIndex }}
                                    initial={{
                                        transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                                        opacity: 0,
                                    }}
                                    animate={{
                                        transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                                        opacity: 1,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        delay: index * 0.05,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    onHoverStart={() => setHoveredIndex(index)}
                                    onHoverEnd={() => setHoveredIndex(null)}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div
                                        className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                                        style={{ boxShadow: cardShadow }}
                                    >
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-full object-cover object-left-top"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                                            {image.title && (
                                                <span className="text-white font-semibold text-sm">{image.title}</span>
                                            )}
                                            <span className="text-white/70 text-xs flex items-center gap-1 mt-1">
                                                View project <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile marquee layout */}
                <div className="block md:hidden relative pb-8">
                    <div
                        className={cn(
                            "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                            "flex-row"
                        )}
                    >
                        {Array(marqueeRepeat)
                            .fill(0)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex shrink-0 justify-around [gap:var(--gap)]",
                                        "animate-marquee flex-row",
                                        pauseOnHover && "group-hover:[animation-play-state:paused]"
                                    )}
                                >
                                    {images.map((image, index) => (
                                        <div
                                            key={`${i}-${index}`}
                                            className="group/card cursor-pointer flex-shrink-0"
                                            onClick={() => handleCardClick(index)}
                                        >
                                            <div
                                                className="relative aspect-video w-64 rounded-lg overflow-hidden transition-transform duration-300 group-hover/card:scale-105"
                                                style={{ boxShadow: cardShadow }}
                                            >
                                                <img
                                                    src={image.src}
                                                    alt={image.alt}
                                                    className="w-full h-full object-cover object-left-top"
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                                    {image.title && (
                                                        <span className="text-white text-xs font-semibold">{image.title}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PortfolioGallery;
