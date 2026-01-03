import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Tractor, Store, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type UserType = 'farmer' | 'wholesaler' | null;
type AuthMode = 'login' | 'signup';

const Auth = () => {
  const [selectedType, setSelectedType] = useState<UserType>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp, user } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType) return;

    setIsLoading(true);
    
    try {
      if (authMode === 'signup') {
        const { error } = await signUp(email, password, fullName, selectedType);
        if (error) {
          toast({
            title: 'Signup Failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Account Created!',
            description: 'Welcome to KissanMitra!',
          });
          navigate('/');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Login Failed',
            description: error.message,
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome Back!',
            description: 'Successfully logged in.',
          });
          navigate('/');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const userTypes = [
    {
      type: 'farmer' as const,
      icon: Tractor,
      title: t('farmer'),
      description: 'Access disease detection, soil analysis, and more',
      gradient: 'from-leaf to-primary',
    },
    {
      type: 'wholesaler' as const,
      icon: Store,
      title: t('wholesaler'),
      description: 'Connect with farmers and manage purchases',
      gradient: 'from-sun to-harvest',
    },
  ];

  return (
    <div className="min-h-screen gradient-earth leaf-pattern flex items-center justify-center p-4">
      {/* Language Selector */}
      <div className="fixed top-4 right-4 z-50">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[140px] bg-white/80 backdrop-blur">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                {lang.nativeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          {!selectedType ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              {/* Logo */}
              <motion.div 
                className="flex items-center justify-center gap-3 mb-8"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
              >
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
                  <Leaf className="w-10 h-10 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-primary">KissanMitra</h1>
                  <p className="text-muted-foreground">{t('smartFarming')}</p>
                </div>
              </motion.div>

              <h2 className="text-2xl font-semibold mb-2">{t('welcome')}</h2>
              <p className="text-muted-foreground mb-8">{t('continueAs')}</p>

              {/* User Type Cards */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {userTypes.map((userType, index) => {
                  const Icon = userType.icon;
                  return (
                    <motion.div
                      key={userType.type}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className="p-8 cursor-pointer hover:shadow-elevated transition-all duration-300 group border-2 border-transparent hover:border-primary"
                        onClick={() => setSelectedType(userType.type)}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="text-center"
                        >
                          <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${userType.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{userType.title}</h3>
                          <p className="text-sm text-muted-foreground">{userType.description}</p>
                        </motion.div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              <Button
                variant="ghost"
                className="mb-6"
                onClick={() => setSelectedType(null)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <Card className="p-8 shadow-elevated">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${selectedType === 'farmer' ? 'from-leaf to-primary' : 'from-sun to-harvest'} flex items-center justify-center mb-4 shadow-lg`}>
                    {selectedType === 'farmer' ? (
                      <Tractor className="w-8 h-8 text-white" />
                    ) : (
                      <Store className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h2 className="text-2xl font-bold">
                    {authMode === 'login' ? t('login') : t('signup')} as {t(selectedType)}
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {authMode === 'signup' && (
                    <div>
                      <label className="text-sm font-medium mb-1 block">{t('fullName')}</label>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-1 block">{t('email')}</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">{t('password')}</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="h-12 pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : authMode === 'login' ? (
                      t('login')
                    ) : (
                      t('createAccount')
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {authMode === 'login' ? t('dontHaveAccount') : t('alreadyHaveAccount')}{' '}
                    <button
                      type="button"
                      className="text-primary font-medium hover:underline"
                      onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    >
                      {authMode === 'login' ? t('signup') : t('login')}
                    </button>
                  </p>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
