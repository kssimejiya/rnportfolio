"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";

const items = [
  {
    id: 1,
    title: "Remote for Samsung TV Smart",
    desc: "Move over the old Smart TV remote! Control your Samsung TV with your phone and say goodbye 👋 to your old bulky remote",
    tag: "10M+ Downloads",
    tagType: "downloads",
    screenshots: ["/remote_1.png", "/remote_2.png", "/remote_3.png", "/remote_4.png"],
    icon: "/portfolio/samsung-remote/icon.png",
    appStoreLink: "https://apps.apple.com/in/app/remote-for-samsung-tv-smart/id6474010687",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.controlla.remoteapp",
  },
  {
    id: 2,
    title: "Coachie - Coach | Chef | CBT",
    desc: "Transform your mind and body with personalised meal plans, AI chef and AI Cognitive Behavioral Therapy (CBT).",
    tag: "10K+ Downloads",
    tagType: "downloads",
    screenshots: ["/coachie_1.png", "/coachie_2.png", "/coachie_3.png", "/coachie_4.png", "/coachie_5.png", "/coachie_6.png", "/coachie_7.png"],
    icon: "/portfolio/coachie/icon.png",
    appStoreLink: "https://apps.apple.com/in/app/coachie-coach-chef-cbt/id6744700791",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.cc.caloriecoach",
  },
  {
    id: 3,
    title: "Foodzapp - Food Ordering",
    desc: "Order food from your favourite restaurants and get it delivered to your doorstep with ease.",
    tag: "10K+ Downloads",
    tagType: "downloads",
    screenshots: ["/foodz_1.png", "/foodz_2.png", "/foodz_3.png", "/foodz_4.png", "/foodz_5.png"],
    icon: "/portfolio/foodzapp/icon.png",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.order.spryntz",
    appStoreLink: "https://apps.apple.com/in/app/foodzapp/id6450407859",
  },
  {
    id: 4,
    title: "Bavya ESS",
    desc: "The ESS app empowers employees to manage their work life efficiently with modern HR tools.",
    tag: "10K+ Downloads",
    tagType: "downloads",
    screenshots: ["/ess_1.png", "/ess_2.png", "/ess_3.png", "/ess_4.png", "/ess_5.png"],
    icon: "/portfolio/bavya/icon.png",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.bavya.ess",
  },
  {
    id: 5,
    title: "RUNHORSE - AI Photo & Video",
    desc: "Step into the future of photography with RUNHORSE - the ultimate AI-powered photoshoot experience.",
    tag: "Featured",
    tagType: "featured",
    screenshots: ["/run_1.png", "/run_2.png", "/run_3.png", "/run_4.png", "/run_5.png"],
    icon: "/portfolio/runhorse/icon.png",
    appStoreLink: "https://apps.apple.com/in/app/runhorse-ai-photo-video/id6714452727",
  },
  {
    id: 6,
    title: "PerfectStay Holiday Rentals",
    desc: "Rent holiday accommodations and get your perfect stay booked with ease.",
    tag: "Live Now",
    tagType: "new",
    screenshots: ["/stay_1.png", "/stay_2.png", "/stay_3.png", "/stay_4.png", "/stay_5.png"],
    icon: "/portfolio/perfectstay/icon.png",
    playStoreLink: "https://play.google.com/store/apps/details?id=com.perfectstay",
    appStoreLink: "https://apps.apple.com/in/app/perfectstay-holiday-rentals/id6444202919",
  },
  {
    id: 7,
    title: "Aunest",
    desc: "One stop solution for gold - includes gold funds, gold loans, digital gold and gold e-commerce.",
    tag: "FEB 2026",
    tagType: "coming-soon",
    screenshots: ["/aunest_1.png", "/aunest_2.png", "/aunest_3.png", "/aunest_4.png", "/aunest_5.png", "/aunest_6.png", "/aunest_7.png"],
    icon: "/portfolio/aunest/icon.png",
  },
];

// =============================================================================
// PREMIUM NAKSHATRA CONSTELLATIONS - Luxurious star patterns with elegant transitions
// =============================================================================

