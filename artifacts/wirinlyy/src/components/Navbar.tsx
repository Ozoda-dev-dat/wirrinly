import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import { translations } from '@/lib/translations';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onOrderClick: () => void;
}

export function Navbar({ onOrderClick }: NavbarProps) {
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
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-colors duration-500 ${
        scrolled ? 'bg-background/85 backdrop-blur-lg border-b border-border/40' : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <div className="font-serif text-2xl tracking-tight font-bold">
        wirinlyy<span style={{ color: 'hsl(345 75% 62%)' }}>.</span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8">
        {Object.entries(t).map(([key, value]) => (
          <a
            key={key}
            href={`#${key}`}
            className="text-sm font-medium tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors cursor-hover relative group"
          >
            {value}
            <span
              className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full"
              style={{ background: 'hsl(345 75% 62%)' }}
            />
          </a>
        ))}
      </div>

      {/* Right side: lang switcher + order CTA */}
      <div className="flex items-center gap-3">
        {/* Language switcher */}
        <div
          className="flex items-center rounded-full p-1"
          style={{ background: 'hsl(17 46% 16%)' }}
        >
          {(['uz', 'ru'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="relative px-3 py-1 text-xs font-bold uppercase rounded-full transition-colors cursor-hover"
              style={{
                color: lang === l ? '#fff' : 'hsl(44 30% 55%)',
                background: lang === l ? 'hsl(345 75% 62%)' : 'transparent',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Order CTA */}
        <motion.button
          onClick={onOrderClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white cursor-hover"
          style={{ background: 'hsl(345 75% 62%)' }}
        >
          {lang === 'uz' ? 'Buyurtma' : 'Заказать'}
        </motion.button>
      </div>
    </motion.nav>
  );
}
