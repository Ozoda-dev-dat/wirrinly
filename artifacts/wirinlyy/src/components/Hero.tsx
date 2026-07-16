import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';

// Product images
import mixFruitImg from '@assets/image_1784181113262.png';
import teddyCakeImg from '@assets/image_1784181137829.png';
import strawberryCakeImg from '@assets/image_1784181073927.png';

// Real fruit photos (transparent background)
import kiwiImg from '@/assets/fruits/kiwi.png';
import bananaImg from '@/assets/fruits/banana.png';
import mangoImg from '@/assets/fruits/mango.png';
import orangeImg from '@/assets/fruits/orange.png';
import strawberryImg from '@/assets/fruits/strawberry.png';
import chocDropImg from '@/assets/fruits/choc-drop.png';

interface HeroProps {
  onOrderClick: () => void;
}

// ─── Ingredient configs ───────────────────────────────────────────────────────

interface IngredientItem {
  src: string;
  x: number;        // final x offset from center (px)
  y: number;        // final y offset from center (px)
  size: number;     // width in px
  delay: number;
  rotation: number;
  zFront?: boolean; // render in front of product image
}

const HERO_PRODUCTS: {
  id: string;
  image: string;
  name: string;
  special?: 'choc-rain';
  ingredients: IngredientItem[];
}[] = [
  {
    id: 'mix-fruit',
    image: mixFruitImg,
    name: 'Mix Fruit Cake',
    ingredients: [
      { src: kiwiImg,   x: -340, y: -70,  size: 90,  delay: 0,    rotation: -20, zFront: false },
      { src: kiwiImg,   x:  290, y:  110, size: 72,  delay: 0.08, rotation:  35, zFront: true  },
      { src: kiwiImg,   x: -170, y:  190, size: 60,  delay: 0.22, rotation:  10, zFront: false },
      { src: bananaImg, x: -300, y:  100, size: 130, delay: 0.12, rotation: -50, zFront: false },
      { src: bananaImg, x:  230, y:  160, size: 110, delay: 0.18, rotation:  55, zFront: true  },
      { src: mangoImg,  x:  320, y: -130, size: 88,  delay: 0.05, rotation:  18, zFront: false },
      { src: mangoImg,  x: -350, y: -180, size: 70,  delay: 0.28, rotation: -38, zFront: false },
      { src: orangeImg, x: -200, y: -175, size: 80,  delay: 0.15, rotation:   0, zFront: true  },
      { src: orangeImg, x:  370, y:   50, size: 68,  delay: 0.25, rotation:   0, zFront: false },
      { src: orangeImg, x:  150, y: -205, size: 58,  delay: 0.32, rotation:   0, zFront: true  },
    ],
  },
  {
    id: 'teddy',
    image: teddyCakeImg,
    name: 'Teddy Cake',
    special: 'choc-rain',
    ingredients: [
      { src: chocDropImg, x: -290, y:  90,  size: 70, delay: 0,    rotation:  10, zFront: false },
      { src: chocDropImg, x: -140, y:  170, size: 55, delay: 0.1,  rotation: -15, zFront: false },
      { src: chocDropImg, x:   60, y:  190, size: 62, delay: 0.05, rotation:   5, zFront: true  },
      { src: chocDropImg, x:  200, y:  100, size: 48, delay: 0.15, rotation:  22, zFront: false },
      { src: chocDropImg, x:  330, y:  -20, size: 72, delay: 0.08, rotation: -10, zFront: false },
      { src: chocDropImg, x: -330, y:  -40, size: 58, delay: 0.2,  rotation:  16, zFront: true  },
      { src: chocDropImg, x:  110, y: -200, size: 44, delay: 0.25, rotation:  -6, zFront: false },
      { src: chocDropImg, x: -100, y: -190, size: 66, delay: 0.12, rotation:   9, zFront: false },
    ],
  },
  {
    id: 'strawberry',
    image: strawberryCakeImg,
    name: 'Strawberry Cake',
    ingredients: [
      { src: strawberryImg, x: -360, y: -85,  size: 88,  delay: 0,    rotation: -18, zFront: false },
      { src: strawberryImg, x:  315, y: -115, size: 74,  delay: 0.07, rotation:  22, zFront: false },
      { src: strawberryImg, x: -265, y:  145, size: 80,  delay: 0.14, rotation: -38, zFront: false },
      { src: strawberryImg, x:  285, y:  135, size: 92,  delay: 0.1,  rotation:  14, zFront: true  },
      { src: strawberryImg, x: -165, y: -205, size: 62,  delay: 0.2,  rotation:  -8, zFront: false },
      { src: strawberryImg, x:  370, y:   65, size: 56,  delay: 0.25, rotation:  28, zFront: true  },
      { src: strawberryImg, x:  125, y:  205, size: 70,  delay: 0.05, rotation: -22, zFront: false },
      { src: strawberryImg, x: -385, y:   35, size: 58,  delay: 0.3,  rotation:  10, zFront: false },
      { src: strawberryImg, x:  205, y: -205, size: 48,  delay: 0.18, rotation: -48, zFront: true  },
    ],
  },
];

// ─── Single floating ingredient ───────────────────────────────────────────────

