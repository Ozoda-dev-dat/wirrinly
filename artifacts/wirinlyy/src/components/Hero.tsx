import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import mixFruitImg from '@assets/image_1784181113262.png';
import teddyCakeImg from '@assets/image_1784181137829.png';
import strawberryCakeImg from '@assets/image_1784181073927.png';

interface HeroProps {
  onOrderClick: () => void;
}

// ─── SVG Ingredient shapes ────────────────────────────────────────────────────

function KiwiSlice({ size = 52 }: { size?: number }) {
  const r = size / 2;
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (i * 36 * Math.PI) / 180;
    return { x2: r + Math.cos(a) * (r * 0.62), y2: r + Math.sin(a) * (r * 0.62) };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <circle cx={r} cy={r} r={r - 1} fill="#66BB6A" stroke="#388E3C" strokeWidth={size * 0.04} />
      <circle cx={r} cy={r} r={r * 0.62} fill="#F1F8E9" />
      <circle cx={r} cy={r} r={r * 0.18} fill="#5D4037" />
      {pts.map((p, i) => (
        <line key={i} x1={r} y1={r} x2={p.x2} y2={p.y2} stroke="#81C784" strokeWidth={size * 0.04} opacity={0.7} />
      ))}
    </svg>
  );
}

function Banana({ size = 70 }: { size?: number }) {
  const s = size / 70;
  return (
    <svg width={size} height={size * 0.55} viewBox="0 0 70 38" style={{ display: 'block' }}>
      <path
        d="M6 32 C10 14, 28 4, 50 6 C65 7, 68 16, 64 20 C60 8, 36 8, 12 30 Z"
        fill="#FFD54F"
        stroke="#F9A825"
        strokeWidth={1.5 / s}
      />
      <path
        d="M12 30 C36 8, 60 8, 64 20 C58 18, 34 14, 10 36 Z"
        fill="#FFCA28"
      />
    </svg>
  );
}

function MangoSlice({ size = 56 }: { size?: number }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <ellipse cx={r} cy={r * 1.05} rx={r - 2} ry={r - 3} fill="#FF8F00" stroke="#E65100" strokeWidth={size * 0.04} />
      <ellipse cx={r} cy={r} rx={r * 0.65} ry={r * 0.72} fill="#FFD740" />
      <ellipse cx={r * 0.85} cy={r * 0.82} rx={r * 0.12} ry={r * 0.16} fill="#FF8F00" opacity={0.5} transform={`rotate(-30, ${r * 0.85}, ${r * 0.82})`} />
    </svg>
  );
}

function OrangeSlice({ size = 52 }: { size?: number }) {
  const r = size / 2;
  const segments = 8;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <circle cx={r} cy={r} r={r - 1} fill="#FF7043" stroke="#E64A19" strokeWidth={size * 0.035} />
      <circle cx={r} cy={r} r={r * 0.78} fill="#FFAB91" />
      {Array.from({ length: segments }, (_, i) => {
        const a = ((i * 360) / segments) * (Math.PI / 180);
        return (
          <line key={i} x1={r} y1={r}
            x2={r + Math.cos(a) * (r * 0.76)} y2={r + Math.sin(a) * (r * 0.76)}
            stroke="#FF7043" strokeWidth={size * 0.035} opacity={0.6}
          />
        );
      })}
      <circle cx={r} cy={r} r={r * 0.12} fill="#FF7043" />
    </svg>
  );
}

function Strawberry({ size = 56 }: { size?: number }) {
  const w = size;
  const h = size * 1.1;
  return (
    <svg width={w} height={h} viewBox="0 0 56 62" style={{ display: 'block' }}>
      {/* leaves */}
      <path d="M28 10 C22 2, 12 4, 14 12 C16 6, 24 8, 28 10Z" fill="#43A047" />
      <path d="M28 10 C34 2, 44 4, 42 12 C40 6, 32 8, 28 10Z" fill="#43A047" />
      <path d="M28 10 C24 0, 28 -4, 32 0 C30 2, 28 6, 28 10Z" fill="#66BB6A" />
      {/* body */}
      <path d="M14 20 C10 28, 12 42, 28 58 C44 42, 46 28, 42 20 C38 14, 18 14, 14 20Z" fill="#E53935" />
      <path d="M16 22 C13 30, 15 42, 28 56 C28 56, 26 40, 24 32 C22 26, 18 22, 16 22Z" fill="#EF5350" opacity={0.5} />
      {/* seeds */}
      {[[22,28],[32,26],[20,36],[30,38],[26,46]].map(([x,y],i) => (
        <ellipse key={i} cx={x} cy={y} rx={1.8} ry={2.5} fill="#FFCDD2" opacity={0.8} transform={`rotate(-15,${x},${y})`} />
      ))}
    </svg>
  );
}

