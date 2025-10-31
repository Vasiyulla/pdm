"use client"

interface AlertFilterProps {
  selectedSeverity: "all" | "critical" | "warning" | "info"
  onSeverityChange: (severity: "all" | "critical" | "warning" | "info") => void
}

export function AlertFilter({ selectedSeverity, onSeverityChange }: AlertFilterProps) {
  const filters: Array<"all" | "critical" | "warning" | "info"> = ["all", "critical", "warning", "info"]

  const filterLabels = {
    all: "All Alerts",
    critical: "Critical Only",
    warning: "Warnings",
    info: "Informational",
  }

  const filterColors = {
    all: "bg-primary/20 text-primary hover:bg-primary/30",
    critical: "bg-red-500/20 text-red-400 hover:bg-red-500/30",
    warning: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30",
    info: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30",
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSeverityChange(filter)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedSeverity === filter ? filterColors[filter] : "bg-muted/50 text-muted-foreground hover:bg-muted"
          }`}
        >
          {filterLabels[filter]}
        </button>
      ))}
    </div>
  )
}
