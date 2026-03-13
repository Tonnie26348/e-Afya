import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Building2, Bed, Stethoscope, Ambulance } from "lucide-react";
import { motion } from "framer-motion";

const hospitals = [
  { name: "Kenyatta National Hospital", county: "Nairobi", beds: 85, icu: 92, specialists: 45, ambulances: 8 },
  { name: "Moi Teaching & Referral", county: "Uasin Gishu", beds: 72, icu: 65, specialists: 38, ambulances: 6 },
  { name: "Coast General Hospital", county: "Mombasa", beds: 58, icu: 45, specialists: 22, ambulances: 4 },
  { name: "Kisumu County Referral", county: "Kisumu", beds: 90, icu: 78, specialists: 18, ambulances: 3 },
  { name: "Nakuru Level 5 Hospital", county: "Nakuru", beds: 67, icu: 88, specialists: 15, ambulances: 5 },
  { name: "Garissa County Referral", county: "Garissa", beds: 42, icu: 30, specialists: 8, ambulances: 2 },
];

const capacityColor = (val: number) => val >= 85 ? "text-destructive" : val >= 60 ? "text-warning" : "text-secondary";
const capacityBg = (val: number) => val >= 85 ? "[&>div]:bg-destructive" : val >= 60 ? "[&>div]:bg-warning" : "[&>div]:bg-secondary";

const Referrals = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h1>Smart Referral & Hospital Capacity</h1>
        <p>Real-time bed availability and referral management</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {[
          { icon: Bed, color: "text-primary", bg: "bg-primary/10", label: "Total Beds", value: "24,580" },
          { icon: Building2, color: "text-destructive", bg: "bg-destructive/10", label: "ICU Available", value: "127" },
          { icon: Stethoscope, color: "text-secondary", bg: "bg-secondary/10", label: "Specialists On-Call", value: "342" },
          { icon: Ambulance, color: "text-warning", bg: "bg-warning/10", label: "Ambulances Active", value: "89" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="stat-card flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className={cn("rounded-xl p-2.5", s.bg)}>
              <s.icon className={cn("h-5 w-5", s.color)} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <p className="font-heading text-lg font-bold text-foreground">{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="module-card">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Facility Capacity Monitor</h3>
        <div className="space-y-3">
          {hospitals.map((h, i) => (
            <motion.div
              key={i}
              className="rounded-lg border p-4 hover:bg-accent/30 transition-colors"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
                <div>
                  <p className="text-sm font-medium text-foreground">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.county} County</p>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{h.specialists} specialists</span>
                  <span>{h.ambulances} ambulances</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Bed Occupancy</span>
                    <span className={cn("font-semibold", capacityColor(h.beds))}>{h.beds}%</span>
                  </div>
                  <Progress value={h.beds} className={cn("h-2 rounded-full", capacityBg(h.beds))} />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">ICU Occupancy</span>
                    <span className={cn("font-semibold", capacityColor(h.icu))}>{h.icu}%</span>
                  </div>
                  <Progress value={h.icu} className={cn("h-2 rounded-full", capacityBg(h.icu))} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Referrals;
