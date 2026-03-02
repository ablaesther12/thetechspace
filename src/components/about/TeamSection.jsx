import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaLinkedinIn } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import Ab1 from "../../assets/img/Ab1.jpg";
import Ab2 from "../../assets/img/Ab2.jpeg";
import Ab3 from "../../assets/img/Ab3.jpeg";
import David from "../../assets/img/david.png";
import Emmanuella from "../../assets/img/emmanuella.png";

const teamMembers = [
  { id: 1, name: "Daniel Oppong-Boah", role: "CEO", image: Ab3, linkedin: "#" },
  { id: 2, name: "Esther Abla Dzampah", role: "Co-Founder", image: Ab2, linkedin: "#" },
  { id: 3, name: "Jeffery Boafo", role: "Co-Founder", image: Ab1, linkedin: "#" },
  { id: 4, name: "David Mensah", role: "Lead Developer", image: David, linkedin: "#" },
  { id: 5, name: "Emmanuella Asante", role: "Product Designer", image: Emmanuella, linkedin: "#" },
];

function TeamCard({ member, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative">
        {/* Gradient border glow */}
        <motion.div
          className="absolute -inset-px rounded-2xl bg-gradient-to-br from-violet-400/50 via-indigo-300/30 to-purple-400/40"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* Outer glow */}
        <motion.div
          className="absolute -inset-3 bg-violet-200/25 rounded-3xl blur-xl -z-10"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          className="relative glass-card rounded-2xl overflow-hidden transition-all duration-500"
          animate={{
            y: isHovered ? -8 : 0,
            boxShadow: isHovered
              ? '0 30px 60px -15px rgba(139, 92, 246, 0.2)'
              : '0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
          transition={{ duration: 0.35 }}
        >
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-violet-50 to-indigo-50">
            <motion.img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover object-top"
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6 }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80" />

            {/* Violet overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-violet-600/25 via-violet-600/5 to-transparent"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: '-100%', skewX: '-15deg' }}
              animate={isHovered ? { x: '200%' } : { x: '-100%' }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            />

            {/* LinkedIn */}
            <motion.a
              href={member.linkedin}
              className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-violet-600 border border-violet-100 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-colors duration-200 shadow-sm"
              initial={{ opacity: 0, y: -10, scale: 0.8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : -10,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
            >
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </motion.a>

            {/* Role badge on hover */}
            <motion.div
              className="absolute bottom-3 left-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10,
              }}
              transition={{ duration: 0.3, delay: isHovered ? 0.05 : 0 }}
            >
              <span className="bg-white/90 backdrop-blur-sm text-violet-600 text-[10px] font-body font-semibold px-3 py-1.5 rounded-full border border-violet-100 shadow-sm">
                {member.role}
              </span>
            </motion.div>
          </div>

          {/* Info */}
          <div className="p-5 relative">
            <motion.h3
              className="font-display font-bold text-slate-900 text-base leading-tight"
              animate={{ color: isHovered ? '#7c3aed' : '#0f172a' }}
              transition={{ duration: 0.3 }}
            >
              {member.name}
            </motion.h3>
            <div className="flex items-center gap-2 mt-1.5">
              <motion.div
                className="w-1.5 h-1.5 rounded-full"
                animate={{
                  backgroundColor: isHovered ? '#a78bfa' : '#e2e8f0',
                  scale: isHovered ? 1.3 : 1,
                  boxShadow: isHovered ? '0 0 8px rgba(167,139,250,0.5)' : '0 0 0px rgba(167,139,250,0)',
                }}
                transition={{ duration: 0.3 }}
              />
              <p className="font-body text-violet-600 text-sm font-medium">{member.role}</p>
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section ref={containerRef} className="py-20 overflow-x-clip relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 to-violet-50/15" />
      <div className="absolute inset-0 light-dot-grid opacity-30" />

      {/* Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Accent line */}
      <div className="absolute top-0 right-[12%] w-px h-full bg-gradient-to-b from-transparent via-slate-200/30 to-transparent hidden lg:block" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              className="inline-flex items-center gap-2 bg-violet-50/80 backdrop-blur-sm border border-violet-100 text-violet-600 px-4 py-2 rounded-full text-xs font-body font-semibold tracking-wide mb-6"
            >
              The Team
            </motion.span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 text-slate-900 leading-[1.15] tracking-tight mb-5">
              Meet the{" "}
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
                Minds
              </span>
              {" "}Behind TTS
            </h2>
            <p className="font-body text-slate-400 text-base font-light leading-relaxed max-w-xl mx-auto">
              Passionate professionals dedicated to bringing your digital vision to life.
            </p>
          </div>
        </motion.div>

        {/* Team Grid - offset */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {teamMembers.map((member, index) => (
              <div key={member.id} className={index % 2 !== 0 ? 'md:mt-8' : ''}>
                <TeamCard member={member} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-14"
        >
          <p className="font-body text-slate-400 mb-5 font-light text-sm">Want to join our amazing team?</p>
          <motion.a
            href="/careers"
            className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-display font-semibold px-8 py-4 rounded-full shadow-xl shadow-violet-500/20 hover:shadow-violet-500/35 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2.5">
              View Open Positions
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
            {/* Hover shine sweep */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
