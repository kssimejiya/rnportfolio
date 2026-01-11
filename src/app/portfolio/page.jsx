"use client";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useMemo, useState, useEffect, useCallback, memo } from "react";

// =============================================================================
// PORTFOLIO DATA
// =============================================================================

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
// ⚡️ PERFORMANCE HOOKS
// =============================================================================

// Mobile detection with SSR safety
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// ⚡️ Tab visibility hook - pause animations when tab not visible
const useTabVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
  
  return isVisible;
};

// ⚡️ Intersection Observer hook for lazy loading
const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      { threshold: 0.1, rootMargin: '100px', ...options }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasBeenInView, options]);
  
  return { ref, isInView, hasBeenInView };
};

// ⚡️ Image preloader utility
const preloadImage = (src) => {
  if (typeof window === 'undefined') return;
  const img = new window.Image();
  img.src = src;
};

// =============================================================================
// ⚡️ OPTIMIZED COSMIC BACKGROUND - CSS Animations Only
// =============================================================================

const OptimizedCosmicBackground = memo(({ scrollYProgress, isMobile }) => {
  const layer1X = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '-3%' : '-5%']);
  const layer2X = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '-8%' : '-12%']);

  // ⚡️ Reduced star counts
  const distantStars = useMemo(() => Array.from({ length: isMobile ? 25 : 50 }, (_, i) => ({
    id: i,
    x: (i * 13.7 + 2.3) % 100,
    y: (i * 11.3 + 5.7) % 100,
    size: 0.5 + (i % 3) * 0.3,
    opacity: 0.15 + (i % 5) * 0.05,
  })), [isMobile]);

  // ⚡️ Reduced twinkling stars - CSS animation classes instead of Framer Motion
  const twinkleStars = useMemo(() => Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    x: (i * 32.7 + 11) % 100,
    y: (i * 17.3 + 8) % 100,
    size: 2 + (i % 3),
    animationDelay: `${(i % 5) * 2}s`,
    color: i % 3 === 0 ? 'gold' : i % 3 === 1 ? 'cyan' : 'white',
  })), [isMobile]);

  // ⚡️ Reduced nebulas - CSS animations
  const nebulas = useMemo(() => {
    const allNebulas = [
      { left: '10%', top: '5%', size: 400, colors: ['rgba(56,189,248,0.06)', 'rgba(139,92,246,0.03)'], delay: '0s' },
      { left: '70%', top: '25%', size: 450, colors: ['rgba(139,92,246,0.05)', 'rgba(236,72,153,0.02)'], delay: '5s' },
      { left: '20%', top: '50%', size: 380, colors: ['rgba(59,130,246,0.06)', 'rgba(34,211,238,0.03)'], delay: '10s' },
    ];
    return isMobile ? allNebulas.slice(0, 1) : allNebulas;
  }, [isMobile]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none will-change-transform" style={{ zIndex: 0 }}>
      {/* Deep space gradient - static, no animation */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `linear-gradient(180deg, 
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

      {/* ⚡️ Ambient glow - CSS animation instead of Framer Motion */}
      <div 
        className={`absolute -top-[30%] left-1/2 -translate-x-1/2 w-[150%] h-[60%] ${!isMobile ? 'animate-ambient-glow' : ''}`}
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.06) 0%, rgba(139,92,246,0.03) 30%, transparent 60%)', 
          filter: isMobile ? 'none' : 'blur(60px)',
          opacity: 0.6,
        }}
      />

      {/* Layer 1: Distant stars - static dots */}
      <motion.div className="absolute inset-0" style={{ x: layer1X }}>
        {distantStars.map((star) => (
          <div 
            key={`ds-${star.id}`} 
            className="absolute rounded-full bg-white" 
            style={{ 
              left: `${star.x}%`, 
              top: `${star.y}%`, 
              width: star.size, 
              height: star.size, 
              opacity: star.opacity 
            }} 
          />
        ))}
      </motion.div>

      {/* ⚡️ Layer 2: Twinkling stars - CSS animation */}
      <motion.div className="absolute inset-0" style={{ x: layer2X }}>
        {twinkleStars.map((star) => {
          const colorMap = {
            gold: { core: 'rgba(255,220,150,0.95)', glow: 'rgba(255,180,50,0.4)' },
            cyan: { core: 'rgba(150,220,255,0.95)', glow: 'rgba(56,189,248,0.4)' },
            white: { core: 'rgba(255,255,255,0.95)', glow: 'rgba(200,220,255,0.4)' },
          };
          const colors = colorMap[star.color];
          
          return (
            <div
              key={`ts-${star.id}`}
              className={`absolute rounded-full ${isMobile ? '' : 'animate-twinkle'}`}
              style={{ 
                left: `${star.x}%`, 
                top: `${star.y}%`, 
                width: star.size, 
                height: star.size, 
                background: isMobile ? colors.core : `radial-gradient(circle, ${colors.core} 0%, ${colors.glow} 100%)`,
                boxShadow: isMobile ? 'none' : `0 0 ${star.size * 3}px ${colors.glow}`,
                opacity: isMobile ? 0.6 : undefined,
                animationDelay: star.animationDelay,
              }}
            />
          );
        })}
      </motion.div>

      {/* ⚡️ Layer 3: Nebulas - CSS animation, NO blur on mobile */}
      <motion.div className="absolute inset-0" style={{ x: layer2X }}>
        {nebulas.map((n, i) => (
          <div
            key={`neb-${i}`}
            className={`absolute rounded-full ${isMobile ? '' : 'animate-nebula'}`}
            style={{ 
              left: n.left, 
              top: n.top, 
              width: n.size, 
              height: n.size, 
              background: `radial-gradient(ellipse at center, ${n.colors[0]} 0%, ${n.colors[1]} 40%, transparent 70%)`, 
              filter: isMobile ? 'none' : 'blur(60px)',
              opacity: 0.5,
              animationDelay: n.delay,
            }}
          />
        ))}
      </motion.div>

      {/* Vignette - static */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: `radial-gradient(ellipse 90% 75% at 50% 50%, 
            transparent 0%, 
            rgba(0,0,5,0.3) 60%,
            rgba(0,0,5,0.6) 100%
          )` 
        }} 
      />
    </div>
  );
});

OptimizedCosmicBackground.displayName = 'OptimizedCosmicBackground';

// =============================================================================
// ⚡️ OPTIMIZED UI COMPONENTS
// =============================================================================

const TagBadge = memo(({ tag, tagType = "downloads" }) => {
  const icons = {
    downloads: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
    featured: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
    "coming-soon": <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    new: <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>,
  };

  return (
    <div className="relative z-20">
      <div className="relative inline-flex">
        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-sm" />
        <div className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/[0.07] backdrop-blur-2xl border border-white/[0.1] rounded-full text-white/90 text-[10px] sm:text-xs font-medium tracking-wide">
          <span className="text-cyan-400">{icons[tagType] || icons.downloads}</span>
          <span>{tag}</span>
          {tagType === "coming-soon" && (
            <span className="relative flex h-1.5 w-1.5 ml-0.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400/70 opacity-75" style={{ animationDuration: '2.5s' }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

TagBadge.displayName = 'TagBadge';

// ⚡️ Optimized Image with blur placeholder
const OptimizedImage = memo(({ src, alt, fill = true, priority = false, className = "", onError, onLoad: onLoadProp }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoadProp?.();
  }, [onLoadProp]);
  
  const handleError = useCallback(() => { 
    setIsLoading(false); 
    setHasError(true); 
    onError?.(); 
  }, [onError]);
  
  if (hasError) return null;
  
  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60 animate-pulse" />
      )}
      <Image 
        src={src} 
        alt={alt} 
        fill={fill} 
        priority={priority} 
        sizes="(max-width: 640px) 180px, (max-width: 768px) 200px, 240px"
        className={`object-cover transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`} 
        onLoad={handleLoad} 
        onError={handleError} 
        quality={75}
        loading={priority ? undefined : "lazy"}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEEA/AKOk6hf2mlWsF1qM80kaASSOwJc+z7PyfVW/qdx+0pVcrlmBfZ//2Q=="
      />
    </>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// =============================================================================
// ⚡️ OPTIMIZED DEVICE MOCKUP - Edge-to-edge screen
// =============================================================================

const DeviceMockup = memo(({ children, className = "", isPrimary = false, isMobile = false }) => (
  <div className={`relative ${className}`}>
    {/* ⚡️ Static glow on mobile, CSS animation on desktop */}
    {isPrimary && (
      <div 
        className={`absolute -inset-4 sm:-inset-6 md:-inset-8 rounded-[2.5rem] sm:rounded-[3rem] ${!isMobile ? 'animate-device-glow' : ''}`}
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.15) 0%, transparent 70%)', 
          filter: isMobile ? 'none' : 'blur(20px)',
          opacity: isMobile ? 0.3 : undefined,
        }}
      />
    )}
    
    {/* Phone frame */}
    <div 
      className={`relative rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] p-[2px] sm:p-[2.5px] ${isPrimary ? "shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]" : "shadow-[0_15px_40px_-15px_rgba(0,0,0,0.6)]"}`} 
      style={{ background: 'linear-gradient(160deg, #3a3a42 0%, #1f1f24 30%, #0d0d10 100%)' }}
    >
      {/* Highlight */}
      <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[35%]" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)' }} />
      </div>
      
      {/* Screen - Full edge-to-edge */}
      <div className="relative bg-black rounded-[1.375rem] sm:rounded-[1.75rem] md:rounded-[2.25rem] overflow-hidden" style={{ boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.03)' }}>
        {/* Content fills entire screen */}
        <div className="relative aspect-[9/19.5] bg-slate-950">{children}</div>
        
        {/* Dynamic Island - Overlaid on top of content */}
        <div className="absolute top-[4px] sm:top-[6px] md:top-2 left-1/2 -translate-x-1/2 w-[48px] sm:w-16 md:w-20 lg:w-24 h-[16px] sm:h-5 md:h-6 bg-black rounded-full z-20" style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.6)' }} />
        
        {/* Home Indicator - Overlaid at bottom */}
        <div className="absolute bottom-1 sm:bottom-1.5 md:bottom-2 left-1/2 -translate-x-1/2 w-14 sm:w-20 md:w-24 h-[3px] sm:h-1 bg-white/20 rounded-full z-20" />
      </div>
    </div>
    
    {/* ⚡️ Reflection - CSS only, desktop only */}
    {isPrimary && !isMobile && (
      <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 w-[55%] h-4 sm:h-6 md:h-8 bg-gradient-to-b from-cyan-400/10 to-transparent blur-xl rounded-full" />
    )}
  </div>
));

DeviceMockup.displayName = 'DeviceMockup';

// =============================================================================
// ⚡️ OPTIMIZED SCREENSHOT CAROUSEL - Only loads visible image
// =============================================================================

const ScreenshotCarousel = memo(({ screenshots, title, icon, isComingSoon, isPrimary = false, isInView = true, isTabVisible = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  // ⚡️ Only run interval when in view AND tab is visible
  useEffect(() => { 
    if (screenshots.length <= 1 || !isInView || !isTabVisible) return; 
    
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % screenshots.length);
      setIsImageLoaded(false);
    }, 5000); 
    
    return () => clearInterval(interval); 
  }, [screenshots.length, isInView, isTabVisible]);
  
  // ⚡️ Preload next image when current loads
  useEffect(() => {
    if (isImageLoaded && screenshots.length > 1) {
      const nextIndex = (currentIndex + 1) % screenshots.length;
      preloadImage(screenshots[nextIndex]);
    }
  }, [isImageLoaded, currentIndex, screenshots]);
  
  const handleImageError = useCallback((i) => setImageErrors((p) => ({ ...p, [i]: true })), []);
  const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);
  
  const showFallback = screenshots.length === 0 || screenshots.every((_, i) => imageErrors[i]);
  
  if (showFallback) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-800/80 to-slate-900/80">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mb-2 overflow-hidden border border-white/5">
          {icon ? (
            <Image src={icon} alt={`${title} icon`} width={56} height={56} className="w-full h-full object-cover" />
          ) : (
            <span className="text-lg sm:text-xl">📱</span>
          )}
        </div>
        <p className="text-white/40 text-[10px] sm:text-xs font-medium">{isComingSoon ? "Coming Soon" : "Preview"}</p>
      </div>
    );
  }
  
  return (
    <>
      {/* ⚡️ Only render current image - no AnimatePresence overhead */}
      <div className="absolute inset-0">
        <OptimizedImage 
          src={screenshots[currentIndex]} 
          alt={`${title} screenshot ${currentIndex + 1}`} 
          priority={isPrimary && currentIndex === 0} 
          onError={() => handleImageError(currentIndex)}
          onLoad={handleImageLoad}
        />
      </div>
      
      {/* Carousel indicators */}
      {screenshots.length > 1 && (
        <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-1.5 z-10">
          {screenshots.map((_, i) => (
            <button 
              key={i} 
              onClick={() => {
                setCurrentIndex(i);
                setIsImageLoaded(false);
              }} 
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex 
                  ? "bg-white/90 w-3 sm:w-4 h-[3px] sm:h-1" 
                  : "bg-white/30 w-1 sm:w-1.5 h-[3px] sm:h-1"
              }`} 
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
});

