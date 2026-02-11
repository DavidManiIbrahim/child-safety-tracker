import { motion } from "framer-motion";
import { Users, Shield, Activity, Search, MoreHorizontal, UserCheck, UserX, Settings } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";

const users = [
  { id: "1", name: "Jane Doe", email: "jane@example.com", role: "Parent", children: 3, status: "active", joined: "Jan 2024" },
  { id: "2", name: "John Smith", email: "john@example.com", role: "Parent", children: 2, status: "active", joined: "Feb 2024" },
  { id: "3", name: "Sarah Wilson", email: "sarah@example.com", role: "Parent", children: 1, status: "active", joined: "Mar 2024" },
  { id: "4", name: "Mike Brown", email: "mike@example.com", role: "Parent", children: 2, status: "inactive", joined: "Jan 2024" },
  { id: "5", name: "Admin User", email: "admin@safetrack.com", role: "Admin", children: 0, status: "active", joined: "Dec 2023" },
];

const adminStats = [
  { label: "Total Users", value: "156", icon: Users, color: "text-accent" },
  { label: "Active Trackers", value: "312", icon: Activity, color: "text-safe" },
  { label: "Safe Zones", value: "487", icon: Shield, color: "text-warning" },
];

const Admin = () => (
  <div className="flex min-h-screen bg-background">
    <AppSidebar />
    <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="pl-12 lg:pl-0">
            <h1 className="font-display font-bold text-xl text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage users and system performance</p>
          </div>
          <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
            <Settings className="h-4 w-4" />
            System Settings
          </button>
        </div>
      </header>

      <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {adminStats.map((stat, i) => (
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

        {/* Users Table */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground">User Accounts</h2>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <input type="text" placeholder="Search users..." className="bg-transparent text-sm outline-none w-40 text-foreground placeholder:text-muted-foreground" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">User</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Children</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Joined</th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-card-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role === "Admin" ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-card-foreground">{user.children}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs ${user.status === "active" ? "text-safe" : "text-muted-foreground"}`}>
                        {user.status === "active" ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="h-8 w-8 rounded-lg hover:bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ml-auto">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Admin;
