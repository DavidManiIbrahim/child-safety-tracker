import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface StatusBadgeProps {
  status: "safe" | "warning" | "away" | "moving";
  children: ReactNode;
}

const statusStyles = {
  safe: "bg-safe text-safe-foreground",
  warning: "bg-warning text-warning-foreground",
  away: "bg-away text-away-foreground",
  moving: "bg-accent text-accent-foreground",
};

export const StatusBadge = ({ status, children }: StatusBadgeProps) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
  >
    {status === "safe" && (
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    )}
    {status === "moving" && (
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-current"
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    )}
    {children}
  </span>
);
