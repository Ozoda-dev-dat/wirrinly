import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';

export function About() {
  const { lang } = useAppStore();
  const t = translations[lang].about;

  return (
    <section id="about" className="relative py-32 md:py-48 bg-background overflow-hidden flex items-center justify-center">
      
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex justify-center items-center">
         <motion.div 
           initial={{ scale: 0.8, rotate: 0 }}
           whileInView={{ scale: 1.2, rotate: 90 }}
           viewport={{ once: true }}
           transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
           className="w-[80vw] h-[80vw] border-[1px] border-primary rounded-full border-dashed"
         />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-4xl text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-primary text-sm tracking-[0.3em] uppercase mb-8"
        >
          {t.title}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight md:leading-tight lg:leading-tight text-foreground mb-12"
        >
          {t.p1}
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto"
        >
          {t.p2}
        </motion.p>
      </div>
    </section>
  );
}
