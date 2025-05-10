
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, Leaf, DropletIcon, CloudRainIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

// Données fictives pour les graphiques
const cropDistributionData = [
  { name: "Maïs", valeur: 35 },
  { name: "Riz", valeur: 25 },
  { name: "Tomates", valeur: 20 },
  { name: "Oignons", valeur: 15 },
  { name: "Autres", valeur: 5 },
];

const yieldData = [
  { mois: "Jan", rendement: 30, objectif: 35 },
  { mois: "Fév", rendement: 32, objectif: 35 },
  { mois: "Mar", rendement: 34, objectif: 35 },
  { mois: "Avr", rendement: 38, objectif: 40 },
  { mois: "Mai", rendement: 42, objectif: 40 },
  { mois: "Juin", rendement: 40, objectif: 40 },
  { mois: "Juil", rendement: 45, objectif: 45 },
  { mois: "Août", rendement: 48, objectif: 45 },
  { mois: "Sept", rendement: 43, objectif: 45 },
  { mois: "Oct", rendement: 40, objectif: 40 },
  { mois: "Nov", rendement: 35, objectif: 35 },
  { mois: "Déc", rendement: 32, objectif: 35 },
];

const rainData = [
  { date: "01/04", pluie: 0, irrigation: 5 },
  { date: "02/04", pluie: 0, irrigation: 4 },
  { date: "03/04", pluie: 2, irrigation: 2 },
  { date: "04/04", pluie: 10, irrigation: 0 },
  { date: "05/04", pluie: 8, irrigation: 0 },
  { date: "06/04", pluie: 4, irrigation: 1 },
  { date: "07/04", pluie: 0, irrigation: 5 },
];

const COLORS = ["#4CAF50", "#FFC107", "#FF5722", "#2196F3", "#795548"];

