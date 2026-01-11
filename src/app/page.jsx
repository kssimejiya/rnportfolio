"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

// =============================================================================
// COSMIC LIGHT RAYS BACKGROUND
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
      className="fixed overflow-hidden"
      style={{
        top: '-50px',
        left: 0,
        right: 0,
        bottom: '-50px',
        height: 'calc(100vh + 100px)',
      }}
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
      <div className="absolute top-[50px] left-1/2 -translate-x-1/2 -translate-y-1/3">
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

      {/* Animated Light Rays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(10)].map((_, i) => {
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
                height: "120vh",
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

      {/* Wide Ambient Glow Areas */}
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
                height: "120vh",
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
  
  const apps = [
    { 
      name: "Samsung Remote",
      downloads: "10M+",
      screenshot: "/remote_1.png",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentApp((prev) => (prev + 1) % apps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [apps.length]);

  return (
    <div className="relative flex items-center justify-center flex-shrink-0">
      {/* Phone glow */}
      <motion.div
        className={`absolute w-[200px] h-[380px] xs:w-[240px] xs:h-[420px] sm:w-[300px] sm:h-[500px] md:w-[350px] md:h-[600px] rounded-[60px] blur-[60px] sm:blur-[80px] opacity-40 ${apps[currentApp].glowClass}`}
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
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Phone Frame */}
          <div className="relative w-[200px] h-[408px] xs:w-[220px] xs:h-[450px] sm:w-[260px] sm:h-[530px] md:w-[300px] md:h-[610px] flex-shrink-0">
            {/* Outer frame */}
            <div className="absolute inset-0 rounded-[2.5rem] sm:rounded-[3rem] bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 p-[2px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] sm:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]">
              <div className="w-full h-full rounded-[2.4rem] sm:rounded-[2.9rem] bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] p-[2px] sm:p-[3px]">
                {/* Inner bezel */}
                <div className="relative w-full h-full rounded-[2.25rem] sm:rounded-[2.75rem] bg-black overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 w-[80px] h-[26px] sm:w-[100px] sm:h-[32px] bg-black rounded-full z-30 flex items-center justify-center gap-2 sm:gap-3">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-900 ring-1 ring-gray-800" />
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gray-800" />
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                      </motion.div>
                    </AnimatePresence>

                    {/* App Info Overlay */}
                    <div className="absolute bottom-3 sm:bottom-4 left-2 right-2 sm:left-3 sm:right-3 z-20">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`info-${currentApp}`}
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          className="relative overflow-hidden rounded-xl sm:rounded-2xl"
                        >
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10" />
                          <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl border border-white/20" />
                          
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                            initial={{ x: "-200%" }}
                            animate={{ x: "200%" }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                          />
                          
                          <div className="relative px-3 py-2.5 sm:px-5 sm:py-4 flex items-center justify-between">
                            <div>
                              <motion.h3 
                                className="text-white font-semibold text-sm sm:text-base tracking-tight"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                              >
                                {apps[currentApp].name}
                              </motion.h3>
                              <motion.p 
                                className="text-white/50 text-[10px] sm:text-xs font-medium mt-0.5"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15 }}
                              >
                                {apps[currentApp].downloads} Downloads
                              </motion.p>
                            </div>
                            
                            <div className="flex gap-1 sm:gap-1.5">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-white/10 flex items-center justify-center">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                </svg>
                              </div>
                              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-white/10 flex items-center justify-center">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="absolute top-3 sm:top-4 left-4 sm:left-6 text-white/80 text-[10px] sm:text-xs font-semibold z-20">
                      9:41
                    </div>
                  </div>

                  <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-1 bg-white/30 rounded-full z-20" />
                </div>
              </div>
            </div>

            {/* Side buttons */}
            <div className="absolute -left-[2px] top-20 sm:top-28 w-[3px] h-6 sm:h-8 bg-gray-700 rounded-l-sm" />
            <div className="absolute -left-[2px] top-32 sm:top-44 w-[3px] h-10 sm:h-14 bg-gray-700 rounded-l-sm" />
            <div className="absolute -left-[2px] top-48 sm:top-64 w-[3px] h-10 sm:h-14 bg-gray-700 rounded-l-sm" />
            <div className="absolute -right-[2px] top-36 sm:top-48 w-[3px] h-14 sm:h-20 bg-gray-700 rounded-r-sm" />
          </div>
        </motion.div>

        {/* App indicators */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-5 sm:mt-8">
          {apps.map((app, i) => (
            <button
              key={app.name}
              onClick={() => setCurrentApp(i)}
              className="group relative"
            >
              <motion.div
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  i === currentApp 
                    ? "bg-white w-6 sm:w-8" 
                    : "bg-white/30 hover:bg-white/50 w-1.5 sm:w-2"
                }`}
                layoutId="indicator"
              />
            </button>
          ))}
        </div>

        {/* Download count floating badge - Visible on all screens */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute right-0 xs:-right-2 sm:-right-16 -top-2 xs:top-4 sm:top-20 z-30"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl px-2 py-1.5 xs:px-2.5 xs:py-2 sm:px-4 sm:py-3 border border-white/20 shadow-2xl"
          >
            <p className="text-white/60 text-[7px] xs:text-[8px] sm:text-[10px] font-medium">Total Downloads</p>
            <p className="text-white text-sm xs:text-base sm:text-xl font-bold">10M+</p>
          </motion.div>
        </motion.div>

        {/* Rating badge - Hidden on mobile, visible on sm+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute -left-2 sm:-left-20 bottom-24 sm:bottom-32 z-30 hidden sm:block"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl px-2.5 py-2 sm:px-4 sm:py-3 border border-white/20 shadow-2xl"
          >
            <div className="flex gap-0.5 mb-0.5 sm:mb-1">
              {[1,2,3,4,5].map(i => (
                <span key={i} className="text-amber-400 text-xs sm:text-sm">★</span>
              ))}
            </div>
            <p className="text-white/60 text-[8px] sm:text-[10px]">App Store Rating</p>
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
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isMobile) return;
    
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 150,
        behavior: 'smooth'
      });
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Spacer */}
      <div className="h-6 sm:h-24" />
      
      <motion.div
        className="min-h-screen w-screen overflow-x-clip relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Cosmic Background */}
        <CosmicLightRaysBackground />

        {/* Main Content */}
        <div className="relative z-10 min-h-[calc(100vh-3rem)] sm:h-full flex items-center py-4 sm:py-0">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 
              MOBILE ORDER (default): 
              1. Headline + Description (order-1)
              2. Phone Showcase (order-2)
              3. CTA Buttons (order-3)
              4. Trusted By (order-4)
              
              DESKTOP ORDER (lg+):
              Left: Badge + Headline + Description + CTAs + Trusted (order-1)
              Right: Phone (order-2)
            */}
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-4 items-center">
              
              {/* Text Content Section */}
              <div className="text-center lg:text-left order-1 lg:order-1 w-full">
                
                {/* Availability Badge - HIDDEN on mobile, visible on sm+ */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="hidden sm:inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-4 sm:mb-6 lg:mb-8"
                >
                  <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-white/70 text-xs sm:text-sm font-medium">Available for new projects</span>
                </motion.div>

                {/* Main Headline - FIRST on mobile */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-4 sm:mb-6">
                    <span className="block">Crafting</span>
                    <span className="block mt-0.5 sm:mt-1">
<span className="relative inline-block pb-1 sm:pb-1">
  <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
    Mobile
  </span>
                        <motion.svg
  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
  viewBox="0 0 200 12"
  preserveAspectRatio="none"
  style={{ overflow: 'visible' }}
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
                    <span className="block mt-0.5 sm:mt-1">Experiences</span>
                  </h1>
                </motion.div>

                {/* Subtitle - SECOND on mobile */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-white/50 text-sm sm:text-base lg:text-lg xl:text-xl max-w-lg mx-auto lg:mx-0 mb-0 sm:mb-8 lg:mb-10 leading-relaxed"
                >
                  React Native developer specializing in high-performance 
                  iOS & Android applications that users love.
                </motion.p>

                {/* CTA Buttons - Hidden on mobile, shown below phone */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="hidden sm:flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10 lg:mb-14"
                >
                  <MagneticButton href="/portfolio" variant="primary">
                    View My Work
                  </MagneticButton>
                  <MagneticButton href="/contact" variant="secondary">
                    Get in Touch
                  </MagneticButton>
                </motion.div>

                {/* Trusted By - Hidden on mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="hidden sm:block"
                >
                  <p className="text-white/30 text-[10px] sm:text-xs font-medium tracking-wider uppercase mb-3 sm:mb-4">
                    Trusted By
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 sm:gap-x-5 lg:gap-x-8 gap-y-1.5 sm:gap-y-2">
                    {["Controlla", "Foodzapp", "Coachie", "PerfectStay", "Aunest"].map((company, i) => (
                      <motion.span
                        key={company}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        whileHover={{ scale: 1.05, color: "rgba(255,255,255,0.8)" }}
                        className="text-white/40 text-xs sm:text-sm lg:text-base font-semibold tracking-tight transition-colors cursor-default"
                      >
                        {company}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Phone Showcase - THIRD on mobile (order-2), Right side on desktop */}
              <div className="order-2 lg:order-2 flex items-center justify-center lg:justify-end flex-shrink-0 mt-6 sm:mt-0">
                <PremiumPhoneShowcase />
              </div>

              {/* Mobile-only CTA Buttons - FOURTH on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex sm:hidden flex-col gap-3 w-full order-3 mt-6"
              >
                <MagneticButton href="/portfolio" variant="primary">
                  View My Work
                </MagneticButton>
                <MagneticButton href="/contact" variant="secondary">
                  Get in Touch
                </MagneticButton>
              </motion.div>

              {/* Mobile-only Trusted By - FIFTH on mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex sm:hidden flex-col items-center w-full order-4 mt-8 mb-4"
              >
                <p className="text-white/30 text-[10px] font-medium tracking-wider uppercase mb-3">
                  Trusted By
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5">
                  {["Controlla", "Foodzapp", "Coachie", "PerfectStay", "Aunest"].map((company, i) => (
                    <motion.span
                      key={company}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + i * 0.1 }}
                      className="text-white/40 text-xs font-semibold tracking-tight"
                    >
                      {company}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Homepage;