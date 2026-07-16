import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { products } from '@/lib/data';
import { OrderModal } from './OrderModal';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <span key={star} style={{ color: 'hsl(345 75% 62%)', fontSize: 13, lineHeight: 1 }}>
            {filled ? '★' : half ? '⯨' : '☆'}
          </span>
        );
      })}
    </div>
  );
}

function ProductCard({ product, index }: { product: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { lang } = useAppStore();
  const t = translations[lang];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group flex flex-col items-center cursor-hover rounded-3xl"
        style={{
          background: isHovered
            ? 'hsl(340 75% 94% / 0.85)'
            : 'hsl(340 60% 96% / 0.6)',
          boxShadow: isHovered
            ? '0 8px 40px hsl(345 75% 62% / 0.18), 0 2px 12px hsl(345 75% 62% / 0.10)'
            : '0 2px 16px hsl(340 40% 80% / 0.18)',
          backdropFilter: 'blur(10px)',
          border: '1px solid hsl(340 50% 88% / 0.7)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          padding: '28px 20px 24px',
        }}
      >
        {/* Rose glow behind image on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.1 : 0.8 }}
          transition={{ duration: 0.6 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(345 75% 62% / 0.25) 0%, transparent 70%)',
            filter: 'blur(28px)',
          }}
        />

        {/* Product Image */}
        <div className="relative w-full flex items-center justify-center" style={{ minHeight: 220 }}>
          <motion.img
            src={product.image}
            alt={product.name}
            animate={{
              scale: isHovered ? 1.08 : 1,
              y: isHovered ? -10 : 0,
              filter: isHovered
                ? 'drop-shadow(0 28px 50px hsl(345 75% 45% / 0.38))'
                : 'drop-shadow(0 16px 32px rgba(0,0,0,0.5))',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-auto object-contain relative z-10"
            style={{ maxHeight: 220, maxWidth: '100%' }}
          />
        </div>

        {/* Name */}
        <div className="overflow-hidden mt-5 w-full text-center">
          <motion.h3
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: index * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl font-serif font-bold text-foreground leading-tight"
          >
            {product.name}
          </motion.h3>
        </div>

        {/* Stars + reviews */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.35 }}
          className="mt-2 flex flex-col items-center gap-0.5"
        >
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            {product.rating.toFixed(1)} · {product.reviews} ta sharh
          </span>
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.45 }}
          className="mt-3 flex items-baseline gap-1.5"
        >
          <span className="text-2xl font-bold" style={{ color: 'hsl(345 75% 62%)' }}>
            {product.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground font-medium">UZS</span>
        </motion.div>

        {/* Order button — always visible */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.12 + 0.55 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="mt-5 w-full py-2.5 rounded-2xl text-sm font-bold uppercase tracking-wider text-white transition-all cursor-hover"
          style={{
            background: isHovered
              ? 'hsl(345 75% 55%)'
              : 'hsl(345 75% 62%)',
            boxShadow: isHovered
              ? '0 4px 18px hsl(345 75% 62% / 0.45)'
              : '0 2px 8px hsl(345 75% 62% / 0.25)',
            transition: 'background 0.3s, box-shadow 0.3s',
          }}
        >
          {t.order.cta}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <OrderModal
            onClose={() => setShowModal(false)}
            defaultProduct={product.id}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function Products() {
  const { lang } = useAppStore();
  const t = translations[lang].products;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section id="products" ref={containerRef} className="relative py-32 md:py-48 overflow-hidden" style={{ background: 'hsl(340 75% 96%)' }}>

      {/* Scrolling background text */}
      <motion.div
        style={{ y, color: 'hsl(340 40% 90%)', lineHeight: 1 }}
        className="absolute top-0 left-[-10%] w-[120%] text-[18vw] font-serif font-black whitespace-nowrap pointer-events-none select-none uppercase"
        aria-hidden
      >
        {t.title} — {t.title} —
      </motion.div>

      <div className="container relative z-10 px-6 mx-auto">
        {/* Section heading */}
        <div className="mb-24 md:mb-40 flex flex-col items-start gap-4">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-bold tracking-[0.3em] uppercase"
            style={{ color: 'hsl(345 75% 62%)' }}
          >
            ✦ {lang === 'uz' ? 'Maxsus shirinliklar' : 'Авторские десерты'}
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-serif font-black text-foreground leading-none"
            >
              {t.title}.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:gap-x-8 md:gap-y-12">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
