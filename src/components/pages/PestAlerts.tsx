import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, AlertTriangle, Shield, Search, MapPin, Calendar, ChevronRight, Bell, Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const pestAlertsData = [
  {
    id: 1,
    name: 'Fall Armyworm',
    scientificName: 'Spodoptera frugiperda',
    severity: 'critical',
    affectedCrops: ['Corn', 'Rice', 'Sorghum', 'Sugarcane'],
    regions: ['Punjab', 'Haryana', 'Uttar Pradesh'],
    symptoms: [
      'Ragged feeding damage on leaves',
      'Larvae with inverted Y on head',
      'Frass (excrement) in leaf whorls',
      'Windowpane effect on young leaves',
    ],
    cure: [
      'Apply Chlorantraniliprole 18.5% SC @ 0.4ml/L',
      'Spray Emamectin Benzoate 5% SG @ 0.4g/L',
      'Use Spinetoram 11.7% SC @ 0.5ml/L',
      'Release Trichogramma parasitoids',
    ],
    prevention: [
      'Deep plowing to expose pupae',
      'Install pheromone traps (5/hectare)',
      'Maintain field sanitation',
      'Avoid late sowing',
    ],
    isActive: true,
    reportedDate: '2 days ago',
  },
  {
    id: 2,
    name: 'Rice Blast',
    scientificName: 'Magnaporthe oryzae',
    severity: 'high',
    affectedCrops: ['Rice'],
    regions: ['West Bengal', 'Odisha', 'Bihar'],
    symptoms: [
      'Diamond-shaped lesions on leaves',
      'Gray center with brown margin',
      'Node blast causing stem breakage',
      'Neck rot in panicles',
    ],
    cure: [
      'Spray Tricyclazole 75% WP @ 0.6g/L',
      'Apply Isoprothiolane 40% EC @ 1.5ml/L',
      'Use Carbendazim 50% WP @ 1g/L',
    ],
    prevention: [
      'Use resistant varieties',
      'Avoid excessive nitrogen',
      'Maintain proper spacing',
      'Remove infected debris',
    ],
    isActive: true,
    reportedDate: '1 week ago',
  },
  {
    id: 3,
    name: 'Whitefly',
    scientificName: 'Bemisia tabaci',
    severity: 'high',
    affectedCrops: ['Cotton', 'Tomato', 'Chili', 'Brinjal'],
    regions: ['Gujarat', 'Maharashtra', 'Karnataka'],
    symptoms: [
      'White powdery insects on leaf undersides',
      'Sticky honeydew on leaves',
      'Sooty mold development',
      'Leaf yellowing and curling',
    ],
    cure: [
      'Spray Spiromesifen 22.9% SC @ 0.4ml/L',
      'Apply Diafenthiuron 50% WP @ 1g/L',
      'Use neem oil @ 5ml/L',
      'Release Encarsia formosa predators',
    ],
    prevention: [
      'Use yellow sticky traps',
      'Remove alternate hosts',
      'Avoid continuous cotton cultivation',
      'Spray neem-based products preventively',
    ],
    isActive: true,
    reportedDate: '3 days ago',
  },
  {
    id: 4,
    name: 'Stem Borer',
    scientificName: 'Chilo suppressalis',
    severity: 'medium',
    affectedCrops: ['Rice', 'Sugarcane'],
    regions: ['Tamil Nadu', 'Andhra Pradesh'],
    symptoms: [
      'Dead heart in vegetative stage',
      'White ear in reproductive stage',
      'Bore holes in stem',
      'Frass in stem tunnels',
    ],
    cure: [
      'Apply Carbofuran 3G @ 33kg/ha',
      'Spray Chlorantraniliprole @ 0.3ml/L',
      'Use Fipronil 0.3% GR @ 20kg/ha',
    ],
    prevention: [
      'Light trap installation',
      'Collect and destroy egg masses',
      'Release Trichogramma japonicum',
      'Avoid early planting',
    ],
    isActive: false,
    reportedDate: '2 weeks ago',
  },
];

