
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropletIcon, 
  PlayIcon, 
  PauseIcon, 
  ChevronDown, 
  ChevronUp,
  Settings,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const irrigationData = [
  {
    id: 1,
    name: "Zone principale",
    status: "active",
    humidity: 45,
    lastIrrigation: "Aujourd'hui, 08:30",
    nextScheduled: "Aujourd'hui, 18:30",
    flow: 5.2,
  },
  {
    id: 2,
    name: "Parcelle Nord",
    status: "scheduled",
    humidity: 62,
    lastIrrigation: "Hier, 18:30",
    nextScheduled: "Aujourd'hui, 15:00",
    flow: 3.8,
  },
  {
    id: 3,
    name: "Parcelle Sud",
    status: "inactive",
    humidity: 75,
    lastIrrigation: "Hier, 09:45",
    nextScheduled: "Demain, 09:00",
    flow: 4.1,
  },
  {
    id: 4,
    name: "Parcelle Est",
    status: "inactive",
    humidity: 80,
    lastIrrigation: "Avant-hier, 17:15",
    nextScheduled: "Dans 2 jours, 08:00",
    flow: 3.5,
  },
];

const weeklyConsumptionData = [
  { jour: "Lun", volume: 52 },
  { jour: "Mar", volume: 48 },
  { jour: "Mer", volume: 60 },
  { jour: "Jeu", volume: 45 },
  { jour: "Ven", volume: 35 },
  { jour: "Sam", volume: 50 },
  { jour: "Dim", volume: 55 },
];

const Irrigation = () => {
  const [zones, setZones] = useState(irrigationData);
  const [expandedZone, setExpandedZone] = useState<number | null>(null);
  const { toast } = useToast();

  const toggleZoneStatus = (id: number) => {
    const updatedZones = zones.map(zone => {
      if (zone.id === id) {
        const newStatus = zone.status === "active" ? "inactive" : "active";
        
        toast({
          title: `Irrigation ${newStatus === "active" ? "activée" : "désactivée"}`,
          description: `L'irrigation pour ${zone.name} a été ${newStatus === "active" ? "activée" : "désactivée"}.`,
        });
        
        return { ...zone, status: newStatus };
      }
      return zone;
    });
    
    setZones(updatedZones);
  };
  
  const toggleExpandZone = (id: number) => {
    setExpandedZone(expandedZone === id ? null : id);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-agri-green text-white">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            Actif
          </Badge>
        );
      case "scheduled":
        return <Badge className="bg-agri-yellow text-white">Programmé</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactif</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <AppLayout title="Gestion de l'Irrigation">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <p className="text-gray-600">
            Contrôlez et programmez l'irrigation de vos cultures
          </p>
          <Button className="bg-agri-green hover:bg-agri-green-dark">
            <DropletIcon className="h-4 w-4 mr-2" /> Ajouter une zone
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-green-50 border-agri-blue/20">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Consommation aujourd'hui</h3>
              <div className="flex items-center">
                <DropletIcon className="h-8 w-8 text-agri-blue mr-2" />
                <div className="text-3xl font-bold text-agri-blue-dark">120 L</div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-agri-green/20">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Zones actives</h3>
              <div className="flex items-center">
                <PlayIcon className="h-8 w-8 text-agri-green mr-2" />
                <div className="text-3xl font-bold text-agri-green-dark">
                  {zones.filter(z => z.status === "active").length} / {zones.length}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-yellow-50 to-green-50 border-agri-yellow/20">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Humidité moyenne</h3>
              <div className="flex items-center">
                <DropletIcon className="h-8 w-8 text-agri-yellow mr-2" />
                <div className="text-3xl font-bold text-agri-yellow-dark">
                  {Math.round(zones.reduce((sum, zone) => sum + zone.humidity, 0) / zones.length)}%
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-yellow-50 border-agri-green/20">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-600 mb-1">Débit total actif</h3>
              <div className="flex items-center">
                <DropletIcon className="h-8 w-8 text-agri-green mr-2" />
                <div className="text-3xl font-bold text-agri-green-dark">
                  {zones
                    .filter(z => z.status === "active")
                    .reduce((sum, zone) => sum + zone.flow, 0)
                    .toFixed(1)} L/min
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des zones d'irrigation */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Zones d'irrigation</CardTitle>
              <CardDescription>
                Contrôlez l'irrigation de vos différentes parcelles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {zones.map((zone) => (
                <Card key={zone.id} className="overflow-hidden border-l-4 border-l-agri-blue">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div>
                          <h3 className="font-medium">{zone.name}</h3>
                          <div className="text-sm text-gray-500 flex items-center">
                            <DropletIcon className="h-3 w-3 mr-1" /> 
                            {zone.humidity}% d'humidité
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {renderStatusBadge(zone.status)}
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => toggleExpandZone(zone.id)}
                        >
                          {expandedZone === zone.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    {expandedZone === zone.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Dernière irrigation</p>
                            <p className="font-medium">{zone.lastIrrigation}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Prochaine programmée</p>
                            <p className="font-medium">{zone.nextScheduled}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Débit</p>
                            <p className="font-medium">{zone.flow} L/min</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">État du sol</p>
                            <p className="font-medium">
                              {zone.humidity < 30 ? "Sec" : zone.humidity < 60 ? "Modéré" : "Humide"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button
                            variant={zone.status === "active" ? "destructive" : "default"}
                            className={zone.status !== "active" ? "bg-agri-green hover:bg-agri-green-dark" : ""}
                            onClick={() => toggleZoneStatus(zone.id)}
                            size="sm"
                          >
                            {zone.status === "active" ? (
                              <>
                                <PauseIcon className="h-4 w-4 mr-1" /> Arrêter
                              </>
                            ) : (
                              <>
                                <PlayIcon className="h-4 w-4 mr-1" /> Démarrer
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Clock className="h-4 w-4 mr-1" /> Programmer
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-1" /> Paramètres
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
        
        {/* Consommation d'eau et paramètres */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consommation hebdomadaire</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer config={{ 
                  volume: { label: "Volume (L)", theme: { light: "#2196F3", dark: "#1976D2" } },
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyConsumptionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="jour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="volume" name="Volume (L)" fill="#2196F3" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Programme d'irrigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-time">Heure d'irrigation</Label>
                <Input 
                  id="schedule-time"
                  type="time"
                  defaultValue="06:30"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="schedule-duration">Durée (minutes)</Label>
                <Input
                  id="schedule-duration"
                  type="number"
                  placeholder="30"
                  defaultValue="30"
                  min="1"
                  max="180"
                />
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {["L", "M", "M", "J", "V", "S", "D"].map((day, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    className={`${i < 5 ? "bg-agri-green/10 text-agri-green-dark" : ""}`}
                  >
                    {day}
                  </Button>
                ))}
              </div>
              
              <Button className="w-full bg-agri-green hover:bg-agri-green-dark">
                Enregistrer le programme
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Irrigation;
