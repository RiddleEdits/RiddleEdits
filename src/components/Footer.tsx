import { Play, Twitter, Youtube, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-24 border-t border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-2xl">
              <Play className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter">RiddleEdits</span>
          </div>

          <p className="text-white/40 text-xs font-medium">
            © 2026 RiddleEdits Portfolio — Designed for Growth
          </p>

          <div className="flex items-center gap-6">
            <a href="https://x.com/RiddlePlayZz" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
