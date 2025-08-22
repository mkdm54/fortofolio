import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CalculatorPage from "./projects/calculator/CalculatorPage";
import AOS from "aos";
import "aos/dist/aos.css"; // Import CSS AOS

import { useEffect } from "react"; // Import useEffect
import { ThemeProvider } from "@/components/ThemeProvider"; // Import ThemeProvider

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durasi animasi dalam ms
      once: true, // Animasi hanya berjalan sekali saat elemen masuk tampilan
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" enableSystem attribute="class">
        <TooltipProvider>
          <Toaster />
          <Sonner
            className="[&>div]:border-2 [&>div]:border-portfolio-black [&>div]:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            toastOptions={{
              className: "group toast",
              descriptionClassName: "toast-[description]",
            }}
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects/calculator" element={<CalculatorPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;