import { motion } from "framer-motion";
import { MapPin, Shield, Navigation } from "lucide-react";
import type { ChildData } from "./ChildCard";

interface MapViewProps {
  children: ChildData[];
  selectedChild: string | null;
  onSelectChild: (id: string) => void;
}

const statusColor: Record<string, string> = {
  safe: "bg-safe",
  warning: "bg-warning",
  away: "bg-away",
  moving: "bg-accent",
};

export const MapView = ({ children, selectedChild, onSelectChild }: MapViewProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-primary/5 border border-border">
      {/* Simulated map background */}
      <div className="absolute inset-0 gradient-hero opacity-[0.06]" />
      
      {/* Grid lines to simulate a map */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Safe zones */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute left-[15%] top-[25%] h-32 w-32 rounded-full border-2 border-dashed border-safe/40 bg-safe/5 flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-1 text-safe">
          <Shield className="h-4 w-4" />
          <span className="text-[10px] font-medium">Home</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute right-[20%] top-[35%] h-24 w-24 rounded-full border-2 border-dashed border-safe/40 bg-safe/5 flex items-center justify-center"
      >
        <div className="flex flex-col items-center gap-1 text-safe">
          <Shield className="h-3 w-3" />
          <span className="text-[10px] font-medium">School</span>
        </div>
      </motion.div>

      {/* Child markers */}
      {children.map((child, index) => {
        const positions = [
          { left: "18%", top: "28%" },
          { left: "55%", top: "45%" },
          { left: "72%", top: "38%" },
        ];
        const pos = positions[index % positions.length];
        const isSelected = selectedChild === child.id;

        return (
          <motion.div
            key={child.id}
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.15, type: "spring" }}
            className="absolute cursor-pointer"
            style={{ left: pos.left, top: pos.top }}
            onClick={() => onSelectChild(child.id)}
          >
            {/* Ripple effect for selected */}
            {isSelected && (
              <motion.div
                className={`absolute -inset-4 rounded-full ${statusColor[child.status]} opacity-20`}
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
            
            {/* Pin */}
            <div className="relative flex flex-col items-center">
              <div
                className={`relative z-10 h-10 w-10 rounded-full border-3 border-card shadow-elevated overflow-hidden ${
                  isSelected ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""
                }`}
              >
                <img src={child.avatar} alt={child.name} className="h-full w-full object-cover" />
              </div>
              <div className={`h-2 w-2 rotate-45 -mt-1 ${statusColor[child.status]}`} />
              <span className="mt-1 text-xs font-semibold text-foreground bg-card/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-card">
                {child.name}
              </span>
            </div>

            {/* Moving indicator */}
            {child.status === "moving" && (
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Navigation className="h-4 w-4 text-accent" />
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 flex gap-3 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-card text-xs">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-safe" /> Safe Zone
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" /> Moving
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-warning" /> Alert
        </span>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <button className="h-8 w-8 rounded-lg bg-card shadow-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors text-sm font-bold">
          +
        </button>
        <button className="h-8 w-8 rounded-lg bg-card shadow-card flex items-center justify-center text-foreground hover:bg-secondary transition-colors text-sm font-bold">
          −
        </button>
      </div>
    </div>
  );
};