const Dashboard = () => {
  const { toast } = useToast();
  const [irrigationActive, setIrrigationActive] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (irrigationActive) {
      const timer = setTimeout(() => {
        setIrrigationActive(false);
        toast({
          title: "Irrigation terminée",
          description: "Le cycle d'irrigation s'est achevé avec succès",
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [irrigationActive, toast]);
  
  const handleIrrigationToggle = () => {
    setIrrigationActive(!irrigationActive);
    
    if (!irrigationActive) {
      toast({
        title: "Irrigation activée",
        description: "Le système d'irrigation a démarré",
      });
    } else {
      toast({
        title: "Irrigation désactivée",
        description: "Le système d'irrigation a été arrêté manuellement",
      });
    }
  };

  // Simplified Card for mobile
  const StatsCard = ({ icon: Icon, title, value, description, color }) => (
    <Card className="dashboard-card">
      <CardContent className={`flex ${isMobile ? 'flex-row items-center justify-between' : 'flex-col items-center justify-center'} p-4`}>
        <div className={`${isMobile ? 'flex items-center' : ''}`}>
          <Icon className={`h-6 w-6 ${isMobile ? 'mr-3' : 'mb-2'} text-${color}`} />
          {!isMobile && <h3 className="dashboard-card-title">{title}</h3>}
        </div>
        <div className={`${isMobile ? 'text-right' : 'text-center'}`}>
          {isMobile && <h3 className="text-sm font-medium text-gray-600">{title}</h3>}
          <p className={`text-xl ${isMobile ? '' : 'text-3xl'} font-bold text-${color}`}>{value}</p>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </CardContent>
    </Card>
  );

  // Mobile-optimized chart components
  const MobileChartSection = ({ title, children }) => {
    if (isMobile) {
      return (
        <Collapsible className="w-full mb-4">
          <Card className="dashboard-card">
            <CardContent className="p-3">
              <CollapsibleTrigger className="flex w-full items-center justify-between">
                <h3 className="dashboard-card-title">{title}</h3>
                <ChartBarIcon className="h-5 w-5 text-gray-500" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3">
                <div className="h-64">
                  {children}
                </div>
              </CollapsibleContent>
            </CardContent>
          </Card>
        </Collapsible>
      );
    }
    
    return (
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <h3 className="dashboard-card-title mb-4">{title}</h3>
          <div className="h-64">
            {children}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Mobile-optimized irrigation control
  const IrrigationControl = () => {
    const content = (
      <div className="flex flex-col items-center justify-between h-64">
        <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center ${irrigationActive ? "bg-agri-blue/10" : "bg-gray-100"}`}>
          {irrigationActive && (
            <>
              <span className="absolute inset-0 rounded-full border-6 border-agri-blue animate-pulse"></span>
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                <div className="absolute inset-0 animate-pulse-green"></div>
              </div>
            </>
          )}
          <DropletIcon className={`h-12 w-12 z-10 ${irrigationActive ? "text-agri-blue animate-bounce" : "text-gray-400"}`} />
        </div>
        <p className="text-base font-medium my-3 text-center">
          {irrigationActive ? "Irrigation en cours..." : "Système d'irrigation inactif"}
        </p>
        <div className="w-full">
          <Button
            onClick={handleIrrigationToggle}
            className={`w-full text-white ${
              irrigationActive
                ? "bg-agri-red hover:bg-agri-red-dark"
                : "bg-agri-green hover:bg-agri-green-dark"
            }`}
          >
            {irrigationActive ? "Désactiver" : "Activer l'irrigation"}
          </Button>
          {irrigationActive && (
            <p className="text-xs text-agri-blue text-center mt-2">
              L'irrigation s'arrêtera automatiquement
            </p>
          )}
        </div>
      </div>
    );

    if (isMobile) {
      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full bg-agri-blue hover:bg-agri-blue-dark text-white mb-4">
              <DropletIcon className="h-5 w-5 mr-2" />
              Contrôle d'irrigation
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <h3 className="text-center text-lg font-semibold mb-4">Contrôle d'irrigation</h3>
              {content}
            </div>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Card className="dashboard-card">
        <CardContent className="p-6">
          <h3 className="dashboard-card-title text-center mb-4">Contrôle d'irrigation</h3>
          {content}
        </CardContent>
      </Card>
    );
  };

  return (
    <AppLayout title="Tableau de Bord">
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatsCard 
          icon={Leaf} 
          title="Cultures" 
          value="5" 
          description="Variétés cultivées" 
          color="agri-green" 
        />
        <StatsCard 
          icon={ChartBarIcon} 
          title="Rendement" 
          value="+8%" 
          description="vs mois dernier" 
          color="agri-yellow" 
        />
        <StatsCard 
          icon={DropletIcon} 
          title="Irrigation" 
          value="12.5L" 
          description="consommés aujourd'hui" 
          color="agri-blue" 
        />
        <StatsCard 
          icon={CloudRainIcon} 
          title="Pluviométrie" 
          value="24mm" 
          description="cette semaine" 
          color="agri-brown" 
        />
      </div>
      
      {isMobile && <IrrigationControl />}
      
      <MobileChartSection title="Distribution des cultures">
        <ChartContainer config={{ 
          mais: { label: "Maïs", theme: { light: "#4CAF50", dark: "#2E7D32" } },
          riz: { label: "Riz", theme: { light: "#FFC107", dark: "#FFA000" } },
          tomates: { label: "Tomates", theme: { light: "#FF5722", dark: "#D32F2F" } },
          oignons: { label: "Oignons", theme: { light: "#2196F3", dark: "#1976D2" } },
          autres: { label: "Autres", theme: { light: "#795548", dark: "#5D4037" } },
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={cropDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={isMobile ? 60 : 80}
                fill="#8884d8"
                dataKey="valeur"
                nameKey="name"
                label={({ name, percent }) => 
                  isMobile ? `${(percent * 100).toFixed(0)}%` : `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {cropDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </MobileChartSection>
      
      <MobileChartSection title="Rendement annuel (t/ha)">
        <ChartContainer config={{ 
          rendement: { label: "Rendement actuel", theme: { light: "#4CAF50", dark: "#2E7D32" } },
          objectif: { label: "Objectif", theme: { light: "#FFC107", dark: "#FFA000" } },
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={isMobile ? yieldData.slice(-6) : yieldData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="mois" tick={{fontSize: isMobile ? 10 : 12}} />
              <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
              <Bar dataKey="rendement" name="Rendement actuel" fill="#4CAF50" />
              <Bar dataKey="objectif" name="Objectif" fill="#FFC107" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </MobileChartSection>
      
      <MobileChartSection title="Pluie vs Irrigation (mm)">
        <ChartContainer config={{ 
          pluie: { label: "Pluie naturelle", theme: { light: "#2196F3", dark: "#1976D2" } },
          irrigation: { label: "Irrigation", theme: { light: "#4CAF50", dark: "#2E7D32" } },
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rainData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{fontSize: isMobile ? 10 : 12}} />
              <YAxis tick={{fontSize: isMobile ? 10 : 12}} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend wrapperStyle={{fontSize: isMobile ? 10 : 12}} />
              <Area type="monotone" dataKey="pluie" name="Pluie naturelle" stackId="1" stroke="#2196F3" fill="#2196F3" />
              <Area type="monotone" dataKey="irrigation" name="Irrigation" stackId="1" stroke="#4CAF50" fill="#4CAF50" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </MobileChartSection>
      
      {!isMobile && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            {/* Empty space for desktop layout balance */}
          </div>
          <IrrigationControl />
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;
