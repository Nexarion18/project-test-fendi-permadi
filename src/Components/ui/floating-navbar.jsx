"use client";

import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "../lib/utils";
import logo from "../../assets/images/logo.png";

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      setAtTop(current < 0.05);
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  useEffect(() => {
    const y = window.scrollY;
    setAtTop(y < 50);
    setVisible(true);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 1 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-full fixed inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-md dark:bg-black bg-orange-300 shadow z-[5000] px-4 md:px-20 items-center justify-between",
          atTop ? "bg-orange-500" : "bg-orange-500/70 backdrop-blur-md",
          className
        )}
      >
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-auto md:h-18"
          />
        </div>

        {/* navbar menu untuk desktop */}
        <div className="hidden md:flex items-center space-x-1 md:space-x-5">
          {navItems.map((navItem, idx) => (
            <NavLink
              key={`link-${idx}`}
              to={navItem.link}
              className={({ isActive }) =>
                cn(
                  "relative flex items-center space-x-1 text-white hover:text-gray-200 transition-colors duration-200",
                  isActive
                    ? "border-b-2 border-white"
                    : "text-white"
                )
              }
            >
              <span>{navItem.icon}</span>
              <span>{navItem.name}</span>
            </NavLink>
          ))}
        </div>

        {/* button menu untuk mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {/*hamburger icon saat layar kecil */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/*dropdown menu untuk mobile*/}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-orange-500 flex flex-col items-start p-4 space-y-2 md:hidden">
            {navItems.map((navItem, idx) => (
              <NavLink
                key={`mobile-link-${idx}`}
                to={navItem.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "w-full text-white hover:text-gray-200 py-2",
                    isActive
                      ? "border-b-2 border-white"
                      : "text-white"
                  )
                }
              >
                {navItem.name}
              </NavLink>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
