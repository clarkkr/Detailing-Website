import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import type { To } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import ServicesDropdown from "./ServicesDropdown";
import MobileMenu from "./MobileMenu";

/* ---------- types ---------- */
export type ServiceItem = { to: string; label: string };
export type ServiceMap = {
  interior: ServiceItem[];
  exterior: ServiceItem[];
  full: ServiceItem[];
};

/* ---------- data ---------- */
const navLinks = [
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
    { to: "/services/full/allstar", label: "All-Star Clean" },
  ],
};

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const dropdownRef = useRef<HTMLLIElement | null>(null);

  // Load & sync theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-[var(--color-card)] text-[var(--color-text)] sticky top-0 z-50 transition-colors">
      {/* Left: Logo */}
      <div className="text-xl font-bold">
        <Link to="/" className="hover:text-[var(--color-primary)]">
          My Detailing Co.
        </Link>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex space-x-8">
        {navLinks.map((link) =>
          link.dropdown ? (
            <ServicesDropdown
              key={link.label}
              isOpen={isServicesOpen}
              setIsOpen={setIsServicesOpen}
              serviceItems={serviceItems}
              locationPath={location.pathname}
              dropdownRef={dropdownRef}
            />
          ) : (
            link.to && (
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
            )
          )
        )}
      </ul>

      {/* Desktop Right Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="px-4 py-2 bg-[var(--color-bg)] dark:bg-[var(--color-card)] border border-gray-200 dark:border-gray-500 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600 transition">
          Log In
        </button>
        <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-2xl hover:opacity-90 transition">
          Book Appointment
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-[var(--color-bg)] dark:bg-[var(--color-card)] text-[var(--color-primary)] border border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden p-2 hover:text-[var(--color-primary)]"
        onClick={() => setIsMobileMenuOpen((s) => !s)}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            navLinks={navLinks}
            serviceItems={serviceItems}
            isServicesOpen={isServicesOpen}
            setIsServicesOpen={setIsServicesOpen}
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
            closeMenu={() => setIsMobileMenuOpen(false)}
            currentPath={location.pathname}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
