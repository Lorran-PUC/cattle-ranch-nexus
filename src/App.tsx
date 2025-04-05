
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";

// Layouts
import Layout from "./components/layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Animals from "./pages/Animals";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/animals" element={<Animals />} />
              {/* Adicionar as outras rotas aqui */}
              {/* <Route path="/vaccination" element={<Vaccination />} /> */}
              {/* <Route path="/weights" element={<Weights />} /> */}
              {/* <Route path="/reproduction" element={<Reproduction />} /> */}
              {/* <Route path="/pastures" element={<Pastures />} /> */}
              {/* <Route path="/reports" element={<Reports />} /> */}
              {/* <Route path="/settings" element={<Settings />} /> */}
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
