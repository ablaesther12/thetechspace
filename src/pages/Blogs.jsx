import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, User, Calendar } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blogPosts } from "../data/blogsData";

gsap.registerPlugin(ScrollTrigger);

// ─── Category badge color map ─────────────────────────────────────────────────
const categoryStyles = {
  violet: {
    bg: "bg-violet-500",
    text: "text-white",
    border: "border-violet-200",
    light: "bg-violet-50 text-violet-700",
  },
  cyan: {
    bg: "bg-cyan-500",
    text: "text-white",
    border: "border-cyan-200",
    light: "bg-cyan-50 text-cyan-700",
  },
  emerald: {
    bg: "bg-emerald-500",
    text: "text-white",
    border: "border-emerald-200",
    light: "bg-emerald-50 text-emerald-700",
  },
};

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard = ({ post, index }) => {
  const style = categoryStyles[post.categoryColor] || categoryStyles.violet;

  return (
    <Link
      to={`/blogs/${post.slug}`}
      className="gs-animate group block rounded-2xl bg-white border border-slate-200/80 overflow-hidden transition-[box-shadow,transform] duration-300 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-2"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-block ${style.bg} ${style.text} text-[11px] font-semibold px-3 py-1 rounded-full tracking-wide`}
          >
            {post.category}
          </span>
        </div>
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 pb-6">
        {/* Author + Date row */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
              <User className="w-3 h-3 text-slate-500" />
            </div>
            <span className="font-medium text-slate-500">{post.author}</span>
          </div>
          <span className="text-slate-300">·</span>
          <span>{post.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-violet-600 transition-colors duration-300">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
};

// ─── Featured Post Hero ───────────────────────────────────────────────────────
const FeaturedPost = ({ post }) => {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".featured-animate", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  if (!post) return null;

  return (
    <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
      <Link
        to={`/blogs/${post.slug}`}
        className="group relative block rounded-3xl overflow-hidden bg-slate-900 shadow-2xl shadow-slate-900/20"
      >
        <div className="grid lg:grid-cols-2 min-h-[400px]">
          {/* Text side */}
          <div className="relative z-10 flex flex-col justify-center p-8 sm:p-12">
            <div className="featured-animate">
              <span className="inline-flex items-center gap-1.5 mb-5">
                <span className="text-slate-300 text-sm font-medium">Featured</span>
                <span className="bg-violet-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md tracking-wide">
                  Post
                </span>
              </span>
            </div>

            <h2 className="featured-animate text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white leading-[1.15] mb-4 tracking-tight">
              {post.title}
            </h2>

            <p className="featured-animate text-slate-400 text-base leading-relaxed mb-6 max-w-md">
              {post.excerpt}
            </p>

            <div className="featured-animate">
              <span className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors duration-200 group-hover:bg-violet-500">
                Read More
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Image side */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:hidden" />
          </div>
        </div>
      </Link>
    </div>
  );
};

// ─── Blog Page ────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const gridRef = useRef(null);

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  // GSAP staggered entrance animation for the card grid
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll(".gs-animate");
      if (!cards || cards.length === 0) return;

      gsap.fromTo(
        cards,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.6,
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Subtle grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Top glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10">
        {/* Page header */}
        <div className="pt-24 pb-12 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Our Blog
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Insights, tutorials, and the latest in tech — straight from our
            team.
          </p>
        </div>

        {/* Featured post */}
        <FeaturedPost post={featuredPost} />

        {/* Blog cards grid */}
        <div
          ref={gridRef}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {regularPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}