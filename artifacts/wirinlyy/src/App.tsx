import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { Menu } from '@/components/Menu';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        
        {/* Custom cursor only hidden on touch devices ideally, but implemented globally here for the vibe */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <div className="bg-background min-h-screen text-foreground font-sans antialiased selection:bg-primary selection:text-primary-foreground">
          <Navbar />
          
          <main>
            <Hero />
            <Products />
            <Menu />
            <About />
          </main>
          
          <Contact />
        </div>

        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
