import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';

interface Wave {
  id: number;
  x: number;
  y: number;
}

// Flame component inside the CTA button
const Flame: React.FC<{ active: boolean }> = ({ active }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        xDrift: (Math.random() - 0.5) * 14,
        delay: Math.random() * 0.6,
        size: 2.2 + Math.random() * 3.8,
        duration: 0.45 + Math.random() * 0.4,
        color:
          Math.random() > 0.4
            ? '#FFB800'
            : Math.random() > 0.5
            ? '#FF6B2C'
            : '#FF4500',
      })),
    []
  );

  return (
    <div className="relative w-5 h-6 z-10 flex-shrink-0">
      {/* 14 Rising ember particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            bottom: 2,
            left: '50%',
            marginLeft: -p.size / 2,
            background: `radial-gradient(circle, ${p.color}, ${p.color}88, transparent)`,
            boxShadow: active ? `0 0 ${p.size + 2}px ${p.color}aa` : 'none',
          }}
          animate={{
            y: [0, -18 - Math.random() * 12],
            x: [0, p.xDrift],
            opacity: [active ? 0.95 : 0.55, 0],
            scale: [active ? 1.3 : 0.75, 0],
          }}
          transition={{
            duration: active ? p.duration * 0.7 : p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Main flame body */}
      <motion.div
        className="absolute bottom-0 left-1/2 pointer-events-none"
        style={{
          width: 12,
          height: 18,
          marginLeft: -6,
          borderRadius: '50% 50% 30% 30%',
          background:
            'radial-gradient(ellipse at 50% 70%, #FF6B2C 0%, #FF4500 40%, transparent 80%)',
          filter: active ? 'brightness(1.6) blur(1.5px)' : 'brightness(1) blur(1px)',
        }}
        animate={{
          scaleX: [1, 1.25, 0.85, 1.15, 1],
          scaleY: [1, 0.9, 1.15, 0.95, 1],
          rotate: [0, -3, 3, -2, 0],
        }}
        transition={{
          duration: active ? 0.3 : 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Hot inner core */}
      <motion.div
        className="absolute bottom-0 left-1/2 pointer-events-none"
        style={{
          width: 7,
          height: 12,
          marginLeft: -3.5,
          borderRadius: '50% 50% 30% 30%',
          background:
            'radial-gradient(ellipse at 50% 80%, #FFFBE6 0%, #FFD700 30%, #FFB800 60%, transparent 90%)',
          filter: active ? 'brightness(1.8) blur(0.5px)' : 'brightness(1.2) blur(0.5px)',
        }}
        animate={{
          scaleX: [1, 0.8, 1.2, 0.9, 1],
          scaleY: [1, 1.2, 0.85, 1.1, 1],
          y: [0, -1, 1, -0.5, 0],
        }}
        transition={{
          duration: active ? 0.25 : 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom flame flare */}
      <motion.div
        className="absolute -bottom-1 left-1/2 pointer-events-none"
        style={{
          width: 16,
          height: 6,
          marginLeft: -8,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(255,107,44,0.4), transparent)',
          filter: 'blur(2px)',
        }}
        animate={{
          opacity: active ? [0.6, 0.9, 0.6] : [0.2, 0.35, 0.2],
          scaleX: active ? [1, 1.2, 1] : [0.8, 1, 0.8],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

// Click shockwave portal effect
const ClickWaves: React.FC<{ waves: Wave[] }> = ({ waves }) => {
  if (waves.length === 0 || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
      {waves.map((w) => (
        <div key={w.id} className="absolute" style={{ left: w.x, top: w.y }}>
          <motion.div
            className="absolute rounded-full"
            style={{
              translateX: '-50%',
              translateY: '-50%',
              border: '1px solid rgba(80, 140, 255, 0.6)',
              background:
                'radial-gradient(circle, rgba(34, 102, 255, 0.1) 0%, transparent 70%)',
            }}
            initial={{ width: 0, height: 0, opacity: 0.85 }}
            animate={{ width: 800, height: 800, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute rounded-full bg-white/40"
            style={{ translateX: '-50%', translateY: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 14, height: 14, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      ))}
    </div>,
    document.body
  );
};

export interface CookCTAProps {
  id?: string;
  className?: string;
}

// "Let's cook now!" Glowing Button
export const CookCTA: React.FC<CookCTAProps> = ({ id, className = '' }) => {
  const [active, setActive] = useState(false);
  const [waves, setWaves] = useState<Wave[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleClick = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const id = Date.now();
      setWaves((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setWaves((prev) => prev.filter((w) => w.id !== id));
      }, 1000);
    }
  }, []);

  return (
    <>
      <ClickWaves waves={waves} />
      <div className="relative inline-flex items-center justify-center">
        <motion.a
          ref={buttonRef}
          id={id}
          href="https://x.com/RiddlePlayZz"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            w-[285px] h-[50px] inline-flex items-center justify-center font-semibold uppercase tracking-wider
            text-white cursor-pointer select-none no-underline relative z-10
            btn-glow
            px-8 py-4 text-sm rounded-full gap-3 box-border
            ${className}
          `}
          tabIndex={0}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* Top specular highlight line */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Animated Cooking Flame */}
          <span
            className="relative z-10 flex items-center justify-center flex-shrink-0"
            style={{ width: 20, height: 20 }}
          >
            <span className="absolute" style={{ bottom: -2 }}>
              <Flame active={active} />
            </span>
          </span>

          <span className="relative z-10 leading-none">Let's cook now!</span>

          <svg
            className="relative z-10 flex-shrink-0"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.a>
      </div>
    </>
  );
};

export const FireButton: React.FC<CookCTAProps> = CookCTA;

export const Hero: React.FC = () => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    // Fallback timer to reveal video smoothly if onLoad already fired
    const timer = setTimeout(() => setIsVideoVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="top"
    >
     {/* Background YouTube video player with bottom fade mask */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none transition-opacity duration-700 ease-in-out"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
          opacity: isVideoVisible ? 1 : 0,
        }}
      >
        <iframe
          className="absolute top-1/2 left-1/2 w-[100vw] min-w-[177.77vh] h-[56.25vw] min-h-[100vh] -translate-x-1/2 -translate-y-1/2 object-cover border-0 pointer-events-none"
          src="https://www.youtube.com/embed/5EAMyKkARdA?autoplay=1&mute=1&controls=0&loop=1&playlist=5EAMyKkARdA&playsinline=1&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setIsVideoVisible(true)}
        />
      </div>

      {/* Dominant Dark Gradient Overlay with smooth bottom fade */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(21, 21, 21, 0.88) 0%, rgba(21, 21, 21, 0.6) 45%, rgba(15, 15, 15, 0.75) 75%, rgba(10, 10, 10, 0.95) 90%, #0a0a0a 100%)',
        }}
      />

      {/* Top right cyan-blue ambient blur orb */}
      <motion.div
        className="absolute top-[20%] right-[15%] w-[500px] h-[500px] bg-[#2266ff]/8 rounded-full blur-[140px] pointer-events-none"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Bottom left blue ambient blur orb */}
      <motion.div
        className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] bg-[#2266ff]/5 rounded-full blur-[100px] pointer-events-none"
        animate={{
          x: [0, -25, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Central Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl" style={{ perspective: 1000 }}>
        <h1
          className="font-extrabold text-secondary leading-[1.0] tracking-tight mt-7 mb-6"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', perspective: 800 }}
        >
          <span>
            <span className="hero-word inline-block">Editing</span>
          </span>
          <br />
          <span className="cursor-highlight inline-block text-glow">
            <span>
              <span
                className="hero-word hero-accent inline-block text-accent"
                style={{ color: 'rgb(34, 102, 255)' }}
              >
                Intentionally.
              </span>
            </span>
          </span>
        </h1>

        <p 
          className="font-['Montserrat',sans-serif] font-normal text-xs md:text-sm text-secondary/60 tracking-wide"
          style={{ marginTop: '24px', marginBottom: '32px' }}
        >
          hire someone with your Vision.
        </p>

        <div className="mt-1">
          <FireButton />
        </div>
      </div>

      {/* Bottom Scroll Indicator with moving dot */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#f3f3f3]/20 font-medium">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-[#f3f3f3]/15 flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-1 bg-[#2266ff] rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

