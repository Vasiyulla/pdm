import type { ReactNode } from "react"

interface HealthIndicatorProps {
  label: string
  value: number
  status: "healthy" | "warning" | "critical"
  unit?: string
  label2?: string
  icon: ReactNode
}

export function HealthIndicator({ label, value, status, unit, label2, icon }: HealthIndicatorProps) {
  const statusColors = {
    healthy: "bg-green-500/10 border-green-500/30 text-green-400",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    critical: "bg-red-500/10 border-red-500/30 text-red-400",
  }

  const iconColors = {
    healthy: "text-green-500",
    warning: "text-amber-500",
    critical: "text-red-500",
  }

  return (
    <div className={`p-6 rounded-xl border ${statusColors[status]} backdrop-blur-md`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-muted-foreground text-sm font-medium">{label}</p>
          {label2 && <p className="text-muted-foreground text-xs mt-1">{label2}</p>}
        </div>
        <div className={`${iconColors[status]}`}>{icon}</div>
      </div>
      <div className="text-3xl font-bold text-sidebar-foreground">
        {value}
        {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
      </div>
    </div>
  )
}
