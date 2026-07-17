import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const p1 = setTimeout(() => setPhase(1), 800);
    const p2 = setTimeout(() => setPhase(2), 1600);
    const p3 = setTimeout(() => setPhase(3), 2200);
    const end = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearTimeout(end);
    };
  }, [onComplete]);

  const brand = "wirinlyy";
  const letters = brand.split('');

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top half split panel */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 bg-background origin-top"
        initial={{ y: 0 }}
        animate={{ y: phase >= 3 ? '-100%' : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Bottom half split panel */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-background origin-bottom"
        initial={{ y: 0 }}
        animate={{ y: phase >= 3 ? '100%' : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {phase === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-[20vw] font-serif font-black text-primary leading-none"
          >
            w
          </motion.div>
        )}

        {(phase === 1 || phase === 2) && (
          <div className="flex text-4xl md:text-7xl font-serif font-black tracking-tighter text-foreground">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, filter: 'blur(8px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.1, delay: i * 0.08 }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        )}

        {phase >= 2 && phase < 3 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="h-[2px] mt-4 w-full origin-left"
            style={{ background: 'hsl(345 75% 62%)' }}
          />
        )}
      </div>
    </motion.div>
  );
}
