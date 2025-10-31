"use client"

import { Navbar } from "@/components/navbar"
import { ChartContainer } from "@/components/chart-container"
import { ReportCard } from "@/components/report-card"
import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts"

const mttrData = [
  { month: "Jan", mttr: 2.4, planned: 2 },
  { month: "Feb", mttr: 2.1, planned: 2 },
  { month: "Mar", mttr: 1.8, planned: 2 },
  { month: "Apr", mttr: 2.2, planned: 2 },
  { month: "May", mttr: 1.9, planned: 2 },
  { month: "Jun", mttr: 1.7, planned: 2 },
]

const oeeData = [
  { week: "W1", availability: 97, performance: 94, quality: 99 },
  { week: "W2", availability: 96, performance: 95, quality: 99 },
  { week: "W3", availability: 98, performance: 96, quality: 98 },
  { week: "W4", availability: 97, performance: 94, quality: 99 },
]

const costData = [
  { month: "Jan", preventive: 5000, reactive: 12000 },
  { month: "Feb", preventive: 4800, reactive: 10500 },
  { month: "Mar", preventive: 5200, reactive: 8000 },
  { month: "Apr", preventive: 4600, reactive: 7500 },
  { month: "May", preventive: 5100, reactive: 6800 },
  { month: "Jun", preventive: 4900, reactive: 5200 },
]

const upetimeData = [
  { date: "01-Jun", uptime: 99.2 },
  { date: "02-Jun", uptime: 99.5 },
  { date: "03-Jun", uptime: 99.1 },
  { date: "04-Jun", uptime: 99.7 },
  { date: "05-Jun", uptime: 99.3 },
  { date: "06-Jun", uptime: 99.8 },
  { date: "07-Jun", uptime: 99.4 },
]

const reports = [
  {
    id: 1,
    title: "Monthly Performance Report",
    description: "Comprehensive analysis of equipment performance metrics and trends",
    date: "June 2024",
    type: "monthly",
  },
  {
    id: 2,
    title: "Maintenance ROI Analysis",
    description: "Return on investment analysis for preventive vs reactive maintenance",
    date: "Q2 2024",
    type: "quarterly",
  },
  {
    id: 3,
    title: "Predictive Model Accuracy",
    description: "AI model performance and prediction accuracy metrics",
    date: "June 2024",
    type: "weekly",
  },
  {
    id: 4,
    title: "Component Lifecycle Report",
    description: "Analysis of component health trends and replacement recommendations",
    date: "June 2024",
    type: "custom",
  },
]

export default function Reports() {
  const [reportPeriod, setReportPeriod] = useState("monthly")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-sidebar-foreground mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Historical data analysis and predictive insights</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-md">
              <p className="text-muted-foreground text-sm mb-2">Average Uptime</p>
              <p className="text-3xl font-bold text-green-400">99.5%</p>
              <p className="text-xs text-muted-foreground mt-2">↑ 0.3% vs last month</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-md">
              <p className="text-muted-foreground text-sm mb-2">Avg Maintenance Cost</p>
              <p className="text-3xl font-bold text-blue-400">$4,950</p>
              <p className="text-xs text-muted-foreground mt-2">↓ 12% reduction</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-md">
              <p className="text-muted-foreground text-sm mb-2">Overall Equipment Efficiency</p>
              <p className="text-3xl font-bold text-cyan-400">96.2%</p>
              <p className="text-xs text-muted-foreground mt-2">↑ 2.1% improvement</p>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border backdrop-blur-md">
              <p className="text-muted-foreground text-sm mb-2">Mean Time to Repair</p>
              <p className="text-3xl font-bold text-purple-400">1.7h</p>
              <p className="text-xs text-muted-foreground mt-2">↓ 29% faster</p>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartContainer title="MTTR Trend (Mean Time to Repair)">
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={mttrData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                  <Legend />
                  <Bar dataKey="mttr" fill="#ef4444" name="Actual MTTR (hours)" radius={[8, 8, 0, 0]} />
                  <Line type="monotone" dataKey="planned" stroke="#10b981" strokeWidth={2} name="Target" />
                </ComposedChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="Maintenance Cost Analysis">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="preventive"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.4}
                    name="Preventive"
                  />
                  <Area
                    type="monotone"
                    dataKey="reactive"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.4}
                    name="Reactive"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* OEE and Uptime Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartContainer title="Overall Equipment Efficiency (OEE)">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={oeeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                  <XAxis dataKey="week" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                  <Legend />
                  <Bar dataKey="availability" fill="#3b82f6" name="Availability %" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="performance" fill="#06b6d4" name="Performance %" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="quality" fill="#10b981" name="Quality %" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartContainer title="System Uptime Trend (7 Days)">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={upetimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f3a52" />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" domain={[98.5, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: "#131d3d", border: "1px solid #1f3a52" }} />
                  <Line
                    type="monotone"
                    dataKey="uptime"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981", r: 4 }}
                    name="Uptime %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Available Reports */}
          <ChartContainer title="Available Reports">
            <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-border">
              {["monthly", "quarterly", "weekly", "custom"].map((period) => (
                <button
                  key={period}
                  onClick={() => setReportPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    reportPeriod === period
                      ? "bg-primary/20 text-primary"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report) => (
                <ReportCard key={report.id} {...report} />
              ))}
            </div>
          </ChartContainer>
        </div>
      </main>
    </div>
  )
}
