"use client";
import { motion, useInView, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useMemo, useState, useEffect, memo, useCallback } from "react";

// =============================================================================
// PERFORMANCE UTILITIES
// =============================================================================

// Cached mobile detection - prevents re-renders
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

// GPU-accelerated motion config
const gpuTransition = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94],
};

// Optimized spring for smooth animations
const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

// =============================================================================
// DATA
// =============================================================================
const skills = [
  { name: "JavaScript", color: "from-yellow-400 to-orange-500" },
  { name: "TypeScript", color: "from-blue-400 to-blue-600" },
  { name: "React Native", color: "from-cyan-400 to-blue-500" },
  { name: "React.js", color: "from-cyan-400 to-cyan-600" },
  { name: "Next.js", color: "from-gray-400 to-gray-600" },
  { name: "Tailwind CSS", color: "from-teal-400 to-cyan-500" },
  { name: "GraphQL", color: "from-pink-400 to-pink-600" },
  { name: "Apollo", color: "from-indigo-400 to-purple-500" },
  { name: "Redux", color: "from-purple-400 to-purple-600" },
  { name: "Framer Motion", color: "from-pink-500 to-rose-500" },
  { name: "Vite", color: "from-yellow-400 to-purple-500" },
  { name: "Firebase", color: "from-amber-400 to-orange-500" },
  { name: "Git", color: "from-orange-400 to-red-500" },
  { name: "Figma", color: "from-pink-400 to-purple-500" },
];

const expertiseItems = [
  {
    id: 1,
    title: "Google Maps Integration",
    description: "Real-time location tracking, custom markers, geofencing, route optimization, and place autocomplete for seamless navigation experiences.",
    icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: 2,
    title: "Payment Gateway Integration",
    description: "Razorpay, Cashfree, Stripe implementations with secure transaction handling, subscription management, and multi-currency support.",
    icon: "M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    id: 3,
    title: "Firebase & Backend Services",
    description: "Authentication, Firestore, Cloud Functions, Push Notifications, Analytics, Crashlytics, and real-time database synchronization.",
    icon: "M3.89 15.673L6.255.461A.542.542 0 017.27.289l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0l7.924-4.427zM14.3 7.148l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984 14.3 7.148z",
    gradient: "from-amber-500 to-orange-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: 4,
    title: "AI-Powered Applications",
    description: "OpenAI GPT integration, image recognition, voice assistants, personalized recommendations, and intelligent chatbot implementations.",
    icon: "M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z",
    gradient: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: 5,
    title: "E-Commerce Solutions",
    description: "WooCommerce/WordPress API, cart management, inventory sync, order tracking, multi-vendor systems, and seamless checkout flows.",
    icon: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0",
    gradient: "from-rose-500 to-pink-600",
    glowColor: "rgba(244, 63, 94, 0.4)",
  },
  {
    id: 6,
    title: "Smallcase & Fintech",
    description: "Smallcase SDK integration, mutual funds, stock portfolios, SIP management, KYC flows, fund details via Pulse Lab, and investment tracking dashboards.",
    icon: "M3 3v18h18M9 17V9m4 8v-5m4 5V6",
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: 7,
    title: "Augmont Digital Gold",
    description: "Digital gold buy/sell integration, real-time price feeds, gold savings plans, secure vault storage, and seamless redemption flows.",
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    gradient: "from-yellow-400 to-amber-500",
    glowColor: "rgba(251, 191, 36, 0.4)",
  },
  {
    id: 8,
    title: "Real-time Features",
    description: "WebSocket implementations, live chat, real-time notifications, collaborative editing, and instant data synchronization.",
    icon: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    gradient: "from-indigo-500 to-violet-600",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
];

// =============================================================================
// CONSTELLATION DATA
// =============================================================================
const constellationPatterns = [
  {
    name: 'Ashwini',
    meaning: 'The Horse Riders',
    stars: [[15, 25], [22, 20], [30, 18], [38, 22], [28, 30], [20, 35], [32, 38]],
    lines: [[0,1], [1,2], [2,3], [1,4], [4,5], [4,6]],
    primaryStars: [0, 2, 3],
    accentColor: 'gold',
  },
  {
    name: 'Bharani',
    meaning: 'The Bearer',
    stars: [[60, 15], [75, 20], [68, 35], [55, 30], [72, 28], [65, 22]],
    lines: [[0,1], [1,2], [2,3], [3,0], [4,5], [5,0]],
    primaryStars: [0, 1, 2],
    accentColor: 'rose',
  },
  {
    name: 'Krittika',
    meaning: 'The Cutter',
    stars: [[12, 55], [18, 50], [25, 52], [22, 60], [15, 62], [20, 56], [28, 58]],
    lines: [[0,1], [1,2], [1,5], [5,3], [3,4], [4,0], [2,6]],
    primaryStars: [1, 5, 6],
    accentColor: 'amber',
  },
  {
    name: 'Rohini',
    meaning: 'The Red One',
    stars: [[55, 50], [65, 45], [75, 48], [78, 58], [70, 65], [58, 62], [62, 55]],
    lines: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,0], [6,1], [6,4]],
    primaryStars: [0, 3, 4],
    accentColor: 'rose',
  },
];

