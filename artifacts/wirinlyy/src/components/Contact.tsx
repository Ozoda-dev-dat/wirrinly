import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';

interface ContactProps {
  onOrderClick: () => void;
}

export function Contact({ onOrderClick }: ContactProps) {
  const { lang } = useAppStore();
  const t = translations[lang].contact;

  return (
    <footer id="contact" className="relative pt-32 pb-12 overflow-hidden" style={{ background: 'hsl(17 46% 9%)', borderTop: '1px solid hsl(17 40% 18%)' }}>

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

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif font-black tracking-tighter"
          >
            wirinlyy<span style={{ color: 'hsl(345 75% 62%)' }}>.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
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
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            {/* Online order button */}
            <motion.button
              onClick={onOrderClick}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-5 text-base font-bold uppercase tracking-widest text-white rounded-full cursor-hover shadow-2xl"
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
            </motion.button>

            {/* Telegram button */}
            <motion.a
              href="https://t.me/wirinlyy"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-10 py-5 text-base font-bold uppercase tracking-widest rounded-full cursor-hover"
              style={{
                border: '1px solid hsl(345 75% 62% / 0.4)',
                color: 'hsl(345 75% 72%)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9 22 2z" />
              </svg>
              Telegram
            </motion.a>
          </motion.div>
        </div>

        {/* Info row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-12 text-center md:text-left" style={{ borderTop: '1px solid hsl(17 40% 18%)' }}>
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3">
              {lang === 'uz' ? 'Aloqa' : 'Контакт'}
            </h4>
            <a href="https://t.me/wirinlyy" target="_blank" rel="noopener noreferrer"
              className="text-lg font-serif transition-colors cursor-hover hover:text-primary"
              style={{ color: 'hsl(345 75% 70%)' }}
            >
              @wirinlyy
            </a>
          </div>
          <div className="md:text-center">
            <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3">
              {lang === 'uz' ? 'Ish vaqti' : 'Время работы'}
            </h4>
            <p className="text-lg font-serif text-foreground">{t.hours}</p>
          </div>
          <div className="md:text-right">
            <h4 className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-3">
              {lang === 'uz' ? 'Manzil' : 'Адрес'}
            </h4>
            <p className="text-lg font-serif text-foreground">{t.location}</p>
          </div>
        </div>

        <div className="mt-16 text-center text-xs text-muted-foreground uppercase tracking-widest">
          © {new Date().getFullYear()} wirinlyy.
        </div>
      </div>
    </footer>
  );
}
