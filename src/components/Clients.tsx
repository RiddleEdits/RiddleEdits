import { motion } from 'motion/react';

const clients = [
  {
    name: 'BloxyPro',
    subs: '1.2M Subs',
    image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=128&h=128&fit=crop&q=80'
  },
  {
    name: 'MineCrafty',
    subs: '450K Subs',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&h=128&fit=crop&q=80'
  },
  {
    name: 'GamerKid',
    subs: '890K Subs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&q=80'
  },
  {
    name: 'CraftyAlex',
    subs: '120K Subs',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=128&h=128&fit=crop&q=80'
  }
];

export default function Clients() {
  return (
    <section id="clients" className="py-32">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <h2 className="text-center font-display text-4xl md:text-5xl font-black mb-20 tracking-tighter">
          Trusted by <span className="text-blue-500">niche leaders</span> 💪
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-700">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
                <img 
                  src={client.image} 
                  alt={client.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-[13px] tracking-tight">{client.name}</span>
                <span className="text-[11px] text-blue-500 font-black">{client.subs}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
           <button className="px-10 py-4 glass rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
             🔥 LET'S COOK NOW! →
           </button>
        </div>
      </div>
    </section>
  );
}
