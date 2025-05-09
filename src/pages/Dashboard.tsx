
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBarIcon, Leaf, DropletIcon, CloudRainIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

  return (
    <AppLayout title="Tableau de Bord">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="dashboard-card">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Leaf className="h-10 w-10 text-agri-green mb-2" />
            <h3 className="dashboard-card-title">Cultures</h3>
            <p className="text-3xl font-bold text-agri-green">5</p>
            <p className="text-gray-600 text-sm">Variétés cultivées</p>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <ChartBarIcon className="h-10 w-10 text-agri-yellow mb-2" />
            <h3 className="dashboard-card-title text-agri-yellow-dark">Rendement</h3>
            <p className="text-3xl font-bold text-agri-yellow">+8%</p>
            <p className="text-gray-600 text-sm">par rapport au mois dernier</p>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <DropletIcon className="h-10 w-10 text-agri-blue mb-2" />
            <h3 className="dashboard-card-title text-agri-blue-dark">Irrigation</h3>
            <p className="text-3xl font-bold text-agri-blue">12.5L</p>
            <p className="text-gray-600 text-sm">consommés aujourd'hui</p>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <CloudRainIcon className="h-10 w-10 text-agri-brown mb-2" />
            <h3 className="dashboard-card-title text-agri-brown-dark">Pluviométrie</h3>
            <p className="text-3xl font-bold text-agri-brown">24mm</p>
            <p className="text-gray-600 text-sm">cette semaine</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <h3 className="dashboard-card-title mb-4">Distribution des cultures</h3>
            <div className="h-64">
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
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="valeur"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {cropDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <h3 className="dashboard-card-title mb-4">Rendement annuel (t/ha)</h3>
            <div className="h-64">
              <ChartContainer config={{ 
                rendement: { label: "Rendement actuel", theme: { light: "#4CAF50", dark: "#2E7D32" } },
                objectif: { label: "Objectif", theme: { light: "#FFC107", dark: "#FFA000" } },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="rendement" name="Rendement actuel" fill="#4CAF50" />
                    <Bar dataKey="objectif" name="Objectif" fill="#FFC107" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="dashboard-card lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="dashboard-card-title mb-4">Pluie vs Irrigation (en mm)</h3>
            <div className="h-64">
              <ChartContainer config={{ 
                pluie: { label: "Pluie naturelle", theme: { light: "#2196F3", dark: "#1976D2" } },
                irrigation: { label: "Irrigation", theme: { light: "#4CAF50", dark: "#2E7D32" } },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rainData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area type="monotone" dataKey="pluie" name="Pluie naturelle" stackId="1" stroke="#2196F3" fill="#2196F3" />
                    <Area type="monotone" dataKey="irrigation" name="Irrigation" stackId="1" stroke="#4CAF50" fill="#4CAF50" />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <h3 className="dashboard-card-title text-center mb-4">Contrôle d'irrigation</h3>
            <div className="flex flex-col items-center justify-between h-64">
              <div className={`relative w-32 h-32 rounded-full flex items-center justify-center ${irrigationActive ? "bg-agri-blue/10" : "bg-gray-100"}`}>
                {/* Effet d'eau qui coule quand l'irrigation est active */}
                {irrigationActive && (
                  <>
                    <span className="absolute inset-0 rounded-full border-8 border-agri-blue animate-pulse"></span>
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                      <div className="absolute inset-0 animate-pulse-green"></div>
                    </div>
                  </>
                )}
                <DropletIcon className={`h-16 w-16 z-10 ${irrigationActive ? "text-agri-blue animate-bounce" : "text-gray-400"}`} />
              </div>
              <p className="text-lg font-medium my-4 text-center">
                {irrigationActive 
                  ? "Irrigation en cours..." 
                  : "Système d'irrigation inactif"}
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
                  {irrigationActive ? "Désactiver l'irrigation" : "Activer l'irrigation"}
                </Button>
                {irrigationActive && (
                  <p className="text-sm text-agri-blue text-center mt-2">
                    L'irrigation s'arrêtera automatiquement dans quelques secondes
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
