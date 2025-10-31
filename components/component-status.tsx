import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

interface ComponentStatusProps {
  name: string
  status: "healthy" | "warning" | "critical"
  uptime: string
  lastCheck: string
}

export function ComponentStatus({ name, status, uptime, lastCheck }: ComponentStatusProps) {
  const statusConfig = {
    healthy: {
      icon: CheckCircle2,
      color: "text-green-500 bg-green-500/10",
      label: "Healthy",
    },
    warning: {
      icon: AlertTriangle,
      color: "text-amber-500 bg-amber-500/10",
      label: "Warning",
    },
    critical: {
      icon: AlertCircle,
      color: "text-red-500 bg-red-500/10",
      label: "Critical",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-card-foreground text-sm">{name}</h4>
        <div className={`p-2 rounded-lg ${config.color}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>
          <span className="font-medium text-foreground">{config.label}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Uptime</span>
          <span className="font-medium text-foreground">{uptime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last Check</span>
          <span className="font-medium text-foreground">{lastCheck}</span>
        </div>
      </div>
    </div>
  )
}
