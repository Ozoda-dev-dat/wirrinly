import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';

// Product images
import mixFruitImg    from '@assets/Без_названия__5_-removebg-preview_1784184619780.png';
import teddyCakeImg   from '@assets/Без_названия__6_-removebg-preview_1784184619778.png';
import strawberryCakeImg from '@assets/Без_названия__3_-removebg-preview_1784184619781.png';

// Fruit / ingredient photos — transparent background
import kiwiImg       from '@/assets/fruits/kiwi.png';
import bananaImg     from '@/assets/fruits/banana.png';
import mangoImg      from '@/assets/fruits/mango.png';
import orangeImg     from '@/assets/fruits/orange.png';
import raspberryImg  from '@/assets/fruits/raspberry.png';
import chocChunkImg  from '@/assets/fruits/choc-chunk.png';
import almondImg     from '@/assets/fruits/almond.png';

interface HeroProps { onOrderClick: () => void }

// ─── Ingredient definition ────────────────────────────────────────────────────
interface Ing {
  src: string;
  /** Final position relative to scene center (px) — at reference scale 1.0 */
  x: number;
  y: number;
  /** px — larger = closer to camera — at reference scale 1.0 */
  size: number;
  /** seconds */
  delay: number;
  /** final rotation degrees */
  rot: number;
  /** blur px to leave on this item (depth-of-field simulation) */
  dof?: number;
  /** render in front of the product photo */
  front?: boolean;
}

// ─── Per-product scenes ───────────────────────────────────────────────────────
const SCENES: {
  id: string;
  img: string;
  name: string;
  items: Ing[];
}[] = [
  /* ── Mix Fruit Cake ── */
  {
    id: 'mix',
    img: mixFruitImg,
    name: 'Mix Fruit Cake',
    items: [
      { src: bananaImg,  x:  -320, y:  130, size: 170, delay: 0,    rot: -55,  dof: 2.5, front: false },
      { src: bananaImg,  x:   260, y:  145, size: 140, delay: 0.12, rot:  60,  dof: 1.5, front: true  },
      { src: mangoImg,   x:  -270, y:  -30, size: 110, delay: 0.07, rot:  20,  front: false },
      { src: mangoImg,   x:   290, y:  -90, size: 95,  delay: 0.2,  rot: -18,  front: false },
      { src: mangoImg,   x:    60, y:  200, size: 80,  delay: 0.32, rot:  10,  dof: 1,  front: false },
      { src: orangeImg,  x:  -190, y: -175, size: 100, delay: 0.15, rot:   0,  front: false },
      { src: orangeImg,  x:   350, y:   55, size: 85,  delay: 0.25, rot:   0,  dof: 2, front: true  },
      { src: orangeImg,  x:  -380, y:  -90, size: 70,  delay: 0.38, rot:   0,  dof: 3, front: false },
      { src: kiwiImg,    x:  -100, y:  185, size: 95,  delay: 0.1,  rot: -25,  front: false },
      { src: kiwiImg,    x:   330, y: -145, size: 80,  delay: 0.18, rot:  35,  front: false },
      { src: kiwiImg,    x:  -340, y: -200, size: 65,  delay: 0.4,  rot:  12,  dof: 2, front: false },
    ],
  },

  /* ── Teddy Cake ── */
  {
    id: 'teddy',
    img: teddyCakeImg,
    name: 'Teddy Cake',
    items: [
      { src: chocChunkImg, x:  -300, y:   90, size: 145, delay: 0,    rot: -22, dof: 3,  front: false },
      { src: chocChunkImg, x:   270, y:  120, size: 120, delay: 0.08, rot:  30, dof: 2,  front: true  },
      { src: chocChunkImg, x:   -60, y:  210, size: 100, delay: 0.16, rot: -10, dof: 1,  front: false },
      { src: chocChunkImg, x:   190, y:  -80, size: 90,  delay: 0.05, rot:  15,           front: false },
      { src: chocChunkImg, x:  -340, y: -110, size: 75,  delay: 0.28, rot: -35, dof: 2,  front: false },
      { src: chocChunkImg, x:   360, y:  -30, size: 65,  delay: 0.35, rot:  40, dof: 1.5,front: false },
      { src: almondImg, x:  -170, y:  185, size: 80,  delay: 0.12, rot: -40,  front: false },
      { src: almondImg, x:   120, y:  200, size: 68,  delay: 0.22, rot:  25,  front: true  },
      { src: almondImg, x:   310, y:  160, size: 58,  delay: 0.3,  rot: -15,  dof: 1.5, front: false },
      { src: almondImg, x:  -360, y:   50, size: 55,  delay: 0.42, rot:  50,  dof: 2,  front: false },
      { src: almondImg, x:    -5, y: -200, size: 48,  delay: 0.18, rot:  -8,  front: false },
    ],
  },

  /* ── Strawberry Cake ── */
  {
    id: 'strawberry',
    img: strawberryCakeImg,
    name: 'Strawberry Cake',
    items: [
      { src: raspberryImg, x:  -60,  y: -160, size: 160, delay: 0,    rot:  -5, dof: 3,  front: false },
      { src: raspberryImg, x:  170,  y:  -80, size: 135, delay: 0.07, rot:  12, dof: 2,  front: true  },
      { src: raspberryImg, x: -270,  y:   40, size: 115, delay: 0.14, rot: -20, dof: 1.5,front: false },
      { src: raspberryImg, x:  280,  y:  100, size: 100, delay: 0.1,  rot:  28,           front: true  },
      { src: raspberryImg, x: -150,  y:  190, size: 90,  delay: 0.2,  rot:  -8, dof: 1,  front: false },
      { src: raspberryImg, x:  360,  y:  -50, size: 80,  delay: 0.26, rot:  15, dof: 2.5,front: false },
      { src: raspberryImg, x: -380,  y: -120, size: 68,  delay: 0.35, rot: -30, dof: 3,  front: false },
      { src: raspberryImg, x:   90,  y:  200, size: 75,  delay: 0.18, rot:  40,           front: false },
      { src: raspberryImg, x:  -20,  y: -220, size: 58,  delay: 0.4,  rot: -15, dof: 1.5,front: false },
      { src: raspberryImg, x:  320,  y:  185, size: 62,  delay: 0.3,  rot:  22, dof: 1,  front: true  },
    ],
  },
];

