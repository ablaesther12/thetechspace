import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, Search } from "lucide-react";
import { motion } from "motion/react";
import { projects } from "../data/projectsData";

const categories = ["All", ...new Set(projects.map((p) => p.category))];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [query, setQuery] = useState("");

    const filtered = projects.filter((p) => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const matchQuery =
            query.trim() === "" ||
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
        return matchCat && matchQuery;
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
                    }}
                />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="inline-block mb-4 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase">
                        Our Portfolio
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Projects Gallery
                    </h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Explore the websites, apps, and digital experiences we've crafted for our clients.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4">
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search projects…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category pills */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat
                                        ? "bg-slate-900 text-white"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {filtered.length === 0 ? (
                        <div className="text-center py-24 text-slate-400 text-lg">
                            No projects match your search.
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.06 }}
                                >
                                    <Link
                                        to={`/projects/${project.id}`}
                                        className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={project.thumb}
                                                alt={project.alt}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                                <span className="text-white font-semibold flex items-center gap-2">
                                                    View project <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>

                                        {/* Info */}
                                        <div className="p-6">
                                            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">
                                                {project.category}
                                            </span>
                                            <h2 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                                {project.title}
                                            </h2>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to start your project?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
                        Let's build something great together.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-colors"
                    >
                        Get in touch <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