const accentColors = {
  gold: { primary: 'rgba(255, 215, 100, 0.95)', glow: 'rgba(255, 200, 50, 0.6)', line: 'rgba(255, 215, 100, 0.25)' },
  rose: { primary: 'rgba(255, 180, 200, 0.95)', glow: 'rgba(255, 150, 180, 0.6)', line: 'rgba(255, 180, 200, 0.25)' },
  amber: { primary: 'rgba(255, 191, 128, 0.95)', glow: 'rgba(255, 170, 100, 0.6)', line: 'rgba(255, 191, 128, 0.25)' },
  cyan: { primary: 'rgba(100, 220, 255, 0.95)', glow: 'rgba(56, 189, 248, 0.6)', line: 'rgba(100, 200, 255, 0.25)' },
};

// =============================================================================
// ⚡️ OPTIMIZED STAR COMPONENT - GPU Accelerated
// =============================================================================
const Star = memo(({ x, y, isPrimary, index, isActive, accentColor }) => {
  const colors = accentColors[accentColor] || accentColors.cyan;
  const baseSize = isPrimary ? 6 : 3 + (index % 3);
  const glowSize = isPrimary ? 40 : 25;
  
  // Pre-computed animation values
  const animationDelay = index * 0.1;
  const pulseDuration = 5 + (index % 4) * 1.5;

  return (
    <motion.div
      className="absolute"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        // ⚡️ GPU acceleration
        willChange: 'transform, opacity',
        transform: 'translate3d(0,0,0)',
        contain: 'layout style paint',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.8, delay: animationDelay, ...gpuTransition }}
    >
      {/* Outer glow - using box-shadow instead of blur filter */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: glowSize,
          height: glowSize,
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
        }}
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ 
          duration: pulseDuration, 
          repeat: Infinity, 
          ease: "easeInOut",
          // ⚡️ Use GPU-friendly properties only
        }}
      />
      
      {/* Star core */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: baseSize,
          height: baseSize,
          background: colors.primary,
          boxShadow: `0 0 ${baseSize * 2}px ${colors.glow}`,
        }}
        animate={{ 
          scale: [1, 1.15, 1], 
          opacity: [0.85, 1, 0.85] 
        }}
        transition={{ 
          duration: 4 + (index % 3) * 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: animationDelay,
        }}
      />
      
      {/* Lens flare for primary stars - simplified */}
      {isPrimary && (
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 40,
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
          }}
          animate={{ 
            scaleX: [0.6, 1, 0.6], 
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
});
Star.displayName = 'Star';

