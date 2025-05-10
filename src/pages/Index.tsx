
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-green-800 mb-3">
            AgriVision
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Plateforme intelligente pour l'optimisation de la production agricole
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <Card className="bg-gradient-to-br from-white to-green-50 shadow-md border-green-200 hover:shadow-lg transition-all">
            <CardContent className="p-4">
              <div className="h-16 md:h-20 flex items-center justify-center text-green-600 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h2 className="text-lg md:text-xl font-semibold mb-2 text-green-800">Pour les Agriculteurs</h2>
              <p className="text-gray-600 mb-4 text-xs md:text-sm">Optimisez votre production et gérez vos cultures efficacement.</p>
              <Button 
                variant="outline" 
                className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                onClick={() => navigate("/login")}
              >
                Commencer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            variant="default" 
            size="lg"
            className="bg-green-600 hover:bg-green-700 w-full py-5 md:py-6 text-base"
            onClick={() => navigate("/login")}
          >
            Se connecter
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white w-full py-5 md:py-6 text-base"
            onClick={() => navigate("/register")}
          >
            Créer un compte
          </Button>
        </div>
      </div>
      
      <footer className="w-full mt-8 py-4 px-4 text-center text-gray-500 text-xs md:text-sm">
        <p>© 2025 AgriVision - Plateforme pour l'optimisation de la production agricole</p>
      </footer>
    </div>
  );
};

export default Index;
