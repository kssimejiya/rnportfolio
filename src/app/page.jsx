"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

// =============================================================================
// COSMIC LIGHT RAYS BACKGROUND (Enhanced with Contact Page Features)
// =============================================================================
const CosmicLightRaysBackground = () => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    }
  }, [mouseX, mouseY]);

  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="fixed inset-0 overflow-hidden"
    >
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-[#020208]" />
      
      {/* Layered Radial Gradients for Depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 150% 100% at 50% -20%, rgba(15, 23, 42, 0.9) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 20% 100%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 80% 50% at 80% 100%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 50%, rgba(14, 116, 144, 0.04) 0%, transparent 60%)
          `
        }}
      />

      {/* Central Light Source - Top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3">
        <motion.div
          className="w-[1000px] h-[600px]"
          style={{
            background: `
              radial-gradient(ellipse at center,
                rgba(56, 189, 248, 0.25) 0%,
                rgba(59, 130, 246, 0.12) 30%,
                rgba(139, 92, 246, 0.05) 50%,
                transparent 70%
              )
            `,
            filter: 'blur(60px)',
          }}
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Animated Light Rays - spread origins to avoid center line */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(10)].map((_, i) => {
          // Spread rays across the top, avoiding exact center
          const positions = [15, 25, 35, 42, 47, 53, 58, 65, 75, 85];
          const angles = [-25, -18, -12, -6, -2, 2, 6, 12, 18, 25];
          const delay = i * 0.2;
          const duration = 4 + (i % 3);
          
          return (
            <motion.div
              key={i}
              className="absolute top-0 origin-top"
              style={{
                left: `${positions[i]}%`,
                width: "2px",
                height: "100vh",
                background: `linear-gradient(to bottom, 
                  rgba(56, 189, 248, 0.35) 0%, 
                  rgba(59, 130, 246, 0.15) 30%,
                  rgba(139, 92, 246, 0.05) 60%,
                  transparent 80%)`,
                transform: `rotate(${angles[i]}deg)`,
                filter: "blur(1.5px)",
              }}
              animate={{
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Wide Ambient Glow Areas - no center */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-40">
        {[...Array(4)].map((_, i) => {
          const positions = [20, 38, 62, 80];
          const angles = [-15, -5, 5, 15];
          return (
            <motion.div
              key={`wide-${i}`}
              className="absolute top-0 origin-top"
              style={{
                left: `${positions[i]}%`,
                width: "100px",
                height: "100vh",
                background: `linear-gradient(to bottom, 
                  rgba(56, 189, 248, 0.08) 0%, 
                  rgba(59, 130, 246, 0.04) 35%,
                  transparent 70%)`,
                transform: `rotate(${angles[i]}deg)`,
                filter: "blur(40px)",
              }}
              animate={{
                opacity: [0.2, 0.45, 0.2],
              }}
              transition={{
                duration: 6 + i,
                delay: i * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Flowing Aurora Wave */}
      <motion.div
        className="absolute w-[200%] h-[400px] top-1/3 -left-1/2"
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(6, 182, 212, 0.03) 15%,
              rgba(59, 130, 246, 0.05) 35%,
              rgba(139, 92, 246, 0.04) 50%,
              rgba(59, 130, 246, 0.05) 65%,
              rgba(6, 182, 212, 0.03) 85%,
              transparent 100%
            )
          `,
          filter: 'blur(50px)',
          transform: 'rotate(-8deg)',
        }}
        animate={{
          x: ['-15%', '15%', '-15%'],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Interactive Mouse Glow */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: useTransform(smoothMouseX, [0, 1], ['0%', '100%']),
          top: useTransform(smoothMouseY, [0, 1], ['0%', '100%']),
          x: '-50%',
          y: '-50%',
          width: '500px',
          height: '500px',
          background: `
            radial-gradient(
              circle at center,
              rgba(56, 189, 248, 0.08) 0%,
              rgba(59, 130, 246, 0.04) 30%,
              rgba(139, 92, 246, 0.02) 50%,
              transparent 70%
            )
          `,
          filter: 'blur(40px)',
        }}
      />

      {/* Star Field */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-[15%] w-32 h-32 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-[10%] w-40 h-40 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(25px)',
        }}
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 70% at 50% 50%,
              transparent 0%,
              rgba(2, 2, 8, 0.3) 60%,
              rgba(2, 2, 8, 0.7) 100%
            )
          `
        }}
      />
    </div>
  );
};

// =============================================================================
// PREMIUM PHONE WITH APP SCREENSHOTS
// =============================================================================
const PremiumPhoneShowcase = () => {
  const [currentApp, setCurrentApp] = useState(0);
  
  // FIX: Use complete static class strings that Tailwind can scan
  // Instead of dynamic interpolation like `${apps[currentApp].gradient}`
  const apps = [
    { 
      name: "Samsung Remote",
      downloads: "10M+",
      screenshot: "/remote_1.png",
      // Complete class strings - Tailwind scanner can detect these
      glowClass: "bg-gradient-to-br from-rose-500 to-purple-600",
      screenBgClass: "bg-gradient-to-br from-rose-500 to-purple-600"
    },
    { 
      name: "Coachie",
      downloads: "10K+", 
      screenshot: "/coachie_1.png",
      glowClass: "bg-gradient-to-br from-emerald-500 to-cyan-500",
      screenBgClass: "bg-gradient-to-br from-emerald-500 to-cyan-500"
    },
    { 
      name: "Foodzapp",
      downloads: "10K+",
      screenshot: "/foodz_2.png", 
      glowClass: "bg-gradient-to-br from-orange-500 to-amber-500",
      screenBgClass: "bg-gradient-to-br from-orange-500 to-amber-500"
    },
    { 
      name: "Aunest",
      downloads: "Coming Soon",
      screenshot: "/aunest_2.png",
      glowClass: "bg-gradient-to-br from-amber-500 to-orange-600",
      screenBgClass: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
  ];

  // Auto-rotate apps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentApp((prev) => (prev + 1) % apps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [apps.length]);

  return (
    // FIX: Added flex-shrink-0 to prevent parent grid/flex from stretching
    <div className="relative flex items-center justify-center flex-shrink-0">
      {/* Phone glow - using complete className instead of interpolation */}
      <motion.div
        className={`absolute w-[300px] h-[500px] sm:w-[350px] sm:h-[600px] rounded-[60px] blur-[80px] opacity-40 ${apps[currentApp].glowClass}`}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Main Phone */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex-shrink-0"
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Phone Frame - FIX: Added flex-shrink-0 to lock dimensions */}
          <div className="relative w-[260px] h-[530px] sm:w-[280px] sm:h-[570px] md:w-[300px] md:h-[610px] flex-shrink-0">
            {/* Outer frame with metallic gradient */}
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 p-[2px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <div className="w-full h-full rounded-[2.9rem] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-[3px]">
                {/* Inner bezel */}
                <div className="relative w-full h-full rounded-[2.75rem] bg-black overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-full z-30 flex items-center justify-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-900 ring-1 ring-gray-800" />
                    <div className="w-2 h-2 rounded-full bg-gray-800" />
                  </div>

                  {/* Screen Content */}
                  <div className="relative w-full h-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentApp}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        {/* App Screenshot or Gradient Fallback - using complete className */}
                        <div className={`w-full h-full ${apps[currentApp].screenBgClass}`}>
                          <img 
                            src={apps[currentApp].screenshot}
                            alt={apps[currentApp].name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        
                        {/* Overlay gradient for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                      </motion.div>
                    </AnimatePresence>

                    {/* App Info Overlay - Glass Effect */}
                    <div className="absolute bottom-4 left-3 right-3 z-20">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`info-${currentApp}`}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="relative overflow-hidden rounded-2xl"
                        >
                          {/* Glass background */}
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10" />
                          <div className="absolute inset-[1px] rounded-2xl border border-white/20" />
                          
                          {/* Shine effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            initial={{ x: "-200%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          />
                          
                          {/* Content */}
                          <div className="relative px-5 py-4 flex items-center justify-between">
                            <div>
                              <motion.h3 
                                className="text-white font-semibold text-base tracking-tight"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                {apps[currentApp].name}
                              </motion.h3>
                              <motion.p 
                                className="text-white/50 text-xs font-medium mt-0.5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                              >
                                {apps[currentApp].downloads} Downloads
                              </motion.p>
                            </div>
                            
                            {/* Platform badges */}
                            <div className="flex gap-1.5">
                              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                              </div>
                              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                                <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Status bar time */}
                    <div className="absolute top-4 left-6 text-white/80 text-xs font-semibold z-20">
                      9:41
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full z-20" />
                </div>
              </div>
            </div>

            {/* Side buttons */}
            <div className="absolute -left-[2px] top-28 w-[3px] h-8 bg-gray-700 rounded-l-sm" />
            <div className="absolute -left-[2px] top-44 w-[3px] h-14 bg-gray-700 rounded-l-sm" />
            <div className="absolute -left-[2px] top-64 w-[3px] h-14 bg-gray-700 rounded-l-sm" />
            <div className="absolute -right-[2px] top-48 w-[3px] h-20 bg-gray-700 rounded-r-sm" />
          </div>
        </motion.div>

        {/* App indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {apps.map((app, i) => (
            <button
              key={app.name}
              onClick={() => setCurrentApp(i)}
              className="group relative"
            >
              <motion.div
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentApp 
                    ? "bg-white w-8" 
                    : "bg-white/30 hover:bg-white/50 w-2"
                }`}
                layoutId="indicator"
              />
            </button>
          ))}
        </div>

        {/* Download count floating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -right-4 sm:-right-16 top-20 z-30"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20 shadow-2xl"
          >
            <p className="text-white/60 text-[10px] font-medium">Total Downloads</p>
            <p className="text-white text-xl font-bold">10M+</p>
          </motion.div>
        </motion.div>

        {/* Rating badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute -left-4 sm:-left-20 bottom-32 z-30"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl px-4 py-3 border border-white/20 shadow-2xl"
          >
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-amber-400 text-sm">★</span>
              ))}
            </div>
            <p className="text-white/60 text-[10px]">App Store Rating</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// =============================================================================
// MAGNETIC BUTTON
// =============================================================================
const MagneticButton = ({ children, href, variant = "primary" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = "relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 group overflow-hidden";
  
  const variants = {
    primary: "bg-white text-gray-900 hover:bg-gray-100 shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-xl"
  };

  return (
    <Link href={href}>
      <motion.button
        ref={ref}
        style={{ x: xSpring, y: ySpring }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]}`}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          initial={{ x: "-200%" }}
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.8 }}
        />
        <span className="relative z-10">{children}</span>
        {variant === "primary" && (
          <svg className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        )}
      </motion.button>
    </Link>
  );
};

// =============================================================================
// MAIN HOMEPAGE
// =============================================================================
const Homepage = () => {
  // Auto-scroll to hide navbar after page transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 150, // Scroll past navbar for proper content alignment
        behavior: 'smooth'
      });
    }, 900); // Wait for transition (800ms) + buffer

    return () => clearTimeout(timer);
  }, []); // Runs on mount (component remounts on navigation due to key)

  return (
    <div className="relative">
      {/* Spacer to enable scroll */}
      <div className="h-24" />
      
      <motion.div
        className="h-screen w-screen overflow-x-clip relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
      {/* Enhanced Cosmic Light Rays Background */}
      <CosmicLightRaysBackground />

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* Availability Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6 sm:mb-8"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-white/70 text-sm font-medium">Available for new projects</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                  <span className="block">Crafting</span>
                  <span className="block mt-1">
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Mobile
                      </span>
                      <motion.svg
                        className="absolute -bottom-2 left-0 w-full"
                        viewBox="0 0 200 12"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                      >
                        <motion.path
                          d="M2 8 Q50 2 100 8 T198 8"
                          stroke="url(#underline-gradient)"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1, delay: 0.8 }}
                        />
                        <defs>
                          <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="50%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#a78bfa" />
                          </linearGradient>
                        </defs>
                      </motion.svg>
                    </span>
                  </span>
                  <span className="block mt-1">Experiences</span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white/50 text-base sm:text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
              >
                React Native developer specializing in high-performance 
                iOS & Android applications that users love.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-10 sm:mb-14"
              >
                <MagneticButton href="/portfolio" variant="primary">
                  View My Work
                </MagneticButton>
                <MagneticButton href="/contact" variant="secondary">
                  Get in Touch
                </MagneticButton>
              </motion.div>

              {/* Trusted By */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-white/30 text-xs font-medium tracking-wider uppercase mb-4">
                  Trusted By
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-5 sm:gap-x-8 gap-y-2">
                  {["Controlla", "Foodzapp", "Coachie", "PerfectStay", "Aunest"].map((company, i) => (
                    <motion.span
                      key={company}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.8)" }}
                      className="text-white/40 text-sm sm:text-base font-semibold tracking-tight transition-colors cursor-default"
                    >
                      {company}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side - Phone Showcase */}
            {/* FIX: Added flex-shrink-0 to prevent grid stretching */}
            <div className="order-1 lg:order-2 flex items-center justify-center lg:justify-end flex-shrink-0">
              <PremiumPhoneShowcase />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  );
};

export default Homepage;