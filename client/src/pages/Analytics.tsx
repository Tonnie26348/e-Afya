import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { motion } from "framer-motion";

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

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "10px",
  fontSize: "12px",
  boxShadow: "0 4px 12px hsl(var(--foreground) / 0.08)",
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Analytics = () => {
  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
    >
      <div className="page-header">
        <h1>National Health Analytics</h1>
        <p>Real-time insights across Kenya's 47 counties</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {[
          { label: "Total Cases (2026)", value: "1.2M" },
          { label: "Vaccination Rate", value: "78.4%", color: "text-secondary" },
          { label: "Maternal Mortality", value: "342/100k", color: "text-destructive" },
          { label: "Under-5 Mortality", value: "41/1000", color: "text-warning" },
        ].map((s, i) => (
          <motion.div key={i} className="stat-card" variants={item}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</p>
            <p className={`font-heading text-xl sm:text-2xl font-bold mt-2 ${s.color || "text-foreground"}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <motion.div className="module-card" variants={item}>
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Vaccination Coverage by County</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vaccData} layout="vertical" margin={{ top: 5, right: 10, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis dataKey="county" type="category" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="coverage" fill="hsl(var(--secondary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div className="module-card" variants={item}>
          <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Disease Distribution</h3>
          <div className="h-72 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={diseaseDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                  {diseaseDistribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <motion.div className="module-card" variants={item}>
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Maternal Health Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={maternalData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="deliveries" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.08)" strokeWidth={2} name="Deliveries" />
              <Area type="monotone" dataKey="complications" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.08)" strokeWidth={2} name="Complications" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
