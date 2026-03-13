import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Package, TrendingDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const inventory = [
  { drug: "Paracetamol 500mg", hospital: "Kenyatta NH", stock: 120, maxStock: 1000, status: "critical" as const },
  { drug: "Amoxicillin 250mg", hospital: "Moi TRH", stock: 350, maxStock: 1000, status: "low" as const },
  { drug: "Artemether/Lumefantrine", hospital: "Coast GH", stock: 580, maxStock: 1000, status: "adequate" as const },
  { drug: "Metformin 500mg", hospital: "Kisumu CRH", stock: 720, maxStock: 1000, status: "adequate" as const },
  { drug: "Blood Type O-", hospital: "Nakuru L5", stock: 8, maxStock: 100, status: "critical" as const },
  { drug: "ARV (TLD)", hospital: "Garissa CRH", stock: 450, maxStock: 800, status: "adequate" as const },
  { drug: "ORS Sachets", hospital: "Turkana CRH", stock: 200, maxStock: 500, status: "low" as const },
  { drug: "Insulin (Soluble)", hospital: "Kenyatta NH", stock: 90, maxStock: 300, status: "low" as const },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "critical": return <Badge variant="destructive" className="text-[11px]">Critical</Badge>;
    case "low": return <Badge className="bg-warning text-warning-foreground text-[11px]">Low</Badge>;
    default: return <Badge variant="secondary" className="text-[11px]">Adequate</Badge>;
  }
};

const redistribution = [
  { drug: "Paracetamol 500mg", from: "Moi TRH (350 surplus)", to: "Kenyatta NH (120 stock)", qty: 200 },
  { drug: "Blood Type O-", from: "Nairobi Blood Bank", to: "Nakuru L5 (8 units)", qty: 25 },
];

const DrugSupply = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h1>National Drug Supply Monitor</h1>
        <p>Real-time medicine inventory across facilities</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {[
          { label: "Tracked Medicines", value: "2,847" },
          { label: "Critical Alerts", value: "23", color: "text-destructive" },
          { label: "Low Stock Items", value: "156", color: "text-warning" },
          { label: "Redistribution Pending", value: "12", color: "text-primary" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</p>
            <p className={`font-heading text-xl sm:text-2xl font-bold mt-2 ${s.color || "text-foreground"}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="module-card overflow-hidden">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Inventory Overview</h3>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Drug</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Facility</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stock Level</th>
                <th className="pb-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {inventory.map((item, i) => (
                <motion.tr
                  key={i}
                  className="hover:bg-accent/30 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.03 }}
                >
                  <td className="py-3.5 font-medium text-foreground">{item.drug}</td>
                  <td className="py-3.5 text-muted-foreground">{item.hospital}</td>
                  <td className="py-3.5 w-48">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(item.stock / item.maxStock) * 100}
                        className={cn(
                          "h-2 flex-1 rounded-full",
                          item.status === "critical" ? "[&>div]:bg-destructive" : item.status === "low" ? "[&>div]:bg-warning" : "[&>div]:bg-secondary"
                        )}
                      />
                      <span className="text-xs text-muted-foreground w-16 text-right">{item.stock}/{item.maxStock}</span>
                    </div>
                  </td>
                  <td className="py-3.5">{statusBadge(item.status)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="module-card">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-primary" /> Redistribution Recommendations
        </h3>
        <div className="space-y-3">
          {redistribution.map((r, i) => (
            <motion.div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border bg-primary/5 p-4 gap-3"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.drug}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 flex-wrap">{r.from} <ArrowRight className="h-3 w-3 shrink-0" /> {r.to}</p>
                </div>
              </div>
              <Badge variant="outline" className="self-start sm:self-center">{r.qty} units</Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DrugSupply;
