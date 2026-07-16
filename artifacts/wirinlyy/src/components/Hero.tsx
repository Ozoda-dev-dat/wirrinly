import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { heroProducts } from '@/lib/data';

interface HeroProps {
  onOrderClick: () => void;
}

export function Hero({ onOrderClick }: HeroProps) {
  const { lang } = useAppStore();
  const t = translations[lang].hero;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background pt-20">

      {/* Rose glow — dynamic per product */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 2 }}
            className="w-[60vw] h-[60vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(345 75% 62%) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </AnimatePresence>
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center px-4">

        {/* Massive brand name with product floating through */}
        <div className="relative w-full max-w-5xl flex items-center justify-center" style={{ height: '55vh' }}>

          {/* Back text — outline stroke */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-10">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[160px] font-serif font-black leading-none tracking-tighter cursor-default"
              style={{ WebkitTextStroke: '1.5px hsl(345 75% 62% / 0.5)', color: 'transparent' }}
            >
              wirinlyy
            </motion.h1>
          </div>

          {/* Floating product image */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={heroProducts[currentIndex].id}
                src={heroProducts[currentIndex].image}
                alt={heroProducts[currentIndex].name}
                initial={{ opacity: 0, y: 80, scale: 0.85, rotate: -8 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: -80, scale: 1.1, rotate: 8 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-auto object-contain relative z-10"
                style={{
                  height: '65%',
                  maxHeight: 340,
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7))',
                }}
              />
            </AnimatePresence>
          </div>

          {/* Front text — light overlay for depth */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-30 pointer-events-none">
            <h1
              className="text-[13vw] md:text-[160px] font-serif font-black leading-none tracking-tighter"
              style={{ color: 'hsl(17 46% 10% / 0.45)', mixBlendMode: 'multiply' }}
            >
              wirinlyy
            </h1>
          </div>

          {/* Product name badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${currentIndex}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-4 right-4 md:right-0 z-40 flex flex-col items-end"
            >
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground">
                {heroProducts[currentIndex].name}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Headline + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center text-center z-30 mt-4"
        >
          <h2 className="text-xl md:text-4xl font-serif font-bold text-foreground mb-3 max-w-2xl leading-snug">
            {t.headline}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.3em] mb-10">
            {t.tagline}
          </p>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={onOrderClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-white rounded-full cursor-hover"
              style={{ background: 'hsl(345 75% 62%)' }}
            >
              {t.cta}
            </motion.button>
            <a
              href="#products"
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full cursor-hover transition-colors"
              style={{
                border: '1px solid hsl(345 75% 62% / 0.5)',
                color: 'hsl(345 75% 72%)',
              }}
            >
              {lang === 'uz' ? "Ko'rish" : 'Смотреть'}
            </a>
          </div>
        </motion.div>

        {/* Dot indicators */}
        <div className="flex gap-2 mt-10 z-30">
          {heroProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="rounded-full transition-all duration-300 cursor-hover"
              style={{
                width: i === currentIndex ? 24 : 6,
                height: 6,
                background: i === currentIndex ? 'hsl(345 75% 62%)' : 'hsl(44 30% 55% / 0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 80 + i * 30,
              height: 80 + i * 30,
              left: `${(i * 13 + 5) % 95}%`,
              top: `${(i * 17 + 10) % 90}%`,
              background: 'hsl(345 75% 62% / 0.06)',
            }}
            animate={{
              y: [0, -(40 + i * 10), 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
