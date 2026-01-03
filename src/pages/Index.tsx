import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardContent from "@/components/DashboardContent";
import DiseaseDetection from "@/components/pages/DiseaseDetection";
import SoilAnalysis from "@/components/pages/SoilAnalysis";
import MedicineGuide from "@/components/pages/MedicineGuide";
import PreventionGuide from "@/components/pages/PreventionGuide";
import MarketAccess from "@/components/pages/MarketAccess";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

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
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
