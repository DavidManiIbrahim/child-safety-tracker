import { motion } from "framer-motion";
import {
  MapPin,
  Bell,
  Shield,
  Users,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Safe Zones", icon: Shield, path: "/safe-zones" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Admin", icon: Users, path: "/admin" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export const AppSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl gradient-accent flex items-center justify-center shadow-glow-accent">
            <MapPin className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg text-sidebar-foreground">SafeTrack</h1>
            <p className="text-xs text-sidebar-foreground/50">Family Safety</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
              {item.label === "Notifications" && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs font-bold rounded-full px-1.5 py-0.5">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-primary font-bold text-sm">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Jane Doe</p>
            <p className="text-xs text-sidebar-foreground/50">Parent</p>
          </div>
          <button className="text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden h-10 w-10 rounded-xl bg-primary text-primary-foreground shadow-elevated flex items-center justify-center"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            className="fixed left-0 top-0 bottom-0 w-[280px] gradient-primary z-50 lg:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-sidebar-foreground/60 hover:text-sidebar-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent />
          </motion.div>
        </>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-[260px] shrink-0 gradient-primary min-h-screen">
        <SidebarContent />
      </div>
    </>
  );
};
