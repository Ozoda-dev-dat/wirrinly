import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { OrderModal } from '@/components/OrderModal';

const queryClient = new QueryClient();

function App() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <div className="bg-background min-h-screen text-foreground font-sans antialiased selection:bg-primary/40 selection:text-primary">
          <Navbar onOrderClick={() => setOrderOpen(true)} />

          <main>
            <Hero onOrderClick={() => setOrderOpen(true)} />
            <Products />
            <About />
          </main>

          <Contact onOrderClick={() => setOrderOpen(true)} />
        </div>

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
