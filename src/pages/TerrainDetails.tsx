
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPinIcon, DropletIcon, Leaf, CloudRainIcon, ArrowUpRightIcon 
} from "lucide-react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, Area, AreaChart
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface TerrainType {
  id: number;
  nom: string;
  superficie: number;
  cultures: string[];
  etat: string;
  rendement: number;
  humidite: number;
  utilisation: { name: string; value: number }[];
  sante: { mois: string; valeur: number }[];
  historique: { mois: string; rendement: number }[];
  nutriments: { type: string; valeur: number }[];
  irrigation: { zone: string; niveau: number }[];
}

interface TerrainDetailsProps {
  terrain: TerrainType;
  onClose?: () => void;
}

const TerrainDetails = ({ terrain, onClose }: TerrainDetailsProps) => {
  const [activeTab, setActiveTab] = useState("apercu");
  
  const COLORS = ["#4CAF50", "#FFC107", "#FF5722", "#2196F3", "#795548"];
  
  const getEtatClass = (etat: string) => {
    switch (etat) {
      case "excellent": return "text-agri-green-dark";
      case "bon": return "text-agri-green";
      case "attention": return "text-agri-yellow-dark";
      case "critique": return "text-agri-red";
      default: return "text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-agri-green-light/30 to-agri-green/20 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-agri-green-dark">{terrain.nom}</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPinIcon className="h-4 w-4" />
            <span>{terrain.superficie} hectares</span>
          </div>
        </div>
        {onClose && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-500"
            onClick={onClose}
          >
            ✕
          </Button>
        )}
      </div>
      
      <Tabs 
        defaultValue="apercu" 
        value={activeTab}
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <div className="border-b border-gray-200">
          <TabsList className="w-full rounded-none bg-transparent border-b border-transparent h-auto p-0">
            <div className="flex overflow-x-auto scrollbar-hide">
              <TabsTrigger 
                value="apercu"
                className="data-[state=active]:border-b-2 data-[state=active]:border-agri-green data-[state=active]:bg-transparent rounded-none py-3 text-base"
              >
                Aperçu
              </TabsTrigger>
              <TabsTrigger 
                value="cultures"
                className="data-[state=active]:border-b-2 data-[state=active]:border-agri-green data-[state=active]:bg-transparent rounded-none py-3 text-base"
              >
                Cultures
              </TabsTrigger>
              <TabsTrigger 
                value="irrigation"
                className="data-[state=active]:border-b-2 data-[state=active]:border-agri-green data-[state=active]:bg-transparent rounded-none py-3 text-base"
              >
                Irrigation
              </TabsTrigger>
              <TabsTrigger 
                value="nutrition"
                className="data-[state=active]:border-b-2 data-[state=active]:border-agri-green data-[state=active]:bg-transparent rounded-none py-3 text-base"
              >
                Nutrition des sols
              </TabsTrigger>
              <TabsTrigger 
                value="historique"
                className="data-[state=active]:border-b-2 data-[state=active]:border-agri-green data-[state=active]:bg-transparent rounded-none py-3 text-base"
              >
                Historique
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="apercu" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Utilisation des terres */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Utilisation des terres</CardTitle>
                </CardHeader>
                <CardContent>
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
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Indice de santé des cultures</CardTitle>
                </CardHeader>
                <CardContent>
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
          </TabsContent>
          
          <TabsContent value="cultures" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Performance des cultures actuelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {terrain.cultures.map((culture, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col">
                        <div className="flex items-center mb-2">
                          <Leaf className="h-5 w-5 text-agri-green mr-2" />
                          <h3 className="font-semibold">{culture}</h3>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Croissance</span>
                          <span className={getEtatClass(terrain.etat)}>
                            {terrain.etat === "excellent" ? "Excellente" : 
                             terrain.etat === "bon" ? "Bonne" :
                             terrain.etat === "attention" ? "Moyenne" : "Faible"}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-2 rounded-full ${
                                terrain.etat === "excellent" ? "bg-agri-green-dark" : 
                                terrain.etat === "bon" ? "bg-agri-green" :
                                terrain.etat === "attention" ? "bg-agri-yellow-dark" : "bg-agri-red"
                              }`}
                              style={{ 
                                width: `${
                                  terrain.etat === "excellent" ? '90%' : 
                                  terrain.etat === "bon" ? '75%' :
                                  terrain.etat === "attention" ? '50%' : '30%'
                                }` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-64">
                    <ChartContainer config={{ 
                      rendement: { label: "Rendement prévu", theme: { light: "#4CAF50", dark: "#2E7D32" } },
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={terrain.historique}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mois" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="rendement" 
                            stroke="#4CAF50" 
                            activeDot={{ r: 8 }} 
                            name="Rendement (t/ha)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="irrigation" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Système d'irrigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <DropletIcon className="h-5 w-5 text-agri-blue mr-2" />
                        <span className="font-medium">Niveau d'humidité moyen:</span>
                      </div>
                      <span className="font-semibold text-agri-blue-dark">{terrain.humidite}%</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {terrain.irrigation && terrain.irrigation.map((zone, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{zone.zone}</span>
                            <span className={`font-medium ${
                              zone.niveau > 70 ? "text-agri-blue-dark" : 
                              zone.niveau > 50 ? "text-agri-blue" : 
                              zone.niveau > 30 ? "text-agri-yellow-dark" : "text-agri-red"
                            }`}>
                              {zone.niveau}% d'humidité
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full mb-3">
                            <div 
                              className={`h-2 rounded-full ${
                                zone.niveau > 70 ? "bg-agri-blue-dark" : 
                                zone.niveau > 50 ? "bg-agri-blue" : 
                                zone.niveau > 30 ? "bg-agri-yellow-dark" : "bg-agri-red"
                              }`}
                              style={{ width: `${zone.niveau}%` }}
                            />
                          </div>
                          <Button 
                            size="sm" 
                            className={zone.niveau < 50 ? "bg-agri-blue" : "bg-gray-300"}
                            disabled={zone.niveau >= 50}
                          >
                            <DropletIcon className="h-4 w-4 mr-2" />
                            {zone.niveau < 50 ? "Activer l'irrigation" : "Irrigation non nécessaire"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="h-64">
                    <ChartContainer config={{ 
                      humidite: { label: "Humidité", theme: { light: "#2196F3", dark: "#1976D2" } },
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={terrain.sante}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mois" />
                          <YAxis domain={[0, 100]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="valeur" 
                            fill="#2196F3" 
                            stroke="#1976D2" 
                            name="Humidité (%)" 
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Analyse des nutriments du sol</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {terrain.nutriments && terrain.nutriments.map((nutriment, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{nutriment.type}</span>
                          <span className={`font-medium ${
                            nutriment.valeur > 70 ? "text-agri-green-dark" : 
                            nutriment.valeur > 50 ? "text-agri-green" : 
                            nutriment.valeur > 30 ? "text-agri-yellow-dark" : "text-agri-red"
                          }`}>
                            {nutriment.valeur}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              nutriment.valeur > 70 ? "bg-agri-green-dark" : 
                              nutriment.valeur > 50 ? "bg-agri-green" : 
                              nutriment.valeur > 30 ? "bg-agri-yellow-dark" : "bg-agri-red"
                            }`}
                            style={{ width: `${nutriment.valeur}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-64">
                    <ChartContainer config={{ 
                      valeur: { label: "Niveau", theme: { light: "#4CAF50", dark: "#2E7D32" } },
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={terrain.nutriments}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="type" />
                          <YAxis domain={[0, 100]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="valeur" name="Niveau (%)" fill="#8BC34A" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="mt-4">
                    <Button className="bg-agri-green hover:bg-agri-green-dark">
                      <ArrowUpRightIcon className="h-4 w-4 mr-2" />
                      Voir les recommandations d'engrais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="historique" className="mt-0">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Historique des rendements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 mb-6">
                    <ChartContainer config={{ 
                      rendement: { label: "Rendement", theme: { light: "#4CAF50", dark: "#2E7D32" } },
                    }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={terrain.historique}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="mois" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="rendement" 
                            stroke="#4CAF50" 
                            activeDot={{ r: 8 }} 
                            name="Rendement (t/ha)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-3 px-4 font-medium">Période</th>
                          <th className="py-3 px-4 font-medium">Rendement (t/ha)</th>
                          <th className="py-3 px-4 font-medium">Variation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {terrain.historique && terrain.historique.map((item, index, arr) => {
                          const variation = index > 0 
                            ? ((item.rendement - arr[index - 1].rendement) / arr[index - 1].rendement * 100).toFixed(1)
                            : "0";
                          return (
                            <tr key={index} className="border-b border-gray-100">
                              <td className="py-3 px-4">{item.mois}</td>
                              <td className="py-3 px-4 font-medium">{item.rendement}</td>
                              <td className="py-3 px-4">
                                <span className={
                                  Number(variation) > 0 
                                    ? "text-agri-green" 
                                    : Number(variation) < 0 
                                    ? "text-agri-red" 
                                    : "text-gray-500"
                                }>
                                  {Number(variation) > 0 ? "+" : ""}{variation}%
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TerrainDetails;
