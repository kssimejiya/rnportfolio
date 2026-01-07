"use client";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useMemo, useState, useEffect } from "react";

// =============================================================================
// DATA - Technical Expertise Items
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
    description:
      "Real-time location tracking, custom markers, geofencing, route optimization, and place autocomplete for seamless navigation experiences.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.4)",
  },
  {
    id: 2,
    title: "Payment Gateway Integration",
    description:
      "Razorpay, Cashfree, Stripe implementations with secure transaction handling, subscription management, and multi-currency support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" fill="currentColor" />
      </svg>
    ),
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    id: 3,
    title: "Firebase & Backend Services",
    description:
      "Authentication, Firestore, Cloud Functions, Push Notifications, Analytics, Crashlytics, and real-time database synchronization.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M3.89 15.673L6.255.461A.542.542 0 017.27.289l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0l7.924-4.427zM14.3 7.148l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984 14.3 7.148z" fill="currentColor" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
    glowColor: "rgba(245, 158, 11, 0.4)",
  },
  {
    id: 4,
    title: "AI-Powered Applications",
    description:
      "OpenAI GPT integration, image recognition, voice assistants, personalized recommendations, and intelligent chatbot implementations.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
        <circle cx="8" cy="12" r="1" fill="currentColor" />
        <circle cx="16" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    gradient: "from-cyan-500 to-blue-600",
    glowColor: "rgba(6, 182, 212, 0.4)",
  },
  {
    id: 5,
    title: "E-Commerce Solutions",
    description:
      "WooCommerce/WordPress API, cart management, inventory sync, order tracking, multi-vendor systems, and seamless checkout flows.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-rose-500 to-pink-600",
    glowColor: "rgba(244, 63, 94, 0.4)",
  },
  {
    id: 6,
    title: "Smallcase & Fintech",
    description:
      "Smallcase SDK integration, mutual funds, stock portfolios, SIP management, KYC flows, fund details via Pulse Lab, and investment tracking dashboards.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M3 3v18h18M9 17V9m4 8v-5m4 5V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    id: 7,
    title: "Augmont Digital Gold",
    description:
      "Digital gold buy/sell integration, real-time price feeds, gold savings plans, secure vault storage, and seamless redemption flows.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-yellow-400 to-amber-500",
    glowColor: "rgba(251, 191, 36, 0.4)",
  },
  {
    id: 8,
    title: "Real-time Features",
    description:
      "WebSocket implementations, live chat, real-time notifications, collaborative editing, and instant data synchronization.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    gradient: "from-indigo-500 to-violet-600",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
];

// =============================================================================
// PREMIUM NAKSHATRA CONSTELLATIONS
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
  {
    name: 'Mrigashira',
    meaning: 'The Deer Head',
    stars: [[85, 20], [90, 28], [88, 38], [82, 35], [78, 25], [84, 30]],
    lines: [[0,1], [1,2], [2,3], [3,4], [4,0], [5,0], [5,2]],
    primaryStars: [0, 2, 4],
    accentColor: 'emerald',
  },
  {
    name: 'Ardra',
    meaning: 'The Moist One',
    stars: [[35, 70], [42, 65], [50, 68], [48, 78], [40, 82], [32, 78], [38, 74]],
    lines: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,0], [6,1], [6,4]],
    primaryStars: [1, 2, 6],
    accentColor: 'cyan',
  },
  {
    name: 'Punarvasu',
    meaning: 'The Return of Light',
    stars: [[70, 70], [78, 65], [88, 68], [85, 78], [75, 82], [68, 76]],
    lines: [[0,1], [1,2], [2,3], [3,4], [4,5], [5,0]],
    primaryStars: [0, 2, 4],
    accentColor: 'gold',
  },
  {
    name: 'Pushya',
    meaning: 'The Nourisher',
    stars: [[8, 40], [15, 35], [22, 40], [18, 48], [12, 48], [15, 42]],
    lines: [[0,1], [1,2], [2,3], [3,4], [4,0], [5,1], [5,3]],
    primaryStars: [1, 3, 5],
    accentColor: 'amber',
  }
];

