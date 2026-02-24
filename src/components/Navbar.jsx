import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
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
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ── Nav items ─────────────────────────────────────────────────────────────────
const navItems = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Prices", path: "/team" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

// Pages that use the NEW light hero (no video overlay)
const lightHeroPages = ["/"];

// ── Component ─────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const isLightHero = lightHeroPages.includes(location.pathname);

  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Style tokens based on background ────────────────────────────────────────
  const pillBg = isLightHero
    ? isScrolled
      ? "bg-white/90 border-slate-200/80 shadow-slate-200/60"
      : "bg-white/75 border-slate-200/50 shadow-slate-200/40"
    : isScrolled
      ? "bg-slate-900/80 border-white/10 shadow-slate-900/50"
      : "bg-white/10 border-white/20";

  const textColor = isLightHero ? "text-slate-700" : "text-white/90";
  const textHover = isLightHero ? "hover:text-slate-900" : "hover:text-white";
  const activeColor = isLightHero ? "text-violet-600" : "text-white";
  const underlineColor = isLightHero ? "bg-violet-500" : "bg-white";
  const logoTextColor = isLightHero ? "text-slate-900" : "text-white";
  const mobileMenuBg = isLightHero
    ? "bg-white/95 border-slate-200/60"
    : "bg-slate-900/90 border-white/10";
  const mobileTextColor = isLightHero ? "text-slate-700" : "text-white/80";
  const mobileActiveColor = isLightHero ? "text-violet-600" : "text-white";
  const mobileButtonColor = isLightHero ? "text-white" : "text-slate-900";
  const mobileButtonBg = isLightHero
    ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
    : "bg-white hover:bg-white/90";
  const mobileToggleColor = isLightHero ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10";

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-all duration-500 py-4 px-4 sm:px-6`}
      >
        {/* ── Floating pill ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`
            mx-auto flex items-center justify-between
            px-5 py-2.5 rounded-full border
            shadow-lg backdrop-blur-md max-w-5xl
            transition-all duration-500
            ${pillBg}
          `}
        >
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo1} alt="The Tech Space Logo" className="h-8 w-8 object-contain" />
            <span className={`text-sm font-bold tracking-tight hidden sm:block ${logoTextColor}`}>
              The<span className="text-violet-600">Tech</span>Space
            </span>
          </NavLink>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative group py-1 text-sm font-medium ${textColor} ${textHover} transition-colors duration-200`}
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? activeColor : ""}>{item.name}</span>
                    <span
                      className={`absolute bottom-0 left-0 block w-full h-[2px] ${underlineColor} rounded-full transform transition-transform duration-300 ease-out origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            {isLightHero ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2 text-sm font-semibold text-white rounded-full shadow-md shadow-violet-500/30 hover:shadow-violet-500/50 transition-all duration-200 focus:outline-none"
                style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)" }}
              >
                Book a call
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-5 py-2 text-sm font-semibold text-slate-900 bg-white rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-sm"
              >
                Get Quote
              </motion.button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`md:hidden p-2 rounded-full transition-colors duration-200 ${mobileToggleColor}`}
            aria-label={showMenu ? "Close menu" : "Open menu"}
          >
            <div className={`transition-transform duration-300 ${showMenu ? "rotate-90" : "rotate-0"}`}>
              {showMenu ? <CloseIcon /> : <MenuIcon />}
            </div>
          </button>
        </motion.div>

        {/* ── Mobile dropdown ────────────────────────────────────────────────── */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={`
                md:hidden mx-auto mt-2 max-w-5xl px-4 pb-4 pt-3 rounded-2xl border
                backdrop-blur-md shadow-xl
                flex flex-col items-center gap-3
                ${mobileMenuBg}
              `}
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setShowMenu(false)}
                  className={`w-full text-center py-2 text-sm font-medium ${mobileTextColor} hover:opacity-100 transition-opacity`}
                >
                  {({ isActive }) => (
                    <span className={isActive ? mobileActiveColor : ""}>{item.name}</span>
                  )}
                </NavLink>
              ))}
              <button
                onClick={() => setShowMenu(false)}
                className={`mt-1 w-full py-2.5 rounded-full text-sm font-semibold ${mobileButtonBg} ${mobileButtonColor} transition-all duration-200`}
              >
                Book a call
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;