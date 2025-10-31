"use client"

import { Navbar } from "@/components/navbar"
import { ChartContainer } from "@/components/chart-container"
import { Settings, Users, Database, LogOut } from "lucide-react"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "Admin", lastLogin: "2 hours ago" },
    { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "Manager", lastLogin: "30 min ago" },
    { id: 3, name: "Mike Davis", email: "mike@example.com", role: "Technician", lastLogin: "1 hour ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header with Logout */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-sidebar-foreground mb-2">Admin Panel</h1>
              <p className="text-muted-foreground">System configuration and user management</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Total Users</p>
                  <p className="text-3xl font-bold text-primary">8</p>
                </div>
                <Users className="w-8 h-8 text-primary opacity-20" />
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Active Sessions</p>
                  <p className="text-3xl font-bold text-cyan-400">5</p>
                </div>
                <Database className="w-8 h-8 text-cyan-400 opacity-20" />
              </div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">System Status</p>
                  <p className="text-3xl font-bold text-green-400">Healthy</p>
                </div>
                <Settings className="w-8 h-8 text-green-400 opacity-20" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Management */}
            <ChartContainer title="User Management">
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{user.name}</h3>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <span className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
                        {user.role}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Last login: {user.lastLogin}</p>
                  </div>
                ))}
              </div>
            </ChartContainer>

            {/* System Settings */}
            <ChartContainer title="System Configuration">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">Database Backup</p>
                    <p className="text-xs text-muted-foreground">Last backup: 2 hours ago</p>
                  </div>
                  <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                    Run Now
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">AI Model Update</p>
                    <p className="text-xs text-muted-foreground">Current version: 2.3.1</p>
                  </div>
                  <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                    Check
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">Alert Notifications</p>
                    <p className="text-xs text-muted-foreground">Enabled for 8 users</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-semibold text-foreground">Maintenance Logs</p>
                    <p className="text-xs text-muted-foreground">Storage: 45% used</p>
                  </div>
                  <button className="px-3 py-1 rounded text-sm bg-primary/20 text-primary hover:bg-primary/30 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </ChartContainer>
          </div>

          {/* Activity Log */}
          <ChartContainer title="System Activity Log" className="mt-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-3 rounded bg-muted/30">
                <span className="text-foreground">Database backup completed successfully</span>
                <span className="text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between p-3 rounded bg-muted/30">
                <span className="text-foreground">AI model prediction accuracy updated to 97.2%</span>
                <span className="text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex justify-between p-3 rounded bg-muted/30">
                <span className="text-foreground">User 'Sarah Johnson' logged in</span>
                <span className="text-muted-foreground">30 minutes ago</span>
              </div>
              <div className="flex justify-between p-3 rounded bg-muted/30">
                <span className="text-foreground">System alert threshold updated</span>
                <span className="text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex justify-between p-3 rounded bg-muted/30">
                <span className="text-foreground">Maintenance record archived</span>
                <span className="text-muted-foreground">3 days ago</span>
              </div>
            </div>
          </ChartContainer>
        </div>
      </main>
    </div>
  )
}
