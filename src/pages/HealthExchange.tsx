import { FileHeart, Search, Shield, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const patients = [
  { id: "KE-2024-001847", name: "John Kamau", age: 45, county: "Nairobi", lastVisit: "Mar 12, 2026", conditions: ["Diabetes Type 2", "Hypertension"] },
  { id: "KE-2024-003291", name: "Grace Otieno", age: 32, county: "Kisumu", lastVisit: "Mar 11, 2026", conditions: ["Malaria", "Anemia"] },
  { id: "KE-2024-005623", name: "Hassan Ali", age: 58, county: "Mombasa", lastVisit: "Mar 10, 2026", conditions: ["COPD"] },
  { id: "KE-2024-007845", name: "Mary Njeri", age: 28, county: "Nyeri", lastVisit: "Mar 13, 2026", conditions: ["Prenatal Care"] },
  { id: "KE-2024-009102", name: "Peter Odhiambo", age: 67, county: "Homa Bay", lastVisit: "Mar 9, 2026", conditions: ["HIV", "TB"] },
];

const HealthExchange = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="page-header mb-0">
          <h1>National Health Data Exchange</h1>
          <p>Secure patient record sharing across providers</p>
        </div>
        <Badge variant="outline" className="gap-1.5 self-start">
          <Shield className="h-3 w-3" /> FHIR R4 Compliant
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {[
          { label: "Digital Health IDs", value: "12.4M" },
          { label: "Records Shared Today", value: "34,521" },
          { label: "Connected Facilities", value: "847" },
          { label: "Consent Rate", value: "94.2%", color: "text-secondary" },
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

      <div className="module-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-heading text-sm font-semibold text-foreground">Patient Records</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by ID or name..." className="pl-10 bg-muted/50 border-0 rounded-lg" />
          </div>
        </div>
        <div className="space-y-2">
          {patients.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border bg-accent/30 p-4 hover:bg-accent/50 transition-colors cursor-pointer gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold text-sm">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.id} · {p.county} · Age {p.age}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-13 sm:ml-0">
                <div className="flex flex-wrap gap-1.5">
                  {p.conditions.map((c, ci) => (
                    <Badge key={ci} variant="outline" className="text-[11px]">{c}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                  <Clock className="h-3 w-3" />
                  {p.lastVisit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HealthExchange;
