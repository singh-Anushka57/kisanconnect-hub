import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Activity, AlertTriangle, CheckCircle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: "crops" | "health" | "alerts" | "tasks";
  trend?: "up" | "down" | "neutral";
}

const iconMap = {
  crops: Sprout,
  health: Activity,
  alerts: AlertTriangle,
  tasks: CheckCircle,
};

const colorMap = {
  crops: "text-leaf bg-leaf/10",
  health: "text-sky bg-sky/10",
  alerts: "text-harvest bg-harvest/10",
  tasks: "text-primary bg-primary/10",
};

const StatsCard = ({ title, value, subtitle, icon, trend }: StatCardProps) => {
  const Icon = iconMap[icon];
  const colorClass = colorMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="default" className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
          <Icon className="w-full h-full" />
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <div className={`p-2 rounded-lg ${colorClass}`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
