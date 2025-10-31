"use client"

import { Navbar } from "@/components/navbar"
import { MetricCard } from "@/components/metric-card"
import { ChartContainer } from "@/components/chart-container"
import { Activity, Zap, Wind, Gauge, AlertCircle, TrendingUp } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const performanceData = [
  { time: "00:00", performance: 95 },
  { time: "04:00", performance: 92 },
  { time: "08:00", performance: 88 },
  { time: "12:00", performance: 91 },
  { time: "16:00", performance: 94 },
  { time: "20:00", performance: 97 },
  { time: "24:00", performance: 96 },
]

const powerData = [
  { time: "00:00", power: 120 },
  { time: "04:00", power: 95 },
  { time: "08:00", power: 140 },
  { time: "12:00", power: 155 },
  { time: "16:00", power: 165 },
  { time: "20:00", power: 130 },
  { time: "24:00", power: 100 },
]

const healthData = [
  { name: "Optimal", value: 60 },
  { name: "Good", value: 25 },
  { name: "Fair", value: 12 },
  { name: "Critical", value: 3 },
]

const COLORS = ["#10b981", "#f59e0b", "#f97316", "#ef4444"]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-sidebar-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Real-time system overview and AI predictions</p>
          </div>

          {/* Prediction Status */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-6 mb-8 backdrop-blur-md glow-effect">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-sidebar-foreground mb-1">AI Prediction Status</h2>
                <p className="text-muted-foreground">
                  Current Status: <span className="text-green-400 font-semibold">Normal</span> - All systems operating
                  optimally
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <MetricCard
              label="Machine Temperature"
              value="72"
              unit="°C"
              icon={<Activity className="w-8 h-8" />}
              status="normal"
              trend="stable"
            />
            <MetricCard
              label="Vibration Level"
              value="2.4"
              unit="mm/s"
              icon={<Wind className="w-8 h-8" />}
              status="normal"
              trend="down"
            />
            <MetricCard
              label="Current"
              value="48"
              unit="A"
              icon={<Zap className="w-8 h-8" />}
              status="normal"
              trend="stable"
            />
            <MetricCard
              label="Voltage"
              value="440"
              unit="V"
              icon={<Gauge className="w-8 h-8" />}
              status="normal"
              trend="up"
            />
            <MetricCard
              label="Health Score"
              value="94"
              unit="%"
              icon={<TrendingUp className="w-8 h-8" />}
              status="normal"
              trend="up"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartContainer title="Equipment Performance (24h)">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                  <Line
                    type="monotone"
                    dataKey="performance"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Power vs Time (24h)">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={powerData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                  <Bar dataKey="power" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Health Trend Chart */}
          <ChartContainer title="Equipment Health Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={healthData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {healthData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </main>
    </div>
  )
}
