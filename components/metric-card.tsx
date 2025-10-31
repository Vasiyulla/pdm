import type { ReactNode } from "react"

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon: ReactNode
  status?: "normal" | "warning" | "critical"
  trend?: "up" | "down" | "stable"
}

export function MetricCard({ label, value, unit, icon, status = "normal", trend }: MetricCardProps) {
  const statusColors = {
    normal: "border-green-500/30 bg-green-500/5",
    warning: "border-amber-500/30 bg-amber-500/5",
    critical: "border-red-500/30 bg-red-500/5",
  }

  const statusIndicator = {
    normal: "bg-green-500",
    warning: "bg-amber-500",
    critical: "bg-red-500",
  }

  return (
    <div className={`metric-card p-6 rounded-xl border ${statusColors[status]} backdrop-blur-md transition-all`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-muted-foreground text-sm font-medium">{label}</div>
        <div className={`w-3 h-3 rounded-full ${statusIndicator[status]} animate-pulse`} />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold text-sidebar-foreground">
            {value}
            {unit && <span className="text-lg text-muted-foreground ml-2">{unit}</span>}
          </div>
        </div>
        <div className="text-primary text-4xl opacity-20">{icon}</div>
      </div>

      {trend && (
        <div className="mt-4 text-xs text-muted-foreground">
          Trend: {trend === "up" ? "📈" : trend === "down" ? "📉" : "→"}
        </div>
      )}
    </div>
  )
}
