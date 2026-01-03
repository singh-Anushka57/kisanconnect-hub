import { motion } from "framer-motion";
import { Shield, CheckCircle, Calendar, Droplets, Bug, Sun, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PreventionGuide = () => {
  const preventionTips = [
    {
      icon: Calendar,
      title: "Crop Rotation",
      description: "Rotate crops annually to prevent soil-borne diseases and pest buildup",
      tips: [
        "Follow cereals with legumes",
        "Avoid planting same family crops consecutively",
        "Include a fallow period when possible",
      ],
      color: "text-leaf bg-leaf/10",
    },
    {
      icon: Droplets,
      title: "Proper Irrigation",
      description: "Manage water effectively to prevent fungal diseases",
      tips: [
        "Use drip irrigation to avoid leaf wetness",
        "Water early morning so leaves dry quickly",
        "Avoid overwatering - it promotes root rot",
      ],
      color: "text-sky bg-sky/10",
    },
    {
      icon: Bug,
      title: "Integrated Pest Management",
      description: "Use multiple strategies to control pests naturally",
      tips: [
        "Introduce beneficial insects like ladybugs",
        "Use pheromone traps for monitoring",
        "Apply bio-pesticides as first line of defense",
      ],
      color: "text-harvest bg-harvest/10",
    },
    {
      icon: Sun,
      title: "Proper Spacing",
      description: "Ensure adequate spacing for air circulation",
      tips: [
        "Follow recommended plant spacing",
        "Prune dense foliage regularly",
        "Orient rows for maximum sunlight",
      ],
      color: "text-sun bg-sun/10",
    },
  ];

  const seasonalTips = [
    {
      season: "Summer",
      icon: "☀️",
      tips: ["Mulching to retain moisture", "Shade nets for delicate crops", "Frequent irrigation"],
    },
    {
      season: "Monsoon",
      icon: "🌧️",
      tips: ["Proper drainage", "Fungicide application", "Disease monitoring"],
    },
    {
      season: "Winter",
      icon: "❄️",
      tips: ["Frost protection", "Reduce irrigation", "Cold-tolerant varieties"],
    },
    {
      season: "Spring",
      icon: "🌸",
      tips: ["Soil preparation", "Seed treatment", "Early pest control"],
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">Disease Prevention Guide</h1>
        <p className="text-muted-foreground">
          Learn preventive measures to protect your crops and maximize yield
        </p>
      </motion.div>

      {/* Main Prevention Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        {preventionTips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Card variant="feature" className="h-full">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${tip.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                  <CardDescription>{tip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tip.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-leaf mt-0.5 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Seasonal Tips */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Seasonal Prevention Calendar</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonalTips.map((season, index) => (
            <motion.div
              key={season.season}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-2">{season.icon}</div>
                  <h3 className="font-semibold mb-3">{season.season}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {season.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Prevention Checklist */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card variant="success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-leaf" />
              Daily Prevention Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Inspect plants for early disease signs",
                "Check soil moisture levels",
                "Monitor weather forecasts",
                "Remove infected plant parts",
                "Clean farming equipment",
                "Record observations in farm diary",
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 p-3 bg-card rounded-lg border border-leaf/20"
                >
                  <div className="w-5 h-5 rounded border-2 border-leaf flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Button variant="default" className="mt-6">
              Download Complete Checklist
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default PreventionGuide;
