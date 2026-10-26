import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaArrowUp,
} from 'react-icons/fa';
import logo1 from '../assets/img/logo1.png';

// Every href here must resolve to a real route. Help Center, Careers, Terms
// and Privacy were removed until those pages exist.
const sections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Team", href: "/team" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Web Development", href: "/services" },
      { name: "Graphic Design", href: "/services" },
      { name: "UI/UX Design", href: "/services" },
      { name: "SEO & Marketing", href: "/services" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blogs" },
      { name: "Newsletter", href: "/#newsletter" },
    ],
  },
];

// TODO(content): point these at TheTechSpace's real profiles.
const socialLinks = [
  { icon: <FaInstagram className="size-5" aria-hidden="true" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaFacebookF className="size-5" aria-hidden="true" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <FaTwitter className="size-5" aria-hidden="true" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <FaPinterest className="size-5" aria-hidden="true" />, href: "https://pinterest.com", label: "Pinterest" },
];

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', checkScrollTop, { passive: true });
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <>
      <footer className="border-t border-line bg-panel pt-20 pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex w-full flex-col justify-between gap-12 lg:flex-row lg:items-start">
            {/* Left column: Logo, description & socials */}
            <div className="flex flex-col gap-6 lg:max-w-sm">
              <Link to="/" className="flex items-center gap-3 self-start rounded-lg">
                <img src={logo1} alt="" className="h-11 w-11 object-contain" />
                <span className="text-xl font-semibold text-ink">The Tech Space</span>
              </Link>
              <p className="text-sm text-dim">
                A Ghanaian design, development and marketing studio. We help you launch sooner, without cutting corners.
              </p>
              <ul className="flex items-center gap-2 text-dim">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid place-items-center w-10 h-10 rounded-full hover:bg-canvas hover:text-ink transition-colors"
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right columns: Link sections */}
            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-20">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="mb-4 text-sm font-semibold text-ink">{section.title}</h2>
                  <ul className="space-y-3 text-sm text-dim">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link to={link.href} className="hover:text-ink transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 border-t border-line pt-8 text-xs font-medium text-dim">
            <p>&copy; {new Date().getFullYear()} TTS - The Tech Space. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lg shadow-black/20 transition-colors hover:bg-brand"
        >
          <FaArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </>
  );
};

export default Footer;
