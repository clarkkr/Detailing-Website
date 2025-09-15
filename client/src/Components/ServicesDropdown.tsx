import React from "react";
import { Link } from "react-router-dom";
import type { To } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import type { ServiceMap } from "./Navbar";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  serviceItems: ServiceMap;
  locationPath: string;
  dropdownRef: React.RefObject<HTMLLIElement | null>;
}

const ServicesDropdown: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  serviceItems,
  locationPath,
  dropdownRef,
}) => (
  <li className="relative" ref={dropdownRef}>
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className={`flex items-center space-x-1 hover:text-[var(--color-primary)] ${
        isOpen ? "text-[var(--color-primary)]" : ""
      }`}
    >
      <span>Services</span>
      <FaChevronDown
        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
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
                        locationPath === item.to
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

export default ServicesDropdown;
