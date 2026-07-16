import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { drinks } from '@/lib/data';
import { OrderModal } from './OrderModal';

function DrinkCard({ drink, index }: { drink: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { lang } = useAppStore();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group flex flex-col items-center cursor-hover"
      >
        {/* Glow */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.15 : 0.8 }}
          transition={{ duration: 0.6 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(345 75% 62% / 0.28) 0%, transparent 70%)',
            filter: 'blur(28px)',
          }}
        />

        {/* Image area */}
        <div className="relative w-full flex items-center justify-center" style={{ minHeight: 260 }}>
          {drink.image ? (
            <motion.img
              src={drink.image}
              alt={drink.name}
              animate={{
                scale: isHovered ? 1.08 : 1,
                y: isHovered ? -14 : 0,
                filter: isHovered
                  ? 'drop-shadow(0 28px 56px hsl(345 75% 45% / 0.45))'
                  : 'drop-shadow(0 16px 36px rgba(0,0,0,0.5))',
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-auto object-contain relative z-10"
              style={{ maxHeight: 260, maxWidth: '100%' }}
            />
          ) : (
            /* Placeholder — remove when real image is added */
            <motion.div
              animate={{ scale: isHovered ? 1.06 : 1, y: isHovered ? -10 : 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative z-10 rounded-2xl flex items-center justify-center"
              style={{
                width: 140,
                height: 220,
                background: 'linear-gradient(160deg, hsl(340 60% 90%) 0%, hsl(345 75% 82%) 100%)',
                boxShadow: isHovered
                  ? '0 28px 56px hsl(345 75% 45% / 0.35)'
                  : '0 16px 36px rgba(0,0,0,0.18)',
              }}
            >
              <span className="text-4xl opacity-30">🥤</span>
            </motion.div>
          )}
        </div>

        {/* Name */}
        <div className="overflow-hidden mt-5 w-full text-center">
          <motion.h3
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: index * 0.1 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-serif font-bold text-foreground"
          >
            {drink.name}
          </motion.h3>
        </div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.35 }}
          className="mt-2 flex items-center gap-3"
        >
          <span className="text-2xl font-bold" style={{ color: 'hsl(345 75% 62%)' }}>
            {drink.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground font-medium">UZS</span>
        </motion.div>

        {/* Order button */}
        <motion.button
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowModal(true)}
          className="mt-4 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-white border border-white/20 cursor-hover"
          style={{ background: 'hsl(345 75% 62%)' }}
        >
          {lang === 'uz' ? 'Buyurtma' : 'Заказать'}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <OrderModal onClose={() => setShowModal(false)} defaultProduct={drink.id} />
        )}
      </AnimatePresence>
    </>
  );
}

export function Drinks() {
  const { lang } = useAppStore();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const title = lang === 'uz' ? 'Ichimliklar' : 'Напитки';
  const subtitle = lang === 'uz'
    ? 'Har bir qultum — alohida zavq'
    : 'Каждый глоток — особое удовольствие';
  const tag = lang === 'uz' ? 'Yangi qo\'shimcha' : 'Новинка';

  return (
    <section id="drinks" ref={containerRef} className="relative py-32 md:py-48 overflow-hidden" style={{ background: 'hsl(340 60% 98%)' }}>

      {/* Scrolling bg text */}
      <motion.div
        style={{ y, color: 'hsl(340 40% 93%)', lineHeight: 1 }}
        className="absolute top-0 left-[-10%] w-[120%] text-[18vw] font-serif font-black whitespace-nowrap pointer-events-none select-none uppercase"
        aria-hidden
      >
        {title} — {title} —
      </motion.div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Heading */}
        <div className="mb-24 md:mb-40 flex flex-col items-start gap-4">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-bold tracking-[0.3em] uppercase"
            style={{ color: 'hsl(345 75% 62%)' }}
          >
            ✦ {tag}
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-serif font-black text-foreground leading-none"
            >
              {title}.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-20 md:gap-x-12 md:gap-y-32">
          {drinks.map((drink, i) => (
            <DrinkCard key={drink.id} drink={drink} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