const accentColors = {
  gold: {
    primary: 'rgba(255, 215, 100, 0.95)',
    glow: 'rgba(255, 200, 50, 0.6)',
    line: 'rgba(255, 215, 100, 0.25)',
    shadow: 'rgba(255, 180, 0, 0.4)',
  },
  rose: {
    primary: 'rgba(255, 180, 200, 0.95)',
    glow: 'rgba(255, 150, 180, 0.6)',
    line: 'rgba(255, 180, 200, 0.25)',
    shadow: 'rgba(255, 100, 150, 0.4)',
  },
  amber: {
    primary: 'rgba(255, 191, 128, 0.95)',
    glow: 'rgba(255, 170, 100, 0.6)',
    line: 'rgba(255, 191, 128, 0.25)',
    shadow: 'rgba(255, 150, 50, 0.4)',
  },
  cyan: {
    primary: 'rgba(100, 220, 255, 0.95)',
    glow: 'rgba(56, 189, 248, 0.6)',
    line: 'rgba(100, 200, 255, 0.25)',
    shadow: 'rgba(56, 189, 248, 0.4)',
  },
  emerald: {
    primary: 'rgba(120, 255, 200, 0.95)',
    glow: 'rgba(80, 220, 160, 0.6)',
    line: 'rgba(120, 255, 200, 0.25)',
    shadow: 'rgba(50, 200, 140, 0.4)',
  },
};

// Premium Star Component
const PremiumStar = ({ x, y, isPrimary, index, isActive, accentColor }) => {
  const colors = accentColors[accentColor] || accentColors.cyan;
  const baseSize = isPrimary ? 6 : 3 + (index % 3);
  const glowSize = isPrimary ? 40 : 25;
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 1.8, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Outer glow */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: glowSize * 2,
          height: glowSize * 2,
          background: `radial-gradient(circle, ${colors.shadow} 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8 + (index % 3) * 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Chromatic aberration for primary stars */}
      {isPrimary && (
        <>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: glowSize,
              height: glowSize,
              background: `radial-gradient(circle, rgba(100, 180, 255, 0.4) 0%, transparent 70%)`,
              filter: 'blur(4px)',
              transform: 'translate(-52%, -48%)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: glowSize,
              height: glowSize,
              background: `radial-gradient(circle, rgba(255, 150, 100, 0.3) 0%, transparent 70%)`,
              filter: 'blur(4px)',
              transform: 'translate(-48%, -52%)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}
      
      {/* Inner core glow */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: baseSize * 3,
          height: baseSize * 3,
          background: `radial-gradient(circle, ${colors.glow} 0%, transparent 70%)`,
          boxShadow: `0 0 ${baseSize * 4}px ${colors.shadow}`,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 5 + (index % 4) * 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      />
      
      {/* Star core */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: baseSize,
          height: baseSize,
          background: `radial-gradient(circle, ${colors.primary} 0%, ${colors.glow} 60%, transparent 100%)`,
          boxShadow: `0 0 ${baseSize * 2}px ${colors.glow}, 0 0 ${baseSize * 4}px ${colors.shadow}`,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 4 + (index % 3) * 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
      />
      
      {/* Lens flare rays for primary stars */}
      {isPrimary && (
        <>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 50 + index * 8,
              height: '1.5px',
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              filter: 'blur(0.5px)',
            }}
            animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '1.5px',
              height: 50 + index * 8,
              background: `linear-gradient(180deg, transparent, ${colors.primary}, transparent)`,
              filter: 'blur(0.5px)',
            }}
            animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 35 + index * 5,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
              transform: 'rotate(45deg)',
              filter: 'blur(0.5px)',
            }}
            animate={{ scaleX: [0.5, 0.9, 0.5], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 35 + index * 5,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
              transform: 'rotate(-45deg)',
              filter: 'blur(0.5px)',
            }}
            animate={{ scaleX: [0.5, 0.9, 0.5], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          />
        </>
      )}
    </motion.div>
  );
};

// Constellation Line Component
const ConstellationLine = ({ x1, y1, x2, y2, index, isActive, accentColor }) => {
  const colors = accentColors[accentColor] || accentColors.cyan;
  const lineId = `about-line-${index}-${x1}-${y1}`;
  
  return (
    <g>
      <defs>
        <linearGradient id={lineId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.line} stopOpacity="0.1" />
          <stop offset="50%" stopColor={colors.line} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors.line} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      <motion.line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke={`url(#${lineId})`}
        strokeWidth="2"
        strokeLinecap="round"
        filter="blur(1px)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2.5, delay: index * 0.25, ease: [0.23, 1, 0.32, 1] }}
      />
      
      <motion.line
        x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
        stroke={colors.line}
        strokeWidth="0.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 2.5, delay: index * 0.25 + 0.3, ease: [0.23, 1, 0.32, 1] }}
      />
    </g>
  );
};

