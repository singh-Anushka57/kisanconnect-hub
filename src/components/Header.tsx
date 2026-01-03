import { motion } from "framer-motion";
import { Bell, Search, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-30"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search crops, diseases, treatments..."
              className="pl-10 bg-background/50 border-border/50 focus:bg-background"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-harvest rounded-full text-[10px] text-primary-foreground flex items-center justify-center font-bold">
              3
            </span>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-sm font-medium">Ramesh Kumar</div>
              <div className="text-xs text-muted-foreground">Farmer</div>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
