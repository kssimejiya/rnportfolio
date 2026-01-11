"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useRef, useEffect, useState, memo } from "react";
import Navbar from "./navbar";

// =============================================================================
// FROZEN ROUTER - Critical for exit animations in Next.js App Router
// =============================================================================
function usePreviousValue(value) {
  const prevValue = useRef(null);
  
  useEffect(() => {
    prevValue.current = value;
  }, [value]);
  
  return prevValue.current;
}

function FrozenRouter({ children }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context);
  const frozenContext = prevContext ?? context;
  
  return (
    <LayoutRouterContext.Provider value={frozenContext}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

// =============================================================================
// ROUTE CONFIGURATION
// =============================================================================
const routeConfig = {
  "/": { 
    label: "Home", 
    color: "#22d3ee",
  },
  "/about": { 
    label: "About", 
    color: "#a78bfa",
  },
  "/portfolio": { 
    label: "Portfolio", 
    color: "#60a5fa",
  },
  "/contact": { 
    label: "Contact", 
    color: "#34d399",
  },
};

const getRouteConfig = (path) => {
  return routeConfig[path] || { 
    label: path.substring(1) || "Home", 
    color: "#22d3ee",
  };
};

// =============================================================================
// PAGE TRANSITION - Clean slide-up transition for all devices
// =============================================================================
const PageTransition = memo(({ label, color }) => {
  return (
    <>
      {/* Slide up curtain */}
      <motion.div
        className="fixed inset-0 z-50 bg-[#0a0a0f]"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "-100%" }}
        transition={{
          duration: 0.4,
          ease: [0.645, 0.045, 0.355, 1],
        }}
      />

      {/* Center label */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow */}
        <div
          className="absolute w-48 h-48"
          style={{
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
        
        {/* Text */}
        <motion.h1
          className="relative text-5xl sm:text-6xl md:text-7xl font-black tracking-tight"
          style={{ 
            color: color,
            textShadow: `0 0 30px ${color}60`,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -10 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          {label}
        </motion.h1>
      </motion.div>
    </>
  );
});
PageTransition.displayName = 'PageTransition';

// =============================================================================
// PAGE WRAPPER - Handles individual page animations
// =============================================================================
const PageWrapper = memo(({ children, routeKey }) => {
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <FrozenRouter>
        {children}
      </FrozenRouter>
    </motion.div>
  );
});
PageWrapper.displayName = 'PageWrapper';

// =============================================================================
// MAIN TRANSITION PROVIDER
// =============================================================================
const TransitionProvider = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionConfig, setTransitionConfig] = useState({ label: "", color: "#22d3ee" });
  
  const previousPathname = useRef(pathname);
  const isFirstMount = useRef(true);

  // Handle route changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    const config = getRouteConfig(pathname);
    setTransitionConfig(config);
    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="w-screen min-h-screen min-h-dvh bg-[#020208] relative overflow-x-hidden">
      {/* Background extension for safe areas */}
      <div 
        className="fixed bg-[#020208]"
        style={{ 
          inset: '-100px',
          zIndex: -1,
        }}
      />

      {/* TRANSITION OVERLAY */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <PageTransition
            key="page-transition"
            label={transitionConfig.label}
            color={transitionConfig.color}
          />
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <div 
        className="relative h-24"
        style={{ 
          zIndex: 40,
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <Navbar />
      </div>

      {/* PAGE CONTENT */}
      <AnimatePresence mode="wait" initial={false}>
        <PageWrapper key={pathname} routeKey={pathname}>
          <main 
            className="min-h-[calc(100vh-6rem)]"
            style={{ 
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {children}
          </main>
        </PageWrapper>
      </AnimatePresence>
    </div>
  );
};

export default TransitionProvider;