
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import logo1 from '../assets/img/logo1.png';

// --- Icon Components ---
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Team", path: "/team" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

const heroPaths = ["/", "/about", "/services", "/team", "/blogs", "/contact"];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  const hasFullScreenHero = heroPaths.includes(location.pathname);

  // Trigger mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ─── Main Header ─── */}
      <header
        className={`
          w-full top-0 z-50 transition-all duration-500
          ${hasFullScreenHero ? "fixed" : "sticky"}
          bg-transparent py-5 px-4
        `}
      >
        {/* ── FLOATING GLASS PILL (always) ── */}
        <div
          className={`
            mx-auto flex items-center justify-between
            px-5 py-3 border border-white/20
            rounded-full shadow-2xl max-w-4xl
            transition-all duration-500 ease-out
            backdrop-blur-md
            ${isScrolled
              ? "bg-slate-900/70 border-white/10 shadow-slate-900/50"
              : "bg-white/10"
            }
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
          `}
        >
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img src={logo1} alt="The Tech Space Logo" className="h-9 w-9 object-contain" />
            <span className="text-white font-semibold text-sm tracking-wide hidden sm:block">
              The Tech Space
            </span>
          </NavLink>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                style={{ transitionDelay: mounted ? `${i * 50}ms` : "0ms" }}
                className={`
                  relative group py-1 text-sm font-medium text-white/90
                  hover:text-white transition-all duration-300
                  ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-white" : ""}>{item.name}</span>
                    <span
                      className={`
                        absolute bottom-0 left-0 block w-full h-0.5 bg-white rounded-full
                        transform transition-transform duration-300 ease-in-out origin-left
                        ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div
            className={`
              hidden md:block transition-all duration-700
              ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
            `}
            style={{ transitionDelay: "300ms" }}
          >
            <button className="px-5 py-2 text-sm font-semibold text-slate-900 bg-white rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200 shadow-sm">
              Get Quote
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <div className={`transition-transform duration-300 ${showMenu ? "rotate-90" : "rotate-0"}`}>
              {showMenu ? <CloseIcon /> : <MenuIcon />}
            </div>
          </button>
        </div>

        {/* ── Mobile Dropdown ── */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-500 ease-in-out px-4 pb-2
            ${showMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div
            className={`
              flex flex-col items-center space-y-4 p-5 text-center rounded-2xl mt-2
              backdrop-blur-md border border-white/10
              ${isScrolled ? "bg-slate-900/80" : "bg-black/70"}
            `}
          >
            {navItems.map((item, i) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setShowMenu(false)}
                style={{ transitionDelay: showMenu ? `${i * 40}ms` : "0ms" }}
                className={`
                  relative group py-1.5 text-base font-medium text-white/80 hover:text-white
                  transition-all duration-300 w-full
                  ${showMenu ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-white font-semibold" : ""}>{item.name}</span>
                    <span
                      className={`
                        absolute bottom-0 left-1/2 -translate-x-1/2 block h-0.5 bg-white/60 rounded-full
                        transform transition-all duration-300 ease-in-out
                        ${isActive ? "w-8" : "w-0 group-hover:w-8"}
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}

            <div
              className={`pt-2 w-full transition-all duration-500 ${showMenu ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: showMenu ? `${navItems.length * 40 + 40}ms` : "0ms" }}
            >
              <button
                onClick={() => setShowMenu(false)}
                className="w-full px-5 py-3 text-sm font-semibold text-slate-900 bg-white rounded-full hover:bg-white/90 active:scale-95 transition-all duration-200"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;