const PestAlerts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPest, setSelectedPest] = useState(pestAlertsData[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'active'>('all');

  const filteredPests = pestAlertsData.filter(pest => {
    const matchesSearch = pest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pest.affectedCrops.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = activeFilter === 'all' || pest.isActive;
    return matchesSearch && matchesFilter;
  });

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50' };
      case 'high': return { bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50' };
      case 'medium': return { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50' };
      case 'low': return { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50' };
      default: return { bg: 'bg-gray-500', text: 'text-gray-600', light: 'bg-gray-50' };
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
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Bug className="w-6 h-6 text-destructive" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Pest Alerts & Management</h1>
            <p className="text-muted-foreground">Monitor and manage pest outbreaks in your region</p>
          </div>
        </div>
      </motion.div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 bg-gradient-to-r from-destructive/10 to-harvest/10 border-destructive/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-destructive/20 rounded-full flex items-center justify-center animate-pulse">
              <Bell className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-destructive">Active Pest Warnings</h3>
              <p className="text-sm text-muted-foreground">
                {pestAlertsData.filter(p => p.isActive).length} active pest alerts in your region. Take immediate action.
              </p>
            </div>
            <Button variant="destructive">View All Alerts</Button>
          </div>
        </Card>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by pest name or affected crop..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
          >
            All Alerts
          </Button>
          <Button
            variant={activeFilter === 'active' ? 'destructive' : 'outline'}
            onClick={() => setActiveFilter('active')}
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Active Only
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pest List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-1"
        >
          <Card className="p-4">
            <h2 className="font-semibold mb-4">Pest Alerts</h2>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredPests.map((pest) => {
                const styles = getSeverityStyles(pest.severity);
                return (
                  <motion.button
                    key={pest.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedPest(pest)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      selectedPest.id === pest.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${styles.bg} flex items-center justify-center`}>
                      <Bug className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{pest.name}</p>
                        {pest.isActive && (
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs opacity-70">{pest.reportedDate}</p>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Details Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold">{selectedPest.name}</h2>
                  {selectedPest.isActive && (
                    <Badge variant="destructive" className="animate-pulse">ACTIVE</Badge>
                  )}
                </div>
                <p className="text-muted-foreground italic">{selectedPest.scientificName}</p>
              </div>
              <Badge className={getSeverityStyles(selectedPest.severity).bg}>
                {selectedPest.severity.toUpperCase()}
              </Badge>
            </div>

            {/* Meta Info */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Affected Regions</p>
                  <p className="font-medium">{selectedPest.regions.join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Reported</p>
                  <p className="font-medium">{selectedPest.reportedDate}</p>
                </div>
              </div>
            </div>

            {/* Affected Crops */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Affected Crops:</p>
              <div className="flex flex-wrap gap-2">
                {selectedPest.affectedCrops.map((crop) => (
                  <Badge key={crop} variant="outline">{crop}</Badge>
                ))}
              </div>
            </div>

            <Tabs defaultValue="symptoms" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                <TabsTrigger value="cure">Cure & Treatment</TabsTrigger>
                <TabsTrigger value="prevention">Prevention</TabsTrigger>
              </TabsList>

              <TabsContent value="symptoms" className="space-y-3 mt-4">
                {selectedPest.symptoms.map((symptom, index) => (
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
              </TabsContent>

              <TabsContent value="cure" className="space-y-3 mt-4">
                {selectedPest.cure.map((treatment, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-leaf/10 rounded-lg"
                  >
                    <Check className="w-5 h-5 text-leaf mt-0.5 flex-shrink-0" />
                    <span>{treatment}</span>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="prevention" className="space-y-3 mt-4">
                {selectedPest.prevention.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-sky/10 rounded-lg"
                  >
                    <Shield className="w-5 h-5 text-sky mt-0.5 flex-shrink-0" />
                    <span>{tip}</span>
                  </motion.div>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PestAlerts;
