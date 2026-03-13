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
      className="stat-card flex flex-col justify-between h-full"
    >
      <div className="space-y-4">
        <div className={cn("inline-flex rounded-lg p-3", iconColor || "bg-slate-50 border border-slate-100")}>
          <Icon className={cn("h-6 w-6 text-primary")} />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-tight">{title}</p>
          <p className="mt-1 font-heading text-2xl font-black text-slate-900">{value}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-50">
        <p className={cn(
          "text-[11px] font-bold uppercase tracking-wider",
          changeType === "positive" && "text-emerald-600",
          changeType === "negative" && "text-red-600",
          changeType === "neutral" && "text-slate-400"
        )}>
          {change}
        </p>
      </div>
    </motion.div>
  );
};

export default StatCard;
