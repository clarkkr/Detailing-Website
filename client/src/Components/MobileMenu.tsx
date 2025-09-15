import React from "react";
import { Link } from "react-router-dom";
import type { To } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChevronDown, FaSun, FaMoon } from "react-icons/fa";
import type { ServiceMap } from "./Navbar";

interface Props {
  navLinks: { to?: string; label: string; dropdown?: boolean }[];
  serviceItems: ServiceMap;
  isServicesOpen: boolean;
  setIsServicesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  isDarkMode: boolean;
  closeMenu: () => void;
  currentPath: string;
}

const MobileMenu: React.FC<Props> = ({
  navLinks,
  serviceItems,
  isServicesOpen,
  setIsServicesOpen,
  toggleTheme,
  isDarkMode,
  closeMenu,
  currentPath,
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.18 }}
    className="absolute top-full left-0 w-full bg-[var(--color-card)] flex flex-col space-y-4 p-6 md:hidden border-t border-gray-200 dark:border-gray-700"
  >
    {navLinks.map((link) =>
      link.dropdown ? (
        <div key={link.label}>
          <button
            onClick={() => setIsServicesOpen((prev) => !prev)}
            className="flex items-center space-x-1 hover:text-[var(--color-primary)]"
          >
            <span>{link.label}</span>
            <FaChevronDown
              className={`transition-transform ${
                isServicesOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isServicesOpen && (
            <div className="grid grid-cols-1 gap-4 pl-4 mt-2">
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
                          onClick={closeMenu}
                          className={
                            currentPath === item.to
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
            </div>
          )}
        </div>
      ) : (
        link.to && (
          <Link
            key={link.label}
            to={link.to as To}
            onClick={closeMenu}
            className={
              currentPath === link.to
                ? "text-[var(--color-primary)] font-semibold"
                : "hover:text-[var(--color-primary)]"
            }
          >
            {link.label}
          </Link>
        )
      )
    )}

    <button className="px-4 py-2 bg-[var(--color-bg)] dark:bg-[var(--color-card)] border border-gray-200 dark:border-gray-500 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-600">
      Log In
    </button>

    <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-2xl hover:opacity-90">
      Book Appointment
    </button>

    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-[var(--color-bg)] dark:bg-[var(--color-card)] text-[var(--color-primary)] border border-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 w-fit"
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  </motion.div>
);

export default MobileMenu;
