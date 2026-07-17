import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { drinks } from '@/lib/data';
import { OrderModal } from './OrderModal';

// Existing fruit assets for floating garnishes
import orangeImg    from '@/assets/fruits/orange.png';
import raspberryImg from '@/assets/fruits/raspberry.png';
import kiwiImg      from '@/assets/fruits/kiwi.png';
import mangoImg     from '@/assets/fruits/mango.png';
import almondImg    from '@/assets/fruits/almond.png';
import chocChunkImg from '@/assets/fruits/choc-chunk.png';
import bananaImg    from '@/assets/fruits/banana.png';

interface Garnish {
  src: string;
  x: number; y: number; size: number;
  delay: number; rot: number;
  dof?: number; front?: boolean;
}

const SCENES: { id: string; garnishes: Garnish[], bgTint: string }[] = [
  /* Peach Ice Tea */
  {
    id: 'peach-ice-tea',
    bgTint: 'hsl(30 60% 97%)', // Warm orange tint
    garnishes: [
      { src: orangeImg,    x: -280, y:  80,  size: 110, delay: 0,    rot: -15, front: false },
      { src: orangeImg,    x:  260, y:  100, size: 90,  delay: 0.12, rot:  20, dof: 1.5, front: true },
      { src: orangeImg,    x: -180, y: -170, size: 75,  delay: 0.28, rot:   5, dof: 2, front: false },
      { src: raspberryImg, x:  200, y: -120, size: 100, delay: 0.08, rot:  10, front: false },
      { src: raspberryImg, x: -320, y: -60,  size: 80,  delay: 0.22, rot: -25, dof: 2, front: false },
      { src: raspberryImg, x:   80, y:  190, size: 70,  delay: 0.35, rot:  30, front: false },
    ],
  },
  /* Puffy Special */
  {
    id: 'puffy-special',
    bgTint: 'hsl(340 60% 97%)', // Pink tint
    garnishes: [
      { src: raspberryImg, x: -260, y:  90,  size: 120, delay: 0,    rot: -20, front: false },
      { src: raspberryImg, x:  240, y:  120, size: 100, delay: 0.1,  rot:  18, dof: 1.5, front: true },
      { src: raspberryImg, x:  -60, y: -180, size: 85,  delay: 0.25, rot:  -8, dof: 1, front: false },
      { src: kiwiImg,      x:  290, y:  -80, size: 90,  delay: 0.07, rot:  25, front: false },
      { src: kiwiImg,      x: -300, y: -130, size: 70,  delay: 0.3,  rot: -35, dof: 2, front: false },
      { src: kiwiImg,      x:  120, y:  200, size: 65,  delay: 0.18, rot:  15, front: false },
    ],
  },
  /* Pink Panda */
  {
    id: 'pink-panda',
    bgTint: 'hsl(340 70% 96%)', // Pink tint
    garnishes: [
      { src: raspberryImg, x: -240, y:  60,  size: 130, delay: 0,    rot:  -5, front: false },
      { src: raspberryImg, x:  230, y:  110, size: 110, delay: 0.08, rot:  14, dof: 2, front: true },
      { src: raspberryImg, x: -100, y: -160, size: 90,  delay: 0.2,  rot: -18, front: false },
      { src: raspberryImg, x:  270, y:  -70, size: 78,  delay: 0.14, rot:  28, dof: 1, front: false },
      { src: orangeImg,    x: -320, y: -100, size: 85,  delay: 0.32, rot: -12, dof: 2.5, front: false },
      { src: orangeImg,    x:   60, y:  200, size: 72,  delay: 0.26, rot:  22, front: false },
    ],
  },
  /* Matcha Can */
  {
    id: 'green-can',
    bgTint: 'hsl(110 40% 97%)', // Green tint
    garnishes: [
      { src: kiwiImg,   x: -260, y:  100, size: 120, delay: 0,    rot: -30, front: false },
      { src: kiwiImg,   x:  250, y:   90, size: 100, delay: 0.1,  rot:  22, dof: 1.5, front: true },
      { src: kiwiImg,   x:  -80, y: -170, size: 85,  delay: 0.22, rot:  10, front: false },
      { src: mangoImg,  x:  300, y:  -90, size: 95,  delay: 0.08, rot: -18, front: false },
      { src: mangoImg,  x: -310, y: -120, size: 75,  delay: 0.3,  rot:  32, dof: 2, front: false },
      { src: bananaImg, x:  100, y:  195, size: 110, delay: 0.18, rot: -40, front: false },
    ],
  },
  /* Orange Lemonade */
  {
    id: 'orange-lemon',
    bgTint: 'hsl(40 60% 96%)', // Orange/Yellow tint
    garnishes: [
      { src: orangeImg,    x: -270, y:   70, size: 115, delay: 0,    rot:   0, front: false },
      { src: orangeImg,    x:  260, y:  100, size: 95,  delay: 0.09, rot:   0, dof: 1.5, front: true },
      { src: orangeImg,    x:  -50, y: -175, size: 80,  delay: 0.24, rot:   0, dof: 1, front: false },
      { src: mangoImg,     x:  305, y:  -85, size: 90,  delay: 0.07, rot: -22, front: false },
      { src: mangoImg,     x: -315, y: -110, size: 72,  delay: 0.32, rot:  18, dof: 2, front: false },
      { src: raspberryImg, x:   90, y:  200, size: 68,  delay: 0.2,  rot:  35, front: false },
    ],
  },
  /* Tiramisu Drink */
  {
    id: 'tiramisu-drink',
    bgTint: 'hsl(20 40% 96%)', // Brown/Warm tint
    garnishes: [
      { src: chocChunkImg, x: -260, y:   80, size: 120, delay: 0,    rot: -20, front: false },
      { src: chocChunkImg, x:  250, y:  110, size: 100, delay: 0.09, rot:  28, dof: 2, front: true },
      { src: chocChunkImg, x:  -70, y: -165, size: 85,  delay: 0.22, rot: -10, front: false },
      { src: almondImg,    x:  300, y:  -85, size: 90,  delay: 0.06, rot:  38, front: false },
      { src: almondImg,    x: -310, y: -110, size: 72,  delay: 0.28, rot: -45, dof: 2, front: false },
      { src: almondImg,    x:   80, y:  195, size: 65,  delay: 0.18, rot:  22, front: false },
    ],
  },
];

