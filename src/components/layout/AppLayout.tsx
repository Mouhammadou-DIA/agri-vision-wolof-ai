
import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "./AppSidebar";
import { SidebarInset } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

const AppLayout = ({ children, title = "Dashboard" }: AppLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
