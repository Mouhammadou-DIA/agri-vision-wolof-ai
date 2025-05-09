
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Terrains from "./pages/Terrains";
import Cultures from "./pages/Cultures";
import CulturesAnalysis from "./pages/CulturesAnalysis";
import Assistant from "./pages/Assistant";
import Meteo from "./pages/Meteo";
import Irrigation from "./pages/Irrigation";
import Profil from "./pages/Profil";
import Parametres from "./pages/Parametres";
import NotFound from "./pages/NotFound";
import { SidebarProvider } from "./components/ui/sidebar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/terrains" element={<Terrains />} />
            <Route path="/cultures" element={<Cultures />} />
            <Route path="/cultures/analyse" element={<CulturesAnalysis />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/meteo" element={<Meteo />} />
            <Route path="/irrigation" element={<Irrigation />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/parametres" element={<Parametres />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
