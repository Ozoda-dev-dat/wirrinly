import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { products } from '@/lib/data';
import { OrderModal } from './OrderModal';

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
        className="relative group flex flex-col items-center cursor-hover"
      >
        {/* Rose glow behind image on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1.1 : 0.8 }}
          transition={{ duration: 0.6 }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(345 75% 62% / 0.35) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />

        {/* Product Image — no card, no border */}
        <div className="relative w-full flex items-center justify-center" style={{ minHeight: 280 }}>
          <motion.img
            src={product.image}
            alt={product.name}
            animate={{
              scale: isHovered ? 1.08 : 1,
              y: isHovered ? -12 : 0,
              filter: isHovered
                ? 'drop-shadow(0 30px 60px hsl(345 75% 45% / 0.4))'
                : 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-auto object-contain relative z-10"
            style={{ maxHeight: 280, maxWidth: '100%' }}
          />
        </div>

        {/* Name — clip reveal on scroll */}
        <div className="overflow-hidden mt-6 w-full text-center">
          <motion.h3
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: index * 0.12 + 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl font-serif font-bold text-foreground"
          >
            {product.name}
          </motion.h3>
        </div>

        {/* Price — fade + slide from right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: index * 0.12 + 0.4 }}
          className="mt-2 flex items-center gap-3"
        >
          <span className="text-2xl font-bold" style={{ color: 'hsl(345 75% 62%)' }}>
            {product.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground font-medium">UZS</span>
        </motion.div>

        {/* Order button — appears on hover */}
        <motion.button
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
          transition={{ duration: 0.3 }}
          onClick={() => setShowModal(true)}
          className="mt-4 px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-white border border-white/20 hover:border-primary transition-colors cursor-hover"
          style={{ background: 'hsl(345 75% 62%)' }}
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
    <section id="products" ref={containerRef} className="relative py-32 md:py-48 overflow-hidden" style={{ background: 'hsl(17 46% 8%)' }}>

      {/* Scrolling background text */}
      <motion.div
        style={{ y, color: 'hsl(17 40% 14%)', lineHeight: 1 }}
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

        {/* Products grid — no cards, just floating images */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-14 sm:gap-x-8 sm:gap-y-20 md:gap-x-12 md:gap-y-32">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
