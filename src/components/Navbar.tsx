import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function Navbar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-6">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass rounded-full px-10 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4 cursor-pointer group">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-500">
            <img 
               src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=64&h=64&fit=crop&q=100" 
               alt="Logo"
               className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display font-bold tracking-tight text-lg">RiddleEdits</span>
        </div>

        <div className="hidden md:flex items-center gap-12">
          {['Work', 'Testimonials'].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-[14px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        <button 
          onClick={() => scrollTo('cta')}
          className="text-[12px] font-black uppercase tracking-[0.2em] bg-white text-black px-7 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all transform active:scale-95"
        >
          Let's Cook
        </button>
      </motion.div>
    </nav>
  );
}
