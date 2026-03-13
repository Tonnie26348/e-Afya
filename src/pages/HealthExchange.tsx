import { FileHeart, Search, Shield, Clock, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const patients = [
  { id: "KE-2024-001847", name: "John Kamau", age: 45, county: "Nairobi", lastVisit: "Mar 12, 2026", conditions: ["Diabetes Type 2", "Hypertension"] },
  { id: "KE-2024-003291", name: "Grace Otieno", age: 32, county: "Kisumu", lastVisit: "Mar 11, 2026", conditions: ["Malaria", "Anemia"] },
  { id: "KE-2024-005623", name: "Hassan Ali", age: 58, county: "Mombasa", lastVisit: "Mar 10, 2026", conditions: ["COPD"] },
  { id: "KE-2024-007845", name: "Mary Njeri", age: 28, county: "Nyeri", lastVisit: "Mar 13, 2026", conditions: ["Prenatal Care"] },
  { id: "KE-2024-009102", name: "Peter Odhiambo", age: 67, county: "Homa Bay", lastVisit: "Mar 9, 2026", conditions: ["HIV", "TB"] },
];

const HealthExchange = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">National Health Data Exchange</h1>
          <p className="text-sm text-muted-foreground">Secure patient record sharing across providers</p>
        </div>
        <Badge variant="outline" className="gap-1.5">
          <Shield className="h-3 w-3" /> FHIR R4 Compliant
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="stat-card"><p className="text-sm text-muted-foreground">Digital Health IDs</p><p className="font-heading text-2xl font-bold text-foreground mt-1">12.4M</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Records Shared Today</p><p className="font-heading text-2xl font-bold text-foreground mt-1">34,521</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Connected Facilities</p><p className="font-heading text-2xl font-bold text-foreground mt-1">847</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Consent Rate</p><p className="font-heading text-2xl font-bold text-secondary mt-1">94.2%</p></div>
      </div>

      <div className="module-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-sm font-semibold text-foreground">Patient Records</h3>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by ID or name..." className="pl-10 bg-accent border-0" />
          </div>
        </div>
        <div className="space-y-3">
          {patients.map((p) => (
            <div key={p.id} className="flex items-center justify-between rounded-md border bg-accent/30 p-4 hover:bg-accent/50 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold text-sm">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.id} · {p.county} · Age {p.age}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {p.conditions.map((c, i) => (
                    <Badge key={i} variant="outline" className="text-xs">{c}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {p.lastVisit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthExchange;
