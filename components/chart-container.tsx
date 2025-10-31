import type { ReactNode } from "react"

interface ChartContainerProps {
  title: string
  children: ReactNode
  className?: string
}

export function ChartContainer({ title, children, className = "" }: ChartContainerProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 backdrop-blur-md ${className}`}>
      <h3 className="text-lg font-semibold text-card-foreground mb-6">{title}</h3>
      {children}
    </div>
  )
}
