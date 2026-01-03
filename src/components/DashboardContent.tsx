import { motion } from "framer-motion";
import { 
  Bug, 
  FlaskConical, 
  Pill, 
  Shield, 
  ShoppingBag, 
  Camera
} from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import WeatherWidget from "@/components/WeatherWidget";
import MarketPricesWidget from "@/components/MarketPricesWidget";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";

interface DashboardContentProps {
  onSectionChange: (section: string) => void;
}

const DashboardContent = ({ onSectionChange }: DashboardContentProps) => {
  const features = [
    {
      id: "disease",
      icon: Bug,
      title: "Crop Disease Detection",
      description: "Upload crop photos for AI-powered disease identification and instant diagnosis",
      color: "orange" as const,
    },
    {
      id: "soil",
      icon: FlaskConical,
      title: "Soil Analysis",
      description: "Analyze soil health, pH levels, and nutrient content for optimal crop growth",
      color: "brown" as const,
    },
    {
      id: "medicine",
      icon: Pill,
      title: "Medicine Recommendations",
      description: "Get personalized treatment recommendations based on detected diseases",
      color: "blue" as const,
    },
    {
      id: "prevention",
      icon: Shield,
      title: "Prevention Guide",
      description: "Learn preventive measures to protect your crops from common diseases",
      color: "green" as const,
    },
    {
      id: "market",
      icon: ShoppingBag,
      title: "Market Access",
      description: "Connect with buyers, check prices, and sell your produce at best rates",
      color: "gold" as const,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Smart Farming" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>
        <div className="relative z-10 p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Welcome Back, Ramesh! 🌾
            </h1>
            <p className="text-primary-foreground/90 text-lg mb-6">
              Your smart farming companion is here to help you grow better crops with AI-powered insights.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="accent" 
                size="lg"
                onClick={() => onSectionChange("disease")}
                className="gap-2"
              >
                <Camera className="w-5 h-5" />
                Scan Crop Now
              </Button>
              <Button 
                variant="glass" 
                size="lg"
                onClick={() => onSectionChange("soil")}
              >
                Check Soil Health
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Farm Overview</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Active Crops"
            value="12"
            subtitle="Across 5 hectares"
            icon="crops"
          />
          <StatsCard
            title="Crop Health"
            value="94%"
            subtitle="Overall healthy"
            icon="health"
          />
          <StatsCard
            title="Active Alerts"
            value="2"
            subtitle="Needs attention"
            icon="alerts"
          />
          <StatsCard
            title="Tasks Done"
            value="8/10"
            subtitle="This week"
            icon="tasks"
          />
        </div>
      </section>

      {/* Weather & Market */}
      <section className="grid lg:grid-cols-2 gap-6">
        <WeatherWidget />
        <MarketPricesWidget />
      </section>

      {/* Main Features */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Farm Tools</h2>
          <span className="text-sm text-muted-foreground">AI-Powered Features</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              onClick={() => onSectionChange(feature.id)}
              delay={index * 0.1}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardContent;
