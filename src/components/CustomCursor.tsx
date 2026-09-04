import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const DEFAULT_CURSOR_STYLE: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(12px) saturate(1.8)',
  border: '2.5px solid rgba(255, 255, 255, 0.35)',
  boxShadow: '0 0 15px rgba(255, 255, 255, 0.06)',
};

const HIGHLIGHT_CURSOR_STYLE: React.CSSProperties = {
  background: '#FFFFFF',
  backdropFilter: 'none',
  WebkitBackdropFilter: 'none',
  border: '2px solid #FFFFFF',
  boxShadow: '0 0 15px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1)',
};

const MAGNETIC_TARGETS_SELECTOR =
  '.btn-glow, .btn-nav, .cursor-highlight, .video-card a, .testimonial-card, .client-card, .work-card, .testi-card';

export const CustomCursor: React.FC = () => {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const rawScale = useMotionValue(1);
  const rawOpacity = useMotionValue(0);
  const rawWidth = useMotionValue(44);
  const rawHeight = useMotionValue(44);
  const rawRadius = useMotionValue(22);
  const rawZIndex = useMotionValue(10000);
  const rawLookX = useMotionValue(0);
  const rawLookY = useMotionValue(0);
  const rawSmileyOpacity = useMotionValue(1);
  const rawEmojiOpacity = useMotionValue(0);

  const springPos = { damping: 25, stiffness: 350, mass: 0.5 };
  const springDim = { damping: 22, stiffness: 220, mass: 0.7 };
  const springLook = { damping: 18, stiffness: 250, mass: 0.3 };

  const cursorX = useSpring(rawX, springPos);
  const cursorY = useSpring(rawY, springPos);
  const cursorScale = useSpring(rawScale, { damping: 20, stiffness: 300 });
  const cursorOpacity = useSpring(rawOpacity, { damping: 20, stiffness: 300 });
  const cursorWidth = useSpring(rawWidth, springDim);
  const cursorHeight = useSpring(rawHeight, springDim);
  const cursorRadius = useSpring(rawRadius, springDim);
  const lookX = useSpring(rawLookX, springLook);
  const lookY = useSpring(rawLookY, springLook);
  const smileyOpacity = useSpring(rawSmileyOpacity, { damping: 25, stiffness: 400 });
  const emojiOpacity = useSpring(rawEmojiOpacity, { damping: 20, stiffness: 300 });

  const leftEyeX = useTransform(lookX, (v) => 15 + v * 1.2);
  const leftEyeY = useTransform(lookY, (v) => 17 + v * 1.2);
  const rightEyeX = useTransform(lookX, (v) => 29 + v * 1.2);
  const rightEyeY = useTransform(lookY, (v) => 17 + v * 1.2);
  const faceRotate = useTransform(lookX, (v) => v * 3);
  const faceX = useTransform(lookX, (v) => v * 0.5);
  const faceY = useTransform(lookY, (v) => v * 0.5);

  const isTouchRef = useRef(false);
  const isHoveringRef = useRef(false);
  const activeHighlightEl = useRef<HTMLElement | null>(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);
  const cursorContainerRef = useRef<HTMLDivElement>(null);
  const magneticElsRef = useRef<HTMLElement[]>([]);

  const MAX_SNAP_DISTANCE = 200;
  const EYE_LOOK_RADIUS = 350;
  const LOOK_INTENSITY = 3.5;

  const applyStyle = (styleObj: Record<string, string>) => {
    const el = cursorContainerRef.current;
    if (el) {
      Object.assign(el.style, styleObj);
    }
  };

  useEffect(() => {
    const onTouchStart = () => {
      isTouchRef.current = true;
    };
    window.addEventListener('touchstart', onTouchStart, { once: true });

    const resetHighlightState = () => {
      activeHighlightEl.current = null;
      isHoveringRef.current = false;
      rawScale.set(1);
      rawWidth.set(44);
      rawHeight.set(44);
      rawRadius.set(22);
      rawZIndex.set(10000);
      rawSmileyOpacity.set(1);
      rawEmojiOpacity.set(0);
      applyStyle(DEFAULT_CURSOR_STYLE as any);
      rawX.set(mousePosRef.current.x);
      rawY.set(mousePosRef.current.y);
    };

    const updateFrame = () => {
      const targetEl = activeHighlightEl.current;
      if (targetEl && targetEl.isConnected) {
        const rect = targetEl.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          rafRef.current = requestAnimationFrame(updateFrame);
          return;
        }
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        const dx = mousePosRef.current.x - targetCenterX;
        const dy = mousePosRef.current.y - targetCenterY;
        if (Math.sqrt(dx * dx + dy * dy) > MAX_SNAP_DISTANCE) {
          resetHighlightState();
        } else {
          rawX.set(targetCenterX);
          rawY.set(targetCenterY);
          rawWidth.set(rect.width + 24);
          rawHeight.set(rect.height + 16);
        }
      }

      if (activeHighlightEl.current) {
        rawLookX.set(0);
        rawLookY.set(0);
      } else {
        const mx = mousePosRef.current.x;
        const my = mousePosRef.current.y;
        let closestDx = 0;
        let closestDy = 0;
        let closestDist = EYE_LOOK_RADIUS;

        for (let i = 0; i < magneticElsRef.current.length; i++) {
          const el = magneticElsRef.current[i];
          if (!el.isConnected) continue;
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < closestDist && dist > 20) {
            closestDist = dist;
            closestDx = dx;
            closestDy = dy;
          }
        }

        if (closestDist < EYE_LOOK_RADIUS) {
          rawLookX.set((closestDx / closestDist) * LOOK_INTENSITY);
          rawLookY.set((closestDy / closestDist) * LOOK_INTENSITY);
        } else {
          rawLookX.set(0);
          rawLookY.set(0);
        }
      }

      rafRef.current = requestAnimationFrame(updateFrame);
    };

    rafRef.current = requestAnimationFrame(updateFrame);

    const onMouseMove = (e: MouseEvent) => {
      if (isTouchRef.current) return;
      rawOpacity.set(1);
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      if (!activeHighlightEl.current) {
        rawX.set(e.clientX);
        rawY.set(e.clientY);
      }
    };

    const onInteractiveEnter = (e: MouseEvent) => {
      if (activeHighlightEl.current) return;
      isHoveringRef.current = true;
      rawScale.set(1.3);
      const target = e.currentTarget as HTMLElement | null;
      if (!target?.closest('.no-emoji')) {
        rawSmileyOpacity.set(0);
        rawEmojiOpacity.set(1);
      }
    };

    const onInteractiveLeave = () => {
      if (activeHighlightEl.current) return;
      isHoveringRef.current = false;
      rawScale.set(1);
      rawEmojiOpacity.set(0);
      rawSmileyOpacity.set(1);
    };

    const onHighlightEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      activeHighlightEl.current = target;
      isHoveringRef.current = true;
      rawZIndex.set(1);
      rawSmileyOpacity.set(0);
      rawEmojiOpacity.set(0);
      applyStyle(HIGHLIGHT_CURSOR_STYLE as any);

      const rect = target.getBoundingClientRect();
      rawX.set(rect.left + rect.width / 2);
      rawY.set(rect.top + rect.height / 2);
      rawWidth.set(rect.width + 24);
      rawHeight.set(rect.height + 16);
      rawRadius.set(12);
      rawScale.set(1);
    };

    const onHighlightLeave = () => {
      const target = activeHighlightEl.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mousePosRef.current.x - cx;
      const dy = mousePosRef.current.y - cy;
      if (Math.sqrt(dx * dx + dy * dy) > MAX_SNAP_DISTANCE * 0.5) {
        resetHighlightState();
      }
    };

    const onMouseLeave = () => {
      rawScale.set(0);
      rawOpacity.set(0);
    };

    const onMouseEnter = () => {
      rawOpacity.set(1);
      if (!activeHighlightEl.current) {
        rawScale.set(isHoveringRef.current ? 1.3 : 1);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const rebindListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select, .cursor-pointer")
        .forEach((el) => {
          el.removeEventListener('mouseenter', onInteractiveEnter as any);
          el.removeEventListener('mouseleave', onInteractiveLeave as any);
          el.addEventListener('mouseenter', onInteractiveEnter as any);
          el.addEventListener('mouseleave', onInteractiveLeave as any);
        });

      document.querySelectorAll('.cursor-highlight').forEach((el) => {
        el.removeEventListener('mouseenter', onHighlightEnter as any);
        el.removeEventListener('mouseleave', onHighlightLeave as any);
        el.addEventListener('mouseenter', onHighlightEnter as any);
        el.addEventListener('mouseleave', onHighlightLeave as any);
      });

      magneticElsRef.current = Array.from(document.querySelectorAll(MAGNETIC_TARGETS_SELECTOR));
    };

    const observer = new MutationObserver(rebindListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    rebindListeners();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
    };
  }, [
    rawX, rawY, rawScale, rawOpacity, rawWidth, rawHeight, rawRadius,
    rawZIndex, rawLookX, rawLookY, rawSmileyOpacity, rawEmojiOpacity
  ]);

  return (
    <motion.div
      ref={cursorContainerRef}
      className="custom-cursor pointer-events-none fixed top-0 left-0 hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: cursorScale,
        opacity: cursorOpacity,
        zIndex: rawZIndex as any,
        translateX: '-50%',
        translateY: '-50%',
        width: cursorWidth,
        height: cursorHeight,
        borderRadius: cursorRadius,
        ...DEFAULT_CURSOR_STYLE,
      }}
    >
      <motion.svg
        viewBox="0 0 44 44"
        fill="none"
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: smileyOpacity,
          rotate: faceRotate,
          x: faceX,
          y: faceY,
        }}
      >
        <motion.circle
          r="3"
          fill="rgba(255,255,255,0.9)"
          cx={leftEyeX}
          cy={leftEyeY}
        />
        <motion.circle
          r="3"
          fill="rgba(255,255,255,0.9)"
          cx={rightEyeX}
          cy={rightEyeY}
        />
        <path
          d="M13 28 Q22 35 31 28"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-2xl cursor-emoji-shake"
        style={{ opacity: emojiOpacity }}
      >
        🤩
      </motion.div>
    </motion.div>
  );
};
