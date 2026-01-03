import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  FileText, 
  Video, 
  ChevronDown,
  ExternalLink,
  Search,
  BookOpen,
  Users,
  Headphones
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I upload an image for disease detection?',
    answer: 'Navigate to the Disease Detection section, click on the upload area or drag and drop your crop image. Our AI will analyze the image and provide diagnosis within seconds.',
  },
  {
    question: 'How accurate is the soil analysis feature?',
    answer: 'Our soil analysis provides recommendations based on standard agricultural practices. For best results, we recommend periodic lab testing to calibrate the digital analysis.',
  },
  {
    question: 'Can I access market prices in my local language?',
    answer: 'Yes! KissanMitra supports 12+ Indian languages. Go to Settings and select your preferred language to view all content in your native language.',
  },
  {
    question: 'How do pest alerts work?',
    answer: 'Our pest alert system monitors regional agricultural reports and weather patterns to predict pest outbreaks. You will receive notifications based on your location and crops.',
  },
  {
    question: 'Is my data secure on this platform?',
    answer: 'Yes, we use industry-standard encryption and security practices. Your personal data and farm information are kept confidential and never shared with third parties.',
  },
  {
    question: 'How can I connect with wholesalers?',
    answer: 'Visit the Market Access section where you can view verified wholesaler listings and their contact information. You can directly message or call them through the platform.',
  },
];

const supportChannels = [
  {
    icon: Phone,
    title: 'Call Support',
    description: 'Talk to our experts',
    action: '1800-XXX-XXXX',
    color: 'bg-leaf/10 text-leaf',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: 'Quick chat support',
    action: '+91 XXXXX XXXXX',
    color: 'bg-green-500/10 text-green-600',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Detailed queries',
    action: 'support@kissanmitra.com',
    color: 'bg-sky/10 text-sky',
  },
  {
    icon: Video,
    title: 'Video Tutorials',
    description: 'Learn visually',
    action: 'Watch Now',
    color: 'bg-harvest/10 text-harvest',
  },
];

const resources = [
  { icon: BookOpen, title: 'User Guide', description: 'Complete documentation' },
  { icon: Video, title: 'Video Tutorials', description: '20+ training videos' },
  { icon: Users, title: 'Community Forum', description: 'Connect with farmers' },
  { icon: FileText, title: 'Farming Tips', description: 'Expert articles' },
];

const HelpSupport = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t('helpSupport')}</h1>
            <p className="text-muted-foreground">Get help and find answers to your questions</p>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="text-center mb-4">
            <h2 className="text-xl font-semibold">How can we help you?</h2>
            <p className="text-muted-foreground">Search our knowledge base or browse FAQs</p>
          </div>
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>
      </motion.div>

      {/* Support Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-card transition-shadow cursor-pointer group">
                  <div className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                  <p className="text-sm font-medium text-primary">{channel.action}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* FAQs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {filteredFaqs.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No results found. Try a different search term.
            </p>
          )}
        </Card>
      </motion.div>

      {/* Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold mb-4">Learning Resources</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card 
                key={resource.title}
                className="p-4 hover:shadow-card transition-shadow cursor-pointer group"
              >
                <Icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold">{resource.title}</h3>
                <p className="text-sm text-muted-foreground">{resource.description}</p>
                <Button variant="link" className="p-0 mt-2 h-auto">
                  Explore <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Live Chat CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 gradient-primary text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <Headphones className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Need more help?</h3>
                <p className="text-white/80">Our AI assistant is available 24/7</p>
              </div>
            </div>
            <Button variant="secondary" size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Chat
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default HelpSupport;