// Constellation patterns with enhanced metadata for premium effects
const constellationPatterns = [
  {
    name: 'Ashwini',
    meaning: 'The Horse Riders',
    stars: [[15, 25], [22, 20], [30, 18], [38, 22], [28, 30], [20, 35], [32, 38]],
    lines: [[0,1], [1,2], [2,3], [1,4], [4,5], [4,6]],
    primaryStars: [0, 2, 3], // Brighter stars
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

// Premium color schemes
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

// Premium Star Component with lens flare effects
const PremiumStar = ({ x, y, isPrimary, index, isActive, accentColor }) => {
  const colors = accentColors[accentColor] || accentColors.cyan;
  const baseSize = isPrimary ? 6 : 3 + (index % 3);
  const glowSize = isPrimary ? 40 : 25;
  
  return (
    <motion.div
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isActive ? { 
        scale: 1, 
        opacity: 1,
      } : { scale: 0, opacity: 0 }}
      transition={{ 
        duration: 1.8,
        delay: index * 0.12,
        ease: [0.23, 1, 0.32, 1], // Premium easing
      }}
    >
      {/* Outer glow - ambient */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: glowSize * 2,
          height: glowSize * 2,
          background: `radial-gradient(circle, ${colors.shadow} 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8 + (index % 3) * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Mid glow - chromatic aberration effect */}
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
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
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
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
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
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 5 + (index % 4) * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.3,
        }}
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
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.85, 1, 0.85],
        }}
        transition={{
          duration: 4 + (index % 3) * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.4,
        }}
      />
      
      {/* Premium lens flare rays for primary stars */}
      {isPrimary && (
        <>
          {/* Horizontal ray */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 50 + index * 8,
              height: '1.5px',
              background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              filter: 'blur(0.5px)',
            }}
            animate={{ 
              scaleX: [0.6, 1, 0.6], 
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Vertical ray */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '1.5px',
              height: 50 + index * 8,
              background: `linear-gradient(180deg, transparent, ${colors.primary}, transparent)`,
              filter: 'blur(0.5px)',
            }}
            animate={{ 
              scaleY: [0.6, 1, 0.6], 
              opacity: [0.2, 0.5, 0.2] 
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          {/* Diagonal rays */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              width: 35 + index * 5,
              height: '1px',
              background: `linear-gradient(90deg, transparent, ${colors.glow}, transparent)`,
              transform: 'rotate(45deg)',
              filter: 'blur(0.5px)',
            }}
            animate={{ 
              scaleX: [0.5, 0.9, 0.5], 
              opacity: [0.15, 0.35, 0.15] 
            }}
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
            animate={{ 
              scaleX: [0.5, 0.9, 0.5], 
              opacity: [0.15, 0.35, 0.15] 
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
          />
        </>
      )}
    </motion.div>
  );
};

// Premium animated constellation line with flowing energy
const ConstellationLine = ({ x1, y1, x2, y2, index, isActive, accentColor }) => {
  const colors = accentColors[accentColor] || accentColors.cyan;
  const lineId = `line-gradient-${index}-${x1}-${y1}`;
  const flowId = `flow-gradient-${index}-${x1}-${y1}`;
  
  return (
    <g>
      {/* Gradient definitions */}
      <defs>
        <linearGradient id={lineId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.line} stopOpacity="0.1" />
          <stop offset="50%" stopColor={colors.line} stopOpacity="0.4" />
          <stop offset="100%" stopColor={colors.line} stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id={flowId} x1="0%" y1="0%" x2="100%" y2="0%">
          <motion.stop
            offset="0%"
            stopColor={colors.primary}
            animate={{ stopOpacity: [0, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
          />
          <motion.stop
            offset="50%"
            stopColor={colors.glow}
            animate={{ stopOpacity: [0.8, 0, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
          />
          <motion.stop
            offset="100%"
            stopColor={colors.primary}
            animate={{ stopOpacity: [0, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}
          />
        </linearGradient>
      </defs>
      
      {/* Base line with glow */}
      <motion.line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke={`url(#${lineId})`}
        strokeWidth="2"
        strokeLinecap="round"
        filter="blur(1px)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { 
          pathLength: 1, 
          opacity: 1,
        } : { pathLength: 0, opacity: 0 }}
        transition={{ 
          duration: 2.5,
          delay: index * 0.25,
          ease: [0.23, 1, 0.32, 1],
        }}
      />
      
      {/* Sharp core line */}
      <motion.line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke={colors.line}
        strokeWidth="0.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { 
          pathLength: 1, 
          opacity: 0.6,
        } : { pathLength: 0, opacity: 0 }}
        transition={{ 
          duration: 2.5,
          delay: index * 0.25 + 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      />
      
      {/* Flowing energy pulse */}
      <motion.line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke={`url(#${flowId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={isActive ? { 
          opacity: [0, 0.6, 0],
        } : { opacity: 0 }}
        transition={{ 
          duration: 4,
          delay: index * 0.3 + 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </g>
  );
};

// Premium Nakshatra constellation system
const PremiumNakshatraConstellations = ({ scrollYProgress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const newIndex = Math.min(Math.floor(value * 8), 7);
      if (newIndex !== activeIndex) {
        setPrevIndex(activeIndex);
        setIsTransitioning(true);
        setActiveIndex(newIndex);
        // Reset transition state after animation completes
        setTimeout(() => setIsTransitioning(false), 2500);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activeIndex]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Constellation name display - subtle and elegant */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute bottom-8 right-8 text-right z-10 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.p 
            className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-light"
          >
            {constellationPatterns[activeIndex].meaning}
          </motion.p>
          <motion.p 
            className="text-xs text-white/30 font-light mt-1"
            style={{ fontFamily: 'serif' }}
          >
            {constellationPatterns[activeIndex].name}
          </motion.p>
        </motion.div>
      </AnimatePresence>

      {constellationPatterns.map((constellation, cIndex) => {
        const isActive = cIndex === activeIndex;
        const wasPrevious = cIndex === prevIndex && isTransitioning;
        
        return (
          <motion.div
            key={constellation.name}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isActive ? 1 : wasPrevious ? 0.3 : 0,
            }}
            transition={{ 
              duration: 2.5, 
              ease: [0.23, 1, 0.32, 1] 
            }}
          >
            {/* Connection lines SVG */}
            <svg className="absolute inset-0 w-full h-full">
              {constellation.lines.map(([from, to], lIndex) => {
                const x1 = constellation.stars[from][0];
                const y1 = constellation.stars[from][1];
                const x2 = constellation.stars[to][0];
                const y2 = constellation.stars[to][1];
                
                return (
                  <ConstellationLine
                    key={`line-${cIndex}-${lIndex}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    index={lIndex}
                    isActive={isActive}
                    accentColor={constellation.accentColor}
                  />
                );
              })}
            </svg>

            {/* Stars */}
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

