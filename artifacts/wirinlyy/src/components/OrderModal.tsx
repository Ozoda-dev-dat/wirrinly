import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { products } from '@/lib/data';

interface OrderModalProps {
  onClose: () => void;
  defaultProduct?: string;
}

export function OrderModal({ onClose, defaultProduct }: OrderModalProps) {
  const { lang } = useAppStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct || products[0].id);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  const product = products.find((p) => p.id === selectedProduct)!;

  const uz = {
    title: 'Buyurtma berish',
    name: 'Ismingiz',
    phone: 'Telefon raqam',
    product: 'Mahsulot',
    qty: 'Miqdor',
    notes: 'Izoh (ixtiyoriy)',
    submit: 'Telegramga yuborish',
    success: 'Buyurtma yuborildi!',
    successSub: "Tez orada @wirinlyy siz bilan bog'lanadi.",
    close: 'Yopish',
    total: 'Jami',
    namePlaceholder: 'Ism Familiya',
    phonePlaceholder: '+998 90 000 00 00',
    notesPlaceholder: 'Maxsus xohish yoki manzil...',
  };

  const ru = {
    title: 'Оформить заказ',
    name: 'Ваше имя',
    phone: 'Номер телефона',
    product: 'Продукт',
    qty: 'Количество',
    notes: 'Примечание (необязательно)',
    submit: 'Отправить в Telegram',
    success: 'Заказ отправлен!',
    successSub: '@wirinlyy свяжется с вами в ближайшее время.',
    close: 'Закрыть',
    total: 'Итого',
    namePlaceholder: 'Имя Фамилия',
    phonePlaceholder: '+998 90 000 00 00',
    notesPlaceholder: 'Особые пожелания или адрес...',
  };

  const t = lang === 'uz' ? uz : ru;
  const total = product.price * qty;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      lang === 'uz'
        ? `🍫 Yangi buyurtma!\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n🎂 Mahsulot: ${product.name}\n🔢 Miqdor: ${qty} ta\n💰 Jami: ${total.toLocaleString()} UZS${notes ? `\n📝 Izoh: ${notes}` : ''}`
        : `🍫 Новый заказ!\n\n👤 Имя: ${name}\n📞 Тел: ${phone}\n🎂 Продукт: ${product.name}\n🔢 Кол-во: ${qty} шт\n💰 Итого: ${total.toLocaleString()} UZS${notes ? `\n📝 Заметка: ${notes}` : ''}`;

    window.open(`https://t.me/wirinlyy?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full md:max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden"
        style={{ background: 'hsl(17 46% 11%)', border: '1px solid hsl(17 40% 22%)' }}
      >
        {/* Rose top accent */}
        <div className="h-1 w-full" style={{ background: 'linear-gradient(to right, hsl(345 75% 55%), hsl(345 75% 72%))' }} />

        {/* Handle */}
        <div className="flex justify-center pt-4 md:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        <div className="p-6 md:p-8">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 flex flex-col items-center gap-4 text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2"
                style={{ background: 'hsl(345 75% 62% / 0.15)' }}
              >
                🍫
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground">{t.success}</h3>
              <p className="text-muted-foreground">{t.successSub}</p>
              <button
                onClick={onClose}
                className="mt-6 px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm text-white cursor-hover"
                style={{ background: 'hsl(345 75% 62%)' }}
              >
                {t.close}
              </button>
            </motion.div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold text-foreground">{t.title}</h2>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-hover"
                  style={{ background: 'hsl(17 46% 16%)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{t.name}</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 transition-all text-sm"
                    style={{
                      background: 'hsl(17 46% 16%)',
                      border: '1px solid hsl(17 40% 26%)',
                      // @ts-ignore
                      '--tw-ring-color': 'hsl(345 75% 62% / 0.5)',
                    }}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{t.phone}</label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 transition-all text-sm"
                    style={{
                      background: 'hsl(17 46% 16%)',
                      border: '1px solid hsl(17 40% 26%)',
                    }}
                  />
                </div>

                {/* Product */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{t.product}</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-foreground outline-none focus:ring-2 transition-all text-sm appearance-none cursor-pointer"
                    style={{
                      background: 'hsl(17 46% 16%)',
                      border: '1px solid hsl(17 40% 26%)',
                    }}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id} style={{ background: 'hsl(17 46% 11%)' }}>
                        {p.name} — {p.price.toLocaleString()} UZS
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{t.qty}</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors cursor-hover text-xl font-bold"
                      style={{ background: 'hsl(17 46% 16%)', border: '1px solid hsl(17 40% 26%)' }}
                    >
                      −
                    </button>
                    <span className="text-2xl font-bold font-serif text-foreground w-8 text-center">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors cursor-hover text-xl font-bold"
                      style={{ background: 'hsl(17 46% 16%)', border: '1px solid hsl(17 40% 26%)' }}
                    >
                      +
                    </button>
                    <div className="ml-auto text-right">
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">{t.total}</div>
                      <div className="text-xl font-bold font-serif" style={{ color: 'hsl(345 75% 62%)' }}>
                        {total.toLocaleString()} UZS
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold tracking-widest uppercase text-muted-foreground">{t.notes}</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.notesPlaceholder}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 transition-all text-sm resize-none"
                    style={{
                      background: 'hsl(17 46% 16%)',
                      border: '1px solid hsl(17 40% 26%)',
                    }}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm text-white cursor-hover mt-2 flex items-center justify-center gap-3"
                  style={{ background: 'linear-gradient(135deg, hsl(345 75% 55%), hsl(345 75% 68%))' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9 22 2z" />
                  </svg>
                  {t.submit}
                </motion.button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
