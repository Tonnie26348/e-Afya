import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconColor?: string;
  index?: number;
}

const StatCard = ({ title, value, change, changeType, icon: Icon, iconColor, index = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="stat-card"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className={cn("rounded-xl p-2.5", iconColor || "bg-primary/10")}>
          <Icon className={cn("h-5 w-5", iconColor ? "text-card-foreground" : "text-primary")} />
        </div>
      </div>
      <p className={cn(
        "mt-3 text-xs font-medium",
        changeType === "positive" && "text-secondary",
        changeType === "negative" && "text-destructive",
        changeType === "neutral" && "text-muted-foreground"
      )}>
        {change}
      </p>
    </motion.div>
  );
};

export default StatCard;
