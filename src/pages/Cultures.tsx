
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Upload, Check, X, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Données fictives pour les résultats d'analyse
const analysisResults = {
  health: 75,
  nutrients: {
    nitrogen: { level: "faible", recommendation: "Ajoutez un engrais riche en azote" },
    phosphorus: { level: "optimal", recommendation: "Niveau adéquat, maintenir" },
    potassium: { level: "élevé", recommendation: "Réduisez l'apport de potassium" },
    calcium: { level: "faible", recommendation: "Ajoutez du calcium, chaux ou gypse" },
    magnesium: { level: "optimal", recommendation: "Niveau adéquat, maintenir" }
  },
  maladies: [
    {
      name: "Oïdium",
      probability: 78,
      description: "Maladie fongique formant un duvet blanc sur les feuilles",
      treatment: "Application de fongicide à base de soufre"
    }
  ],
  pests: [
    {
      name: "Puceron",
      probability: 65,
      description: "Insecte suceur de sève",
      treatment: "Insecticide naturel à base de savon noir"
    }
  ]
};

const Cultures = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          setAnalysisData(null);
        }
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  const analyzeImage = () => {
    if (!selectedImage) {
      toast({
        title: "Erreur",
        description: "Veuillez d'abord sélectionner une image",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simuler une analyse avec un délai
    setTimeout(() => {
      setAnalysisData(analysisResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analyse terminée",
        description: "Les résultats de l'analyse sont disponibles",
      });
    }, 2500);
  };
  
  const getNutrientClass = (level: string) => {
    switch(level) {
      case "faible":
        return "text-agri-red font-medium";
      case "optimal":
        return "text-agri-green font-medium";
      case "élevé":
        return "text-agri-yellow-dark font-medium";
      default:
        return "text-gray-600";
    }
  };

  // Générer des cultures de démonstration
  const demoPlants = [
    { id: 1, name: "Maïs HYV-45", health: 92, status: "excellent", type: "Céréale", plantedDate: "15/01/2025" },
    { id: 2, name: "Tomates Roma", health: 78, status: "bon", type: "Légume", plantedDate: "02/02/2025" },
    { id: 3, name: "Riz IR-504", health: 65, status: "attention", type: "Céréale", plantedDate: "10/01/2025" },
    { id: 4, name: "Haricots verts", health: 45, status: "critique", type: "Légumineuse", plantedDate: "05/02/2025" },
  ];

  return (
    <AppLayout title="Analyse des Cultures">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panneau de gauche: Liste des cultures */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Mes Cultures</CardTitle>
              <CardDescription>Surveillez l'état de vos cultures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {demoPlants.map((plant) => (
                  <Card key={plant.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{plant.name}</h4>
                          <p className="text-sm text-gray-500">{plant.type}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className={`
                            font-medium text-sm
                            ${plant.status === "excellent" ? "text-agri-green-dark" : ""}
                            ${plant.status === "bon" ? "text-agri-green" : ""}
                            ${plant.status === "attention" ? "text-agri-yellow-dark" : ""}
                            ${plant.status === "critique" ? "text-agri-red" : ""}
                          `}>
                            {plant.health}% santé
                          </div>
                          <span className="text-xs text-gray-500">Planté le {plant.plantedDate}</span>
                        </div>
                      </div>
                      <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            plant.health > 80
                              ? "bg-agri-green"
                              : plant.health > 60
                              ? "bg-agri-green-light"
                              : plant.health > 40
                              ? "bg-agri-yellow"
                              : "bg-agri-red"
                          }`}
                          style={{ width: `${plant.health}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-agri-green hover:bg-agri-green-dark">
                <Leaf className="h-4 w-4 mr-2" /> Ajouter une culture
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Panneau de droite: Analyse par vision ordinateur */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des Plantes par Vision</CardTitle>
              <CardDescription>
                Téléchargez une photo de votre plante pour analyser son état de santé et recevoir des recommandations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Plant preview"
                      className="max-h-64 mx-auto rounded-md"
                    />
                    <Button variant="outline" onClick={() => setSelectedImage(null)}>
                      <X className="h-4 w-4 mr-2" /> Supprimer l'image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col items-center text-gray-500">
                      <Upload className="h-16 w-16 text-gray-300" />
                      <p className="mt-2">Cliquez ou glissez une image ici</p>
                      <p className="text-sm text-gray-400">
                        Formats supportés: JPG, PNG (max: 10 MB)
                      </p>
                    </div>
                    <Label htmlFor="picture" className="cursor-pointer text-center">
                      <div className="bg-agri-green text-white px-4 py-2 rounded-md inline-block">
                        Sélectionner une image
                      </div>
                      <Input
                        id="picture"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Label>
                  </div>
                )}
              </div>

              {selectedImage && !analysisData && (
                <Button 
                  className="w-full bg-agri-green hover:bg-agri-green-dark"
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyse en cours..." : "Analyser cette plante"}
                </Button>
              )}
              
              {/* Résultats de l'analyse */}
              {analysisData && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Indice de santé globale</h3>
                      <span className={`text-lg font-bold ${
                        analysisData.health > 80
                          ? "text-agri-green-dark"
                          : analysisData.health > 60
                          ? "text-agri-green"
                          : analysisData.health > 40
                          ? "text-agri-yellow-dark"
                          : "text-agri-red"
                      }`}>
                        {analysisData.health}%
                      </span>
                    </div>
                    <div className="mt-2 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          analysisData.health > 80
                            ? "bg-agri-green-dark"
                            : analysisData.health > 60
                            ? "bg-agri-green"
                            : analysisData.health > 40
                            ? "bg-agri-yellow"
                            : "bg-agri-red"
                        }`}
                        style={{ width: `${analysisData.health}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Nutriments nécessaires</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {Object.entries(analysisData.nutrients).map(([key, value]: [string, any]) => (
                        <Card key={key} className="overflow-hidden">
                          <CardContent className="p-3">
                            <div className="capitalize font-medium">{key}</div>
                            <div className={getNutrientClass(value.level)}>
                              Niveau {value.level}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {value.recommendation}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  
                  {(analysisData.maladies.length > 0 || analysisData.pests.length > 0) && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Problèmes détectés</h3>
                      <div className="space-y-3">
                        {analysisData.maladies.map((maladie: any, index: number) => (
                          <Card key={`maladie-${index}`} className="bg-red-50 border-red-100">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-agri-red-dark">
                                    {maladie.name} <span className="text-sm font-normal">({maladie.probability}% probabilité)</span>
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">{maladie.description}</p>
                                  <p className="text-sm font-medium mt-2">Traitement recommandé:</p>
                                  <p className="text-sm text-gray-800">{maladie.treatment}</p>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="ghost">
                                      <Info className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>{maladie.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <p>{maladie.description}</p>
                                      <div>
                                        <h4 className="font-semibold">Traitement recommandé:</h4>
                                        <p>{maladie.treatment}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold">Prévention:</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                          <li>Maintenir une bonne aération entre les plantes</li>
                                          <li>Éviter d'arroser le feuillage</li>
                                          <li>Pratiquer la rotation des cultures</li>
                                          <li>Enlever les feuilles infectées</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {analysisData.pests.map((pest: any, index: number) => (
                          <Card key={`pest-${index}`} className="bg-orange-50 border-orange-100">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-agri-yellow-dark">
                                    {pest.name} <span className="text-sm font-normal">({pest.probability}% probabilité)</span>
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">{pest.description}</p>
                                  <p className="text-sm font-medium mt-2">Traitement recommandé:</p>
                                  <p className="text-sm text-gray-800">{pest.treatment}</p>
                                </div>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button size="sm" variant="ghost">
                                      <Info className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>{pest.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                      <p>{pest.description}</p>
                                      <div>
                                        <h4 className="font-semibold">Traitement recommandé:</h4>
                                        <p>{pest.treatment}</p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold">Prévention:</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                          <li>Favoriser la présence d'insectes auxiliaires</li>
                                          <li>Utiliser des pièges à phéromones</li>
                                          <li>Pratiquer la rotation des cultures</li>
                                          <li>Installer des filets anti-insectes</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white">
                      <Check className="h-4 w-4 mr-2" /> Enregistrer l'analyse
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedImage(null)}>
                      <X className="h-4 w-4 mr-2" /> Nouvelle analyse
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Cultures;
