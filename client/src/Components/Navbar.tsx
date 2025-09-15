import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import type { To } from "react-router-dom";
import { FaSun, FaMoon, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- types ---------- */
type NavLinkItem = { to?: string; label: string; dropdown?: boolean };
type ServiceItem = { to: string; label: string };
type ServiceMap = {
  interior: ServiceItem[];
  exterior: ServiceItem[];
  full: ServiceItem[];
};

/* ---------- data ---------- */
const navLinks: NavLinkItem[] = [
  { to: "/", label: "Home" },
  { dropdown: true, label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

const serviceItems: ServiceMap = {
  interior: [
    { to: "/services/interior/basic", label: "Basic Interior" },
    { to: "/services/interior/scrub", label: "Scrub and Shine" },
    { to: "/services/interior/shampoo", label: "Shampoo Clean" },
  ],
  exterior: [
    { to: "/services/exterior/basic", label: "Basic Exterior" },
    { to: "/services/exterior/wax", label: "Wax & Shine" },
    { to: "/services/exterior/3step", label: "3 Step Wax" },
  ],
  full: [
    { to: "/services/full/basic", label: "Basic Full Service" },
    { to: "/services/full/complete", label: "Complete Interior" },
    { to: "/services/full/allstar", label: "All-Star Clean" }, // typo fixed
  ],
};

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // ref attached to the <li> that contains the services dropdown
  const dropdownRef = useRef<HTMLLIElement | null>(null);

  const location = useLocation();

  // Load theme on mount (persisted + system-preference fallback)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Click-outside handler to close services dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Optional: disable body scroll when mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-[var(--color-card)] text-[var(--color-text)] sticky top-0 z-50 transition-colors">
      {/* Left: Logo */}
      <div className="text-xl font-bold">
        <Link
          to="/"
          className="hover:text-[var(--color-primary)] transition-colors"
        >
          My Detailing Co.
        </Link>
      </div>

      {/* Middle: Desktop links */}
      <ul className="hidden md:flex space-x-8">
        {navLinks.map((link) => {
          if (link.dropdown) {
            return (
              <li key={link.label} className="relative" ref={dropdownRef}>
                <button
                  aria-expanded={isServicesOpen}
                  aria-controls="services-menu"
                  onClick={() => setIsServicesOpen((s) => !s)}
                  className={`flex items-center space-x-1 focus:outline-none hover:text-[var(--color-primary)] transition-colors ${
                    isServicesOpen ? "text-[var(--color-primary)]" : ""
                  }`}
                >
                  <span>{link.label}</span>
                  <FaChevronDown
                    className={`transition-transform ${
                      isServicesOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      id="services-menu"
                      role="menu"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 mt-2 w-[600px] grid grid-cols-3 gap-6 p-4 bg-[var(--color-card)] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      {Object.entries(serviceItems).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="font-semibold mb-2 text-[var(--color-primary)] capitalize">
                            {category}
                          </h4>
                          <ul className="space-y-1">
                            {items.map((item) => (
                              <li key={item.to}>
                                <Link
                                  to={item.to as To}
                                  className={
                                    location.pathname === item.to
                                      ? "text-[var(--color-primary)] font-semibold"
                                      : "hover:text-[var(--color-primary)]"
                                  }
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          }

          // non-dropdown link - ensure `to` exists (type-safe)
          if (!link.to) return null;
          return (
            <li key={link.label}>
              <Link
                to={link.to as To}
                className={
                  location.pathname === link.to
                    ? "text-[var(--color-primary)] font-semibold"
                    : "hover:text-[var(--color-primary)]"
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Right: Desktop buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="px-4 py-2 bg-[var(--color-bg)] dark:bg-[var(--color-card)] text-[var(--color-text)] border border-gray-200 dark:border-gray-500 rounded-2xl shadow-sm hover:text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-gray-500 transition">
          Log In
        </button>

        <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-2xl shadow hover:opacity-90 transition">
          Book Appointment
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 rounded-full bg-[var(--color-bg)] dark:bg-[var(--color-card)] text-[var(--color-primary)] border border-gray-200 dark:border-gray-500 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-500 transition"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden p-2 text-[var(--color-text)] hover:text-[var(--color-primary)]"
        onClick={() => setIsMobileMenuOpen((s) => !s)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 w-full bg-[var(--color-card)] flex flex-col space-y-4 p-6 md:hidden border-t border-gray-200 dark:border-gray-700"
          >
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setIsServicesOpen((s) => !s)}
                      className="flex items-center space-x-1 hover:text-[var(--color-primary)]"
                    >
                      <span>{link.label}</span>
                      <FaChevronDown
                        className={`transition-transform ${
                          isServicesOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="grid grid-cols-1 gap-4 pl-4"
                        >
                          {Object.entries(serviceItems).map(
                            ([category, items]) => (
                              <div key={category}>
                                <h4 className="font-semibold mb-2 text-[var(--color-primary)] capitalize">
                                  {category}
                                </h4>
                                <ul className="space-y-1">
                                  {items.map((item) => (
                                    <li key={item.to}>
                                      <Link
                                        to={item.to as To}
                                        onClick={() =>
                                          setIsMobileMenuOpen(false)
                                        }
                                        className={
                                          location.pathname === item.to
                                            ? "text-[var(--color-primary)] font-semibold"
                                            : "hover:text-[var(--color-primary)]"
                                        }
                                      >
                                        {item.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (!link.to) return null;
              return (
                <Link
                  key={link.label}
                  to={link.to as To}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={
                    location.pathname === link.to
                      ? "text-[var(--color-primary)] font-semibold"
                      : "hover:text-[var(--color-primary)]"
                  }
                >
                  {link.label}
                </Link>
              );
            })}

            <button className="px-4 py-2 bg-[var(--color-bg)] dark:bg-[var(--color-card)] text-[var(--color-text)] border border-gray-200 dark:border-gray-500 rounded-2xl shadow-sm hover:text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-gray-500">
              Log In
            </button>

            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-2xl shadow hover:opacity-90">
              Book Appointment
            </button>

            <button
              onClick={() => {
                toggleTheme();
                // keep mobile menu open/close behavior as desired
              }}
              className="p-2 rounded-full bg-[var(--color-bg)] dark:bg-[var(--color-card)] text-[var(--color-primary)] border border-gray-200 dark:border-gray-500 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-500 w-fit"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
