import { motion } from "framer-motion";
import { ShoppingBag, TrendingUp, TrendingDown, MapPin, Phone, Star, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MarketAccess = () => {
  const marketPrices = [
    { crop: "Wheat", price: 2450, change: 2.5, unit: "quintal", mandi: "Indore" },
    { crop: "Rice (Basmati)", price: 4200, change: -1.2, unit: "quintal", mandi: "Delhi" },
    { crop: "Cotton", price: 6800, change: 4.8, unit: "quintal", mandi: "Nagpur" },
    { crop: "Soybean", price: 4100, change: 1.5, unit: "quintal", mandi: "Ujjain" },
    { crop: "Maize", price: 1950, change: -0.5, unit: "quintal", mandi: "Bhopal" },
    { crop: "Sugarcane", price: 350, change: 0, unit: "quintal", mandi: "Kolhapur" },
  ];

  const buyers = [
    { name: "Agro Trading Co.", location: "Mumbai", rating: 4.8, deals: 156, verified: true },
    { name: "Green Harvest Pvt Ltd", location: "Delhi", rating: 4.5, deals: 89, verified: true },
    { name: "Farm Fresh Exports", location: "Chennai", rating: 4.7, deals: 234, verified: true },
    { name: "Kisan Direct", location: "Bangalore", rating: 4.6, deals: 112, verified: false },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-2">Market Access</h1>
        <p className="text-muted-foreground">
          Check live mandi prices, connect with buyers, and sell your produce at the best rates
        </p>
      </motion.div>

      {/* Price Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-primary/5 rounded-xl p-4 overflow-hidden"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-leaf animate-pulse" />
          <span className="text-sm font-medium">Live Market Prices</span>
        </div>
        <div className="flex gap-6 animate-marquee">
          {marketPrices.map((item) => (
            <div key={item.crop} className="flex items-center gap-2 whitespace-nowrap">
              <span className="font-medium">{item.crop}:</span>
              <span className="font-bold">₹{item.price.toLocaleString()}</span>
              <span className={`flex items-center text-sm ${item.change > 0 ? 'text-leaf' : item.change < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                {item.change > 0 ? <TrendingUp className="w-3 h-3" /> : item.change < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Input placeholder="Search crops or mandis..." className="flex-1" />
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button variant="default">Search</Button>
      </motion.div>

      {/* Price Table */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Today's Mandi Prices</CardTitle>
            <CardDescription>Last updated: 10 minutes ago</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Crop</th>
                    <th className="text-left p-4 font-medium">Mandi</th>
                    <th className="text-right p-4 font-medium">Price (₹)</th>
                    <th className="text-right p-4 font-medium">Change</th>
                    <th className="text-center p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {marketPrices.map((item, i) => (
                    <motion.tr 
                      key={item.crop}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 font-medium">{item.crop}</td>
                      <td className="p-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.mandi}
                        </div>
                      </td>
                      <td className="p-4 text-right font-semibold">₹{item.price.toLocaleString()}/{item.unit}</td>
                      <td className={`p-4 text-right font-medium ${item.change > 0 ? 'text-leaf' : item.change < 0 ? 'text-destructive' : ''}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </td>
                      <td className="p-4 text-center">
                        <Button variant="outline" size="sm">Sell Now</Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* Buyers Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Verified Buyers</h2>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {buyers.map((buyer, index) => (
            <motion.div
              key={buyer.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <Card variant="feature" className="h-full">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                    </div>
                    {buyer.verified && (
                      <span className="text-xs bg-leaf/10 text-leaf px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold">{buyer.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {buyer.location}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-sun fill-sun" />
                      <span className="font-medium">{buyer.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{buyer.deals} deals</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3 gap-2">
                    <Phone className="w-4 h-4" />
                    Contact
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Sell Your Produce CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card variant="accent">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-foreground mb-2">
              Ready to Sell Your Produce?
            </h2>
            <p className="text-primary-foreground/80 mb-6">
              List your harvest and get the best prices from verified buyers
            </p>
            <Button variant="accent" size="lg">
              Post Your Listing
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default MarketAccess;
