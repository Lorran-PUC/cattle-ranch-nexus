
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";

// Auth Context
import { AuthProvider } from "@/context/AuthContext";

// Route Protection
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicOnlyRoute from "@/components/PublicOnlyRoute";

// Layouts
import Layout from "./components/layout/Layout";

// Public Pages
import Presentation from "./pages/Presentation";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";

// Private Pages
import Dashboard from "./pages/Dashboard";
import Animals from "./pages/Animals";
import Vaccination from "./pages/Vaccination";
import Weights from "./pages/Weights";
import Reproduction from "./pages/Reproduction";
import Pastures from "./pages/Pastures";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes - accessible to all users */}
              <Route path="/" element={<PublicOnlyRoute><Presentation /></PublicOnlyRoute>} />
              <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              
              {/* Protected Routes - require authentication */}
              <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/animals" element={<Animals />} />
                <Route path="/vaccination" element={<Vaccination />} />
                <Route path="/weights" element={<Weights />} />
                <Route path="/reproduction" element={<Reproduction />} />
                <Route path="/pastures" element={<Pastures />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              
              {/* Redirect from root to presentation for unauthenticated users 
                  or to dashboard for authenticated users */}
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
