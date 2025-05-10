
import { ReactNode, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "./AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Menu, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  showLoginButton?: boolean;
}

const AppLayout = ({ children, title = "Dashboard", showLoginButton = false }: AppLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Vérifier l'authentification
    const user = localStorage.getItem("user");
    if (!user && !["/", "/login", "/register"].includes(window.location.pathname)) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated && !["/", "/login", "/register"].includes(window.location.pathname)) {
    return null; // Ne rien afficher jusqu'à ce que la vérification d'auth soit terminée
  }

  // Mobile layout with slide-out menu
  if (isMobile) {
    return (
      <div className="flex min-h-screen w-full flex-col bg-gray-50">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-3 shadow-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] p-0">
              <AppSidebar />
            </SheetContent>
          </Sheet>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          {showLoginButton ? (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <LogIn className="h-5 w-5" />
                <span className="sr-only">Connexion</span>
              </Button>
            </Link>
          ) : (
            <div className="w-9"></div> /* Spacer for alignment */
          )}
        </header>
        
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    );
  }

  // Desktop layout (unchanged)
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <AppSidebar />
      <SidebarInset>
        <div className="px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            {showLoginButton && (
              <Link to="/login">
                <Button className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Button>
              </Link>
            )}
          </div>
          {children}
        </div>
      </SidebarInset>
    </div>
  );
};

export default AppLayout;
