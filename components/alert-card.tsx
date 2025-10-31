import { AlertCircle, AlertTriangle, Info } from "lucide-react"

interface AlertCardProps {
  title: string
  description: string
  severity: "critical" | "warning" | "info"
  component: string
  timestamp: string
  action: string
}

export function AlertCard({ title, description, severity, component, timestamp, action }: AlertCardProps) {
  const severityConfig = {
    critical: {
      icon: AlertCircle,
      color: "border-red-500/30 bg-red-500/5",
      textColor: "text-red-400",
      label: "Critical",
      badge: "bg-red-500/20 text-red-400",
    },
    warning: {
      icon: AlertTriangle,
      color: "border-amber-500/30 bg-amber-500/5",
      textColor: "text-amber-400",
      label: "Warning",
      badge: "bg-amber-500/20 text-amber-400",
    },
    info: {
      icon: Info,
      color: "border-blue-500/30 bg-blue-500/5",
      textColor: "text-blue-400",
      label: "Info",
      badge: "bg-blue-500/20 text-blue-400",
    },
  }

  const config = severityConfig[severity]
  const Icon = config.icon

  return (
    <div className={`p-4 rounded-lg border ${config.color} backdrop-blur-md hover:border-primary/50 transition-all`}>
      <div className="flex gap-4">
        <div className={`flex-shrink-0 ${config.textColor} mt-1`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${config.badge}`}>
              {config.label}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground">Component</p>
              <p className="text-foreground font-medium">{component}</p>
            </div>
            <div>
              <p className="text-muted-foreground">When</p>
              <p className="text-foreground font-medium">{timestamp}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground">Recommended Action</p>
              <p className="text-foreground font-medium text-accent">{action}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
