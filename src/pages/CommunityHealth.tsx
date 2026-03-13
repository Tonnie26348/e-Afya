import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Syringe, ClipboardList, Wifi, WifiOff } from "lucide-react";

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
    case "severe": return <Badge variant="destructive">Severe</Badge>;
    case "moderate": return <Badge className="bg-warning text-warning-foreground">Moderate</Badge>;
    default: return <Badge variant="secondary">Routine</Badge>;
  }
};

const CommunityHealth = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Community Health Workers</h1>
        <p className="text-sm text-muted-foreground">Field reporting and vaccination tracking</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="stat-card"><p className="text-sm text-muted-foreground">Active CHWs</p><p className="font-heading text-2xl font-bold text-foreground mt-1">4,215</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Visits This Week</p><p className="font-heading text-2xl font-bold text-secondary mt-1">8,432</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Vaccinations</p><p className="font-heading text-2xl font-bold text-primary mt-1">2,891</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Pending Sync</p><p className="font-heading text-2xl font-bold text-warning mt-1">127</p></div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="module-card">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Active Workers</h3>
          <div className="space-y-3">
            {chws.map((chw, i) => (
              <div key={i} className="flex items-center justify-between rounded-md border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary font-heading font-bold text-xs">
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
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><ClipboardList className="h-3 w-3" />{chw.visits}</span>
                  <span className="flex items-center gap-1"><Syringe className="h-3 w-3" />{chw.vaccinations}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="module-card">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Recent Field Reports</h3>
          <div className="space-y-3">
            {recentReports.map((r, i) => (
              <div key={i} className="rounded-md border p-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{r.type}</p>
                  {severityBadge(r.severity)}
                </div>
                <p className="text-xs text-muted-foreground">{r.chw} · {r.patient} · {r.location}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHealth;
