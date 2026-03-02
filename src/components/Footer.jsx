import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { animateScroll as scroll } from 'react-scroll';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaArrowUp,
} from 'react-icons/fa';
import logo1 from '../assets/img/logo1.png';

const sections = [
  {
    title: "Quick Links",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Contact", href: "/contact" },
      { name: "Projects", href: "/projects" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "Graphic Design", href: "/services/graphic-design" },
      { name: "UI/UX Design", href: "/services/ui-ux" },
      { name: "Branding", href: "/services/branding" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Newsletter", href: "#newsletter" },
    ],
  },
];

const socialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaFacebookF className="size-5" />, href: "https://facebook.com", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "https://twitter.com", label: "Twitter" },
  { icon: <FaPinterest className="size-5" />, href: "https://pinterest.com", label: "Pinterest" },
];

const legalLinks = [
  { name: "Terms of Use", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

const Footer = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <section className="py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
            {/* Left column: Logo, description & socials */}
            <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link to="/">
                  <img
                    src={logo1}
                    alt="TTS Logo"
                    title="The Tech Space"
                    className="h-12"
                  />
                </Link>
                <h2 className="text-xl font-semibold text-gray-900">The Tech Space</h2>
              </div>
              <p className="max-w-[70%] text-sm text-gray-500">
                The Tech Space — building Africa's leading innovation hub for tech, design, and digital solutions.
              </p>
              <ul className="flex items-center space-x-6 text-gray-400">
                {socialLinks.map((social, idx) => (
                  <li key={idx} className="font-medium hover:text-gray-900 transition-colors">
                    <a href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right columns: Link sections */}
            <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 font-bold text-gray-900">{section.title}</h3>
                  <ul className="space-y-3 text-sm text-gray-500">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-gray-900 transition-colors"
                      >
                        <Link to={link.href}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-gray-200 py-8 text-xs font-medium text-gray-500 md:flex-row md:items-center md:text-left">
            <p className="order-2 lg:order-1">
              &copy; {new Date().getFullYear()} TTS - The Tech Space. All Rights Reserved.
            </p>
            <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
              {legalLinks.map((link, idx) => (
                <li key={idx} className="hover:text-gray-900 transition-colors">
                  <Link to={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-brand-gold text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-all duration-300 z-50"
        >
          <FaArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default Footer;
