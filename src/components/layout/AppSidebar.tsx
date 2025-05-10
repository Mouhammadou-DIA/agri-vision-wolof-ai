
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Leaf,
  ChartBar,
  CloudRain,
  MessageSquare,
  User,
  Settings,
  DropletIcon,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur AgriVision!",
    });
    navigate("/login");
  };

  const menuItems = [
    { name: "Tableau de bord", icon: <LayoutDashboard className="h-5 w-5" />, path: "/dashboard" },
    { name: "Mes terrains", icon: <MapPin className="h-5 w-5" />, path: "/terrains" },
    { name: "Irrigation", icon: <DropletIcon className="h-5 w-5" />, path: "/irrigation" },
    { name: "Cultures", icon: <Leaf className="h-5 w-5" />, path: "/cultures" },
    { name: "Analyse des cultures", icon: <ChartBar className="h-5 w-5" />, path: "/cultures/analyse" },
    { name: "Météo", icon: <CloudRain className="h-5 w-5" />, path: "/meteo" },
    { name: "Assistant IA", icon: <MessageSquare className="h-5 w-5" />, path: "/assistant" },
    { name: "Profil", icon: <User className="h-5 w-5" />, path: "/profil" },
    { name: "Paramètres", icon: <Settings className="h-5 w-5" />, path: "/parametres" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center py-2 px-4">
          <Link to="/dashboard" className="flex items-center">
            <Leaf className="h-6 w-6 text-green-600 mr-2" />
            <h1 className="text-xl font-semibold text-green-800">AgriVision</h1>
          </Link>
          <div className="flex-1" />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent className="pb-12">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.name}
                    isActive={window.location.pathname === item.path}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              tooltip="Déconnexion"
            >
              <LogOut className="h-5 w-5" />
              <span>Déconnexion</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
