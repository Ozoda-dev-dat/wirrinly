import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { useRef } from 'react';

interface ContactProps {
  onOrderClick: () => void;
}

function MagneticButton({ children, onClick, href, className, style }: any) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const textX = useTransform(springX, [-16, 16], [-6, 6]);
  const textY = useTransform(springY, [-16, 16], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Check distance
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull (up to 16px)
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, x: springX, y: springY }}
      className={`${className} cursor-magnetic relative overflow-hidden group`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span style={{ x: textX, y: textY, display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
        {children}
      </motion.span>
    </Component>
  );
}

export function Contact({ onOrderClick }: ContactProps) {
  const { lang } = useAppStore();
  const t = translations[lang].contact;

  const brand = "wirinlyy";
  const letters = brand.split('');

  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden" style={{ background: 'hsl(340 60% 94%)', borderTop: '1px solid hsl(340 35% 86%)' }}>

      {/* Rose glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-48 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(345 75% 55% / 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">

        {/* Big CTA block */}
        <div className="flex flex-col items-center text-center mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.35em] uppercase"
            style={{ color: 'hsl(345 75% 62%)' }}
          >
            ✦ {lang === 'uz' ? 'Buyurtma bering' : 'Сделайте заказ'}
          </motion.div>

          {/* Letter drop reveal */}
          <div className="flex items-baseline text-5xl md:text-8xl font-serif font-black tracking-tighter">
            {letters.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: -60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 10, 
                delay: letters.length * 0.04 + 0.1 
              }}
              className="inline-block"
              style={{ color: 'hsl(345 75% 62%)' }}
            >
              .
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground max-w-sm"
          >
            {lang === 'uz'
              ? "Mahsulotni tanlab, buyurtma bering. Tez orada siz bilan bog'lanamiz."
              : 'Выберите продукт и оформите заказ. Мы свяжемся с вами в ближайшее время.'}
          </motion.p>

          {/* Two CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            {/* Online order button */}
            <MagneticButton
              onClick={onOrderClick}
              className="px-10 py-5 text-base font-bold uppercase tracking-widest text-white rounded-full shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, hsl(345 75% 52%), hsl(345 75% 68%))',
                boxShadow: '0 20px 60px hsl(345 75% 55% / 0.35)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              {t.order}
            </MagneticButton>

            {/* Telegram button */}
            <MagneticButton
              href="https://t.me/wirinlyy"
              className="px-10 py-5 text-base font-bold uppercase tracking-widest rounded-full"
              style={{
                border: '1px solid hsl(345 75% 62% / 0.4)',
                color: 'hsl(345 75% 72%)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9 22 2z" />
              </svg>
              Telegram
            </MagneticButton>
          </motion.div>
        </div>

        {/* Info row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-12 text-center md:text-left overflow-hidden" style={{ borderTop: '1px solid hsl(340 35% 86%)' }}>
          {[
            {
              title: lang === 'uz' ? 'Aloqa' : 'Контакт',
              content: <a href="https://t.me/wirinlyy" target="_blank" rel="noopener noreferrer" className="text-lg font-serif transition-colors cursor-hover hover:text-primary" style={{ color: 'hsl(345 75% 70%)' }}>@wirinlyy</a>
            },
            {
              title: lang === 'uz' ? 'Ish vaqti' : 'Время работы',
              content: <p className="text-lg font-serif text-foreground">{t.hours}</p>,
              className: "md:text-center"
            },
            {
              title: lang === 'uz' ? 'Manzil' : 'Адрес',
              content: <p className="text-lg font-serif text-foreground">{t.location}</p>,
              className: "md:text-right"
            }
          ].map((block, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={block.className}
            >
              <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3">
                {block.title}
              </h4>
              {block.content}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-xs text-muted-foreground uppercase tracking-widest"
        >
          © {new Date().getFullYear()} wirinlyy.
        </motion.div>
      </div>
    </footer>
  );
}
