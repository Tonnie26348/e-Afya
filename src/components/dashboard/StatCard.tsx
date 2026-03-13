import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
}

const StatCard = ({ title, value, change, changeType, icon: Icon, iconColor }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 font-heading text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn("rounded-lg p-2", iconColor || "bg-primary/10")}>
          <Icon className={cn("h-5 w-5", iconColor ? "text-card-foreground" : "text-primary")} />
        </div>
      </div>
      <p className={cn(
        "mt-2 text-xs font-medium",
        changeType === "positive" && "text-secondary",
        changeType === "negative" && "text-destructive",
        changeType === "neutral" && "text-muted-foreground"
      )}>
        {change}
      </p>
    </div>
  );
};

export default StatCard;
