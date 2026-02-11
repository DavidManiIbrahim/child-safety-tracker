import { motion, AnimatePresence } from "framer-motion";
import { Bell, MapPin, Shield, AlertTriangle, Clock, X } from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  type: "arrival" | "departure" | "alert" | "battery";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "arrival",
    title: "Emma arrived at School",
    message: "Entered safe zone at 8:02 AM",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "departure",
    title: "Lucas left Home",
    message: "Departed safe zone at 7:45 AM",
    time: "19 min ago",
    read: false,
  },
  {
    id: "3",
    type: "alert",
    title: "Sophie outside safe zones",
    message: "Currently at 342 Oak Street",
    time: "35 min ago",
    read: true,
  },
  {
    id: "4",
    type: "battery",
    title: "Lucas's battery low",
    message: "Battery at 15% — remind to charge",
    time: "1 hr ago",
    read: true,
  },
];

const typeIcon = {
  arrival: Shield,
  departure: MapPin,
  alert: AlertTriangle,
  battery: AlertTriangle,
};

const typeColor = {
  arrival: "text-safe bg-safe/10",
  departure: "text-accent bg-accent/10",
  alert: "text-warning bg-warning/10",
  battery: "text-destructive bg-destructive/10",
};

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel = ({ isOpen, onClose }: NotificationPanelProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-card border-l border-border shadow-elevated z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-foreground" />
                <h2 className="font-display font-semibold text-lg">Notifications</h2>
                {unreadCount > 0 && (
                  <span className="bg-destructive text-destructive-foreground text-xs font-bold rounded-full px-2 py-0.5">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={markAllRead}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Mark all read
                </button>
                <button
                  onClick={onClose}
                  className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {notifications.map((notification, index) => {
                const Icon = typeIcon[notification.type];
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-xl mb-1 transition-colors cursor-pointer ${
                      notification.read
                        ? "hover:bg-secondary/50"
                        : "bg-accent/5 hover:bg-accent/10"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${typeColor[notification.type]}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p
                            className={`text-sm ${
                              notification.read
                                ? "text-muted-foreground"
                                : "text-card-foreground font-medium"
                            }`}
                          >
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