// ─── Single falling ingredient ────────────────────────────────────────────────
function FallingItem({ item, sceneId, factor }: { item: Ing; sceneId: string; factor: number }) {
  const x    = item.x    * factor;
  const y    = item.y    * factor;
  const size = item.size * factor;
  const startY = y - (480 + Math.random() * 100) * factor;

  return (
    <motion.div
      key={sceneId + item.x + item.y}
      initial={{
        x,
        y: startY,
        rotate: item.rot + (Math.random() > 0.5 ? 45 : -45),
        opacity: 0,
        filter: 'blur(14px)',
      }}
      animate={{
        x,
        y: [startY, y + 14 * factor, y],
        rotate: [item.rot + (Math.random() > 0.5 ? 45 : -45), item.rot - 5, item.rot],
        opacity: [0, 1, 1],
        filter: [`blur(14px)`, `blur(${(item.dof ?? 0) + 1}px)`, `blur(${item.dof ?? 0}px)`],
      }}
      exit={{
        opacity: 0,
        y: y + 40 * factor,
        filter: 'blur(8px)',
        transition: { duration: 0.4, ease: 'easeIn' },
      }}
      transition={{
        delay: item.delay,
        duration: 0.95,
        times: [0, 0.82, 1],
        ease: ['easeIn', 'easeOut'],
        opacity: { duration: 0.22, delay: item.delay, ease: 'easeOut' },
      }}
      className="absolute pointer-events-none select-none"
      style={{ left: '50%', top: '50%' }}
    >
      {/* Idle float after settling */}
      <motion.div
        animate={{
          y: [0, -8 * factor, 2 * factor, -5 * factor, 0],
          rotate: [item.rot, item.rot + 3, item.rot - 2, item.rot],
        }}
        transition={{
          duration: 5 + (Math.abs(item.x) % 3),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: item.delay + 1.2,
        }}
        style={{
          marginLeft: -(size / 2),
          marginTop: -(size / 2),
          filter: `drop-shadow(0 ${12 * factor}px ${24 * factor}px rgba(0,0,0,0.55))`,
        }}
      >
        <img
          src={item.src}
          alt=""
          width={size}
          height={size}
          draggable={false}
          style={{ objectFit: 'contain', display: 'block' }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero({ onOrderClick }: HeroProps) {
  const { lang } = useAppStore();
  const t = translations[lang].hero;
  const [idx, setIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [factor, setFactor] = useState(1);

  // Reference width for ingredient positions
  const REFERENCE_WIDTH = 860;

  useEffect(() => {
    const updateFactor = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        // Scale down for small screens, cap at 1.0 for large
        setFactor(Math.min(1, Math.max(0.32, w / REFERENCE_WIDTH)));
      }
    };
    updateFactor();
    window.addEventListener('resize', updateFactor);
    return () => window.removeEventListener('resize', updateFactor);
  }, []);

  const scene = SCENES[idx];
  const backItems  = scene.items.filter(i => !i.front);
  const frontItems = scene.items.filter(i =>  i.front);

  useEffect(() => {
    const iv = setInterval(() => setIdx(p => (p + 1) % SCENES.length), 5500);
    return () => clearInterval(iv);
  }, []);

  // Composition height scales with factor
  const compHeight = Math.max(260, Math.min(520, 480 * factor + 60));

  return (
    <section className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background pt-16 md:pt-20">

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id + '-glow'}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.18, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 2.5 }}
            className="w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(345 75% 60%) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </AnimatePresence>
      </div>

      <div className="container relative z-10 flex flex-col items-center justify-center px-4 w-full">

        {/* ── Composition ── */}
        <div
          ref={containerRef}
          className="relative w-full max-w-5xl flex items-center justify-center"
          style={{ height: compHeight }}
        >
          {/* Layer 1 — back ingredients */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <div key={scene.id + '-back'} className="absolute inset-0 flex items-center justify-center">
                {backItems.map((item, i) => (
                  <FallingItem key={`b-${scene.id}-${i}`} item={item} sceneId={scene.id} factor={factor} />
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Layer 2 — brand name outline */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-20 pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13vw] md:text-[152px] font-serif font-black leading-none tracking-tighter"
              style={{ WebkitTextStroke: '1.5px hsl(345 75% 62% / 0.38)', color: 'transparent' }}
            >
              wirinlyy
            </motion.h1>
          </div>

          {/* Layer 3 — product image */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={scene.id + '-img'}
                src={scene.img}
                alt={scene.name}
                initial={{ opacity: 0, y: 50, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40, scale: 1.06 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="object-contain"
                style={{
                  height: '80%',
                  maxHeight: compHeight * 0.82,
                  filter: 'drop-shadow(0 28px 55px rgba(0,0,0,0.72))',
                }}
              />
            </AnimatePresence>
          </div>

          {/* Layer 4 — front ingredients (in front of product) */}
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <AnimatePresence mode="wait">
              <div key={scene.id + '-front'} className="absolute inset-0 flex items-center justify-center">
                {frontItems.map((item, i) => (
                  <FallingItem key={`f-${scene.id}-${i}`} item={item} sceneId={scene.id} factor={factor} />
                ))}
              </div>
            </AnimatePresence>
          </div>

          {/* Layer 5 — text depth blend */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-50 pointer-events-none mix-blend-overlay opacity-50">
            <h1
              className="text-[13vw] md:text-[152px] font-serif font-black leading-none tracking-tighter"
              style={{ color: 'hsl(17 46% 8% / 0.5)' }}
            >
              wirinlyy
            </h1>
          </div>

          {/* Product name */}
          <div className="absolute bottom-0 left-0 right-0 z-[60] pointer-events-none flex flex-col items-center gap-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={scene.id + '-name'}
                initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -14, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col items-center gap-[3px]"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="h-px w-12 rounded-full"
                  style={{ background: 'hsl(345 75% 62% / 0.6)' }}
                />
                <span
                  className="text-xs sm:text-sm md:text-lg font-serif font-bold tracking-[0.18em] uppercase"
                  style={{ color: 'hsl(345 75% 80%)' }}
                >
                  {scene.name}
                </span>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  exit={{ scaleX: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="h-px w-12 rounded-full"
                  style={{ background: 'hsl(345 75% 62% / 0.6)' }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Headline + CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="flex flex-col items-center text-center z-30 mt-4 md:mt-3 px-4 w-full"
        >
          <h2 className="text-lg sm:text-xl md:text-4xl font-serif font-bold text-foreground mb-2 md:mb-3 max-w-2xl leading-snug">
            {t.headline}
          </h2>
          <p className="text-[10px] sm:text-[11px] md:text-sm text-muted-foreground uppercase tracking-[0.25em] md:tracking-[0.3em] mb-6 md:mb-8">
            {t.tagline}
          </p>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <motion.button
              onClick={onOrderClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white rounded-full cursor-hover"
              style={{ background: 'hsl(345 75% 62%)' }}
            >
              {t.cta}
            </motion.button>
            <a
              href="#products"
              className="px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full cursor-hover"
              style={{ border: '1px solid hsl(345 75% 62% / 0.4)', color: 'hsl(345 75% 72%)' }}
            >
              {lang === 'uz' ? "Ko'rish" : 'Смотреть'}
            </a>
          </div>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-5 md:mt-7 z-30 pb-6">
          {SCENES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all duration-300 cursor-hover"
              style={{
                width: i === idx ? 26 : 7,
                height: 7,
                background: i === idx ? 'hsl(345 75% 62%)' : 'hsl(44 30% 55% / 0.25)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Background ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 60 + i * 28,
              height: 60 + i * 28,
              left: `${(i * 16 + 5) % 90}%`,
              top: `${(i * 19 + 7) % 85}%`,
              background: 'hsl(345 75% 62% / 0.04)',
            }}
            animate={{ y: [0, -(30 + i * 8), 0], x: [0, (i % 2 === 0 ? 1 : -1) * 15, 0] }}
            transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
          />
        ))}
      </div>
    </section>
  );
}
