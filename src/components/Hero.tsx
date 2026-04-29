import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
        <div className="max-w-5xl">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(4rem,12vw,14rem)] font-black mb-12 leading-[0.85] tracking-tightest text-white flex flex-col"
          >
            <span>Editing</span>
            <span className="text-blue-500 text-glow">Intentionally.</span>
          </motion.h1>
            
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-white/40 text-lg md:text-xl max-w-sm mb-12 leading-relaxed font-medium"
          >
            I engineer high-performance videos for creators who want to stand out and dominate their niche.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="px-12 py-5 bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-[0.2em] rounded-full hover:glow-lg transition-all transform active:scale-95 shadow-2xl">
              💥 Let's Cook Now! →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative falloff */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />
    </section>
  );
}
