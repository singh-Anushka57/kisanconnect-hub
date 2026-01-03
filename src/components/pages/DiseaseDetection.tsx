import { motion } from "framer-motion";
import { Camera, Upload, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useState } from "react";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    severity: "low" | "medium" | "high";
    description: string;
  } | null>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setResult({
        disease: "Late Blight",
        confidence: 94,
        severity: "medium",
        description: "Late blight is a potentially devastating disease of tomato and potato, caused by the fungus-like oomycete pathogen Phytophthora infestans.",
      });
      setAnalyzing(false);
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-leaf bg-leaf/10";
      case "medium": return "text-sun bg-sun/10";
      case "high": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">Crop Disease Detection</h1>
        <p className="text-muted-foreground">
          Upload a photo of your affected crop and our AI will identify the disease instantly
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="feature" className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Upload Crop Image
              </CardTitle>
              <CardDescription>
                Take a clear photo of the affected area
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="block">
                <div className={`
                  border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                  transition-all duration-200
                  ${selectedImage 
                    ? 'border-leaf bg-leaf/5' 
                    : 'border-border hover:border-primary hover:bg-primary/5'
                  }
                `}>
                  {selectedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={selectedImage} 
                        alt="Uploaded crop" 
                        className="max-h-64 mx-auto rounded-lg shadow-card"
                      />
                      <p className="text-sm text-leaf flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Image uploaded successfully
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-xs text-muted-foreground/70 mt-2">
                        Supports: JPG, PNG, WEBP
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>

              <Button 
                variant="feature" 
                size="lg" 
                className="w-full"
                disabled={!selectedImage || analyzing}
                onClick={handleAnalyze}
              >
                {analyzing ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5 mr-2" />
                    Analyze Disease
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant={result ? "success" : "default"} className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {result ? (
                  <AlertTriangle className="w-5 h-5 text-harvest" />
                ) : (
                  <Info className="w-5 h-5 text-muted-foreground" />
                )}
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-xl bg-card shadow-soft">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{result.disease}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(result.severity)}`}>
                        {result.severity.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full gradient-primary rounded-full"
                        />
                      </div>
                      <span className="text-sm font-semibold">{result.confidence}%</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {result.description}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="default" className="flex-1">
                      View Treatment
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Prevention Tips
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload an image to see analysis results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Common Diseases */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">Common Crop Diseases</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: "Late Blight", crop: "Tomato/Potato", risk: "High" },
            { name: "Powdery Mildew", crop: "Multiple Crops", risk: "Medium" },
            { name: "Leaf Rust", crop: "Wheat", risk: "High" },
            { name: "Bacterial Wilt", crop: "Vegetables", risk: "Medium" },
          ].map((disease, i) => (
            <Card key={i} variant="default" className="hover:shadow-card transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <h3 className="font-semibold">{disease.name}</h3>
                <p className="text-sm text-muted-foreground">{disease.crop}</p>
                <span className={`text-xs font-medium ${disease.risk === 'High' ? 'text-destructive' : 'text-sun'}`}>
                  {disease.risk} Risk
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default DiseaseDetection;
