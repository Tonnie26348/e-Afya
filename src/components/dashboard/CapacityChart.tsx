import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Kenyatta NH", beds: 85, icu: 92 },
  { name: "Moi TRH", beds: 72, icu: 65 },
  { name: "Coast GH", beds: 58, icu: 45 },
  { name: "Kisumu CRH", beds: 90, icu: 78 },
  { name: "Nakuru L5", beds: 67, icu: 88 },
  { name: "Garissa CRH", beds: 42, icu: 30 },
];

const CapacityChart = () => {
  return (
    <div className="module-card">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Hospital Capacity (%)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="beds" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Beds" />
            <Bar dataKey="icu" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="ICU" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CapacityChart;
