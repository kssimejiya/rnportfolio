"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { url: "/", title: "Home" },
  { url: "/about", title: "About" },
  { url: "/portfolio", title: "Portfolio" },
  { url: "/contact", title: "Contact" },
];

// =============================================================================
// NAV LINK COMPONENT (Integrated)
// =============================================================================
const NavLink = ({ link, onClick }) => {
  const pathName = usePathname();
  const isActive = pathName === link.url;

  return (
    <Link
      href={link.url}
      onClick={onClick}
      className="relative group"
    >
      <span
        className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300
                    ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}
      >
        {link.title}
      </span>

      {/* Active indicator - pill background */}
      {isActive && (
        <motion.div
          layoutId="navbar-active"
          className="absolute inset-0 bg-white/15 rounded-full"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Hover indicator */}
      {!isActive && (
        <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Link>
  );
};

// =============================================================================
// MOBILE MENU LINK
// =============================================================================
const MobileNavLink = ({ link, index, onClick }) => {
  const pathName = usePathname();
  const isActive = pathName === link.url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
    >
      <Link
        href={link.url}
        onClick={onClick}
        className={`relative block text-4xl sm:text-5xl font-bold transition-all duration-300
                    ${isActive ? "text-white" : "text-white/50 hover:text-white hover:translate-x-2"}`}
      >
        <span className="relative z-10">{link.title}</span>
        {isActive && (
          <motion.span
            layoutId="mobile-active"
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
          />
        )}
      </Link>
    </motion.div>
  );
};

// =============================================================================
// HAMBURGER BUTTON
// =============================================================================
const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <button
      className="relative w-10 h-10 flex items-center justify-center z-50 
                 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20
                 hover:bg-white/20 transition-colors duration-300"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div className="w-5 h-4 flex flex-col justify-between">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-0.5 bg-white rounded-full origin-left"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-0.5 bg-white rounded-full"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-0.5 bg-white rounded-full origin-left"
        />
      </div>
    </button>
  );
};

// =============================================================================
// MOBILE MENU OVERLAY
// =============================================================================
const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full sm:w-[400px] h-screen z-40
                       bg-gradient-to-b from-[#0a0a12] via-[#0d0d1a] to-[#0a0a12]
                       shadow-2xl"
          >
            {/* Decorative gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
              <div className="absolute bottom-40 -left-20 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl" />
            </div>

            {/* Menu Content */}
            <div className="relative h-full flex flex-col justify-center px-12">
              {/* Navigation Links */}
              <nav className="flex flex-col gap-6">
                {links.map((link, index) => (
                  <MobileNavLink
                    key={link.title}
                    link={link}
                    index={index}
                    onClick={onClose}
                  />
                ))}
              </nav>

              {/* Social Links */}
              {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex gap-4"
              >
                {[
                  { name: "GitHub", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
                  { name: "LinkedIn", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { name: "Twitter", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    aria-label={social.name}
                    className="w-10 h-10 rounded-xl bg-white/10 border border-white/20
                               flex items-center justify-center text-white/60
                               hover:bg-white/20 hover:text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </motion.div> */}

              {/* Contact CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-3 
                             bg-gradient-to-r from-cyan-500 to-blue-500 
                             rounded-xl text-white font-semibold
                             hover:shadow-lg hover:shadow-cyan-500/30 
                             transition-shadow duration-300"
                >
                  Let's Talk
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// =============================================================================
// MAIN NAVBAR
// =============================================================================
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="h-full flex items-center justify-between px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 relative z-50">
        {/* Logo */}
        <Link href="/" className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            {/* Logo icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 
                            flex items-center justify-center text-white font-bold text-lg
                            shadow-lg shadow-cyan-500/30">
              K
            </div>
            {/* Logo text - hidden on mobile */}
            <span className="hidden sm:block text-white font-semibold text-lg">
              Keyun
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {/* Glass container for nav links */}
          <div className="flex items-center gap-1 px-2 py-2 
                          bg-white/10 backdrop-blur-xl rounded-full 
                          border border-white/20 shadow-lg">
            {links.map((link) => (
              <NavLink key={link.title} link={link} />
            ))}
          </div>
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:block">
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 bg-white text-gray-900 rounded-full 
                         font-semibold text-sm
                         shadow-lg hover:shadow-xl
                         transition-shadow duration-300"
            >
              Hire Me
            </motion.button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <HamburgerButton isOpen={isOpen} onClick={toggleMenu} />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={closeMenu} />
    </>
  );
};

export default Navbar;