import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { products } from '@/lib/data';

function ProductCard({ product, index }: { product: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect State
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="relative group cursor-hover"
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full aspect-[4/5] bg-card rounded-2xl overflow-hidden flex flex-col justify-between p-6 border border-border/50"
      >
        {/* Dynamic Background Hover */}
        <div 
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out pointer-events-none`}
        >
           <div className={`w-full h-full ${product.bgHover.replace('hover:', '')} opacity-40`} />
        </div>

        <div className="relative z-10 flex-1 flex items-center justify-center">
          <motion.img
            src={product.image}
            alt={product.name}
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        <div className="relative z-10 mt-6 flex flex-col gap-2">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-mono text-primary font-bold">
              {product.price.toLocaleString()} UZS
            </span>
            <div className="w-8 h-8 rounded-full border border-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Products() {
  const { lang } = useAppStore();
  const t = translations[lang].products;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="products" ref={containerRef} className="relative py-32 md:py-48 bg-background overflow-hidden">
      
      {/* Decorative Text */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 left-[-10%] w-[120%] text-[20vw] font-serif font-black text-border/20 whitespace-nowrap pointer-events-none select-none uppercase"
      >
        {t.title} — {t.title} — {t.title}
      </motion.div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="mb-20 md:mb-32 flex flex-col items-center md:items-start">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-serif font-bold text-foreground mb-6"
          >
            {t.title}.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            {t.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
