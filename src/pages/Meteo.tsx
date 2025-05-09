
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import WeatherCard from "@/components/meteo/WeatherCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DropletIcon, CloudRainIcon, MapPinIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Données météo fictives pour la démonstration
const weatherData = [
  {
    date: "2025-04-09",
    temperature: 32,
    humidity: 68,
    rainfall: 0,
    forecast: "sunny"
  },
  {
    date: "2025-04-10",
    temperature: 30,
    humidity: 72,
    rainfall: 0,
    forecast: "cloudy"
  },
  {
    date: "2025-04-11",
    temperature: 28,
    humidity: 80,
    rainfall: 12,
    forecast: "rainy"
  },
  {
    date: "2025-04-12",
    temperature: 29,
    humidity: 75,
    rainfall: 5,
    forecast: "rainy"
  },
  {
    date: "2025-04-13",
    temperature: 31,
    humidity: 70,
    rainfall: 0,
    forecast: "cloudy"
  },
  {
    date: "2025-04-14",
    temperature: 33,
    humidity: 65,
    rainfall: 0,
    forecast: "sunny"
  },
  {
    date: "2025-04-15",
    temperature: 34,
    humidity: 60,
    rainfall: 0,
    forecast: "sunny"
  }
];

// Données sur les nappes phréatiques
const groundwaterData = [
  { mois: "Jan", niveau: 65 },
  { mois: "Fév", niveau: 62 },
  { mois: "Mar", niveau: 58 },
  { mois: "Avr", niveau: 55 },
  { mois: "Mai", niveau: 52 },
  { mois: "Jun", niveau: 48 },
  { mois: "Jul", niveau: 45 },
  { mois: "Aoû", niveau: 48 },
  { mois: "Sep", niveau: 52 },
  { mois: "Oct", niveau: 56 },
  { mois: "Nov", niveau: 60 },
  { mois: "Déc", niveau: 63 }
];

// Prévisions de précipitations
const rainfallForecast = [
  { date: "Sem 1", pluie: 20 },
  { date: "Sem 2", pluie: 35 },
  { date: "Sem 3", pluie: 60 },
  { date: "Sem 4", pluie: 42 },
  { date: "Sem 5", pluie: 28 },
  { date: "Sem 6", pluie: 15 },
];

const Meteo = () => {
  const [selectedLocation, setSelectedLocation] = useState("Zone principale");
  const { toast } = useToast();

  const locations = ["Zone principale", "Parcelle Nord", "Parcelle Sud", "Parcelle Est"];

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    toast({
      title: "Emplacement modifié",
      description: `Données météo actualisées pour ${location}`,
    });
  };

  return (
    <AppLayout title="Météo & Ressources en Eau">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-gray-600">
          Données météorologiques et prévisions pour planifier vos activités agricoles
        </p>
        <div className="flex flex-wrap gap-2">
          {locations.map((location) => (
            <Button
              key={location}
              variant={selectedLocation === location ? "default" : "outline"}
              className={selectedLocation === location ? "bg-agri-green hover:bg-agri-green-dark" : ""}
              onClick={() => handleLocationChange(location)}
              size="sm"
            >
              <MapPinIcon className="h-4 w-4 mr-1" />
              {location}
            </Button>
          ))}
        </div>
      </div>

      {/* Prévisions météo */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Prévisions pour les 7 prochains jours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weatherData.map((day, index) => (
            <WeatherCard key={index} data={day as any} />
          ))}
        </div>
      </div>

      {/* Graphiques et données analytiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Prévisions de précipitations */}
        <Card>
          <CardHeader>
            <CardTitle>Prévisions de précipitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer config={{ 
                pluie: { label: "Précipitations (mm)", theme: { light: "#2196F3", dark: "#1976D2" } },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rainfallForecast}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="pluie" 
                      name="Précipitations (mm)" 
                      stroke="#2196F3" 
                      fill="#2196F3" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Niveau des nappes phréatiques */}
        <Card>
          <CardHeader>
            <CardTitle>Niveau des nappes phréatiques</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer config={{ 
                niveau: { label: "Niveau (m)", theme: { light: "#4CAF50", dark: "#2E7D32" } },
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={groundwaterData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="mois" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="niveau" 
                      name="Niveau (m)" 
                      stroke="#4CAF50" 
                      fill="#4CAF50" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicateurs d'irrigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-agri-blue/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Humidité du sol</p>
                <p className="text-3xl font-bold text-agri-blue-dark">64%</p>
              </div>
              <DropletIcon className="h-12 w-12 text-agri-blue opacity-50" />
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">État actuel:</span> Modérément humide
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Recommandation:</span> Attendre avant d'irriguer
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-agri-green/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Besoin en eau estimé</p>
                <p className="text-3xl font-bold text-agri-green-dark">2.5L/m²</p>
              </div>
              <CloudRainIcon className="h-12 w-12 text-agri-green opacity-50" />
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Période:</span> Prochaines 24h
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Facteur principal:</span> Température élevée
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-green-50 border-agri-yellow/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Indice d'irrigation</p>
                <p className="text-3xl font-bold text-agri-yellow-dark">Modéré</p>
              </div>
              <MapPinIcon className="h-12 w-12 text-agri-yellow opacity-50" />
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Basé sur:</span> Humidité et prévisions
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Évolution:</span> En baisse (précipitations prévues)
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Meteo;
