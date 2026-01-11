"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";

// =============================================================================
// ⚡️ PERFORMANCE UTILITIES
// =============================================================================

// Cached mobile detection - prevents layout thrashing
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    
    let rafId;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(checkMobile);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);
  
  return isMobile;
};

// GPU-accelerated transition config
const gpuTransition = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94],
};

// Optimized spring configs - reduced stiffness for mobile
const smoothSpring = { damping: 25, stiffness: 150, mass: 0.8 };
const gentleSpring = { damping: 30, stiffness: 100, mass: 0.5 };

// =============================================================================
// ⚡️ OPTIMIZED COSMIC GATEWAY BACKGROUND
// Mobile: Reduced particles, no mouse tracking, simplified gradients
// =============================================================================
const CosmicGatewayBackground = memo(({ isMobile }) => {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const smoothMouseX = useSpring(mouseX, gentleSpring);
  const smoothMouseY = useSpring(mouseY, gentleSpring);

  // ⚡️ RAF-throttled mouse handler - DISABLED on mobile
  const rafRef = useRef(null);
  const handleMouseMove = useCallback((e) => {
    if (isMobile || rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }
      rafRef.current = null;
    });
  }, [mouseX, mouseY, isMobile]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ⚡️ Pre-computed particles - REDUCED count on mobile
  const particles = useMemo(() => {
    const count = isMobile ? 25 : 60;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (i * 17.3 + 5) % 100,
      y: (i * 23.7 + 10) % 100,
      size: (i % 3) * 0.5 + 0.8,
      duration: isMobile ? 5 + (i % 4) * 2 : 3 + (i % 5) * 1.5,
      delay: (i % 6) * 0.8,
      opacity: 0.2 + (i % 4) * 0.1,
    }));
  }, [isMobile]);

  // Pre-computed mouse glow transforms - only used on desktop
  const glowLeft = useTransform(smoothMouseX, [0, 1], ['0%', '100%']);
  const glowTop = useTransform(smoothMouseY, [0, 1], ['0%', '100%']);

  return (
    <div 
      ref={containerRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      className="fixed overflow-hidden"
      style={{ 
        top: '-60px',
        left: 0,
        right: 0,
        bottom: '-60px',
        height: 'calc(100vh + 120px)',
        zIndex: 0,
        contain: 'strict',
        // Disable pointer events on mobile for better scroll performance
        pointerEvents: isMobile ? 'none' : 'auto',
      }}
    >
      {/* Deep Space Base - Single paint layer */}
      <div className="absolute inset-0 bg-[#020208]" />
      
      {/* Radial Gradients - Static, combined into single layer */}
      <div 
        className="absolute inset-0"
        style={{
          background: isMobile
            ? `radial-gradient(ellipse 100% 70% at 50% 0%, rgba(15, 23, 42, 0.7) 0%, transparent 50%)`
            : `
              radial-gradient(ellipse 120% 80% at 50% 0%, rgba(15, 23, 42, 0.8) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 20% 100%, rgba(14, 116, 144, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 80% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
            `
        }}
      />

      {/* Central Energy Source - Simplified on mobile */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ contain: 'layout style paint' }}
      >
        {isMobile ? (
          // ⚡️ MOBILE: Static glow, no animation
          <div
            className="w-[400px] h-[400px]"
            style={{
              background: `
                radial-gradient(circle at center,
                  rgba(56, 189, 248, 0.06) 0%,
                  rgba(59, 130, 246, 0.03) 40%,
                  transparent 70%
                )
              `,
              filter: 'blur(40px)',
            }}
          />
        ) : (
          // DESKTOP: Animated glow
          <motion.div
            className="w-[700px] h-[700px]"
            style={{
              background: `
                radial-gradient(circle at center,
                  rgba(56, 189, 248, 0.07) 0%,
                  rgba(59, 130, 246, 0.035) 30%,
                  rgba(139, 92, 246, 0.015) 50%,
                  transparent 70%
                )
              `,
              filter: 'blur(60px)',
              willChange: 'transform, opacity',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.75, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>

      {/* Flowing Aurora - Simplified on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute w-[200%] h-[400px] top-1/3 -left-1/2"
          style={{
            background: `
              linear-gradient(
                90deg,
                transparent 0%,
                rgba(6, 182, 212, 0.02) 20%,
                rgba(59, 130, 246, 0.035) 40%,
                rgba(139, 92, 246, 0.025) 60%,
                rgba(6, 182, 212, 0.02) 80%,
                transparent 100%
              )
            `,
            filter: 'blur(50px)',
            transform: 'rotate(-5deg)',
            willChange: 'transform, opacity',
          }}
          animate={{
            x: ['-8%', '8%', '-8%'],
            opacity: [0.4, 0.65, 0.4],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Interactive Mouse Glow - DESKTOP ONLY */}
      {!isMobile && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: glowLeft,
            top: glowTop,
            x: '-50%',
            y: '-50%',
            width: '500px',
            height: '500px',
            background: `
              radial-gradient(
                circle at center,
                rgba(56, 189, 248, 0.05) 0%,
                rgba(139, 92, 246, 0.025) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(40px)',
            willChange: 'left, top',
          }}
        />
      )}

      {/* Star Field - GPU optimized, reduced on mobile */}
      <div className="absolute inset-0" style={{ contain: 'strict' }}>
        {particles.map((particle) => (
          isMobile ? (
            // ⚡️ MOBILE: CSS animation via opacity only, no scale
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                opacity: [particle.opacity * 0.5, particle.opacity, particle.opacity * 0.5],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          ) : (
            // DESKTOP: Full animation
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                willChange: 'transform, opacity',
              }}
              animate={{
                opacity: [particle.opacity * 0.4, particle.opacity, particle.opacity * 0.4],
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
            />
          )
        ))}
      </div>

      {/* Connection Lines Between Portals - DESKTOP ONLY */}
      {!isMobile && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ contain: 'strict' }}>
          <motion.line
            x1="30%"
            y1="50%"
            x2="70%"
            y2="50%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            strokeDasharray="8 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Noise Texture - Static, reduced opacity on mobile */}
      <div
        className="absolute inset-0"
        style={{
          opacity: isMobile ? 0.015 : 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette - Static */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 70% 60% at 50% 50%,
              transparent 0%,
              rgba(2, 2, 8, 0.4) 70%,
              rgba(2, 2, 8, 0.8) 100%
            )
          `
        }}
      />
    </div>
  );
});
CosmicGatewayBackground.displayName = 'CosmicGatewayBackground';

// =============================================================================
// ⚡️ OPTIMIZED CONTACT PORTAL CARD
// Mobile: Disabled 3D transforms, simplified hover states
// =============================================================================
const ContactPortal = memo(({ 
  type, 
  icon, 
  label, 
  value, 
  displayValue,
  href,
  gradient,
  glowColor,
  delay = 0,
  isMobile = false,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // ⚡️ 3D transforms - DISABLED on mobile (causes jank)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const smoothRotateX = useSpring(rotateX, smoothSpring);
  const smoothRotateY = useSpring(rotateY, smoothSpring);

  // ⚡️ RAF-throttled mouse handler - DESKTOP ONLY
  const rafRef = useRef(null);
  const handleMouseMove = useCallback((e) => {
    if (isMobile || rafRef.current || !cardRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);
      rotateY.set(percentX * 8); // Reduced from 10
      rotateX.set(-percentY * 8);
      rafRef.current = null;
    });
  }, [rotateX, rotateY, isMobile]);

  const handleMouseEnter = useCallback(() => !isMobile && setIsHovered(true), [isMobile]);
  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY, isMobile]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ⚡️ Pre-computed styles
  const cardStyle = useMemo(() => ({
    rotateX: isMobile ? 0 : smoothRotateX,
    rotateY: isMobile ? 0 : smoothRotateY,
    transformStyle: isMobile ? 'flat' : 'preserve-3d',
    willChange: isMobile ? 'auto' : 'transform',
  }), [isMobile, smoothRotateX, smoothRotateY]);

  return (
    <motion.a
      ref={cardRef}
      href={href}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.4 : 0.6, delay, ...gpuTransition }}
      style={cardStyle}
      className="relative block w-full max-w-sm group cursor-pointer"
    >
      {/* Outer Glow - Simplified on mobile (no blur animation) */}
      {isMobile ? (
        <div
          className="absolute -inset-4 rounded-[2rem]"
          style={{ 
            background: `radial-gradient(ellipse at center, ${glowColor}30 0%, transparent 70%)`,
          }}
        />
      ) : (
        <motion.div
          className="absolute -inset-6 rounded-[2.5rem]"
          style={{ 
            backgroundColor: glowColor,
            filter: 'blur(24px)',
            willChange: 'opacity, transform',
          }}
          initial={{ opacity: 0.1 }}
          animate={{
            opacity: isHovered ? 0.3 : 0.1,
            scale: isHovered ? 1.03 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}

      {/* Floating Animation Wrapper - Simplified on mobile */}
      <motion.div
        animate={isMobile ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{ willChange: isMobile ? 'auto' : 'transform' }}
      >
        {/* Card Content */}
        <div 
          className="relative overflow-hidden rounded-3xl"
          style={{ contain: 'layout style paint' }}
        >
          {/* Glass Background - Reduced blur on mobile */}
          <div 
            className="absolute inset-0 bg-white/[0.03]"
            style={{ 
              backdropFilter: isMobile ? 'blur(12px)' : 'blur(20px)',
              WebkitBackdropFilter: isMobile ? 'blur(12px)' : 'blur(20px)',
            }}
          />
          
          {/* Border Glow - Static on mobile */}
          <div 
            className="absolute inset-0 rounded-3xl p-[1px]"
            style={{
              background: `linear-gradient(135deg, ${glowColor}50, transparent 40%, transparent 60%, ${glowColor}30)`,
            }}
          />
          
          {/* Inner Border */}
          <div className="absolute inset-[1px] rounded-[1.4rem] border border-white/10" />

          {/* Shimmer Effect - DESKTOP ONLY */}
          {!isMobile && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -skew-x-12"
              initial={{ x: "-200%" }}
              animate={{ x: isHovered ? "200%" : "-200%" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              style={{ willChange: 'transform' }}
            />
          )}

          {/* Content */}
          <div className="relative px-6 py-8 sm:px-10 sm:py-12 flex flex-col items-center text-center">
            {/* Icon Container */}
            <motion.div
              className={`relative w-16 h-16 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-gradient-to-br ${gradient} 
                          flex items-center justify-center mb-5 sm:mb-6`}
              style={{
                boxShadow: `0 12px 28px -8px ${glowColor}50`,
                willChange: isMobile ? 'auto' : 'transform, box-shadow',
              }}
              animate={isMobile ? {} : {
                y: isHovered ? -6 : 0,
                scale: isHovered ? 1.06 : 1,
                boxShadow: isHovered 
                  ? `0 24px 40px -10px ${glowColor}65`
                  : `0 12px 28px -8px ${glowColor}50`,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {/* Subtle inner glow */}
              <div 
                className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-40"
                style={{ 
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)` 
                }}
              />
              
              {/* Icon */}
              <span className="relative z-10 text-white">
                {icon}
              </span>

              {/* Pulse Ring - Simplified on mobile */}
              <motion.div
                className="absolute inset-0 rounded-xl sm:rounded-2xl"
                style={{ 
                  border: `2px solid ${glowColor}`,
                  willChange: 'transform, opacity',
                }}
                animate={{
                  scale: [1, 1.2],
                  opacity: [0.3, 0],
                }}
                transition={{ 
                  duration: isMobile ? 3 : 2.5, 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.div>

            {/* Label */}
            <span 
              className="text-white/40 text-xs sm:text-sm font-medium uppercase tracking-[0.12em] sm:tracking-widest mb-2 sm:mb-3"
            >
              {label}
            </span>

            {/* Value */}
            <span className="text-white text-lg sm:text-2xl font-bold tracking-tight">
              {displayValue}
            </span>

            {/* CTA Hint */}
            <div
              className="mt-4 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/40"
            >
              <span>{type === 'email' ? 'Tap to send email' : 'Tap to call'}</span>
              <svg 
                className="w-3.5 h-3.5 sm:w-4 sm:h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          {/* Bottom Accent Line - Static on mobile */}
          {isMobile ? (
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-1/4 rounded-full"
              style={{ backgroundColor: glowColor, opacity: 0.4 }}
            />
          ) : (
            <motion.div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
              style={{ 
                backgroundColor: glowColor,
                willChange: 'width, opacity',
              }}
              initial={{ width: "20%", opacity: 0.3 }}
              animate={{
                width: isHovered ? "65%" : "20%",
                opacity: isHovered ? 0.75 : 0.3,
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
          )}
        </div>
      </motion.div>
    </motion.a>
  );
});
ContactPortal.displayName = 'ContactPortal';

// =============================================================================
// ⚡️ OPTIMIZED ANIMATED TITLE
// =============================================================================
const AnimatedTitle = memo(({ isMobile }) => {
  // ⚡️ Reduced delays on mobile for snappier feel
  const delays = isMobile 
    ? { container: 0.1, line1: 0.15, line2: 0.2, line3: 0.25, underline: 0.4 }
    : { container: 0.2, line1: 0.3, line2: 0.4, line3: 0.5, underline: 0.7 };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 15 : 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.4 : 0.6, delay: delays.container, ...gpuTransition }}
      className="text-center mb-4 sm:mb-6"
      style={{ willChange: 'transform, opacity' }}
    >
      <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] tracking-tight">
        <motion.span 
          className="block"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delays.line1, ...gpuTransition }}
        >
          Let's Build
        </motion.span>
        <motion.span 
          className="block mt-0.5 sm:mt-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delays.line2, ...gpuTransition }}
        >
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Something
            </span>
            <motion.svg
              className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: delays.underline }}
            >
              <motion.path
                d="M2 8 Q50 2 100 8 T198 8"
                stroke="url(#contact-underline-gradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: delays.underline }}
              />
              <defs>
                <linearGradient id="contact-underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </motion.svg>
          </span>
        </motion.span>
        <motion.span 
          className="block mt-0.5 sm:mt-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delays.line3, ...gpuTransition }}
        >
          Amazing
        </motion.span>
      </h1>
    </motion.div>
  );
});
AnimatedTitle.displayName = 'AnimatedTitle';

// =============================================================================
// ⚡️ OPTIMIZED URGENCY BANNER
// Mobile: No blur animations, simplified glow
// =============================================================================
const UrgencyBanner = memo(({ isMobile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isMobile ? 0.4 : 0.8, duration: 0.4, ...gpuTransition }}
      className="relative mb-10 sm:mb-16"
      style={{ contain: 'layout style' }}
    >
      {/* Glowing background - Static on mobile */}
      {isMobile ? (
        <div
          className="absolute inset-0 rounded-xl"
          style={{ 
            background: 'linear-gradient(90deg, rgba(6,182,212,0.15) 0%, rgba(139,92,246,0.15) 100%)',
          }}
        />
      ) : (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl"
          style={{ 
            filter: 'blur(16px)',
            willChange: 'opacity',
          }}
          animate={{ opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      
      <div 
        className="relative px-5 py-3.5 sm:px-8 sm:py-5 bg-white/[0.03] rounded-xl sm:rounded-2xl border border-white/10"
        style={{ 
          backdropFilter: isMobile ? 'blur(8px)' : 'blur(16px)',
          WebkitBackdropFilter: isMobile ? 'blur(8px)' : 'blur(16px)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          {/* Animated icon - Simplified on mobile */}
          <motion.div
            className="flex items-center gap-2"
            animate={isMobile ? {} : { scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-xl sm:text-2xl">⚡</span>
          </motion.div>
          
          {/* Text */}
          <div className="text-center sm:text-left">
            <p className="text-white/90 text-xs sm:text-base font-medium">
              <span className="text-cyan-400 font-semibold">Great apps don't build themselves.</span>
            </p>
            <p className="text-white/40 text-[10px] sm:text-sm mt-0.5">
              Let's start building yours today
            </p>
          </div>

          {/* Animated arrow - DESKTOP ONLY */}
          {!isMobile && (
            <motion.div
              className="hidden sm:flex items-center"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ willChange: 'transform' }}
            >
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
UrgencyBanner.displayName = 'UrgencyBanner';

// =============================================================================
// ⚡️ OPTIMIZED FLOATING DECORATIVE ELEMENTS
// Mobile: COMPLETELY DISABLED for performance
// =============================================================================
const FloatingElements = memo(({ isMobile }) => {
  // ⚡️ Skip rendering entirely on mobile
  if (isMobile) return null;

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ contain: 'strict' }}
    >
      {/* Top Left Orb */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
        animate={{ x: [0, 25, 0], y: [0, 15, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom Right Orb */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          willChange: 'transform',
        }}
        animate={{ x: [0, -30, 0], y: [0, -20, 0], scale: [1.08, 1, 1.08] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating Rings */}
      <motion.div
        className="absolute top-1/4 right-10 w-32 h-32 rounded-full border border-cyan-500/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ willChange: 'transform' }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-10 w-24 h-24 rounded-full border border-purple-500/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ willChange: 'transform' }}
      />

      {/* Diagonal Lines */}
      <motion.div
        className="absolute top-1/3 -left-10 w-60 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        style={{ transform: 'rotate(-30deg)', willChange: 'opacity, transform' }}
        animate={{ opacity: [0.2, 0.45, 0.2], x: [-15, 15, -15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 -right-10 w-60 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
        style={{ transform: 'rotate(30deg)', willChange: 'opacity, transform' }}
        animate={{ opacity: [0.2, 0.35, 0.2], x: [15, -15, 15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
});
FloatingElements.displayName = 'FloatingElements';

// =============================================================================
// ⚡️ DIVIDER COMPONENTS - Memoized
// =============================================================================
const DesktopDivider = memo(() => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.3 }}
    className="hidden lg:flex flex-col items-center gap-3"
  >
    <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
    <span className="text-white/20 text-sm font-medium">OR</span>
    <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
  </motion.div>
));
DesktopDivider.displayName = 'DesktopDivider';

const MobileDivider = memo(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.9 }}
    className="flex lg:hidden items-center gap-4 w-full max-w-xs"
  >
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    <span className="text-white/20 text-xs font-medium">OR</span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </motion.div>
));
MobileDivider.displayName = 'MobileDivider';

// =============================================================================
// ⚡️ RESPONSE PROMISE - Simplified
// =============================================================================
const ResponsePromise = memo(({ isMobile }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: isMobile ? 1.1 : 1.5 }}
    className="mt-10 sm:mt-14 flex items-center gap-2 text-white/30 text-xs sm:text-sm"
  >
    <motion.div
      animate={isMobile ? {} : { scale: [1, 1.15, 1] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ willChange: isMobile ? 'auto' : 'transform' }}
    >
      <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </motion.div>
    <span>Lightning-fast response • Usually within a few hours</span>
  </motion.div>
));
ResponsePromise.displayName = 'ResponsePromise';

// =============================================================================
// ⚡️ ICON COMPONENTS - Memoized with size variants
// =============================================================================
const EmailIcon = memo(({ isMobile }) => (
  <svg 
    className={isMobile ? "w-7 h-7" : "w-10 h-10 sm:w-12 sm:h-12"} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
));
EmailIcon.displayName = 'EmailIcon';

const PhoneIcon = memo(({ isMobile }) => (
  <svg 
    className={isMobile ? "w-7 h-7" : "w-10 h-10 sm:w-12 sm:h-12"} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
));
PhoneIcon.displayName = 'PhoneIcon';

// =============================================================================
// ⚡️ MAIN CONTACT PAGE - OPTIMIZED
// =============================================================================
const ContactPage = () => {
  const isMobile = useIsMobile();

  // Auto-scroll to hide navbar - DISABLED on mobile for better UX
  useEffect(() => {
    if (isMobile) return;
    
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 150,
        behavior: 'smooth'
      });
    }, 850);

    return () => clearTimeout(timer);
  }, [isMobile]);

  // ⚡️ Pre-compute delays based on device
  const portalDelays = useMemo(() => ({
    email: isMobile ? 0.5 : 1.0,
    phone: isMobile ? 0.65 : 1.15,
  }), [isMobile]);

  return (
    <div className="relative">
      {/* Spacer for scroll-through behavior */}
      <div className="h-6 sm:h-24" />
      
      <motion.div
        className="min-h-screen relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: isMobile ? 0.3 : 0.5 }}
      >
        {/* Background - with mobile optimization flag */}
        <CosmicGatewayBackground isMobile={isMobile} />
        
        {/* Floating Decorations - disabled on mobile */}
        <FloatingElements isMobile={isMobile} />

        {/* Content */}
        <div 
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-12 sm:py-20"
          style={{ contain: 'layout style' }}
        >
          {/* Title */}
          <AnimatedTitle isMobile={isMobile} />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isMobile ? 0.3 : 0.65, ...gpuTransition }}
            className="text-white/40 text-base sm:text-xl text-center max-w-md mb-6 sm:mb-8 leading-relaxed px-4"
            style={{ willChange: 'transform, opacity' }}
          >
            Ready to transform your vision into reality? Let's make it happen.
          </motion.p>

          {/* Urgency Banner */}
          <UrgencyBanner isMobile={isMobile} />

          {/* Contact Portals */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full max-w-4xl">
            {/* Email Portal */}
            <ContactPortal
              type="email"
              label="Email"
              value="kssimejiya@gmail.com"
              displayValue="kssimejiya@gmail.com"
              href="mailto:kssimejiya@gmail.com?subject=Project%20Inquiry&body=Hi%20Keyun,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0A"
              gradient="from-cyan-500 to-blue-600"
              glowColor="rgba(6, 182, 212, 0.5)"
              delay={portalDelays.email}
              isMobile={isMobile}
              icon={<EmailIcon isMobile={isMobile} />}
            />

            {/* Dividers */}
            <DesktopDivider />
            <MobileDivider />

            {/* Phone Portal */}
            <ContactPortal
              type="phone"
              label="Phone"
              value="+919033804605"
              displayValue="+91 903 380 4605"
              href="tel:+919033804605"
              gradient="from-purple-500 to-pink-600"
              glowColor="rgba(139, 92, 246, 0.5)"
              delay={portalDelays.phone}
              isMobile={isMobile}
              icon={<PhoneIcon isMobile={isMobile} />}
            />
          </div>

          {/* Quick Response Promise */}
          <ResponsePromise isMobile={isMobile} />
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;