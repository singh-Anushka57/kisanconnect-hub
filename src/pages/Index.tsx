import { useState, useEffect, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

// Lazy load page components
const DashboardContent = lazy(() => import("@/components/DashboardContent"));
const DiseaseDetection = lazy(() => import("@/components/pages/DiseaseDetection"));
const SoilAnalysis = lazy(() => import("@/components/pages/SoilAnalysis"));
const MedicineGuide = lazy(() => import("@/components/pages/MedicineGuide"));
const PreventionGuide = lazy(() => import("@/components/pages/PreventionGuide"));
const MarketAccess = lazy(() => import("@/components/pages/MarketAccess"));
const Settings = lazy(() => import("@/components/pages/Settings"));
const HelpSupport = lazy(() => import("@/components/pages/HelpSupport"));
const NutrientDeficiency = lazy(() => import("@/components/pages/NutrientDeficiency"));
const PestAlerts = lazy(() => import("@/components/pages/PestAlerts"));

// Content loader
const ContentLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <Loader2 className="w-8 h-8 text-primary animate-spin" />
  </div>
);

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent onSectionChange={setActiveSection} />;
      case "disease":
        return <DiseaseDetection />;
      case "soil":
        return <SoilAnalysis />;
      case "medicine":
        return <MedicineGuide />;
      case "prevention":
        return <PreventionGuide />;
      case "market":
        return <MarketAccess />;
      case "settings":
        return <Settings />;
      case "help":
        return <HelpSupport />;
      case "nutrient":
        return <NutrientDeficiency />;
      case "pest":
        return <PestAlerts />;
      default:
        return <DashboardContent onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background leaf-pattern">
      <div className="flex min-h-screen">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Suspense fallback={<ContentLoader />}>
              {renderContent()}
            </Suspense>
          </main>
        </div>
      </div>
      
      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
