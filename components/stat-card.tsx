import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  trend?: string
  trendUp?: boolean
  iconBgColor?: string
  iconColor?: string
}

export function StatCard({
  icon: Icon,
  value,
  label,
  trend,
  trendUp = true,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
}: StatCardProps) {
  return (
    <div className="bg-card rounded-xl p-4 lg:p-5 border border-border">
      <div className="flex items-start gap-3 lg:gap-4">
        <div className={cn("p-2 lg:p-3 rounded-xl shrink-0", iconBgColor)}>
          <Icon className={cn("w-5 h-5 lg:w-6 lg:h-6", iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xl lg:text-3xl font-bold text-foreground truncate">{value}</p>
          <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{label}</p>
        </div>
        {trend && (
          <span className={cn("text-xs lg:text-sm font-medium shrink-0", trendUp ? "text-green-600" : "text-red-600")}>
            {trendUp ? "↗" : "↘"} {trend}
          </span>
        )}
      </div>
    </div>
  )
}