// =============================================================================
// COSMIC DUST - Premium floating particles (deterministic to avoid hydration)
// =============================================================================

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
          animate={{
            y: [0, -30, 0],
            x: [0, p.drift, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// =============================================================================
// PREMIUM COSMIC PARALLAX BACKGROUND
// =============================================================================

const PremiumCosmicBackground = ({ scrollYProgress }) => {
  // Enhanced parallax with more depth layers
  const layer1X = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
  const layer2X = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const layer3X = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const layer4X = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);

  // Distant static stars - very subtle background
  const distantStars = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: (i * 13.7 + 2.3) % 800,
    y: (i * 11.3 + 5.7) % 100,
    size: 0.5 + (i % 3) * 0.3,
    opacity: 0.15 + (i % 5) * 0.05,
  })), []);

  // Mid-distance twinkling stars
  const twinkleStars = useMemo(() => Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: (i * 32.7 + 11) % 800,
    y: (i * 17.3 + 8) % 100,
    size: 2 + (i % 3),
    duration: 10 + (i % 5) * 2,
    color: i % 3 === 0 ? 'gold' : i % 3 === 1 ? 'cyan' : 'white',
  })), []);

  // Nebula clouds - premium gradient overlays
  const nebulas = useMemo(() => [
    { left: '0%', top: '5%', size: 650, colors: ['rgba(56,189,248,0.08)', 'rgba(139,92,246,0.04)'], dur: 25 },
    { left: '90%', top: '45%', size: 700, colors: ['rgba(139,92,246,0.07)', 'rgba(236,72,153,0.03)'], dur: 30 },
    { left: '180%', top: '10%', size: 680, colors: ['rgba(59,130,246,0.08)', 'rgba(34,211,238,0.04)'], dur: 28 },
    { left: '280%', top: '50%', size: 620, colors: ['rgba(168,85,247,0.07)', 'rgba(56,189,248,0.03)'], dur: 32 },
    { left: '380%', top: '5%', size: 700, colors: ['rgba(34,211,238,0.08)', 'rgba(96,165,250,0.04)'], dur: 26 },
    { left: '490%', top: '40%', size: 660, colors: ['rgba(255,200,100,0.06)', 'rgba(139,92,246,0.03)'], dur: 28 },
    { left: '600%', top: '15%', size: 640, colors: ['rgba(56,189,248,0.07)', 'rgba(168,85,247,0.04)'], dur: 30 },
    { left: '710%', top: '35%', size: 680, colors: ['rgba(124,58,237,0.07)', 'rgba(56,189,248,0.03)'], dur: 27 },
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep space gradient - richer blacks */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `
            linear-gradient(180deg, 
              #000005 0%, 
              #010109 15%, 
              #020210 35%, 
              #030318 50%, 
              #020210 65%, 
              #010109 85%, 
              #000005 100%
            )` 
        }} 
      />

      {/* Premium ambient glow - top */}
      <motion.div 
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[150%] h-[60%]" 
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, rgba(139,92,246,0.03) 30%, transparent 60%)', 
          filter: 'blur(80px)' 
        }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layer 1: Distant stars (slowest) */}
      <motion.div className="absolute inset-0" style={{ x: layer1X, width: '800vw' }}>
        {distantStars.map((star) => (
          <div 
            key={`ds-${star.id}`} 
            className="absolute rounded-full bg-white" 
            style={{ 
              left: `${star.x}vw`, 
              top: `${star.y}%`, 
              width: star.size, 
              height: star.size, 
              opacity: star.opacity 
            }} 
          />
        ))}
      </motion.div>

      {/* Layer 2: Twinkling stars with color variation */}
      <motion.div className="absolute inset-0" style={{ x: layer2X, width: '800vw' }}>
        {twinkleStars.map((star) => {
          const colorMap = {
            gold: { core: 'rgba(255,220,150,0.95)', glow: 'rgba(255,180,50,0.4)' },
            cyan: { core: 'rgba(150,220,255,0.95)', glow: 'rgba(56,189,248,0.4)' },
            white: { core: 'rgba(255,255,255,0.95)', glow: 'rgba(200,220,255,0.4)' },
          };
          const colors = colorMap[star.color];
          
          return (
            <motion.div
              key={`ts-${star.id}`}
              className="absolute rounded-full"
              style={{ 
                left: `${star.x}vw`, 
                top: `${star.y}%`, 
                width: star.size, 
                height: star.size, 
                background: `radial-gradient(circle, ${colors.core} 0%, ${colors.glow} 100%)`,
                boxShadow: `0 0 ${star.size * 3}px ${colors.glow}`
              }}
              animate={{ 
                opacity: [0.3, 0.9, 0.3], 
                scale: [1, 1.3, 1] 
              }}
              transition={{ 
                duration: star.duration, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          );
        })}
      </motion.div>

      {/* Layer 3: Nebulas - premium gradient clouds */}
      <motion.div className="absolute inset-0" style={{ x: layer2X, width: '800vw' }}>
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
              filter: 'blur(100px)' 
            }}
            animate={{ 
              scale: [1, 1.15, 1], 
              opacity: [0.5, 0.8, 0.5],
              rotate: [0, 5, 0],
            }}
            transition={{ 
              duration: n.dur, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
        ))}
      </motion.div>

      {/* Layer 4: Premium light rays with gradient */}
      <motion.div className="absolute inset-0" style={{ x: layer1X, width: '800vw' }}>
        {[...Array(18)].map((_, i) => {
          const positions = [10, 55, 105, 155, 215, 275, 340, 410, 485, 560, 640, 720, 40, 130, 250, 370, 520, 680];
          const angles = [-15, -8, 5, 12, -12, 8, -5, 15, -10, 6, -8, 12, 4, -14, 10, -6, 8, -12];
          const isGold = i % 5 === 0;
          
          return (
            <motion.div
              key={`ray-${i}`}
              className="absolute top-0 origin-top"
              style={{ 
                left: `${positions[i]}vw`, 
                width: '2px', 
                height: '60vh', 
                background: isGold 
                  ? 'linear-gradient(to bottom, rgba(255,200,100,0.3) 0%, rgba(255,180,50,0.1) 40%, transparent 100%)'
                  : 'linear-gradient(to bottom, rgba(56,189,248,0.3) 0%, rgba(100,150,255,0.1) 40%, transparent 100%)', 
                transform: `rotate(${angles[i]}deg)`, 
                filter: 'blur(1px)' 
              }}
              animate={{ 
                opacity: [0.1, 0.35, 0.1],
                scaleY: [0.9, 1.1, 0.9],
              }}
              transition={{ 
                duration: 12 + (i % 5) * 2, 
                delay: i * 0.6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          );
        })}
      </motion.div>

      {/* Layer 5: Premium aurora bands */}
      <motion.div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute w-[350%] h-[120px]"
          style={{ 
            top: '25%', 
            left: '-50%', 
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                rgba(56,189,248,0.04) 15%,
                rgba(139,92,246,0.06) 35%,
                rgba(236,72,153,0.04) 50%,
                rgba(139,92,246,0.06) 65%,
                rgba(56,189,248,0.04) 85%,
                transparent 100%
              )`, 
            filter: 'blur(60px)' 
          }}
          animate={{ 
            x: ['-5%', '5%', '-5%'], 
            opacity: [0.4, 0.7, 0.4],
            scaleY: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute w-[300%] h-[80px]"
          style={{ 
            top: '60%', 
            left: '-30%', 
            background: `
              linear-gradient(90deg, 
                transparent 0%, 
                rgba(255,200,100,0.03) 20%,
                rgba(56,189,248,0.05) 50%,
                rgba(255,200,100,0.03) 80%,
                transparent 100%
              )`, 
            filter: 'blur(50px)' 
          }}
          animate={{ 
            x: ['3%', '-3%', '3%'], 
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </motion.div>

      {/* Layer 6: Cosmic dust particles */}
      <CosmicDust />

      {/* Layer 7: Premium Nakshatra Constellations */}
      <PremiumNakshatraConstellations scrollYProgress={scrollYProgress} />

      {/* Premium noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.012]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` 
        }} 
      />
      
      {/* Premium vignette - softer edges */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `
            radial-gradient(ellipse 90% 75% at 50% 50%, 
              transparent 0%, 
              rgba(0,0,5,0.3) 60%,
              rgba(0,0,5,0.6) 100%
            )` 
        }} 
      />

      {/* Subtle inner glow frame */}
      <div 
        className="absolute inset-0" 
        style={{ 
          boxShadow: 'inset 0 0 200px rgba(56,189,248,0.03), inset 0 0 100px rgba(139,92,246,0.02)'
        }} 
      />
    </div>
  );
};

