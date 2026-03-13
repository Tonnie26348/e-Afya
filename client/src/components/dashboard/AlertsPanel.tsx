import { AlertTriangle, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const alerts = [
  { type: "critical" as const, message: "Paracetamol stock critically low at Kenyatta National Hospital", time: "2 min ago" },
  { type: "critical" as const, message: "ICU beds at 95% capacity — Mombasa County Referral", time: "15 min ago" },
  { type: "warning" as const, message: "Unusual cholera cases spike in Kisumu County", time: "1 hr ago" },
  { type: "critical" as const, message: "Blood supply type O- critical at Nakuru Level 5", time: "2 hrs ago" },
  { type: "success" as const, message: "Malaria vaccine rollout completed — Turkana County", time: "3 hrs ago" },
];

const iconMap = {
  critical: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle2,
};

const AlertsPanel = () => {
  return (
    <div className="module-card">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-4">System Alerts</h3>
      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const Icon = iconMap[alert.type];
          return (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3 rounded-md border p-3 text-sm",
                alert.type === "critical" && "alert-critical",
                alert.type === "warning" && "alert-warning",
                alert.type === "success" && "alert-success"
              )}
            >
              <Icon className="h-4 w-4 mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="font-medium">{alert.message}</p>
                <p className="mt-1 text-xs opacity-70">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsPanel;
