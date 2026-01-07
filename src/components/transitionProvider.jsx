"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Navbar from "./navbar";

// =============================================================================
// ROUTE LABELS
// =============================================================================
const getRouteLabel = (path) => {
  const routes = {
    "/": "Home",
    "/about": "About",
    "/portfolio": "Portfolio",
    "/contact": "Contact",
  };
  return routes[path] || path.substring(1) || "Home";
};

// =============================================================================
// CURTAIN TRANSITION OVERLAY
// =============================================================================
const CurtainOverlay = ({ label }) => {
  return (
    <>
      {/* Top curtain - slides down to cover, then up to reveal */}
      <motion.div
        className="w-screen fixed bg-[#020208] rounded-b-[100px] z-40 top-0 left-0"
        initial={{ height: "0vh" }}
        animate={{ height: "100vh" }}
        exit={{ height: "0vh" }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Route label text */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative">
          {/* Glow effect - cyan/blue like homepage */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-40" />
          <span className="relative text-white text-6xl sm:text-8xl font-bold capitalize">
            {label}
          </span>
        </div>
      </motion.div>

      {/* Bottom curtain - follows top curtain */}
      <motion.div
        className="w-screen fixed bg-[#020208] rounded-t-[100px] z-30 bottom-0 left-0"
        initial={{ height: "0vh" }}
        animate={{ height: "100vh" }}
        exit={{ height: "0vh" }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1], delay: 0.1 }}
      />
    </>
  );
};

// =============================================================================
// MAIN TRANSITION PROVIDER
// =============================================================================
const TransitionProvider = ({ children }) => {
  const pathName = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState("");

  const isFirstRender = useRef(true);
  const previousPath = useRef(pathName);

  useEffect(() => {
    // Skip transition on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayChildren(children);
      return;
    }

    // Skip if same path (just children update)
    if (previousPath.current === pathName) {
      setDisplayChildren(children);
      return;
    }

    // Route changed - start transition
    previousPath.current = pathName;
    setTransitionLabel(getRouteLabel(pathName));
    setIsTransitioning(true);

    // Swap content while curtain is covering screen
    const swapTimer = setTimeout(() => {
      setDisplayChildren(children);
      window.scrollTo(0, 0);
    }, 400);

    // Start exit animation after content swap
    const exitTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => {
      clearTimeout(swapTimer);
      clearTimeout(exitTimer);
    };
  }, [pathName, children]);

  return (
    <div className="w-screen min-h-screen bg-[#020208]">
      {/* Curtain Overlay */}
      <AnimatePresence>
        {isTransitioning && <CurtainOverlay key="curtain" label={transitionLabel} />}
      </AnimatePresence>

      {/* Navbar */}
      <div className="h-24 relative z-50">
        <Navbar />
      </div>

      {/* Page Content - Key forces remount on route change */}
      <div key={pathName} className="min-h-[calc(100vh-6rem)]">{displayChildren}</div>
    </div>
  );
};

export default TransitionProvider;