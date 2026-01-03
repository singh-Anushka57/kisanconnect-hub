import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Bell, Globe, Palette, Shield, Moon, Sun, Volume2, Save, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    pestAlerts: true,
    weatherUpdates: true,
    marketPrices: true,
    tips: false,
  });
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSave = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.',
    });
  };

  const settingSections = [
    {
      title: 'Profile Settings',
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input value={user?.email || ''} disabled className="bg-muted" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Role</label>
              <Input value={userRole || 'N/A'} disabled className="bg-muted capitalize" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Phone Number</label>
            <Input placeholder="Enter your phone number" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Location</label>
            <Input placeholder="Enter your location" />
          </div>
        </div>
      ),
    },
    {
      title: 'Language',
      icon: Globe,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select your preferred language for the dashboard
          </p>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-full sm:w-[300px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{lang.nativeName}</span>
                    <span className="text-muted-foreground">({lang.name})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-4">
            {languages.slice(0, 6).map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLanguage(lang.code)}
              >
                {lang.nativeName}
              </Button>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Notifications',
      icon: Bell,
      content: (
        <div className="space-y-4">
          {[
            { key: 'pestAlerts', label: 'Pest Alerts', description: 'Receive alerts about pest outbreaks in your area' },
            { key: 'weatherUpdates', label: 'Weather Updates', description: 'Get notified about weather changes' },
            { key: 'marketPrices', label: 'Market Prices', description: 'Daily updates on crop prices' },
            { key: 'tips', label: 'Farming Tips', description: 'Weekly tips for better farming' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, [item.key]: checked }))
                }
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Appearance',
      icon: Palette,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
              </div>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5" />
              <div>
                <p className="font-medium">Sound Effects</p>
                <p className="text-sm text-muted-foreground">Enable notification sounds</p>
              </div>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>
        </div>
      ),
    },
    {
      title: 'Security',
      icon: Shield,
      content: (
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
            Delete Account
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('settings')}</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {settingSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <h2 className="text-lg font-semibold">{section.title}</h2>
                </div>
                {section.content}
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="sticky bottom-4"
      >
        <Button onClick={handleSave} size="lg" className="w-full shadow-elevated">
          <Save className="w-5 h-5 mr-2" />
          Save All Changes
        </Button>
      </motion.div>
    </div>
  );
};

export default Settings;
