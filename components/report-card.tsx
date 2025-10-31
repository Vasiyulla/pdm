import { Download, FileText } from "lucide-react"

interface ReportCardProps {
  id: number
  title: string
  description: string
  date: string
  type: string
}

export function ReportCard({ id, title, description, date, type }: ReportCardProps) {
  const typeColors = {
    monthly: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    quarterly: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    weekly: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    custom: "bg-green-500/10 text-green-400 border-green-500/30",
  }

  return (
    <div className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all hover:bg-card/80">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded text-xs font-medium border ${typeColors[type as keyof typeof typeColors]}`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors group" aria-label="Download report">
          <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
        </button>
      </div>
    </div>
  )
}