// =============================================================================
// UI COMPONENTS (unchanged from original)
// =============================================================================

const TagBadge = ({ tag, tagType = "downloads" }) => {
  const icons = {
    downloads: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
    featured: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    "coming-soon": <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    new: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  };

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="self-center lg:self-start">
      <div className="relative inline-flex">
        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-sm" />
        <div className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/[0.07] backdrop-blur-2xl border border-white/[0.1] rounded-full text-white/90 text-[10px] sm:text-xs font-medium tracking-wide">
          <span className="text-cyan-400">{icons[tagType] || icons.downloads}</span>
          <span>{tag}</span>
          {tagType === "coming-soon" && <span className="relative flex h-1.5 w-1.5 ml-0.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400/70 opacity-75" style={{ animationDuration: '2.5s' }} /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" /></span>}
        </div>
      </div>
    </motion.div>
  );
};

const OptimizedImage = ({ src, alt, fill = true, priority = false, className = "", onError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const handleLoad = useCallback(() => setIsLoading(false), []);
  const handleError = useCallback(() => { setIsLoading(false); setHasError(true); onError?.(); }, [onError]);
  if (hasError) return null;
  return (
    <>
      {isLoading && <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60"><motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity }} /></div>}
      <Image src={src} alt={alt} fill={fill} priority={priority} sizes="(max-width: 640px) 45vw, 35vw" className={`object-cover transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`} onLoad={handleLoad} onError={handleError} quality={90} />
    </>
  );
};

const DeviceMockup = ({ children, className = "", isPrimary = false }) => (
  <div className={`relative ${className}`}>
    {isPrimary && <motion.div className="absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-[2.5rem] sm:rounded-[3rem]" style={{ background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.18) 0%, transparent 70%)', filter: 'blur(25px)' }} animate={{ opacity: [0.5, 0.75, 0.5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />}
    <div className={`relative rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-[2px] sm:p-[2.5px] ${isPrimary ? "shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.08)]" : "shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)]"}`} style={{ background: 'linear-gradient(160deg, #3a3a42 0%, #1f1f24 30%, #0d0d10 100%)' }}>
      <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden pointer-events-none"><div className="absolute inset-x-0 top-0 h-[35%]" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)' }} /></div>
      <div className="hidden sm:block">
        <div className="absolute left-0 top-[22%] w-[1.5px] h-5 md:h-6 rounded-l-sm -translate-x-[1.5px]" style={{ background: 'linear-gradient(to bottom, #4a4a50, #2a2a30)' }} />
        <div className="absolute left-0 top-[34%] w-[1.5px] h-8 md:h-10 rounded-l-sm -translate-x-[1.5px]" style={{ background: 'linear-gradient(to bottom, #4a4a50, #2a2a30)' }} />
        <div className="absolute left-0 top-[50%] w-[1.5px] h-8 md:h-10 rounded-l-sm -translate-x-[1.5px]" style={{ background: 'linear-gradient(to bottom, #4a4a50, #2a2a30)' }} />
        <div className="absolute right-0 top-[36%] w-[1.5px] h-10 md:h-12 rounded-r-sm translate-x-[1.5px]" style={{ background: 'linear-gradient(to bottom, #4a4a50, #2a2a30)' }} />
      </div>
      <div className="absolute top-[6px] sm:top-2 md:top-2.5 left-1/2 -translate-x-1/2 w-[52px] sm:w-16 md:w-20 lg:w-24 h-[18px] sm:h-5 md:h-6 bg-black rounded-full z-20" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)' }} />
      <div className="relative bg-black rounded-[1.375rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden" style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.03)' }}>
        <div className="h-4 sm:h-6 md:h-8 bg-black" />
        <div className="relative aspect-[9/19] bg-slate-950">{children}</div>
        <div className="h-4 sm:h-5 md:h-6 bg-black flex items-center justify-center"><div className="w-16 sm:w-20 md:w-24 h-[3px] sm:h-1 bg-white/15 rounded-full" /></div>
      </div>
    </div>
    {isPrimary && <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-[55%] h-4 sm:h-6 md:h-8 bg-gradient-to-b from-cyan-400/10 to-transparent blur-xl rounded-full" />}
  </div>
);

const ScreenshotCarousel = ({ screenshots, title, icon, isComingSoon, isPrimary = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  useEffect(() => { if (screenshots.length <= 1) return; const interval = setInterval(() => setCurrentIndex((p) => (p + 1) % screenshots.length), 5000); return () => clearInterval(interval); }, [screenshots.length]);
  const handleImageError = useCallback((i) => setImageErrors((p) => ({ ...p, [i]: true })), []);
  const showFallback = screenshots.length === 0 || screenshots.every((_, i) => imageErrors[i]);
  if (showFallback) return <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800/80 to-slate-900/80"><div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-2 overflow-hidden border border-white/5">{icon ? <Image src={icon} alt={`${title} icon`} width={56} height={56} className="w-full h-full object-cover" /> : <span className="text-lg sm:text-xl">📱</span>}</div><p className="text-white/40 text-[10px] sm:text-xs font-medium">{isComingSoon ? "Coming Soon" : "Preview"}</p></div>;
  return (
    <>
      <AnimatePresence mode="wait"><motion.div key={currentIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0"><OptimizedImage src={screenshots[currentIndex]} alt={`${title} screenshot ${currentIndex + 1}`} priority={isPrimary && currentIndex === 0} onError={() => handleImageError(currentIndex)} /></motion.div></AnimatePresence>
      {screenshots.length > 1 && <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5 z-10">{screenshots.map((_, i) => <button key={i} onClick={() => setCurrentIndex(i)} className={`rounded-full transition-all duration-500 ${i === currentIndex ? "bg-white/90 w-3 sm:w-4 h-[3px] sm:h-1" : "bg-white/30 w-1 sm:w-1.5 h-[3px] sm:h-1"}`} />)}</div>}
    </>
  );
};

// =============================================================================
// PREMIUM DEVICE SHOWCASE - Clean, Minimal, Trendy
// =============================================================================

const FloatingDevices = ({ screenshots, title, icon, isComingSoon }) => {
  const hasScreenshots = screenshots && screenshots.length > 0;
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Container with proper aspect ratio */}
      <div className="relative w-[180px] h-[360px] xs:w-[200px] xs:h-[400px] sm:w-[220px] sm:h-[440px] md:w-[240px] md:h-[480px] lg:w-[260px] lg:h-[520px] xl:w-[280px] xl:h-[560px]">
        
        {/* Layer 1: Distant background glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[120%] -z-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </motion.div>

        {/* Layer 2: Depth screenshots - subtle blurred background layers */}
        {hasScreenshots && screenshots.length > 2 && (
          <>
            {/* Back layer - most blurred, smallest */}
            <motion.div
              className="absolute top-1/2 left-1/2 -z-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                width: '75%',
                height: '70%',
                transform: 'translate(-50%, -45%)',
              }}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-full h-full"
              >
                <div 
                  className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden opacity-[0.15]"
                  style={{
                    filter: 'blur(8px)',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {screenshots[2] && (
                    <Image
                      src={screenshots[2]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Middle layer - slightly blurred */}
            <motion.div
              className="absolute top-1/2 left-1/2 -z-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                width: '85%',
                height: '80%',
                transform: 'translate(-50%, -48%)',
              }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="w-full h-full"
              >
                <div 
                  className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden opacity-[0.25]"
                  style={{
                    filter: 'blur(4px)',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {screenshots[1] && (
                    <Image
                      src={screenshots[1]}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Layer 3: Main Device - Hero */}
        <motion.div
          className="relative z-10 w-full h-full"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <DeviceMockup className="w-full h-full" isPrimary>
              <ScreenshotCarousel 
                screenshots={screenshots || []} 
                title={title} 
                icon={icon} 
                isComingSoon={isComingSoon} 
                isPrimary 
              />
            </DeviceMockup>
          </motion.div>
        </motion.div>

        {/* Layer 4: Bottom reflection */}
        <div 
          className="absolute -bottom-8 sm:-bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-[40%] -z-10 pointer-events-none"
        >
          <div 
            className="w-full h-full"
            style={{
              background: 'linear-gradient(to bottom, rgba(56,189,248,0.15) 0%, transparent 60%)',
              filter: 'blur(25px)',
              transform: 'scaleY(0.4) rotateX(60deg)',
              transformOrigin: 'top center',
              opacity: 0.6,
            }}
          />
        </div>

        {/* Layer 5: Subtle floating orbs */}
        <motion.div
          className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-2 h-2 sm:w-3 sm:h-3 rounded-full z-0"
          style={{
            background: 'radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(56,189,248,0.2) 60%, transparent 100%)',
            boxShadow: '0 0 20px rgba(56,189,248,0.4)',
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-2 -left-3 sm:-bottom-4 sm:-left-5 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full z-0"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(139,92,246,0.2) 60%, transparent 100%)',
            boxShadow: '0 0 15px rgba(139,92,246,0.4)',
          }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 -left-6 sm:-left-8 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full z-0"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 60%, transparent 100%)',
          }}
          animate={{
            y: [0, -12, 0],
            x: [0, 3, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>
    </div>
  );
};

const AppStoreButton = ({ href }) => <motion.a href={href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }} className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-black/95 text-white rounded-xl sm:rounded-2xl border border-white/[0.1] shadow-[0_8px_25px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.6)] transition-all duration-400"><svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg><span className="text-xs sm:text-sm font-semibold">App Store</span></motion.a>;

const PlayStoreButton = ({ href }) => <motion.a href={href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }} className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/95 text-slate-900 rounded-xl sm:rounded-2xl shadow-[0_8px_25px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.4)] transition-all duration-400"><svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg><span className="text-xs sm:text-sm font-semibold">Play Store</span></motion.a>;

const ComingSoonBadge = () => <span className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/[0.07] backdrop-blur-xl text-white/90 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold border border-white/[0.1]"><span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400/70 opacity-75" style={{ animationDuration: '2.5s' }} /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" /></span>Coming Soon</span>;

const ProgressDots = ({ total, current }) => (
  <div className="flex justify-center lg:justify-start gap-2 sm:gap-2.5 mt-6 sm:mt-8 md:mt-10">
    {[...Array(total)].map((_, i) => (
      <motion.div 
        key={i} 
        className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
          i === current 
            ? "w-8 sm:w-10 bg-gradient-to-r from-cyan-400 to-blue-400" 
            : "w-2 sm:w-2.5 bg-white/20 hover:bg-white/30"
        }`}
        initial={false}
        animate={i === current ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={{ duration: 0.5 }}
      />
    ))}
  </div>
);

// =============================================================================
// MAIN PAGE
// =============================================================================
const PortfolioPage = () => {
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({ target: containerRef });
  useEffect(() => { const t = setTimeout(() => window.scrollTo({ top: 150, behavior: 'smooth' }), 900); return () => clearTimeout(t); }, []);
  const scrollPercentage = useMemo(() => `-${(items.length / (items.length + 1)) * 100}%`, []);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", scrollPercentage]);
  const scrollHeight = useMemo(() => `${(items.length + 1) * 100}vh`, []);

  return (
    <div className="relative">
      <div className="h-24" />
      <PremiumCosmicBackground scrollYProgress={scrollYProgress} />
      <motion.div className="h-full relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="relative" style={{ height: scrollHeight }} ref={containerRef}>
          {/* Hero */}
          <div className="w-screen h-[calc(100vh-6rem)] flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 relative">
            <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="px-4 py-2 bg-white/[0.05] backdrop-blur-2xl rounded-full text-[10px] sm:text-xs font-medium text-white/50 border border-white/[0.08]">{items.length} Projects • Mobile Apps</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-center text-white tracking-tight">My{" "}<span className="relative inline-block"><span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Works</span><motion.svg className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full" viewBox="0 0 200 10"><motion.path d="M2 7 Q50 2 100 7 T198 7" stroke="url(#hero-ul)" strokeWidth="2.5" fill="none" strokeLinecap="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} /><defs><linearGradient id="hero-ul" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" /><stop offset="50%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" /></linearGradient></defs></motion.svg></span></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} className="text-xs sm:text-sm md:text-base text-white/40 text-center max-w-sm font-light tracking-wide">React Native apps crafted with precision</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 sm:mt-10 md:mt-12"><motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}><div className="w-5 h-8 sm:w-6 sm:h-10 border border-white/20 rounded-full flex justify-center pt-1.5 sm:pt-2"><motion.div animate={{ y: [0, 6, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 rounded-full" /></div></motion.div></motion.div>
          </div>

          {/* Horizontal Scroll */}
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            <motion.div style={{ x }} className="flex">
              <div className="h-screen w-screen" />
              {items.map((item, index) => {
                const isComingSoon = !item.appStoreLink && !item.playStoreLink;
                return (
                  <div className="h-screen w-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20" key={item.id}>
                    <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-10 lg:gap-16 xl:gap-24 max-w-6xl w-full">
                      {/* Device Section */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.96 }} 
                        whileInView={{ opacity: 1, scale: 1 }} 
                        transition={{ duration: 0.8 }} 
                        viewport={{ once: true }} 
                        className="flex-shrink-0"
                      >
                        <FloatingDevices 
                          screenshots={item.screenshots} 
                          title={item.title} 
                          icon={item.icon} 
                          isComingSoon={isComingSoon} 
                        />
                      </motion.div>
                      
                      {/* Content Section */}
                      <div className="flex flex-col gap-3 sm:gap-4 text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center lg:text-left w-full lg:w-auto">
                        {item.tag && <TagBadge tag={item.tag} tagType={item.tagType || (isComingSoon ? "coming-soon" : "downloads")} />}
                        <motion.h2 
                          initial={{ opacity: 0, y: 12 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          transition={{ delay: 0.1, duration: 0.6 }} 
                          viewport={{ once: true }} 
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight"
                        >
                          {item.title}
                        </motion.h2>
                        <motion.p 
                          initial={{ opacity: 0, y: 8 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          transition={{ delay: 0.2, duration: 0.6 }} 
                          viewport={{ once: true }} 
                          className="text-xs sm:text-sm md:text-base lg:text-lg text-white/50 leading-relaxed font-light"
                        >
                          {item.desc}
                        </motion.p>
                        <motion.div 
                          initial={{ opacity: 0, y: 8 }} 
                          whileInView={{ opacity: 1, y: 0 }} 
                          transition={{ delay: 0.3, duration: 0.6 }} 
                          viewport={{ once: true }} 
                          className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mt-3 sm:mt-4"
                        >
                          {item.appStoreLink && <AppStoreButton href={item.appStoreLink} />}
                          {item.playStoreLink && <PlayStoreButton href={item.playStoreLink} />}
                          {isComingSoon && <ComingSoonBadge />}
                        </motion.div>
                        <ProgressDots total={items.length} current={index} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <div className="w-screen h-screen flex flex-col gap-4 sm:gap-6 items-center justify-center text-center px-4 relative">
          <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white tracking-tight">Have a project in mind?</motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className="text-white/40 text-xs sm:text-sm md:text-base max-w-md font-light">Let's build something amazing together</motion.p>
          <div className="relative mt-4 sm:mt-6 md:mt-8">
            <motion.svg animate={{ rotate: 360 }} transition={{ duration: 30, ease: "linear", repeat: Infinity }} viewBox="0 0 300 300" className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60"><defs><path id="cta-p" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0" /></defs><text fill="white" fillOpacity="0.35" className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium"><textPath xlinkHref="#cta-p">• React Native • iOS • Android • Expert •</textPath></text></motion.svg>
            <Link href="/contact" className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 absolute top-0 left-0 right-0 bottom-0 m-auto bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-semibold hover:scale-105 transition-transform duration-500 shadow-[0_12px_40px_-10px_rgba(56,189,248,0.45)]">Let's Talk</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioPage;