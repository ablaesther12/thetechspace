import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import logo1 from "../assets/img/logo1.png";

// ── Icons ────────────────────────────────────────────────────────────────────
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

// ── Nav items ─────────────────────────────────────────────────────────────────
// Labels must match their destination. Contact lives in the "Book a call" CTA.
const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Team", path: "/team" },
  { name: "Blog", path: "/blogs" },
];

// Every public page now opens on a dark night hero, so the navbar always uses
// its light-on-dark styling. (Kept as a function so a light page can opt in.)
const isLightHeroPath = () => false;

// ── Component ─────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isLightHero = isLightHeroPath(location.pathname);

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!showMenu) return;
    const onKey = (e) => e.key === "Escape" && setShowMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showMenu]);

  // ── Style tokens based on background ────────────────────────────────────────
  const pillBg = isLightHero
    ? isScrolled
      ? "bg-white/90 border-line shadow-[0_8px_30px_-12px_rgb(18_13_36/0.18)]"
      : "bg-white/70 border-line shadow-none"
    : isScrolled
      ? "bg-slate-900/85 border-white/10 shadow-slate-900/50"
      : "bg-slate-900/30 border-white/20";

  const textColor = isLightHero ? "text-dim hover:text-ink" : "text-white/90 hover:text-white";
  const activeColor = isLightHero ? "text-ink" : "text-white";
  const underlineColor = isLightHero ? "bg-brand" : "bg-white";
  const logoTextColor = isLightHero ? "text-ink" : "text-white";
  const logoAccent = isLightHero ? "text-brand" : "text-violet-300";
  const iconLink = isLightHero
    ? "text-dim hover:text-brand hover:bg-brand-soft"
    : "text-white/80 hover:text-white hover:bg-white/15";
  const mobileMenuBg = isLightHero
    ? "bg-white/95 border-line"
    : "bg-slate-900/95 border-white/10";
  const mobileTextColor = isLightHero ? "text-ink" : "text-white/85";
  const mobileActiveColor = isLightHero ? "text-brand font-semibold" : "text-white font-semibold";
  const ctaClasses = isLightHero
    ? "bg-brand hover:bg-brand-bright text-white"
    : "bg-white hover:bg-white/90 text-slate-900 shadow-sm";
  const mobileToggleColor = isLightHero ? "text-ink hover:bg-canvas" : "text-white hover:bg-white/10";

  return (
    <header className="w-full fixed top-0 z-50 py-4 px-4 sm:px-6">
      {/* ── Floating pill ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          mx-auto flex items-center justify-between gap-4
          pl-4 pr-2 py-2 rounded-full border
          shadow-lg backdrop-blur-md max-w-5xl
          transition-colors duration-500
          ${pillBg}
        `}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 rounded-full" aria-label="The Tech Space — home">
          <img src={logo1} alt="" className="h-8 w-8 object-contain" />
          <span className={`text-sm font-bold tracking-tight hidden sm:block ${logoTextColor}`}>
            The<span className={logoAccent}>Tech</span>Space
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={`relative group py-1 text-sm font-medium ${textColor} transition-colors duration-200`}
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? activeColor : ""}>{item.name}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-0 block w-full h-[2px] ${underlineColor} rounded-full transition-transform duration-300 ease-out origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA + Admin link */}
        <div className="hidden lg:flex items-center gap-1">
          <Link
            to="/admin"
            className={`grid place-items-center w-10 h-10 rounded-full transition-colors duration-200 ${iconLink}`}
            aria-label="Admin dashboard"
            title="Admin dashboard"
          >
            <GridIcon />
          </Link>
          <Link
            to="/contact"
            className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-200 ${ctaClasses}`}
          >
            Book a call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className={`lg:hidden grid place-items-center w-11 h-11 rounded-full transition-colors duration-200 ${mobileToggleColor}`}
          aria-label={showMenu ? "Close menu" : "Open menu"}
          aria-expanded={showMenu}
          aria-controls="mobile-menu"
        >
          <span className={`transition-transform duration-300 ${showMenu ? "rotate-90" : "rotate-0"}`}>
            {showMenu ? <CloseIcon /> : <MenuIcon />}
          </span>
        </button>
      </motion.div>

      {/* ── Mobile dropdown ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showMenu && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`
              lg:hidden mx-auto mt-2 max-w-5xl p-3 rounded-2xl border
              backdrop-blur-md shadow-xl flex flex-col
              ${mobileMenuBg}
            `}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={`w-full rounded-xl px-4 py-3 text-base font-medium ${mobileTextColor} ${isLightHero ? "hover:bg-canvas" : "hover:bg-white/10"} transition-colors`}
              >
                {({ isActive }) => (
                  <span className={isActive ? mobileActiveColor : ""} aria-current={isActive ? "page" : undefined}>
                    {item.name}
                  </span>
                )}
              </NavLink>
            ))}
            <Link
              to="/admin"
              className={`w-full rounded-xl px-4 py-3 text-base font-medium flex items-center gap-2 ${mobileTextColor} ${isLightHero ? "hover:bg-canvas" : "hover:bg-white/10"} transition-colors`}
            >
              <GridIcon />
              Admin
            </Link>
            <Link
              to="/contact"
              className={`mt-2 w-full py-3 rounded-full text-center text-base font-semibold transition-colors duration-200 ${ctaClasses}`}
            >
              Book a call
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
