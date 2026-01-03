import { motion } from "framer-motion";
import { Pill, Search, AlertCircle, CheckCircle, Clock, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const MedicineGuide = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const medicines = [
    {
      name: "Mancozeb 75% WP",
      type: "Fungicide",
      target: "Late Blight, Downy Mildew",
      dosage: "2-3 g/L water",
      frequency: "Every 7-10 days",
      safety: "Moderate",
      crops: ["Tomato", "Potato", "Grapes"],
    },
    {
      name: "Imidacloprid 17.8% SL",
      type: "Insecticide",
      target: "Aphids, Whiteflies, Thrips",
      dosage: "0.5 ml/L water",
      frequency: "Every 15 days",
      safety: "Low toxicity",
      crops: ["Cotton", "Rice", "Vegetables"],
    },
    {
      name: "Copper Oxychloride",
      type: "Fungicide",
      target: "Bacterial Diseases",
      dosage: "2.5-3 g/L water",
      frequency: "Every 10-14 days",
      safety: "Safe",
      crops: ["Citrus", "Mango", "Vegetables"],
    },
    {
      name: "Neem Oil",
      type: "Bio-pesticide",
      target: "Multiple Pests",
      dosage: "5 ml/L water",
      frequency: "Every 7 days",
      safety: "Organic",
      crops: ["All crops"],
    },
  ];

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSafetyColor = (safety: string) => {
    switch (safety.toLowerCase()) {
      case "organic":
      case "safe":
        return "text-leaf bg-leaf/10";
      case "low toxicity":
        return "text-sky bg-sky/10";
      case "moderate":
        return "text-harvest bg-harvest/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">Medicine & Treatment Guide</h1>
        <p className="text-muted-foreground">
          Find the right treatment for your crop diseases with dosage recommendations
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by disease, medicine name, or type..."
          className="pl-12 h-12 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      {/* Quick Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {["All", "Fungicides", "Insecticides", "Bio-pesticides", "Herbicides"].map((cat) => (
          <Button
            key={cat}
            variant={cat === "All" ? "default" : "outline"}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </motion.div>

      {/* Medicine Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredMedicines.map((medicine, index) => (
          <motion.div
            key={medicine.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card variant="feature" className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{medicine.name}</CardTitle>
                    <CardDescription className="mt-1">{medicine.type}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSafetyColor(medicine.safety)}`}>
                    {medicine.safety}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Target Diseases/Pests</p>
                  <p className="text-sm">{medicine.target}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dosage</p>
                      <p className="text-sm font-medium">{medicine.dosage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="text-sm font-medium">{medicine.frequency}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Suitable Crops</p>
                  <div className="flex flex-wrap gap-1">
                    {medicine.crops.map((crop) => (
                      <span
                        key={crop}
                        className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  View Full Details
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Safety Tips */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card variant="warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertCircle className="w-5 h-5 text-harvest" />
              Safety Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {[
                "Always wear protective gear (gloves, mask, goggles) while spraying",
                "Follow the recommended dosage strictly - more is not better",
                "Spray during early morning or late evening for best results",
                "Maintain the waiting period before harvest",
                "Store pesticides away from food items and children",
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-leaf mt-0.5 flex-shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default MedicineGuide;
