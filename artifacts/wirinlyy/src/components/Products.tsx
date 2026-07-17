import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
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

  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  // Glow position
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Random rotation for image
  const [imgRot] = useState(() => (Math.random() > 0.5 ? 3 : -3));

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group flex flex-col items-center cursor-hover rounded-3xl min-w-[280px] md:min-w-[340px] shrink-0"
        style={{
          perspective: 800,
          background: isHovered
            ? 'hsl(340 75% 94% / 0.85)'
            : 'hsl(340 60% 96% / 0.6)',
          boxShadow: isHovered
            ? '0 8px 40px hsl(345 75% 62% / 0.18), 0 2px 12px hsl(345 75% 62% / 0.10)'
            : '0 2px 16px hsl(340 40% 80% / 0.18)',
          backdropFilter: 'blur(10px)',
          border: '1px solid hsl(340 50% 88% / 0.7)',
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          padding: '32px 24px 28px',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Shimmer Border on Hover */}
        {isHovered && (
          <motion.div 
            className="absolute inset-[-2px] rounded-[calc(1.5rem+2px)] z-[-1] pointer-events-none opacity-50"
            style={{
              background: 'conic-gradient(from 0deg, transparent, hsl(345 75% 62%), transparent)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Dynamic Glow following mouse */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, hsl(345 75% 62% / 0.15) 0%, transparent 60%)`,
          }}
        />

        {/* Review Badge */}
        <div 
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase z-20 shadow-sm"
          style={{ background: 'hsl(340 80% 97%)', color: 'hsl(345 75% 62%)' }}
        >
          {product.reviews} {lang === 'uz' ? 'sharh' : 'отзывов'}
        </div>

        {/* Product Image */}
        <div className="relative w-full flex items-center justify-center pointer-events-none" style={{ minHeight: 220, transformStyle: 'preserve-3d' }}>
          <motion.img
            src={product.image}
            alt={product.name}
            animate={{
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -14 : 0,
              rotate: isHovered ? imgRot : 0,
              translateZ: isHovered ? 40 : 0,
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
        <div className="overflow-hidden mt-6 w-full text-center" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-lg md:text-xl font-serif font-bold text-foreground leading-tight">
            {product.name}
          </h3>
        </div>

        {/* Stars */}
        <div className="mt-2 flex flex-col items-center gap-0.5" style={{ transform: 'translateZ(10px)' }}>
          <StarRating rating={product.rating} />
        </div>

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-1.5" style={{ transform: 'translateZ(15px)' }}>
          <span className="text-2xl font-bold" style={{ color: 'hsl(345 75% 62%)' }}>
            {product.price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground font-medium">UZS</span>
        </div>

        {/* Order button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="mt-6 w-full py-3 rounded-2xl text-sm font-bold uppercase tracking-wider text-white transition-all cursor-hover cursor-magnetic z-20"
          style={{
            transform: 'translateZ(25px)',
            background: isHovered
              ? 'hsl(345 75% 55%)'
              : 'hsl(345 75% 62%)',
            boxShadow: isHovered
              ? '0 4px 18px hsl(345 75% 62% / 0.45)'
              : '0 2px 8px hsl(345 75% 62% / 0.25)',
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
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current && containerRef.current) {
      setTrackWidth(trackRef.current.scrollWidth - containerRef.current.offsetWidth);
    }
  }, []);

  const [showHint, setShowHint] = useState(true);

  return (
    <section id="products" ref={containerRef} className="relative py-32 md:py-48 overflow-hidden" style={{ background: 'hsl(340 75% 96%)' }}>

      {/* Scrolling background text */}
      <motion.div
        className="absolute top-0 left-[-10%] w-[120%] text-[18vw] font-serif font-black whitespace-nowrap pointer-events-none select-none uppercase opacity-40"
        aria-hidden
        style={{ color: 'hsl(340 40% 90%)', lineHeight: 1 }}
        animate={{ x: [0, -1000] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {t.title} — {t.title} — {t.title} —
      </motion.div>

      <div className="relative z-10 w-full">
        {/* Section heading */}
        <div className="px-6 md:px-12 mb-16 md:mb-24 flex flex-col items-start gap-4">
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
          <div className="flex items-center justify-between w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-md"
            >
              {t.subtitle}
            </motion.p>

            {/* Drag Hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary"
                >
                  <span className="w-8 h-[1px] bg-primary" />
                  Drag to explore
                  <span className="w-8 h-[1px] bg-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Drag Carousel */}
        <motion.div 
          className="pl-6 md:pl-12 cursor-grab active:cursor-grabbing"
          onDragStart={() => setShowHint(false)}
        >
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ right: 0, left: -trackWidth }}
            dragElastic={0.15}
            dragTransition={{ power: 0.2, timeConstant: 200 }}
            className="flex gap-6 md:gap-8 pb-12 pr-6 md:pr-12 w-max"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </motion.div>
        
        {/* Scroll Position Track (Decorative) */}
        <div className="mx-6 md:mx-12 mt-8 h-[2px] bg-primary/10 relative overflow-hidden rounded-full max-w-md">
          <motion.div 
            className="absolute top-0 bottom-0 bg-primary/40 w-1/4 rounded-full"
            animate={{ x: ['0%', '300%', '0%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </section>
  );
}