function FloatingGarnish({ g, sceneId, factor }: { g: Garnish; sceneId: string; factor: number }) {
  const x    = g.x    * factor;
  const y    = g.y    * factor;
  const size = g.size * factor;
  const startY = y - (400 + Math.random() * 80) * factor;

  return (
    <motion.div
      key={sceneId + g.x + g.y}
      initial={{ x, y: startY, rotate: g.rot + (Math.random() > 0.5 ? 40 : -40), opacity: 0, filter: 'blur(12px)' }}
      animate={{
        x, y: [startY, y + 12 * factor, y],
        rotate: [g.rot + 40, g.rot - 4, g.rot],
        opacity: [0, 1, 1],
        filter: [`blur(12px)`, `blur(${(g.dof ?? 0) + 1}px)`, `blur(${g.dof ?? 0}px)`],
      }}
      exit={{ opacity: 0, y: y + 36 * factor, filter: 'blur(8px)', transition: { duration: 0.4, ease: 'easeIn' } }}
      transition={{
        delay: g.delay, duration: 0.9,
        times: [0, 0.82, 1], ease: ['easeIn', 'easeOut'],
        opacity: { duration: 0.22, delay: g.delay, ease: 'easeOut' },
      }}
      className="absolute pointer-events-none select-none"
      style={{ left: '50%', top: '50%' }}
    >
      <motion.div
        animate={{ y: [0, -7 * factor, 2 * factor, -4 * factor, 0], rotate: [g.rot, g.rot + 3, g.rot - 2, g.rot] }}
        transition={{ duration: 5 + (Math.abs(g.x) % 3), repeat: Infinity, ease: 'easeInOut', delay: g.delay + 1.2 }}
        style={{
          marginLeft: -(size / 2), marginTop: -(size / 2),
          filter: `drop-shadow(0 ${10 * factor}px ${20 * factor}px rgba(0,0,0,0.45))`,
        }}
      >
        <img src={g.src} alt="" width={size} height={size} draggable={false} style={{ objectFit: 'contain', display: 'block' }} />
      </motion.div>
    </motion.div>
  );
}

