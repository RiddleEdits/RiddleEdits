import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'BloxyPro',
    quote: "Riddle turned my retention around completely. My last montage hit **3M views** in a week thanks to the pacing.",
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=128&h=128&fit=crop&q=80'
  },
  {
    name: 'MineCrafty',
    quote: "Very quick and **high quality edits**. He understands exactly how to catch the younger audience's attention.",
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&q=80'
  },
  {
    name: 'GamerKid',
    quote: "Since working with Riddle, my **average view duration increased by 40%**. Best investment for my channel.",
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&q=80'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-48">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center font-display text-5xl md:text-6xl font-black mb-32 tracking-tighter">
          Don't take my word, <span className="text-blue-500">take theirs</span> 👑
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0f172a] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col items-center text-center group hover:border-[#1d4ed8]/30 transition-all duration-500"
            >
              <div className="w-full aspect-[4/5] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-8 left-0 right-0 px-8">
                  <blockquote className="text-lg font-medium leading-relaxed italic text-white/80">
                    "{t.quote.split('**').map((part, i) => 
                      i % 2 === 1 ? <span key={i} className="text-blue-400 font-bold">{part}</span> : part
                    )}"
                  </blockquote>
                </div>
              </div>

              <div className="p-10 w-full bg-[#0f172a]">
                <cite className="not-italic block font-black text-xl uppercase tracking-widest mb-1">
                  {t.name}
                </cite>
                <span className="text-[11px] font-black uppercase text-blue-500 tracking-[0.3em]">{index === 1 ? '11.4M+' : index === 0 ? '6.1M+' : '2.77M+'} Subscribers</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
