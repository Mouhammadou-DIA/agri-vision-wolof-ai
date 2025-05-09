
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPinIcon, DropletIcon, Info } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Données fictives pour les terrains
const terrains = [
  {
    id: 1,
    nom: "Parcelle Nord",
    superficie: 5.2,
    cultures: ["Maïs", "Haricots"],
    etat: "excellent",
    rendement: 12.5,
    humidite: 78,
    utilisation: [
      { name: "Maïs", value: 60 },
      { name: "Haricots", value: 30 },
      { name: "Jachère", value: 10 },
    ],
    sante: [
      { mois: "Jan", valeur: 85 },
      { mois: "Fév", valeur: 82 },
      { mois: "Mar", valeur: 90 },
      { mois: "Avr", valeur: 92 },
      { mois: "Mai", valeur: 89 },
    ],
  },
  {
    id: 2,
    nom: "Parcelle Sud",
    superficie: 3.8,
    cultures: ["Tomates", "Oignons"],
    etat: "bon",
    rendement: 9.2,
    humidite: 65,
    utilisation: [
      { name: "Tomates", value: 45 },
      { name: "Oignons", value: 35 },
      { name: "Jachère", value: 20 },
    ],
    sante: [
      { mois: "Jan", valeur: 70 },
      { mois: "Fév", valeur: 75 },
      { mois: "Mar", valeur: 78 },
      { mois: "Avr", valeur: 82 },
      { mois: "Mai", valeur: 80 },
    ],
  },
  {
    id: 3,
    nom: "Parcelle Est",
    superficie: 4.5,
    cultures: ["Riz"],
    etat: "attention",
    rendement: 7.8,
    humidite: 55,
    utilisation: [
      { name: "Riz", value: 85 },
      { name: "Jachère", value: 15 },
    ],
    sante: [
      { mois: "Jan", valeur: 68 },
      { mois: "Fév", valeur: 65 },
      { mois: "Mar", valeur: 60 },
      { mois: "Avr", valeur: 65 },
      { mois: "Mai", valeur: 75 },
    ],
  },
  {
    id: 4,
    nom: "Parcelle Ouest",
    superficie: 6.2,
    cultures: ["Sorgho", "Mil"],
    etat: "critique",
    rendement: 5.4,
    humidite: 42,
    utilisation: [
      { name: "Sorgho", value: 40 },
      { name: "Mil", value: 40 },
      { name: "Jachère", value: 20 },
    ],
    sante: [
      { mois: "Jan", valeur: 60 },
      { mois: "Fév", valeur: 55 },
      { mois: "Mar", valeur: 50 },
      { mois: "Avr", valeur: 45 },
      { mois: "Mai", valeur: 55 },
    ],
  },
];

const COLORS = ["#4CAF50", "#FFC107", "#FF5722", "#2196F3", "#795548"];

const Terrains = () => {
  // Fonction pour déterminer les classes CSS basées sur l'état du terrain
  const getEtatClasses = (etat: string) => {
    switch (etat) {
      case "excellent":
        return "text-agri-green-dark";
      case "bon":
        return "text-agri-green";
      case "attention":
        return "text-agri-yellow-dark";
      case "critique":
        return "text-agri-red";
      default:
        return "text-gray-700";
    }
  };

  const getEtatBadgeClasses = (etat: string) => {
    switch (etat) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "bon":
        return "bg-green-50 text-green-700";
      case "attention":
        return "bg-yellow-100 text-yellow-800";
      case "critique":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AppLayout title="Mes Terrains">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <p className="text-gray-600">Visualisez et gérez vos parcelles agricoles</p>
        <Button className="bg-agri-green hover:bg-agri-green-dark">
          <MapPinIcon className="h-4 w-4 mr-2" /> Ajouter une parcelle
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {terrains.map((terrain) => (
          <Card key={terrain.id} className={`terrain-card transition-all hover:shadow-md`}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{terrain.nom}</h3>
                  <p className="text-gray-500 text-sm mb-3">{terrain.superficie} hectares</p>
                </div>
                <Badge className={getEtatBadgeClasses(terrain.etat)}>
                  {terrain.etat === "excellent" && "Excellent"}
                  {terrain.etat === "bon" && "Bon"}
                  {terrain.etat === "attention" && "Attention"}
                  {terrain.etat === "critique" && "Critique"}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {terrain.cultures.map((culture, i) => (
                  <Badge key={i} variant="outline" className="bg-white">
                    {culture}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-white bg-opacity-70 p-2 rounded-md text-center">
                  <p className="text-sm text-gray-600">Rendement</p>
                  <p className={`font-semibold ${getEtatClasses(terrain.etat)}`}>
                    {terrain.rendement} t/ha
                  </p>
                </div>
                <div className="bg-white bg-opacity-70 p-2 rounded-md text-center">
                  <p className="text-sm text-gray-600">Humidité</p>
                  <p className="font-semibold text-agri-blue-dark">
                    {terrain.humidite}%
                  </p>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full border-agri-green text-agri-green hover:bg-agri-green hover:text-white">
                    <Info className="h-4 w-4 mr-2" /> Détails du terrain
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>{terrain.nom} - {terrain.superficie} hectares</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Utilisation des terres */}
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Utilisation des terres</h4>
                        <div className="h-64">
                          <ChartContainer config={{ 
                            mais: { label: "Maïs", theme: { light: "#4CAF50", dark: "#2E7D32" } },
                            tomates: { label: "Tomates", theme: { light: "#FF5722", dark: "#D32F2F" } },
                            riz: { label: "Riz", theme: { light: "#FFC107", dark: "#FFA000" } },
                            oignons: { label: "Oignons", theme: { light: "#2196F3", dark: "#1976D2" } },
                            sorgho: { label: "Sorgho", theme: { light: "#9C27B0", dark: "#7B1FA2" } },
                            haricots: { label: "Haricots", theme: { light: "#009688", dark: "#00796B" } },
                            mil: { label: "Mil", theme: { light: "#607D8B", dark: "#455A64" } },
                            jachere: { label: "Jachère", theme: { light: "#795548", dark: "#5D4037" } },
                          }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={terrain.utilisation}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                  nameKey="name"
                                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                  {terrain.utilisation.map((entry, index) => (
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
                    
                    {/* Santé des cultures */}
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Indice de santé des cultures</h4>
                        <div className="h-64">
                          <ChartContainer config={{ 
                            valeur: { label: "Indice de santé", theme: { light: "#4CAF50", dark: "#2E7D32" } },
                          }}>
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={terrain.sante}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="mois" />
                                <YAxis domain={[0, 100]} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Legend />
                                <Bar dataKey="valeur" name="Indice de santé" fill="#4CAF50" />
                              </BarChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Button className="bg-agri-green hover:bg-agri-green-dark">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      Voir sur la carte
                    </Button>
                    <Button variant="outline" className="border-agri-blue text-agri-blue hover:bg-agri-blue hover:text-white">
                      <DropletIcon className="h-4 w-4 mr-2" />
                      Gérer l'irrigation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default Terrains;
