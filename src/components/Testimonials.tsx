import React, { useEffect, useRef } from 'react';
import { TESTIMONIALS } from '../data';

export const Testimonials: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Repeat the list 2x so it loops infinitely seamlessly
  const allTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let x = 0;
    let speed = 0.4;
    let target = 0.4;
    const base = 0.4;
    let dragging = false;
    let lastX = 0;
    let vel = 0;
    let rafId: number;

    const half = () => track.scrollWidth / 2;

    const onMouseEnter = () => {
      if (!dragging) target = 0;
    };
    const onMouseLeave = () => {
      if (!dragging) target = base;
    };

    const onDown = (clientX: number) => {
      dragging = true;
      lastX = clientX;
      vel = 0;
      target = 0;
      speed = 0;
    };

    const onMove = (clientX: number) => {
      if (!dragging) return;
      const dx = clientX - lastX;
      lastX = clientX;
      vel = dx;
      x += dx;
      const h = half();
      if (h > 0) {
        while (x <= -h) x += h;
        while (x > 0) x -= h;
      }
    };

    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      speed = -vel * 0.15;
      target = base;
      vel = 0;
    };

    const handleMouseDown = (e: MouseEvent) => {
      onDown(e.clientX);
    };
    const handleMouseMove = (e: MouseEvent) => {
      onMove(e.clientX);
    };
    const handleMouseUp = () => {
      onUp();
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onDown(e.touches[0].clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onMove(e.touches[0].clientX);
      }
    };
    const handleTouchEnd = () => {
      onUp();
    };

    wrap.addEventListener('mouseenter', onMouseEnter);
    wrap.addEventListener('mouseleave', onMouseLeave);
    wrap.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    wrap.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrap.addEventListener('touchmove', handleTouchMove, { passive: true });
    wrap.addEventListener('touchend', handleTouchEnd);

    const tick = () => {
      if (!dragging) {
        speed += (target - speed) * 0.035;
        if (Math.abs(speed) < 0.0008) speed = 0;
        x -= speed;
        const h = half();
        if (h > 0 && x <= -h) x += h;
      }
      if (track) {
        track.style.transform = `translate3d(${x}px, 0px, 0px)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      wrap.removeEventListener('mouseenter', onMouseEnter);
      wrap.removeEventListener('mouseleave', onMouseLeave);
      wrap.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      wrap.removeEventListener('touchstart', handleTouchStart);
      wrap.removeEventListener('touchmove', handleTouchMove);
      wrap.removeEventListener('touchend', handleTouchEnd);

      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="section" id="testimonials">
      <div className="site-container">
        <div className="section-header reveal visible">
          <h2 className="section-title section-title-lg" id="testimonials-heading">
            Hear it from the <span className="cursor-highlight inline-block text-accent text-glow">creators 👑</span>
          </h2>
        </div>
      </div>

      <div className="testi-wrap" ref={wrapRef} id="testimonial-carousel-wrap">
        <div className="testi-track" ref={trackRef} id="testimonial-carousel-track">
          {allTestimonials.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="testi-card"
              id={`testi-card-${index}`}
            >
              <p className="testi-quote">{item.quote}</p>
              <div className="testi-author">
                <div className="testi-avatar">
                  <img src={item.avatar} alt={item.name} loading="lazy" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <div className="testi-name">{item.name}</div>
                  <div className="testi-role">{item.subs}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
