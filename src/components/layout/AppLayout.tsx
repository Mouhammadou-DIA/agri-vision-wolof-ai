import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "./AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppLayout = ({ children, title = "Dashboard" }: AppLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Vérifier l'authentification
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) {
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
          <div className="w-9"></div> {/* Spacer for alignment */}
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
          {children}
        </div>
      </SidebarInset>
    </div>
  );
};

export default AppLayout;
