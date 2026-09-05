import { useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import { Clients } from './components/Clients';
import { WorkSection } from './components/WorkSection';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  useEffect(() => {
    // Intersection Observer for scroll reveals
    const revealEls = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => {
      revealEls.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      {/* Custom Physics Mouse Cursor */}
      <CustomCursor />

      {/* Fixed Top Floating Pill Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <Clients />
        <WorkSection />
        <Testimonials />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Back-To-Top Button */}
      <BackToTop />
    </div>
  );
}

