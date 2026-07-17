import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';

export function About() {
  const { lang } = useAppStore();
  const t = translations[lang].about;

  const quoteWords = t.p1.split(' ');

  return (
    <section id="about" className="relative min-h-[100dvh] bg-[hsl(340_25%_14%)] overflow-hidden flex items-center justify-center py-20 text-white">
      
      {/* Grain texture overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.06] mix-blend-screen">
        <svg className="w-full h-full">
          <filter id="noiseDark">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseDark)" />
        </svg>
      </div>

      {/* Cinematic organic blobs */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex justify-center items-center">
         <motion.div 
           animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
           transition={{ duration: 25, ease: "linear", repeat: Infinity }}
           className="absolute w-[60vw] h-[60vw] rounded-full"
           style={{
             background: 'radial-gradient(circle, hsl(345 75% 45%) 0%, transparent 70%)',
             filter: 'blur(100px)'
           }}
         />
         <motion.div 
           animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90], x: [0, 100, 0] }}
           transition={{ duration: 30, ease: "linear", repeat: Infinity }}
           className="absolute w-[50vw] h-[50vw] rounded-full right-[-10%]"
           style={{
             background: 'radial-gradient(circle, hsl(40 80% 60%) 0%, transparent 70%)',
             filter: 'blur(120px)'
           }}
         />
      </div>

      {/* HUGE vertical background text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 0.03, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[22vw] font-serif font-black tracking-tighter leading-none -rotate-90 origin-left"
          style={{ color: 'white' }}
        >
          san'at
        </motion.div>
      </div>

      <div className="container relative z-20 mx-auto px-6 max-w-4xl text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-sm tracking-[0.3em] uppercase mb-12"
          style={{ color: 'hsl(345 75% 62%)' }}
        >
          ✦ {t.title}
        </motion.h2>

        {/* Scattered Word Reveal */}
        <div className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-16 flex flex-wrap justify-center gap-x-[0.3em] gap-y-[0.2em]">
          {quoteWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ 
                opacity: 0, 
                x: (Math.random() - 0.5) * 160, 
                y: (Math.random() - 0.5) * 160,
                rotate: (Math.random() - 0.5) * 50,
                filter: 'blur(10px)'
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0, 
                y: 0,
                rotate: 0,
                filter: 'blur(0px)'
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.4, 
                delay: i * 0.08, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Decorative Line Reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="h-[1px] w-[120px] mb-12 origin-center"
          style={{ background: 'hsl(345 75% 62%)' }}
        />

        {/* Paragraph Fade Up */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-xl font-light max-w-2xl mx-auto"
          style={{ color: 'hsl(340 20% 70%)' }}
        >
          {t.p2}
        </motion.p>
      </div>
    </section>
  );
}
