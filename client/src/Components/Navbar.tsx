import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b border-gray-200 dark:border-gray-700 bg-[var(--color-card)] text-[var(--color-text)] relative transition-colors">
      {/* Left: Company Name */}
      <div className="text-xl font-bold">
        <Link
          to="/"
          className="hover:text-[var(--color-primary)] transition-colors"
        >
          My Detailing Co.
        </Link>
      </div>

      {/* Middle: Nav Links (Desktop) */}
      <ul className="hidden md:flex space-x-8">
        <li>
          <Link
            to="/"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Home
          </Link>
        </li>
        <li className="relative">
          <button
            onClick={() => setIsServicesOpen(!isServicesOpen)}
            className="flex items-center space-x-1 focus:outline-none hover:text-[var(--color-primary)] transition-colors"
          >
            <span>Services</span>
            <FaChevronDown
              className={`transition-transform ${
                isServicesOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          <AnimatePresence>
            {isServicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 mt-2 w-[600px] grid grid-cols-3 gap-6 p-4 bg-[var(--color-card)] rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-primary)]">
                    Interior
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/services/interior/basic"
                        className="hover:text-[var(--color-primary)]"
                      >
                        Basic Interior
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/interior/premium"
                        className="hover:text-[var(--color-primary)]"
                      >
                        Premium Interior
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-primary)]">
                    Exterior
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/services/exterior/basic"
                        className="hover:text-[var(--color-primary)]"
                      >
                        Basic Exterior
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/exterior/premium"
                        className="hover:text-[var(--color-primary)]"
                      >
                        Premium Exterior
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-[var(--color-primary)]">
                    Combined
                  </h4>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/services/combined/basic"
                        className="hover:text-[var(--color-primary)]"
                      >
                        Full Basic
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/services/combined/premium"
                        className="hover:text-[var(--color-primary)]"
                      >
                        Full Premium
                      </Link>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
        <li>
          <Link
            to="/gallery"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Gallery
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Right: Buttons (Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="px-4 py-2 bg-white dark:bg-[var(--color-card)] text-[var(--color-text)] rounded-2xl shadow hover:text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-gray-500 transition">
          Log In
        </button>
        <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-2xl shadow hover:opacity-90 transition">
          Book Appointment
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white dark:bg-[var(--color-card)] text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-gray-500 transition"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 text-[var(--color-text)] hover:text-[var(--color-primary)]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[var(--color-card)] flex flex-col space-y-4 p-6 md:hidden border-t border-gray-200 dark:border-gray-700"
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[var(--color-primary)]"
            >
              Home
            </Link>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="flex items-center space-x-1 hover:text-[var(--color-primary)]"
            >
              <span>Services</span>
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
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 gap-4 pl-4"
                >
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--color-primary)]">
                      Interior
                    </h4>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/services/interior/basic"
                          className="hover:text-[var(--color-primary)]"
                        >
                          Basic Interior
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/interior/premium"
                          className="hover:text-[var(--color-primary)]"
                        >
                          Premium Interior
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--color-primary)]">
                      Exterior
                    </h4>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/services/exterior/basic"
                          className="hover:text-[var(--color-primary)]"
                        >
                          Basic Exterior
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/exterior/premium"
                          className="hover:text-[var(--color-primary)]"
                        >
                          Premium Exterior
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-[var(--color-primary)]">
                      Combined
                    </h4>
                    <ul className="space-y-1">
                      <li>
                        <Link
                          to="/services/combined/basic"
                          className="hover:text-[var(--color-primary)]"
                        >
                          Full Basic
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services/combined/premium"
                          className="hover:text-[var(--color-primary)]"
                        >
                          Full Premium
                        </Link>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <Link
              to="/gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[var(--color-primary)]"
            >
              Gallery
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[var(--color-primary)]"
            >
              Contact
            </Link>
            <button className="px-4 py-2 bg-white dark:bg-gray-600 text-[var(--color-text)] rounded-2xl shadow hover:text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-gray-500">
              Log In
            </button>
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-2xl shadow hover:opacity-90">
              Book Appointment
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-gray-600 text-[var(--color-primary)] hover:bg-gray-100 dark:hover:bg-gray-500 w-fit"
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
