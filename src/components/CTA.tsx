import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section id="cta" className="py-64 text-center">
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[clamp(3rem,10vw,12rem)] font-black mb-16 tracking-tightest leading-[0.9] text-white">
            Ready to <br />
            <span className="text-blue-500 italic text-glow">level up?</span>
          </h2>
          
          <button className="px-16 py-7 bg-[#1d4ed8] text-white font-black text-xs uppercase tracking-[0.4em] rounded-full hover:glow-lg transition-all transform hover:scale-105 active:scale-95 shadow-2xl">
             🔥 LET'S COOK NOW! →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
