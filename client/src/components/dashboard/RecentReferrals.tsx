import { Badge } from "@/components/ui/badge";

const referrals = [
  { patient: "John Kamau", from: "Thika L5", to: "Kenyatta NH", status: "In Transit", urgent: true },
  { patient: "Grace Otieno", from: "Kisumu CRH", to: "Moi TRH", status: "Accepted", urgent: false },
  { patient: "Hassan Ali", from: "Garissa CRH", to: "Kenyatta NH", status: "Pending", urgent: true },
  { patient: "Mary Njeri", from: "Nyeri L5", to: "Kenyatta NH", status: "Completed", urgent: false },
  { patient: "Peter Odhiambo", from: "Homa Bay CRH", to: "Kisumu CRH", status: "In Transit", urgent: false },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "In Transit": return "default";
    case "Accepted": return "secondary";
    case "Pending": return "outline";
    case "Completed": return "secondary";
    default: return "outline";
  }
};

const RecentReferrals = () => {
  return (
    <div className="module-card">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Recent Referrals</h3>
      <div className="space-y-3">
        {referrals.map((r, i) => (
          <div key={i} className="flex items-center justify-between rounded-md border bg-accent/30 p-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                {r.patient}
                {r.urgent && <span className="ml-2 inline-block h-2 w-2 rounded-full bg-destructive" />}
              </p>
              <p className="text-xs text-muted-foreground">{r.from} → {r.to}</p>
            </div>
            <Badge variant={statusVariant(r.status) as any}>{r.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReferrals;