// =============================================================================
// ⚡️ OPTIMIZED CONSTELLATION SYSTEM
// =============================================================================
const ConstellationLayer = memo(({ constellation, isActive, cIndex }) => {
  const colors = accentColors[constellation.accentColor] || accentColors.cyan;
  
  return (
    <motion.div
      className="absolute inset-0"
      style={{
        contain: 'layout style paint',
        willChange: 'opacity',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* SVG Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ contain: 'strict' }}>
        {constellation.lines.map(([from, to], lIndex) => (
          <motion.line
            key={`line-${cIndex}-${lIndex}`}
            x1={`${constellation.stars[from][0]}%`}
            y1={`${constellation.stars[from][1]}%`}
            x2={`${constellation.stars[to][0]}%`}
            y2={`${constellation.stars[to][1]}%`}
            stroke={colors.line}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isActive ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 1.5, delay: lIndex * 0.15, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Stars */}
      {constellation.stars.map(([x, y], sIndex) => (
        <Star
          key={`star-${cIndex}-${sIndex}`}
          x={x}
          y={y}
          isPrimary={constellation.primaryStars.includes(sIndex)}
          index={sIndex}
          isActive={isActive}
          accentColor={constellation.accentColor}
        />
      ))}
    </motion.div>
  );
});
ConstellationLayer.displayName = 'ConstellationLayer';

const NakshatraConstellations = memo(({ scrollYProgress }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // ⚡️ Throttled scroll handler using RAF
    let ticking = false;
    let lastIndex = 0;
    
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const newIndex = Math.min(Math.floor(value * constellationPatterns.length), constellationPatterns.length - 1);
      
      if (newIndex !== lastIndex && !ticking) {
        ticking = true;
        lastIndex = newIndex;
        
        requestAnimationFrame(() => {
          setActiveIndex(newIndex);
          ticking = false;
        });
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      style={{ contain: 'layout style paint' }}
    >
      {/* Constellation name */}
      <motion.div
        key={activeIndex}
        className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-right z-10 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] text-white/20 font-light">
          {constellationPatterns[activeIndex].meaning}
        </p>
        <p className="text-[10px] sm:text-xs text-white/30 font-light mt-1" style={{ fontFamily: 'serif' }}>
          {constellationPatterns[activeIndex].name}
        </p>
      </motion.div>

      {constellationPatterns.map((constellation, cIndex) => (
        <ConstellationLayer
          key={constellation.name}
          constellation={constellation}
          isActive={cIndex === activeIndex}
          cIndex={cIndex}
        />
      ))}
    </div>
  );
});
NakshatraConstellations.displayName = 'NakshatraConstellations';

// =============================================================================
// ⚡️ OPTIMIZED COSMIC DUST - Batched animations
// =============================================================================
const CosmicDust = memo(() => {
  const particles = useMemo(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: (i * 23.7 + 11) % 100,
      y: (i * 17.3 + 8) % 100,
      size: 1 + (i % 3) * 0.5,
      duration: 15 + (i % 6) * 4,
      delay: (i % 8) * 1.5,
      drift: (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 2),
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ contain: 'strict' }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            willChange: 'transform, opacity',
          }}
          animate={{ 
            y: [0, -25, 0], 
            x: [0, p.drift, 0], 
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      ))}
    </div>
  );
});
CosmicDust.displayName = 'CosmicDust';

