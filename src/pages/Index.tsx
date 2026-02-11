import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Search, Plus, Shield, MapPin, Users, TrendingUp } from "lucide-react";
import { ChildCard, type ChildData } from "@/components/ChildCard";
import { MapView } from "@/components/MapView";
import { NotificationPanel } from "@/components/NotificationPanel";
import { AppSidebar } from "@/components/AppSidebar";

const mockChildren: ChildData[] = [
  {
    id: "1",
    name: "Emma",
    avatar: "https://images.unsplash.com/photo-1595454223600-91e87e1f5ab0?w=100&h=100&fit=crop&crop=face",
    status: "safe",
    location: "Lincoln Elementary School",
    battery: 82,
    lastSeen: "Just now",
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: "2",
    name: "Lucas",
    avatar: "https://images.unsplash.com/photo-1545696968-1a5245650b36?w=100&h=100&fit=crop&crop=face",
    status: "moving",
    location: "Maple Avenue",
    battery: 15,
    lastSeen: "1 min ago",
    lat: 40.7148,
    lng: -74.013,
  },
  {
    id: "3",
    name: "Sophie",
    avatar: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=100&h=100&fit=crop&crop=face",
    status: "away",
    location: "342 Oak Street",
    battery: 64,
    lastSeen: "5 min ago",
    lat: 40.7108,
    lng: -74.001,
  },
];

const stats = [
  { label: "Active Now", value: "3", icon: Users, color: "text-accent" },
  { label: "In Safe Zones", value: "1", icon: Shield, color: "text-safe" },
  { label: "Alerts Today", value: "2", icon: TrendingUp, color: "text-warning" },
];

const Index = () => {
  const [selectedChild, setSelectedChild] = useState<string | null>("1");
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="pl-12 lg:pl-0">
              <h1 className="font-display font-bold text-xl text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                All children are accounted for
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 bg-secondary rounded-xl px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none w-40 text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={() => setNotifOpen(true)}
                className="relative h-10 w-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <Bell className="h-4.5 w-4.5 text-foreground" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="h-10 w-10 rounded-xl gradient-accent text-accent-foreground flex items-center justify-center shadow-glow-accent hover:opacity-90 transition-opacity">
                <Plus className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-4 shadow-card border border-border"
              >
                <div className="flex items-center gap-2 mb-1">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-display font-bold text-card-foreground">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Map + Children */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 h-[400px] lg:h-[520px]"
            >
              <MapView
                children={mockChildren}
                selectedChild={selectedChild}
                onSelectChild={setSelectedChild}
              />
            </motion.div>

            {/* Children list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-semibold text-foreground">
                  Family Members
                </h2>
                <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-lg">
                  {mockChildren.length} tracked
                </span>
              </div>
              {mockChildren.map((child, i) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <ChildCard
                    child={child}
                    isSelected={selectedChild === child.id}
                    onClick={() => setSelectedChild(child.id)}
                  />
                </motion.div>
              ))}

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="w-full border-2 border-dashed border-border rounded-xl p-4 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Family Member
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </div>
  );
};

export default Index;
