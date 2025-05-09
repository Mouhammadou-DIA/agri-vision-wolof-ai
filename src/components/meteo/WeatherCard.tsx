
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudRainIcon, CloudSunIcon, DropletIcon } from "lucide-react";

interface WeatherDataType {
  date: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: "sunny" | "cloudy" | "rainy" | "stormy";
}

interface WeatherCardProps {
  data: WeatherDataType;
  showTitle?: boolean;
}

const WeatherCard = ({ data, showTitle = true }: WeatherCardProps) => {
  // Déterminer l'icône météo en fonction des prévisions
  const renderWeatherIcon = (forecast: string) => {
    switch (forecast) {
      case "sunny":
        return <CloudSunIcon className="h-10 w-10 text-agri-yellow" />;
      case "cloudy":
        return <CloudSunIcon className="h-10 w-10 text-gray-500" />;
      case "rainy":
        return <CloudRainIcon className="h-10 w-10 text-agri-blue" />;
      case "stormy":
        return <CloudRainIcon className="h-10 w-10 text-agri-blue-dark" />;
      default:
        return <CloudSunIcon className="h-10 w-10 text-agri-yellow" />;
    }
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  return (
    <Card className="overflow-hidden">
      {showTitle && (
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{formatDate(data.date)}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={!showTitle ? "pt-4" : ""}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {renderWeatherIcon(data.forecast)}
            <div>
              <div className="text-2xl font-bold">{data.temperature}°C</div>
              <div className="text-sm text-gray-500 capitalize">
                {data.forecast === "sunny" && "Ensoleillé"}
                {data.forecast === "cloudy" && "Nuageux"}
                {data.forecast === "rainy" && "Pluvieux"}
                {data.forecast === "stormy" && "Orageux"}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <DropletIcon className="h-4 w-4 mr-1 text-agri-blue" />
              <span>{data.humidity}% d'humidité</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <CloudRainIcon className="h-4 w-4 mr-1 text-agri-blue" />
              <span>{data.rainfall} mm de pluie</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
