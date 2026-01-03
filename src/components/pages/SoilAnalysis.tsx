import { motion } from "framer-motion";
import { FlaskConical, Droplets, Leaf, Sun, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const SoilAnalysis = () => {
  const soilMetrics = [
    { name: "pH Level", value: 6.5, optimal: "6.0-7.0", status: "optimal", icon: FlaskConical },
    { name: "Nitrogen (N)", value: 75, unit: "kg/ha", status: "good", icon: Leaf },
    { name: "Phosphorus (P)", value: 45, unit: "kg/ha", status: "low", icon: Sun },
    { name: "Potassium (K)", value: 120, unit: "kg/ha", status: "optimal", icon: Droplets },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "text-leaf bg-leaf/10";
      case "good": return "text-sky bg-sky/10";
      case "low": return "text-harvest bg-harvest/10";
      case "high": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "optimal": return "bg-leaf";
      case "good": return "bg-sky";
      case "low": return "bg-harvest";
      case "high": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">Soil Analysis</h1>
        <p className="text-muted-foreground">
          Understand your soil composition and get recommendations for optimal crop growth
        </p>
      </motion.div>

      {/* Soil Health Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="accent" className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
            <FlaskConical className="w-full h-full" />
          </div>
          <CardHeader>
            <CardTitle className="text-primary-foreground">Overall Soil Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="text-6xl font-bold text-primary-foreground">78%</div>
              <div className="flex-1">
                <p className="text-primary-foreground/90 mb-2">
                  Your soil is in good condition. Some improvements needed in phosphorus levels.
                </p>
                <div className="w-full h-3 bg-primary-foreground/20 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "78%" }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-sun rounded-full"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {soilMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card variant="feature">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(metric.status)}`}>
                      {metric.status.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-medium text-muted-foreground text-sm">{metric.name}</h3>
                  <div className="text-2xl font-bold mt-1">
                    {metric.value}{metric.unit && <span className="text-sm font-normal ml-1">{metric.unit}</span>}
                  </div>
                  {metric.optimal && (
                    <p className="text-xs text-muted-foreground mt-2">Optimal: {metric.optimal}</p>
                  )}
                  <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getProgressColor(metric.status)}`}
                      style={{ width: `${Math.min(metric.value, 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recommendations */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Card variant="warning">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-harvest" />
                Low Phosphorus Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your soil shows low phosphorus levels. This may affect root development and flowering.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Recommended:</strong> Apply bone meal or rock phosphate</p>
                <p><strong>Dosage:</strong> 20-25 kg per hectare</p>
              </div>
              <Button variant="default" size="sm" className="mt-4">
                View Fertilizer Options
              </Button>
            </CardContent>
          </Card>

          <Card variant="success">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Leaf className="w-5 h-5 text-leaf" />
                Suitable Crops
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your soil analysis, these crops will thrive best:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Wheat", "Rice", "Maize", "Soybean", "Cotton"].map((crop) => (
                  <span 
                    key={crop}
                    className="px-3 py-1 bg-leaf/10 text-leaf rounded-full text-sm font-medium"
                  >
                    {crop}
                  </span>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                View Crop Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Test History */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Soil Tests</h2>
          <Button variant="outline" size="sm">Schedule New Test</Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {[
                { date: "Dec 28, 2025", location: "Field A (North)", score: 78, status: "Completed" },
                { date: "Nov 15, 2025", location: "Field B (South)", score: 82, status: "Completed" },
                { date: "Oct 03, 2025", location: "Field A (North)", score: 71, status: "Completed" },
              ].map((test, i) => (
                <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{test.location}</p>
                    <p className="text-sm text-muted-foreground">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{test.score}%</p>
                    <p className="text-xs text-leaf">{test.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default SoilAnalysis;