ScreenshotCarousel.displayName = 'ScreenshotCarousel';

// =============================================================================
// ⚡️ OPTIMIZED DEVICE SHOWCASE
// =============================================================================

const DeviceShowcase = memo(({ screenshots, title, icon, isComingSoon, isMobile, isInView, isTabVisible }) => {
  const hasScreenshots = screenshots && screenshots.length > 0;
  
  return (
    <div className="relative flex items-center justify-center">
      <div className="relative w-[160px] h-[320px] xs:w-[180px] xs:h-[360px] sm:w-[200px] sm:h-[400px] md:w-[220px] md:h-[440px] lg:w-[240px] lg:h-[480px]">
        
        {/* Background glow - static */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[120%] -z-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(56,189,248,0.1) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)',
          }}
        />

        {/* ⚡️ Depth layers - desktop only, NO blur filters */}
        {!isMobile && hasScreenshots && screenshots.length > 2 && (
          <>
            {/* Back layer - static opacity, no blur */}
            <div
              className="absolute top-1/2 left-1/2 -z-10 animate-float-slow"
              style={{ 
                width: '75%', 
                height: '70%', 
                transform: 'translate(-50%, -45%)',
              }}
            >
              <div 
                className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden opacity-[0.12]"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)', 
                  border: '1px solid rgba(255,255,255,0.05)' 
                }}
              >
                {screenshots[2] && (
                  <Image 
                    src={screenshots[2]} 
                    alt="" 
                    fill 
                    className="object-cover opacity-50" 
                    sizes="180px"
                    loading="lazy"
                    quality={50}
                  />
                )}
              </div>
            </div>

            {/* Middle layer - static opacity, no blur */}
            <div
              className="absolute top-1/2 left-1/2 -z-5 animate-float-medium"
              style={{ 
                width: '85%', 
                height: '80%', 
                transform: 'translate(-50%, -48%)',
              }}
            >
              <div 
                className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden opacity-[0.18]"
                style={{ 
                  background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)', 
                  border: '1px solid rgba(255,255,255,0.08)' 
                }}
              >
                {screenshots[1] && (
                  <Image 
                    src={screenshots[1]} 
                    alt="" 
                    fill 
                    className="object-cover opacity-60" 
                    sizes="200px"
                    loading="lazy"
                    quality={50}
                  />
                )}
              </div>
            </div>
          </>
        )}

        {/* ⚡️ Main Device - CSS float animation on desktop */}
        <div className={`relative z-10 w-full h-full ${!isMobile ? 'animate-float-main' : ''}`}>
          <DeviceMockup className="w-full h-full" isPrimary isMobile={isMobile}>
            <ScreenshotCarousel 
              screenshots={screenshots || []} 
              title={title} 
              icon={icon} 
              isComingSoon={isComingSoon} 
              isPrimary
              isInView={isInView}
              isTabVisible={isTabVisible}
            />
          </DeviceMockup>
        </div>

        {/* ⚡️ Floating orbs - CSS animation, desktop only */}
        {!isMobile && (
          <>
            <div
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-2 h-2 md:w-3 md:h-3 rounded-full z-0 animate-orb-1"
              style={{ 
                background: 'radial-gradient(circle, rgba(56,189,248,0.8) 0%, rgba(56,189,248,0.2) 60%, transparent 100%)', 
                boxShadow: '0 0 12px rgba(56,189,248,0.3)',
              }}
            />
            <div
              className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-5 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full z-0 animate-orb-2"
              style={{ 
                background: 'radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(139,92,246,0.2) 60%, transparent 100%)', 
                boxShadow: '0 0 10px rgba(139,92,246,0.3)',
              }}
            />
          </>
        )}
      </div>
    </div>
  );
});

