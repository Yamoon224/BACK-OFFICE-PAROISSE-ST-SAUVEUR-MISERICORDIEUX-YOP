import { cn } from "@/lib/utils"

type StatusType = "pending" | "confirmed" | "cancelled" | "paid" | "unpaid" | "published"

interface StatusBadgeProps {
  status: StatusType
  label: string
}

const statusStyles: Record<StatusType, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  paid: "bg-green-100 text-green-700",
  unpaid: "bg-red-100 text-red-700",
  published: "bg-green-100 text-green-700",
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", statusStyles[status])}>
      {label}
    </span>
  )
}
