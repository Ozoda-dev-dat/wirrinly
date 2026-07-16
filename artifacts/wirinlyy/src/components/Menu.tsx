import { motion } from 'framer-motion';
import { useAppStore } from '@/store/useAppStore';
import { translations } from '@/lib/translations';
import { coloredCollection } from '@/lib/data';

export function Menu() {
  const { lang } = useAppStore();
  const t = translations[lang].menu;

  const flavors = [
    { key: 'olcha', color: 'bg-red-950', text: 'text-red-400' },
    { key: 'mango', color: 'bg-yellow-950', text: 'text-yellow-400' },
    { key: 'golubika', color: 'bg-indigo-950', text: 'text-indigo-400' },
    { key: 'pista', color: 'bg-green-950', text: 'text-green-400' },
    { key: 'apelsin', color: 'bg-orange-950', text: 'text-orange-400' },
    { key: 'bodom', color: 'bg-stone-900', text: 'text-stone-300' },
  ];

  return (
    <section id="menu" className="relative py-32 md:py-48 bg-card border-y border-border overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="flex flex-col z-10">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-serif font-bold mb-4"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground mb-12"
            >
              {t.subtitle}
            </motion.p>

            <div className="flex flex-col gap-4">
              {flavors.map((flavor, i) => (
                <motion.div
                  key={flavor.key}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="group cursor-hover flex items-center gap-6 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-full ${flavor.color} flex items-center justify-center`}>
                    <div className="w-4 h-4 rounded-full bg-current opacity-50" />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-serif font-bold transition-transform duration-300 group-hover:translate-x-4 ${flavor.text}`}>
                    {t.flavors[flavor.key as keyof typeof t.flavors]}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full aspect-square"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px]" />
            <img 
              src={coloredCollection} 
              alt="Colored Collection"
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl mix-blend-screen"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
