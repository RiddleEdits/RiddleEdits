import { motion } from 'motion/react';
import { Play, TrendingUp, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Extreme Skywars Montage',
    creator: 'BloxyPro',
    stats: '3.2M+ views',
    tag: 'Retention King',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
  },
  {
    title: '100 Days in Hardcore Minecraft',
    creator: 'MineCrafty',
    stats: '1.5M+ views',
    tag: 'Perfect Pacing',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1200&q=80',
  }
];

export default function Work() {
  return (
    <section id="work" className="py-48">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center font-display text-5xl md:text-6xl font-black mb-32 tracking-tighter">
          Check out my <span className="text-blue-500">work</span> 🎬
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-700 bg-white/5">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-700" />
                
                {/* Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-500">
                    <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              </div>

              <div className="mt-8 px-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold tracking-tight mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase text-white/40">{project.creator}</span>
                    <TrendingUp className="w-3 h-3 text-blue-500" />
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-blue-500 font-black text-xs uppercase tracking-widest">{project.stats}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
