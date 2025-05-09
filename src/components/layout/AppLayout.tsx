
import { ReactNode, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, Settings, User, Leaf, DropletIcon, CloudRainIcon, MapPinIcon,
  ChartBarIcon, MessageSquare, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppLayout = ({ children, title = "Dashboard" }: AppLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur AgriVision!",
    });
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null; // Ne rien afficher jusqu'à ce que la vérification d'auth soit terminée
  }

  const menuItems = [
    { name: "Tableau de bord", icon: <ChartBarIcon className="h-5 w-5" />, path: "/dashboard" },
    { name: "Mes terrains", icon: <MapPinIcon className="h-5 w-5" />, path: "/terrains" },
    { name: "Irrigation", icon: <DropletIcon className="h-5 w-5" />, path: "/irrigation" },
    { name: "Cultures", icon: <Leaf className="h-5 w-5" />, path: "/cultures" },
    { name: "Analyse des cultures", icon: <ChartBarIcon className="h-5 w-5" />, path: "/cultures/analyse" },
    { name: "Météo", icon: <CloudRainIcon className="h-5 w-5" />, path: "/meteo" },
    { name: "Assistant IA", icon: <MessageSquare className="h-5 w-5" />, path: "/assistant" },
    { name: "Profil", icon: <User className="h-5 w-5" />, path: "/profil" },
    { name: "Paramètres", icon: <Settings className="h-5 w-5" />, path: "/parametres" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar pour desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-5 border-b border-gray-200">
          <Link to="/dashboard" className="flex items-center">
            <Leaf className="h-6 w-6 text-agri-green mr-2" />
            <h1 className="text-xl font-semibold text-agri-green-dark">AgriVision</h1>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    window.location.pathname === item.path 
                      ? "bg-agri-green/10 text-agri-green-dark" 
                      : "text-gray-700 hover:bg-agri-green/5 hover:text-agri-green-dark"
                  }`}
                  onClick={() => navigate(item.path)}
                  asChild
                >
                  <Link to={item.path}>
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="w-full justify-start text-gray-700"
            onClick={handleLogout}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Header mobile et contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header mobile */}
        <header className="bg-white shadow-sm md:hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
              <Link to="/dashboard" className="flex items-center ml-2">
                <Leaf className="h-5 w-5 text-agri-green mr-1" />
                <h1 className="text-lg font-semibold text-agri-green-dark">AgriVision</h1>
              </Link>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/profil")}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Menu mobile */}
          {isMobileMenuOpen && (
            <nav className="bg-white border-t border-gray-200">
              <ul className="py-2">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start rounded-none ${
                        window.location.pathname === item.path 
                          ? "bg-agri-green/10 text-agri-green-dark" 
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        navigate(item.path);
                        setIsMobileMenuOpen(false);
                      }}
                      asChild
                    >
                      <Link to={item.path}>
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                      </Link>
                    </Button>
                  </li>
                ))}
                <li>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-none text-gray-700"
                    onClick={handleLogout}
                  >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Déconnexion
                  </Button>
                </li>
              </ul>
            </nav>
          )}
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
