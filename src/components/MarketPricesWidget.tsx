import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MarketPrice {
  crop: string;
  price: number;
  unit: string;
  change: number;
}

const MarketPricesWidget = () => {
  const prices: MarketPrice[] = [
    { crop: "Wheat", price: 2450, unit: "quintal", change: 2.5 },
    { crop: "Rice", price: 3200, unit: "quintal", change: -1.2 },
    { crop: "Cotton", price: 6800, unit: "quintal", change: 4.8 },
    { crop: "Sugarcane", price: 350, unit: "quintal", change: 0 },
  ];

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-leaf" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-destructive" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-leaf";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card variant="default" className="h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sun animate-pulse" />
            Live Market Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prices.map((item, index) => (
              <motion.div
                key={item.crop}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div>
                  <div className="font-medium">{item.crop}</div>
                  <div className="text-xs text-muted-foreground">per {item.unit}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{item.price.toLocaleString()}</div>
                  <div className={`text-xs flex items-center gap-1 justify-end ${getTrendColor(item.change)}`}>
                    {getTrendIcon(item.change)}
                    {item.change > 0 ? "+" : ""}{item.change}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketPricesWidget;