// =============================================================================
// ⚡️ OPTIMIZED PREMIUM BACKGROUND
// =============================================================================
const PremiumBackground = memo(({ scrollYProgress }) => {
  // Pre-computed static data
  const distantStars = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: (i * 17.3 + 5) % 100,
      y: (i * 23.7 + 10) % 100,
      size: 1 + (i % 3) * 0.5,
      opacity: 0.25 + (i % 5) * 0.08,
    })), []);

  const twinkleStars = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 32.7 + 11) % 100,
      y: (i * 17.3 + 8) % 100,
      size: 2 + (i % 3),
      duration: 6 + (i % 5) * 2,
      color: i % 3 === 0 ? 'gold' : i % 3 === 1 ? 'cyan' : 'white',
    })), []);

  const nebulas = useMemo(() => [
    { left: '-10%', top: '5%', size: 450, color1: 'rgba(56,189,248,0.1)', color2: 'rgba(139,92,246,0.05)', dur: 20 },
    { left: '60%', top: '45%', size: 500, color1: 'rgba(139,92,246,0.08)', color2: 'rgba(236,72,153,0.04)', dur: 25 },
    { left: '20%', top: '70%', size: 420, color1: 'rgba(59,130,246,0.1)', color2: 'rgba(34,211,238,0.05)', dur: 22 },
  ], []);

  const colorMap = useMemo(() => ({
    gold: { core: 'rgba(255,220,150,1)', glow: 'rgba(255,180,50,0.4)' },
    cyan: { core: 'rgba(150,220,255,1)', glow: 'rgba(56,189,248,0.4)' },
    white: { core: 'rgba(255,255,255,1)', glow: 'rgba(200,220,255,0.4)' },
  }), []);

  return (
    <div 
      className="fixed overflow-hidden pointer-events-none"
      style={{ 
        top: '-60px',
        left: 0,
        right: 0,
        bottom: '-60px',
        height: 'calc(100vh + 120px)',
        zIndex: 0,
        contain: 'strict',
      }}
    >
      {/* Base gradient - single paint */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #000008 0%, #010112 15%, #020218 35%, 
            #030320 50%, #020218 65%, #010112 85%, #000008 100%
          )`
        }}
      />

      {/* Ambient glow */}
      <motion.div
        className="absolute -top-[30%] left-1/2 w-[150%] h-[60%]"
        style={{
          x: '-50%',
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.07) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
          willChange: 'transform, opacity',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.03, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Static distant stars - no animation, pure CSS */}
      <div className="absolute inset-0" style={{ contain: 'strict' }}>
        {distantStars.map((star) => (
          <div 
            key={`ds-${star.id}`} 
            className="absolute rounded-full bg-white" 
            style={{ 
              left: `${star.x}%`, 
              top: `${star.y}%`, 
              width: star.size, 
              height: star.size, 
              opacity: star.opacity,
            }} 
          />
        ))}
      </div>

      {/* Twinkling stars - GPU accelerated */}
      <div className="absolute inset-0" style={{ contain: 'strict' }}>
        {twinkleStars.map((star) => {
          const colors = colorMap[star.color];
          return (
            <motion.div
              key={`ts-${star.id}`}
              className="absolute rounded-full"
              style={{ 
                left: `${star.x}%`, 
                top: `${star.y}%`, 
                width: star.size, 
                height: star.size, 
                background: colors.core,
                boxShadow: `0 0 ${star.size * 3}px ${colors.glow}`,
                willChange: 'transform, opacity',
              }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
              transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </div>

      {/* Nebulas - simplified blur approach */}
      <div className="absolute inset-0" style={{ contain: 'strict' }}>
        {nebulas.map((n, i) => (
          <motion.div
            key={`neb-${i}`}
            className="absolute rounded-full"
            style={{ 
              left: n.left, 
              top: n.top, 
              width: n.size, 
              height: n.size, 
              background: `radial-gradient(ellipse at center, ${n.color1} 0%, ${n.color2} 50%, transparent 75%)`,
              filter: 'blur(60px)',
              willChange: 'transform, opacity',
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: n.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Light rays */}
      <div className="absolute inset-0 overflow-hidden opacity-35" style={{ contain: 'strict' }}>
        {[12, 40, 68].map((pos, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute top-0 origin-top"
            style={{ 
              left: `${pos}%`, 
              width: '2px', 
              height: '45vh', 
              background: i === 1 
                ? 'linear-gradient(to bottom, rgba(255,200,100,0.35) 0%, transparent 100%)'
                : 'linear-gradient(to bottom, rgba(56,189,248,0.35) 0%, transparent 100%)', 
              transform: `rotate(${(i - 1) * 12}deg)`,
              willChange: 'opacity',
            }}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 10 + i * 3, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Cosmic dust */}
      <CosmicDust />

      {/* Constellations */}
      <NakshatraConstellations scrollYProgress={scrollYProgress} />

      {/* Vignette - pure CSS */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'radial-gradient(ellipse 90% 75% at 50% 50%, transparent 0%, rgba(0,0,8,0.35) 60%, rgba(0,0,8,0.65) 100%)',
          pointerEvents: 'none',
        }} 
      />
    </div>
  );
});
PremiumBackground.displayName = 'PremiumBackground';

// =============================================================================
// ⚡️ OPTIMIZED UI COMPONENTS
// =============================================================================

const SectionTitle = memo(({ children, isInView }) => (
  <motion.div
    initial={{ opacity: 0, x: -25 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, ...gpuTransition }}
    className="relative"
    style={{ willChange: 'transform, opacity' }}
  >
    <h2 className="text-sm font-medium tracking-[0.3em] text-cyan-400/80 uppercase">
      {children}
    </h2>
    <motion.div
      className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"
      initial={{ width: 0 }}
      animate={isInView ? { width: 60 } : { width: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    />
  </motion.div>
));
SectionTitle.displayName = 'SectionTitle';

const SkillBadge = memo(({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04, duration: 0.4, ...gpuTransition }}
    viewport={{ once: true, margin: "-20px" }}
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className="group relative"
    style={{ willChange: 'transform' }}
  >
    <motion.div
      className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
      style={{ filter: 'blur(8px)' }}
    />
    <div className="relative px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-white/70 group-hover:text-white group-hover:bg-white/[0.1] group-hover:border-white/[0.15] transition-colors duration-200">
      {skill.name}
    </div>
  </motion.div>
));
SkillBadge.displayName = 'SkillBadge';

const ExpertiseCard = memo(({ item, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ...gpuTransition }}
      className="group relative"
      style={{ willChange: 'transform, opacity', contain: 'layout style' }}
    >
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ 
          background: `linear-gradient(135deg, ${item.glowColor} 0%, transparent 50%)`,
          filter: 'blur(15px)',
        }}
      />
      <div className="relative bg-white/[0.03] backdrop-blur-sm rounded-2xl p-6 border border-white/[0.06] group-hover:bg-white/[0.06] group-hover:border-white/[0.1] transition-all duration-300">
        <div className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
        <motion.div
          className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 shadow-lg`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d={item.icon} />
          </svg>
        </motion.div>
        <h3 className="font-semibold text-base text-white mb-2">{item.title}</h3>
        <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">{item.description}</p>
        <motion.div
          className={`absolute bottom-0 left-0 h-[2px] rounded-b-2xl bg-gradient-to-r ${item.gradient}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: "30%" } : { width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
});
ExpertiseCard.displayName = 'ExpertiseCard';

const ScrollIndicator = memo(() => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ delay: 0.8 }} 
    className="flex justify-center py-6"
  >
    <motion.div 
      animate={{ y: [0, 6, 0] }} 
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
      className="flex flex-col items-center gap-2"
      style={{ willChange: 'transform' }}
    >
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
      <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2">
        <motion.div 
          animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }} 
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} 
          className="w-1 h-1 rounded-full bg-cyan-400" 
        />
      </div>
    </motion.div>
  </motion.div>
));
ScrollIndicator.displayName = 'ScrollIndicator';

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

const ProfileSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0 }} 
      animate={isInView ? { opacity: 1 } : {}} 
      transition={{ duration: 0.6 }} 
      className="flex flex-col gap-8"
      style={{ contain: 'layout style' }}
    >
      {/* Profile Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.85 }} 
        animate={isInView ? { opacity: 1, scale: 1 } : {}} 
        transition={{ duration: 0.6, ...smoothSpring }} 
        className="relative w-fit"
      >
        <motion.div
          className="absolute -inset-3 rounded-full"
          style={{ 
            background: 'conic-gradient(from 0deg, rgba(56,189,248,0.25), rgba(139,92,246,0.25), rgba(236,72,153,0.25), rgba(56,189,248,0.25))',
            filter: 'blur(12px)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500">
          <div className="w-full h-full rounded-full overflow-hidden bg-black">
            <Image src="/profile.jpg" alt="Profile" width={128} height={128} className="w-full h-full object-cover" priority />
          </div>
        </div>
        <motion.div 
          className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-black" 
          animate={{ scale: [1, 1.15, 1] }} 
          transition={{ duration: 2, repeat: Infinity }} 
        />
      </motion.div>

      <SectionTitle isInView={isInView}>Biography</SectionTitle>

      <motion.p 
        initial={{ opacity: 0, y: 15 }} 
        animate={isInView ? { opacity: 1, y: 0 } : {}} 
        transition={{ delay: 0.25, duration: 0.5 }} 
        className="text-lg sm:text-xl text-white/60 leading-relaxed font-light"
      >
        Passionate Mobile app developer with <span className="text-white font-medium">10+ years</span> of experience crafting high-performance mobile applications. Specialized in building <span className="text-cyan-400/90">seamless cross-platform experiences</span> with complex integrations, from payment gateways to real-time features.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, x: -15 }} 
        animate={isInView ? { opacity: 1, x: 0 } : {}} 
        transition={{ delay: 0.35, duration: 0.5 }} 
        className="relative pl-5 py-2"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent rounded-full" />
        <p className="italic text-white/40 text-sm sm:text-base">"Building apps that users love, one line of code at a time."</p>
      </motion.div>
    </motion.div>
  );
});
ProfileSection.displayName = 'ProfileSection';

const SkillsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex flex-col gap-8" style={{ contain: 'layout style' }}>
      <SectionTitle isInView={isInView}>Skills</SectionTitle>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={isInView ? { opacity: 1 } : {}} 
        transition={{ delay: 0.15 }} 
        className="flex gap-3 flex-wrap"
      >
        {skills.map((skill, index) => (
          <SkillBadge key={skill.name} skill={skill} index={index} />
        ))}
      </motion.div>
    </div>
  );
});
SkillsSection.displayName = 'SkillsSection';

const ExpertiseSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="flex flex-col gap-8" style={{ contain: 'layout style' }}>
      <SectionTitle isInView={isInView}>Technical Expertise</SectionTitle>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={isInView ? { opacity: 1 } : {}} 
        transition={{ delay: 0.15 }} 
        className="text-white/40 text-sm sm:text-base -mt-4"
      >
        Specialized integrations & features I bring to every project
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {expertiseItems.map((item, index) => (
          <ExpertiseCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
});
ExpertiseSection.displayName = 'ExpertiseSection';

// =============================================================================
// ⚡️ MAIN PAGE
// =============================================================================
const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="relative">
      {/* Spacer for scroll-through */}
      <div className="h-6 sm:h-24" />
      
      {/* Background */}
      <PremiumBackground scrollYProgress={scrollYProgress} />

      {/* Content */}
      <motion.div
        className="relative"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div ref={containerRef} className="min-h-screen">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 flex flex-col gap-20 md:gap-28 lg:gap-36">
            <ProfileSection />
            <ScrollIndicator />
            <SkillsSection />
            <ScrollIndicator />
            <ExpertiseSection />
            <div className="h-20 lg:h-32" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;