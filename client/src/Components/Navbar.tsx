import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/contact", label: "Contact" },
    { to: "/login", label: "Login" },
    { to: "/gallery", label: "Gallery" },
    { to: "/services", label: "Services" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-[var(--color-bg)] text-[var(--color-text)] backdrop-blur-md shadow-md z-50 transition-colors">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-3">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-[var(--color-primary)]"
        >
          Korynthian Detailing
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`relative px-2 py-1 hover:text-[var(--color-primary)] transition 
                ${
                  location.pathname === link.to
                    ? "text-[var(--color-primary)] font-semibold"
                    : ""
                }`}
              >
                {/* Underline Animation */}
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 bg-[var(--color-secondary)] scale-x-0 origin-left transition-transform duration-300 
                    ${
                      location.pathname === link.to
                        ? "scale-x-100"
                        : "hover:scale-x-100"
                    }`}
                />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            className="p-2 rounded-full bg-[var(--color-secondary)] text-white hover:opacity-80 transition"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-[var(--color-bg)] text-[var(--color-text)] shadow-md flex flex-col space-y-3 p-4 text-center">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`block py-2 rounded-lg transition 
                ${
                  location.pathname === link.to
                    ? "bg-[var(--color-secondary)] text-white font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
