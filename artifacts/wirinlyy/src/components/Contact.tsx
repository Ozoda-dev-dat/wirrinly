import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';

export function Contact() {
  const { lang } = useAppStore();
  const t = translations[lang].contact;

  return (
    <footer id="contact" className="relative bg-card pt-32 pb-12 border-t border-border overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col items-center text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-serif font-black mb-12 tracking-tighter"
          >
            wirinlyy<span className="text-primary">.</span>
          </motion.h2>

          <motion.a
            href="https://t.me/wirinlyy"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="group relative inline-flex items-center justify-center px-12 py-6 text-xl md:text-2xl font-bold uppercase tracking-widest text-primary-foreground bg-primary rounded-full cursor-hover overflow-hidden shadow-2xl shadow-primary/20"
          >
            <span className="relative z-10 flex items-center gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2 11 13"></path>
                <path d="M22 2 15 22 11 13 2 9 22 2z"></path>
              </svg>
              {t.order} via Telegram
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-border/50 text-center md:text-left">
          
          <div>
            <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4">Contact</h4>
            <a href="https://t.me/wirinlyy" target="_blank" rel="noopener noreferrer" className="text-lg font-serif hover:text-primary transition-colors cursor-hover">
              @wirinlyy
            </a>
          </div>

          <div className="md:text-center">
            <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4">Hours</h4>
            <p className="text-lg font-serif">
              {t.hours}
            </p>
          </div>

          <div className="md:text-right">
            <h4 className="text-sm font-bold tracking-widest uppercase text-muted-foreground mb-4">Location</h4>
            <p className="text-lg font-serif">
              {t.location}
            </p>
          </div>

        </div>
        
        <div className="mt-24 text-center text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} wirinlyy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
