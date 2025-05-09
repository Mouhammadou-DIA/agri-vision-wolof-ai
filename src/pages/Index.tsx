
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-agri-green-dark mb-4">
            AgriVision
          </h1>
          <p className="text-xl text-gray-600">
            Plateforme intelligente pour l'optimisation de la production agricole
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-white to-green-50 shadow-md border-agri-green/20 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="h-32 flex items-center justify-center text-agri-green mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-agri-green-dark">Pour les Agriculteurs</h2>
              <p className="text-gray-600 mb-4">Optimisez votre production, accédez à des outils d'analyse avancés et gérez vos cultures efficacement.</p>
              <Button 
                variant="outline" 
                className="w-full border-agri-green text-agri-green hover:bg-agri-green hover:text-white"
                onClick={() => navigate("/login")}
              >
                Commencer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-yellow-50 shadow-md border-agri-yellow/20 hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="h-32 flex items-center justify-center text-agri-yellow mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 20.5H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v9.5a4 4 0 0 1-4 4Z"></path>
                  <path d="M10 10a3 3 0 1 1 4 3v3h-4v-3a3 3 0 0 1 0-3"></path>
                  <path d="M10 16h4"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-agri-yellow-dark">Pour les Investisseurs</h2>
              <p className="text-gray-600 mb-4">Découvrez des opportunités d'investissement dans l'agriculture et soutenez des projets innovants.</p>
              <Button 
                variant="outline" 
                className="w-full border-agri-yellow text-agri-yellow hover:bg-agri-yellow hover:text-white"
                onClick={() => navigate("/login")}
              >
                Explorer <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            variant="default" 
            size="lg"
            className="bg-agri-green hover:bg-agri-green-dark"
            onClick={() => navigate("/login")}
          >
            Se connecter
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-agri-green text-agri-green hover:bg-agri-green hover:text-white"
            onClick={() => navigate("/register")}
          >
            Créer un compte
          </Button>
        </div>
      </div>
      
      <footer className="w-full mt-20 py-6 px-4 text-center text-gray-500">
        <p>© 2025 AgriVision - Plateforme pour l'optimisation de la production agricole</p>
      </footer>
    </div>
  );
};

export default Index;
