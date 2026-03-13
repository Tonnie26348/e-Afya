import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Building2, Bed, Stethoscope, Ambulance } from "lucide-react";

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
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Smart Referral & Hospital Capacity</h1>
        <p className="text-sm text-muted-foreground">Real-time bed availability and referral management</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="stat-card flex items-center gap-3"><Bed className="h-8 w-8 text-primary" /><div><p className="text-sm text-muted-foreground">Total Beds</p><p className="font-heading text-xl font-bold text-foreground">24,580</p></div></div>
        <div className="stat-card flex items-center gap-3"><Building2 className="h-8 w-8 text-destructive" /><div><p className="text-sm text-muted-foreground">ICU Available</p><p className="font-heading text-xl font-bold text-destructive">127</p></div></div>
        <div className="stat-card flex items-center gap-3"><Stethoscope className="h-8 w-8 text-secondary" /><div><p className="text-sm text-muted-foreground">Specialists On-Call</p><p className="font-heading text-xl font-bold text-foreground">342</p></div></div>
        <div className="stat-card flex items-center gap-3"><Ambulance className="h-8 w-8 text-warning" /><div><p className="text-sm text-muted-foreground">Ambulances Active</p><p className="font-heading text-xl font-bold text-foreground">89</p></div></div>
      </div>

      <div className="module-card">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Facility Capacity Monitor</h3>
        <div className="space-y-4">
          {hospitals.map((h, i) => (
            <div key={i} className="rounded-md border p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.county} County</p>
                </div>
                <div className="flex gap-4 text-xs">
                  <span className="text-muted-foreground">{h.specialists} specialists</span>
                  <span className="text-muted-foreground">{h.ambulances} ambulances</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Bed Occupancy</span>
                    <span className={cn("font-medium", capacityColor(h.beds))}>{h.beds}%</span>
                  </div>
                  <Progress value={h.beds} className={cn("h-2", capacityBg(h.beds))} />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">ICU Occupancy</span>
                    <span className={cn("font-medium", capacityColor(h.icu))}>{h.icu}%</span>
                  </div>
                  <Progress value={h.icu} className={cn("h-2", capacityBg(h.icu))} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Referrals;