// Nakshatra Constellation System
const NakshatraConstellations = ({ scrollYProgress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const newIndex = Math.min(Math.floor(value * constellationPatterns.length), constellationPatterns.length - 1);
      if (newIndex !== activeIndex && newIndex >= 0) {
        setPrevIndex(activeIndex);
        setIsTransitioning(true);
        setActiveIndex(newIndex);
        setTimeout(() => setIsTransitioning(false), 2500);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Constellation name */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute bottom-8 right-8 text-right z-10 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-light">
            {constellationPatterns[activeIndex].meaning}
          </p>
          <p className="text-xs text-white/30 font-light mt-1" style={{ fontFamily: 'serif' }}>
            {constellationPatterns[activeIndex].name}
          </p>
        </motion.div>
      </AnimatePresence>

      {constellationPatterns.map((constellation, cIndex) => {
        const isActive = cIndex === activeIndex;
        const wasPrevious = cIndex === prevIndex && isTransitioning;
        
        return (
          <motion.div
            key={constellation.name}
            className="absolute inset-0"
            animate={{ opacity: isActive ? 1 : wasPrevious ? 0.3 : 0 }}
            transition={{ duration: 2.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <svg className="absolute inset-0 w-full h-full">
              {constellation.lines.map(([from, to], lIndex) => (
                <ConstellationLine
                  key={`line-${cIndex}-${lIndex}`}
                  x1={constellation.stars[from][0]}
                  y1={constellation.stars[from][1]}
                  x2={constellation.stars[to][0]}
                  y2={constellation.stars[to][1]}
                  index={lIndex}
                  isActive={isActive}
                  accentColor={constellation.accentColor}
                />
              ))}
            </svg>

            {constellation.stars.map(([x, y], sIndex) => (
              <PremiumStar
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
      })}
    </div>
  );
};

// Cosmic Dust Particles
const CosmicDust = () => {
  const particles = useMemo(() => 
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: (i * 23.7 + 11) % 100,
      y: (i * 17.3 + 8) % 100,
      size: 1 + (i % 3) * 0.5,
      duration: 20 + (i % 8) * 5,
      delay: (i % 10) * 2,
      drift: (i % 2 === 0 ? 1 : -1) * (10 + (i % 5) * 3),
      opacityBase: 0.3 + (i % 4) * 0.15,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, rgba(255,255,255,${p.opacityBase}) 0%, transparent 100%)`,
          }}
          animate={{ y: [0, -30, 0], x: [0, p.drift, 0], opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// =============================================================================
// PREMIUM BACKGROUND - FIXED POSITION, INDEPENDENT OF CONTENT
// =============================================================================
const PremiumBackground = ({ scrollYProgress }) => {
  const distantStars = useMemo(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: (i * 17.3 + 5) % 100,
      y: (i * 23.7 + 10) % 100,
      size: 1 + (i % 3) * 0.5, // Increased size for visibility
      opacity: 0.3 + (i % 5) * 0.1, // Increased opacity
    })), []);

  const twinkleStars = useMemo(() => 
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: (i * 32.7 + 11) % 100,
      y: (i * 17.3 + 8) % 100,
      size: 2 + (i % 3),
      duration: 8 + (i % 5) * 2,
      color: i % 3 === 0 ? 'gold' : i % 3 === 1 ? 'cyan' : 'white',
    })), []);

  const nebulas = useMemo(() => [
    { left: '-10%', top: '5%', size: 500, colors: ['rgba(56,189,248,0.12)', 'rgba(139,92,246,0.06)'], dur: 25 },
    { left: '60%', top: '45%', size: 550, colors: ['rgba(139,92,246,0.10)', 'rgba(236,72,153,0.05)'], dur: 30 },
    { left: '20%', top: '70%', size: 480, colors: ['rgba(59,130,246,0.12)', 'rgba(34,211,238,0.06)'], dur: 28 },
  ], []);

  return (
    <>
      {/* Deep space gradient - ALWAYS visible base */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, 
            #000008 0%, 
            #010112 15%, 
            #020218 35%, 
            #030320 50%, 
            #020218 65%, 
            #010112 85%, 
            #000008 100%
          )`
        }}
      />

      {/* Ambient glow - top */}
      <motion.div
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[150%] h-[60%]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.08) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Distant stars - static, always visible */}
      <div className="absolute inset-0">
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
              boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,0.3)`
            }} 
          />
        ))}
      </div>

      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {twinkleStars.map((star) => {
          const colorMap = {
            gold: { core: 'rgba(255,220,150,1)', glow: 'rgba(255,180,50,0.5)' },
            cyan: { core: 'rgba(150,220,255,1)', glow: 'rgba(56,189,248,0.5)' },
            white: { core: 'rgba(255,255,255,1)', glow: 'rgba(200,220,255,0.5)' },
          };
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
                background: `radial-gradient(circle, ${colors.core} 0%, ${colors.glow} 100%)`,
                boxShadow: `0 0 ${star.size * 4}px ${colors.glow}`
              }}
              animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
              transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </div>

      {/* Nebulas */}
      <div className="absolute inset-0">
        {nebulas.map((n, i) => (
          <motion.div
            key={`neb-${i}`}
            className="absolute rounded-full"
            style={{ 
              left: n.left, 
              top: n.top, 
              width: n.size, 
              height: n.size, 
              background: `radial-gradient(ellipse at center, ${n.colors[0]} 0%, ${n.colors[1]} 40%, transparent 70%)`, 
              filter: 'blur(80px)' 
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6], rotate: [0, 5, 0] }}
            transition={{ duration: n.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Light rays */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        {[...Array(8)].map((_, i) => {
          const positions = [10, 25, 40, 55, 70, 85, 20, 65];
          const angles = [-15, -8, 5, 12, -12, 8, -5, 10];
          const isGold = i % 4 === 0;
          
          return (
            <motion.div
              key={`ray-${i}`}
              className="absolute top-0 origin-top"
              style={{ 
                left: `${positions[i]}%`, 
                width: '2px', 
                height: '50vh', 
                background: isGold 
                  ? 'linear-gradient(to bottom, rgba(255,200,100,0.4) 0%, rgba(255,180,50,0.15) 40%, transparent 100%)'
                  : 'linear-gradient(to bottom, rgba(56,189,248,0.4) 0%, rgba(100,150,255,0.15) 40%, transparent 100%)', 
                transform: `rotate(${angles[i]}deg)`, 
                filter: 'blur(1px)' 
              }}
              animate={{ opacity: [0.15, 0.45, 0.15], scaleY: [0.9, 1.1, 0.9] }}
              transition={{ duration: 12 + (i % 5) * 2, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </div>

      {/* Aurora bands */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          className="absolute w-[200%] h-[100px]"
          style={{ 
            top: '25%', 
            left: '-50%', 
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(56,189,248,0.06) 15%,
              rgba(139,92,246,0.08) 35%,
              rgba(236,72,153,0.06) 50%,
              rgba(139,92,246,0.08) 65%,
              rgba(56,189,248,0.06) 85%,
              transparent 100%
            )`, 
            filter: 'blur(60px)' 
          }}
          animate={{ x: ['-5%', '5%', '-5%'], opacity: [0.5, 0.8, 0.5], scaleY: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Cosmic dust */}
      <CosmicDust />

      {/* Nakshatra Constellations */}
      <NakshatraConstellations scrollYProgress={scrollYProgress} />

      {/* Noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `radial-gradient(ellipse 90% 75% at 50% 50%, transparent 0%, rgba(0,0,8,0.4) 60%, rgba(0,0,8,0.7) 100%)` 
        }} 
      />
    </>
  );
};

// =============================================================================
// UI COMPONENTS
// =============================================================================

const SectionTitle = ({ children, isInView }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    className="relative"
  >
    <h2 className="text-sm font-medium tracking-[0.3em] text-cyan-400/80 uppercase">
      {children}
    </h2>
    <motion.div
      className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent"
      initial={{ width: 0 }}
      animate={isInView ? { width: '60px' } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  </motion.div>
);

const SkillBadge = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    viewport={{ once: true }}
    className="group relative"
  >
    <motion.div
      className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${skill.color} opacity-0 blur-lg group-hover:opacity-40 transition-opacity duration-500`}
    />
    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }} className="relative">
      <div className="relative px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] text-white/70 group-hover:text-white group-hover:bg-white/[0.1] group-hover:border-white/[0.15] transition-all duration-300">
        <span className="relative z-10">{skill.name}</span>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  </motion.div>
);

const ExpertiseCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className="group relative"
    >
      <motion.div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${item.glowColor} 0%, transparent 50%)`, filter: 'blur(20px)' }}
      />
      <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-2xl p-6 border border-white/[0.06] group-hover:bg-white/[0.06] group-hover:border-white/[0.1] transition-all duration-500">
        <div className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
        <motion.div
          className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
        >
          {item.icon}
        </motion.div>
        <h3 className="font-semibold text-base text-white mb-2">{item.title}</h3>
        <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">{item.description}</p>
        <motion.div
          className={`absolute bottom-0 left-0 h-[2px] rounded-b-2xl bg-gradient-to-r ${item.gradient}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: "30%" } : {}}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const ScrollIndicator = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center py-8">
    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">Scroll</span>
      <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-2">
        <motion.div animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-1 rounded-full bg-cyan-400" />
      </div>
    </motion.div>
  </motion.div>
);

const ProfileSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }} className="flex flex-col gap-8">
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }} className="relative w-fit">
        <motion.div
          className="absolute -inset-3 rounded-full"
          style={{ background: 'conic-gradient(from 0deg, rgba(56,189,248,0.3), rgba(139,92,246,0.3), rgba(236,72,153,0.3), rgba(56,189,248,0.3))', filter: 'blur(15px)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500">
          <div className="w-full h-full rounded-full overflow-hidden bg-black">
            <Image src="/profile.jpg" alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
          </div>
        </div>
        <motion.div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-black" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>

      <SectionTitle isInView={isInView}>Biography</SectionTitle>

      <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }} className="text-lg sm:text-xl text-white/60 leading-relaxed font-light">
        Passionate React Native developer with <span className="text-white font-medium">5+ years</span> of experience crafting high-performance mobile applications. Specialized in building <span className="text-cyan-400/90">seamless cross-platform experiences</span> with complex integrations, from payment gateways to real-time features.
      </motion.p>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4, duration: 0.6 }} className="relative pl-5 py-2">
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent rounded-full" />
        <p className="italic text-white/40 text-sm sm:text-base">"Building apps that users love, one line of code at a time."</p>
      </motion.div>

      {/* <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} className="self-end opacity-60">
        <svg width="150" height="60" viewBox="0 0 370 114" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path
            d="M66 2C66 29.4851 68.6687 64.5118 49.3333 87.4444C42.4997 95.5495 35.7683 97.6796 26.2222 101C20.002 103.164 8.87322 103.873 4 99C-0.260934 94.7391 2.94804 88.1756 8.22222 86.2222C13.7053 84.1915 17.942 84 23.7778 84C33.359 84 41.3193 83.5602 50.2222 87C56.6125 89.469 63.5773 91.9131 69.5555 95.5C75.4778 99.0533 87.1838 104.357 93.5 99.4444C96.1292 97.3995 96.2752 92.5118 96.9444 89.5C97.9646 84.9092 92.6432 83.2024 89 83C84.472 82.7484 82.3397 81.8856 82 88C81.8025 91.5554 83.5627 94.4193 86 97C88.9648 100.139 92.0717 100.96 96 98.7778C99.3106 96.9386 98 90.7299 98 87.5C98 85.0327 98.4365 83.1348 99.2222 80.7778C100.357 77.3743 99.2311 78.4486 101.5 77.9444C105.352 77.0886 108 76.4766 108 81.5C108 85.6646 109 89.3473 109 93.5C109 100.142 108.863 95.0454 110.5 91.4444C112.765 86.4616 116.631 81.205 121.5 78.5C127.057 75.4129 126 82.1509 126 85.5C126 92.5532 124.42 102 134 102C142.932 102 153 102.569 153 91.2222C153 87.1735 153.772 81.3206 148 81C141.934 80.663 142.107 81.8068 139.5 86.5C134.378 95.7204 137.972 105 149.5 105C153.589 105 153.996 99.8977 155.5 96.8889C157.902 92.0843 161 85.4067 161 80C161 74.0547 158.407 82.7413 157.222 84.2222C155.194 86.7574 155 92.5718 155 95.7778C155 99.9302 153.8 104.999 158 107.222C161.954 109.316 164.884 106.382 167.778 103.778C171.15 100.743 175.896 99.1107 180 97C186.143 93.8409 191.659 91.4099 198.222 89.2222C206.505 86.4614 214.839 87 223.5 87C230.613 87 231.628 104 222.5 104C216.954 104 199.251 107.814 207 95.2222C211.456 87.9805 214.484 80.6007 220 73.7778C229.781 61.6805 242.696 50.8197 256.222 43C264.769 38.0591 274.192 34.6264 283 30.2222C286.55 28.4473 280.07 32.3343 278.5 33.5556C271.707 38.8391 266.609 45.3914 260.556 51.4444C255.356 56.6444 250.682 61.459 246.5 67.5C242.917 72.6757 239.364 77.3825 236.556 83C233.829 88.4524 231.82 94.3142 228.556 99.4444C226.693 102.371 225.518 107.823 222.5 109.5C214.795 113.78 217.517 100.438 218.056 95.0556C218.678 88.8318 227.982 85.7572 233.056 88.6111C239.614 92.3003 245.506 97.7883 252 101.778C254.886 103.551 259.46 107 263 107C271.267 107 273.32 81.9392 268.778 77.2222C264.112 72.3774 261.206 80.5039 261 84C260.576 91.2135 257.836 96.9269 264.778 102C272.242 107.454 285.041 112.276 292.111 104.833C298.002 98.6323 304.301 90.8902 308.556 83.4444C310.355 80.295 310.132 84.6251 309.444 86C305.387 94.1158 303 102.264 303 111.5C303 116.021 337.534 99.1863 340.5 98C347.33 95.2679 355.47 93.8299 361.778 90C363.935 88.6902 365.473 88 368 88"
            stroke="url(#signatureGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div> */}
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex flex-col gap-8">
      <SectionTitle isInView={isInView}>Skills</SectionTitle>
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="flex gap-3 flex-wrap">
        {skills.map((skill, index) => (
          <SkillBadge key={skill.name} skill={skill} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

const ExpertiseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="flex flex-col gap-8">
      <SectionTitle isInView={isInView}>Technical Expertise</SectionTitle>
      <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-white/40 text-sm sm:text-base -mt-4">
        Specialized integrations & features I bring to every project
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {expertiseItems.map((item, index) => (
          <ExpertiseCard key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// MAIN ABOUT PAGE - RESTRUCTURED WITH BACKGROUND OUTSIDE ANIMATED WRAPPER
// =============================================================================
const AboutPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    // Outer container - NOT animated, holds the background
    <div 
      className="relative"
      style={{ height: 'calc(100vh - 6rem)' }}
    >
      {/* Background Layer - OUTSIDE any animated wrapper, uses absolute positioning */}
      <div className="absolute inset-0 overflow-hidden">
        <PremiumBackground scrollYProgress={scrollYProgress} />
      </div>

      {/* Content Layer - Can have opacity animation without affecting background */}
      <motion.div
        className="relative h-full"
        style={{ zIndex: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Scrollable Container */}
        <div 
          className="h-full overflow-y-auto" 
          ref={containerRef}
        >
          {/* Content */}
          <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 flex flex-col gap-20 md:gap-28 lg:gap-36">
            <ProfileSection />
            <ScrollIndicator />
            <SkillsSection />
            <ScrollIndicator />
            <ExpertiseSection />
            <div className="h-20 lg:h-32" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;