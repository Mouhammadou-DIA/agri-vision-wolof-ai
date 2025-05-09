
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapPinIcon, DropletIcon, Info, Leaf } from "lucide-react";
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
  Treemap,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import TerrainDetails from "./TerrainDetails";
import CustomTabs from "@/components/ui/custom-tabs";

// Données fictives pour les terrains avec plus de détails sur les surfaces
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
      { name: "Maïs", value: 3.12, percent: 60 },
      { name: "Haricots", value: 1.56, percent: 30 },
      { name: "Jachère", value: 0.52, percent: 10 },
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
      { name: "Tomates", value: 1.71, percent: 45 },
      { name: "Oignons", value: 1.33, percent: 35 },
      { name: "Jachère", value: 0.76, percent: 20 },
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
      { name: "Riz", value: 3.83, percent: 85 },
      { name: "Jachère", value: 0.68, percent: 15 },
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
      { name: "Sorgho", value: 2.48, percent: 40 },
      { name: "Mil", value: 2.48, percent: 40 },
      { name: "Jachère", value: 1.24, percent: 20 },
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

// Préparer les données pour l'affichage par superficie
const prepareSurfaceData = () => {
  const surfaceData = [];
  terrains.forEach(terrain => {
    terrain.utilisation.forEach(usage => {
      surfaceData.push({
        name: `${terrain.nom} - ${usage.name}`,
        size: usage.value,
        terrain: terrain.nom,
        culture: usage.name,
        value: usage.value,
        percent: usage.percent,
        color: usage.name === "Jachère" ? "#795548" : 
               usage.name === "Maïs" ? "#4CAF50" : 
               usage.name === "Haricots" ? "#8BC34A" : 
               usage.name === "Tomates" ? "#FF5722" : 
               usage.name === "Oignons" ? "#2196F3" : 
               usage.name === "Riz" ? "#FFC107" : 
               usage.name === "Sorgho" ? "#9C27B0" : 
               usage.name === "Mil" ? "#607D8B" : "#9E9E9E"
      });
    });
  });
  return surfaceData;
};

const surfaceData = prepareSurfaceData();

const COLORS = ["#4CAF50", "#FFC107", "#FF5722", "#2196F3", "#795548"];

const Terrains = () => {
  const [selectedTerrain, setSelectedTerrain] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState("cards");

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

  // Calculer la superficie totale
  const totalSurface = terrains.reduce((total, terrain) => total + terrain.superficie, 0);

  // Options d'affichage
  const viewOptions = [
    { id: "cards", label: "Cartes", icon: <MapPinIcon className="h-4 w-4" /> },
    { id: "surfaces", label: "Surfaces", icon: <Leaf className="h-4 w-4" /> },
  ];

  const CustomTreemapContent = ({ root, depth, x, y, width, height, index, name, value, payload, fill }: any) => {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill,
            stroke: '#fff',
            strokeWidth: 2,
            strokeOpacity: 1,
            opacity: 0.8,
          }}
        />
        {width > 50 && height > 30 ? (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={12}
            fontWeight={500}
            stroke="none"
          >
            {name.split(' - ')[1]}
          </text>
        ) : null}
        {width > 70 && height > 50 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={10}
            stroke="none"
          >
            {`${value.toFixed(2)} ha`}
          </text>
        ) : null}
      </g>
    );
  };

  return (
    <AppLayout title="Mes Terrains">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <p className="text-gray-600">Visualisez et gérez vos parcelles agricoles</p>
          <p className="text-sm text-agri-green-dark mt-1">
            <span className="font-medium">Surface totale:</span> {totalSurface.toFixed(1)} hectares
          </p>
        </div>
        <div className="flex gap-2">
          <CustomTabs 
            items={viewOptions} 
            defaultValue={viewMode} 
            onChange={setViewMode} 
            variant="pills"
            className="mb-2"
          />
          <Button className="bg-agri-green hover:bg-agri-green-dark">
            <MapPinIcon className="h-4 w-4 mr-2" /> Ajouter une parcelle
          </Button>
        </div>
      </div>
      
      {viewMode === "cards" ? (
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

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Répartition des surfaces</h4>
                  <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden flex">
                    {terrain.utilisation.map((usage, idx) => (
                      <div 
                        key={idx} 
                        className="h-full" 
                        style={{
                          width: `${usage.percent}%`, 
                          backgroundColor: usage.name === "Jachère" ? "#795548" : 
                                          usage.name === "Maïs" ? "#4CAF50" : 
                                          usage.name === "Haricots" ? "#8BC34A" : 
                                          usage.name === "Tomates" ? "#FF5722" : 
                                          usage.name === "Oignons" ? "#2196F3" : 
                                          usage.name === "Riz" ? "#FFC107" : 
                                          usage.name === "Sorgho" ? "#9C27B0" : 
                                          usage.name === "Mil" ? "#607D8B" : "#9E9E9E"
                        }}
                        title={`${usage.name}: ${usage.value.toFixed(2)} ha (${usage.percent}%)`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    {terrain.utilisation.map((usage, idx) => (
                      <div key={idx} className="flex items-center text-xs">
                        <span 
                          className="w-3 h-3 rounded-full inline-block mr-1" 
                          style={{
                            backgroundColor: usage.name === "Jachère" ? "#795548" : 
                                            usage.name === "Maïs" ? "#4CAF50" : 
                                            usage.name === "Haricots" ? "#8BC34A" : 
                                            usage.name === "Tomates" ? "#FF5722" : 
                                            usage.name === "Oignons" ? "#2196F3" : 
                                            usage.name === "Riz" ? "#FFC107" : 
                                            usage.name === "Sorgho" ? "#9C27B0" : 
                                            usage.name === "Mil" ? "#607D8B" : "#9E9E9E"
                          }}
                        ></span>
                        <span>{usage.name}: {usage.value.toFixed(2)} ha</span>
                      </div>
                    ))}
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
      ) : (
        <Card className="w-full">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Répartition des surfaces par culture</h3>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={surfaceData}
                  dataKey="value"
                  aspectRatio={4 / 3}
                  stroke="#fff"
                  fill="#8884d8"
                  content={<CustomTreemapContent />}
                >
                  <Tooltip 
                    formatter={(value: any, name: any, props: any) => {
                      return [`${props.payload.value.toFixed(2)} ha (${props.payload.percent}%)`, 
                              `${props.payload.terrain} - ${props.payload.culture}`];
                    }}
                  />
                </Treemap>
              </ResponsiveContainer>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Légende des cultures</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-agri-green mr-2"></span>
                  <span>Maïs</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-[#8BC34A] mr-2"></span>
                  <span>Haricots</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-agri-red mr-2"></span>
                  <span>Tomates</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-agri-blue mr-2"></span>
                  <span>Oignons</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-agri-yellow mr-2"></span>
                  <span>Riz</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-[#9C27B0] mr-2"></span>
                  <span>Sorgho</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-[#607D8B] mr-2"></span>
                  <span>Mil</span>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-4 h-4 bg-agri-brown mr-2"></span>
                  <span>Jachère</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
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
