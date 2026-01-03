import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, Droplets, Wind, Thermometer } from "lucide-react";

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  rainfall: number;
}

const WeatherWidget = () => {
  // Mock weather data - in production, this would come from an API
  const weather: WeatherData = {
    temperature: 28,
    humidity: 65,
    condition: "Partly Cloudy",
    windSpeed: 12,
    rainfall: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="glass" className="overflow-hidden">
        <div className="gradient-sky absolute inset-0 opacity-20" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sun className="w-5 h-5 text-sun animate-pulse-slow" />
            Today's Weather
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-5xl font-bold text-foreground">
                {weather.temperature}°
              </div>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Cloud className="w-4 h-4" />
                  {weather.condition}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-2 text-sm">
              <Droplets className="w-4 h-4 text-sky" />
              <div>
                <div className="text-muted-foreground">Humidity</div>
                <div className="font-semibold">{weather.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Wind className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="text-muted-foreground">Wind</div>
                <div className="font-semibold">{weather.windSpeed} km/h</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Thermometer className="w-4 h-4 text-harvest" />
              <div>
                <div className="text-muted-foreground">Feels like</div>
                <div className="font-semibold">{weather.temperature + 2}°</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default WeatherWidget;
