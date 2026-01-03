import { motion } from "framer-motion";
import { 
  Leaf, 
  Home, 
  Bug, 
  FlaskConical, 
  Pill, 
  Shield, 
  ShoppingBag, 
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Sprout,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { signOut, userRole } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const menuItems = [
    { id: "dashboard", icon: Home, label: t('dashboard') },
    { id: "disease", icon: Bug, label: t('diseaseDetection') || 'Disease Detection' },
    { id: "soil", icon: FlaskConical, label: t('soilAnalysis') || 'Soil Analysis' },
    { id: "nutrient", icon: Sprout, label: t('nutrientDeficiency') || 'Nutrient Deficiency' },
    { id: "pest", icon: AlertTriangle, label: t('pestAlerts') || 'Pest Alerts' },
    { id: "medicine", icon: Pill, label: t('medicineGuide') || 'Medicine Guide' },
    { id: "prevention", icon: Shield, label: t('prevention') || 'Prevention Tips' },
    { id: "market", icon: ShoppingBag, label: t('marketAccess') || 'Market Access' },
  ];

  const bottomItems = [
    { id: "settings", icon: Settings, label: t('settings') || 'Settings' },
    { id: "help", icon: HelpCircle, label: t('helpSupport') || 'Help & Support' },
  ];

  const handleLogout = async () => {
    await signOut();
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    navigate('/auth');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          gradient-primary min-h-screen
          transition-all duration-300 ease-in-out
          flex flex-col
        `}
      >
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <motion.div 
            className="w-10 h-10 bg-sun rounded-xl flex items-center justify-center shadow-lg"
            whileHover={{ rotate: 10 }}
          >
            <Leaf className="w-6 h-6 text-foreground" />
          </motion.div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sidebar-foreground"
            >
              <h1 className="font-bold text-xl">KissanMitra</h1>
              <p className="text-xs text-sidebar-foreground/70 capitalize">{userRole || t('smartFarming')}</p>
            </motion.div>
          )}
        </div>

        {/* Main Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg' 
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Menu */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className="space-y-1">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                      : 'text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </motion.button>
              );
            })}

            {/* Logout Button */}
            <motion.button
              whileHover={{ x: 4 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{t('logout') || 'Logout'}</span>}
            </motion.button>
          </div>

          {/* Collapse Toggle - Desktop only */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-4 text-sidebar-foreground/70 hover:text-sidebar-foreground hidden lg:flex"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "→" : "← Collapse"}
          </Button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
