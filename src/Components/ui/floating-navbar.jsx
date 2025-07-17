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
          "flex max-w-full fixed inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-md dark:bg-black bg-orange-300 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-20 items-center justify-between",
          atTop ? "bg-orange-500" : "bg-orange-500/70 backdrop-blur-md",
          className
        )}
      >
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto md:h-18" />
        </div>

        <div className=" flex items-center space-x-1 md:space-x-5">
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
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
