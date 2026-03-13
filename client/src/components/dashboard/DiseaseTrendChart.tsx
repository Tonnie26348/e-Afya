import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Aug", malaria: 4200, cholera: 320, tb: 890 },
  { month: "Sep", malaria: 3800, cholera: 280, tb: 920 },
  { month: "Oct", malaria: 3100, cholera: 350, tb: 870 },
  { month: "Nov", malaria: 2800, cholera: 510, tb: 850 },
  { month: "Dec", malaria: 2400, cholera: 620, tb: 810 },
  { month: "Jan", malaria: 2100, cholera: 780, tb: 790 },
  { month: "Feb", malaria: 1900, cholera: 450, tb: 830 },
  { month: "Mar", malaria: 2200, cholera: 340, tb: 860 },
];

const DiseaseTrendChart = () => {
  return (
    <div className="module-card">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Disease Trends (Monthly Cases)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Line type="monotone" dataKey="malaria" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Malaria" />
            <Line type="monotone" dataKey="cholera" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} name="Cholera" />
            <Line type="monotone" dataKey="tb" stroke="hsl(var(--warning))" strokeWidth={2} dot={false} name="TB" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DiseaseTrendChart;
