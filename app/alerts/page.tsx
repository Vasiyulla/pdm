"use client"

import { Navbar } from "@/components/navbar"
import { ChartContainer } from "@/components/chart-container"
import { AlertCard } from "@/components/alert-card"
import { AlertFilter } from "@/components/alert-filter"
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const alertTrendData = [
  { date: "Mon", critical: 2, warning: 5, info: 12 },
  { date: "Tue", critical: 1, warning: 4, info: 10 },
  { date: "Wed", critical: 3, warning: 7, info: 15 },
  { date: "Thu", critical: 2, warning: 6, info: 13 },
  { date: "Fri", critical: 1, warning: 3, info: 8 },
  { date: "Sat", critical: 0, warning: 2, info: 5 },
  { date: "Sun", critical: 1, warning: 4, info: 9 },
]

const allAlerts = [
  {
    id: 1,
    title: "Gearbox Vibration Anomaly",
    description: "Unusual vibration patterns detected in gearbox assembly",
    severity: "critical",
    component: "Gearbox",
    timestamp: "Just now",
    action: "Immediate inspection required",
  },
  {
    id: 2,
    title: "Motor Bearing Temperature High",
    description: "Motor bearing temperature exceeds safe operational threshold",
    severity: "warning",
    component: "Motor A",
    timestamp: "5 minutes ago",
    action: "Monitor closely, apply cooling",
  },
  {
    id: 3,
    title: "Drive Belt Wear Detected",
    description: "AI model detected increased wear pattern on drive belt",
    severity: "warning",
    component: "Drive Belt",
    timestamp: "15 minutes ago",
    action: "Schedule maintenance within 24 hours",
  },
  {
    id: 4,
    title: "Cooling System Performance",
    description: "Cooling efficiency reduced by 8% compared to baseline",
    severity: "info",
    component: "Cooling System",
    timestamp: "30 minutes ago",
    action: "Check coolant levels",
  },
  {
    id: 5,
    title: "Bearing Assembly Status Update",
    description: "Bearing condition improved after recent maintenance",
    severity: "info",
    component: "Bearing Assembly",
    timestamp: "1 hour ago",
    action: "Continue monitoring",
  },
  {
    id: 6,
    title: "Motor Performance Variation",
    description: "Performance metrics show 3% variation from expected baseline",
    severity: "info",
    component: "Motor B",
    timestamp: "2 hours ago",
    action: "Normal variation, no action needed",
  },
  {
    id: 7,
    title: "Predictive Alert: Maintenance Due",
    description: "AI model predicts maintenance window needed within 7 days",
    severity: "warning",
    component: "Gearbox",
    timestamp: "3 hours ago",
    action: "Schedule maintenance appointment",
  },
  {
    id: 8,
    title: "System Calibration Complete",
    description: "System recalibration successful with updated baseline metrics",
    severity: "info",
    component: "System",
    timestamp: "5 hours ago",
    action: "No action needed",
  },
]

export default function Alerts() {
  const [selectedSeverity, setSelectedSeverity] = useState<"all" | "critical" | "warning" | "info">("all")

  const filteredAlerts =
    selectedSeverity === "all" ? allAlerts : allAlerts.filter((alert) => alert.severity === selectedSeverity)

  const criticalCount = allAlerts.filter((a) => a.severity === "critical").length
  const warningCount = allAlerts.filter((a) => a.severity === "warning").length
  const infoCount = allAlerts.filter((a) => a.severity === "info").length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-sidebar-foreground mb-2">Alerts & Notifications</h1>
            <p className="text-muted-foreground">Real-time system alerts and predictive maintenance warnings</p>
          </div>

          {/* Alert Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Critical Alerts</p>
                  <p className="text-3xl font-bold text-red-400">{criticalCount}</p>
                </div>
                <div className="text-4xl opacity-20">⚠️</div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Warnings</p>
                  <p className="text-3xl font-bold text-amber-400">{warningCount}</p>
                </div>
                <div className="text-4xl opacity-20">📋</div>
              </div>
            </div>
            <div className="p-6 rounded-xl bg-blue-500/10 border border-blue-500/30 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Informational</p>
                  <p className="text-3xl font-bold text-blue-400">{infoCount}</p>
                </div>
                <div className="text-4xl opacity-20">ℹ️</div>
              </div>
            </div>
          </div>

          {/* Alert Trend Chart */}
          <ChartContainer title="Alert Trend (Last 7 Days)" className="mb-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                <Legend />
                <Bar dataKey="critical" fill="#ef4444" radius={[8, 8, 0, 0]} />
                <Bar dataKey="warning" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="info" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Alerts Filter and List */}
          <ChartContainer title="Recent Alerts">
            <AlertFilter selectedSeverity={selectedSeverity} onSeverityChange={setSelectedSeverity} />

            <div className="space-y-4 mt-6">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => <AlertCard key={alert.id} {...alert} />)
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No alerts found for selected severity level</p>
                </div>
              )}
            </div>
          </ChartContainer>
        </div>
      </main>
    </div>
  )
}
