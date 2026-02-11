import { motion } from "framer-motion";
import { Shield, Plus, MapPin, Edit, Trash2 } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

const safeZones = [
  { id: "1", name: "Home", address: "123 Main Street", radius: "200m", children: ["Emma", "Lucas", "Sophie"], active: true },
  { id: "2", name: "Lincoln Elementary", address: "456 School Road", radius: "150m", children: ["Emma"], active: true },
  { id: "3", name: "Soccer Field", address: "789 Park Ave", radius: "100m", children: ["Lucas"], active: false },
  { id: "4", name: "Grandma's House", address: "321 Oak Lane", radius: "150m", children: ["Emma", "Sophie"], active: true },
];

const SafeZones = () => (
  <div className="flex min-h-screen bg-background">
    <AppSidebar />
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="pl-12 lg:pl-0">
            <h1 className="font-display font-bold text-xl text-foreground">Safe Zones</h1>
            <p className="text-sm text-muted-foreground">Manage geofenced areas for your family</p>
          </div>
          <button className="flex items-center gap-2 gradient-accent text-accent-foreground px-4 py-2.5 rounded-xl text-sm font-medium shadow-glow-accent hover:opacity-90 transition-opacity">
            <Plus className="h-4 w-4" />
            Add Zone
          </button>
        </div>
      </header>
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {safeZones.map((zone, i) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-5 shadow-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${zone.active ? "bg-safe/10 text-safe" : "bg-muted text-muted-foreground"}`}>
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground">{zone.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {zone.address}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${zone.active ? "bg-safe/10 text-safe" : "bg-muted text-muted-foreground"}`}>
                  {zone.active ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-muted-foreground">
                  <span className="font-medium text-card-foreground">{zone.radius}</span> radius · {zone.children.join(", ")}
                </div>
                <div className="flex gap-1">
                  <button className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button className="h-8 w-8 rounded-lg hover:bg-destructive/10 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default SafeZones;