DeviceShowcase.displayName = 'DeviceShowcase';

// =============================================================================
// BUTTON COMPONENTS
// =============================================================================

const AppStoreButton = memo(({ href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-black/95 text-white rounded-xl sm:rounded-2xl border border-white/[0.1] shadow-[0_8px_25px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
  >
    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
    <span className="text-xs sm:text-sm font-semibold">App Store</span>
  </a>
));

AppStoreButton.displayName = 'AppStoreButton';

const PlayStoreButton = memo(({ href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-white/95 text-slate-900 rounded-xl sm:rounded-2xl shadow-[0_8px_25px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
  >
    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
    </svg>
    <span className="text-xs sm:text-sm font-semibold">Play Store</span>
  </a>
));

PlayStoreButton.displayName = 'PlayStoreButton';

const ComingSoonBadge = memo(() => (
  <span className="flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 bg-white/[0.07] backdrop-blur-xl text-white/90 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold border border-white/[0.1]">
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400/70 opacity-75" style={{ animationDuration: '2.5s' }} />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
    </span>
    Coming Soon
  </span>
));

ComingSoonBadge.displayName = 'ComingSoonBadge';

const ProgressDots = memo(({ total, current }) => (
  <div className="flex justify-center gap-2 sm:gap-2.5 mt-4 sm:mt-6 md:mt-8">
    {[...Array(total)].map((_, i) => (
      <div 
        key={i} 
        className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
          i === current 
            ? "w-6 sm:w-10 bg-gradient-to-r from-cyan-400 to-blue-400" 
            : "w-1.5 sm:w-2.5 bg-white/20 hover:bg-white/30"
        }`}
      />
    ))}
  </div>
));

ProgressDots.displayName = 'ProgressDots';

// =============================================================================
// ⚡️ LAZY PORTFOLIO ITEM - Only renders when near viewport
// =============================================================================

const PortfolioItem = memo(({ item, index, isMobile, isTabVisible }) => {
  const { ref, isInView, hasBeenInView } = useInView({ rootMargin: '200px' });
  const isComingSoon = !item.appStoreLink && !item.playStoreLink;
  
  return (
    <div 
      ref={ref}
      className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10"
    >
      {/* ⚡️ Only render device when has been in view (stays rendered after) */}
      {hasBeenInView ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <DeviceShowcase 
            screenshots={item.screenshots} 
            title={item.title} 
            icon={item.icon} 
            isComingSoon={isComingSoon}
            isMobile={isMobile}
            isInView={isInView}
            isTabVisible={isTabVisible}
          />
        </motion.div>
      ) : (
        // ⚡️ Skeleton placeholder before in view
        <div className="w-[160px] h-[320px] xs:w-[180px] xs:h-[360px] sm:w-[200px] sm:h-[400px] md:w-[220px] md:h-[440px] lg:w-[240px] lg:h-[480px] rounded-[2rem] bg-white/[0.03] animate-pulse" />
      )}
      
      {/* Content - always render for SEO */}
      <motion.div 
        className="flex flex-col items-center gap-3 sm:gap-4 text-white text-center w-full max-w-md relative z-20"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true, margin: "-30px" }}
      >
        {item.tag && <TagBadge tag={item.tag} tagType={item.tagType || (isComingSoon ? "coming-soon" : "downloads")} />}
        
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          {item.title}
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-white/50 leading-relaxed font-light max-w-sm">
          {item.desc}
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {item.appStoreLink && <AppStoreButton href={item.appStoreLink} />}
          {item.playStoreLink && <PlayStoreButton href={item.playStoreLink} />}
          {isComingSoon && <ComingSoonBadge />}
        </div>
        
        <ProgressDots total={items.length} current={index} />
      </motion.div>
    </div>
  );
});

PortfolioItem.displayName = 'PortfolioItem';

// =============================================================================
// ⚡️ PORTFOLIO SECTION
// =============================================================================

const PortfolioSection = memo(({ isMobile, isTabVisible }) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-32 max-w-3xl mx-auto">
      {items.map((item, index) => (
        <PortfolioItem 
          key={item.id}
          item={item}
          index={index}
          isMobile={isMobile}
          isTabVisible={isTabVisible}
        />
      ))}
    </div>
  );
});

PortfolioSection.displayName = 'PortfolioSection';

// =============================================================================
// MAIN PAGE
// =============================================================================

const PortfolioPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const isMobile = useIsMobile();
  const isTabVisible = useTabVisibility();

  return (
    <div className="relative" ref={containerRef}>
      <div className="h-24" />
      <OptimizedCosmicBackground scrollYProgress={scrollYProgress} isMobile={isMobile} />
      
      <motion.div 
        className="relative z-10" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="w-full min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center gap-3 sm:gap-4 px-4 pt-8 pb-4">
          <motion.span 
            initial={{ opacity: 0, y: 8 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.4 }} 
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/[0.05] backdrop-blur-2xl rounded-full text-[10px] sm:text-xs font-medium text-white/50 border border-white/[0.08]"
          >
            {items.length} Projects • Mobile Apps
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.4 }} 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-center text-white tracking-tight"
          >
            My{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Works</span>
              <motion.svg 
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" 
                viewBox="0 0 200 12" 
                preserveAspectRatio="none"
                style={{ overflow: 'visible' }}
              >
                <motion.path 
                  d="M2 8 Q50 2 100 8 T198 8" 
                  stroke="url(#hero-ul)" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeLinecap="round" 
                  initial={{ pathLength: 0, opacity: 0 }} 
                  animate={{ pathLength: 1, opacity: 1 }} 
                  transition={{ duration: 0.8, delay: 0.5 }} 
                />
                <defs>
                  <linearGradient id="hero-ul" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.4 }} 
            className="text-xs sm:text-sm md:text-base text-white/40 text-center max-w-xs sm:max-w-sm font-light tracking-wide"
          >
            React Native apps crafted with precision
          </motion.p>
          
          {/* Scroll indicator - CSS animation */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }} 
            className="mt-6 sm:mt-8 md:mt-10"
          >
            <div className="animate-scroll-hint">
              <div className="w-5 h-8 sm:w-6 sm:h-10 border border-white/20 rounded-full flex justify-center pt-1.5 sm:pt-2">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-400 rounded-full animate-scroll-dot" />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Portfolio Cards */}
        <PortfolioSection isMobile={isMobile} isTabVisible={isTabVisible} />

        {/* CTA Section */}
        <div className="w-full min-h-[70vh] sm:min-h-[80vh] flex flex-col gap-4 sm:gap-6 items-center justify-center text-center px-4 py-12 relative">
          <motion.h2 
            initial={{ opacity: 0, y: 12 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.4 }} 
            viewport={{ once: true, margin: "-50px" }} 
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight"
          >
            Have a project in mind?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            transition={{ delay: 0.1, duration: 0.4 }} 
            viewport={{ once: true, margin: "-50px" }} 
            className="text-white/40 text-xs sm:text-sm md:text-base max-w-md font-light"
          >
            Let's build something amazing together
          </motion.p>
          
          <div className="relative mt-4 sm:mt-6 md:mt-8">
            {/* ⚡️ CSS rotation instead of Framer Motion */}
            <svg 
              viewBox="0 0 300 300" 
              className="w-32 h-32 xs:w-36 xs:h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 animate-spin-slow"
            >
              <defs>
                <path id="cta-p" d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0" />
              </defs>
              <text fill="white" fillOpacity="0.35" className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium">
                <textPath xlinkHref="#cta-p">• React Native • iOS • Android • Expert •</textPath>
              </text>
            </svg>
            <Link 
              href="/contact" 
              className="w-12 h-12 xs:w-14 xs:h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-24 lg:h-24 absolute top-0 left-0 right-0 bottom-0 m-auto bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full flex items-center justify-center text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-semibold hover:scale-105 transition-transform duration-300 shadow-[0_12px_40px_-10px_rgba(56,189,248,0.45)]"
            >
              Let's Talk
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioPage;