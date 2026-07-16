import { useAppStore } from '@/store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '@/lib/translations';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onOrderClick: () => void;
}

export function Navbar({ onOrderClick }: NavbarProps) {
  const { lang, setLang } = useAppStore();
  const t = translations[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = Object.entries(t);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-5 md:px-12 py-3.5 md:py-4 flex items-center justify-between transition-colors duration-500 ${
          scrolled || menuOpen ? 'bg-background/95 backdrop-blur-lg border-b border-border/60' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div className="font-serif text-xl md:text-2xl tracking-tight font-bold">
          wirinlyy<span style={{ color: 'hsl(345 75% 62%)' }}>.</span>
        </div>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(([key, value]) => (
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

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language switcher */}
          <div
            className="flex items-center rounded-full p-1"
            style={{ background: 'hsl(340 40% 89%)' }}
          >
            {(['uz', 'ru'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="relative px-2.5 md:px-3 py-1 text-xs font-bold uppercase rounded-full transition-colors cursor-hover"
                style={{
                  color: lang === l ? '#fff' : 'hsl(340 20% 40%)',
                  background: lang === l ? 'hsl(345 75% 62%)' : 'transparent',
                  transition: 'background 0.2s, color 0.2s',
                  minWidth: 36,
                  minHeight: 32,
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Order CTA — desktop */}
          <motion.button
            onClick={onOrderClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-white cursor-hover"
            style={{ background: 'hsl(345 75% 62%)' }}
          >
            {lang === 'uz' ? 'Buyurtma' : 'Заказать'}
          </motion.button>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-[6px] rounded-xl cursor-hover"
            style={{ background: 'hsl(340 40% 89%)' }}
            aria-label="Menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[2px] rounded-full bg-foreground origin-center"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-[2px] rounded-full bg-foreground"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.25 }}
              className="block w-5 h-[2px] rounded-full bg-foreground origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-24 pb-10 px-8 md:hidden"
            style={{ background: 'hsl(340 80% 97% / 0.97)', backdropFilter: 'blur(20px)' }}
          >
            {/* Nav links */}
            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map(([key, value], i) => (
                <motion.a
                  key={key}
                  href={`#${key}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-serif font-bold text-foreground py-3 border-b border-border/20 hover:text-primary transition-colors"
                >
                  {value}
                </motion.a>
              ))}
            </div>

            {/* Order CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 + 0.1 }}
              onClick={() => { setMenuOpen(false); onOrderClick(); }}
              className="w-full py-4 rounded-2xl font-bold text-base uppercase tracking-widest text-white mt-6"
              style={{ background: 'linear-gradient(135deg, hsl(345 75% 52%), hsl(345 75% 68%))' }}
            >
              {lang === 'uz' ? 'Buyurtma berish' : 'Оформить заказ'}
            </motion.button>

            {/* Telegram */}
            <motion.a
              href="https://t.me/wirinlyy"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: navLinks.length * 0.07 + 0.2 }}
              className="mt-3 text-center text-sm font-medium py-3 rounded-2xl border border-border/30"
              style={{ color: 'hsl(345 75% 70%)' }}
            >
              @wirinlyy — Telegram
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
