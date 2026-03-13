import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import HealthExchange from "./pages/HealthExchange";
import Referrals from "./pages/Referrals";
import Analytics from "./pages/Analytics";
import DrugSupply from "./pages/DrugSupply";
import CommunityHealth from "./pages/CommunityHealth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/e-Afya">
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/health-exchange" element={<HealthExchange />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/drug-supply" element={<DrugSupply />} />
            <Route path="/community-health" element={<CommunityHealth />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
