import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';

import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { Drinks } from '@/components/Drinks';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { OrderModal } from '@/components/OrderModal';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Marquee } from '@/components/Marquee';
import { useLenis } from '@/hooks/useLenis';

const queryClient = new QueryClient();

function App() {
  useLenis();
  const [orderOpen, setOrderOpen] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem('wirinlyy_loaded');
    if (!hasLoaded) {
      setShowLoading(true);
      sessionStorage.setItem('wirinlyy_loaded', 'true');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] z-[9500] origin-left"
          style={{
            scaleX: scrollYProgress,
            background: 'linear-gradient(to right, hsl(345 75% 55%), hsl(20 80% 70%))',
          }}
        />

        <div className="bg-background min-h-screen text-foreground font-sans antialiased selection:bg-primary/40 selection:text-primary">
          <Navbar onOrderClick={() => setOrderOpen(true)} />

          <main>
            <Hero onOrderClick={() => setOrderOpen(true)} />
            <Marquee />
            <Products />
            <Marquee />
            <Drinks />
            <About />
          </main>

          <Contact onOrderClick={() => setOrderOpen(true)} />
        </div>

        <AnimatePresence>
          {showLoading && (
            <LoadingScreen onComplete={() => setShowLoading(false)} />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {orderOpen && (
            <OrderModal onClose={() => setOrderOpen(false)} />
          )}
        </AnimatePresence>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
