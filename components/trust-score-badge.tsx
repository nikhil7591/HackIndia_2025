import { cn } from "@/lib/utils"

interface TrustScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
}

export function TrustScoreBadge({ score, size = "md" }: TrustScoreBadgeProps) {
  const getColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    if (score >= 60) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    if (score >= 40) return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  }

  return (
    <div
      className={cn("rounded-full font-medium flex items-center justify-center", getColor(score), sizeClasses[size])}
    >
      Trust Score: {score}%
    </div>
  )
}
