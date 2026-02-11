import { motion } from "framer-motion";
import { Bell, MapPin, Shield, AlertTriangle, Clock, Filter, Check } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { useState } from "react";

const notifications = [
  { id: "1", type: "arrival" as const, title: "Emma arrived at School", message: "Entered Lincoln Elementary safe zone", time: "8:02 AM", date: "Today", read: false },
  { id: "2", type: "departure" as const, title: "Lucas left Home", message: "Departed home safe zone heading east", time: "7:45 AM", date: "Today", read: false },
  { id: "3", type: "alert" as const, title: "Sophie outside safe zones", message: "Currently at 342 Oak Street — no safe zone nearby", time: "7:30 AM", date: "Today", read: false },
  { id: "4", type: "battery" as const, title: "Lucas's battery low", message: "Battery at 15% — remind to charge device", time: "7:15 AM", date: "Today", read: true },
  { id: "5", type: "arrival" as const, title: "Sophie arrived at Home", message: "Entered home safe zone", time: "6:30 PM", date: "Yesterday", read: true },
  { id: "6", type: "departure" as const, title: "Emma left School", message: "Departed Lincoln Elementary safe zone", time: "3:15 PM", date: "Yesterday", read: true },
];

const typeConfig = {
  arrival: { icon: Shield, color: "text-safe bg-safe/10" },
  departure: { icon: MapPin, color: "text-accent bg-accent/10" },
  alert: { icon: AlertTriangle, color: "text-warning bg-warning/10" },
  battery: { icon: AlertTriangle, color: "text-destructive bg-destructive/10" },
};

const Notifications = () => {
  const [filter, setFilter] = useState<string>("all");
  const filtered = filter === "all" ? notifications : notifications.filter(n => n.type === filter);

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="pl-12 lg:pl-0">
              <h1 className="font-display font-bold text-xl text-foreground">Notifications</h1>
              <p className="text-sm text-muted-foreground">Stay updated on your family's movements</p>
            </div>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Check className="h-4 w-4" /> Mark all read
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {/* Filters */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {["all", "arrival", "departure", "alert", "battery"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="space-y-2 max-w-2xl">
            {filtered.map((notif, i) => {
              const config = typeConfig[notif.type];
              const Icon = config.icon;
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex gap-3 p-4 rounded-xl border transition-colors ${
                    notif.read ? "border-border bg-card" : "border-accent/20 bg-accent/5"
                  }`}
                >
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${config.color}`}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${notif.read ? "text-muted-foreground" : "text-card-foreground font-medium"}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                    <p className="text-xs text-muted-foreground/60 mt-1.5 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {notif.time} · {notif.date}
                    </p>
                  </div>
                  {!notif.read && <span className="h-2 w-2 rounded-full bg-accent mt-2 shrink-0" />}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