function FloatingIngredient({
  item,
  productKey,
  isChocRain,
}: {
  item: IngredientItem;
  productKey: string;
  isChocRain?: boolean;
}) {
  // Choc-rain: drops fall from high above
  const initialY = isChocRain ? item.y - 700 : 0;

  return (
    <motion.div
      key={`${productKey}-${item.x}-${item.y}`}
      initial={{ x: 0, y: initialY, scale: 0, opacity: 0, rotate: item.rotation - 25 }}
      animate={{ x: item.x, y: item.y, scale: 1, opacity: 1, rotate: item.rotation }}
      exit={{ x: 0, y: 0, scale: 0, opacity: 0, transition: { duration: 0.35 } }}
      transition={{
        delay: item.delay,
        duration: isChocRain ? 1.0 : 0.8,
        ease: isChocRain ? [0.2, 0.9, 0.4, 1.1] : [0.16, 1, 0.3, 1],
        opacity: { duration: 0.25, delay: item.delay },
      }}
      className="absolute pointer-events-none select-none"
      style={{ left: '50%', top: '50%' }}
    >
      {/* Continuous gentle bob after entrance */}
      <motion.div
        animate={{
          y: [0, -12, 4, -8, 0],
          rotate: [item.rotation, item.rotation + 5, item.rotation - 3, item.rotation],
        }}
        transition={{
          duration: 4.5 + Math.abs(item.x % 2.5),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: item.delay + 0.9,
        }}
        style={{
          marginLeft: -item.size / 2,
          marginTop: -item.size / 2,
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
        }}
      >
        <img
          src={item.src}
          alt=""
          width={item.size}
          height={item.size}
          style={{ objectFit: 'contain', display: 'block' }}
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero({ onOrderClick }: HeroProps) {
  const { lang } = useAppStore();
  const t = translations[lang].hero;
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = HERO_PRODUCTS[currentIndex];
  const backIngredients = current.ingredients.filter((i) => !i.zFront);
  const frontIngredients = current.ingredients.filter((i) => i.zFront);

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_PRODUCTS.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background pt-20">

      {/* Ambient rose glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + '-glow'}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.2, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 2.5 }}
            className="w-[65vw] h-[65vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(345 75% 62%) 0%, transparent 68%)',
              filter: 'blur(90px)',
            }}
          />
        </AnimatePresence>
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center px-4">

        {/* ── Main composition ── */}
        <div
          className="relative w-full max-w-5xl flex items-center justify-center"
          style={{ height: '58vh', minHeight: 360 }}
        >

          {/* LAYER 1 — back ingredients */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <div key={current.id + '-back'} className="absolute inset-0 flex items-center justify-center">
                {backIngredients.map((item, i) => (
                  <FloatingIngredient
                    key={`back-${current.id}-${i}`}
                    item={item}
                    productKey={current.id}
                    isChocRain={current.special === 'choc-rain'}
                  />
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* LAYER 2 — brand name outline */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-20 pointer-events-none">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[155px] font-serif font-black leading-none tracking-tighter"
              style={{ WebkitTextStroke: '1.5px hsl(345 75% 62% / 0.4)', color: 'transparent' }}
            >
              wirinlyy
            </motion.h1>
          </div>

          {/* LAYER 3 — product image */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.id + '-img'}
                src={current.image}
                alt={current.name}
                initial={{ opacity: 0, y: 70, scale: 0.82, rotate: -8 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: -70, scale: 1.08, rotate: 8 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="object-contain"
                style={{
                  height: '62%',
                  maxHeight: 340,
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.75))',
                }}
              />
            </AnimatePresence>
          </div>

          {/* LAYER 4 — front ingredients */}
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <AnimatePresence mode="wait">
              <div key={current.id + '-front'} className="absolute inset-0 flex items-center justify-center">
                {frontIngredients.map((item, i) => (
                  <FloatingIngredient
                    key={`front-${current.id}-${i}`}
                    item={item}
                    productKey={current.id}
                    isChocRain={current.special === 'choc-rain'}
                  />
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* LAYER 5 — depth blend on name */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-50 pointer-events-none mix-blend-overlay opacity-50">
            <h1
              className="text-[13vw] md:text-[155px] font-serif font-black leading-none tracking-tighter"
              style={{ color: 'hsl(17 46% 8% / 0.5)' }}
            >
              wirinlyy
            </h1>
          </div>

          {/* Product name badge */}
          <div className="absolute bottom-2 right-2 md:right-0 z-[60] pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={current.id + '-badge'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xs font-bold tracking-[0.28em] uppercase text-muted-foreground"
              >
                {current.name}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Headline + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex flex-col items-center text-center z-30 mt-4"
        >
          <h2 className="text-xl md:text-4xl font-serif font-bold text-foreground mb-3 max-w-2xl leading-snug">
            {t.headline}
          </h2>
          <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-[0.3em] mb-8">
            {t.tagline}
          </p>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={onOrderClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest text-white rounded-full cursor-hover"
              style={{ background: 'hsl(345 75% 62%)' }}
            >
              {t.cta}
            </motion.button>
            <a
              href="#products"
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full cursor-hover transition-colors"
              style={{ border: '1px solid hsl(345 75% 62% / 0.45)', color: 'hsl(345 75% 72%)' }}
            >
              {lang === 'uz' ? "Ko'rish" : 'Смотреть'}
            </a>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-8 z-30">
          {HERO_PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="rounded-full transition-all duration-300 cursor-hover"
              style={{
                width: i === currentIndex ? 26 : 7,
                height: 7,
                background:
                  i === currentIndex
                    ? 'hsl(345 75% 62%)'
                    : 'hsl(44 30% 55% / 0.28)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Background floating blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(7)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 70 + i * 25,
              height: 70 + i * 25,
              left: `${(i * 14 + 4) % 92}%`,
              top: `${(i * 17 + 8) % 88}%`,
              background: 'hsl(345 75% 62% / 0.05)',
            }}
            animate={{
              y: [0, -(35 + i * 10), 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 18, 0],
            }}
            transition={{
              duration: 11 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 1.4,
            }}
          />
        ))}
      </div>
    </section>
  );
}
