import { motion } from "framer-motion";
import { Bell, MapPin, Shield, Clock, Smartphone, Volume2, ToggleLeft } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-xl border border-border p-5 shadow-card">
    <h3 className="font-display font-semibold text-card-foreground mb-4">{title}</h3>
    <div className="space-y-4">{children}</div>
  </div>
);

const ToggleRow = ({ label, description, defaultOn = true }: { label: string; description: string; defaultOn?: boolean }) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-card-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
    <button className={`h-6 w-11 rounded-full transition-colors relative ${defaultOn ? "bg-accent" : "bg-muted"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-transform ${defaultOn ? "left-[22px]" : "left-0.5"}`} />
    </button>
  </div>
);

const SettingsPage = () => (
  <div className="flex min-h-screen bg-background">
    <AppSidebar />
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 lg:px-6 py-3">
        <div className="pl-12 lg:pl-0">
          <h1 className="font-display font-bold text-xl text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground">Configure your tracking preferences</p>
        </div>
      </header>
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
        <div className="max-w-2xl space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <SettingSection title="Notifications">
              <ToggleRow label="Safe zone arrivals" description="Get notified when a child arrives at a safe zone" />
              <ToggleRow label="Safe zone departures" description="Get notified when a child leaves a safe zone" />
              <ToggleRow label="Low battery alerts" description="Receive alerts when a child's device battery is low" />
              <ToggleRow label="Outside safe zones" description="Alert when a child is not in any safe zone" defaultOn={true} />
            </SettingSection>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <SettingSection title="Tracking">
              <ToggleRow label="High accuracy mode" description="Uses more battery but provides precise location" />
              <ToggleRow label="Location history" description="Store location history for the past 7 days" defaultOn={true} />
              <ToggleRow label="Speed alerts" description="Notify when a child is moving above normal speed" defaultOn={false} />
            </SettingSection>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <SettingSection title="Account">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Email</p>
                  <p className="text-xs text-muted-foreground">jane@example.com</p>
                </div>
                <button className="text-sm text-accent hover:underline">Change</button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Password</p>
                  <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
                </div>
                <button className="text-sm text-accent hover:underline">Update</button>
              </div>
            </SettingSection>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

export default SettingsPage;
