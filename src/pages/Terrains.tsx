
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import TerrainDetails from "./TerrainDetails";

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
    historique: [
      { mois: "Jan", rendement: 10.2 },
      { mois: "Fév", rendement: 10.8 },
      { mois: "Mar", rendement: 11.5 },
      { mois: "Avr", rendement: 12.1 },
      { mois: "Mai", rendement: 12.5 },
    ],
    nutriments: [
      { type: "Azote", valeur: 75 },
      { type: "Phosphore", valeur: 60 },
      { type: "Potassium", valeur: 85 },
      { type: "Calcium", valeur: 70 },
      { type: "Magnésium", valeur: 65 },
    ],
    irrigation: [
      { zone: "Zone Nord", niveau: 80 },
      { zone: "Zone Sud", niveau: 65 },
      { zone: "Zone Est", niveau: 45 },
      { zone: "Zone Ouest", niveau: 75 },
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
    historique: [
      { mois: "Jan", rendement: 8.0 },
      { mois: "Fév", rendement: 8.4 },
      { mois: "Mar", rendement: 8.7 },
      { mois: "Avr", rendement: 9.0 },
      { mois: "Mai", rendement: 9.2 },
    ],
    nutriments: [
      { type: "Azote", valeur: 60 },
      { type: "Phosphore", valeur: 55 },
      { type: "Potassium", valeur: 70 },
      { type: "Calcium", valeur: 65 },
      { type: "Magnésium", valeur: 60 },
    ],
    irrigation: [
      { zone: "Zone Nord", niveau: 70 },
      { zone: "Zone Sud", niveau: 55 },
      { zone: "Zone Est", niveau: 60 },
      { zone: "Zone Ouest", niveau: 65 },
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
    historique: [
      { mois: "Jan", rendement: 7.2 },
      { mois: "Fév", rendement: 7.0 },
      { mois: "Mar", rendement: 6.8 },
      { mois: "Avr", rendement: 7.3 },
      { mois: "Mai", rendement: 7.8 },
    ],
    nutriments: [
      { type: "Azote", valeur: 45 },
      { type: "Phosphore", valeur: 40 },
      { type: "Potassium", valeur: 55 },
      { type: "Calcium", valeur: 50 },
      { type: "Magnésium", valeur: 45 },
    ],
    irrigation: [
      { zone: "Zone Nord", niveau: 55 },
      { zone: "Zone Sud", niveau: 50 },
      { zone: "Zone Est", niveau: 40 },
      { zone: "Zone Ouest", niveau: 60 },
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
    historique: [
      { mois: "Jan", rendement: 5.8 },
      { mois: "Fév", rendement: 5.5 },
      { mois: "Mar", rendement: 5.2 },
      { mois: "Avr", rendement: 5.0 },
      { mois: "Mai", rendement: 5.4 },
    ],
    nutriments: [
      { type: "Azote", valeur: 30 },
      { type: "Phosphore", valeur: 25 },
      { type: "Potassium", valeur: 35 },
      { type: "Calcium", valeur: 40 },
      { type: "Magnésium", valeur: 30 },
    ],
    irrigation: [
      { zone: "Zone Nord", niveau: 45 },
      { zone: "Zone Sud", niveau: 35 },
      { zone: "Zone Est", niveau: 30 },
      { zone: "Zone Ouest", niveau: 40 },
    ],
  },
];

const COLORS = ["#4CAF50", "#FFC107", "#FF5722", "#2196F3", "#795548"];

const Terrains = () => {
  const [selectedTerrain, setSelectedTerrain] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleOpenDialog = (terrainId: number) => {
    setSelectedTerrain(terrainId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedTerrain(null), 300); // Réinitialisez après la fermeture de l'animation
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

              <Button 
                variant="outline" 
                className="w-full border-agri-green text-agri-green hover:bg-agri-green hover:text-white"
                onClick={() => handleOpenDialog(terrain.id)}
              >
                <Info className="h-4 w-4 mr-2" /> Détails du terrain
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Dialogue de détails du terrain utilisant le composant TerrainDetails */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl">
          {selectedTerrain && (
            <TerrainDetails 
              terrain={terrains.find(t => t.id === selectedTerrain)!} 
              onClose={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Terrains;
