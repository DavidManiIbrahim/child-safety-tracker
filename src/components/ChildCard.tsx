import { motion } from "framer-motion";
import { MapPin, Battery, Clock, Wifi } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export interface ChildData {
  id: string;
  name: string;
  avatar: string;
  status: "safe" | "warning" | "away" | "moving";
  location: string;
  battery: number;
  lastSeen: string;
  lat: number;
  lng: number;
}

interface ChildCardProps {
  child: ChildData;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ChildCard = ({ child, isSelected, onClick }: ChildCardProps) => {
  const batteryColor =
    child.battery > 50 ? "text-safe" : child.battery > 20 ? "text-warning" : "text-destructive";

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`cursor-pointer rounded-xl border p-4 transition-colors shadow-card ${
        isSelected
          ? "border-accent bg-accent/5 shadow-glow-accent"
          : "border-border bg-card hover:border-accent/30"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <div className="h-12 w-12 overflow-hidden rounded-full bg-muted">
            <img
              src={child.avatar}
              alt={child.name}
              className="h-full w-full object-cover"
            />
          </div>
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-card ${
              child.status === "safe"
                ? "bg-safe"
                : child.status === "moving"
                ? "bg-accent"
                : child.status === "warning"
                ? "bg-warning"
                : "bg-away"
            }`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-card-foreground truncate">{child.name}</h3>
            <StatusBadge status={child.status}>
              {child.status === "safe"
                ? "Safe"
                : child.status === "moving"
                ? "Moving"
                : child.status === "warning"
                ? "Alert"
                : "Away"}
            </StatusBadge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{child.location}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className={`flex items-center gap-1 ${batteryColor}`}>
              <Battery className="h-3 w-3" />
              {child.battery}%
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {child.lastSeen}
            </span>
            <span className="flex items-center gap-1">
              <Wifi className="h-3 w-3" />
              GPS
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
