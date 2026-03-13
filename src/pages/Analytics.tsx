import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const vaccData = [
  { county: "Nairobi", coverage: 89 },
  { county: "Mombasa", coverage: 82 },
  { county: "Kisumu", coverage: 75 },
  { county: "Nakuru", coverage: 91 },
  { county: "Uasin Gishu", coverage: 88 },
  { county: "Kilifi", coverage: 62 },
  { county: "Turkana", coverage: 45 },
  { county: "Garissa", coverage: 51 },
];

const diseaseDistribution = [
  { name: "Malaria", value: 35 },
  { name: "Respiratory", value: 22 },
  { name: "Diarrheal", value: 15 },
  { name: "HIV/AIDS", value: 12 },
  { name: "TB", value: 8 },
  { name: "Other", value: 8 },
];

const COLORS = [
  "hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--warning))",
  "hsl(var(--destructive))", "hsl(var(--muted-foreground))", "hsl(var(--ring))"
];

const maternalData = [
  { month: "Sep", deliveries: 12400, complications: 620 },
  { month: "Oct", deliveries: 13100, complications: 580 },
  { month: "Nov", deliveries: 12800, complications: 540 },
  { month: "Dec", deliveries: 14200, complications: 710 },
  { month: "Jan", deliveries: 13500, complications: 600 },
  { month: "Feb", deliveries: 12900, complications: 520 },
  { month: "Mar", deliveries: 13800, complications: 560 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">National Health Analytics</h1>
        <p className="text-sm text-muted-foreground">Real-time insights across Kenya's 47 counties</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="stat-card"><p className="text-sm text-muted-foreground">Total Cases (2026)</p><p className="font-heading text-2xl font-bold text-foreground mt-1">1.2M</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Vaccination Rate</p><p className="font-heading text-2xl font-bold text-secondary mt-1">78.4%</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Maternal Mortality</p><p className="font-heading text-2xl font-bold text-destructive mt-1">342/100k</p></div>
        <div className="stat-card"><p className="text-sm text-muted-foreground">Under-5 Mortality</p><p className="font-heading text-2xl font-bold text-warning mt-1">41/1000</p></div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="module-card">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Vaccination Coverage by County</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vaccData} layout="vertical" margin={{ top: 5, right: 10, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="county" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
                <Bar dataKey="coverage" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="module-card">
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Disease Distribution</h3>
          <div className="h-72 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diseaseDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                  {diseaseDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="module-card">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Maternal Health Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={maternalData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "12px" }} />
              <Area type="monotone" dataKey="deliveries" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.1)" strokeWidth={2} name="Deliveries" />
              <Area type="monotone" dataKey="complications" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.1)" strokeWidth={2} name="Complications" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
