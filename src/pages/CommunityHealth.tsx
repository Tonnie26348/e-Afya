import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Syringe, ClipboardList, Wifi, WifiOff } from "lucide-react";
import { motion } from "framer-motion";

const chws = [
  { name: "Jane Wambui", county: "Kiambu", visits: 34, vaccinations: 12, reports: 8, online: true },
  { name: "David Kipchoge", county: "Nandi", visits: 28, vaccinations: 19, reports: 6, online: true },
  { name: "Fatuma Hassan", county: "Garissa", visits: 41, vaccinations: 8, reports: 11, online: false },
  { name: "Samuel Otieno", county: "Siaya", visits: 22, vaccinations: 15, reports: 5, online: true },
  { name: "Agnes Njoki", county: "Murang'a", visits: 37, vaccinations: 22, reports: 9, online: false },
  { name: "Ibrahim Mohamed", county: "Wajir", visits: 19, vaccinations: 6, reports: 4, online: false },
];

const recentReports = [
  { chw: "Jane Wambui", type: "Malaria Symptoms", patient: "Child, 3yrs", location: "Kiambu Sub-County", time: "2 hrs ago", severity: "moderate" },
  { chw: "Fatuma Hassan", type: "Malnutrition", patient: "Child, 1yr", location: "Garissa Central", time: "4 hrs ago", severity: "severe" },
  { chw: "David Kipchoge", type: "Vaccination Follow-up", patient: "Infant, 6mo", location: "Nandi Hills", time: "5 hrs ago", severity: "routine" },
  { chw: "Samuel Otieno", type: "Cholera Symptoms", patient: "Adult, 32yrs", location: "Siaya Town", time: "6 hrs ago", severity: "severe" },
];

const severityBadge = (s: string) => {
  switch (s) {
    case "severe": return <Badge variant="destructive" className="text-[11px]">Severe</Badge>;
    case "moderate": return <Badge className="bg-warning text-warning-foreground text-[11px]">Moderate</Badge>;
    default: return <Badge variant="secondary" className="text-[11px]">Routine</Badge>;
  }
};

const CommunityHealth = () => {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page-header">
        <h1>Community Health Workers</h1>
        <p>Field reporting and vaccination tracking</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {[
          { label: "Active CHWs", value: "4,215" },
          { label: "Visits This Week", value: "8,432", color: "text-secondary" },
          { label: "Vaccinations", value: "2,891", color: "text-primary" },
          { label: "Pending Sync", value: "127", color: "text-warning" },
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

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <div className="module-card">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Active Workers</h3>
          <div className="space-y-2">
            {chws.map((chw, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-accent/30 transition-colors"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary font-heading font-bold text-xs">
                    {chw.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                      {chw.name}
                      {chw.online ? <Wifi className="h-3 w-3 text-secondary" /> : <WifiOff className="h-3 w-3 text-muted-foreground" />}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{chw.county}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><ClipboardList className="h-3 w-3" />{chw.visits}</span>
                  <span className="flex items-center gap-1"><Syringe className="h-3 w-3" />{chw.vaccinations}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="module-card">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Recent Field Reports</h3>
          <div className="space-y-2">
            {recentReports.map((r, i) => (
              <motion.div
                key={i}
                className="rounded-lg border p-3 hover:bg-accent/30 transition-colors"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-medium text-foreground">{r.type}</p>
                  {severityBadge(r.severity)}
                </div>
                <p className="text-xs text-muted-foreground">{r.chw} · {r.patient} · {r.location}</p>
                <p className="text-[11px] text-muted-foreground/70 mt-1">{r.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityHealth;
