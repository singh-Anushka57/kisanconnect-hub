import { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Search, AlertTriangle, CheckCircle, Droplets, Sprout, ChevronRight, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const nutrientData = [
  {
    id: 1,
    name: 'Nitrogen (N)',
    symbol: 'N',
    color: 'bg-green-500',
    symptoms: [
      'Yellowing of older leaves (chlorosis)',
      'Stunted growth',
      'Pale green plant color',
      'Reduced tillering in cereals',
    ],
    affectedCrops: ['Rice', 'Wheat', 'Corn', 'Vegetables'],
    solutions: [
      'Apply urea at 40-60 kg/acre',
      'Use organic manure like FYM',
      'Apply ammonium sulfate',
      'Foliar spray of 2% urea solution',
    ],
    organicSolutions: [
      'Apply well-decomposed compost',
      'Use vermicompost',
      'Plant legume cover crops',
      'Apply bone meal',
    ],
    severity: 'high',
    idealRange: '25-50 ppm',
  },
  {
    id: 2,
    name: 'Phosphorus (P)',
    symbol: 'P',
    color: 'bg-purple-500',
    symptoms: [
      'Purple/reddish coloration on leaves',
      'Delayed maturity',
      'Poor root development',
      'Reduced flowering and fruiting',
    ],
    affectedCrops: ['All crops', 'Especially root vegetables'],
    solutions: [
      'Apply DAP at 50 kg/acre',
      'Use single super phosphate',
      'Apply rock phosphate for long-term',
    ],
    organicSolutions: [
      'Apply bone meal',
      'Use rock phosphite',
      'Apply fish emulsion',
    ],
    severity: 'medium',
    idealRange: '15-30 ppm',
  },
  {
    id: 3,
    name: 'Potassium (K)',
    symbol: 'K',
    color: 'bg-orange-500',
    symptoms: [
      'Leaf edge browning (scorching)',
      'Weak stems',
      'Poor disease resistance',
      'Reduced fruit quality',
    ],
    affectedCrops: ['Banana', 'Potato', 'Tomato', 'Cotton'],
    solutions: [
      'Apply muriate of potash (MOP)',
      'Use sulfate of potash (SOP)',
      'Apply potassium nitrate',
    ],
    organicSolutions: [
      'Wood ash application',
      'Banana peel compost',
      'Kelp meal',
    ],
    severity: 'high',
    idealRange: '150-250 ppm',
  },
  {
    id: 4,
    name: 'Calcium (Ca)',
    symbol: 'Ca',
    color: 'bg-blue-500',
    symptoms: [
      'Blossom end rot in tomatoes',
      'Tip burn in lettuce',
      'Distorted new leaves',
      'Poor cell wall development',
    ],
    affectedCrops: ['Tomato', 'Pepper', 'Lettuce', 'Apple'],
    solutions: [
      'Apply gypsum',
      'Use calcium nitrate spray',
      'Apply lime if pH is low',
    ],
    organicSolutions: [
      'Crushed eggshells',
      'Dolomite lime',
      'Oyster shell meal',
    ],
    severity: 'medium',
    idealRange: '1000-2000 ppm',
  },
  {
    id: 5,
    name: 'Iron (Fe)',
    symbol: 'Fe',
    color: 'bg-red-500',
    symptoms: [
      'Interveinal chlorosis in new leaves',
      'Leaves turn yellow with green veins',
      'Severe cases show white leaves',
    ],
    affectedCrops: ['Rice', 'Citrus', 'Grapes', 'Roses'],
    solutions: [
      'Apply iron sulfate',
      'Use chelated iron (Fe-EDDHA)',
      'Foliar spray of ferrous sulfate',
    ],
    organicSolutions: [
      'Add organic matter to soil',
      'Use blood meal',
      'Apply compost tea',
    ],
    severity: 'low',
    idealRange: '4-10 ppm',
  },
  {
    id: 6,
    name: 'Zinc (Zn)',
    symbol: 'Zn',
    color: 'bg-teal-500',
    symptoms: [
      'Interveinal chlorosis',
      'Small, narrow leaves',
      'Reduced internode length',
      'Delayed maturity',
    ],
    affectedCrops: ['Rice', 'Corn', 'Wheat', 'Citrus'],
    solutions: [
      'Apply zinc sulfate at 10 kg/acre',
      'Foliar spray of 0.5% zinc sulfate',
      'Use zinc-enriched fertilizers',
    ],
    organicSolutions: [
      'Apply well-aged manure',
      'Use kelp extract',
    ],
    severity: 'medium',
    idealRange: '1-5 ppm',
  },
];

const NutrientDeficiency = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNutrient, setSelectedNutrient] = useState(nutrientData[0]);

  const filteredNutrients = nutrientData.filter(
    n => n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         n.symptoms.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-harvest text-white';
      case 'low': return 'bg-leaf text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-leaf/10 flex items-center justify-center">
            <Sprout className="w-6 h-6 text-leaf" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Nutrient Deficiency Guide</h1>
            <p className="text-muted-foreground">Identify and treat nutrient deficiencies in your crops</p>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by nutrient name or symptom..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Nutrient List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Essential Nutrients</h2>
            <div className="space-y-2">
              {filteredNutrients.map((nutrient) => (
                <motion.button
                  key={nutrient.id}
                  whileHover={{ x: 4 }}
                  onClick={() => setSelectedNutrient(nutrient)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedNutrient.id === nutrient.id
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${nutrient.color} flex items-center justify-center text-white font-bold`}>
                    {nutrient.symbol}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{nutrient.name}</p>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs mt-1 ${selectedNutrient.id === nutrient.id ? 'bg-white/20' : getSeverityColor(nutrient.severity)}`}
                    >
                      {nutrient.severity} impact
                    </Badge>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Details Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-xl ${selectedNutrient.color} flex items-center justify-center text-white text-2xl font-bold`}>
                {selectedNutrient.symbol}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedNutrient.name}</h2>
                <p className="text-muted-foreground">Ideal Range: {selectedNutrient.idealRange}</p>
              </div>
            </div>

            <Tabs defaultValue="symptoms" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
                <TabsTrigger value="organic">Organic Options</TabsTrigger>
              </TabsList>

              <TabsContent value="symptoms" className="space-y-4 mt-4">
                <div className="space-y-3">
                  {selectedNutrient.symptoms.map((symptom, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg"
                    >
                      <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span>{symptom}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Commonly Affected Crops:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedNutrient.affectedCrops.map((crop) => (
                      <Badge key={crop} variant="outline">{crop}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="solutions" className="space-y-4 mt-4">
                {selectedNutrient.solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-leaf/10 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-leaf mt-0.5 flex-shrink-0" />
                    <span>{solution}</span>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="organic" className="space-y-4 mt-4">
                {selectedNutrient.organicSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg"
                  >
                    <Leaf className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{solution}</span>
                  </motion.div>
                ))}
                <div className="p-4 bg-muted rounded-lg flex items-start gap-3 mt-4">
                  <Info className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Organic solutions take longer to show results but improve long-term soil health.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NutrientDeficiency;
