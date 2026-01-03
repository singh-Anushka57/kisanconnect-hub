import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "green" | "gold" | "blue" | "orange" | "brown";
  onClick?: () => void;
  delay?: number;
}

const colorStyles = {
  green: {
    iconBg: "bg-leaf/10",
    iconColor: "text-leaf",
    hoverBorder: "hover:border-leaf/30",
  },
  gold: {
    iconBg: "bg-sun/10",
    iconColor: "text-sun",
    hoverBorder: "hover:border-sun/30",
  },
  blue: {
    iconBg: "bg-sky/10",
    iconColor: "text-sky",
    hoverBorder: "hover:border-sky/30",
  },
  orange: {
    iconBg: "bg-harvest/10",
    iconColor: "text-harvest",
    hoverBorder: "hover:border-harvest/30",
  },
  brown: {
    iconBg: "bg-soil/10",
    iconColor: "text-soil",
    hoverBorder: "hover:border-soil/30",
  },
};

const FeatureCard = ({ icon: Icon, title, description, color, onClick, delay = 0 }: FeatureCardProps) => {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        variant="feature" 
        className={`cursor-pointer group h-full ${styles.hoverBorder} border border-transparent`}
        onClick={onClick}
      >
        <CardHeader className="pb-3">
          <div className={`w-14 h-14 rounded-xl ${styles.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-7 h-7 ${styles.iconColor}`} />
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-muted-foreground/80">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" size="sm" className="text-primary group-hover:translate-x-1 transition-transform">
            Explore →
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
