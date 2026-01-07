"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

// =============================================================================
// COSMIC GATEWAY BACKGROUND
// =============================================================================
const CosmicGatewayBackground = () => {
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
    for (let i = 0; i < 80; i++) {
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
      
      {/* Radial Gradients */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 0%, rgba(15, 23, 42, 0.8) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 20% 100%, rgba(14, 116, 144, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 80% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)
          `
        }}
      />

      {/* Central Energy Source */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-[800px] h-[800px]"
          style={{
            background: `
              radial-gradient(circle at center,
                rgba(56, 189, 248, 0.08) 0%,
                rgba(59, 130, 246, 0.04) 30%,
                rgba(139, 92, 246, 0.02) 50%,
                transparent 70%
              )
            `,
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Flowing Aurora */}
      <motion.div
        className="absolute w-[200%] h-[500px] top-1/3 -left-1/2"
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(6, 182, 212, 0.02) 20%,
              rgba(59, 130, 246, 0.04) 40%,
              rgba(139, 92, 246, 0.03) 60%,
              rgba(6, 182, 212, 0.02) 80%,
              transparent 100%
            )
          `,
          filter: 'blur(60px)',
          transform: 'rotate(-5deg)',
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 20,
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
          width: '600px',
          height: '600px',
          background: `
            radial-gradient(
              circle at center,
              rgba(56, 189, 248, 0.06) 0%,
              rgba(139, 92, 246, 0.03) 40%,
              transparent 70%
            )
          `,
          filter: 'blur(50px)',
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
              scale: [1, 1.3, 1],
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

      {/* Connection Lines Between Portals */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
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

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette */}
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
};

// =============================================================================
// CONTACT PORTAL CARD - The Hero Component
// =============================================================================
const ContactPortal = ({ 
  type, 
  icon, 
  label, 
  value, 
  displayValue,
  href,
  gradient,
  glowColor,
  delay = 0 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);
    rotateY.set(percentX * 12);
    rotateX.set(-percentY * 12);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.a
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative block w-full max-w-sm group cursor-pointer"
    >
      {/* Outer Glow */}
      <motion.div
        className="absolute -inset-6 rounded-[2.5rem] blur-3xl"
        style={{ backgroundColor: glowColor }}
        initial={{ opacity: 0.1 }}
        animate={{
          opacity: isHovered ? 0.35 : 0.12,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Floating Animation Wrapper */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Card Content */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* Glass Background */}
          <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl" />
          
          {/* Animated Border Glow */}
          <motion.div 
            className="absolute inset-0 rounded-3xl p-[1px]"
            style={{
              background: `linear-gradient(135deg, ${glowColor}50, transparent 40%, transparent 60%, ${glowColor}30)`,
            }}
            animate={{
              background: isHovered 
                ? `linear-gradient(135deg, ${glowColor}70, transparent 40%, transparent 60%, ${glowColor}50)`
                : `linear-gradient(135deg, ${glowColor}50, transparent 40%, transparent 60%, ${glowColor}30)`,
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Inner Border */}
          <div className="absolute inset-[1px] rounded-[1.4rem] border border-white/10" />

          {/* Shimmer Effect - Only on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -skew-x-12"
            initial={{ x: "-200%" }}
            animate={{ x: isHovered ? "200%" : "-200%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Content */}
          <div className="relative px-8 py-10 sm:px-10 sm:py-12 flex flex-col items-center text-center">
            {/* Icon Container */}
            <motion.div
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${gradient} 
                          flex items-center justify-center mb-6`}
              style={{
                boxShadow: `0 20px 40px -12px ${glowColor}50`,
              }}
              animate={{
                y: isHovered ? -8 : 0,
                scale: isHovered ? 1.08 : 1,
                boxShadow: isHovered 
                  ? `0 30px 50px -12px ${glowColor}70`
                  : `0 20px 40px -12px ${glowColor}50`,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Subtle inner glow */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-50"
                style={{ 
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)` 
                }}
              />
              
              {/* Icon */}
              <motion.span 
                className="relative z-10 text-white"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {icon}
              </motion.span>

              {/* Pulse Ring - Subtle */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: `2px solid ${glowColor}` }}
                animate={{
                  scale: [1, 1.25],
                  opacity: [0.4, 0],
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </motion.div>

            {/* Label */}
            <motion.span 
              className="text-white/40 text-sm font-medium uppercase tracking-widest mb-3"
              animate={{ 
                opacity: isHovered ? 0.7 : 0.4,
                letterSpacing: isHovered ? "0.2em" : "0.1em"
              }}
              transition={{ duration: 0.3 }}
            >
              {label}
            </motion.span>

            {/* Value */}
            <motion.span 
              className="text-white text-xl sm:text-2xl font-bold tracking-tight"
              animate={{ 
                scale: isHovered ? 1.03 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {displayValue}
            </motion.span>

            {/* CTA Hint */}
            <motion.div
              className="mt-6 flex items-center gap-2 text-sm font-medium"
              initial={{ opacity: 0.4 }}
              animate={{ 
                opacity: isHovered ? 0.9 : 0.4,
                y: isHovered ? 0 : 4,
                color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'
              }}
              transition={{ duration: 0.3 }}
            >
              <span>{type === 'email' ? 'Click to send email' : 'Click to call'}</span>
              <motion.svg 
                className="w-4 h-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.div>
          </div>

          {/* Bottom Accent Line */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
            style={{ backgroundColor: glowColor }}
            initial={{ width: "20%", opacity: 0.3 }}
            animate={{
              width: isHovered ? "70%" : "20%",
              opacity: isHovered ? 0.8 : 0.3,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.a>
  );
};

// =============================================================================
// ANIMATED TITLE - Homepage Style
// =============================================================================
const AnimatedTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="text-center mb-6"
    >
      <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight">
        <motion.span 
          className="block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Let's Build
        </motion.span>
        <motion.span 
          className="block mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Something
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
                stroke="url(#contact-underline-gradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
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
          className="block mt-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Amazing
        </motion.span>
      </h1>
    </motion.div>
  );
};

// =============================================================================
// URGENCY BANNER
// =============================================================================
const UrgencyBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="relative mb-16"
    >
      {/* Glowing background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <div className="relative px-6 py-4 sm:px-8 sm:py-5 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {/* Animated icon */}
          <motion.div
            className="flex items-center gap-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.span
              className="text-2xl"
              animate={{ 
                opacity: [1, 0.7, 1],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⚡
            </motion.span>
          </motion.div>
          
          {/* Text */}
          <div className="text-center sm:text-left">
            <p className="text-white/90 text-sm sm:text-base font-medium">
              <span className="text-cyan-400 font-semibold">Great apps don't build themselves.</span>
            </p>
            <p className="text-white/40 text-xs sm:text-sm mt-0.5">
              Let's start building yours today
            </p>
          </div>

          {/* Animated arrow */}
          <motion.div
            className="hidden sm:flex items-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// =============================================================================
// FLOATING DECORATIVE ELEMENTS
// =============================================================================
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top Left Orb */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Bottom Right Orb */}
      <motion.div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating Rings */}
      <motion.div
        className="absolute top-1/4 right-10 w-32 h-32 rounded-full border border-cyan-500/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-1/4 left-10 w-24 h-24 rounded-full border border-purple-500/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Diagonal Lines */}
      <motion.div
        className="absolute top-1/3 -left-10 w-60 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        style={{ transform: 'rotate(-30deg)' }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          x: [-20, 20, -20],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-1/3 -right-10 w-60 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
        style={{ transform: 'rotate(30deg)' }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          x: [20, -20, 20],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
};

// =============================================================================
// MAIN CONTACT PAGE
// =============================================================================
const ContactPage = () => {
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
        className="min-h-screen relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      {/* Background */}
      <CosmicGatewayBackground />
      
      {/* Floating Decorations */}
      <FloatingElements />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 py-20">
        {/* Title - Homepage Style */}
        <AnimatedTitle />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="text-white/40 text-lg sm:text-xl text-center max-w-md mb-8 leading-relaxed"
        >
          Ready to transform your vision into reality? Let's make it happen.
        </motion.p>

        {/* Urgency Banner */}
        <UrgencyBanner />

        {/* Contact Portals */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 w-full max-w-4xl">
          {/* Email Portal */}
          <ContactPortal
            type="email"
            label="Email"
            value="kssimejiya@gmail.com"
            displayValue="kssimejiya@gmail.com"
            href="mailto:kssimejiya@gmail.com?subject=Project%20Inquiry&body=Hi%20Keyun,%0A%0AI%20would%20like%20to%20discuss%20a%20project%20with%20you.%0A%0A"
            gradient="from-cyan-500 to-blue-600"
            glowColor="rgba(6, 182, 212, 0.5)"
            delay={1.1}
            icon={
              <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            }
          />

          {/* Divider - Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 }}
            className="hidden lg:flex flex-col items-center gap-3"
          >
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <span className="text-white/20 text-sm font-medium">OR</span>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </motion.div>

          {/* Divider - Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex lg:hidden items-center gap-4 w-full max-w-xs"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-white/20 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </motion.div>

          {/* Phone Portal */}
          <ContactPortal
            type="phone"
            label="Phone"
            value="+919033804605"
            displayValue="+91 903 380 4605"
            href="tel:+919033804605"
            gradient="from-purple-500 to-pink-600"
            glowColor="rgba(139, 92, 246, 0.5)"
            delay={1.25}
            icon={
              <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            }
          />
        </div>

        {/* Quick Response Promise */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="mt-14 flex items-center gap-2 text-white/30 text-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>
          <span>Lightning-fast response • Usually within a few hours</span>
        </motion.div>
      </div>
    </motion.div>
    </div>
  );
};

export default ContactPage;