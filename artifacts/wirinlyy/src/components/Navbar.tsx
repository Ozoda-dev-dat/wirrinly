import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '@/lib/translations';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { lang, setLang } = useAppStore();
  const t = translations[lang].nav;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex items-center justify-between transition-colors duration-500 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="font-serif text-2xl tracking-tight font-bold">
        wirinlyy<span className="text-primary">.</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {Object.entries(t).map(([key, value]) => (
          <a
            key={key}
            href={`#${key}`}
            className="text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors cursor-hover relative group"
          >
            {value}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full" />
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4 cursor-hover bg-secondary/50 rounded-full p-1 backdrop-blur-sm">
        {(['uz', 'ru'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`relative px-3 py-1 text-xs font-bold uppercase rounded-full transition-colors ${
              lang === l ? 'text-primary-foreground' : 'text-muted-foreground hover:text-primary'
            }`}
          >
            {lang === l && (
              <motion.div
                layoutId="active-lang"
                className="absolute inset-0 bg-primary rounded-full z-0"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{l}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
