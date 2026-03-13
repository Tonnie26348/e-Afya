import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertTriangle, Package, TrendingDown, ArrowRight } from "lucide-react";

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
    case "critical": return <Badge variant="destructive">Critical</Badge>;
    case "low": return <Badge className="bg-warning text-warning-foreground">Low</Badge>;
    default: return <Badge variant="secondary">Adequate</Badge>;
  }
};

const redistribution = [
  { drug: "Paracetamol 500mg", from: "Moi TRH (350 surplus)", to: "Kenyatta NH (120 stock)", qty: 200 },
  { drug: "Blood Type O-", from: "Nairobi Blood Bank", to: "Nakuru L5 (8 units)", qty: 25 },
];

const DrugSupply = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">National Drug Supply Monitor</h1>
        <p className="text-sm text-muted-foreground">Real-time medicine inventory across facilities</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="stat-card"><p className="text-sm text-muted-foreground">Tracked Medicines</p><p className="font-heading text-2xl font-bold text-foreground mt-1">2,847</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Critical Alerts</p><p className="font-heading text-2xl font-bold text-destructive mt-1">23</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Low Stock Items</p><p className="font-heading text-2xl font-bold text-warning mt-1">156</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Redistribution Pending</p><p className="font-heading text-2xl font-bold text-primary mt-1">12</p></div>
      </div>

      <div className="module-card">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Inventory Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Drug</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Facility</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Stock Level</th>
                <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {inventory.map((item, i) => (
                <tr key={i} className="hover:bg-accent/30 transition-colors">
                  <td className="py-3 font-medium text-foreground">{item.drug}</td>
                  <td className="py-3 text-muted-foreground">{item.hospital}</td>
                  <td className="py-3 w-48">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(item.stock / item.maxStock) * 100}
                        className={cn(
                          "h-2 flex-1",
                          item.status === "critical" ? "[&>div]:bg-destructive" : item.status === "low" ? "[&>div]:bg-warning" : "[&>div]:bg-secondary"
                        )}
                      />
                      <span className="text-xs text-muted-foreground w-16">{item.stock}/{item.maxStock}</span>
                    </div>
                  </td>
                  <td className="py-3">{statusBadge(item.status)}</td>
                </tr>
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
            <div key={i} className="flex items-center justify-between rounded-md border bg-primary/5 p-4">
              <div className="flex items-center gap-4">
                <Package className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{r.drug}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">{r.from} <ArrowRight className="h-3 w-3" /> {r.to}</p>
                </div>
              </div>
              <Badge variant="outline">{r.qty} units</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrugSupply;
