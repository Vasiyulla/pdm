"use client"

import { Navbar } from "@/components/navbar"
import { ChartContainer } from "@/components/chart-container"
import { HealthIndicator } from "@/components/health-indicator"
import { ComponentStatus } from "@/components/component-status"
import { AlertCircle, CheckCircle2, AlertTriangle, Cpu } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const healthTrendData = [
  { time: "00:00", health: 95, predicted: 94 },
  { time: "04:00", health: 92, predicted: 91 },
  { time: "08:00", health: 88, predicted: 87 },
  { time: "12:00", health: 91, predicted: 90 },
  { time: "16:00", health: 94, predicted: 93 },
  { time: "20:00", health: 97, predicted: 96 },
  { time: "24:00", health: 96, predicted: 97 },
]

const temperatureData = [
  { time: "00:00", motor1: 65, motor2: 63, motor3: 64 },
  { time: "04:00", motor1: 68, motor2: 66, motor3: 67 },
  { time: "08:00", motor1: 75, motor2: 74, motor3: 76 },
  { time: "12:00", motor1: 82, motor2: 80, motor3: 81 },
  { time: "16:00", motor1: 78, motor2: 77, motor3: 79 },
  { time: "20:00", motor1: 72, motor2: 71, motor3: 73 },
  { time: "24:00", motor1: 68, motor2: 67, motor3: 68 },
]

const anomalyData = [
  { x: 1, y: 2.1, type: "normal" },
  { x: 2, y: 2.3, type: "normal" },
  { x: 3, y: 2.4, type: "normal" },
  { x: 4, y: 2.2, type: "normal" },
  { x: 5, y: 5.8, type: "anomaly" },
  { x: 6, y: 2.5, type: "normal" },
  { x: 7, y: 2.4, type: "normal" },
  { x: 8, y: 2.3, type: "normal" },
]

const componentStatuses = [
  { name: "Motor A", status: "healthy", uptime: "99.7%", lastCheck: "2 min ago" },
  { name: "Motor B", status: "healthy", uptime: "99.8%", lastCheck: "1 min ago" },
  { name: "Bearing Assembly", status: "warning", uptime: "97.2%", lastCheck: "5 min ago" },
  { name: "Drive Belt", status: "healthy", uptime: "98.9%", lastCheck: "3 min ago" },
  { name: "Cooling System", status: "healthy", uptime: "99.5%", lastCheck: "1 min ago" },
  { name: "Gearbox", status: "critical", uptime: "92.1%", lastCheck: "Just now" },
]

export default function SystemHealth() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-sidebar-foreground mb-2">System Health</h1>
            <p className="text-muted-foreground">Real-time equipment diagnostics and predictive analytics</p>
          </div>

          {/* Overall Health Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <HealthIndicator
              label="System Health"
              value={94}
              status="healthy"
              icon={<CheckCircle2 className="w-6 h-6" />}
            />
            <HealthIndicator
              label="Equipment Status"
              value={5}
              status="warning"
              label2="Issues Detected"
              icon={<AlertTriangle className="w-6 h-6" />}
            />
            <HealthIndicator
              label="Average Efficiency"
              value={96}
              status="healthy"
              unit="%"
              icon={<Cpu className="w-6 h-6" />}
            />
            <HealthIndicator
              label="Anomalies"
              value={1}
              status="critical"
              label2="Recent Anomaly"
              icon={<AlertCircle className="w-6 h-6" />}
            />
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartContainer title="System Health Trend vs Prediction">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="health"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Current Health"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Predicted"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Component Temperature Analysis">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="motor1"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    name="Motor 1"
                  />
                  <Area
                    type="monotone"
                    dataKey="motor2"
                    stackId="1"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.3}
                    name="Motor 2"
                  />
                  <Area
                    type="monotone"
                    dataKey="motor3"
                    stackId="1"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    name="Motor 3"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Anomaly Detection */}
          <ChartContainer title="Vibration Anomaly Detection" className="mb-8">
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                <XAxis dataKey="x" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                <Scatter name="Normal" data={anomalyData.filter((d) => d.type === "normal")} fill="#10b981" />
                <Scatter name="Anomaly" data={anomalyData.filter((d) => d.type === "anomaly")} fill="#ef4444" />
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Component Status Grid */}
          <ChartContainer title="Equipment Component Status">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {componentStatuses.map((component) => (
                <ComponentStatus key={component.name} {...component} />
              ))}
            </div>
          </ChartContainer>
        </div>
      </main>
    </div>
  )
}
