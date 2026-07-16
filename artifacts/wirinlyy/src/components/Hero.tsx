import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { heroProducts } from '@/lib/data';

export function Hero() {
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
      
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 blur-[120px] pointer-events-none">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 2 }}
          className="w-1/2 h-1/2 rounded-full bg-primary"
        />
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center px-4 h-full">
        
        {/* Massive Text & Floating Product Composition */}
        <div className="relative w-full max-w-5xl flex items-center justify-center h-[50vh] md:h-[60vh]">
          
          {/* Back Text Layer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none z-10">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[15vw] md:text-[180px] font-serif font-black leading-none tracking-tighter text-border text-stroke cursor-default"
            >
              wirinlyy
            </motion.h1>
          </div>

          {/* Floating Product */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={heroProducts[currentIndex].id}
                src={heroProducts[currentIndex].image}
                alt={heroProducts[currentIndex].name}
                initial={{ opacity: 0, y: 100, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: -100, scale: 1.1, rotate: 10 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="w-auto h-[60%] md:h-[90%] object-contain drop-shadow-2xl"
              />
            </AnimatePresence>
          </div>

          {/* Front Text Layer (Overlaps the image partially using mix-blend-mode or just absolute positioning) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center select-none z-30 pointer-events-none mix-blend-overlay opacity-80">
            <h1 className="text-[15vw] md:text-[180px] font-serif font-black leading-none tracking-tighter text-foreground/20">
              wirinlyy
            </h1>
          </div>
        </div>

        {/* Content Below */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 flex flex-col items-center text-center z-30"
        >
          <h2 className="text-2xl md:text-5xl font-serif font-bold text-foreground mb-4 max-w-3xl">
            {t.headline}
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground uppercase tracking-widest mb-10 max-w-xl">
            {t.tagline}
          </p>
          <a
            href="https://t.me/wirinlyy"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground bg-primary overflow-hidden rounded-none cursor-hover"
          >
            <span className="relative z-10 transition-transform duration-500 group-hover:-translate-y-12">
              {t.cta}
            </span>
            <span className="absolute z-10 transition-transform duration-500 translate-y-12 group-hover:translate-y-0">
              {t.cta}
            </span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-0" />
          </a>
        </motion.div>
      </div>

      {/* Floating particles background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 backdrop-blur-3xl"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </section>
  );
}