function ChocolateDrop({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 44 62" style={{ display: 'block' }}>
      <path d="M22 4 C22 4, 6 26, 6 38 C6 50, 13 58, 22 58 C31 58, 38 50, 38 38 C38 26, 22 4, 22 4Z"
        fill="#4E342E" stroke="#3E2723" strokeWidth="1.5" />
      <path d="M22 12 C22 12, 10 30, 10 38 C10 48, 15 54, 22 54 C22 54, 18 48, 18 38 C18 30, 22 12, 22 12Z"
        fill="#6D4C41" opacity={0.5} />
      <ellipse cx="27" cy="28" rx="4" ry="7" fill="#795548" opacity={0.35} transform="rotate(-20,27,28)" />
    </svg>
  );
}

// ─── Ingredient configs per product ──────────────────────────────────────────

type IngredientType = 'kiwi' | 'banana' | 'mango' | 'orange' | 'strawberry' | 'choc';

interface IngredientItem {
  type: IngredientType;
  x: number;   // final x offset from center (px)
  y: number;   // final y offset from center (px)
  size: number;
  delay: number;
  rotation: number;
  zFront?: boolean; // render in front of the product image
}

function renderIngredient(type: IngredientType, size: number) {
  switch (type) {
    case 'kiwi': return <KiwiSlice size={size} />;
    case 'banana': return <Banana size={size} />;
    case 'mango': return <MangoSlice size={size} />;
    case 'orange': return <OrangeSlice size={size} />;
    case 'strawberry': return <Strawberry size={size} />;
    case 'choc': return <ChocolateDrop size={size} />;
  }
}

const HERO_PRODUCTS: {
  id: string;
  image: string;
  name: string;
  ingredients: IngredientItem[];
  special?: 'choc-rain';
}[] = [
  {
    id: 'mix-fruit',
    image: mixFruitImg,
    name: 'Mix Fruit Cake',
    ingredients: [
      { type: 'kiwi',    x: -340, y: -60,  size: 62, delay: 0,    rotation: -25,  zFront: false },
      { type: 'kiwi',    x:  300, y:  90,  size: 48, delay: 0.08, rotation:  35,  zFront: true  },
      { type: 'kiwi',    x: -180, y:  180, size: 40, delay: 0.22, rotation:  10,  zFront: false },
      { type: 'banana',  x: -290, y:  110, size: 82, delay: 0.12, rotation: -50,  zFront: false },
      { type: 'banana',  x:  240, y:  160, size: 68, delay: 0.18, rotation:  55,  zFront: true  },
      { type: 'mango',   x:  310, y: -130, size: 58, delay: 0.05, rotation:  20,  zFront: false },
      { type: 'mango',   x: -340, y: -180, size: 46, delay: 0.28, rotation: -40,  zFront: false },
      { type: 'orange',  x: -200, y: -170, size: 54, delay: 0.15, rotation:   0,  zFront: true  },
      { type: 'orange',  x:  360, y:  40,  size: 44, delay: 0.25, rotation:   0,  zFront: false },
      { type: 'orange',  x:  150, y: -200, size: 38, delay: 0.32, rotation:   0,  zFront: true  },
    ],
  },
  {
    id: 'teddy',
    image: teddyCakeImg,
    name: 'Teddy Cake',
    special: 'choc-rain',
    ingredients: [
      { type: 'choc', x: -280, y:  80,  size: 50, delay: 0,    rotation:  10, zFront: false },
      { type: 'choc', x: -140, y:  160, size: 40, delay: 0.1,  rotation: -15, zFront: false },
      { type: 'choc', x:   60, y:  180, size: 44, delay: 0.05, rotation:   5, zFront: true  },
      { type: 'choc', x:  200, y:  100, size: 36, delay: 0.15, rotation:  20, zFront: false },
      { type: 'choc', x:  320, y: -30,  size: 52, delay: 0.08, rotation: -10, zFront: false },
      { type: 'choc', x: -320, y: -50,  size: 42, delay: 0.2,  rotation:  15, zFront: true  },
      { type: 'choc', x:  100, y: -200, size: 34, delay: 0.25, rotation:  -5, zFront: false },
      { type: 'choc', x: -100, y: -180, size: 46, delay: 0.12, rotation:   8, zFront: false },
    ],
  },
  {
    id: 'strawberry',
    image: strawberryCakeImg,
    name: 'Strawberry Cake',
    ingredients: [
      { type: 'strawberry', x: -350, y: -80,  size: 64, delay: 0,    rotation: -20, zFront: false },
      { type: 'strawberry', x:  310, y: -110, size: 52, delay: 0.07, rotation:  25, zFront: false },
      { type: 'strawberry', x: -260, y:  140, size: 56, delay: 0.14, rotation: -40, zFront: false },
      { type: 'strawberry', x:  280, y:  130, size: 60, delay: 0.1,  rotation:  15, zFront: true  },
      { type: 'strawberry', x: -160, y: -200, size: 44, delay: 0.2,  rotation:  -8, zFront: false },
      { type: 'strawberry', x:  360, y:  60,  size: 38, delay: 0.25, rotation:  30, zFront: true  },
      { type: 'strawberry', x:  120, y:  200, size: 48, delay: 0.05, rotation: -25, zFront: false },
      { type: 'strawberry', x: -380, y:  30,  size: 40, delay: 0.3,  rotation:  10, zFront: false },
      { type: 'strawberry', x:  200, y: -200, size: 34, delay: 0.18, rotation: -50, zFront: true  },
    ],
  },
];

