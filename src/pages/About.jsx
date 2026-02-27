import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, Zap, Users, Award, Code, Cpu, Globe, Sparkles, ChevronRight, TrendingUp, BarChart3, Layers, MousePointer2, Palette, Rocket } from "lucide-react";
import { FaLinkedinIn, FaTwitter, FaGithub } from "react-icons/fa";
import Ab1 from "../assets/img/Ab1.jpg";
import Ab2 from "../assets/img/Ab2.jpeg";
import Ab3 from "../assets/img/Ab3.jpeg";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Light theme grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}

// Animated counter component
function AnimatedStat({ value, label, suffix = "" }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-violet-200 transition-all duration-300"
    >
      <motion.span
        className="text-5xl md:text-6xl font-bold text-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}<span className="text-violet-600">{suffix}</span>
      </motion.span>
      <p className="text-gray-500 mt-3 text-sm uppercase tracking-wider font-medium">{label}</p>
    </motion.div>
  );
}

// Value card component
function ValueCard({ icon: Icon, title, description, index }) {
  const colors = ["violet", "purple", "indigo"];
  const color = colors[index % 3];

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-violet-200 transition-all duration-500"
    >
      <div className={`w-16 h-16 bg-${color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${color}-500 transition-colors duration-300`}>
        <Icon className={`h-8 w-8 text-${color}-600 group-hover:text-white transition-colors duration-300`} />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

// Parallax Hero Section
function ParallaxHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms - no spring for better performance
  const laptopY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const laptopRotate = useTransform(scrollYProgress, [0, 1], [8, -5]);
  const leftCardY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rightCardY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bottomCardY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-24 pb-32 overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50"
        style={{ y: bgY }}
      />

      {/* Gradient orbs with parallax */}
      <motion.div
        className="absolute top-20 left-10 w-[400px] h-[400px] bg-violet-200/30 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
      />

      {/* Grid pattern */}
      <GridBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Text content with parallax */}
        <motion.div
          className="text-center mb-12"
          style={{ y: textY, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-violet-100 border border-violet-200 text-violet-700 px-5 py-2.5 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              About TTS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 max-w-3xl mx-auto"
          >
            We're More Than Just a{" "}
            <span className="text-violet-600 italic">Creative Agency</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-600 max-w-xl mx-auto mb-8"
          >
            We're passionate about creating digital experiences that drive real results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2">
              Get Started <ChevronRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-gray-300 hover:border-violet-400 text-gray-700 hover:text-violet-600 font-semibold px-6 py-3 rounded-full transition-all duration-300">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* 3D Laptop with parallax */}
        <div className="relative max-w-5xl mx-auto" style={{ perspective: "2000px" }}>
          {/* MacBook Laptop */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, rotateX: 8 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            style={{
              y: laptopY,
              rotateX: laptopRotate,
              transformStyle: "preserve-3d",
              willChange: "transform"
            }}
            className="relative w-full max-w-4xl mx-auto"
          >
            {/* Screen */}
            <div className="relative bg-gray-900 rounded-t-2xl p-2 pt-6 shadow-2xl border-4 border-gray-800">
              {/* Camera notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-700 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full" />
              </div>

              {/* Screen content */}
              <div className="bg-gradient-to-br from-gray-50 via-white to-violet-50 rounded-lg overflow-hidden aspect-[16/10]">
                {/* Browser header */}
                <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-gray-100 rounded-lg px-4 py-1 text-xs text-gray-500 flex items-center gap-2 max-w-xs w-full justify-center">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      thetechspace.com/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Analytics Overview</h3>
                      <p className="text-gray-500 text-xs">Your project performance at a glance</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-medium flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> +24%
                      </span>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Visitors", value: "12.5K", icon: Users, color: "violet" },
                      { label: "Conversion", value: "8.2%", icon: TrendingUp, color: "green" },
                      { label: "Revenue", value: "$45K", icon: BarChart3, color: "blue" },
                      { label: "Projects", value: "24", icon: Layers, color: "purple" }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm"
                      >
                        <div className={`w-6 h-6 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-2`}>
                          <stat.icon className={`w-3 h-3 text-${stat.color}-600`} />
                        </div>
                        <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-[10px] text-gray-500">{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart */}
                  <div className="bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-gray-900 text-sm">Performance</span>
                      <div className="flex gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-violet-100 text-violet-700 rounded">Weekly</span>
                        <span className="text-[10px] px-2 py-0.5 text-gray-400">Monthly</span>
                      </div>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-violet-500 to-violet-400 rounded-t"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 1 + i * 0.03, duration: 0.4 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop base */}
            <div className="relative">
              <div className="h-3 bg-gradient-to-b from-gray-700 to-gray-800 rounded-b" />
              <div className="bg-gradient-to-b from-gray-300 to-gray-400 h-4 rounded-b-xl mx-8 shadow-lg relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gray-400 rounded-b" />
              </div>
            </div>

            {/* Shadow */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/10 blur-xl rounded-full" />
          </motion.div>

          {/* Floating Cards with Parallax */}
          {/* Left card - Growth */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ y: leftCardY, willChange: "transform" }}
            className="absolute left-0 md:left-4 top-1/4 z-20 hidden md:block"
          >
            <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl border border-gray-100 w-40 rotate-[-5deg]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Growth</p>
                  <p className="text-sm font-bold text-gray-900">+127%</p>
                </div>
              </div>
              <div className="flex gap-0.5 h-8">
                {[30, 45, 35, 60, 50, 75, 65, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right card - Projects */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            style={{ y: rightCardY, willChange: "transform" }}
            className="absolute right-0 md:right-4 top-1/3 z-20 hidden md:block"
          >
            <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl border border-gray-100 w-44 rotate-[5deg]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-900">Active Projects</span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="space-y-2">
                {[
                  { name: "E-commerce", progress: 85, color: "violet" },
                  { name: "Dashboard", progress: 60, color: "blue" },
                  { name: "Mobile App", progress: 40, color: "green" }
                ].map((project, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[10px] mb-1">
                      <span className="text-gray-600">{project.name}</span>
                      <span className="text-gray-400">{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-${project.color}-500 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom pill */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ y: bottomCardY, willChange: "transform" }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-4 z-20"
          >
            <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-full px-5 py-2.5 shadow-xl flex items-center gap-3 text-white">
              <div className="flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Design</span>
              </div>
              <div className="w-px h-3 bg-white/30" />
              <div className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Develop</span>
              </div>
              <div className="w-px h-3 bg-white/30" />
              <div className="flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Deploy</span>
              </div>
            </div>
          </motion.div>

          {/* Cursor */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
            className="absolute right-1/4 top-1/2 z-30 hidden lg:flex items-center gap-1"
          >
            <MousePointer2 className="w-4 h-4 text-violet-600 fill-violet-600" />
            <span className="bg-violet-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium shadow-lg">
              You
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-xs text-gray-400">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1.5">
            <motion.div className="w-1 h-2 bg-violet-500 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  const values = [
    { icon: Target, title: "Our Mission", description: "To empower businesses with innovative digital solutions that drive growth, enhance user experiences, and create lasting impact in the digital landscape." },
    { icon: Eye, title: "Our Vision", description: "To be the leading creative agency that bridges the gap between cutting-edge technology and exceptional design, setting new standards in digital innovation." },
    { icon: Heart, title: "Our Values", description: "Creativity, integrity, collaboration, and excellence. We believe in building long-term partnerships based on trust, transparency, and mutual success." }
  ];

  const features = [
    { icon: Zap, text: "Fast Delivery" },
    { icon: Users, text: "Expert Team" },
    { icon: Award, text: "Quality Assured" },
    { icon: Heart, text: "Client-Focused" }
  ];

  const techStack = [
    { icon: Code, label: "Clean Code" },
    { icon: Cpu, label: "Modern Tech" },
    { icon: Globe, label: "Global Reach" },
    { icon: Sparkles, label: "Innovation" }
  ];

  const teamMembers = [
    {
      name: "Daniel Oppong-Boah",
      role: "CEO & FullStack Developer",
      image: Ab3,
      skills: ["Software Developer", "Web Developer"],
      bio: "Daniel crafts intuitive user experiences that convert. His designs are both beautiful and highly functional.",
      funFact: "Sketches app ideas on napkins during lunch breaks",
      socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "Esther Abla Dzampah",
      role: "Co-founder & Administrator",
      image: Ab2,
      skills: ["Frontend Developer", "Graphic Designer"],
      bio: "Esther brings complex ideas to life with clean, scalable code. She's our go-to for technical architecture and optimization.",
      funFact: "Solves coding problems while rock climbing",
      socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "Jeffery Boafo",
      role: "Co-Founder & Creative Director",
      image: Ab1,
      skills: ["Product Designer", "Brand Strategist", "Visual Design"],
      bio: "With 8+ years in creative direction, Jeffery leads our design vision and ensures every project tells a compelling story.",
      funFact: "Coffee enthusiast who can design better after the 3rd cup",
      socials: { linkedin: "#", twitter: "#", github: "#" }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Parallax Hero Section */}
      <ParallaxHero />

      {/* Stats Section */}
      <section className="py-24 relative bg-white">
        <GridBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            <AnimatedStat value="50" suffix="+" label="Projects Completed" />
            <AnimatedStat value="30" suffix="+" label="Happy Clients" />
            <AnimatedStat value="5" suffix="+" label="Years Experience" />
            <AnimatedStat value="24" suffix="/7" label="Support Available" />
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24 relative bg-gray-50">
        <GridBackground />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">What Drives Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
              Our Core <span className="text-violet-600 italic">Principles</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {values.map((item, index) => (
              <ValueCard key={index} {...item} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Marquee */}
      <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-16 animate-marquee"
        >
          {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-400 whitespace-nowrap">
              <tech.icon className="w-6 h-6" />
              <span className="text-lg font-medium">{tech.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-24 relative bg-gray-50">
        <GridBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
            >
              <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8 text-gray-900">
                Why Choose <span className="text-violet-600 italic">TTS?</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2025, TTS emerged from a simple belief: that great design and powerful technology should work
                hand in hand. Our founders, coming from backgrounds in both creative design and software development,
                saw an opportunity to create something different.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're not just another agency. We're your strategic partners who understand that every pixel, every line
                of code, and every user interaction matters.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-violet-600" />
                    </div>
                    <span className="font-semibold text-gray-800">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-200/50 to-purple-200/50 rounded-3xl blur-2xl" />
              <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">What Sets Us Apart</h3>
                <ul className="space-y-4">
                  {[
                    "Technical + Creative Expertise",
                    "Agile Development Process",
                    "24/7 Support & Maintenance",
                    "Results-Driven Approach"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-violet-500 rounded-full" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8 p-4 bg-slate-900 rounded-xl font-mono text-sm">
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-cyan-300">success</span>{" "}
                  <span className="text-white">=</span>{" "}
                  <span className="text-amber-300">"TTS"</span>
                  <span className="text-slate-500">;</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-24 relative bg-white overflow-hidden">
        <GridBackground />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-violet-100/50 to-transparent rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider">The Founders</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-gray-900">
              Meet the <span className="text-violet-600 italic">Team</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The passionate minds behind TTS, dedicated to bringing your digital vision to life.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                    <motion.div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="w-9 h-9 bg-violet-600 rounded-full flex items-center justify-center text-white hover:bg-violet-700 transition-all duration-300 shadow-lg">
                          <FaLinkedinIn className="w-4 h-4" />
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} className="w-9 h-9 bg-violet-600 rounded-full flex items-center justify-center text-white hover:bg-violet-700 transition-all duration-300 shadow-lg">
                          <FaTwitter className="w-4 h-4" />
                        </a>
                      )}
                      {member.socials.github && (
                        <a href={member.socials.github} className="w-9 h-9 bg-violet-600 rounded-full flex items-center justify-center text-white hover:bg-violet-700 transition-all duration-300 shadow-lg">
                          <FaGithub className="w-4 h-4" />
                        </a>
                      )}
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-violet-600 font-semibold text-sm mt-1">{member.role}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-3 py-1 text-xs bg-violet-50 border border-violet-100 rounded-full text-violet-700 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-600 text-sm mt-4 leading-relaxed">{member.bio}</p>

                    <div className="mt-4 p-3 bg-violet-50 rounded-xl border border-violet-100">
                      <p className="text-xs text-violet-600 uppercase tracking-wider mb-1 font-semibold">Fun Fact</p>
                      <p className="text-sm text-gray-700">{member.funFact}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}