export function Drinks() {
  const { lang } = useAppStore();
  const [idx, setIdx] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [factor, setFactor] = useState(1);
  const REFERENCE_WIDTH = 860;

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setFactor(Math.min(1, Math.max(0.32, w / REFERENCE_WIDTH)));
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setIdx(p => (p + 1) % drinks.length), 5500);
    return () => clearInterval(iv);
  }, []);

  const drink  = drinks[idx];
  const scene  = SCENES[idx];
  const back   = scene.garnishes.filter(g => !g.front);
  const front  = scene.garnishes.filter(g =>  g.front);
  const compH  = Math.max(240, Math.min(500, 460 * factor + 60));

  const title    = lang === 'uz' ? 'Ichimliklar' : 'Напитки';
  const subtitle = lang === 'uz' ? 'Har bir qultum — alohida zavq' : 'Каждый глоток — особое удовольствие';
  const orderCta = lang === 'uz' ? 'Buyurtma berish' : 'Заказать';

  return (
    <motion.section 
      id="drinks" 
      className="relative min-h-[90dvh] w-full flex flex-col items-center justify-center overflow-hidden py-24 md:py-32 transition-colors duration-1000 ease-in-out"
      style={{ background: scene.bgTint }}
    >
      {/* Section reveal clip-path */}
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="flex flex-col items-center z-10"
      >
        <p className="text-sm font-bold tracking-[0.3em] uppercase mb-2" style={{ color: 'hsl(345 75% 62%)' }}>
          ✦ {title}
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          {subtitle}
        </p>
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={drink.id + '-glow'}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.14, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 2 }}
            className="w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] rounded-full"
            style={{ background: 'radial-gradient(circle, hsl(345 75% 60%) 0%, transparent 70%)', filter: 'blur(80px)' }}
          />
        </AnimatePresence>
      </div>

      <div className="container relative z-10 flex flex-col items-center px-4 w-full">

        {/* Composition */}
        <div
          ref={containerRef}
          className="relative w-full max-w-4xl flex items-center justify-center"
          style={{ height: compH }}
        >
          {/* Back garnishes */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <div key={scene.id + '-back'} className="absolute inset-0 flex items-center justify-center">
                {back.map((g, i) => <FloatingGarnish key={`b-${scene.id}-${i}`} g={g} sceneId={scene.id} factor={factor} />)}
              </div>
            </AnimatePresence>
          </div>

          {/* Brand watermark */}
          <div className="absolute inset-0 flex items-center justify-center select-none z-20 pointer-events-none">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="text-[13vw] md:text-[140px] font-serif font-black leading-none tracking-tighter"
              style={{ WebkitTextStroke: '1.5px hsl(345 75% 62% / 0.22)', color: 'transparent' }}
            >
              drinks
            </motion.h2>
          </div>

          {/* Drink image */}
          <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={drink.id + '-img'}
                src={drink.image}
                alt={drink.name}
                initial={{ opacity: 0, y: 50, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -36, scale: 1.06 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="object-contain relative z-10"
                style={{
                  height: '80%',
                  maxHeight: compH * 0.82,
                  filter: 'drop-shadow(0 24px 50px rgba(0,0,0,0.55))',
                }}
              />
            </AnimatePresence>
          </div>

          {/* Front garnishes */}
          <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
            <AnimatePresence mode="wait">
              <div key={scene.id + '-front'} className="absolute inset-0 flex items-center justify-center">
                {front.map((g, i) => <FloatingGarnish key={`f-${scene.id}-${i}`} g={g} sceneId={scene.id} factor={factor} />)}
              </div>
            </AnimatePresence>
          </div>

          {/* Drink name label with Flip animation */}
          <div className="absolute bottom-0 left-0 right-0 z-[60] pointer-events-none flex flex-col items-center gap-1" style={{ perspective: 1000 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={drink.id + '-label'}
                initial={{ opacity: 0, rotateX: -90, filter: 'blur(6px)' }}
                animate={{ opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, rotateX: 90, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="flex flex-col items-center gap-[3px]"
                style={{ transformOrigin: 'bottom' }}
              >
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="h-px w-10 rounded-full" style={{ background: 'hsl(345 75% 62% / 0.55)' }} />
                <span className="text-xs sm:text-sm md:text-base font-serif font-bold tracking-[0.18em] uppercase"
                  style={{ color: 'hsl(345 75% 75%)' }}>
                  {drink.name}
                </span>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="h-px w-10 rounded-full" style={{ background: 'hsl(345 75% 62% / 0.55)' }} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Price + CTA */}
        <AnimatePresence mode="wait">
          <motion.div
            key={drink.id + '-cta'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col items-center gap-4 mt-6 md:mt-8 z-30"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold font-serif" style={{ color: 'hsl(345 75% 62%)' }}>
                {drink.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground font-medium">UZS</span>
            </div>

            <motion.button
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-8 py-3 text-sm font-bold uppercase tracking-widest text-white rounded-full cursor-hover cursor-magnetic"
              style={{ background: 'hsl(345 75% 62%)' }}
            >
              {orderCta}
            </motion.button>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="flex gap-2 mt-6 z-30">
          {drinks.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="rounded-full transition-all duration-300 cursor-hover"
              style={{
                width: i === idx ? 26 : 7, height: 7,
                background: i === idx ? 'hsl(345 75% 62%)' : 'hsl(345 30% 72% / 0.3)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: 55 + i * 24, height: 55 + i * 24, left: `${(i * 18 + 8) % 88}%`, top: `${(i * 21 + 10) % 80}%`, background: 'hsl(345 75% 62% / 0.035)' }}
            animate={{ y: [0, -(26 + i * 7), 0], x: [0, (i % 2 === 0 ? 1 : -1) * 12, 0] }}
            transition={{ duration: 9 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.3 }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showModal && <OrderModal onClose={() => setShowModal(false)} defaultProduct={drink.id} />}
      </AnimatePresence>
    </motion.section>
  );
}