// ─── Floating Ingredient ──────────────────────────────────────────────────────

function FloatingIngredient({
  item,
  productKey,
  isChocRain,
}: {
  item: IngredientItem;
  productKey: string;
  isChocRain?: boolean;
}) {
  // For choc-rain: drops fall from very top (high negative y) then settle
  const initialY = isChocRain ? item.y - 600 : 0;

  return (
    <motion.div
      key={`${productKey}-${item.x}-${item.y}`}
      initial={{ x: 0, y: initialY, scale: 0, opacity: 0, rotate: item.rotation - 30 }}
      animate={{
        x: item.x,
        y: item.y,
        scale: 1,
        opacity: [0, 1, 1],
        rotate: item.rotation,
      }}
      exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      transition={{
        delay: item.delay,
        duration: isChocRain ? 0.9 : 0.75,
        ease: isChocRain ? [0.2, 0.8, 0.4, 1.2] : [0.16, 1, 0.3, 1],
        opacity: { duration: 0.3, delay: item.delay },
      }}
      className="absolute pointer-events-none select-none"
      style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
    >
      {/* Gentle floating animation on top of the entrance */}
      <motion.div
        animate={{
          y: [0, -14, 0, 10, 0],
          rotate: [item.rotation, item.rotation + 6, item.rotation - 4, item.rotation],
        }}
        transition={{
          duration: 4 + Math.abs(item.x % 3),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: item.delay + 0.8,
        }}
        style={{
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))',
          marginLeft: -item.size / 2,
          marginTop: -item.size / 2,
        }}
      >
        {renderIngredient(item.type, item.size)}
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
            animate={{ opacity: 0.22, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 2.5 }}
            className="w-[65vw] h-[65vw] rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(345 75% 62%) 0%, transparent 68%)', filter: 'blur(90px)' }}
          />
        </AnimatePresence>
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center px-4">

        {/* ── Composition: text + product + ingredients ── */}
        <div className="relative w-full max-w-5xl flex items-center justify-center" style={{ height: '58vh', minHeight: 360 }}>

          {/* LAYER 1 — back ingredients (behind product) */}
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

          {/* LAYER 2 — brand name outline (behind product) */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-20 pointer-events-none">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[155px] font-serif font-black leading-none tracking-tighter"
              style={{ WebkitTextStroke: '1.5px hsl(345 75% 62% / 0.45)', color: 'transparent' }}
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

          {/* LAYER 4 — front ingredients (in front of product) */}
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

          {/* LAYER 5 — depth overlay on brand name */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-50 pointer-events-none mix-blend-overlay opacity-60">
            <h1
              className="text-[13vw] md:text-[155px] font-serif font-black leading-none tracking-tighter"
              style={{ color: 'hsl(17 46% 8% / 0.5)' }}
            >
              wirinlyy
            </h1>
          </div>

          {/* Product name badge */}
          <div className="absolute bottom-2 right-2 md:right-0 z-60 pointer-events-none">
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

        {/* ── Headline + CTAs ── */}
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

        {/* Dot indicators */}
        <div className="flex gap-2 mt-8 z-30">
          {HERO_PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="rounded-full transition-all duration-400 cursor-hover"
              style={{
                width: i === currentIndex ? 26 : 7,
                height: 7,
                background: i === currentIndex ? 'hsl(345 75% 62%)' : 'hsl(44 30% 55% / 0.28)',
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
            animate={{ y: [0, -(35 + i * 10), 0], x: [0, (i % 2 === 0 ? 1 : -1) * 18, 0] }}
            transition={{ duration: 11 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.4 }}
          />
        ))}
      </div>
    </section>
  );
}
